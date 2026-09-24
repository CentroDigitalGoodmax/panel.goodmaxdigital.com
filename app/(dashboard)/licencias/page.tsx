'use client';

import { Key, Plus, Download, MoreHorizontal, Eye, RefreshCw } from 'lucide-react';
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
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog';
import { licenses } from '@/lib/mock-data';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function LicenciasPage() {
  const { toast } = useToast();
  const [viewLic, setViewLic] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader title="Licencias" description="Licencias de software y servicios digitales.">
        <Button onClick={() => toast({ title: 'Comprar licencia' })}><Plus className="h-4 w-4 mr-2" /> Comprar licencia</Button>
      </PageHeader>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Licencias totales', value: licenses.length },
          { label: 'Activas', value: licenses.filter((l) => l.status === 'active').length },
          { label: 'Expiradas', value: licenses.filter((l) => l.status === 'expired').length },
          { label: 'Servicios asociados', value: new Set(licenses.map((l) => l.associatedService)).size },
        ].map((s) => (
          <Card key={s.label} className="p-4"><div className="text-2xl font-bold">{s.value}</div><div className="text-xs text-muted-foreground mt-1">{s.label}</div></Card>
        ))}
      </div>

      <Card className="p-0 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Producto</TableHead><TableHead>Licencia</TableHead><TableHead>Estado</TableHead>
              <TableHead className="hidden md:table-cell">Activación</TableHead>
              <TableHead className="hidden md:table-cell">Vencimiento</TableHead>
              <TableHead className="hidden lg:table-cell">Servicio</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {licenses.map((lic) => (
              <TableRow key={lic.id} className="hover:bg-secondary/30">
                <TableCell><div className="flex items-center gap-2"><Key className="h-4 w-4 text-muted-foreground" /><span className="text-sm font-medium">{lic.product}</span></div></TableCell>
                <TableCell><span className="font-mono text-xs">{lic.licenseKey}</span></TableCell>
                <TableCell><StatusBadge status={lic.status} /></TableCell>
                <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{lic.activationDate}</TableCell>
                <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{lic.expiryDate}</TableCell>
                <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{lic.associatedService}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-3.5 w-3.5" /></Button></DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="cursor-pointer" onClick={() => setViewLic(lic.id)}><Eye className="mr-2 h-4 w-4" /> Ver licencia</DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer" onClick={() => toast({ title: 'Descargar', description: lic.product })}><Download className="mr-2 h-4 w-4" /> Descargar</DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer" onClick={() => toast({ title: 'Renovar', description: lic.product })}><RefreshCw className="mr-2 h-4 w-4" /> Renovar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={!!viewLic} onOpenChange={(v) => !v && setViewLic(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Detalle de licencia</DialogTitle></DialogHeader>
          {(() => {
            const lic = licenses.find((l) => l.id === viewLic);
            if (!lic) return null;
            return (
              <div className="space-y-3 py-4">
                <div className="rounded-lg border p-4 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Producto</span><span className="font-medium">{lic.product}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Licencia</span><span className="font-mono">{lic.licenseKey}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Estado</span><StatusBadge status={lic.status} /></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Activación</span><span>{lic.activationDate}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Vencimiento</span><span>{lic.expiryDate}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Servicio</span><span>{lic.associatedService}</span></div>
                </div>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}
