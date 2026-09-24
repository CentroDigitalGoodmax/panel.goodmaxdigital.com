'use client';

import Link from 'next/link';
import {
  Settings, User, Shield, Bell, Palette, CreditCard, Code2,
  Monitor, ChevronRight, Lock, Key,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/shared';
import { currentUser } from '@/lib/mock-data';

const sections = [
  { icon: User, label: 'Cuenta', description: 'Información personal y empresarial', href: '/configuracion/perfil' },
  { icon: Shield, label: 'Seguridad', description: 'Contraseña, 2FA y sesiones', href: '/configuracion' },
  { icon: Bell, label: 'Notificaciones', description: 'Preferencias de alertas', href: '/configuracion' },
  { icon: Palette, label: 'Preferencias', description: 'Tema, idioma y apariencia', href: '/configuracion' },
  { icon: CreditCard, label: 'Facturación', description: 'Métodos de pago y facturas', href: '/facturas' },
  { icon: Code2, label: 'API', description: 'Claves y webhooks', href: '/configuracion' },
];

export default function ConfiguracionPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Configuración" description="Administra tu cuenta y preferencias." />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((section) => (
          <Link key={section.label} href={section.href}>
            <Card className="p-5 transition-all hover:shadow-md cursor-pointer group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <section.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{section.label}</div>
                    <div className="text-xs text-muted-foreground">{section.description}</div>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Security quick view */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4"><Shield className="h-5 w-5" /><h2 className="text-base font-semibold">Seguridad</h2></div>
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="flex items-center gap-3"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary"><Lock className="h-4 w-4" /></div><div><div className="text-sm font-medium">Contraseña</div><div className="text-xs text-muted-foreground">Última modificación: hace 2 días</div></div></div>
            <Button variant="outline" size="sm">Cambiar</Button>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="flex items-center gap-3"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary"><Key className="h-4 w-4" /></div><div><div className="text-sm font-medium">Autenticación de dos factores</div><div className="text-xs text-muted-foreground">App autenticadora</div></div></div>
            <div className="flex items-center gap-2"><Badge className="bg-success/10 text-success">Activo</Badge><Switch defaultChecked /></div>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="flex items-center gap-3"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary"><Monitor className="h-4 w-4" /></div><div><div className="text-sm font-medium">Sesiones activas</div><div className="text-xs text-muted-foreground">2 dispositivos conectados</div></div></div>
            <Button variant="outline" size="sm">Ver sesiones</Button>
          </div>
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4"><Bell className="h-5 w-5" /><h2 className="text-base font-semibold">Notificaciones</h2></div>
        <div className="space-y-4">
          {[
            { label: 'Alertas de servicio', desc: 'Notificaciones de estados de infraestructura' },
            { label: 'Facturas y pagos', desc: 'Avisos de facturas y vencimientos' },
            { label: 'Renovaciones', desc: 'Avisos de dominios y servicios próximos a vencer' },
            { label: 'Tickets de soporte', desc: 'Respuestas en tickets abiertos' },
            { label: 'Newsletter', desc: 'Novedades y actualizaciones de GoodMax' },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between rounded-lg border p-3">
              <div><div className="text-sm font-medium">{item.label}</div><div className="text-xs text-muted-foreground">{item.desc}</div></div>
              <Switch defaultChecked />
            </div>
          ))}
        </div>
      </Card>

      {/* API */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2"><Code2 className="h-5 w-5" /><h2 className="text-base font-semibold">API Keys</h2></div>
          <Button size="sm">Generar key</Button>
        </div>
        <div className="rounded-lg border p-4 font-mono text-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Production Key</span>
            <span>GMX-••••••••••••••••</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Sandbox Key</span>
            <span>GMX-test-••••••••••••</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
