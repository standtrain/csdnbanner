const RULESET_ID = "csdn_rules";

// 初始化：读取存储的启用状态，更新规则集
async function init() {
  const data = await chrome.storage.local.get("enabled");
  const enabled = data.enabled !== false; // 默认启用
  await updateRules(enabled);
}

async function updateRules(enabled) {
  try {
    await chrome.declarativeNetRequest.updateEnabledRulesets({
      enableRulesetIds: enabled ? [RULESET_ID] : [],
      disableRulesetIds: enabled ? [] : [RULESET_ID],
    });
  } catch (e) {
    // Firefox 兼容：如果 updateEnabledRulesets 不可用，忽略错误
    console.warn("更新规则集失败:", e);
  }
}

// 监听 popup 发来的消息
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === "toggle") {
    chrome.storage.local.set({ enabled: message.enabled }).then(() =>
      updateRules(message.enabled)
    ).then(() => sendResponse({ ok: true }));
    return true; // 异步响应
  }
  if (message.type === "getStatus") {
    chrome.storage.local.get("enabled").then((data) => {
      sendResponse({ enabled: data.enabled !== false });
    });
    return true;
  }
});

// 插件安装或启动时初始化
chrome.runtime.onInstalled.addListener(init);
chrome.runtime.onStartup.addListener(init);
