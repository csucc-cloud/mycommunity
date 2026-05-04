import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => request.cookies.getAll(), setAll: (cookies) => cookies.forEach(({ name, value }) => request.cookies.set(name, value)) } }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // 1. If not logged in and trying to access a dashboard, send to login
  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 2. Role-Based "Teleportation" Logic
  if (user) {
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();

    const path = request.nextUrl.pathname;

    // Prevent Students from entering Admin areas
    if (path.startsWith('/admin') && profile?.role !== 'admin') {
      return NextResponse.redirect(new URL('/student/home', request.url));
    }
    
    // Prevent Admins/Students from entering Super Admin areas
    if (path.startsWith('/super-admin') && profile?.role !== 'super-admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return response;
}
