/* Follow-up fixes for final requested integrations. */
(() => {
  const canonicalRandomEvent = window.randomEvent;
  const canonicalTimedEvent = window.timedHonmaruEvent;
  const canonicalRenderJournal = window.renderJournal;

  function escapeText(value) {
    return String(value ?? "").replace(/[&<>"']/g, (character) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" })[character]);
  }
  function showEvent(title, text, art = "🌸") {
    modalOpen(`<div class="portrait">${escapeText(art)}</div><h2>${escapeText(title)}</h2><p class="dialog-line">${escapeText(text)}</p><button class="wide" onclick="closeModal()">確認</button>`);
  }
  function markActionFree(log) {
    if (log) log.n = null;
  }
  function repairJournal() {
    const app = $("app");
    if (!app) return;
    app.querySelectorAll(":scope > section.paper").forEach((card, index) => {
      const meta = card.querySelector(".muted");
      const log = G?.logs?.[index];
      if (!meta || !log) return;
      if (Number.isFinite(log.n)) meta.textContent = `${log.year}年目 ${log.season} 行動${log.n}回目 / ${log.who}`;
      else meta.textContent = `${log.year}年目 ${log.season} / ${log.who}`;
    });
  }
  function randomEventWithModal() {
    if (!G || G.turns % 3 !== 0 || !G.owned.length) return canonicalRandomEvent();
    const before = G.logs.length;
    if (Math.random() < 0.25) {
      const member = rand(G.owned);
      const character = sword(member.id);
      const reward = rand([
        { key: "coins", amount: 10, label: "小判10" },
        { key: "wood", amount: 15, label: "木材15" },
        { key: "stone", amount: 15, label: "砥石15" },
      ]);
      G.resources[reward.key] = (G.resources[reward.key] || 0) + reward.amount;
      G.logs.unshift({ year: G.year, season: G.season, n: null, who: character.name, text: `${character.name}が${reward.label}の差し入れを持ってきた。` });
      G.logs.length = Math.min(G.logs.length, 200);
    } else {
      canonicalRandomEvent();
    }
    if (G.logs.length > before) {
      const log = G.logs[0];
      markActionFree(log);
      const member = G.owned.find((item) => sword(item.id)?.name === log.who);
      showEvent(member ? `${sword(member.id).name}からの話` : "本丸での出来事", log.text, member ? sword(member.id).art : "🌸");
      save();
    }
  }
  function timedEventWithModal() {
    if (!G?.owned?.length) return canonicalTimedEvent();
    const member = rand(G.owned);
    const character = sword(member.id);
    if (!Array.isArray(member.timedEvents)) member.timedEvents = [];
    const events = character.events || [];
    const event = events[member.timedEvents.length % Math.max(events.length, 1)];
    member.timedEvents.push(member.timedEvents.length);
    member.aff = clamp(member.aff + 2); member.trust = member.aff;
    const title = event?.[0] || "本丸でのひととき";
    const text = `${event?.[1] || `${character.name}が本丸で声をかけてきた。`}\n\n${character.name}：「${event?.[2] || "少し話を聞いてくれるか。"}」`;
    G.logs.unshift({ year: G.year, season: G.season, n: null, who: character.name, text });
    G.logs.length = Math.min(G.logs.length, 200);
    showEvent(title, text, character.art);
    save();
  }

  window.randomEvent = randomEventWithModal;
  window.timedHonmaruEvent = timedEventWithModal;
  window.renderJournal = function () {
    canonicalRenderJournal();
    repairJournal();
  };
  window.talkChoice = function (topicIndex, choiceIndex) {
    if (G?.penaltySeasonsRemaining > 0) {
      modalOpen('<h2>会話できません</h2><p>年間任務未達のペナルティ中です。次の季節が終わるまで会話できません。</p><button class="wide" onclick="closeModal()">確認</button>');
      return;
    }
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
    modalOpen(`<div class="portrait">${escapeText(character.art)}</div><h2>${escapeText(character.name)}</h2><p class="dialog-line">${escapeText(ageIntro(choice.reply))}</p><p>信頼度 +${choice.aff}　現在 ${member.aff}/100</p>${milestone !== null ? `<button class="wide" onclick="showAffinityEvent(sword('${id}'),owned('${id}'),${milestone})">信頼イベントを見る</button>` : ""}<button class="wide" onclick="closeModal()">本丸へ戻る</button>`);
  };

  const canonicalAction = window.action;
  window.action = function (name) {
    if (name === "休憩" || name === "休息・万屋") {
      modalOpen('<h2>休憩</h2><p>どちらも行動回数を1回消費します。</p><div class="choice"><button onclick="restTalk()">近侍と話す</button><button onclick="restAll()">本丸みんなで休憩（疲労回復）</button></div><button class="wide" onclick="closeModal()">戻る</button>');
      return;
    }
    return canonicalAction(name);
  };

  window.restTalk = function () {
    if (!G || G.actions <= 0) return canonicalAction("休憩");
    if (G.penaltySeasonsRemaining > 0) {
      modalOpen('<h2>休憩は選べません</h2><p>任務未達ペナルティ中です。次の季節が終わるまで休憩できません。</p><button class="wide" onclick="closeModal()">確認</button>');
      return;
    }
    const member = owned(G.adjutant);
    if (member) { member.fatigue = clamp(member.fatigue - 20); member.aff = clamp(member.aff + 5); member.trust = member.aff; }
    G.black = clamp((G.black || 0) - 3);
    entry(sword(G.adjutant)?.name || "本丸", "近侍と休憩を取り、疲労が和らいだ。");
    consume(); save(); closeModal(); TALK_TARGET = G.adjutant; window.openTalk();
  };
  window.restAll = function () {
    if (!G || G.actions <= 0) return canonicalAction("休憩");
    if (G.penaltySeasonsRemaining > 0) {
      modalOpen('<h2>休憩は選べません</h2><p>任務未達ペナルティ中です。次の季節が終わるまで休憩できません。</p><button class="wide" onclick="closeModal()">確認</button>');
      return;
    }
    G.owned.forEach((member) => { member.fatigue = clamp(member.fatigue - 20); });
    G.black = clamp((G.black || 0) - 3);
    entry("本丸", "本丸のみんなで休憩を取り、全員の疲労が和らいだ。");
    consume(); save(); closeModal(); setView("journal");
  };
  document.documentElement.classList.add("short-season-transition");
})();
