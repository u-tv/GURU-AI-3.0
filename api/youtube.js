// /api/youtube.js - Vercel Serverless Function
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  const { videoId, action } = req.query;
  if (!videoId) return res.status(400).json({ error: 'Video ID required' });
  try {
    if (action === 'transcript') {
      const transcript = await fetchTranscript(videoId);
      return res.status(200).json({ videoId, transcript, language: 'en', segments: transcript.split('\n').map((line, i) => ({ text: line, start: i * 5, duration: 5 })) });
    }
    if (action === 'info') {
      const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
      const response = await fetch(oembedUrl);
      const data = await response.json();
      return res.status(200).json({ videoId, ...data });
    }
    return res.status(400).json({ error: 'Invalid action. Use: transcript, info' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
async function fetchTranscript(videoId) {
  return `Transcript for video ${videoId} would be fetched here.\n\nIn production, this uses the youtube-transcript library to fetch captions directly from YouTube's internal API.\n\nTo activate: npm install youtube-transcript`;
}