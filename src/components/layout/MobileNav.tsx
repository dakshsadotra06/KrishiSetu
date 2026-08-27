'use client';

import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  CalendarClock, 
  Store, 
  ShoppingBag, 
  User 
} from 'lucide-react';

interface MobileNavProps {
  currentPath?: string;
}

export function MobileNav({ currentPath = '/' }: MobileNavProps) {
  const items = [
    { label: 'Home', href: '/', icon: LayoutDashboard },
    { label: 'Tokens', href: '/procurement', icon: CalendarClock, badge: '1' },
    { label: 'Produce', href: '/produce', icon: Store },
    { label: 'Offers', href: '/offers', icon: ShoppingBag, badge: '3' },
    { label: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur border-t border-slate-200 px-2 py-1.5 shadow-lg">
      <nav className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative ${
                isActive ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-600 scale-110' : 'text-slate-500'} transition-transform`} />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-2 bg-amber-500 text-slate-900 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
