/* Annual objectives and UI/gameplay extensions layered over the base game. */
(() => {
  const MATERIALS = ["wood", "stone", "coal", "iron"];
  const RESOURCE_KEYS = [...MATERIALS, "coins"];
  const RESOURCE_LABELS = { wood: "木", stone: "石", coal: "炭", iron: "鉄", coins: "小判" };
  const MISSION_TEMPLATES = [
    { id: "sortie", label: "出陣を2回行う", target: 2 },
    { id: "training", label: "演練を1回行う", target: 1 },
    { id: "forge", label: "鍛刀を1回行う", target: 1 },
    { id: "duty", label: "内番を1回行う", target: 1 },
  ];
  // Capture originals before replacing globals; the previous wrapper accidentally recursed into itself.
  const base = {
    fresh, load, save, render, renderTitle, renderHome, renderActions, renderBook,
    renderJournal, renderBattleView, renderStatus, action, advanceSeason,
    talkChoice, doDuty, battleStep, advanceBattle, returnBattle, consume,
    entry, resetGame,
  };
  let forgeSession = null;

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
      if (!Number.isFinite(member.hp)) member.hp = ({ 健康: 100, 軽傷: 70, 中傷: 45, 重傷: 20, 重症: 20 })[member.condition] ?? 100;
      member.hp = clamp(member.hp, 0, 100);
      member.condition = conditionFor(member.hp);
      member.trainingExp = Number.isFinite(member.trainingExp) ? member.trainingExp : 0;
      member.fatigue = Number.isFinite(member.fatigue) ? clamp(member.fatigue) : 0;
    });
    if (Array.isArray(state.logs)) state.logs.forEach((log) => {
      if (log.n === null || log.n === undefined) log.n = null;
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
    $("status").className = "status" + (folded ? " folded" : "");
    $("status").innerHTML = `<div class="statgrid"><div class="stat">就任 ${G.year}年目 / ${G.age}歳</div><div class="stat">${seasonEmoji[G.season] || ""} ${G.season}</div><div class="stat">審神者Lv.${G.level} / 行動 ${G.actions}/${G.maxActions}</div><div class="stat">近侍：${sword(G.adjutant)?.name || "未設定"}</div><div class="stat resource-stat">資源　木 ${r.wood ?? 0} / 石 ${r.stone ?? 0} / 炭 ${r.coal ?? 0} / 鉄 ${r.iron ?? 0} / 小判 ${r.coins ?? 0}</div><div class="stat calm-stat"><div class="calm-caption"><span>本丸の穏やかさ</span><b>${calm}%</b></div><div class="calm-track"><span style="width:${calm}%"></span></div><small>ブラック本丸 ${100 - calm}%</small></div></div>`;
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
      if (title) title.insertAdjacentElement("afterend", latest);
      else app.prepend(latest);
    }
    latest.innerHTML = `<span>最新の進軍記録</span><p>${(BATTLE.logs || []).at(-1) || "進軍中"}</p>`;
    const history = app.querySelector(".battle-history");
    if (history) history.hidden = true;
    const details = app.querySelector(".battle-details");
    if (details) {
      details.open = true;
      details.classList.add("expedition-lower-details");
      details.querySelectorAll(".listitem").forEach((item) => {
        const name = item.querySelector("b")?.textContent;
        const member = G.owned.find((o) => sword(o.id)?.name === name);
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
    const text = rand([
      `${sw.name}が本丸での出来事を話しに来た。`,
      `${sw.name}が近況を聞いてほしいと声をかけてきた。`,
      `${sw.name}がふとした思い出を語ってくれた。`,
      `${sw.name}が皆の様子を話しながら、穏やかな時間を過ごした。`,
    ]);
    base.entry(sw.name, text);
    if (G.logs[0]) G.logs[0].n = null;
    member.aff = clamp(member.aff + 2);
    member.trust = member.aff;
    base.save();
    modalOpen(`<div class="portrait">${sw.art}</div><h2>${sw.name}からの話</h2><p class="dialog-line">${text}</p><p>行動回数を消費せず、信頼度が2上がりました。</p><button class="wide" onclick="closeModal()">聞く</button>`);
  }
  function cleanJournal() {
    const app = $("app");
    if (!app) return;
    app.querySelectorAll("section.paper .muted").forEach((node) => {
      node.textContent = node.textContent.replace(/\s*行動(?:null|undefined)回目/, "");
    });
  }
  function refreshTitleSuffix() {
    const heading = $("app")?.querySelector(".hero h1");
    if (heading && !heading.textContent.includes("試作中")) heading.textContent += "（試作中）";
  }
  function restEveryone() {
    if (!G || G.actions <= 0) return action("休憩");
    G.owned.forEach((member) => { member.fatigue = clamp(member.fatigue - 20); });
    G.black = clamp((G.black || 0) - 3);
    base.entry("本丸", "本丸の皆で休憩を取り、全員の疲労が和らいだ。");
    consume();
    save();
    closeModal();
    setView("journal");
  }
  function openRestMenu() {
    if (!G || G.actions <= 0) return base.action("休憩");
    if (G.penaltySeasonsRemaining > 0) {
      modalOpen('<h2>休憩は選べません</h2><p>任務未達ペナルティ中のため、次の季節が終わるまで休憩できません。</p><button class="wide" onclick="closeModal()">確認</button>');
      return;
    }
    modalOpen(`<h2>休憩</h2><p>誰と休憩しますか？どちらも行動回数を1回消費します。</p><div class="choice"><button onclick="restAdjutant()">近侍と休憩する</button><button onclick="restEveryone()">本丸のみんなで休憩する</button></div><button class="wide" onclick="closeModal()">戻る</button>`);
  }
  function beginForge() {
    if (forgeSession) return;
    const costs = { wood: 100, stone: 100, coal: 100, iron: 100 };
    if (G.owned.length >= 12) return modalOpen('<h2>本丸の顕現枠がいっぱいです</h2><p>最大12振りまで迎えられます。</p><button class="wide" onclick="closeModal()">戻る</button>');
    if (MATERIALS.some((key) => G.resources[key] < costs[key])) return modalOpen('<h2>資材不足</h2><p>鍛刀には木・石・炭・鉄が各100必要です。</p><button class="wide" onclick="closeModal()">戻る</button>');
    const pool = SWORDS.filter((item) => !owned(item.id));
    if (!pool.length) return modalOpen('<h2>顕現できる刀剣男士はいません</h2><p>実装済みの刀剣男士は全員本丸にいます。</p><button class="wide" onclick="closeModal()">戻る</button>');
    forgeSession = { id: rand(pool).id, charged: false };
    modalOpen('<div class="forge-scene"><div class="forge-spark">✦</div><h2>資源を投入しています</h2><p>木・石・炭・鉄を各100ずつ、鍛刀釜へ。</p><div class="forge-materials">🌲　🪨　⚫　⚙️</div><div class="forge-progress"><span></span></div></div>');
    setTimeout(() => {
      if (!forgeSession) return;
      const sw = sword(forgeSession.id);
      modalOpen(`<div class="forge-scene forge-reveal"><div class="forge-sword">${sw.art}</div><h2>鍛刀が完了しました</h2><p>刀身に霊力を込めてください。画面を長押しすると霊力が集まります。</p><button id="forge-charge" class="forge-charge" onpointerdown="startForgeCharge(event)" onpointerup="stopForgeCharge()" onpointercancel="stopForgeCharge()" onpointerleave="stopForgeCharge()">長押しして霊力を込める</button><div class="charge-track"><span id="charge-progress"></span></div><p id="charge-hint" aria-live="polite">長押しを続けてください</p></div>`);
    }, 850);
  }
  function completeForge() {
    if (!forgeSession || forgeSession.charged) return;
    if (G.owned.length >= 12 || MATERIALS.some((key) => G.resources[key] < 100)) {
      forgeSession = null;
      return modalOpen('<h2>顕現できませんでした</h2><p>枠または資材を確認してください。</p><button class="wide" onclick="closeModal()">戻る</button>');
    }
    forgeSession.charged = true;
    MATERIALS.forEach((key) => { G.resources[key] -= 100; });
    const id = forgeSession.id;
    grant(id);
    progress("forge");
    const sw = sword(id);
    base.entry(sw.name, `鍛刀を行い、${sw.name}が顕現した。`);
    consume();
    save();
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    modalOpen(`<div class="forge-scene forge-blossom ${reducedMotion ? "reduced-motion" : ""}"><div class="petal-burst" aria-hidden="true">🌸　✿　🌸　✿　🌸</div><div class="forge-sword">${sw.art}</div><h2>${sw.name} 顕現</h2><p>${sw.lines.normal}</p><button class="wide" onclick="closeModal()">本丸へ</button></div>`);
    forgeSession = null;
    renderStatus();
  }

  window.fresh = () => normalize(base.fresh());
  window.load = () => normalize(base.load());
  window.save = () => { normalize(G); return base.save(); };
  window.renderStatus = renderCompactStatus;
  window.renderTitle = () => { base.renderTitle(); refreshTitleSuffix(); };
  window.renderHome = () => { base.renderHome(); addMissionToHome(); };
  window.renderActions = () => {
    base.renderActions();
    const panel = $("app")?.querySelector(".actions");
    if (!panel) return;
    const restButton = [...panel.querySelectorAll("button")].find((button) => /休息|万屋/.test(button.textContent));
    if (restButton) { restButton.textContent = "休憩"; restButton.setAttribute("onclick", "action('休憩')"); }
    if (!panel.querySelector("[data-treatment-action]")) panel.insertAdjacentHTML("beforeend", '<button data-treatment-action onclick="action(\'手入れ\')">🩹 手入れ</button>');
  };
  window.renderBook = () => { base.renderBook(); addHealthToBook(); };
  window.renderJournal = () => { base.renderJournal(); cleanJournal(); };
  window.renderBattleView = () => { base.renderBattleView(); appendLatestBattleLog(); };
  window.render = () => {
    normalize(G);
    base.render();
    refreshTitleSuffix();
    if (view === "home") addMissionToHome();
    if (view === "actions") {
      const panel = $("app")?.querySelector(".actions");
      if (panel) {
        const restButton = [...panel.querySelectorAll("button")].find((button) => /休息|万屋/.test(button.textContent));
        if (restButton) { restButton.textContent = "休憩"; restButton.setAttribute("onclick", "action('休憩')"); }
        if (!panel.querySelector("[data-treatment-action]")) panel.insertAdjacentHTML("beforeend", '<button data-treatment-action onclick="action(\'手入れ\')">🩹 手入れ</button>');
      }
    }
    if (view === "book") addHealthToBook();
    if (view === "journal") cleanJournal();
    if (view === "expedition") appendLatestBattleLog();
  };
  window.action = (name) => {
    if (!G) return;
    normalize(G);
    if (["休憩", "休息・万屋"].includes(name)) return openRestMenu();
    if (name === "鍛刀") return beginForge();
    if (name === "手入れ") {
      const injured = G.owned.filter((member) => member.hp < 100);
      if (!injured.length) return modalOpen('<h2>手入れは不要です</h2><p>負傷している刀剣はいません。</p><button class="wide" onclick="closeModal()">戻る</button>');
      const canTreat = G.resources.iron >= 50 && G.resources.stone >= 50;
      modalOpen(`<h2>手入れ</h2><p>玉鋼50・砥石50を使い、刀剣のHPを50回復します。</p>${canTreat ? "" : '<p class="danger">資材が不足しています。</p>'}<div class="choice">${injured.map((member) => `<button ${canTreat ? "" : "disabled"} onclick="treatSword('${member.id}')">${sword(member.id).name}　${conditionFor(member.hp)}　HP ${member.hp}/100</button>`).join("")}</div><button class="wide" onclick="closeModal()">戻る</button>`);
      return;
    }
    if (name === "演練") {
      if (!G.owned.length) return modalOpen('<h2>演練できません</h2><p>先に刀剣男士を迎えましょう。</p><button class="wide" onclick="closeModal()">戻る</button>');
      modalOpen(`<h2>演練する刀剣を選ぶ</h2><p>選んだ刀剣に経験値20を付与します。</p><div class="choice">${G.owned.map((member) => `<button onclick="trainSword('${member.id}')">${sword(member.id).name}　Lv.${member.level}　${conditionFor(member.hp)}</button>`).join("")}</div><button class="wide" onclick="closeModal()">戻る</button>`);
      return;
    }
    return base.action(name);
  };
  window.restAdjutant = () => {
    if (!G || G.actions <= 0) return base.action("休憩");
    if (G.penaltySeasonsRemaining > 0) {
      modalOpen('<h2>休憩は選べません</h2><p>ペナルティ中のため、次の季節が終わるまで休憩できません。</p><button class="wide" onclick="closeModal()">確認</button>');
      return;
    }
    const member = owned(G.adjutant);
    if (member) { member.fatigue = clamp(member.fatigue - 20); member.aff = clamp(member.aff + 5); member.trust = member.aff; }
    G.black = clamp((G.black || 0) - 3);
    base.entry(sword(G.adjutant)?.name || "本丸", "近侍と休憩を取り、疲労が和らいだ。");
    consume(); save(); closeModal(); setView("journal");
  };
  window.restEveryone = () => {
    if (!G) return;
    if (G.actions <= 0) return base.action("休憩");
    if (G.penaltySeasonsRemaining > 0) {
      modalOpen('<h2>休憩は選べません</h2><p>ペナルティ中のため、次の季節が終わるまで休憩できません。</p><button class="wide" onclick="closeModal()">確認</button>');
      return;
    }
    G.owned.forEach((member) => { member.fatigue = clamp(member.fatigue - 20); });
    G.black = clamp((G.black || 0) - 3);
    base.entry("本丸", "本丸のみんなで休憩を取り、全員の疲労が和らいだ。");
    consume(); save(); closeModal(); setView("journal");
  };
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
    consume();
    save();
  };
  const baseCrossTalk = openCrossTalk;
  window.openCrossTalk = (id) => {
    if (G?.penaltySeasonsRemaining > 0) return showTalkPenalty();
    const oldLogCount = G.logs.length;
    baseCrossTalk(id);
    if (G.logs.length > oldLogCount) { consume(); save(); }
  };
  window.doDuty = (id) => { base.doDuty(id); progress("duty"); save(); };
  window.treatSword = (id) => {
    const member = owned(id);
    if (!member || member.hp >= 100 || G.resources.iron < 50 || G.resources.stone < 50) return;
    G.resources.iron -= 50; G.resources.stone -= 50;
    member.hp = clamp(member.hp + 50); member.condition = conditionFor(member.hp);
    base.entry(sword(id).name, `手入れを行い、HPが${member.hp}/100に回復した。状態：${member.condition}。`);
    consume(); save(); closeModal(); setView("journal");
  };
  window.trainSword = (id) => {
    const member = owned(id);
    if (!member) return;
    member.trainingExp += 20;
    while (member.trainingExp >= member.level * 30) { member.trainingExp -= member.level * 30; member.level++; }
    G.level++; G.exp += 15; member.aff = clamp(member.aff + 4); member.trust = member.aff;
    progress("training"); base.entry(sword(id).name, `演練を行い、${sword(id).name}が経験を積んだ。`);
    consume(); save(); closeModal(); setView("journal");
  };
  window.beginForgeCharge = () => {};
  window.startForgeCharge = (event) => {
    if (!forgeSession || forgeSession.charged || forgeSession.timer) return;
    event?.preventDefault?.();
    const button = $("forge-charge");
    button?.classList.add("charging");
    const started = Date.now();
    forgeSession.timer = setInterval(() => {
      const amount = Math.min(100, ((Date.now() - started) / 1400) * 100);
      const bar = $("charge-progress");
      if (bar) bar.style.width = `${amount}%`;
      if (amount >= 100) {
        clearInterval(forgeSession.timer);
        forgeSession.timer = null;
        completeForge();
      }
    }, 30);
  };
  window.stopForgeCharge = () => {
    if (!forgeSession?.timer) return;
    clearInterval(forgeSession.timer);
    forgeSession.timer = null;
    const bar = $("charge-progress");
    if (bar) bar.style.width = "0%";
    $("forge-charge")?.classList.remove("charging");
    const hint = $("charge-hint");
    if (hint) hint.textContent = "霊力が途切れました。もう一度長押ししてください。";
  };
  window.consume = (...args) => {
    normalize(G);
    const injured = (G?.owned || []).filter((member) => member.hp <= 49);
    if (injured.length) {
      const pressure = injured.reduce((sum, member) => sum + (member.hp <= 20 ? 2 : 1), 0);
      G.black = clamp((G.black || 0) + pressure);
      base.entry("本丸", `中傷以上の刀剣を手入れせずに過ごし、ブラック本丸ゲージが${pressure}上昇した。`);
      if (G.logs[0]) G.logs[0].n = null;
    }
    const beforeTurns = G?.turns || 0;
    const result = base.consume(...args);
    if (G && G.turns !== beforeTurns && G.turns % 2 === 0 && G.spontaneousEventTurns !== G.turns) spontaneousTalk();
    return result;
  };
  window.advanceBattle = (...args) => {
    const result = base.advanceBattle(...args);
    if (BATTLE?.status === "戦闘中") BATTLE.damageApplied = false;
    save(); return result;
  };
  window.battleStep = (...args) => {
    const result = base.battleStep(...args);
    if (BATTLE && BATTLE.status !== "戦闘中" && !BATTLE.damageApplied) addBattleDamage();
    if (BATTLE) { save(); appendLatestBattleLog(); }
    return result;
  };
  window.returnBattle = (...args) => {
    if (BATTLE && !BATTLE.retreated) progress("sortie");
    if (BATTLE) (BATTLE.party || []).forEach((id) => { const member = owned(id); if (member && member.hp <= 20) member.fatigue = clamp(member.fatigue + 5); });
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
        base.entry("本丸", "年間任務をすべて達成。各資源を50ずつ獲得した。");
      } else {
        const missed = G.missions.filter((mission) => mission.progress < mission.target).map((mission) => mission.label);
        RESOURCE_KEYS.forEach((key) => { G.resources[key] = Math.max(0, (Number(G.resources[key]) || 0) - 30); });
        G.black = clamp((G.black || 0) + 10);
        G.penaltySeasonsRemaining = 1; G.penaltyActive = true;
        report = `未達任務：${missed.join("、")}。ペナルティ：各資源-30、ブラック本丸ゲージ+10、次季の会話制限。`;
        base.entry("本丸", `年間任務未達。各資源を30失い、ブラック本丸ゲージが10上昇。次季は会話制限。未達：${missed.join("、")}`);
      }
      G.missionCycle++;
      G.missions = MISSION_TEMPLATES.map((mission) => ({ ...mission, progress: 0 }));
    }
    G.owned.forEach((member) => { member.fatigue = clamp(member.fatigue - 5); });
    const result = base.advanceSeason(...args);
    if (!winterEnd && hadPenalty && G.penaltySeasonsRemaining > 0) { G.penaltySeasonsRemaining--; G.penaltyActive = G.penaltySeasonsRemaining > 0; }
    if (report) modalOpen(`<h2>${report.startsWith("年間任務達成") ? "年間任務達成" : "年間任務の期限"}</h2><p>${report}</p><button class="wide" onclick="closeModal()">確認</button>`);
    save(); return result;
  };
  // Sticky header holds the collapsible status block at all scroll positions.
  const header = document.querySelector(".top");
  const status = $("status");
  if (header && status && status.parentElement !== header) header.append(status);
  const foldButton = $("fold");
  if (foldButton) foldButton.onclick = () => { folded = !folded; renderCompactStatus(); foldButton.setAttribute("aria-expanded", String(!folded)); };
  window.resetGame = () => { base.resetGame(); folded = false; forgeSession = null; };
  normalize(G);
})();
