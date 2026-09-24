'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Globe, Server, Mail, Code2, Database, FolderOpen,
  Network, Shield, Key, Download, FileText, MessageSquare, Activity,
  HelpCircle, Settings, User, ChevronLeft, ChevronRight, LogOut,
  Cloud,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';

const mainNav = [
  { label: 'Panel', icon: LayoutDashboard, path: '/panel' },
  { label: 'Dominios', icon: Globe, path: '/dominios' },
  { label: 'Hosting', icon: Server, path: '/hosting' },
  { label: 'Correos', icon: Mail, path: '/correos' },
  { label: 'Aplicaciones', icon: Code2, path: '/aplicaciones' },
  { label: 'Bases de datos', icon: Database, path: '/bases-de-datos' },
  { label: 'Archivos', icon: FolderOpen, path: '/archivos' },
  { label: 'DNS', icon: Network, path: '/dns' },
  { label: 'Certificados SSL', icon: Shield, path: '/ssl' },
  { label: 'Licencias', icon: Key, path: '/licencias' },
  { label: 'Descargas', icon: Download, path: '/descargas' },
  { label: 'Facturas', icon: FileText, path: '/facturas' },
  { label: 'Tickets', icon: MessageSquare, path: '/tickets' },
  { label: 'Actividad', icon: Activity, path: '/actividad' },
  { label: 'Soporte', icon: HelpCircle, path: '/soporte' },
];

const bottomNav = [
  { label: 'Configuración', icon: Settings, path: '/configuracion' },
  { label: 'Perfil', icon: User, path: '/configuracion/perfil' },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('sidebar-collapsed');
    if (stored === 'true') setCollapsed(true);
  }, []);

  useEffect(() => {
    const handler = () => setMobileOpen(true);
    window.addEventListener('toggle-mobile-sidebar', handler);
    return () => window.removeEventListener('toggle-mobile-sidebar', handler);
  }, []);

  const toggleCollapse = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem('sidebar-collapsed', String(next));
  };

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/');

  const renderNavItems = (items: typeof mainNav, isBottom = false) => (
    <nav className={cn('space-y-1', isBottom && 'mt-auto')}>
      {items.map((item) => {
        const active = isActive(item.path);
        const link = (
          <Link
            href={item.path}
            onClick={() => setMobileOpen(false)}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
              'hover:bg-secondary hover:text-foreground',
              active && 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
              collapsed && 'justify-center px-2',
              !active && 'text-muted-foreground'
            )}
          >
            <item.icon className={cn('h-[18px] w-[18px] shrink-0', active && 'text-primary-foreground')} />
            {!collapsed && <span className="truncate">{item.label}</span>}
          </Link>
        );

        if (collapsed) {
          return (
            <TooltipProvider key={item.path} delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>{link}</TooltipTrigger>
                <TooltipContent side="right" className="font-medium">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        }
        return <div key={item.path}>{link}</div>;
      })}
    </nav>
  );

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className={cn('flex items-center gap-2.5 border-b px-4 py-4', collapsed && 'justify-center px-2')}>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary">
          <Cloud className="h-5 w-5 text-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-tight">GoodMax</span>
            <span className="text-[10px] text-muted-foreground leading-tight">Cloud Platform</span>
          </div>
        )}
      </div>

      {/* Nav */}
      <div className="flex flex-1 flex-col overflow-y-auto scrollbar-thin px-3 py-4 gap-1">
        {renderNavItems(mainNav)}
        <div className="mt-3 border-t pt-3" />
        {renderNavItems(bottomNav, true)}

        {/* Logout */}
        <div className={cn('pt-3', collapsed && 'flex justify-center')}>
          {collapsed ? (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                    <LogOut className="h-[18px] w-[18px]" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="font-medium">Cerrar sesión</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive">
              <LogOut className="h-[18px] w-[18px]" />
              <span>Cerrar sesión</span>
            </Button>
          )}
        </div>
      </div>

      {/* Collapse toggle (desktop) */}
      {!collapsed ? (
        <div className="hidden lg:flex border-t px-3 py-2">
          <Button variant="ghost" size="sm" onClick={toggleCollapse} className="w-full justify-center text-muted-foreground">
            <ChevronLeft className="h-4 w-4" />
            <span className="ml-1">Contraer</span>
          </Button>
        </div>
      ) : (
        <div className="hidden lg:flex border-t px-3 py-2 justify-center">
          <Button variant="ghost" size="icon" onClick={toggleCollapse} className="text-muted-foreground">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside
        className={cn(
          'hidden lg:flex flex-col border-r bg-card transition-all duration-200 shrink-0',
          collapsed ? 'w-[68px]' : 'w-[260px]'
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-[260px] p-0">
          {sidebarContent}
        </SheetContent>
      </Sheet>
    </>
  );
}
