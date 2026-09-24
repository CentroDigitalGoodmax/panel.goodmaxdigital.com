'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { CommandPaletteProvider } from '@/components/command-palette';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <CommandPaletteProvider>
        <div className="flex h-screen overflow-hidden bg-background">
          <Sidebar />
          <div className="flex flex-1 flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto scrollbar-thin">
              <div className="mx-auto max-w-7xl p-4 lg:p-6 animate-fade-in">
                {children}
              </div>
            </main>
          </div>
        </div>
      </CommandPaletteProvider>
    </ThemeProvider>
  );
}
