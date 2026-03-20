# 自用脚本

个人常用脚本合集，包含 Tampermonkey 用户脚本和 Bookmarklet 小书签，用于提升日常浏览和工作效率。

## 使用

```bash
# 安装依赖
bun install

# 构建 Bookmarklet（压缩并生成预览页到 dist/）
bun run build
```

## Tampermonkey 脚本

位于 `tampermonkey/`，直接拖入浏览器扩展管理页安装即可。

| 脚本 | 说明 |
|---|---|
| `douban.no-broadcast.js` | 豆瓣点击"想看""看过"等按钮时，自动取消勾选"发布广播"并提交，避免打扰他人 |
| `close-popup.js` | 自动关闭 ddys / libvio / lmm 等影视网站的首屏弹窗广告 |
| `ddys-auto-password.js` | 自动提取 ddys.la 页面上的访问密码并填写提交，支持 `CORRECT_PWD` 脚本变量和文本提取两种方式 |

## Bookmarklet 脚本

位于 `bookmarklet/`，构建后生成可视化预览页 `dist/bookmarklet.html`，支持搜索、过滤、一键复制。

| 脚本 | 说明 |
|---|---|
| `github.1s.js` | 将当前 GitHub 页面在 github1s.com（VS Code 网页版）中打开 |
| `github.file-history-commit.js` | 在 GitHub History 中查看当前文件的完整修改历史 |
| `github.sourcegraph.js` | 在 Sourcegraph 中浏览当前 GitHub 仓库 |
| `page-login.js` | 自动填充登录表单（用户名 / 密码），适合开发环境快速登录 |
| `page-edit.js` | 开启网页的 `contentEditable` 模式，可直接在页面上修改文字，按 Esc 退出 |
| `yuque.to-md.js` | 一键将语雀文档导出为 Markdown 格式 |
| `boss-chat-list.js` | 提取 Boss 直聘聊天列表前 30 条记录（公司、HR、职位），格式化后自动复制到剪贴板 |
