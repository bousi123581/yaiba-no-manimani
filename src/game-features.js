/* Annual objectives, targeted sword training, injury treatment, and expedition readability. */
(() => {
  const RESOURCES = ["wood", "stone", "iron", "coal", "coins"];
  const RESOURCE_LABELS = { wood: "木材", stone: "砥石", iron: "玉鋼", coal: "冷却材", coins: "小判" };
  const MISSION_TEMPLATES = [
    { id: "training", label: "演練を2回行う", target: 2 },
    { id: "talk", label: "刀剣男士と2回語らう", target: 2 },
    { id: "duty", label: "内番を1回行う", target: 1 },
  ];
  const original = {
    fresh, load, render, renderHome, renderActions, renderBook, renderBattleView,
    action, advanceSeason, talkChoice, doDuty, battleStep, advanceBattle,
    returnBattle, save, consume, grant, openCrossTalk,
  };

  function createMissions() {
    return MISSION_TEMPLATES.map((mission) => ({ ...mission, progress: 0 }));
  }
  function conditionFor(hp) {
    if (hp <= 20) return "重症";
    if (hp <= 49) return "中傷";
    if (hp <= 74) return "軽傷";
    return "健康";
  }
  function normalizeGame(state) {
    if (!state) return state;
    if (!Array.isArray(state.missions) || state.missions.length !== MISSION_TEMPLATES.length) {
      state.missions = createMissions();
    } else {
      state.missions = MISSION_TEMPLATES.map((template) => {
        const saved = state.missions.find((mission) => mission.id === template.id);
        return { ...template, progress: Math.max(0, Math.min(template.target, Number.isFinite(saved?.progress) ? saved.progress : 0)) };
      });
    }
    state.missionCycle = Number.isFinite(state.missionCycle) ? state.missionCycle : 0;
    state.penaltySeasonsRemaining = Math.max(0, Number.isFinite(state.penaltySeasonsRemaining) ? state.penaltySeasonsRemaining : 0);
    state.penaltyActive = state.penaltySeasonsRemaining > 0;
    (state.owned || []).forEach((member) => {
      if (!Number.isFinite(member.hp)) {
        const legacyHp = { 健康: 100, 軽傷: 70, 中傷: 45, 重傷: 20, 重症: 20 };
        member.hp = legacyHp[member.condition] ?? 100;
      }
      member.hp = clamp(member.hp, 0, 100);
      member.condition = conditionFor(member.hp);
      member.trainingExp = Number.isFinite(member.trainingExp) ? member.trainingExp : 0;
    });
    return state;
  }
  function hpMarkup(member) {
    const hp = clamp(Number.isFinite(member.hp) ? member.hp : 100);
    const state = conditionFor(hp);
    const tone = hp <= 20 ? "hp-critical" : hp <= 49 ? "hp-moderate" : hp <= 74 ? "hp-light" : "hp-healthy";
    return `<div class="hp-card ${tone}" aria-label="HP ${hp}、${state}"><div class="hp-label"><span>HP ${hp}/100</span><strong>${state}</strong></div><div class="hp-track"><span style="width:${hp}%"></span></div></div>`;
  }
  function missionMarkup() {
    normalizeGame(G);
    const done = G.missions.filter((mission) => mission.progress >= mission.target).length;
    const locked = G.penaltySeasonsRemaining > 0;
    return `<section class="paper annual-missions"><h3>年間任務目標</h3><p class="mission-limit">期限：1年以内（春・夏・秋・冬の4季）</p><p class="muted">全目標達成で各資源+50。期限内に達成できない場合、資源減少と次季の制限が発生します。</p><ul>${G.missions.map((mission) => `<li class="${mission.progress >= mission.target ? "is-complete" : ""}"><span>${mission.progress >= mission.target ? "✓" : "□"} ${mission.label}</span><b>${mission.progress}/${mission.target}</b></li>`).join("")}</ul><p class="mission-total">達成 ${done}/${G.missions.length}</p>${locked ? '<p class="danger">任務未達ペナルティ中：休息・会話は選べません。</p>' : ""}</section>`;
  }
  function progressMission(id, count = 1) {
    normalizeGame(G);
    const mission = G?.missions.find((item) => item.id === id);
    if (mission) mission.progress = Math.min(mission.target, mission.progress + count);
  }
  function showLock(name) {
    modalOpen(`<h2>${name}は選べません</h2><p>年間任務未達のペナルティ中です。この季節は休息と刀剣男士との会話ができません。</p><button class="wide" onclick="closeModal()">確認</button>`);
  }
  function showMissionsOnHome() {
    const app = $("app");
    if (!app || app.querySelector(".annual-missions")) return;
    const hero = app.querySelector(".hero");
    if (hero) hero.insertAdjacentHTML("afterend", missionMarkup());
  }
  function addHpToBook() {
    const app = $("app");
    if (!app) return;
    const cards = [...app.querySelectorAll(":scope > section.paper")].filter((card) => !card.classList.contains("annual-missions"));
    G.owned.forEach((member, index) => {
      const card = cards[index];
      if (!card || card.querySelector(".hp-card")) return;
      const info = card.querySelector(".book-info") || card;
      info.insertAdjacentHTML("beforeend", hpMarkup(member));
    });
  }
  function improveBattleScreen() {
    if (!BATTLE) return;
    const app = $("app");
    if (!app) return;
    const title = app.querySelector(":scope > h2");
    if (title) {
      title.textContent = "進軍";
      title.classList.add("expedition-title");
    }
    const latestText = (BATTLE.logs || []).at(-1) || "部隊は進軍の準備を整えている。";
    let latest = app.querySelector(".expedition-latest");
    if (!latest) {
      latest = document.createElement("section");
      latest.className = "paper expedition-latest";
      latest.setAttribute("aria-live", "polite");
      if (title) title.insertAdjacentElement("afterend", latest);
      else app.prepend(latest);
    }
    latest.innerHTML = `<span>最新の進軍記録</span><p>${latestText}</p>`;
    const history = app.querySelector(".battle-history");
    if (history) history.hidden = true;
    const details = app.querySelector(".battle-details");
    if (details) {
      details.open = false;
      details.classList.add("expedition-lower-details");
      details.querySelectorAll(".listitem").forEach((item) => {
        const name = item.querySelector("b")?.textContent;
        const member = G.owned.find((entry) => sword(entry.id)?.name === name);
        if (member && !item.querySelector(".hp-card")) item.insertAdjacentHTML("beforeend", hpMarkup(member));
      });
      const controls = app.querySelector(".battle-fixed-controls");
      if (controls) controls.insertAdjacentElement("beforebegin", details);
      else app.append(details);
    }
  }
  function trainingMenu() {
    if (!G.owned.length) {
      modalOpen('<h2>演練できません</h2><p>先に刀剣男士を迎えましょう。</p><button class="wide" onclick="closeModal()">戻る</button>');
      return;
    }
    modalOpen(`<h2>演練する刀剣を選ぶ</h2><p>演練で選んだ刀剣に経験値20を付与します。</p><div class="choice">${G.owned.map((member) => `<button onclick="trainSword('${member.id}')">${sword(member.id).name}　Lv.${member.level}　${conditionFor(member.hp)}<small>経験値 ${member.trainingExp || 0}</small></button>`).join("")}</div><button class="wide" onclick="closeModal()">戻る</button>`);
  }
  function trainSword(id) {
    const member = owned(id);
    if (!member) return;
    member.trainingExp = (member.trainingExp || 0) + 20;
    let levels = 0;
    while (member.trainingExp >= member.level * 30) {
      member.trainingExp -= member.level * 30;
      member.level++;
      levels++;
    }
    G.level = (G.level || 1) + 1;
    G.exp = (G.exp || 0) + 15;
    member.aff = clamp(member.aff + 4);
    member.trust = member.aff;
    progressMission("training");
    entry(sword(id).name, `演練を行い、${sword(id).name}が経験を積んだ。${levels ? ` Lv.${member.level}に成長。` : ""}`);
    consume();
    save();
    closeModal();
    setView("journal");
  }
  function treatmentMenu() {
    const injured = G.owned.filter((member) => member.hp < 100);
    if (!injured.length) {
      modalOpen('<h2>手入れは不要です</h2><p>負傷している刀剣はいません。</p><button class="wide" onclick="closeModal()">戻る</button>');
      return;
    }
    const canTreat = G.resources.iron >= 20 && G.resources.stone >= 10;
    modalOpen(`<h2>手入れ</h2><p>玉鋼20・砥石10を使い、選んだ刀剣のHPを40回復します。</p>${canTreat ? "" : '<p class="danger">資材が不足しています。</p>'}<div class="choice">${injured.map((member) => `<button ${canTreat ? "" : "disabled"} onclick="treatSword('${member.id}')">${sword(member.id).name}　${conditionFor(member.hp)}　HP ${member.hp}/100</button>`).join("")}</div><button class="wide" onclick="closeModal()">戻る</button>`);
  }
  function treatSword(id) {
    const member = owned(id);
    if (!member || member.hp >= 100 || G.resources.iron < 20 || G.resources.stone < 10) return;
    G.resources.iron -= 20;
    G.resources.stone -= 10;
    member.hp = clamp(member.hp + 40);
    member.condition = conditionFor(member.hp);
    entry(sword(id).name, `手入れを行い、HPが${member.hp}/100に回復した。状態：${member.condition}。`);
    consume();
    save();
    closeModal();
    setView("journal");
  }
  function inflictBattleDamage() {
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

  window.fresh = function () { return normalizeGame(original.fresh()); };
  window.load = function () { return normalizeGame(original.load()); };
  window.save = function () { normalizeGame(G); return original.save(); };
  window.grant = function (id) {
    const wasOwned = Boolean(owned(id));
    const result = original.grant(id);
    if (result && !wasOwned) {
      const member = owned(id);
      if (member) { member.hp = 100; member.condition = "健康"; member.trainingExp = 0; }
    }
    return result;
  };
  window.render = function () {
    normalizeGame(G);
    original.render();
    if (view === "home") showMissionsOnHome();
    if (view === "actions") {
      const panel = $("app")?.querySelector(".actions");
      if (panel && !panel.querySelector("[data-treatment-action]")) {
        const button = document.createElement("button");
        button.dataset.treatmentAction = "true";
        button.textContent = "🩹 手入れ";
        button.onclick = () => action("手入れ");
        panel.append(button);
      }
      if (panel && !$("app").querySelector(".annual-missions")) panel.insertAdjacentHTML("beforebegin", missionMarkup());
    }
    if (view === "book") addHpToBook();
    if (view === "expedition") improveBattleScreen();
  };
  window.renderHome = function () { original.renderHome(); showMissionsOnHome(); };
  window.renderActions = function () {
    original.renderActions();
    const app = $("app");
    const panel = app?.querySelector(".actions");
    if (panel && !panel.querySelector("[data-treatment-action]")) panel.insertAdjacentHTML("beforeend", '<button data-treatment-action onclick="action(\'手入れ\')">🩹 手入れ</button>');
    if (panel && !app.querySelector(".annual-missions")) panel.insertAdjacentHTML("beforebegin", missionMarkup());
  };
  window.renderBook = function () { original.renderBook(); addHpToBook(); };
  window.renderBattleView = function () { original.renderBattleView(); improveBattleScreen(); };
  window.action = function (name) {
    if (!G) return;
    normalizeGame(G);
    if (G.penaltySeasonsRemaining > 0 && name === "休息・万屋") return showLock("休息");
    if (name === "演練") return trainingMenu();
    if (name === "手入れ") return treatmentMenu();
    return original.action(name);
  };
  window.startTalk = function (id) {
    if (G?.penaltySeasonsRemaining > 0) return showLock("会話");
    TALK_TARGET = id;
    return openTalk();
  };
  window.openTalk = function () {
    if (G?.penaltySeasonsRemaining > 0) return showLock("会話");
    return _originalOpenTalk();
  };
  const _originalOpenTalk = openTalk;
  window.talkChoice = function (...args) {
    if (G?.penaltySeasonsRemaining > 0) return showLock("会話");
    original.talkChoice(...args);
    progressMission("talk");
    save();
  };
  window.openCrossTalk = function (id) {
    if (G?.penaltySeasonsRemaining > 0) return showLock("会話");
    const logCount = G.logs.length;
    original.openCrossTalk(id);
    if (G.logs.length > logCount) progressMission("talk");
    save();
  };
  window.doDuty = function (id) {
    original.doDuty(id);
    progressMission("duty");
    save();
  };
  window.trainSword = trainSword;
  window.treatSword = treatSword;
  window.consume = function (...args) {
    normalizeGame(G);
    const injured = (G?.owned || []).filter((member) => member.hp < 75);
    if (injured.length) {
      const pressure = injured.reduce((sum, member) => sum + (member.hp <= 20 ? 2 : 1), 0);
      G.black = clamp((G.black || 0) + pressure);
      entry("本丸", `負傷した刀剣を手入れせずに過ごし、ブラック本丸ゲージが${pressure}上昇した。`);
    }
    return original.consume(...args);
  };
  window.advanceBattle = function (...args) {
    const result = original.advanceBattle(...args);
    if (BATTLE?.status === "戦闘中") BATTLE.damageApplied = false;
    save();
    return result;
  };
  window.battleStep = function (...args) {
    const result = original.battleStep(...args);
    if (BATTLE && BATTLE.status !== "戦闘中" && !BATTLE.damageApplied) inflictBattleDamage();
    if (BATTLE) save();
    if (view === "expedition") { renderBattleView(); }
    return result;
  };
  window.returnBattle = function (...args) {
    if (BATTLE) {
      (BATTLE.party || []).forEach((id) => {
        const member = owned(id);
        if (member && member.hp <= 20) member.fatigue = clamp(member.fatigue + 5);
      });
    }
    return original.returnBattle(...args);
  };
  window.advanceSeason = function (...args) {
    if (!G) return original.advanceSeason(...args);
    normalizeGame(G);
    const winterEnd = G.season === "冬";
    const hadPenalty = G.penaltySeasonsRemaining > 0;
    let resultMessage = "";
    if (winterEnd) {
      const allComplete = G.missions.every((mission) => mission.progress >= mission.target);
      if (allComplete) {
        RESOURCES.forEach((key) => { G.resources[key] = (Number(G.resources[key]) || 0) + 50; });
        resultMessage = `年間任務をすべて達成しました。報酬：${RESOURCES.map((key) => `${RESOURCE_LABELS[key]} +50`).join("、")}。`;
        entry("本丸", "年間任務を全達成し、各資源を50ずつ獲得した。");
      } else {
        const missed = G.missions.filter((mission) => mission.progress < mission.target).map((mission) => mission.label);
        RESOURCES.forEach((key) => { G.resources[key] = Math.max(0, (Number(G.resources[key]) || 0) - 30); });
        G.penaltySeasonsRemaining = 1;
        G.penaltyActive = true;
        resultMessage = `未達任務：${missed.join("、")}。ペナルティ：各資源-30、次の季節は休息・刀剣との会話が不可。`;
        entry("本丸", `年間任務未達。各資源を30失い、次季の休息・会話が制限された。未達：${missed.join("、")}`);
      }
      G.missionCycle++;
      G.missions = createMissions();
    }
    const result = original.advanceSeason(...args);
    if (!winterEnd && hadPenalty && G.penaltySeasonsRemaining > 0) {
      G.penaltySeasonsRemaining--;
      G.penaltyActive = G.penaltySeasonsRemaining > 0;
    }
    if (resultMessage) {
      const title = winterEnd && resultMessage.startsWith("年間任務をすべて") ? "年間任務達成" : "年間任務の期限";
      modalOpen(`<h2>${title}</h2><p>${resultMessage}</p><button class="wide" onclick="closeModal()">確認</button>`);
    }
    save();
    return result;
  };
  // Retain original function reference for the battle-log wrapper without changing its public behavior.
  const _unusedOriginalRenderBattle = original.renderBattleView;
  void _unusedOriginalRenderBattle;
  normalizeGame(G);
})();
