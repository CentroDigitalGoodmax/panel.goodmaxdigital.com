'use client';

import Link from 'next/link';
import { Code2, Plus, Cpu, MemoryStick, HardDrive, MoreHorizontal, Circle } from 'lucide-react';
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
import { apps } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function AplicacionesPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Aplicaciones" description="Aplicaciones Node.js gestionadas con PM2.">
        <Button><Plus className="h-4 w-4 mr-2" /> Crear aplicación</Button>
      </PageHeader>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Aplicaciones', value: apps.length },
          { label: 'Running', value: apps.filter((a) => a.status === 'running').length },
          { label: 'Node.js 20', value: apps.filter((a) => a.nodeVersion === '20').length },
          { label: 'CPU promedio', value: `${Math.round(apps.reduce((a, b) => a + b.cpu, 0) / apps.length)}%` },
        ].map((s) => (
          <Card key={s.label} className="p-4"><div className="text-2xl font-bold">{s.value}</div><div className="text-xs text-muted-foreground mt-1">{s.label}</div></Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {apps.map((app) => (
          <Card key={app.id} className="p-5 transition-all hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
              <Link href={`/aplicaciones/${app.id}`} className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                  <Code2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-bold hover:text-primary transition-colors">{app.name}</div>
                  <div className="text-xs text-muted-foreground">{app.domain}</div>
                </div>
              </Link>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5">
                  <Circle className={cn('h-2.5 w-2.5 fill-success text-success', app.status !== 'running' && 'fill-muted text-muted')} />
                </span>
                <StatusBadge status={app.status} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="rounded-lg border p-2.5">
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1"><Cpu className="h-3 w-3" /> CPU</div>
                <div className="text-sm font-bold">{app.cpu}%</div>
                <Progress value={app.cpu} className="h-1 mt-1" />
              </div>
              <div className="rounded-lg border p-2.5">
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1"><MemoryStick className="h-3 w-3" /> RAM</div>
                <div className="text-sm font-bold">{app.ram} MB</div>
                <Progress value={(app.ram / 1024) * 100} className="h-1 mt-1" />
              </div>
              <div className="rounded-lg border p-2.5">
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1"><HardDrive className="h-3 w-3" /> Storage</div>
                <div className="text-sm font-bold">{app.storage}</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
              <span>Node.js {app.nodeVersion}</span>
              <span>PM2 ID: {app.pm2Id}</span>
              <span>Último deploy: {app.lastDeploy}</span>
            </div>

            <div className="flex gap-2">
              <Button asChild size="sm" className="flex-1"><Link href={`/aplicaciones/${app.id}`}>Administrar</Link></Button>
              <Button variant="outline" size="sm">Reiniciar</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild><Button variant="outline" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="cursor-pointer">Detener</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">Iniciar</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">Ver logs</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
