// api/check.js
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Only GET method is allowed.'
    });
  }

  // URL থেকে 'cc' প্যারামিটার নেওয়া হচ্ছে, কারণ ইনডেক্স পেজ এটি পাঠাচ্ছে।
  const cc = req.query.cc; // <--- এখানে পরিবর্তন করা হয়েছে

  if (!cc) {
    return res.status(400).json({
      message: '🧪 Welcome to the User Info API endpoint',
      error: 'CC parameter is missing.', // <--- বার্তাও পরিবর্তন করা হয়েছে
      usage: 'To get user info, please provide a username in the "cc" parameter.',
      example: '`/api/check?cc=@0no_coder_xone`' // <--- উদাহরণের পাথ পরিবর্তন করা হয়েছে
    });
  }

  // মেইন এপিআই URL তৈরি করা হচ্ছে।
  // এখানে 'cc' প্যারামিটারের মান ব্যবহার করা হয়েছে।
  const mainApiUrl = `https://web-production-f1985.up.railway.app/get_user_info?username=${cc}`;

  try {
    const response = await fetch(mainApiUrl);
    const data = await response.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    res.status(response.status).json(data);

  } catch (error) {
    res.status(500).json({
      error: 'Internal server error.',
      details: error.message
    });
  }
}
