'use client';

import { useState } from 'react';
import { Network, Plus, Pencil, Trash2, Globe, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PageHeader } from '@/components/shared';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { domains, dnsRecords } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

export default function DNSPage() {
  const { toast } = useToast();
  const [selectedDomain, setSelectedDomain] = useState(domains[0].name);
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader title="DNS" description="Gestión global de registros DNS.">
        <Button onClick={() => setShowAdd(true)}><Plus className="h-4 w-4 mr-2" /> Agregar registro</Button>
      </PageHeader>

      {/* Domain selector */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-thin pb-1">
        {domains.map((dom) => (
          <button
            key={dom.id}
            onClick={() => setSelectedDomain(dom.name)}
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-all whitespace-nowrap ${selectedDomain === dom.name ? 'border-primary bg-primary text-primary-foreground' : 'hover:bg-secondary'}`}
          >
            <Globe className="h-4 w-4" />
            {dom.name}
          </button>
        ))}
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="border-b p-4">
          <h2 className="text-base font-semibold">Registros DNS — {selectedDomain}</h2>
          <p className="text-xs text-muted-foreground">{dnsRecords.length} registros</p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo</TableHead><TableHead>Nombre</TableHead><TableHead>Valor</TableHead>
              <TableHead className="hidden md:table-cell">Prioridad</TableHead>
              <TableHead className="hidden md:table-cell">TTL</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dnsRecords.map((record) => (
              <TableRow key={record.id} className="hover:bg-secondary/30">
                <TableCell><Badge variant="secondary" className="font-mono text-xs">{record.type}</Badge></TableCell>
                <TableCell className="text-sm font-mono">{record.name}</TableCell>
                <TableCell className="text-sm font-mono text-muted-foreground max-w-xs truncate">{record.value}</TableCell>
                <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{record.priority || '-'}</TableCell>
                <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{record.ttl}s</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toast({ title: 'Editar registro', description: `${record.type} ${record.name}` })}><Pencil className="h-3.5 w-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => toast({ title: 'Eliminar registro', description: `${record.type} ${record.name}`, variant: 'destructive' })}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent>
          <DialogHeader><DialogTitle>Agregar registro DNS</DialogTitle><DialogDescription>Crea un nuevo registro DNS para {selectedDomain}</DialogDescription></DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Tipo</Label><Select defaultValue="A"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS', 'SRV'].map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select></div>
              <div className="space-y-2"><Label>TTL</Label><Select defaultValue="3600"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="3600">1 hora</SelectItem><SelectItem value="7200">2 horas</SelectItem><SelectItem value="14400">4 horas</SelectItem><SelectItem value="86400">1 día</SelectItem></SelectContent></Select></div>
            </div>
            <div className="space-y-2"><Label>Nombre</Label><Input placeholder="@ o nombre" /></div>
            <div className="space-y-2"><Label>Valor</Label><Input placeholder="Valor del registro" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAdd(false)}>Cancelar</Button>
            <Button onClick={() => { toast({ title: 'Registro DNS agregado' }); setShowAdd(false); }}>Agregar registro</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
