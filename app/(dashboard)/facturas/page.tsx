'use client';

import { useState } from 'react';
import { FileText, Plus, Download, CreditCard, Search, Eye } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/status-badge';
import { PageHeader } from '@/components/shared';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import { invoices, currentUser } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

export default function FacturasPage() {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [viewInv, setViewInv] = useState<string | null>(null);

  const filtered = invoices.filter((i) => i.number.toLowerCase().includes(search.toLowerCase()) || i.concept.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <PageHeader title="Facturas" description="Historial de facturas y pagos." />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Facturas totales', value: invoices.length },
          { label: 'Pagadas', value: invoices.filter((i) => i.status === 'paid').length },
          { label: 'Pendientes', value: invoices.filter((i) => i.status === 'pending').length },
          { label: 'Vencidas', value: invoices.filter((i) => i.status === 'overdue').length },
        ].map((s) => (
          <Card key={s.label} className="p-4"><div className="text-2xl font-bold">{s.value}</div><div className="text-xs text-muted-foreground mt-1">{s.label}</div></Card>
        ))}
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="flex items-center gap-3 border-b p-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar factura..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Número</TableHead><TableHead className="hidden md:table-cell">Fecha</TableHead>
              <TableHead>Concepto</TableHead><TableHead className="hidden md:table-cell">Monto</TableHead>
              <TableHead>Estado</TableHead><TableHead className="hidden lg:table-cell">Vencimiento</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((inv) => (
              <TableRow key={inv.id} className="hover:bg-secondary/30">
                <TableCell className="font-mono text-sm">{inv.number}</TableCell>
                <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{inv.date}</TableCell>
                <TableCell className="text-sm">{inv.concept}</TableCell>
                <TableCell className="hidden md:table-cell text-sm font-medium">${inv.amount}</TableCell>
                <TableCell><StatusBadge status={inv.status} /></TableCell>
                <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{inv.dueDate}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="sm" className="h-7" onClick={() => setViewInv(inv.id)}><Eye className="h-3.5 w-3.5 mr-1" /> Ver</Button>
                    {inv.status === 'pending' || inv.status === 'overdue' ? (
                      <Button variant="outline" size="sm" className="h-7" onClick={() => toast({ title: 'Procesar pago', description: inv.number })}><CreditCard className="h-3.5 w-3.5 mr-1" /> Pagar</Button>
                    ) : (
                      <Button variant="ghost" size="sm" className="h-7" onClick={() => toast({ title: 'Descargando PDF', description: inv.number })}><Download className="h-3.5 w-3.5 mr-1" /> PDF</Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Invoice detail */}
      <Dialog open={!!viewInv} onOpenChange={(v) => !v && setViewInv(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>Factura</DialogTitle></DialogHeader>
          {(() => {
            const inv = invoices.find((i) => i.id === viewInv);
            if (!inv) return null;
            return (
              <div className="space-y-4 py-4">
                {/* Header */}
                <div className="flex items-start justify-between border-b pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary"><span className="text-primary-foreground font-bold text-sm">G</span></div><span className="text-lg font-bold">GoodMax</span></div>
                    <p className="text-xs text-muted-foreground">GoodMax Cloud S.A.</p>
                    <p className="text-xs text-muted-foreground">Av. Amazonas 455, Quito, Ecuador</p>
                    <p className="text-xs text-muted-foreground">RUC: 1791234567001</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">{inv.number}</div>
                    <div className="text-xs text-muted-foreground">Fecha: {inv.date}</div>
                    <div className="text-xs text-muted-foreground">Vencimiento: {inv.dueDate}</div>
                    <div className="mt-2"><StatusBadge status={inv.status} /></div>
                  </div>
                </div>
                {/* Client */}
                <div className="rounded-lg border p-4">
                  <div className="text-xs text-muted-foreground mb-1">Facturado a</div>
                  <div className="text-sm font-medium">{currentUser.company}</div>
                  <div className="text-xs text-muted-foreground">{currentUser.name}</div>
                  <div className="text-xs text-muted-foreground">{currentUser.email}</div>
                </div>
                {/* Items */}
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader><TableRow><TableHead>Descripción</TableHead><TableHead className="text-right">Cantidad</TableHead><TableHead className="text-right">Precio</TableHead><TableHead className="text-right">Total</TableHead></TableRow></TableHeader>
                    <TableBody>
                      {inv.items.map((item, i) => (
                        <TableRow key={i}><TableCell className="text-sm">{item.description}</TableCell><TableCell className="text-right text-sm">{item.quantity}</TableCell><TableCell className="text-right text-sm">${item.unitPrice}</TableCell><TableCell className="text-right text-sm font-medium">${item.total}</TableCell></TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                {/* Totals */}
                <div className="flex justify-end">
                  <div className="w-64 space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${inv.amount - (inv.amount * 0.15)}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">IVA (15%)</span><span>${(inv.amount * 0.15).toFixed(2)}</span></div>
                    <div className="flex justify-between font-bold text-base border-t pt-2"><span>Total</span><span>${inv.amount}</span></div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => toast({ title: 'Descargando PDF', description: inv.number })}><Download className="h-4 w-4 mr-2" /> Descargar PDF</Button>
                  {inv.status === 'pending' || inv.status === 'overdue' ? <Button size="sm" onClick={() => toast({ title: 'Procesar pago', description: inv.number })}><CreditCard className="h-4 w-4 mr-2" /> Pagar ahora</Button> : null}
                </div>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}
