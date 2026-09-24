'use client';

import { User, Shield, Lock, Key, Monitor, Mail, Phone, Building2, Smartphone, Laptop, Globe } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { PageHeader } from '@/components/shared';
import { currentUser } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

const sessions = [
  { device: 'MacBook Pro', location: 'Quito, Ecuador', ip: '186.66.12.34', current: true, icon: Laptop },
  { device: 'iPhone 15', location: 'Quito, Ecuador', ip: '186.66.12.35', current: false, icon: Smartphone },
];

export default function PerfilPage() {
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <PageHeader title="Perfil" description="Información personal y configuración de seguridad." />

      {/* Profile card */}
      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="h-16 w-16"><AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">{currentUser.avatar}</AvatarFallback></Avatar>
          <div>
            <h2 className="text-lg font-bold">{currentUser.name}</h2>
            <p className="text-sm text-muted-foreground">{currentUser.email}</p>
            <Badge variant="secondary" className="mt-1">Plan {currentUser.plan}</Badge>
          </div>
          <Button variant="outline" size="sm" className="ml-auto" onClick={() => toast({ title: 'Cambiar foto' })}>Cambiar foto</Button>
        </div>
      </Card>

      {/* Personal info */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4"><User className="h-5 w-5" /><h2 className="text-base font-semibold">Información personal</h2></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Nombre</Label><Input defaultValue={currentUser.name.split(' ')[0]} /></div>
          <div className="space-y-2"><Label>Apellido</Label><Input defaultValue={currentUser.name.split(' ').slice(1).join(' ')} /></div>
          <div className="space-y-2"><Label>Correo electrónico</Label><div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input defaultValue={currentUser.email} className="pl-9" /></div></div>
          <div className="space-y-2"><Label>Teléfono</Label><div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input defaultValue={currentUser.phone} className="pl-9" /></div></div>
        </div>
        <div className="mt-4 flex justify-end"><Button onClick={() => toast({ title: 'Perfil actualizado', description: 'Los cambios se han guardado' })}>Guardar cambios</Button></div>
      </Card>

      {/* Business info */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4"><Building2 className="h-5 w-5" /><h2 className="text-base font-semibold">Información empresarial</h2></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2"><Label>Empresa</Label><Input defaultValue={currentUser.company} /></div>
          <div className="space-y-2"><Label>RUC / NIF</Label><Input defaultValue="1791234567001" /></div>
          <div className="space-y-2"><Label>Dirección</Label><Input defaultValue="Av. Amazonas 455, Quito" /></div>
          <div className="space-y-2"><Label>País</Label><Input defaultValue="Ecuador" /></div>
        </div>
        <div className="mt-4 flex justify-end"><Button variant="outline" onClick={() => toast({ title: 'Datos guardados' })}>Guardar</Button></div>
      </Card>

      {/* Security */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4"><Shield className="h-5 w-5" /><h2 className="text-base font-semibold">Seguridad</h2></div>
        <div className="space-y-4">
          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary"><Lock className="h-4 w-4" /></div><div><div className="text-sm font-medium">Contraseña</div><div className="text-xs text-muted-foreground">Última modificación: hace 2 días</div></div></div>
              <Button variant="outline" size="sm" onClick={() => toast({ title: 'Cambiar contraseña' })}>Cambiar</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="space-y-1.5"><Label className="text-xs">Contraseña actual</Label><Input type="password" placeholder="••••••••" /></div>
              <div className="space-y-1.5"><Label className="text-xs">Nueva contraseña</Label><Input type="password" placeholder="••••••••" /></div>
              <div className="space-y-1.5"><Label className="text-xs">Confirmar</Label><Input type="password" placeholder="••••••••" /></div>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary"><Key className="h-4 w-4" /></div><div><div className="text-sm font-medium">Autenticación de dos factores</div><div className="text-xs text-muted-foreground">Protege tu cuenta con una capa adicional</div></div></div>
            <div className="flex items-center gap-2"><Badge className="bg-success/10 text-success">Activo</Badge><Switch defaultChecked /></div>
          </div>
        </div>
      </Card>

      {/* Sessions */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4"><Monitor className="h-5 w-5" /><h2 className="text-base font-semibold">Sesiones activas</h2></div>
        <div className="space-y-3">
          {sessions.map((session) => (
            <div key={session.ip} className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary"><session.icon className="h-4 w-4" /></div>
                <div>
                  <div className="text-sm font-medium flex items-center gap-2">{session.device}{session.current && <Badge variant="secondary" className="text-[10px]">Actual</Badge>}</div>
                  <div className="text-xs text-muted-foreground">{session.location} · {session.ip}</div>
                </div>
              </div>
              {!session.current && <Button variant="outline" size="sm" className="text-destructive" onClick={() => toast({ title: 'Sesión cerrada', description: session.device, variant: 'destructive' })}>Cerrar sesión</Button>}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
