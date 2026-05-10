// 在页面脚本执行前运行，移除所有 <script> 标签
(async function () {
  // 检查启用状态，禁用时不做任何操作
  const data = await chrome.storage.local.get("enabled");
  if (data.enabled === false) return;

  // 监听 DOM 变化，拦截动态插入的 script
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeName === "SCRIPT") {
          node.remove();
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          node.querySelectorAll("script").forEach((el) => el.remove());
        }
      }
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
})();
