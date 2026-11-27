/* Character-specific gifts, branching story-event choices, and resilient season advancement. */
(() => {
  const previous = {
    randomEvent: window.randomEvent,
    timedEvent: window.timedHonmaruEvent,
    closeModal: window.closeModal,
    advanceSeason: window.advanceSeason,
  };
  const pendingStories = [];
  let activeStory = null;

  const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  const giftTable = {
    kashu: { item: "小さな髪飾り", line: "これ、見つけた時に君に似合いそうだと思ったんだ。", reward: null },
    kasen: { item: "季節の上生菓子", line: "季節に合う菓子を選んだよ。茶と一緒に楽しもう。", reward: ["coins", 8] },
    mutsuu: { item: "故郷の柑橘", line: "故郷から届いたもんじゃ。皆で食べたらええき。", reward: null },
    kunihiro: { item: "よく研げる砥石", line: "手入れに使えそうな砥石を見つけた。必要なら使ってくれ。", reward: ["stone", 15] },
    honey: { item: "蜂蜜を使った菓子", line: "甘いものを用意した。皆で分ければ、きっと喜ぶだろう。", reward: ["coins", 8] },
    hasebe: { item: "温かい茶と書類の整理袋", line: "ひと息つけるよう茶を用意しました。書類もまとめてあります。", reward: null },
    jikkyu: { item: "香りのよい茶葉", line: "気持ちが落ち着く茶葉を選んだよ。皆で飲もう。", reward: null },
    tsuru: { item: "包みを開けるまで中身の分からない菓子", line: "中身は開けてからのお楽しみだ。驚かせすぎない品にしたぞ。", reward: ["coins", 8] },
    mikazuki: { item: "月見に合う餅菓子", line: "月を眺める折にでも、皆で味わうとしよう。", reward: ["coins", 8] },
    chougi: { item: "丁寧に包まれた焼き菓子", line: "皆で分けやすいものを選んだ。数も確認済みだよ。", reward: ["coins", 8] },
    yagen: { item: "温かい飲み物と小さな薬包", line: "差し入れだ。飲み物で温まって、薬包は必要な時に使いな。", reward: null },
    fudou: { item: "甘酒と素朴な焼き菓子", line: "……皆で飲めるように持ってきた。甘いものも少しあるよ。", reward: ["coins", 8] },
  };
  const choiceResponses = {
    kashu: ["そういうところ、ちゃんと見てくれてるんだね。嬉しいな。", "いいね。一緒にやったら、もっと楽しくなりそう。", "ふふ、主って時々いいこと言うよね。"],
    kasen: ["よく見てくれているね。では、もう少し話そうか。", "共に手を動かすのも風雅なものだ。", "その言葉、心に留めておこう。"],
    mutsuu: ["聞いてくれてありがとのう。話すと元気が出るぜよ。", "よっしゃ、二人でやれば早いき！", "ははっ、主も言うようになったのう。"],
    kunihiro: ["……そうか。聞いてくれて助かる。", "ああ、手伝ってくれるなら心強い。", "そういう見方もあるんだな。覚えておく。"],
    honey: ["話を聞いてくれてありがとう。誇りに思うよ。", "公平に分けて、皆で楽しもう。", "君らしい率直な言葉だね。"],
    hasebe: ["主に聞いていただけて、報告した甲斐がありました。", "承知しました。手順を整えて進めましょう。", "……主がそうおっしゃるなら、少し肩の力を抜きます。"],
    jikkyu: ["聞いてくれてありがとう。話すと気持ちが軽くなるね。", "一緒なら、穏やかな時間になりそうだ。", "ふふ、主の言葉にこちらも和んだよ。"],
    tsuru: ["おお、興味を持ってくれたか。話し甲斐があるな。", "よし、皆が笑える形にしよう。", "その返しは予想外だ。一本取られたな。"],
    mikazuki: ["ははは、聞いてもらえるとは嬉しいものだ。", "うむ、ゆるりと共に進めよう。", "なるほど。主の言葉もまた味わい深い。"],
    chougi: ["話を聞いた上で判断してくれるのは助かるよ。", "合理的だね。役割を分けて進めよう。", "……ふうん。君らしい答えだ。"],
    yagen: ["聞いてくれてありがとな、大将。", "よし、俺も手を貸すぜ。", "ははっ、大将のそういうところは嫌いじゃない。"],
    fudou: ["……聞いてくれてありがとう。少し楽になった。", "うん。一緒ならやれそうな気がする。", "ふふ、そういう返事も悪くないね。"],
  };
  const playerChoiceTexts = ["もう少し話を聞かせて", "一緒にやろう／皆で分けよう", "その気持ちが嬉しい。ありがとう"];

  function openStory(story) {
    if (activeStory) {
      pendingStories.push(story);
      return;
    }
    if (modal) {
      pendingStories.push(story);
      return;
    }
    activeStory = story;
    const character = story.memberId ? sword(story.memberId) : null;
    const options = story.result
      ? `<p class="dialog-line">${escapeHtml(story.result)}</p><button class="wide" onclick="closeModal()">話を終える</button>`
      : `<div class="choice">${playerChoiceTexts.map((text, index) => `<button onclick="respondToStoryEvent(${index})">${escapeHtml(text)}</button>`).join("")}</div>`;
    modalOpen(`<div class="portrait">${escapeHtml(character?.art || "🌸")}</div><h2>${escapeHtml(story.title)}</h2><p class="dialog-line">${escapeHtml(story.text)}</p>${options}`);
  }
  function nextStory() {
    if (!activeStory && pendingStories.length && !modal) openStory(pendingStories.shift());
  }
  window.closeModal = function closeModalWithStoryQueue() {
    const wasStory = Boolean(activeStory);
    activeStory = null;
    previous.closeModal();
    if (wasStory || pendingStories.length) setTimeout(nextStory, 0);
  };
  window.respondToStoryEvent = function (choiceIndex) {
    if (!activeStory || activeStory.result) return;
    const story = activeStory;
    const member = story.memberId ? owned(story.memberId) : null;
    const character = member ? sword(member.id) : null;
    const responses = choiceResponses[story.memberId] || ["話を聞いてくれてありがとう。", "一緒に進めよう。", "その言葉を大切にするよ。"];
    const gains = [3, 5, 4];
    if (member) {
      member.aff = clamp(member.aff + gains[choiceIndex]);
      member.trust = member.aff;
      if (choiceIndex === 1) member.fatigue = clamp(member.fatigue + 1);
    }
    G.white = clamp((G.white || 0) + 1);
    const response = responses[choiceIndex] || responses[0];
    const reaction = `${character ? `${character.name}：「${response}」` : response}`;
    entry(character?.name || "本丸", `${story.title}：${playerChoiceTexts[choiceIndex] || playerChoiceTexts[0]}。${reaction}（信頼度 +${member ? gains[choiceIndex] : 0}）`);
    if (G.logs[0]) G.logs[0].n = null;
    story.result = reaction;
    story.text = `${story.text}\n\n審神者：「${playerChoiceTexts[choiceIndex] || playerChoiceTexts[0]}」`;
    const char = character;
    modalOpen(`<div class="portrait">${escapeHtml(char?.art || "🌸")}</div><h2>${escapeHtml(story.title)}</h2><p class="dialog-line">${escapeHtml(story.text)}</p><p class="dialog-line">${escapeHtml(reaction)}</p><p>信頼度 +${member ? gains[choiceIndex] : 0}</p><button class="wide" onclick="closeModal()">話を終える</button>`);
    save();
  };

  window.randomEvent = function () {
    if (!G || G.turns % 3 !== 0 || !G.owned?.length) return;
    const member = rand(G.owned);
    const character = sword(member.id);
    const gift = giftTable[member.id] || { item: "本丸で皆と分けられる差し入れ", line: "皆で楽しめるように持ってきた。", reward: null };
    if (gift.reward) G.resources[gift.reward[0]] = (G.resources[gift.reward[0]] || 0) + gift.reward[1];
    member.aff = clamp(member.aff + 1);
    member.trust = member.aff;
    G.logs.unshift({ year: G.year, season: G.season, n: null, who: character.name, text: `${character.name}が${gift.item}を差し入れてくれた。` });
    G.logs.length = Math.min(G.logs.length, 200);
    const rewardNote = gift.reward ? `\n\n本丸の${gift.reward[0] === "stone" ? "砥石" : "小判"}が${gift.reward[1]}増えた。` : "";
    save();
    openStory({ title: `${character.name}からの差し入れ`, text: `${gift.line}${rewardNote}`, memberId: member.id });
  };
  window.timedHonmaruEvent = function () {
    if (!G?.owned?.length) return;
    const member = rand(G.owned);
    const character = sword(member.id);
    const events = character.events || [];
    const event = events[(member.timedEvents?.length || 0) % Math.max(events.length, 1)];
    if (!Array.isArray(member.timedEvents)) member.timedEvents = [];
    member.timedEvents.push(member.timedEvents.length);
    const title = event?.[0] || "本丸でのひととき";
    const description = event?.[1] || `${character.name}が本丸で声をかけてきた。`;
    const dialogue = event?.[2] || "少し話を聞いてくれるか。";
    const text = `${description}\n\n${character.name}：「${dialogue}」`;
    G.logs.unshift({ year: G.year, season: G.season, n: null, who: character.name, text });
    G.logs.length = Math.min(G.logs.length, 200);
    save();
    openStory({ title, text, memberId: member.id });
  };

  // Reinforce the season action with a capture-phase listener, including buttons in legacy modals.
  document.addEventListener("click", (event) => {
    const button = event.target?.closest?.("button");
    if (!button || !/季節を進める/.test(button.textContent || "")) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    window.advanceSeason();
  }, true);

  const seasons = ["春", "夏", "秋", "冬"];
  window.advanceSeason = function advanceSeasonSafely(...args) {
    if (!G) return previous.advanceSeason(...args);
    const before = G.season;
    const beforeCycle = G.missionCycle || 0;
    let returned;
    let failure = null;
    try {
      returned = previous.advanceSeason(...args);
    } catch (error) {
      failure = error;
      console.error("Season transition failed in legacy handler; applying safe fallback.", error);
    }
    if (G.season !== before) {
      save();
      renderStatus();
      return returned;
    }
    // If the existing wrapper failed before moving the calendar, preserve its annual rules and recover the UI.
    if (before === "冬" && (G.missionCycle || 0) === beforeCycle && Array.isArray(G.missions)) {
      const completed = G.missions.every((mission) => mission.progress >= mission.target);
      if (completed) {
        ["wood", "stone", "coal", "iron", "coins"].forEach((key) => { G.resources[key] = (Number(G.resources[key]) || 0) + 50; });
        entry("本丸", "年間任務をすべて達成。各資源を50ずつ獲得した。");
      } else {
        ["wood", "stone", "coal", "iron", "coins"].forEach((key) => { G.resources[key] = Math.max(0, (Number(G.resources[key]) || 0) - 30); });
        G.black = clamp((G.black || 0) + 10);
        G.penaltySeasonsRemaining = 1;
        G.penaltyActive = true;
        entry("本丸", "年間任務未達。各資源を30失い、ブラック本丸ゲージが10上昇。次季は会話制限。");
      }
      G.missionCycle = beforeCycle + 1;
      G.missions = G.missions.map((mission) => ({ ...mission, progress: 0 }));
    }
    G.season = seasons[(seasons.indexOf(before) + 1) % seasons.length];
    G.actions = Number.isFinite(G.maxActions) ? G.maxActions : G.rank?.acts || 2;
    G.dayAction = 0;
    G.owned?.forEach((member) => { member.fatigue = clamp((member.fatigue || 0) - 5); });
    if (before === "冬") {
      G.age = (G.age || 15) + 2;
      G.year = (G.year || 1) + 2;
      if (G.age > 30) {
        G.rank.acts = Math.max(2, (G.rank.acts || G.maxActions) - 1);
        G.maxActions = Math.max(2, (G.maxActions || G.rank.acts) - 1);
      }
    }
    if (G.penaltySeasonsRemaining > 0 && before !== "冬" && !failure) {
      G.penaltySeasonsRemaining = Math.max(0, G.penaltySeasonsRemaining - 1);
      G.penaltyActive = G.penaltySeasonsRemaining > 0;
    }
    save();
    if ($("modal")) { $("modal").hidden = true; modal = null; }
    view = "home";
    render();
    const overlay = document.createElement("div");
    overlay.className = "season-overlay";
    overlay.textContent = `${seasonEmoji[G.season] || ""} ${G.season}`;
    document.body.append(overlay);
    setTimeout(() => overlay.remove(), 900);
    if (failure) console.warn("Season changed with fallback after legacy error.");
    return returned;
  };
})();
