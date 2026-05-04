// components/shared/Sidebar.tsx
import Link from 'next/link';
import { Home, Users, Calendar, Wallet, Settings, ShieldCheck } from 'lucide-react';

export function Sidebar({ role }: { role: 'super-admin' | 'admin' | 'student' }) {
  
  const studentTabs = [
    { name: 'Home', href: '/student/home', icon: Home },
    { name: 'Community', href: '/student/community', icon: Users },
    { name: 'Attendance', href: '/student/attendance', icon: Calendar },
    { name: 'Finance', href: '/student/finance', icon: Wallet },
    { name: 'Profile', href: '/student/profile', icon: Settings },
  ];

  const adminTabs = [
    { name: 'Events', href: '/admin/events', icon: Calendar },
    { name: 'Attendance', href: '/admin/attendance', icon: Users },
    { name: 'Finance', href: '/admin/finance', icon: Wallet },
    { name: 'Community', href: '/admin/community', icon: Home },
  ];

  const tabs = role === 'student' ? studentTabs : adminTabs;

  return (
    <nav className="w-64 bg-slate-900 text-white h-screen p-4">
      <h1 className="text-xl font-bold mb-8">School SMS</h1>
      <ul className="space-y-4">
        {tabs.map((tab) => (
          <li key={tab.name}>
            <Link href={tab.href} className="flex items-center gap-3 hover:text-blue-400">
              <tab.icon size={20} />
              {tab.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
