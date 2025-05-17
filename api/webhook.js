// Telegram webhook handler
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const update = req.body;
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    if (!telegramToken) {
      console.error('TELEGRAM_BOT_TOKEN is not defined');
      return res.status(500).json({ error: 'Server configuration error' });
    }
    
    // Handle different types of updates
    if (update.callback_query && update.callback_query.game_short_name === 'game2048') {
      // This is a game callback query - redirect user to the game
      const callbackQueryId = update.callback_query.id;
      const userId = update.callback_query.from.id;
      
      // Build the game URL
      const gameUrl = `https://${req.headers.host}?user_id=${userId}`;
      
      // Answer callback query with the game URL
      const answerUrl = `https://api.telegram.org/bot${telegramToken}/answerCallbackQuery`;
      
      const response = await fetch(answerUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          callback_query_id: callbackQueryId,
          url: gameUrl
        })
      });
      
      const responseData = await response.json();
      
      if (!responseData.ok) {
        console.error('Telegram API error:', responseData);
        return res.status(500).json({ error: 'Telegram API error' });
      }
      
      return res.status(200).json({ success: true });
    } 
    else if (update.inline_query) {
      // Forward to the answerInlineQuery handler
      const res = await fetch(`https://${req.headers.host}/api/answerInlineQuery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(update)
      });
      
      return res.status(200).json(await res.json());
    }
    else if (update.message?.text === '/play') {
      const chatId = update.message.chat.id;
      await fetch(`https://api.telegram.org/bot${telegramToken}/sendGame`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          game_short_name: 'game2048'  // 这个必须与你在 BotFather 中注册的游戏短名一致
        })
      });
      return res.status(200).end();
    } 
    if (update.message?.text === '/about') {
      const chatId = update.message.chat.id;
      await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: '欢迎来到2048小游戏! 这是我的第一个游戏, 请输入/play开始游戏'
        })
      });
      return res.status(200).end();
    }
    else {
      // Unhandled update type
      console.log('Unhandled update type:', update);
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    console.error('Error handling webhook:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 