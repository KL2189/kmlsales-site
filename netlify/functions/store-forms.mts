import type { NetlifyFunction } from '@netlify/functions';
import { storeSubmission } from '../../server/form-storage.mts';

// Netlify verifies platform event signatures. There is no public fetch handler.
export default {
  async formSubmitted(event) {
    await storeSubmission(event.data, Netlify.env.get('SUPABASE_URL'), Netlify.env.get('SUPABASE_SERVICE_ROLE_KEY'));
  },
} satisfies NetlifyFunction;
