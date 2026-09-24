'use client';

import Link from 'next/link';
import { Server, Plus, HardDrive, Cpu, MemoryStick, Activity, Database, Mail, MoreHorizontal } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { StatusBadge } from '@/components/status-badge';
import { PageHeader } from '@/components/shared';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { hostingServices } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function HostingPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Hosting" description="Administra tus planes de hosting y recursos.">
        <Button><Plus className="h-4 w-4 mr-2" /> Contratar hosting</Button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Planes activos', value: hostingServices.length },
          { label: 'Sitios web', value: hostingServices.reduce((a, h) => a + h.sites.length, 0) },
          { label: 'Bases de datos', value: hostingServices.reduce((a, h) => a + h.databases, 0) },
          { label: 'Cuentas correo', value: hostingServices.reduce((a, h) => a + h.emails, 0) },
        ].map((s) => (
          <Card key={s.label} className="p-4">
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Hosting cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {hostingServices.map((host) => {
          const diskPct = (host.diskUsed / host.diskTotal) * 100;
          const ramPct = (host.ram / host.ramTotal) * 100;
          return (
            <Card key={host.id} className="p-5 transition-all hover:shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                    <Server className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold">{host.id}</div>
                    <div className="text-xs text-muted-foreground">{host.plan}</div>
                  </div>
                </div>
                <StatusBadge status={host.status} />
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Dominio</span>
                  <Link href={`/dominios/${host.domain}`} className="font-medium hover:text-primary">{host.domain}</Link>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">PHP</span>
                  <span className="font-medium">v{host.phpVersion}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Renovación</span>
                  <span className="font-medium">{host.renewalDate}</span>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <ResourceBar icon={HardDrive} label="Disco" used={host.diskUsed} total={host.diskTotal} unit="GB" pct={diskPct} />
                <ResourceBar icon={MemoryStick} label="RAM" used={host.ram} total={host.ramTotal} unit="GB" pct={ramPct} />
                <ResourceBar icon={Activity} label="CPU" used={host.cpu} total={100} unit="%" pct={host.cpu} />
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1"><Database className="h-3.5 w-3.5" /> {host.databases} DBs</span>
                <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> {host.emails} correos</span>
                <span className="flex items-center gap-1"><Activity className="h-3.5 w-3.5" /> {host.trafficUsed}/{host.trafficTotal} GB</span>
              </div>

              <div className="flex gap-2">
                <Button asChild size="sm" className="flex-1">
                  <Link href={`/hosting/${host.id}`}>Administrar</Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild><Link href={`/hosting/${host.id}`} className="cursor-pointer">Administrar</Link></DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">Renovar</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">Backup</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function ResourceBar({ icon: Icon, label, used, total, unit, pct }: { icon: typeof Server; label: string; used: number; total: number; unit: string; pct: number }) {
  const isHigh = pct > 80;
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5 text-muted-foreground"><Icon className="h-3.5 w-3.5" /> {label}</span>
        <span className={cn('font-mono', isHigh && 'text-warning')}>{used} / {total} {unit}</span>
      </div>
      <Progress value={pct} className={cn('h-1.5', isHigh && '[&>*]:bg-warning')} />
    </div>
  );
}
