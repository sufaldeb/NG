const { subscribe } = require('substack-subscriber');

/* ---------- 1.  set the CORS headers ONCE ---------- */
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://norn.group',   //  ← your Squarespace domain
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

exports.handler = async (event) => {
  /* ---------- 2.  return quickly on the OPTIONS pre-flight ---------- */
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: 'OK' };
  }

  /* ---------- 3.  normal POST flow ---------- */
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: corsHeaders, body: 'Method Not Allowed' };
  }

  const { email } = JSON.parse(event.body || '{}');
  const SUBSTACK_URL = 'https://norngroup.substack.com';   // ← change if needed

  try {
    const data = await subscribe(email, SUBSTACK_URL);
    return { statusCode: 200, headers: corsHeaders, body: JSON.stringify(data) };
  } catch (err) {
    console.error('Subscribe failed:', err);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: err.message })
    };
  }
};
