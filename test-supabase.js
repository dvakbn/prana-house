// Quick test to verify Supabase connection
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

console.log('Testing Supabase connection...\n');

// Check if credentials are loaded
console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? '✓ Found' : '✗ Missing');
console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? '✓ Found' : '✗ Missing');

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  console.error('\n❌ Environment variables missing!');
  process.exit(1);
}

// Create client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Test query
async function testConnection() {
  try {
    console.log('\nTesting gallery table...');
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .limit(5);
    
    if (error) {
      console.error('❌ Error:', error.message);
      return;
    }
    
    console.log('✅ Connection successful!');
    console.log(`Found ${data.length} images in gallery`);
    if (data.length > 0) {
      console.log('\nSample image:', data[0]);
    }
  } catch (err) {
    console.error('❌ Exception:', err.message);
  }
}

testConnection();
