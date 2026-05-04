import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    const supabase = await createClient();
    const { data } = await supabase.auth.exchangeCodeForSession(code);
    
    if (data.user) {
      // Check the role in the database
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      // THE TELEPORTATION LOGIC
      if (profile?.role === 'super-admin') return NextResponse.redirect(`${origin}/super-admin/dashboard`);
      if (profile?.role === 'admin') return NextResponse.redirect(`${origin}/admin/events`);
      return NextResponse.redirect(`${origin}/student/home`);
    }
  }

  return NextResponse.redirect(`${origin}/login`);
}
