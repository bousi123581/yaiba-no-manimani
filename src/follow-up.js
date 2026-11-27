/* Follow-up gameplay and event presentation fixes. Loaded after the existing compatibility fixes. */
(() => {
  const old = {
    action: window.action,
    renderJournal: window.renderJournal,
    randomEvent: window.randomEvent,
    timedHonmaruEvent: window.timedHonmaruEvent,
    advanceSeason: window.advanceSeason,
  };
  let restConversationAction = false;
  let forgeFlow = null;

  function progressMission(id, amount = 1) {
    const mission = G?.missions?.find((item) => item.id === id);
    if (mission) mission.progress = Math.min(mission.target, mission.progress + amount);
  }
  function logAsActionFree(log) {
    if (log) log.n = null;
  }
  function showEventModal(title, text, art = "🌸") {
    modalOpen(`<div class="portrait">${art}</div><h2>${title}</h2><p class="dialog-line">${text}</p><button class="wide" onclick="closeModal()">確認</button>`);
  }
  function eventModalFromLatest(beforeCount, fallbackTitle = "本丸での出来事") {
    if (!Array.isArray(G?.logs) || G.logs.length <= beforeCount) return;
    const latest = G.logs[0];
    logAsActionFree(latest);
    const member = G.owned?.find((item) => sword(item.id)?.name === latest.who);
    showEventModal(member ? `${member.who}からの話` : fallbackTitle, latest.text, member ? sword(member.id).art : "🌸");
    save();
  }
  function renderJournalWithoutNullAction() {
    old.renderJournal();
    document.querySelectorAll("#app section.paper .muted").forEach((meta) => {
      meta.textContent = meta.textContent
        .replace(/行動(?:null|undefined)回目\s*\/\s*/g, "")
        .replace(/行動\s*回目\s*\/\s*/g, "");
    });
  }
  function showRestChoices() {
    modalOpen(`<h2>休憩</h2><p>どちらも行動回数を1回消費します。</p><div class="choice"><button onclick="restAndTalkToAdjutant()">近侍と話す</button><button onclick="restWithEveryone()">本丸みんなで休憩（疲労回復）</button></div><button class="wide" onclick="closeModal()">戻る</button>`);
  }
  function spendActionAndJournal(text, who = "本丸") {
    entry(who, text);
    consume();
    save();
    closeModal();
    setView("journal");
  }
  function restEveryone() {
    if (!G || G.actions <= 0) return old.action("休憩");
    if (G.penaltySeasonsRemaining > 0) {
      modalOpen('<h2>休憩は選べません</h2><p>任務未達ペナルティ中のため、次の季節が終わるまで休憩できません。</p><button class="wide" onclick="closeModal()">確認</button>');
      return;
    }
    G.owned.forEach((member) => { member.fatigue = clamp(member.fatigue - 20); });
    G.black = clamp((G.black || 0) - 3);
    spendActionAndJournal("本丸のみんなで休憩を取り、全員の疲労が和らいだ。");
  }
  function restAndTalk() {
    if (!G || G.actions <= 0) return old.action("休憩");
    if (G.penaltySeasonsRemaining > 0) {
      modalOpen('<h2>休憩は選べません</h2><p>任務未達ペナルティ中のため、次の季節が終わるまで休憩できません。</p><button class="wide" onclick="closeModal()">確認</button>');
      return;
    }
    const member = owned(G.adjutant);
    if (member) { member.fatigue = clamp(member.fatigue - 20); member.aff = clamp(member.aff + 5); member.trust = member.aff; }
    G.black = clamp((G.black || 0) - 3);
    entry(sword(G.adjutant)?.name || "本丸", "近侍と休憩を取り、疲労が和らいだ。");
    consume();
    save();
    restConversationAction = true;
    closeModal();
    startTalk(G.adjutant);
  }
  function startForge() {
    if (!G || forgeFlow) return;
    if (G.actions <= 0) return old.action("鍛刀");
    if (G.owned.length >= 12) return modalOpen('<h2>本丸の顕現枠がいっぱいです</h2><p>最大12振りまで迎えられます。</p><button class="wide" onclick="closeModal()">戻る</button>');
    const keys = ["wood", "stone", "coal", "iron"];
    if (keys.some((key) => (G.resources[key] || 0) < 100)) return modalOpen('<h2>資材不足</h2><p>鍛刀には木・石・炭・鉄が各100必要です。</p><button class="wide" onclick="closeModal()">戻る</button>');
    const pool = SWORDS.filter((item) => !owned(item.id));
    if (!pool.length) return modalOpen('<h2>顕現できる刀剣男士はいません</h2><p>実装済みの刀剣男士は全員本丸にいます。</p><button class="wide" onclick="closeModal()">戻る</button>');
    keys.forEach((key) => { G.resources[key] -= 100; });
    forgeFlow = { id: rand(pool).id, timer: null, started: false };
    save();
    modalOpen('<div class="forge-scene"><div class="forge-spark">✦</div><h2>資源を投入しています</h2><p>木・石・炭・鉄を各100ずつ、鍛刀釜へ。</p><div class="forge-materials">🌲　🪨　⚫　⚙️</div><div class="forge-progress"><span></span></div></div>');
    forgeFlow.timer = setTimeout(() => {
      if (!forgeFlow) return;
      forgeFlow.timer = null;
      forgeFlow.started = true;
      const character = sword(forgeFlow.id);
      modalOpen(`<div class="forge-scene forge-reveal"><div class="forge-sword">${character.art}</div><h2>刀身が姿を現した</h2><p>長押しを続けて霊力を込めてください。途中で手を離すと鍛刀失敗になります。</p><button id="forge-hold" class="forge-charge" onpointerdown="holdForgePower(event)" onpointerup="releaseForgePower()" onpointercancel="releaseForgePower()" onpointerleave="releaseForgePower()">長押しして霊力を込める</button><div class="charge-track"><span id="forge-power-progress"></span></div><p id="forge-power-hint" aria-live="polite">1.5秒間押し続けてください</p></div>`);
    }, 700);
  }
  function failForge() {
    if (!forgeFlow) return;
    if (forgeFlow.timer) clearTimeout(forgeFlow.timer);
    if (forgeFlow.holdTimer) clearInterval(forgeFlow.holdTimer);
    forgeFlow = null;
    save();
    modalOpen('<div class="forge-scene forge-failed"><h2>鍛刀失敗</h2><p>霊力が途切れ、刀は顕現しませんでした。投入した資源は戻りません。</p><button class="wide" onclick="closeModal()">戻る</button></div>');
  }
  function holdForgePower(event) {
    if (!forgeFlow?.started || forgeFlow.holdTimer) return;
    event?.preventDefault?.();
    forgeFlow.holdStartedAt = Date.now();
    $("forge-hold")?.classList.add("charging");
    forgeFlow.holdTimer = setInterval(() => {
      if (!forgeFlow) return;
      const ratio = Math.min(1, (Date.now() - forgeFlow.holdStartedAt) / 1500);
      const bar = $("forge-power-progress");
      if (bar) bar.style.width = `${ratio * 100}%`;
      if (ratio >= 1) finishForge();
    }, 25);
  }
  function releaseForgePower() {
    if (!forgeFlow?.holdTimer) return;
    clearInterval(forgeFlow.holdTimer);
    forgeFlow.holdTimer = null;
    failForge();
  }
  function finishForge() {
    if (!forgeFlow) return;
    if (forgeFlow.holdTimer) clearInterval(forgeFlow.holdTimer);
    const character = sword(forgeFlow.id);
    const memberId = forgeFlow.id;
    forgeFlow = null;
    if (!grant(memberId)) {
      modalOpen('<h2>鍛刀失敗</h2><p>顕現枠を確保できず、刀は顕現しませんでした。</p><button class="wide" onclick="closeModal()">戻る</button>');
      return;
    }
    progressMission("forge");
    entry(character.name, `鍛刀を行い、${character.name}が顕現した。`);
    consume();
    save();
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    modalOpen(`<div class="forge-scene forge-blossom ${reduced ? "reduced-motion" : ""}"><div class="petal-burst" aria-hidden="true">🌸　✿　🌸　✿　🌸</div><div class="forge-sword">${character.art}</div><h2>${character.name} 顕現</h2><p>${character.lines.normal}</p><button class="wide" onclick="closeModal()">本丸へ</button></div>`);
  }
  function trainParty() {
    if (!G?.owned?.length) return modalOpen('<h2>演練できません</h2><p>先に刀剣男士を迎えましょう。</p><button class="wide" onclick="closeModal()">戻る</button>');
    const chosen = G.owned.slice(0, 6).map((member) => member.id);
    const rows = G.owned.map((member) => `<label class="roster-choice"><input type="checkbox" value="${member.id}" ${chosen.includes(member.id) ? "checked" : ""} onchange="toggleTrainingMember('${member.id}',this.checked)"><span>${sword(member.id).art} ${sword(member.id).name}</span><small>Lv.${member.level}</small></label>`).join("");
    modalOpen(`<h2>演練部隊を編成</h2><p>最大6振り。選んだ部隊全員が1レベル上がります。</p><div class="roster-select">${rows}</div><p id="training-warning" aria-live="polite">部隊員：${chosen.length}/6</p><button class="wide primary-action" onclick="confirmTraining()">演練を行う</button><button class="wide" onclick="closeModal()">戻る</button>`);
    window.trainingSelection = chosen;
  }
  function eventTextFor(member, title) {
    const character = sword(member.id);
    const dataset = character?.events || [];
    const event = dataset[(member.timedEvents?.length || 0) % Math.max(dataset.length, 1)];
    const evTitle = event?.[0] || title;
    const desc = event?.[1] || `${character.name}が本丸で声をかけてきた。`;
    const line = event?.[2] || "少し話を聞いてくれるか。";
    return { character, title: evTitle, text: `${desc}\n\n${character.name}：「${line}」` };
  }

  window.action = function (name) {
    if (name === "休憩" || name === "休息・万屋") return showRestChoices();
    if (name === "鍛刀") return startForge();
    if (name === "演練") return trainParty();
    return old.action(name);
  };
  window.toggleTrainingMember = function (id, checked) {
    const selected = window.trainingSelection || [];
    if (checked && selected.length >= 6) {
      const box = [...document.querySelectorAll(".roster-choice input")].find((item) => item.value === id);
      if (box) box.checked = false;
      const warning = $("training-warning");
      if (warning) warning.textContent = "部隊は最大6振りです。";
      return;
    }
    window.trainingSelection = checked ? [...new Set([...selected, id])] : selected.filter((item) => item !== id);
    const warning = $("training-warning");
    if (warning) warning.textContent = `部隊員：${window.trainingSelection.length}/6`;
  };
  window.confirmTraining = function () {
    const selected = window.trainingSelection || [];
    if (!selected.length || selected.length > 6) {
      const warning = $("training-warning");
      if (warning) warning.textContent = "1〜6振りを選択してください。";
      return;
    }
    selected.forEach((id) => {
      const member = owned(id);
      if (member) {
        member.level++;
        member.trainingExp = 0;
        member.aff = clamp(member.aff + 2);
        member.trust = member.aff;
      }
    });
    G.level = (G.level || 1) + 1;
    G.exp = (G.exp || 0) + 15;
    progressMission("training");
    entry("部隊", `演練を行い、${selected.map((id) => sword(id).name).join("、")}がそれぞれ1レベル成長した。`);
    window.trainingSelection = [];
    consume(); save(); closeModal(); setView("journal");
  };
  window.restAndTalkToAdjutant = restAndTalk;
  window.restWithEveryone = restEveryone;
  window.holdForgePower = holdForgePower;
  window.releaseForgePower = releaseForgePower;
  window.stopForgePower = releaseForgePower;
  window.randomEvent = function (...args) {
    if (!G || G.turns % 3 !== 0 || !G.owned.length) return old.randomEvent(...args);
    const before = G.logs.length;
    if (Math.random() < 0.25) {
      const member = rand(G.owned);
      const sw = sword(member.id);
      const gift = rand([{ key: "coins", amount: 10, label: "小判10" }, { key: "wood", amount: 15, label: "木材15" }, { key: "stone", amount: 15, label: "砥石15" }]);
      G.resources[gift.key] = (G.resources[gift.key] || 0) + gift.amount;
      G.logs.unshift({ year: G.year, season: G.season, n: null, who: sw.name, text: `${sw.name}が${gift.label}の差し入れを持ってきた。` });
      G.logs.length = Math.min(G.logs.length, 200);
    } else old.randomEvent(...args);
    eventModalFromLatest(before, "本丸での出来事");
  };
  window.timedHonmaruEvent = function (...args) {
    if (!G?.owned?.length) return old.timedHonmaruEvent(...args);
    const member = rand(G.owned);
    if (!Array.isArray(member.timedEvents)) member.timedEvents = [];
    const event = eventTextFor(member, "本丸でのひととき");
    member.timedEvents.push(member.timedEvents.length);
    member.aff = clamp(member.aff + 2);
    member.trust = member.aff;
    G.logs.unshift({ year: G.year, season: G.season, n: null, who: event.character.name, text: event.text });
    G.logs.length = Math.min(G.logs.length, 200);
    showEventModal(event.title, event.text, event.character.art);
    save();
  };
  window.talkChoice = function (...args) {
    if (G?.penaltySeasonsRemaining > 0) return window.openTalk();
    old.action; // Keep action routing untouched; the existing game-features wrapper owns choice logic.
    const oldTurns = G.turns;
    const result = window.__legacyTalkChoice ? window.__legacyTalkChoice(...args) : undefined;
    if (restConversationAction) { restConversationAction = false; return result; }
    if (G.turns === oldTurns) consume();
    return result;
  };
  // Use the canonical event handlers from the installed feature layer; avoid wrapping its talk callback twice.
  const featuresTalkChoice = window.talkChoice;
  window.talkChoice = function (...args) {
    if (G?.penaltySeasonsRemaining > 0) return window.openTalk();
    if (restConversationAction) {
      restConversationAction = false;
      return featuresTalkChoice(...args);
    }
    return featuresTalkChoice(...args);
  };
  const featuresOpenCrossTalk = window.openCrossTalk;
  window.openCrossTalk = function (id) {
    const before = G?.turns || 0;
    const result = featuresOpenCrossTalk(id);
    if (G && G.turns === before && G.logs?.[0]?.text?.startsWith("特殊会話")) consume();
    return result;
  };
  const featuresReturnBattle = window.returnBattle;
  window.returnBattle = function (...args) {
    const successful = BATTLE && !BATTLE.retreated;
    const before = G?.logs?.length || 0;
    const result = featuresReturnBattle(...args);
    if (successful) progressMission("sortie");
    return result;
  };
  // Global inline callback used by the rest submenu. The rest action is consumed once before opening dialogue.
  window.restAndTalkToAdjutant = function () {
    if (!G || G.actions <= 0) return old.action("休憩");
    if (G.penaltySeasonsRemaining > 0) return showLock("休憩");
    const member = owned(G.adjutant);
    if (member) { member.fatigue = clamp(member.fatigue - 20); member.aff = clamp(member.aff + 5); member.trust = member.aff; }
    G.black = clamp((G.black || 0) - 3);
    entry(sword(G.adjutant)?.name || "本丸", "近侍と休憩し、疲労が和らいだ。");
    consume(); save(); closeModal(); restConversationAction = true; startTalk(G.adjutant);
  };
  // Seasonal transition overlay timing is shortened without removing its animation.
  document.documentElement.classList.add("short-season-transition");
})();
