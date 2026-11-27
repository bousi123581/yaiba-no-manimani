/* Runtime hotfixes for legacy wrappers and free-to-player conversations. */
(() => {
  // game-features.js previously installed an openTalk wrapper that called an
  // undefined baseOpenTalk variable. Replace it with the original UI flow directly.
  window.openTalk = function openTalkSafely() {
    if (!G) return;
    if (G.penaltySeasonsRemaining > 0) {
      modalOpen('<h2>会話できません</h2><p>年間任務未達のペナルティ中です。次の季節が終わるまで刀剣男士との会話はできません。</p><button class="wide" onclick="closeModal()">確認</button>');
      return;
    }
    const id = TALK_TARGET || G.adjutant;
    const character = sword(id);
    if (!character || !owned(id)) return;
    TALK_TARGET = id;
    const member = owned(id);
    const milestone = milestoneFor(member);
    if (milestone !== null) {
      showAffinityEvent(character, member, milestone);
      return;
    }
    modalOpen(`<div class="portrait">${character.art}</div><h2>${character.name}との語らい</h2><p class="dialog-line">${ageIntro(character.talk.intro)}</p><h3>話題を選ぶ</h3><div class="choice">${character.talk.topics.map((topic, index) => `<button onclick="talkTopic(${index})">${topic.title}</button>`).join("")}</div><button class="wide" onclick="closeModal()">閉じる</button>`);
  };

  window.startTalk = function startTalkSafely(id) {
    if (G?.penaltySeasonsRemaining > 0) {
      window.openTalk();
      return;
    }
    if (!owned(id)) return;
    TALK_TARGET = id;
    window.openTalk();
  };

  // Spontaneous character visits are story events, not player actions.
  // Keep their journal entries free of a misleading "null回目" label.
  const previousRenderJournal = window.renderJournal;
  window.renderJournal = function renderJournalWithoutFreeActionNumber() {
    previousRenderJournal();
    document.querySelectorAll("#app section.paper .muted").forEach((meta) => {
      meta.textContent = meta.textContent.replace(/\s*行動(?:null|undefined)���目\s*\//, " / ");
    });
  };
})();
