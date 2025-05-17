// Handler for setting the game score in Telegram
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get the Telegram API token from environment variables
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    
    if (!telegramToken) {
      console.error('TELEGRAM_BOT_TOKEN is not defined');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Extract data from request body
    const { score, inline_message_id } = req.body;
    
    if (!score || !inline_message_id) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Use Telegram API to set the game score
    const setScoreUrl = `https://api.telegram.org/bot${telegramToken}/setGameScore`;
    
    // You would need to get the user ID from the game session or request
    // For simplicity, we're using a placeholder
    const user_id = req.body.user_id || "replace_with_actual_user_id";
    
    const response = await fetch(setScoreUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id,
        score: parseInt(score, 10),
        inline_message_id,
        disable_edit_message: false
      })
    });

    const responseData = await response.json();
    
    if (!responseData.ok) {
      console.error('Telegram API error:', responseData);
      return res.status(500).json({ error: 'Telegram API error', details: responseData });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error setting game score:', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
} 