import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_KEY);

async function test() {
  const email = `test.${Date.now()}@gmail.com`;
  const password = 'Password123!';
  
  console.log(`[1] Registering user: ${email}`);
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password
  });
  
  if (signUpError) {
    console.error('SignUp Error:', signUpError.message);
    return;
  }
  
  console.log('[2] SignUp successful. User ID:', signUpData.user?.id);
  console.log('Is email confirmed?', signUpData.user?.email_confirmed_at ? 'Yes' : 'No');
  
  console.log(`[3] Attempting to login with same credentials...`);
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (signInError) {
    console.error('SignIn Error:', signInError.message);
  } else {
    console.log('[4] SignIn successful! Session:', !!signInData.session);
  }
}

test();
