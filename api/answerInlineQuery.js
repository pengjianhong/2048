// Handler for Telegram's answerInlineQuery
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    // Handle preflight OPTIONS request or wrong method
    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      return res.status(200).end();
    }
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get the Telegram API token from environment variables
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    
    if (!telegramToken) {
      console.error('TELEGRAM_BOT_TOKEN is not defined');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Extract inline query data from the request
    const update = req.body;
    
    if (!update.inline_query) {
      return res.status(400).json({ error: 'Not an inline query' });
    }

    const inlineQueryId = update.inline_query.id;
    
    // Prepare the game result
    const gameResult = {
      type: 'game',
      id: 'game2048', 
      game_short_name: 'game2048',
      reply_markup: {
        inline_keyboard: [
          [{ text: "Play 2048", callback_game: {} }]
        ]
      }
    };

    // Answer the inline query with our game
    const answerUrl = `https://api.telegram.org/bot${telegramToken}/answerInlineQuery`;
    
    const response = await fetch(answerUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        inline_query_id: inlineQueryId,
        results: [gameResult],
        cache_time: 0
      })
    });

    const responseData = await response.json();
    
    if (!responseData.ok) {
      console.error('Telegram API error:', responseData);
      return res.status(500).json({ error: 'Telegram API error', details: responseData });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error handling inline query:', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
} 