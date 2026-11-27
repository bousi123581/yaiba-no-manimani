/* Annual objectives and UI/gameplay extensions layered over the base game. */
(() => {
  const RESOURCE_KEYS = ["wood", "stone", "coal", "iron", "coins"];
  const RESOURCE_LABELS = { wood: "木", stone: "石", coal: "炭", iron: "鉄", coins: "小判" };
  const MISSION_TEMPLATES = [
    { id: "sortie", label: "出陣を2回行う", target: 2 },
    { id: "training", label: "演練を1回行う", target: 1 },
    { id: "forge", label: "鍛刀を1回行う", target: 1 },
    { id: "duty", label: "内番を1回行う", target: 1 },
  ];
  // Capture originals before replacing globals; capturing after assignment caused openTalk recursion.
  const base = {
    fresh, load, save, render, renderHome, renderActions, renderBook, renderJournal,
    renderBattleView, renderStatus, action, advanceSeason, talkChoice, doDuty,
    battleStep, advanceBattle, returnBattle, consume, forge, entry, resetGame,
  };
  let freeLog = false;

  function conditionFor(hp) {
    if (hp <= 20) return "重症";
    if (hp <= 49) return "中傷";
    if (hp <= 74) return "軽傷";
    return "健康";
  }
  function normalize(state) {
    if (!state) return state;
    if (!Array.isArray(state.missions) || state.missions.length !== MISSION_TEMPLATES.length) {
      state.missions = MISSION_TEMPLATES.map((mission) => ({ ...mission, progress: 0 }));
    } else {
      state.missions = MISSION_TEMPLATES.map((template) => {
        const saved = state.missions.find((mission) => mission.id === template.id);
        return { ...template, progress: Math.max(0, Math.min(template.target, Number.isFinite(saved?.progress) ? saved.progress : 0)) };
      });
    }
    state.missionCycle = Number.isFinite(state.missionCycle) ? state.missionCycle : 0;
    state.penaltySeasonsRemaining = Math.max(0, Number.isFinite(state.penaltySeasonsRemaining) ? state.penaltySeasonsRemaining : 0);
    state.penaltyActive = state.penaltySeasonsRemaining > 0;
    state.spontaneousEventTurns = Number.isFinite(state.spontaneousEventTurns) ? state.spontaneousEventTurns : -1;
    (state.owned || []).forEach((member) => {
      if (!Number.isFinite(member.hp)) {
        member.hp = ({ 健康: 100, 軽傷: 70, 中傷: 45, 重傷: 20, 重症: 20 })[member.condition] ?? 100;
      }
      member.hp = clamp(member.hp, 0, 100);
      member.condition = conditionFor(member.hp);
      member.trainingExp = Number.isFinite(member.trainingExp) ? member.trainingExp : 0;
    });
    return state;
  }
  function progress(id, amount = 1) {
    normalize(G);
    const mission = G?.missions.find((item) => item.id === id);
    if (mission) mission.progress = Math.min(mission.target, mission.progress + amount);
  }
  function hpMarkup(member) {
    const hp = clamp(Number.isFinite(member.hp) ? member.hp : 100);
    const tone = hp <= 20 ? "hp-critical" : hp <= 49 ? "hp-moderate" : hp <= 74 ? "hp-light" : "hp-healthy";
    return `<div class="hp-card ${tone}"><div class="hp-label"><span>HP ${hp}/100</span><strong>${conditionFor(hp)}</strong></div><div class="hp-track"><span style="width:${hp}%"></span></div></div>`;
  }
  function missionMarkup() {
    normalize(G);
    const done = G.missions.filter((mission) => mission.progress >= mission.target).length;
    return `<section class="paper annual-missions"><h3>年間任務目標</h3><p class="mission-limit">期限：1年以内（春・夏・秋・冬の4季）</p><p class="muted">全目標達成で各資源+50。期限内に達成できない場合、資源減少と次季の会話制限が発生します。</p><ul>${G.missions.map((mission) => `<li class="${mission.progress >= mission.target ? "is-complete" : ""}"><span>${mission.progress >= mission.target ? "✓" : "□"} ${mission.label}</span><b>${mission.progress}/${mission.target}</b></li>`).join("")}</ul><p class="mission-total">達成 ${done}/${G.missions.length}</p>${G.penaltyActive ? '<p class="danger">任務未達ペナルティ中：刀剣との会話はできません。</p>' : ""}</section>`;
  }
  function showTalkPenalty() {
    modalOpen('<h2>会話できません</h2><p>年間任務未達のペナルティ中です。次の季節が終わるまで刀剣男士との会話はできません。</p><button class="wide" onclick="closeModal()">確認</button>');
  }
  function addMissionToHome() {
    const app = $("app");
    if (!app || app.querySelector(".annual-missions")) return;
    const hero = app.querySelector(".hero");
    if (hero) hero.insertAdjacentHTML("afterend", missionMarkup());
  }
  function addHealthToBook() {
    const app = $("app");
    if (!app) return;
    const cards = [...app.querySelectorAll(":scope > section.paper")];
    G.owned.forEach((member, index) => {
      const card = cards[index];
      if (!card || card.querySelector(".hp-card")) return;
      (card.querySelector(".book-info") || card).insertAdjacentHTML("beforeend", hpMarkup(member));
    });
  }
  function renderCompactStatus() {
    if (!G) return;
    const r = G.resources || {};
    const calm = 100 - clamp(Number(G.black) || 0);
    const seasonMark = seasonEmoji[G.season] || "";
    $("status").className = "status" + (folded ? " folded" : "");
    $("status").innerHTML = `<div class="statgrid"><div class="stat">就任 ${G.year}年目 / ${G.age}歳</div><div class="stat">${seasonMark} ${G.season}</div><div class="stat">審神者Lv.${G.level} / 行動 ${G.actions}/${G.maxActions}</div><div class="stat">近侍：${sword(G.adjutant)?.name || "未設定"}</div><div class="stat resource-stat">資源　木 ${r.wood ?? 0} / 石 ${r.stone ?? 0} / 炭 ${r.coal ?? 0} / 鉄 ${r.iron ?? 0} / 小判 ${r.coins ?? 0}</div><div class="stat calm-stat"><div class="calm-caption"><span>本丸の穏やかさ</span><b>${calm}%</b></div><div class="calm-track"><span style="width:${calm}%"></span></div><small>ブラック本丸 ${100 - calm}%</small></div></div>`;
  }
  function appendLatestBattleLog() {
    if (!BATTLE) return;
    const app = $("app");
    if (!app) return;
    const title = app.querySelector(":scope > h2");
    if (title) { title.textContent = "進軍"; title.classList.add("expedition-title"); }
    let latest = app.querySelector(".expedition-latest");
    if (!latest) {
      latest = document.createElement("section");
      latest.className = "paper expedition-latest";
      latest.setAttribute("aria-live", "polite");
      (title || app.firstElementChild)?.insertAdjacentElement(title ? "afterend" : "beforebegin", latest);
      if (!latest.isConnected) app.prepend(latest);
    }
    latest.innerHTML = `<span>最新の進軍記録</span><p>${(BATTLE.logs || []).at(-1) || "進軍中"}</p>`;
    const history = app.querySelector(".battle-history");
    if (history) history.hidden = true;
    const details = app.querySelector(".battle-details");
    if (details) {
      details.open = true;
      details.classList.add("expedition-lower-details");
      details.querySelectorAll(".listitem").forEach((item) => {
        const n = item.querySelector("b")?.textContent;
        const member = G.owned.find((o) => sword(o.id)?.name === n);
        if (member && !item.querySelector(".hp-card")) item.insertAdjacentHTML("beforeend", hpMarkup(member));
      });
      const controls = app.querySelector(".battle-fixed-controls");
      if (controls) controls.insertAdjacentElement("beforebegin", details);
      else app.append(details);
    }
  }
  function addBattleDamage() {
    if (!BATTLE || BATTLE.damageApplied) return;
    const party = (BATTLE.party || []).map((id) => owned(id)).filter(Boolean);
    if (!party.length) return;
    const target = rand(party);
    const damage = BATTLE.boss ? 30 : 18;
    target.hp = clamp((Number.isFinite(target.hp) ? target.hp : 100) - damage);
    target.condition = conditionFor(target.hp);
    BATTLE.damageApplied = true;
    BATTLE.logs.push(`${sword(target.id).name}が負傷（HP -${damage}）。状態：${target.condition}。`);
  }
  function spontaneousTalk() {
    if (!G?.owned?.length || G.spontaneousEventTurns === G.turns || BATTLE) return;
    G.spontaneousEventTurns = G.turns;
    const member = rand(G.owned);
    const sw = sword(member.id);
    if (!sw) return;
    const lines = [
      `${sw.name}が本丸での出来事を話しに来た。`,
      `${sw.name}が近況を聞いてほしいと声をかけてきた。`,
      `${sw.name}がふとした思い出を語ってくれた。`,
      `${sw.name}が皆の様子を話しながら、穏やかな時間を過ごした。`,
    ];
    const text = rand(lines);
    freeLog = true;
    entry(sw.name, text);
    if (G.logs[0]) G.logs[0].n = null;
    freeLog = false;
    member.aff = clamp(member.aff + 2);
    member.trust = member.aff;
    save();
    modalOpen(`<div class="portrait">${sw.art}</div><h2>${sw.name}からの話</h2><p class="dialog-line">${text}</p><p>行動回数を消費せず、信頼度が2上がりました。</p><button class="wide" onclick="closeModal()">聞く</button>`);
  }
  function addJournalFreeLogLabelFix() {
    const app = $("app");
    if (!app) return;
    app.querySelectorAll("section.paper .muted").forEach((node) => {
      node.textContent = node.textContent.replace(/\s*行動(?:\d+|undefined)回目/, "");
    });
  }

  window.fresh = () => normalize(base.fresh());
  window.load = () => normalize(base.load());
  window.save = () => { normalize(G); return base.save(); };
  window.renderStatus = renderCompactStatus;
  window.renderHome = () => { base.renderHome(); addMissionToHome(); };
  window.renderActions = () => {
    base.renderActions();
    const app = $("app");
    const panel = app?.querySelector(".actions");
    if (panel && !panel.querySelector("[data-treatment-action]")) panel.insertAdjacentHTML("beforeend", '<button data-treatment-action onclick="action(\'手入れ\')">🩹 手入れ</button>');
  };
  window.renderBook = () => { base.renderBook(); addHealthToBook(); };
  window.renderJournal = () => { base.renderJournal(); addJournalFreeLogLabelFix(); };
  window.renderBattleView = () => { base.renderBattleView(); appendLatestBattleLog(); };
  window.render = () => {
    normalize(G);
    base.render();
    if (view === "home") addMissionToHome();
    if (view === "book") addHealthToBook();
    if (view === "journal") addJournalFreeLogLabelFix();
    if (view === "expedition") appendLatestBattleLog();
  };
  window.action = (name) => {
    if (!G) return;
    normalize(G);
    if (name === "休息・万屋" && G.penaltySeasonsRemaining > 0) {
      modalOpen('<h2>休息は選べません</h2><p>ペナルティ中のため、次の季節が終わるまで休息できません。</p><button class="wide" onclick="closeModal()">確認</button>');
      return;
    }
    if (name === "演練") {
      if (!G.owned.length) return modalOpen('<h2>演練できません</h2><p>先に刀剣男士を迎えましょう。</p><button class="wide" onclick="closeModal()">戻る</button>');
      modalOpen(`<h2>演練する刀剣を選ぶ</h2><p>選んだ刀剣に経験値20を付与します。</p><div class="choice">${G.owned.map((member) => `<button onclick="trainSword('${member.id}')">${sword(member.id).name}　Lv.${member.level}　${conditionFor(member.hp)}</button>`).join("")}</div><button class="wide" onclick="closeModal()">戻る</button>`);
      return;
    }
    if (name === "手入れ") {
      const injured = G.owned.filter((member) => member.hp < 100);
      if (!injured.length) return modalOpen('<h2>手入れは不要です</h2><p>負傷している刀剣はいません。</p><button class="wide" onclick="closeModal()">戻る</button>');
      const canTreat = G.resources.iron >= 50 && G.resources.stone >= 50;
      modalOpen(`<h2>手入れ</h2><p>玉鋼50・砥石50を使い、選んだ刀剣のHPを50回復します。</p>${canTreat ? "" : '<p class="danger">資材が不足しています。</p>'}<div class="choice">${injured.map((member) => `<button ${canTreat ? "" : "disabled"} onclick="treatSword('${member.id}')">${sword(member.id).name}　${conditionFor(member.hp)}　HP ${member.hp}/100</button>`).join("")}</div><button class="wide" onclick="closeModal()">戻る</button>`);
      return;
    }
    return base.action(name);
  };
  window.treatSword = (id) => {
    const member = owned(id);
    if (!member || member.hp >= 100 || G.resources.iron < 50 || G.resources.stone < 50) return;
    G.resources.iron -= 50;
    G.resources.stone -= 50;
    member.hp = clamp(member.hp + 50);
    member.condition = conditionFor(member.hp);
    entry(sword(id).name, `手入れを行い、HPが${member.hp}/100に回復した。状態：${member.condition}。`);
    consume(); save(); closeModal(); setView("journal");
  };
  window.trainSword = (id) => {
    const member = owned(id);
    if (!member) return;
    member.trainingExp += 20;
    while (member.trainingExp >= member.level * 30) { member.trainingExp -= member.level * 30; member.level++; }
    G.level++;
    G.exp += 15;
    member.aff = clamp(member.aff + 4);
    member.trust = member.aff;
    progress("training");
    entry(sword(id).name, `演練を行い、${sword(id).name}が経験を積んだ。`);
    consume(); save(); closeModal(); setView("journal");
  };
  const baseOpenTalk = openTalk;
  window.openTalk = () => {
    if (G?.penaltySeasonsRemaining > 0) return showTalkPenalty();
    return baseOpenTalk();
  };
  window.startTalk = (id) => {
    if (G?.penaltySeasonsRemaining > 0) return showTalkPenalty();
    TALK_TARGET = id;
    return window.openTalk();
  };
  window.talkChoice = (...args) => {
    if (G?.penaltySeasonsRemaining > 0) return showTalkPenalty();
    base.talkChoice(...args);
    progress("sortie", 0); // Conversation is an action, but not a mission objective.
    consume();
    save();
  };
  window.openCrossTalk = (id) => {
    if (G?.penaltySeasonsRemaining > 0) return showTalkPenalty();
    const count = G.logs.length;
    base.openCrossTalk(id);
    if (G.logs.length > count) { consume(); save(); }
  };
  window.doDuty = (id) => { base.doDuty(id); progress("duty"); save(); };
  // Crafting consumes 50 of each basic resource; the base implementation already deducts 100 wood and iron.
  window.forge = () => {
    if (RESOURCE_KEYS.some((key) => (G.resources[key] || 0) < 50)) {
      modalOpen('<h2>資材不足</h2><p>鍛刀には木・石・炭・鉄が各50必要です。</p><button class="wide" onclick="closeModal()">戻る</button>');
      return;
    }
    const oldCount = G.owned.length;
    base.forge();
    if (G.owned.length > oldCount) {
      G.resources.wood += 50;
      G.resources.iron += 50;
      G.resources.stone -= 50;
      G.resources.coal -= 50;
      progress("forge");
      save();
    }
  };
  window.consume = (...args) => {
    normalize(G);
    const injured = (G?.owned || []).filter((member) => member.hp < 75);
    if (injured.length) {
      const pressure = injured.reduce((sum, member) => sum + (member.hp <= 20 ? 2 : 1), 0);
      G.black = clamp((G.black || 0) + pressure);
      freeLog = true;
      entry("本丸", `負傷した刀剣を手入れせずに過ごし、ブラック本丸ゲージが${pressure}上昇した。`);
      if (G.logs[0]) G.logs[0].n = null;
      freeLog = false;
    }
    const beforeTurns = G?.turns || 0;
    const result = base.consume(...args);
    if (G && G.turns !== beforeTurns && G.turns % 2 === 0 && G.spontaneousEventTurns !== G.turns) spontaneousTalk();
    return result;
  };
  window.advanceBattle = (...args) => {
    const result = base.advanceBattle(...args);
    if (BATTLE?.status === "戦闘中") BATTLE.damageApplied = false;
    save();
    return result;
  };
  window.battleStep = (...args) => {
    const result = base.battleStep(...args);
    if (BATTLE && BATTLE.status !== "戦闘中" && !BATTLE.damageApplied) addBattleDamage();
    if (BATTLE) { save(); appendLatestBattleLog(); }
    return result;
  };
  window.returnBattle = (...args) => {
    if (BATTLE && !BATTLE.retreated) progress("sortie");
    if (BATTLE) (BATTLE.party || []).forEach((id) => {
      const member = owned(id);
      if (member && member.hp <= 20) member.fatigue = clamp(member.fatigue + 5);
    });
    return base.returnBattle(...args);
  };
  window.advanceSeason = (...args) => {
    if (!G) return base.advanceSeason(...args);
    normalize(G);
    const winterEnd = G.season === "冬";
    const hadPenalty = G.penaltySeasonsRemaining > 0;
    let report = "";
    if (winterEnd) {
      const complete = G.missions.every((mission) => mission.progress >= mission.target);
      if (complete) {
        RESOURCE_KEYS.forEach((key) => { G.resources[key] = (Number(G.resources[key]) || 0) + 50; });
        report = `年間任務達成。報酬として${RESOURCE_KEYS.map((key) => `${RESOURCE_LABELS[key]}+50`).join("、")}。`;
        entry("本丸", "年間任務をすべて達成。各資源を50ずつ獲得した。");
      } else {
        const missed = G.missions.filter((mission) => mission.progress < mission.target).map((mission) => mission.label);
        RESOURCE_KEYS.forEach((key) => { G.resources[key] = Math.max(0, (Number(G.resources[key]) || 0) - 30); });
        G.penaltySeasonsRemaining = 1;
        G.penaltyActive = true;
        report = `未達任務：${missed.join("、")}。ペナルティ：各資源-30、次季の会話制限。`;
        entry("本丸", `年間任務未達。各資源を30失い、次季は会話制限。未達：${missed.join("、")}`);
      }
      G.missionCycle++;
      G.missions = MISSION_TEMPLATES.map((mission) => ({ ...mission, progress: 0 }));
    }
    const result = base.advanceSeason(...args);
    if (!winterEnd && hadPenalty && G.penaltySeasonsRemaining > 0) {
      G.penaltySeasonsRemaining--;
      G.penaltyActive = G.penaltySeasonsRemaining > 0;
    }
    if (report) modalOpen(`<h2>${winterEnd && G.missions.every((m) => !m.progress) ? (report.startsWith("年間任務達成") ? "年間任務達成" : "年間任務の期限") : "年間任務"}</h2><p>${report}</p><button class="wide" onclick="closeModal()">確認</button>`);
    save();
    return result;
  };
  window.renderStatus = renderCompactStatus;
  window.resetGame = () => { base.resetGame(); folded = false; };
  // One fixed sticky header contains both brand/fold control and the collapsible status panel.
  const header = document.querySelector(".top");
  const status = $("status");
  if (header && status && status.parentElement !== header) header.append(status);
  const foldButton = $("fold");
  if (foldButton) foldButton.onclick = () => { folded = !folded; renderCompactStatus(); foldButton.setAttribute("aria-expanded", String(!folded)); };
  normalize(G);
})();
