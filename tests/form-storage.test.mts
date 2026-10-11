import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeSubmission, storeSubmission } from '../server/form-storage.mts';
const contact = { 'form-name': 'contact', name: 'Test Person', email: 'TEST@example.com', company: 'Test Company', team_size: '1–5 reps', service: 'Not sure yet', message: 'Test inquiry' };
test('contact does not imply newsletter consent', () => {
  const row = normalizeSubmission(contact)!;
  assert.equal(row.email, 'test@example.com');
  assert.equal(row.newsletter_consent, false);
  assert.equal(normalizeSubmission({...contact, newsletter:'yes'})!.newsletter_consent, true);
});
test('newsletter preserves source and records explicit signup', () => {
  const row = normalizeSubmission({'form-name':'newsletter',email:'test@example.com',source:'apps'})!;
  assert.equal(row.source,'apps'); assert.equal(row.newsletter_consent,true);
});
test('retries have stable IDs and separate browser submissions remain distinct', () => {
  assert.equal(normalizeSubmission(contact)!.submission_id, normalizeSubmission(contact)!.submission_id);
  assert.notEqual(normalizeSubmission({...contact,submission_id:'11111111-1111-4111-8111-111111111111'})!.submission_id,normalizeSubmission({...contact,submission_id:'22222222-2222-4222-8222-222222222222'})!.submission_id);
});
test('spam and unrelated forms do not reach storage', async () => {
  const fail = async () => { throw new Error('Unexpected network call'); };
  await storeSubmission({...contact,'bot-field':'spam'},undefined,undefined,fail);
  await storeSubmission({'form-name':'unknown'},undefined,undefined,fail);
});
test('invalid fields and missing secrets fail clearly', async () => {
  assert.throws(() => normalizeSubmission({...contact,email:'bad'}), /email/);
  assert.throws(() => normalizeSubmission({...contact,message:'x'.repeat(10001)}), /message/);
  assert.throws(() => normalizeSubmission({...contact,submission_id:'bad'}), /ID/);
  await assert.rejects(storeSubmission(contact,undefined,undefined), /not configured/);
});
test('database failure propagates for platform retry without leaking submitted data', async () => {
  await assert.rejects(storeSubmission(contact,'https://test.supabase.co','test-key',async () => new Response('private database detail',{status:503})), /503/);
});
test('server writes a single transaction to the expected RPC', async () => {
  let calls = 0;
  await storeSubmission(contact,'https://test.supabase.co','test-key',async (url, init) => {
    calls++; assert.equal(String(url),'https://test.supabase.co/rest/v1/rpc/record_website_submission');
    assert.equal(JSON.parse(init!.body as string).submission.email,'test@example.com');
    return new Response(null,{status:204});
  });
  assert.equal(calls,1);
});
