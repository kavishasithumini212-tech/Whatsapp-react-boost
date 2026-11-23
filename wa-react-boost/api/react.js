export default async function handler(req, res) {
  // POST request පමණක් භාරගැනීම
  if (req.method !== 'POST') {
    return res.status(405).json({ status: false, message: 'Method Not Allowed' });
  }

  const { postUrl, emojis } = req.body;

  if (!postUrl || !emojis) {
    return res.status(400).json({ status: false, message: 'Post URL සහ Emojis අවශ්‍යයි!' });
  }

  // Vercel/Netlify Environment Variables වලින් API Key එක ලබාගැනීම (නැත්නම් default key එක)
  const API_KEY = process.env.SUPUN_API_KEY || 'supun_836b551c818020e620bb4a0e2169ee3c';

  try {
    const apiUrl = `https://supunofc.site/api/paid/wa-react?url=${encodeURIComponent(postUrl)}&emojis=${encodeURIComponent(emojis)}&apikey=${API_KEY}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ 
      status: false, 
      message: 'API සම්බන්ධතාවයේ දෝෂයක් ඇති විය.', 
      error: error.message 
    });
  }
}
