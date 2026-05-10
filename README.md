# CSDN 博客优化

一款浏览器插件，访问 CSDN 博客时自动禁用 JavaScript 并阻止跳转登录页，还原清爽阅读体验。

## 功能

- **禁用 JavaScript** — 通过 CSP 头注入 + 网络请求拦截 + 内容脚本三重机制，彻底阻止页面执行任何脚本（包括 CDN 资源）
- **阻止登录跳转** — 自动拦截跳转至 `passport.csdn.net` 的请求，无需登录即可阅读
- **一键开关** — 点击工具栏图标即可启用/禁用

## 安装

### Chrome

1. 下载或克隆本仓库
2. 打开 `chrome://extensions`，开启右上角「开发者模式」
3. 点击「加载已解压的扩展程序」，选择本项目文件夹

### Firefox

1. 下载或克隆本仓库
2. 打开 `about:debugging#/runtime/this-firefox`
3. 点击「临时加载附加组件」，选择本项目文件夹中的任意文件

> Firefox 需要 109.0 或更高版本。

## 文件结构

```
├── manifest.json   # 插件清单（Manifest V3）
├── rules.json      # 拦截规则（阻断脚本 / 阻止跳转 / CSP 注入）
├── content.js      # 内容脚本，实时移除动态插入的 <script>
├── background.js   # 后台服务，管理规则集开关
├── popup.html      # 弹窗界面
└── popup.js        # 弹窗逻辑
```

## 技术方案

| 层级 | 机制 | 说明 |
|------|------|------|
| 浏览器引擎 | CSP 头注入 | 给页面设置 `Content-Security-Policy: script-src 'none'`，从根源禁止脚本执行 |
| 网络层 | declarativeNetRequest | 拦截 `blog.csdn.net` 和 `csdnimg.cn` 的脚本资源加载，阻止跳转登录页 |
| DOM 层 | MutationObserver | 实时移除动态插入的 `<script>` 标签作为兜底 |

## 许可

Apache-2.0 license
