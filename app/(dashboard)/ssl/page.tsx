'use client';

import { Shield, Plus, RefreshCw, MoreHorizontal, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/status-badge';
import { PageHeader } from '@/components/shared';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { sslCertificates } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

export default function SSLPage() {
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <PageHeader title="Certificados SSL" description="Gestiona tus certificados SSL.">
        <Button onClick={() => toast({ title: 'Instalar SSL', description: 'Selecciona un dominio para instalar SSL' })}><Plus className="h-4 w-4 mr-2" /> Instalar SSL</Button>
      </PageHeader>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Certificados totales', value: sslCertificates.length },
          { label: 'Activos', value: sslCertificates.filter((s) => s.status === 'active').length },
          { label: 'Próximos a vencer', value: sslCertificates.filter((s) => s.status === 'expiring').length },
          { label: 'Expirados', value: sslCertificates.filter((s) => s.status === 'expired').length },
        ].map((s) => (
          <Card key={s.label} className="p-4"><div className="text-2xl font-bold">{s.value}</div><div className="text-xs text-muted-foreground mt-1">{s.label}</div></Card>
        ))}
      </div>

      <Card className="p-0 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Dominio</TableHead><TableHead>Estado</TableHead>
              <TableHead className="hidden md:table-cell">Emisor</TableHead>
              <TableHead className="hidden md:table-cell">Vencimiento</TableHead>
              <TableHead className="hidden lg:table-cell">Auto-renovación</TableHead>
              <TableHead className="hidden lg:table-cell">Tipo</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sslCertificates.map((cert) => (
              <TableRow key={cert.id} className="hover:bg-secondary/30">
                <TableCell><div className="flex items-center gap-2"><Shield className="h-4 w-4 text-muted-foreground" /><span className="text-sm font-medium">{cert.domain}</span></div></TableCell>
                <TableCell><StatusBadge status={cert.status} /></TableCell>
                <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{cert.issuer}</TableCell>
                <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{cert.expiryDate}</TableCell>
                <TableCell className="hidden lg:table-cell">{cert.autoRenew ? <Badge className="bg-success/10 text-success">Activada</Badge> : <Badge variant="secondary">Desactivada</Badge>}</TableCell>
                <TableCell className="hidden lg:table-cell"><Badge variant="outline">{cert.type}</Badge></TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-3.5 w-3.5" /></Button></DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="cursor-pointer" onClick={() => toast({ title: 'Renovar SSL', description: cert.domain })}><RefreshCw className="mr-2 h-4 w-4" /> Renovar</DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer" onClick={() => toast({ title: 'Ver certificado', description: cert.domain })}><ExternalLink className="mr-2 h-4 w-4" /> Ver certificado</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
