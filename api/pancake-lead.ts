import type { VercelRequest, VercelResponse } from '@vercel/node';

const PANCAKE_API_KEY = process.env.PANCAKE_API_KEY ?? '87fd40783306424dbe6325df3e62090f';
const SHOP_ID = process.env.PANCAKE_SHOP_ID ?? '1531';
const TABLE_NAME = 'lead';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Allow requests from any origin (our own frontend)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const payload = req.body;

  if (!payload || !payload.Name || !payload.Phone) {
    return res.status(400).json({ error: 'Missing required fields: Name, Phone' });
  }

  // Pancake CRM V2 drops fields that don't exist, but we found the correct internal names
  // for the custom fields configured in this workspace.
  const fileMatches = payload.Note?.match(/https:\/\/[^\s]+/g);
  
  const pancakePayload = {
    name: payload.Name,
    phone_number: payload.Phone,
    email: payload.Email,
    project_description: payload.Note,
    city: payload.city,
    zip_code: payload.zip_code,
    fotos: fileMatches ? fileMatches : undefined,
    links: fileMatches ? fileMatches : undefined,
  };

  try {
    const pancakeRes = await fetch(
      `https://crm.pancake.vn/api/workspaces/${SHOP_ID}/${TABLE_NAME}/records?api_key=${PANCAKE_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pancakePayload),
      }
    );

    const data = await pancakeRes.json().catch(() => ({}));

    if (!pancakeRes.ok) {
      console.error('[pancake-lead] Pancake API error:', pancakeRes.status, data);
      return res.status(502).json({ error: 'Pancake API error', details: data });
    }

    return res.status(200).json({ success: true, data });
  } catch (err) {
    console.error('[pancake-lead] Unexpected error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
