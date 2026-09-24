'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import {
  Code2, ArrowLeft, Cpu, MemoryStick, HardDrive, Play, Square,
  RefreshCw, Terminal, Globe, Shield, Settings, Plus, Trash2,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatusBadge } from '@/components/status-badge';
import { apps } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function AppDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const app = apps.find((a) => a.id === id) || apps[0];
  const { toast } = useToast();

  const handleAction = (action: string) => {
    toast({ title: action, description: `${action} aplicado a ${app.name}` });
  };

  return (
    <div className="space-y-6">
      <Link href="/aplicaciones" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Volver a aplicaciones
      </Link>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary"><Code2 className="h-6 w-6" /></div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{app.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <StatusBadge status={app.status} />
              <span className="text-xs text-muted-foreground">{app.domain}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => handleAction('Reiniciar')}><RefreshCw className="h-4 w-4 mr-2" /> Reiniciar</Button>
          <Button variant="outline" size="sm" onClick={() => handleAction('Detener')}><Square className="h-4 w-4 mr-2" /> Detener</Button>
          <Button size="sm" onClick={() => handleAction('Iniciar')}><Play className="h-4 w-4 mr-2" /> Iniciar</Button>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="flex-wrap">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="config">Configuración</TabsTrigger>
          <TabsTrigger value="process">Proceso PM2</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="domain">Dominio</TabsTrigger>
          <TabsTrigger value="ssl">SSL</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-5">
              <div className="flex items-center gap-2 mb-3"><Cpu className="h-4 w-4 text-muted-foreground" /><span className="text-sm text-muted-foreground">CPU</span></div>
              <div className="text-2xl font-bold">{app.cpu}%</div>
              <Progress value={app.cpu} className="h-2 mt-2" />
            </Card>
            <Card className="p-5">
              <div className="flex items-center gap-2 mb-3"><MemoryStick className="h-4 w-4 text-muted-foreground" /><span className="text-sm text-muted-foreground">RAM</span></div>
              <div className="text-2xl font-bold">{app.ram} MB</div>
              <Progress value={(app.ram / 1024) * 100} className="h-2 mt-2" />
            </Card>
            <Card className="p-5">
              <div className="flex items-center gap-2 mb-3"><HardDrive className="h-4 w-4 text-muted-foreground" /><span className="text-sm text-muted-foreground">Storage</span></div>
              <div className="text-2xl font-bold">{app.storage}</div>
            </Card>
          </div>
          <Card className="p-5">
            <h2 className="text-base font-semibold mb-4">Información del despliegue</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between rounded-lg border p-3"><span className="text-muted-foreground">Node.js</span><Badge variant="secondary">v{app.nodeVersion}</Badge></div>
              <div className="flex justify-between rounded-lg border p-3"><span className="text-muted-foreground">PM2 ID</span><span className="font-mono">#{app.pm2Id}</span></div>
              <div className="flex justify-between rounded-lg border p-3"><span className="text-muted-foreground">Entry point</span><span className="font-mono">{app.entryPoint}</span></div>
              <div className="flex justify-between rounded-lg border p-3"><span className="text-muted-foreground">Puerto interno</span><span className="font-mono">:{app.port}</span></div>
              <div className="flex justify-between rounded-lg border p-3"><span className="text-muted-foreground">Directorio</span><span className="font-mono text-xs">{app.directory}</span></div>
              <div className="flex justify-between rounded-lg border p-3"><span className="text-muted-foreground">Último deploy</span><span>{app.lastDeploy}</span></div>
            </div>
          </Card>
        </TabsContent>

        {/* Config */}
        <TabsContent value="config" className="space-y-4">
          <Card className="p-5">
            <h2 className="text-base font-semibold mb-4">Variables de entorno</h2>
            <div className="space-y-2">
              {app.envVars.map((env) => (
                <div key={env.key} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-medium">{env.key}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-muted-foreground">{env.value}</span>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toast({ title: 'Editar variable', description: env.key })}><Settings className="h-3.5 w-3.5" /></Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="mt-4"><Plus className="h-4 w-4 mr-2" /> Añadir variable</Button>
          </Card>
        </TabsContent>

        {/* Process */}
        <TabsContent value="process" className="space-y-4">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2"><Terminal className="h-5 w-5" /><h2 className="text-base font-semibold">PM2 Process Manager</h2></div>
              <StatusBadge status={app.status} />
            </div>
            <div className="rounded-lg border p-4 font-mono text-xs space-y-2 bg-secondary/30">
              <div className="flex justify-between"><span className="text-muted-foreground">App name</span><span>{app.name}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Namespace</span><span>default</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Version</span><span>{app.nodeVersion}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Mode</span><span>cluster</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Restarts</span><span>2</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Uptime</span><span>3d 14h 22m</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Profile</span><span>production</span></div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm" onClick={() => handleAction('Reiniciar')}><RefreshCw className="h-4 w-4 mr-2" /> Restart</Button>
              <Button variant="outline" size="sm" onClick={() => handleAction('Detener')}><Square className="h-4 w-4 mr-2" /> Stop</Button>
              <Button variant="outline" size="sm" onClick={() => handleAction('Iniciar')}><Play className="h-4 w-4 mr-2" /> Start</Button>
            </div>
          </Card>
        </TabsContent>

        {/* Logs */}
        <TabsContent value="logs">
          <Card className="p-0 overflow-hidden">
            <div className="flex items-center justify-between border-b p-4">
              <div className="flex items-center gap-2"><Terminal className="h-4 w-4" /><h2 className="text-base font-semibold">Consola de logs</h2></div>
              <Button variant="ghost" size="sm" onClick={() => toast({ title: 'Logs limpiados' })}>Limpiar</Button>
            </div>
            <div className="font-mono text-xs p-4 bg-secondary/30 dark:bg-black/30 max-h-[500px] overflow-y-auto scrollbar-thin space-y-1">
              {app.logs.map((log, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-muted-foreground shrink-0">{log.timestamp}</span>
                  <span className={cn('shrink-0 font-bold', log.level === 'error' && 'text-destructive', log.level === 'warn' && 'text-warning', log.level === 'info' && 'text-info')}>
                    [{log.level.toUpperCase()}]
                  </span>
                  <span>{log.message}</span>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Domain */}
        <TabsContent value="domain">
          <Card className="p-5 space-y-4">
            <div className="flex items-center gap-2"><Globe className="h-5 w-5" /><h2 className="text-base font-semibold">Dominio asociado</h2></div>
            <div className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">Dominio</span><Link href={`/dominios/${app.domain.split('.').slice(-2).join('.')}`} className="font-medium hover:text-primary">{app.domain}</Link></div>
              <div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">Proxy</span><span className="font-mono">localhost:{app.port}</span></div>
              <div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">SSL</span><StatusBadge status={app.sslStatus} /></div>
            </div>
          </Card>
        </TabsContent>

        {/* SSL */}
        <TabsContent value="ssl">
          <Card className="p-5 space-y-4">
            <div className="flex items-center gap-2"><Shield className="h-5 w-5" /><h2 className="text-base font-semibold">Estado del certificado</h2></div>
            <div className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">Dominio</span><span className="font-medium">{app.domain}</span></div>
              <div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">Estado</span><StatusBadge status={app.sslStatus} /></div>
              <div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">Emisor</span><span>Let&apos;s Encrypt</span></div>
              <div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">Auto-renovación</span><Badge className="bg-success/10 text-success">Activada</Badge></div>
            </div>
            <Button variant="outline" size="sm"><RefreshCw className="h-4 w-4 mr-2" /> Renovar certificado</Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
