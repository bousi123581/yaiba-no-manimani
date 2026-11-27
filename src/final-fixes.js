/* Final integration fixes layered after existing feature and compatibility scripts. */
(() => {
  const previous = {
    action: window.action,
    talkChoice: window.talkChoice,
    startTalk: window.startTalk,
    openTalk: window.openTalk,
    randomEvent: window.randomEvent,
    timedEvent: window.timedHonmaruEvent,
    journal: window.renderJournal,
    affinityChoice: window.affinityChoice,
    personalAffinityChoice: window.personalAffinityChoice,
    save: window.save,
  };
  let restTalkPending = false;
  let forge = null;

  const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  const missionProgress = (id, count = 1) => {
    const mission = G?.missions?.find((entry) => entry.id === id);
    if (mission) mission.progress = Math.min(mission.target, mission.progress + count);
  };
  function recordFreeEvent(title, text, member = null) {
    const who = member ? sword(member.id)?.name || "本丸" : "本丸";
    entry(who, text);
    if (G.logs[0]) G.logs[0].n = null;
    modalOpen(`<div class="portrait">${member ? escapeHtml(sword(member.id)?.art) : "🌸"}</div><h2>${escapeHtml(title)}</h2><p class="dialog-line">${escapeHtml(text)}</p><button class="wide" onclick="closeModal()">確認</button>`);
    save();
  }
  function repairJournalNumbers() {
    const root = $("app");
    if (!root) return;
    root.querySelectorAll("section.paper .muted").forEach((meta) => {
      const logCard = meta.closest("section.paper");
      const index = [...root.querySelectorAll("section.paper")].indexOf(logCard);
      const log = G?.logs?.[index];
      if (log && Number.isFinite(log.n)) {
        meta.textContent = `${log.year}年目 ${log.season} 行動${log.n}回目 / ${log.who}`;
      } else {
        meta.textContent = meta.textContent
          .replace(/\s*行動\s*(?:null|undefined)?\s*回目\s*\/\s*/g, " / ")
          .replace(/\s*行動(?:null|undefined)回目\s*\/\s*/g, " / ");
      }
    });
  }
  function showRestChoices() {
    modalOpen('<h2>休憩</h2><p>どちらも行動回数を1回消費します。</p><div class="choice"><button onclick="restTalkAtCost()">近侍と話す</button><button onclick="restAllAtCost()">本丸みんなで休憩（疲労回復）</button></div><button class="wide" onclick="closeModal()">戻る</button>');
  }
  function ensureCanRest() {
    if (!G || G.actions > 0) return true;
    modalOpen('<h2>行動回数が尽きた</h2><p>季節を進めて休息を取りましょう。</p><button class="wide" onclick="advanceSeason()">季節を進める</button>');
    return false;
  }
  function blockedByPenalty() {
    modalOpen('<h2>休憩は選べません</h2><p>任務未達のペナルティ中です。次の季節が終わるまで休憩できません。</p><button class="wide" onclick="closeModal()">確認</button>');
  }
  function restAll() {
    if (!ensureCanRest()) return;
    if (G.penaltySeasonsRemaining > 0) return blockedByPenalty();
    G.owned.forEach((member) => { member.fatigue = clamp(member.fatigue - 20); });
    G.black = clamp((G.black || 0) - 3);
    entry("本丸", "本丸のみんなで休憩を取り、全員の疲労が和らいだ。");
    consume(); save(); closeModal(); setView("journal");
  }
  function restTalk() {
    if (!ensureCanRest()) return;
    if (G.penaltySeasonsRemaining > 0) return blockedByPenalty();
    const member = owned(G.adjutant);
    if (member) { member.fatigue = clamp(member.fatigue - 20); member.aff = clamp(member.aff + 5); member.trust = member.aff; }
    G.black = clamp((G.black || 0) - 3);
    entry(sword(G.adjutant)?.name || "本丸", "近侍と休憩を取り、疲労が和らいだ。");
    consume(); save(); closeModal();
    restTalkPending = true;
    TALK_TARGET = G.adjutant;
    window.openTalk();
  }
  function startForge() {
    if (!G || forge) return;
    if (!ensureCanRest()) return;
    if (G.owned.length >= 12) return modalOpen('<h2>本丸の顕現枠がいっぱいです</h2><p>最大12振りまで迎えられます。</p><button class="wide" onclick="closeModal()">戻る</button>');
    const materialKeys = ["wood", "stone", "coal", "iron"];
    if (materialKeys.some((key) => (G.resources[key] || 0) < 100)) return modalOpen('<h2>資材不足</h2><p>鍛刀には木・石・炭・鉄が各100必要です。</p><button class="wide" onclick="closeModal()">戻る</button>');
    const candidates = SWORDS.filter((character) => !owned(character.id));
    if (!candidates.length) return modalOpen('<h2>顕現できる刀剣男士はいません</h2><p>実装済みの刀剣男士は全員本丸にいます。</p><button class="wide" onclick="closeModal()">戻る</button>');
    materialKeys.forEach((key) => { G.resources[key] -= 100; });
    forge = { id: rand(candidates).id, phase: "materials", timer: null, holdTimer: null, holdStart: 0 };
    save();
    modalOpen('<div class="forge-scene"><div class="forge-spark">✦</div><h2>資源を投入しています</h2><p>木・石・炭・鉄を各100ずつ、鍛刀釜へ。</p><div class="forge-materials">🌲　🪨　⚫　⚙️</div><div class="forge-progress"><span></span></div></div>');
    forge.timer = setTimeout(() => {
      if (!forge) return;
      forge.phase = "power";
      const character = sword(forge.id);
      modalOpen(`<div class="forge-scene forge-reveal"><div class="forge-sword">${escapeHtml(character.art)}</div><h2>刀身が姿を現した</h2><p>霊力を込めてください。長押しの途中で手を離すと鍛刀失敗になります。</p><button id="forge-hold" class="forge-charge" onpointerdown="holdForgePower(event)" onpointerup="releaseForgePower()" onpointercancel="releaseForgePower()" onpointerleave="releaseForgePower()">長押しして霊力を込める</button><div class="charge-track"><span id="forge-power-progress"></span></div><p>1.5秒間押し続けてください</p></div>`);
    }, 700);
  }
  function failForge() {
    if (!forge) return;
    clearTimeout(forge.timer);
    clearInterval(forge.holdTimer);
    forge = null;
    save();
    modalOpen('<div class="forge-scene forge-failed"><h2>鍛刀失敗</h2><p>霊力が途切れ、刀は顕現しませんでした。投入した資源は戻りません。</p><button class="wide" onclick="closeModal()">戻る</button></div>');
  }
  function completeForge() {
    if (!forge || forge.phase !== "power") return;
    clearInterval(forge.holdTimer);
    const id = forge.id;
    const character = sword(id);
    forge = null;
    if (!grant(id)) {
      save();
      modalOpen('<h2>鍛刀失敗</h2><p>顕現枠を確保できず、刀は顕現しませんでした。</p><button class="wide" onclick="closeModal()">戻る</button>');
      return;
    }
    missionProgress("forge");
    entry(character.name, `鍛刀を行い、${character.name}が顕現した。`);
    consume(); save();
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    modalOpen(`<div class="forge-scene forge-blossom ${reduced ? "reduced-motion" : ""}"><div class="petal-burst" aria-hidden="true">🌸　✿　🌸　✿　🌸</div><div class="forge-sword">${escapeHtml(character.art)}</div><h2>${escapeHtml(character.name)} 顕現</h2><p>${escapeHtml(character.lines.normal)}</p><button class="wide" onclick="closeModal()">本丸へ</button></div>`);
  }
  function holdForge(event) {
    if (!forge || forge.phase !== "power" || forge.holdTimer) return;
    event?.preventDefault?.();
    forge.holdStart = Date.now();
    $("forge-hold")?.classList.add("charging");
    forge.holdTimer = setInterval(() => {
      if (!forge) return;
      const percent = Math.min(100, ((Date.now() - forge.holdStart) / 1500) * 100);
      const bar = $("forge-power-progress");
      if (bar) bar.style.width = `${percent}%`;
      if (percent >= 100) completeForge();
    }, 25);
  }
  function releaseForge() {
    if (forge?.phase === "power" && forge.holdTimer) failForge();
  }
  function trainingMenu() {
    if (!G?.owned?.length) return modalOpen('<h2>演練できません</h2><p>先に刀剣男士を迎えましょう。</p><button class="wide" onclick="closeModal()">戻る</button>');
    const selected = G.owned.slice(0, 6).map((member) => member.id);
    window.trainingSelection = selected.slice();
    const rows = G.owned.map((member) => `<label class="roster-choice"><input type="checkbox" value="${escapeHtml(member.id)}" ${selected.includes(member.id) ? "checked" : ""} onchange="toggleTrainingMember('${escapeHtml(member.id)}',this.checked)"><span>${escapeHtml(sword(member.id).art)} ${escapeHtml(sword(member.id).name)}</span><small>Lv.${member.level}</small></label>`).join("");
    modalOpen(`<h2>演練部隊を編成</h2><p>初期状態では先頭から最大6振りが選択済みです。選んだ刀剣は全員1レベル上がります。</p><div class="roster-select">${rows}</div><p id="training-warning" aria-live="polite">部隊員：${selected.length}/6</p><button class="wide primary-action" onclick="confirmTraining()">演練を行う</button><button class="wide" onclick="closeModal()">戻る</button>`);
  }
  function showRandomEvent(...args) {
    if (!G || G.turns % 3 !== 0 || !G.owned.length) return previous.randomEvent(...args);
    const before = G.logs.length;
    if (Math.random() < 0.25) {
      const member = rand(G.owned);
      const character = sword(member.id);
      const gift = rand([{ key: "coins", amount: 10, label: "小判10" }, { key: "wood", amount: 15, label: "木材15" }, { key: "stone", amount: 15, label: "砥石15" }]);
      G.resources[gift.key] = (G.resources[gift.key] || 0) + gift.amount;
      G.logs.unshift({ year: G.year, season: G.season, n: null, who: character.name, text: `${character.name}が${gift.label}の差し入れを持ってきた。` });
      G.logs.length = Math.min(200, G.logs.length);
    } else {
      previous.randomEvent(...args);
    }
    if (G.logs.length > before) {
      const latest = G.logs[0];
      latest.n = null;
      const character = G.owned.find((member) => sword(member.id)?.name === latest.who);
      modalOpen(`<div class="portrait">${character ? escapeHtml(sword(character.id).art) : "🌸"}</div><h2>${character ? `${escapeHtml(sword(character.id).name)}からの話` : "本丸での出来事"}</h2><p class="dialog-line">${escapeHtml(latest.text)}</p><button class="wide" onclick="closeModal()">確認</button>`);
      save();
    }
  }
  function timedEvent(...args) {
    if (!G?.owned?.length) return previous.timedEvent(...args);
    const member = rand(G.owned);
    if (!Array.isArray(member.timedEvents)) member.timedEvents = [];
    const character = sword(member.id);
    const events = character.events || [];
    const ev = events[member.timedEvents.length % Math.max(events.length, 1)];
    member.timedEvents.push(member.timedEvents.length);
    const title = ev?.[0] || "本丸でのひととき";
    const text = `${ev?.[1] || `${character.name}が本丸で声をかけてきた。`}\n\n${character.name}：「${ev?.[2] || "少し話を聞いてくれるか。"}」`;
    member.aff = clamp(member.aff + 2); member.trust = member.aff;
    entry(character.name, text); if (G.logs[0]) G.logs[0].n = null;
    modalOpen(`<div class="portrait">${escapeHtml(character.art)}</div><h2>${escapeHtml(title)}</h2><p class="dialog-line">${escapeHtml(text)}</p><button class="wide" onclick="closeModal()">確認</button>`);
    save();
  }

  // Keep the installed feature layer's action routing, replacing only the requested interactions.
  window.action = function (name) {
    if (["休憩", "休息・万屋"].includes(name)) return showRestChoices();
    if (name === "鍛刀") return startForge();
    if (name === "演練") return trainingMenu();
    return previous.action(name);
  };
  window.restTalkAtCost = function () {
    if (!ensureCanRest()) return;
    if (G.penaltySeasonsRemaining > 0) return blockedByPenalty();
    const member = owned(G.adjutant);
    if (member) { member.fatigue = clamp(member.fatigue - 20); member.aff = clamp(member.aff + 5); member.trust = member.aff; }
    G.black = clamp((G.black || 0) - 3);
    entry(sword(G.adjutant)?.name || "本丸", "近侍と休憩を取り、疲労が和らいだ。");
    consume(); save(); closeModal(); restTalkPending = true; TALK_TARGET = G.adjutant; window.openTalk();
  };
  window.restAllAtCost = restEveryone;
  window.toggleTrainingMember = function (id, checked) {
    const selection = window.trainingSelection || [];
    if (checked && selection.length >= 6) {
      const box = [...document.querySelectorAll(".roster-choice input")].find((item) => item.value === id);
      if (box) box.checked = false;
      const warning = $("training-warning"); if (warning) warning.textContent = "部隊は最大6振りです。";
      return;
    }
    window.trainingSelection = checked ? [...new Set([...selection, id])] : selection.filter((item) => item !== id);
    const warning = $("training-warning"); if (warning) warning.textContent = `部隊員：${window.trainingSelection.length}/6`;
  };
  window.confirmTraining = function () {
    const selection = (window.trainingSelection || []).filter((id) => owned(id));
    if (!selection.length || selection.length > 6) { const warning = $("training-warning"); if (warning) warning.textContent = "1〜6振りを選択してください。"; return; }
    selection.forEach((id) => { const member = owned(id); member.level++; member.trainingExp = 0; member.aff = clamp(member.aff + 2); member.trust = member.aff; });
    G.level = (G.level || 1) + 1; G.exp = (G.exp || 0) + 15;
    missionProgress("training");
    entry("部隊", `演練を行い、${selection.map((id) => sword(id).name).join("、")}がそれぞれ1レベル成長した。`);
    window.trainingSelection = [];
    consume(); save(); closeModal(); setView("journal");
  };
  window.holdForgePower = holdForge;
  window.releaseForgePower = releaseForge;
  window.stopForgePower = releaseForge;
  // Repair action-free journal rows at render-time by consulting saved metadata, not text substitutions alone.
  window.renderJournal = function () {
    previous.journal();
    const root = $("app");
    if (!root) return;
    const cards = [...root.querySelectorAll(":scope > section.paper")];
    cards.forEach((card, index) => {
      const meta = card.querySelector(".muted");
      const log = G.logs[index];
      if (!meta || !log) return;
      if (Number.isFinite(log.n)) meta.textContent = `${log.year}年目 ${log.season} 行動${log.n}回目 / ${log.who}`;
      else meta.textContent = `${log.year}年目 ${log.season} / ${log.who}`;
    });
  };
  window.randomEvent = showRandomEvent;
  window.timedHonmaruEvent = timedEvent;
  // Player-selected talk consumes an action, except the dialogue reached from an already-paid rest action.
  window.talkChoice = function (topicIndex, choiceIndex) {
    if (G?.penaltySeasonsRemaining > 0) return window.openTalk();
    const id = TALK_TARGET || G.adjutant;
    const character = sword(id);
    const member = owned(id);
    const choice = character?.talk?.topics?.[topicIndex]?.choices?.[choiceIndex];
    if (!character || !member || !choice) return;
    member.aff = clamp(member.aff + choice.aff);
    member.trust = member.aff;
    member.fatigue = clamp(member.fatigue - 5);
    G.white = clamp((G.white || 0) + 1);
    entry(character.name, `${character.name}と「${character.talk.topics[topicIndex].title}」について話した。${choice.reply}（信頼度 +${choice.aff}）`);
    save();
    const milestone = milestoneFor(member);
    modalOpen(`<div class="portrait">${escapeHtml(character.art)}</div><h2>${escapeHtml(character.name)}</h2><p class="dialog-line">${escapeHtml(ageIntro(choice.reply))}</p><p>信頼度 +${choice.aff}　現在 ${member.aff}/100</p>${milestone !== null ? `<button class="wide" onclick="showAffinityEvent(sword('${id}'),owned('${id}'),${milestone})">信頼イベントを見る</button>` : ""}<button class="wide" onclick="closeModal()">本丸へ戻る</button>`);
    if (restTalkPending) restTalkPending = false;
    else consume();
    save();
  };
  const priorStartTalk = previous.startTalk;
  window.startTalk = function (id) {
    if (G?.penaltySeasonsRemaining > 0) return window.openTalk();
    TALK_TARGET = id;
    return window.openTalk();
  };
  // Wrap affinity selections so the event is an action, without changing its story or reward logic.
  window.affinityChoice = function (...args) { previous.affinityChoice?.(...args); consume(); save(); };
  window.personalAffinityChoice = function (...args) { previous.personalAffinityChoice?.(...args); consume(); save(); };
  window.openCrossTalk = function (id) {
    if (G?.penaltySeasonsRemaining > 0) return window.openTalk();
    const before = G.logs.length;
    previous.openCrossTalk?.(id);
    if (G.logs.length > before) { consume(); save(); }
  };
  window.advanceSeason = function (...args) {
    const result = previous.advanceSeason(...args);
    repairJournalNumbers();
    return result;
  };
  document.addEventListener("click", (event) => {
    if (forge && event.target?.classList?.contains("modal-backdrop")) failForge();
  });
  document.documentElement.classList.add("short-season-transition");
})();
