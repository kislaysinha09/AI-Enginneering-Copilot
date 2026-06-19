// supabaseClient.js
// Initialize Supabase client for server-side use
// Requires SUPABASE_URL and either SUPABASE_SERVICE_ROLE_KEY (preferred) or SUPABASE_ANON_KEY in environment.

const { createClient } = require('@supabase/supabase-js');
const ws = require('ws');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  console.error('SUPABASE_URL is not defined in environment');
  process.exit(1);
}
if (!supabaseKey) {
  console.error('SUPABASE_SERVICE_ROLE_KEY or SUPABASE_ANON_KEY is required');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  realtime: {
    transport: ws
  }
});

module.exports = supabase;
