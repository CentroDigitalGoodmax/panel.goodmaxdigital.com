'use client';

import Link from 'next/link';
import {
  Globe, Server, Mail, Code2, Key, HardDrive, Cpu, MemoryStick,
  Activity, Network, Database, Plus, RefreshCw, CreditCard,
  MessageSquare, ArrowRight, CheckCircle2,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ServiceCard, UsageCard, PageHeader } from '@/components/shared';
import { StatusBadge } from '@/components/status-badge';
import {
  ChartContainer, ChartTooltip, ChartTooltipContent,
} from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';
import {
  AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip,
  BarChart, Bar, LineChart, Line, CartesianGrid,
} from 'recharts';
import {
  domains, hostingServices, apps, emailAccounts, licenses,
  activityLogs, infraServices, usageChart7d, currentUser,
} from '@/lib/mock-data';

const chartConfig: ChartConfig = {
  storage: { label: 'Almacenamiento', color: 'hsl(var(--chart-1))' },
  cpu: { label: 'CPU', color: 'hsl(var(--chart-2))' },
  ram: { label: 'RAM', color: 'hsl(var(--chart-3))' },
  traffic: { label: 'Tráfico', color: 'hsl(var(--chart-4))' },
};

const quickActions = [
  { label: 'Registrar dominio', icon: Globe, href: '/dominios' },
  { label: 'Crear correo', icon: Mail, href: '/correos' },
  { label: 'Crear sitio', icon: Server, href: '/hosting' },
  { label: 'Crear aplicación', icon: Code2, href: '/aplicaciones' },
  { label: 'Crear base de datos', icon: Database, href: '/bases-de-datos' },
  { label: 'Abrir ticket', icon: MessageSquare, href: '/tickets' },
];

const activityIcons: Record<string, typeof Globe> = {
  domain: Globe,
  email: Mail,
  app: Code2,
  invoice: CreditCard,
  ticket: MessageSquare,
  security: Key,
  hosting: Server,
  database: Database,
};

export default function PanelPage() {
  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 19) return 'Buenas tardes';
    return 'Buenas noches';
  })();

  const mainHosting = hostingServices[0];
  const upcomingRenewals = [
    { name: 'tienda.com', type: 'Dominio', date: '2026-11-05', days: 42 },
    { name: 'Hosting GM-1', type: 'Hosting', date: '2026-11-05', days: 42 },
    { name: 'Hosting GM-2', type: 'Hosting', date: '2026-12-15', days: 82 },
    { name: 'JetBackup Pro', type: 'Licencia', date: '2026-11-20', days: 57 },
  ];

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">
          {greeting}, {currentUser.name.split(' ')[0]}
        </h1>
        <p className="text-sm text-muted-foreground">
          Administra todos tus servicios desde un solo lugar.
        </p>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <ServiceCard
          title="Hosting"
          count={hostingServices.length}
          countLabel="planes"
          icon={Server}
          href="/hosting"
          actionLabel="Gestionar"
          statusLabel="Activos"
        />
        <ServiceCard
          title="Dominios"
          count={domains.filter((d) => !d.isSubdomain).length}
          countLabel="dominios"
          icon={Globe}
          href="/dominios"
          actionLabel="Gestionar"
          statusLabel="Activos"
        />
        <ServiceCard
          title="Correos"
          count={emailAccounts.length}
          countLabel="cuentas"
          icon={Mail}
          href="/correos"
          actionLabel="Gestionar"
          statusLabel="Activas"
        />
        <ServiceCard
          title="Aplicaciones"
          count={apps.length}
          countLabel="apps"
          icon={Code2}
          href="/aplicaciones"
          actionLabel="Gestionar"
          statusLabel="Running"
        />
        <ServiceCard
          title="Licencias"
          count={licenses.filter((l) => l.status === 'active').length}
          countLabel="activas"
          icon={Key}
          href="/licencias"
          actionLabel="Gestionar"
          statusLabel="Activas"
        />
      </div>

      {/* Charts + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Usage chart */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold">Consumo de infraestructura</h2>
              <p className="text-xs text-muted-foreground">Últimos 7 días</p>
            </div>
            <Badge variant="secondary" className="text-xs">GM-3 Pro</Badge>
          </div>
          <ChartContainer config={chartConfig} className="h-[240px] w-full">
            <AreaChart data={usageChart7d} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorStorage" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.3} />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area type="monotone" dataKey="storage" stroke="hsl(var(--chart-1))" strokeWidth={2} fill="url(#colorStorage)" />
              <Area type="monotone" dataKey="cpu" stroke="hsl(var(--chart-2))" strokeWidth={2} fill="url(#colorCpu)" />
            </AreaChart>
          </ChartContainer>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-base font-semibold mb-4">Acciones rápidas</h2>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action) => (
              <Link key={action.label} href={action.href}>
                <div className="group flex flex-col items-start gap-2 rounded-lg border p-3 transition-all hover:border-foreground/20 hover:shadow-sm cursor-pointer">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <action.icon className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-medium leading-tight">{action.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </Card>
      </div>

      {/* Usage details + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Usage breakdown */}
        <Card className="p-6">
          <h2 className="text-base font-semibold mb-5">Recursos</h2>
          <div className="space-y-5">
            <UsageCard label="Almacenamiento" used={18.4} total={50} unit="GB" icon={HardDrive} />
            <UsageCard label="CPU" used={35} total={100} unit="%" icon={Cpu} />
            <UsageCard label="RAM" used={2.4} total={8} unit="GB" icon={MemoryStick} />
            <UsageCard label="Tráfico" used={142} total={500} unit="GB" icon={Activity} />
            <UsageCard label="Bases de datos" used={4} total={999} unit="" icon={Database} />
            <UsageCard label="Correos" used={12} total={30} unit="cuentas" icon={Mail} />
          </div>
        </Card>

        {/* Activity */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold">Actividad reciente</h2>
            <Link href="/actividad" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
              Ver todo <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-1">
            {activityLogs.slice(0, 7).map((log) => {
              const Icon = activityIcons[log.type] || Activity;
              return (
                <div key={log.id} className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-secondary/50 transition-colors">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{log.action}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{log.resource}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs text-muted-foreground">{log.date}</div>
                    <div className="text-xs text-muted-foreground">{log.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Renewals + Infrastructure Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Renewals */}
        <Card className="p-6">
          <h2 className="text-base font-semibold mb-4">Próximos a vencer</h2>
          <div className="space-y-3">
            {upcomingRenewals.map((item) => (
              <div key={item.name} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                    {item.type === 'Dominio' && <Globe className="h-4 w-4 text-muted-foreground" />}
                    {item.type === 'Hosting' && <Server className="h-4 w-4 text-muted-foreground" />}
                    {item.type === 'Licencia' && <Key className="h-4 w-4 text-muted-foreground" />}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{item.name}</div>
                    <div className="text-xs text-muted-foreground">{item.type} · Vence {item.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={item.days < 30 ? 'border-warning/20 text-warning' : 'border-border text-muted-foreground'}>
                    {item.days} días
                  </Badge>
                  <Button variant="ghost" size="sm" className="text-xs">
                    Renovar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Infrastructure status */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold">GoodMax Infrastructure</h2>
              <p className="text-xs text-muted-foreground">Estado global de servicios</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
              </span>
              <span className="text-sm font-medium text-success">Online</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {infraServices.map((svc) => (
              <div key={svc.name} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-success" />
                  <span className="text-sm font-medium">{svc.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">{svc.uptime}</div>
                  <div className="text-xs text-muted-foreground">{svc.latency}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
