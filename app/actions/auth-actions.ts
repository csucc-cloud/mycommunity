'use client';

import { createClient } from '@/utils/supabase/client';

export async function signIn(email: string) {
  const supabase = createClient();
  
  // We use Magic Links for simplicity, or password login
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) throw error;
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  window.location.href = '/';
}
