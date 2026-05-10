const sw = document.getElementById("switch");
const status = document.getElementById("status");

// 获取当前状态
chrome.runtime.sendMessage({ type: "getStatus" }, (res) => {
  if (res && !res.enabled) {
    sw.classList.remove("active");
    status.textContent = "已禁用";
  }
});

// 点击切换
sw.addEventListener("click", () => {
  const isActive = sw.classList.contains("active");
  const newState = !isActive;

  chrome.runtime.sendMessage({ type: "toggle", enabled: newState }, () => {
    sw.classList.toggle("active", newState);
    status.textContent = newState ? "已启用" : "已禁用";
  });
});
