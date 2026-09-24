'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import {
  Globe, Plus, Network, Shield, RefreshCw, ExternalLink, Settings,
  ChevronRight, Pencil, Trash2, ArrowLeft,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { StatusBadge } from '@/components/status-badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { domains } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

export default function DomainDetailPage({ params }: { params: Promise<{ domain: string }> }) {
  const { domain: domainParam } = use(params);
  const domain = domains.find((d) => d.name === domainParam) || domains[0];
  const { toast } = useToast();
  const [showAddDns, setShowAddDns] = useState(false);
  const [showAddSub, setShowAddSub] = useState(false);

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link href="/dominios" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Volver a dominios
      </Link>

      {/* Domain header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
            <Globe className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{domain.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <StatusBadge status={domain.status} />
              <span className="text-xs text-muted-foreground">Registrado el {domain.registeredDate}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <ExternalLink className="h-4 w-4 mr-2" /> Ver sitio
          </Button>
          <Button size="sm">
            <RefreshCw className="h-4 w-4 mr-2" /> Renovar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="dns">DNS</TabsTrigger>
          <TabsTrigger value="subdomains">Subdominios</TabsTrigger>
          <TabsTrigger value="ssl">SSL</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="p-5">
              <div className="text-xs text-muted-foreground mb-1">Dominio</div>
              <div className="text-sm font-medium">{domain.name}</div>
            </Card>
            <Card className="p-5">
              <div className="text-xs text-muted-foreground mb-1">Estado</div>
              <StatusBadge status={domain.status} />
            </Card>
            <Card className="p-5">
              <div className="text-xs text-muted-foreground mb-1">Registrador</div>
              <div className="text-sm font-medium">{domain.registrar}</div>
            </Card>
            <Card className="p-5">
              <div className="text-xs text-muted-foreground mb-1">Fecha de registro</div>
              <div className="text-sm font-medium">{domain.registeredDate}</div>
            </Card>
            <Card className="p-5">
              <div className="text-xs text-muted-foreground mb-1">Vencimiento</div>
              <div className="text-sm font-medium">{domain.expiryDate}</div>
            </Card>
            <Card className="p-5">
              <div className="text-xs text-muted-foreground mb-1">Auto-renovación</div>
              <div className="flex items-center gap-2">
                <Switch checked={domain.autoRenew} />
                <span className="text-sm">{domain.autoRenew ? 'Activada' : 'Desactivada'}</span>
              </div>
            </Card>
          </div>

          <Card className="p-5">
            <h2 className="text-base font-semibold mb-4">Acciones</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
              <Button variant="outline" size="sm" className="justify-start">
                <RefreshCw className="h-4 w-4 mr-2" /> Renovar
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                <Network className="h-4 w-4 mr-2" /> Configurar DNS
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                <Shield className="h-4 w-4 mr-2" /> Administrar SSL
              </Button>
              <Button variant="outline" size="sm" className="justify-start" onClick={() => setShowAddSub(true)}>
                <Plus className="h-4 w-4 mr-2" /> Crear subdominio
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                <ExternalLink className="h-4 w-4 mr-2" /> Ver sitio
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* DNS */}
        <TabsContent value="dns" className="space-y-4">
          <Card className="p-0 overflow-hidden">
            <div className="flex items-center justify-between border-b p-4">
              <div>
                <h2 className="text-base font-semibold">Registros DNS</h2>
                <p className="text-xs text-muted-foreground">{domain.dnsRecords.length} registros</p>
              </div>
              <Button size="sm" onClick={() => setShowAddDns(true)}>
                <Plus className="h-4 w-4 mr-2" /> Agregar registro
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead className="hidden md:table-cell">Prioridad</TableHead>
                  <TableHead className="hidden md:table-cell">TTL</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {domain.dnsRecords.map((record) => (
                  <TableRow key={record.id} className="hover:bg-secondary/30">
                    <TableCell>
                      <Badge variant="secondary" className="font-mono text-xs">{record.type}</Badge>
                    </TableCell>
                    <TableCell className="text-sm font-mono">{record.name}</TableCell>
                    <TableCell className="text-sm font-mono text-muted-foreground max-w-xs truncate">{record.value}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{record.priority || '-'}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{record.ttl}s</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toast({ title: 'Editar registro', description: `Editando ${record.type} ${record.name}` })}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => toast({ title: 'Eliminar registro', description: `¿Seguro que deseas eliminar el registro ${record.type}?`, variant: 'destructive' })}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Subdomains */}
        <TabsContent value="subdomains" className="space-y-4">
          <Card className="p-0 overflow-hidden">
            <div className="flex items-center justify-between border-b p-4">
              <div>
                <h2 className="text-base font-semibold">Subdominios</h2>
                <p className="text-xs text-muted-foreground">
                  {domain.subdomains.length} subdominios · No contabilizan como dominios adicionales
                </p>
              </div>
              <Button size="sm" onClick={() => setShowAddSub(true)}>
                <Plus className="h-4 w-4 mr-2" /> Crear subdominio
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subdominio</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="hidden md:table-cell">Target</TableHead>
                  <TableHead className="hidden md:table-cell">SSL</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {domain.subdomains.map((sub) => (
                  <TableRow key={sub.id} className="hover:bg-secondary/30">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{sub.name}.{domain.name}</span>
                        <Badge variant="outline" className="text-[10px]">Subdominio</Badge>
                      </div>
                    </TableCell>
                    <TableCell><StatusBadge status={sub.status} /></TableCell>
                    <TableCell className="hidden md:table-cell text-sm font-mono text-muted-foreground">{sub.target}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {sub.ssl ? <Badge className="bg-success/10 text-success">Activo</Badge> : <Badge variant="secondary">Inactivo</Badge>}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toast({ title: 'Administrar subdominio', description: `${sub.name}.${domain.name}` })}>
                        <Settings className="h-3.5 w-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* SSL */}
        <TabsContent value="ssl" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold">Certificado SSL</h2>
                <StatusBadge status={domain.sslStatus} />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Emisor</span>
                  <span className="font-medium">{domain.sslIssuer}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Vencimiento</span>
                  <span className="font-medium">{domain.sslExpiry}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Renovación automática</span>
                  <Switch checked={domain.sslAutoRenew} />
                </div>
              </div>
            </Card>
            <Card className="p-5">
              <h2 className="text-base font-semibold mb-4">Acciones SSL</h2>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <RefreshCw className="h-4 w-4 mr-2" /> Renovar certificado
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" /> Reinstalar certificado
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <ExternalLink className="h-4 w-4 mr-2" /> Ver certificado
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add DNS dialog */}
      <Dialog open={showAddDns} onOpenChange={setShowAddDns}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar registro DNS</DialogTitle>
            <DialogDescription>Crea un nuevo registro DNS para {domain.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tipo</Label>
                <Select defaultValue="A">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS', 'SRV'].map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>TTL</Label>
                <Select defaultValue="3600">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3600">1 hora</SelectItem>
                    <SelectItem value="7200">2 horas</SelectItem>
                    <SelectItem value="14400">4 horas</SelectItem>
                    <SelectItem value="86400">1 día</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Nombre</Label>
              <Input placeholder="@ o nombre del registro" />
            </div>
            <div className="space-y-2">
              <Label>Valor</Label>
              <Input placeholder="Valor del registro" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDns(false)}>Cancelar</Button>
            <Button onClick={() => { toast({ title: 'Registro DNS agregado', description: 'El registro se ha creado correctamente' }); setShowAddDns(false); }}>
              Agregar registro
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Subdomain dialog */}
      <Dialog open={showAddSub} onOpenChange={setShowAddSub}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear subdominio</DialogTitle>
            <DialogDescription>Crea un nuevo subdominio para {domain.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Nombre del subdominio</Label>
              <div className="flex items-center gap-1">
                <Input placeholder="blog" />
                <span className="text-sm text-muted-foreground">.{domain.name}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Target</Label>
              <Input placeholder="192.168.1.100" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddSub(false)}>Cancelar</Button>
            <Button onClick={() => { toast({ title: 'Subdominio creado', description: 'El subdominio se ha creado correctamente' }); setShowAddSub(false); }}>
              Crear subdominio
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
