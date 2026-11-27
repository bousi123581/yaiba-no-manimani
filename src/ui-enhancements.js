/* Small presentation-only enhancements; game state and save data are untouched. */
(() => {
  const emojiPattern = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F1E6}-\u{1F1FF}\uFE0F\u200D]/gu;

  function cleanDecorativeEmoji(root) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    textNodes.forEach((node) => {
      const parent = node.parentElement;
      if (!parent || parent.closest("script, style, textarea")) return;
      const clean = node.nodeValue.replace(emojiPattern, "").replace(/\s{2,}/g, " ");
      if (clean !== node.nodeValue) node.nodeValue = clean;
    });
    root.querySelectorAll(".portrait, [style*='font-size:2.5rem']").forEach((el) => {
      if (!el.textContent.trim()) el.setAttribute("aria-hidden", "true");
    });
  }

  function decorateAppointment(root) {
    const heading = root.querySelector(".hero h2, .hero h1");
    if (!heading || !/就任|辞令/.test(heading.textContent)) return;
    const documentCard = heading.closest(".hero");
    if (!documentCard || documentCard.classList.contains("appointment-document")) return;

    documentCard.classList.add("appointment-document");
    documentCard.setAttribute("aria-label", "審神者就任の辞令");
    heading.textContent = "辞令";
    const kicker = document.createElement("p");
    kicker.className = "appointment-kicker muted";
    kicker.textContent = "時の政府　発令書";
    heading.before(kicker);
  }

  function enhance(root = document) {
    decorateAppointment(root);
    cleanDecorativeEmoji(root.querySelector?.("#app") || document.getElementById("app"));
    cleanDecorativeEmoji(root.querySelector?.("#modal-content") || document.getElementById("modal-content"));
  }

  const app = document.getElementById("app");
  const modalContent = document.getElementById("modal-content");
  if (app) new MutationObserver(() => enhance(document)).observe(app, { childList: true, subtree: true, characterData: true });
  if (modalContent) new MutationObserver(() => cleanDecorativeEmoji(modalContent)).observe(modalContent, { childList: true, subtree: true, characterData: true });
  enhance(document);
})();
