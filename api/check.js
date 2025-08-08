export default async function handler(req, res) {
  // নিশ্চিত করা হচ্ছে যে শুধুমাত্র GET মেথড ব্যবহার করা যাবে।
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Only GET method is allowed.'
    });
  }

  // URL থেকে 'username' প্যারামিটার নেওয়া হচ্ছে।
  const username = req.query.username;

  // যদি 'username' প্যারামিটার মিসিং থাকে, তাহলে নির্দেশনা দেখানো হবে।
  if (!username) {
    return res.status(400).json({
      message: '🧪 Welcome to the User Info API endpoint',
      error: 'Username parameter is missing.',
      usage: 'To get user info, please provide a username.',
      example: '`/api/get-user?username=@0no_coder_xone`'
    });
  }

  // মেইন এপিআই URL তৈরি করা হচ্ছে।
  const mainApiUrl = `https://web-production-f1985.up.railway.app/get_user_info?username=${username}`;

  try {
    // মেইন এপিআই থেকে ডেটা আনা হচ্ছে।
    const response = await fetch(mainApiUrl);
    const data = await response.json();

    // CORS সমস্যার জন্য হেডার সেট করা হলো, যাতে যেকোনো ডোমেইন থেকে অ্যাক্সেস করা যায়।
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    // প্রাপ্ত ডেটা ক্লায়েন্টের কাছে পাঠানো হচ্ছে।
    res.status(response.status).json(data);

  } catch (error) {
    // কোনো ত্রুটি হলে তা জানানো হচ্ছে।
    res.status(500).json({
      error: 'Internal server error.',
      details: error.message
    });
  }
}
