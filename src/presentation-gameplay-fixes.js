/* Requested visual and expedition behaviors, integrated after existing gameplay layers. */
(() => {
  const original = {
    firstForge: window.firstForge,
    render: window.render,
    renderStatus: window.renderStatus,
    save: window.save,
    advanceSeason: window.advanceSeason,
    consume: window.consume,
    modalOpen: window.modalOpen,
    closeModal: window.closeModal,
    advanceBattle: window.advanceBattle,
    renderBattleView: window.renderBattleView,
  };
  let firstForgeInProgress = false;
  let seasonAdvancePending = false;
  let advancingSeason = false;

  function updateFirstForgeNavigation() {
    const nav = $("nav");
    const preHome = G && ["profile", "initial", "forgeintro"].includes(G.phase);
    if (nav) nav.hidden = Boolean(firstForgeInProgress || preHome);
    document.body.classList.toggle("first-forge-pending", Boolean(firstForgeInProgress || preHome));
  }
  function updateBlackHonmaruTheme() {
    const black = clamp(Number(G?.black) || 0);
    document.body.classList.toggle("black-dim", black >= 25 && black < 55);
    document.body.classList.toggle("black-dark", black >= 55 && black < 80);
    document.body.classList.toggle("black-severe", black >= 80);
    document.body.style.setProperty("--blackness", String(black / 100));
  }
  function closeSeasonPrompt(html) {
    return typeof html === "string" && /季節の区切り|次の季節へ進みますか/.test(html) && /advanceSeason\(/.test(html);
  }
  function continueSeasonWhenReady() {
    if (!seasonAdvancePending || advancingSeason || modal) return;
    seasonAdvancePending = false;
    advancingSeason = true;
    setTimeout(() => {
      try { window.advanceSeason(); }
      finally { advancingSeason = false; }
    }, 0);
  }
  function colorBattleLogs() {
    const root = $("battle-log-list");
    if (!root) return;
    root.querySelectorAll(".log").forEach((row) => {
      const text = row.textContent || "";
      const injured = /負傷|重傷|中傷|傷を負|損傷|HP\s*-/.test(text);
      const feat = /活躍|連携|見つけ|発見|確保|突破|支援|薬草|退け|道を開/.test(text);
      row.classList.toggle("battle-log-injury", injured);
      row.classList.toggle("battle-log-feat", !injured && feat);
    });
  }
  function addPartyFlavor(previousIndex) {
    if (!BATTLE || !Array.isArray(BATTLE.party) || BATTLE.index === previousIndex) return;
    if (!Array.isArray(BATTLE.flavorNodes)) BATTLE.flavorNodes = [];
    if (BATTLE.flavorNodes.includes(BATTLE.index)) return;
    const members = BATTLE.party.map((id) => owned(id)).filter(Boolean);
    if (!members.length) return;
    const actor = rand(members);
    const character = sword(actor.id);
    const flavorById = {
      jikkyu: `${character.name}が道端で薬草を見つけた。確認のため、部隊は少し寄り道をすることになった。`,
      kunihiro: `${character.name}が足元の砥石を見つけ、周囲の安全を確かめてから回収した。`,
      kasen: `${character.name}が地形の変化に気づき、雅さを保ちながら安全な道筋を示した。`,
      mutsuu: `${character.name}が地図にない脇道を見つけ、部隊を率いて周辺を確認した。`,
      yagen: `${character.name}が敵の気配を察し、部隊に合図して進路を整えた。`,
      tsuru: `${character.name}が敵の注意を引きつけ、仲間が進む隙を作った。`,
      mikazuki: `${character.name}が古い道標を見つけ、進むべき方角を静かに示した。`,
      hasebe: `${character.name}が隊列と周囲を確認し、無駄のない進路を整えた。`,
      kashu: `${character.name}が落ちていた目印を拾い、部隊が迷わないよう道に結びつけた。`,
      honey: `${character.name}が仲間の歩調を確かめ、隊列が崩れないよう支えた。`,
      chougi: `${character.name}が足跡から敵の動きを読み、部隊に回避路を提案した。`,
      fudou: `${character.name}が小さな物音に気づき、仲間へ静かに注意を促した。`,
    };
    const text = flavorById[actor.id] || `${character?.name || "部隊員"}が周囲を調べ、進軍に役立つ手がかりを見つけた。`;
    BATTLE.logs.push(text);
    BATTLE.flavorNodes.push(BATTLE.index);
    save();
  }

  // Keep the bottom fixed navigation hidden through the initial sword manifestation.
  window.firstForge = function (...args) {
    firstForgeInProgress = true;
    updateFirstForgeNavigation();
    return original.firstForge(...args);
  };
  window.closeModal = function (...args) {
    const isInitialForgeModal = firstForgeInProgress;
    const result = original.closeModal(...args);
    if (isInitialForgeModal) {
      firstForgeInProgress = false;
      updateFirstForgeNavigation();
    }
    continueSeasonWhenReady();
    return result;
  };
  window.render = function (...args) {
    const result = original.render(...args);
    updateFirstForgeNavigation();
    updateBlackHonmaruTheme();
    return result;
  };
  window.renderStatus = function (...args) {
    const result = original.renderStatus(...args);
    updateBlackHonmaruTheme();
    return result;
  };
  window.save = function (...args) {
    const result = original.save(...args);
    updateBlackHonmaruTheme();
    return result;
  };

  // Turn the old end-of-season confirmation into an automatic transition.
  window.modalOpen = function (html, ...args) {
    if (closeSeasonPrompt(html)) {
      seasonAdvancePending = true;
      continueSeasonWhenReady();
      return;
    }
    return original.modalOpen(html, ...args);
  };
  const seasonClick = (event) => {
    const button = event.target?.closest?.("button");
    if (!button || !/季節を進める/.test(button.textContent || "")) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    window.advanceSeason();
  };
  document.addEventListener("click", seasonClick, true);

  // Add a short, participant-specific expedition beat once per map node.
  window.advanceBattle = function (...args) {
    const oldIndex = BATTLE?.index;
    const result = original.advanceBattle(...args);
    if (BATTLE && Number.isFinite(oldIndex)) {
      addPartyFlavor(oldIndex);
      if (view === "expedition") {
        original.renderBattleView();
        colorBattleLogs();
      }
    }
    return result;
  };
  window.renderBattleView = function (...args) {
    const result = original.renderBattleView(...args);
    colorBattleLogs();
    return result;
  };
  const app = $("app");
  if (app) new MutationObserver(colorBattleLogs).observe(app, { childList: true, subtree: true, characterData: true });
  updateFirstForgeNavigation();
  updateBlackHonmaruTheme();
})();
