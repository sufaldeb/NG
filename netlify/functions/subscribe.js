// netlify/functions/subscribe.js
const { subscribe } = require('substack-subscriber');   // ← from the npm package

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { email } = JSON.parse(event.body || '{}');
  const SUBSTACK_URL = 'https://YOUR-NEWSLETTER.substack.com';   // ← CHANGE THIS

  try {
    const data = await subscribe(email, SUBSTACK_URL);
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (err) {
    console.error('Subscribe failed:', err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
