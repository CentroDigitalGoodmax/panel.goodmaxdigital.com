'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import {
  Server, HardDrive, Cpu, MemoryStick, Activity, Database, Mail,
  FolderOpen, Shield, Settings, ArrowLeft, Globe, Plus, MoreHorizontal,
  Play, Square, RefreshCw, Terminal,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatusBadge } from '@/components/status-badge';
import { UsageCard } from '@/components/shared';
import {
  ChartContainer, ChartTooltip, ChartTooltipContent,
} from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { hostingServices, usageChart7d } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const chartConfig: ChartConfig = {
  storage: { label: 'Disco', color: 'hsl(var(--chart-1))' },
  cpu: { label: 'CPU', color: 'hsl(var(--chart-2))' },
};

export default function HostingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const host = hostingServices.find((h) => h.id === id) || hostingServices[0];
  const { toast } = useToast();
  const [logs] = useState([
    { time: '09:15:22', level: 'info', msg: 'PHP-FPM process started' },
    { time: '09:15:20', level: 'info', msg: 'Nginx configuration reloaded' },
    { time: '09:10:05', level: 'warn', msg: 'High CPU usage: 38%' },
    { time: '08:45:12', level: 'info', msg: 'Backup completed successfully' },
    { time: '08:30:00', level: 'info', msg: 'Cron job executed: wp-cron.php' },
    { time: '07:00:00', level: 'info', msg: 'Daily backup started' },
    { time: '06:55:33', level: 'error', msg: 'Failed login attempt from 192.168.1.50' },
    { time: '06:30:00', level: 'info', msg: 'Log rotation completed' },
  ]);

  return (
    <div className="space-y-6">
      <Link href="/hosting" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Volver a hosting
      </Link>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
            <Server className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{host.id} · {host.plan}</h1>
            <div className="flex items-center gap-2 mt-1">
              <StatusBadge status={host.status} />
              <span className="text-xs text-muted-foreground">{host.domain}</span>
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm"><RefreshCw className="h-4 w-4 mr-2" /> Reiniciar servicio</Button>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="flex-wrap">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sites">Sitios web</TabsTrigger>
          <TabsTrigger value="databases">Bases de datos</TabsTrigger>
          <TabsTrigger value="emails">Correos</TabsTrigger>
          <TabsTrigger value="files">Archivos</TabsTrigger>
          <TabsTrigger value="security">Seguridad</TabsTrigger>
          <TabsTrigger value="config">Configuración</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="p-6 lg:col-span-2">
              <h2 className="text-base font-semibold mb-4">Consumo histórico (7 días)</h2>
              <ChartContainer config={chartConfig} className="h-[260px] w-full">
                <AreaChart data={usageChart7d}>
                  <defs>
                    <linearGradient id="cStorage" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="cCpu" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.3} />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="storage" stroke="hsl(var(--chart-1))" strokeWidth={2} fill="url(#cStorage)" />
                  <Area type="monotone" dataKey="cpu" stroke="hsl(var(--chart-2))" strokeWidth={2} fill="url(#cCpu)" />
                </AreaChart>
              </ChartContainer>
            </Card>
            <Card className="p-6">
              <h2 className="text-base font-semibold mb-5">Recursos actuales</h2>
              <div className="space-y-5">
                <UsageCard label="Disco" used={host.diskUsed} total={host.diskTotal} unit="GB" icon={HardDrive} />
                <UsageCard label="CPU" used={host.cpu} total={100} unit="%" icon={Cpu} />
                <UsageCard label="RAM" used={host.ram} total={host.ramTotal} unit="GB" icon={MemoryStick} />
                <UsageCard label="Transferencia" used={host.trafficUsed} total={host.trafficTotal} unit="GB" icon={Activity} />
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Sites */}
        <TabsContent value="sites">
          <Card className="p-0 overflow-hidden">
            <div className="flex items-center justify-between border-b p-4">
              <h2 className="text-base font-semibold">Sitios web</h2>
              <Button size="sm"><Plus className="h-4 w-4 mr-2" /> Añadir sitio</Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Dominio</TableHead><TableHead>Estado</TableHead>
                  <TableHead className="hidden md:table-cell">Disco</TableHead>
                  <TableHead className="hidden md:table-cell">SSL</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {host.sites.map((site) => (
                  <TableRow key={site.id} className="hover:bg-secondary/30">
                    <TableCell><div className="flex items-center gap-2"><Globe className="h-4 w-4 text-muted-foreground" /><span className="text-sm font-medium">{site.domain}</span></div></TableCell>
                    <TableCell><StatusBadge status={site.status} /></TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{site.disk}</TableCell>
                    <TableCell className="hidden md:table-cell">{site.ssl ? <Badge className="bg-success/10 text-success">Activo</Badge> : <Badge variant="secondary">Inactivo</Badge>}</TableCell>
                    <TableCell className="text-right"><Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toast({ title: 'Administrar sitio', description: site.domain })}><MoreHorizontal className="h-3.5 w-3.5" /></Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Databases */}
        <TabsContent value="sites">
          <Card className="p-0 overflow-hidden">
            <div className="flex items-center justify-between border-b p-4">
              <h2 className="text-base font-semibold">Bases de datos</h2>
              <Button size="sm"><Plus className="h-4 w-4 mr-2" /> Crear base de datos</Button>
            </div>
            <Table>
              <TableHeader><TableRow><TableHead>Nombre</TableHead><TableHead>Motor</TableHead><TableHead className="hidden md:table-cell">Tamaño</TableHead><TableHead className="hidden md:table-cell">Usuario</TableHead><TableHead className="text-right">Acciones</TableHead></TableRow></TableHeader>
              <TableBody>
                {host.databasesList.map((db) => (
                  <TableRow key={db.id} className="hover:bg-secondary/30">
                    <TableCell><div className="flex items-center gap-2"><Database className="h-4 w-4 text-muted-foreground" /><span className="text-sm font-medium font-mono">{db.name}</span></div></TableCell>
                    <TableCell><Badge variant="secondary">{db.engine}</Badge></TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{db.size}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm font-mono text-muted-foreground">{db.user}</TableCell>
                    <TableCell className="text-right"><Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toast({ title: 'phpMyAdmin', description: `Abriendo ${db.name}` })}><MoreHorizontal className="h-3.5 w-3.5" /></Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Emails */}
        <TabsContent value="emails">
          <Card className="p-0 overflow-hidden">
            <div className="flex items-center justify-between border-b p-4">
              <h2 className="text-base font-semibold">Cuentas de correo</h2>
              <Button size="sm" asChild><Link href="/correos"><Plus className="h-4 w-4 mr-2" /> Crear cuenta</Link></Button>
            </div>
            <Table>
              <TableHeader><TableRow><TableHead>Correo</TableHead><TableHead>Estado</TableHead><TableHead className="hidden md:table-cell">Almacenamiento</TableHead><TableHead className="hidden lg:table-cell">Último acceso</TableHead><TableHead className="text-right">Acciones</TableHead></TableRow></TableHeader>
              <TableBody>
                {host.emailAccounts.map((em) => (
                  <TableRow key={em.id} className="hover:bg-secondary/30">
                    <TableCell><div className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground" /><span className="text-sm font-medium">{em.address}</span></div></TableCell>
                    <TableCell><StatusBadge status={em.status} /></TableCell>
                    <TableCell className="hidden md:table-cell"><div className="flex items-center gap-2"><Progress value={(em.storageUsed / em.storageQuota) * 100} className="h-1.5 w-20" /><span className="text-xs text-muted-foreground">{em.storageUsed}/{em.storageQuota} GB</span></div></TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{em.lastAccess}</TableCell>
                    <TableCell className="text-right"><Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toast({ title: 'Administrar correo', description: em.address })}><MoreHorizontal className="h-3.5 w-3.5" /></Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Files */}
        <TabsContent value="files">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FolderOpen className="h-4 w-4" /> /home/{host.domain.split('.')[0]}/web/public_html
              </div>
              <Button size="sm" asChild><Link href="/archivos">Abrir administrador</Link></Button>
            </div>
            <div className="rounded-lg border p-8 text-center">
              <FolderOpen className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">Visita el administrador de archivos completo para gestionar todos tus archivos.</p>
            </div>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-5">
              <div className="flex items-center gap-2 mb-4"><Shield className="h-5 w-5 text-success" /><h2 className="text-base font-semibold">SSL</h2></div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Estado</span><Badge className="bg-success/10 text-success">Activo</Badge></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Emisor</span><span>Let&apos;s Encrypt</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Auto-renovación</span><Badge variant="secondary">Activada</Badge></div>
              </div>
            </Card>
            <Card className="p-5">
              <div className="flex items-center gap-2 mb-4"><Shield className="h-5 w-5 text-info" /><h2 className="text-base font-semibold">Protección</h2></div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Firewall</span><Badge className="bg-success/10 text-success">Activo</Badge></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Fail2Ban</span><Badge className="bg-success/10 text-success">Activo</Badge></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Imunify360</span><Badge className="bg-success/10 text-success">Activo</Badge></div>
              </div>
            </Card>
          </div>
          <Card className="p-0 overflow-hidden">
            <div className="border-b p-4"><h2 className="text-base font-semibold">Logs de acceso</h2></div>
            <div className="font-mono text-xs p-4 bg-secondary/30 max-h-80 overflow-y-auto scrollbar-thin space-y-1">
              {logs.map((log, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-muted-foreground shrink-0">{log.time}</span>
                  <span className={cn('shrink-0 font-bold', log.level === 'error' && 'text-destructive', log.level === 'warn' && 'text-warning', log.level === 'info' && 'text-info')}>
                    [{log.level.toUpperCase()}]
                  </span>
                  <span>{log.msg}</span>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Config */}
        <TabsContent value="config" className="space-y-4">
          <Card className="p-5">
            <h2 className="text-base font-semibold mb-4">Configuración PHP</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between rounded-lg border p-3"><span className="text-sm text-muted-foreground">Versión de PHP</span><Badge variant="secondary">v{host.phpVersion}</Badge></div>
              <div className="flex items-center justify-between rounded-lg border p-3"><span className="text-sm text-muted-foreground">memory_limit</span><span className="text-sm font-mono">512M</span></div>
              <div className="flex items-center justify-between rounded-lg border p-3"><span className="text-sm text-muted-foreground">max_execution_time</span><span className="text-sm font-mono">120s</span></div>
              <div className="flex items-center justify-between rounded-lg border p-3"><span className="text-sm text-muted-foreground">upload_max_filesize</span><span className="text-sm font-mono">256M</span></div>
            </div>
          </Card>
          <Card className="p-5">
            <h2 className="text-base font-semibold mb-4">Extensiones PHP</h2>
            <div className="flex flex-wrap gap-2">
              {['mysqli', 'pdo', 'pdo_mysql', 'gd', 'curl', 'mbstring', 'xml', 'zip', 'json', 'session', 'openssl', 'bcmath', 'intl', 'redis'].map((ext) => (
                <Badge key={ext} variant="secondary" className="font-mono text-xs">{ext}</Badge>
              ))}
            </div>
          </Card>
          <Card className="p-0 overflow-hidden">
            <div className="flex items-center justify-between border-b p-4">
              <h2 className="text-base font-semibold">Cron Jobs</h2>
              <Button size="sm"><Plus className="h-4 w-4 mr-2" /> Añadir cron</Button>
            </div>
            <Table>
              <TableHeader><TableRow><TableHead>Comando</TableHead><TableHead className="hidden md:table-cell">Programación</TableHead><TableHead className="text-right">Estado</TableHead></TableRow></TableHeader>
              <TableBody>
                <TableRow className="hover:bg-secondary/30"><TableCell className="font-mono text-xs">php /home/web/wp-cron.php</TableCell><TableCell className="hidden md:table-cell text-sm text-muted-foreground">Cada 5 min</TableCell><TableCell className="text-right"><Badge className="bg-success/10 text-success">Activo</Badge></TableCell></TableRow>
                <TableRow className="hover:bg-secondary/30"><TableCell className="font-mono text-xs">/usr/bin/php backup.sh</TableCell><TableCell className="hidden md:table-cell text-sm text-muted-foreground">Diario 03:00</TableCell><TableCell className="text-right"><Badge className="bg-success/10 text-success">Activo</Badge></TableCell></TableRow>
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
