'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Globe, Plus, MoreHorizontal, Network, Shield, RefreshCw,
  Settings, ExternalLink, Search,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/status-badge';
import { PageHeader, EmptyState } from '@/components/shared';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger, DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { domains } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

export default function DominiosPage() {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  const filtered = domains.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAction = (action: string, domain: string) => {
    toast({
      title: action,
      description: `Acción ejecutada sobre ${domain}`,
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Dominios" description="Gestiona tus dominios, DNS y certificados SSL.">
        <Button onClick={() => setShowRegister(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Registrar dominio
        </Button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Dominios totales', value: domains.filter((d) => !d.isSubdomain).length },
          { label: 'Activos', value: domains.filter((d) => d.status === 'active').length },
          { label: 'Subdominios', value: domains.reduce((acc, d) => acc + d.subdomains.length, 0) },
          { label: 'Auto-renovación', value: domains.filter((d) => d.autoRenew).length },
        ].map((stat) => (
          <Card key={stat.label} className="p-4">
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card className="p-0 overflow-hidden">
        <div className="flex items-center gap-3 border-b p-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar dominio..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Badge variant="secondary" className="text-xs">
            {filtered.length} resultados
          </Badge>
        </div>
        {filtered.length === 0 ? (
          <EmptyState
            icon={Globe}
            title="No se encontraron dominios"
            description="Intenta con otra búsqueda o registra un nuevo dominio."
          />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dominio</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="hidden md:table-cell">Vencimiento</TableHead>
                <TableHead className="hidden md:table-cell">Auto-renovación</TableHead>
                <TableHead className="hidden lg:table-cell">Servicio</TableHead>
                <TableHead className="hidden lg:table-cell">SSL</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((domain) => (
                <TableRow key={domain.id} className="hover:bg-secondary/30">
                  <TableCell>
                    <Link href={`/dominios/${domain.name}`} className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
                        <Globe className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium hover:text-primary transition-colors">{domain.name}</div>
                        {domain.isSubdomain && (
                          <div className="text-[10px] text-muted-foreground">Subdominio de {domain.parentDomain}</div>
                        )}
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={domain.status} />
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                    {domain.expiryDate}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Switch checked={domain.autoRenew} />
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                    {domain.hostingService}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <StatusBadge status={domain.sslStatus} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/dominios/${domain.name}`}>Administrar</Link>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/dominios/${domain.name}`} className="cursor-pointer">
                              <Settings className="mr-2 h-4 w-4" /> Administrar
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer" onClick={() => handleAction('DNS', domain.name)}>
                            <Network className="mr-2 h-4 w-4" /> Configurar DNS
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer" onClick={() => handleAction('Renovar', domain.name)}>
                            <RefreshCw className="mr-2 h-4 w-4" /> Renovar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="cursor-pointer" onClick={() => handleAction('Ver sitio', domain.name)}>
                            <ExternalLink className="mr-2 h-4 w-4" /> Ver sitio
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>

      <RegisterDomainDialog open={showRegister} onOpenChange={setShowRegister} />
    </div>
  );
}

function RegisterDomainDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { toast } = useToast();
  const [domainName, setDomainName] = useState('');
  const [tld, setTld] = useState('com');

  const handleRegister = () => {
    toast({
      title: 'Búsqueda de dominio',
      description: `Buscando disponibilidad de ${domainName}.${tld}...`,
    });
    onOpenChange(false);
    setDomainName('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registrar dominio</DialogTitle>
          <DialogDescription>
            Busca y registra un nuevo dominio para tu cuenta.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Nombre del dominio</Label>
            <div className="flex gap-2">
              <Input
                placeholder="midominio"
                value={domainName}
                onChange={(e) => setDomainName(e.target.value)}
              />
              <Select value={tld} onValueChange={setTld}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="com">.com</SelectItem>
                  <SelectItem value="net">.net</SelectItem>
                  <SelectItem value="org">.org</SelectItem>
                  <SelectItem value="io">.io</SelectItem>
                  <SelectItem value="es">.es</SelectItem>
                  <SelectItem value="ec">.ec</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {domainName && (
            <div className="flex items-center justify-between rounded-lg border p-3">
              <span className="text-sm">{domainName}.{tld}</span>
              <Badge className="bg-success/10 text-success border-success/20">Disponible · $12/año</Badge>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={handleRegister} disabled={!domainName}>
            Registrar dominio
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
