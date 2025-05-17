# 2048 Game for Telegram

这是一个为Telegram平台优化的2048游戏。

## 功能特点

- 经典2048游戏玩法
- 移动设备支持（触摸滑动操作）
- Telegram内联游戏集成
- 分数跟踪和排行榜

## 在Telegram上配置游戏

### 1. 创建游戏机器人

1. 首先在Telegram中找到 [@BotFather](https://t.me/BotFather)
2. 发送 `/newbot` 命令创建一个新机器人
3. 按提示设置机器人名称和用户名
4. 保存API令牌，稍后会使用

### 2. 设置游戏

1. 在BotFather中发送 `/newgame` 命令
2. 选择你刚创建的机器人
3. 设置游戏简称（例如：`game2048`）
4. 提供游戏描述
5. 上传游戏图标（建议使用一张方形图片）
6. 提供游戏URL（你的Vercel部署URL）

### 3. 配置Vercel部署

1. 在Vercel项目设置中添加环境变量：
   - `TELEGRAM_BOT_TOKEN`: 你的机器人API令牌

2. 设置Telegram Webhook：
   ```
   https://api.telegram.org/bot<你的token>/setWebhook?url=https://<你的vercel域名>/webhook
   ```

3. 确保你的vercel.json配置正确

### 4. 测试游戏

1. 在Telegram任何聊天中输入`@你的机器人用户名`
2. 选择出现的2048游戏
3. 现在你和朋友都可以玩这个游戏了！

## 本地开发

1. 克隆仓库
2. 创建`.env.local`文件并添加`TELEGRAM_BOT_TOKEN`变量
3. 运行`npm install`和`npm run dev`
4. 使用ngrok等工具将本地服务暴露到公网用于测试

## 注意事项

- Telegram游戏机器人需要HTTPS，确保你的部署使用HTTPS
- 游戏需要对所有浏览器提供支持
- 移动端体验是关键，确保游戏在小屏幕设备上表现良好 