'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '../../../lib/utils';
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  Heart,
  User,
  CreditCard,
  Search,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { Button } from '../../../components/ui/button';

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/reader/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Catálogo',
    href: '/reader/catalog',
    icon: Search,
  },
  {
    title: 'Empréstimos',
    href: '/reader/loans',
    icon: BookOpen,
    badge: 3,
  },
  {
    title: 'Reservas',
    href: '/reader/reservations',
    icon: Calendar,
    badge: 2,
  },
  {
    title: 'Favoritos',
    href: '/reader/favorites',
    icon: Heart,
    badge: 15,
  },
  {
    title: 'Pagamentos',
    href: '/reader/payments',
    icon: CreditCard,
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/logout', { method: 'POST' });
      if (res.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error('Erro ao sair:', error);
    }
  };

  return (
    <aside
      className={cn(
        'sticky top-16 h-[calc(100vh-4rem)] border-r bg-background transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex h-full flex-col">
        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1">{item.title}</span>
                      {item.badge && (
                        <span
                          className={cn(
                            'flex h-5 w-5 items-center justify-center rounded-full text-xs',
                            isActive
                              ? 'bg-primary-foreground text-primary'
                              : 'bg-muted text-muted-foreground'
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="border-t p-2 space-y-1">
          {/* Profile Link */}
          <Link href="/reader/profile">
            <div
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                pathname === '/reader/profile'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <User className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span className="flex-1">Perfil</span>}
            </div>
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className={cn(
              'w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              'text-red-600 hover:bg-red-50 hover:text-red-700'
            )}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span className="flex-1">Sair</span>}
          </button>

          {/* Collapse Button */}
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <>
                <ChevronLeft className="h-5 w-5 mr-2" />
                <span>Recolher</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </aside>
  );
}