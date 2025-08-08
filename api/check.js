// pages/api/check.js
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Only GET method is allowed.'
    });
  }

  const username = req.query.username;

  if (!username) {
    return res.status(400).json({
      message: '🧪 Welcome to the User Info API endpoint',
      error: 'Username parameter is missing.',
      usage: 'To get user info, please provide a username.',
      example: '`/api/check?username=no_coder_xone`'
    });
  }

  // যদি ইউজার @ দিয়ে শুরু করে, তবে তা সরিয়ে দেওয়া হচ্ছে।
  const cleanUsername = username.startsWith('@') ? username.substring(1) : username;

  // মূল এপিআই URL তৈরি করা হচ্ছে।
  const mainApiUrl = `https://web-production-f1985.up.railway.app/get_user_info?username=@${cleanUsername}`;

  try {
    const response = await fetch(mainApiUrl);
    
    // যদি রেসপন্স ok না হয়, তাহলে সার্ভারের ত্রুটি ফেরত দেওয়া হবে।
    if (!response.ok) {
        return res.status(response.status).json({
            error: `Failed to fetch data from main API. Status: ${response.status}`
        });
    }

    const data = await response.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    // প্রাপ্ত ডেটা ক্লায়েন্টের কাছে পাঠানো হচ্ছে।
    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({
      error: 'Internal server error.',
      details: error.message
    });
  }
}
