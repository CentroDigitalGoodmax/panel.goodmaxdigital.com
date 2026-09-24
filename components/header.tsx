'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search, Bell, Sun, Moon, Menu, ChevronRight, LogOut,
  Settings, User, ChevronDown, CheckCircle2, AlertTriangle,
  Info, XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useTheme } from '@/components/theme-provider';
import { useCommandPalette } from '@/components/command-palette';
import { cn } from '@/lib/utils';
import { currentUser, notifications, infraServices } from '@/lib/mock-data';

const routeLabels: Record<string, string> = {
  panel: 'Panel',
  dominios: 'Dominios',
  hosting: 'Hosting',
  correos: 'Correos',
  aplicaciones: 'Aplicaciones',
  'bases-de-datos': 'Bases de datos',
  archivos: 'Archivos',
  dns: 'DNS',
  ssl: 'Certificados SSL',
  licencias: 'Licencias',
  descargas: 'Descargas',
  facturas: 'Facturas',
  tickets: 'Tickets',
  actividad: 'Actividad',
  soporte: 'Soporte',
  configuracion: 'Configuración',
  perfil: 'Perfil',
};

export function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { setOpen } = useCommandPalette();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Build breadcrumbs
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs = segments.map((seg, i) => ({
    label: routeLabels[seg] || seg,
    path: '/' + segments.slice(0, i + 1).join('/'),
  }));

  // Trigger mobile sidebar via custom event
  const openMobileSidebar = () => {
    window.dispatchEvent(new CustomEvent('toggle-mobile-sidebar'));
  };

  useEffect(() => {
    const handler = () => setMobileMenuOpen((v) => !v);
    window.addEventListener('toggle-mobile-sidebar', handler);
    return () => window.removeEventListener('toggle-mobile-sidebar', handler);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const onlineCount = infraServices.filter((s) => s.status === 'online').length;

  const notifIcons = {
    info: Info,
    success: CheckCircle2,
    warning: AlertTriangle,
    error: XCircle,
  };

  const notifColors = {
    info: 'text-info',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-destructive',
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b bg-card/80 backdrop-blur-sm px-4 lg:px-6">
      {/* Mobile menu */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={openMobileSidebar}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Breadcrumbs */}
      <nav className="hidden md:flex items-center gap-1.5 text-sm">
        <Link href="/panel" className="text-muted-foreground hover:text-foreground transition-colors">
          Inicio
        </Link>
        {breadcrumbs.map((bc, i) => (
          <div key={bc.path} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
            <Link
              href={bc.path}
              className={cn(
                'transition-colors hover:text-foreground',
                i === breadcrumbs.length - 1 ? 'text-foreground font-medium' : 'text-muted-foreground'
              )}
            >
              {bc.label}
            </Link>
          </div>
        ))}
      </nav>

      {/* Search trigger */}
      <button
        onClick={() => setOpen(true)}
        className="ml-auto flex items-center gap-2 w-full max-w-xs rounded-lg border border-input bg-background px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-ring/50 cursor-pointer"
      >
        <Search className="h-4 w-4 shrink-0" />
        <span className="hidden sm:inline">Buscar en GoodMax...</span>
        <kbd className="ml-auto hidden md:inline-flex items-center gap-0.5 rounded border px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
          ⌘K
        </kbd>
      </button>

      {/* Infrastructure status */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="hidden lg:flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            <span className="text-xs text-muted-foreground">{onlineCount}/{infraServices.length} Online</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72" align="end">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Estado de infraestructura</span>
              <Badge variant="secondary" className="bg-success/10 text-success">Online</Badge>
            </div>
            {infraServices.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{s.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{s.uptime}</span>
                  <span className="flex h-2 w-2 rounded-full bg-success" />
                </div>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {/* Notifications */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-[18px] w-[18px]" />
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
                {unreadCount}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 lg:w-96" align="end">
          <div className="space-y-1">
            <div className="flex items-center justify-between px-1 pb-2">
              <span className="text-sm font-semibold">Notificaciones</span>
              <span className="text-xs text-muted-foreground">{unreadCount} sin leer</span>
            </div>
            {notifications.slice(0, 5).map((n) => {
              const Icon = notifIcons[n.type];
              return (
                <div
                  key={n.id}
                  className={cn(
                    'flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-secondary/50',
                    !n.read && 'bg-secondary/30'
                  )}
                >
                  <Icon className={cn('h-5 w-5 shrink-0 mt-0.5', notifColors[n.type])} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium truncate">{n.title}</span>
                      {!n.read && <span className="h-2 w-2 rounded-full bg-primary shrink-0" />}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.message}</p>
                    <span className="text-[10px] text-muted-foreground mt-1 block">{n.timestamp}</span>
                  </div>
                </div>
              );
            })}
            <div className="pt-2 border-t">
              <Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground">
                Ver todas las notificaciones
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Theme toggle */}
      <Button variant="ghost" size="icon" onClick={toggleTheme}>
        {theme === 'light' ? <Moon className="h-[18px] w-[18px]" /> : <Sun className="h-[18px] w-[18px]" />}
      </Button>

      {/* User menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-secondary">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                {currentUser.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:flex flex-col items-start">
              <span className="text-xs font-medium leading-tight">{currentUser.name}</span>
              <span className="text-[10px] text-muted-foreground leading-tight">Plan {currentUser.plan}</span>
            </div>
            <ChevronDown className="hidden md:block h-3.5 w-3.5 text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{currentUser.name}</span>
              <span className="text-xs text-muted-foreground font-normal">{currentUser.email}</span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/configuracion/perfil" className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/configuracion" className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Configuración</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Cerrar sesión</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
