'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from '@/components/ui/command';
import {
  LayoutDashboard, Globe, Server, Mail, Code2, Database, FolderOpen,
  Network, Shield, Key, Download, FileText, MessageSquare, Activity,
  HelpCircle, Settings, User, Search,
} from 'lucide-react';

const navItems = [
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
  { label: 'Configuración', icon: Settings, path: '/configuracion' },
  { label: 'Perfil', icon: User, path: '/configuracion/perfil' },
];

interface CommandPaletteContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CommandPaletteContext = createContext<CommandPaletteContextValue | undefined>(undefined);

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <CommandPaletteContext.Provider value={{ open, setOpen }}>
      {children}
      <CommandPaletteDialog />
    </CommandPaletteContext.Provider>
  );
}

export function useCommandPalette() {
  const ctx = useContext(CommandPaletteContext);
  if (!ctx) throw new Error('useCommandPalette must be used within CommandPaletteProvider');
  return ctx;
}

function CommandPaletteDialog() {
  const { open, setOpen } = useCommandPalette();
  const router = useRouter();

  const navigate = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Buscar en GoodMax Cloud..." />
      <CommandList>
        <CommandEmpty>No se encontraron resultados.</CommandEmpty>
        <CommandGroup heading="Navegación">
          {navItems.map((item) => (
            <CommandItem
              key={item.path}
              onSelect={() => navigate(item.path)}
              className="cursor-pointer"
            >
              <item.icon className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{item.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Acciones rápidas">
          <CommandItem onSelect={() => navigate('/dominios')} className="cursor-pointer">
            <Search className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Registrar dominio</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate('/correos')} className="cursor-pointer">
            <Search className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Crear cuenta de correo</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate('/aplicaciones')} className="cursor-pointer">
            <Search className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Crear aplicación Node.js</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate('/bases-de-datos')} className="cursor-pointer">
            <Search className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Crear base de datos</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate('/tickets')} className="cursor-pointer">
            <Search className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Abrir ticket de soporte</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
