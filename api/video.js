// /api/video.js - Vercel Serverless Function
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { videoUrl, action } = req.body;
  try {
    if (action === 'summarize') {
      return res.status(200).json({
        summary: 'Video summarization would process the video here.',
        chapters: [{ start: '0:00', title: 'Introduction' }, { start: '2:30', title: 'Main Topic' }, { start: '8:45', title: 'Conclusion' }],
        keyPoints: ['Key point 1 from video analysis', 'Key point 2 from video analysis', 'Key point 3 from video analysis']
      });
    }
    return res.status(400).json({ error: 'Invalid action' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}