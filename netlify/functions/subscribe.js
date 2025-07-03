// netlify/functions/subscribe.js
import { subscribe } from 'substack-subscriber';   // ← from the GitHub package
import { config } from '@netlify/functions';

export default async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { email } = JSON.parse(event.body || '{}');
  const SUBSTACK_URL = 'https://norngroup.substack.com'; // ← change me

  try {
    const data = await subscribe(email, SUBSTACK_URL);
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
