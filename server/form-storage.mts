import { createHash } from 'node:crypto';

export function normalizeSubmission(data: Record<string, string>) {
  if (data['bot-field']?.trim()) return null;
  const kind = data.form_kind || data['form-name'];
  if (kind !== 'contact' && kind !== 'newsletter') return null;
  const field = (name: string, max: number, required = true) => {
    const value = data[name]?.trim() ?? '';
    if ((required && !value) || value.length > max) throw new Error(`Invalid field: ${name}`);
    return value;
  };
  const email = field('email', 254).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Invalid field: email');
  const record = {
    kind, email,
    name: kind === 'contact' ? field('name', 200) : null,
    company: kind === 'contact' ? field('company', 300) : null,
    team_size: kind === 'contact' ? field('team_size', 50) : null,
    service: kind === 'contact' ? field('service', 200) : null,
    message: kind === 'contact' ? field('message', 10000) : null,
    source: kind === 'contact' ? 'contact' : field('source', 50),
    newsletter_consent: kind === 'newsletter' || data.newsletter === 'yes',
  };
  if (!['contact', 'footer', 'apps'].includes(record.source)) throw new Error('Invalid field: source');
  // Stable across platform retries; no-JS submissions fall back to a content hash.
  const suppliedId = field('submission_id', 36, false);
  if (suppliedId && !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(suppliedId)) throw new Error('Invalid submission ID');
  const submission_id = suppliedId || createHash('sha256').update(JSON.stringify(record)).digest('hex');
  return { ...record, submission_id };
}

export async function storeSubmission(data: Record<string, string>, url: string | undefined, key: string | undefined, request = fetch) {
  const record = normalizeSubmission(data);
  if (!record) return;
  if (!url || !key) throw new Error('Supabase form storage is not configured');
  const endpoint = new URL('/rest/v1/rpc/record_website_submission', url);
  if (endpoint.protocol !== 'https:' || !endpoint.hostname.endsWith('.supabase.co')) throw new Error('Invalid Supabase URL');
  const response = await request(endpoint, {
    method: 'POST',
    headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ submission: record }),
    signal: AbortSignal.timeout(15000),
  });
  // Do not log the response body or submitted personal information.
  if (!response.ok) throw new Error(`Supabase storage failed (${response.status}); submission remains in Netlify Forms`);
}
