// Telegram Bot API integration for 2048 game
export default function handler(req, res) {
  const { initData } = req.query;
  
  // This is just a placeholder for validation
  // In a real implementation, you should validate the initData from Telegram
  
  // Return the game data for Telegram
  res.status(200).json({
    game_short_name: "2048game",
    title: "2048 Game",
    description: "Play the classic 2048 puzzle game",
    photo_url: `https://${req.headers.host}/thumbnail.png`,
    animation_url: `https://${req.headers.host}/gameplay.gif`,
    url: `https://${req.headers.host}?tgWebAppData=${encodeURIComponent(initData || "")}`
  });
} 