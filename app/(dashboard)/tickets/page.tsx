'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MessageSquare, Plus, Search, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { StatusBadge, PriorityBadge } from '@/components/status-badge';
import { PageHeader, EmptyState } from '@/components/shared';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { tickets } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

const tabs = ['Todos', 'Abiertos', 'Pendientes', 'Resueltos', 'Cerrados'];
const statusMap: Record<string, string> = { Abiertos: 'open', Pendientes: 'pending', Resueltos: 'resolved', Cerrados: 'closed' };

export default function TicketsPage() {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('Todos');
  const [showCreate, setShowCreate] = useState(false);

  const filtered = tickets.filter((t) => {
    const matchSearch = t.subject.toLowerCase().includes(search.toLowerCase()) || t.number.toLowerCase().includes(search.toLowerCase());
    const matchTab = activeTab === 'Todos' || t.status === statusMap[activeTab];
    return matchSearch && matchTab;
  });

  return (
    <div className="space-y-6">
      <PageHeader title="Tickets" description="Sistema de soporte técnico.">
        <Button onClick={() => setShowCreate(true)}><Plus className="h-4 w-4 mr-2" /> Nuevo ticket</Button>
      </PageHeader>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-thin pb-1">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab ? 'border-primary bg-primary text-primary-foreground' : 'hover:bg-secondary'}`}>
            {tab}
            <span className="ml-1.5 text-xs opacity-70">
              {tab === 'Todos' ? tickets.length : tickets.filter((t) => t.status === statusMap[tab]).length}
            </span>
          </button>
        ))}
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="flex items-center gap-3 border-b p-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar ticket..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
        </div>
        {filtered.length === 0 ? (
          <EmptyState icon={MessageSquare} title="Sin tickets" description="No hay tickets en esta categoría." action={<Button onClick={() => setShowCreate(true)}><Plus className="h-4 w-4 mr-2" /> Crear ticket</Button>} />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket</TableHead><TableHead>Asunto</TableHead>
                <TableHead className="hidden md:table-cell">Servicio</TableHead>
                <TableHead className="hidden md:table-cell">Prioridad</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="hidden lg:table-cell">Última actualización</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((t) => (
                <TableRow key={t.id} className="hover:bg-secondary/30">
                  <TableCell className="font-mono text-sm">{t.number}</TableCell>
                  <TableCell><Link href={`/tickets/${t.id}`} className="text-sm font-medium hover:text-primary">{t.subject}</Link></TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{t.service}</TableCell>
                  <TableCell className="hidden md:table-cell"><PriorityBadge priority={t.priority} /></TableCell>
                  <TableCell><StatusBadge status={t.status} /></TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{t.lastUpdate}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild><Link href={`/tickets/${t.id}`}>Ver <ArrowRight className="h-3.5 w-3.5 ml-1" /></Link></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>

      {/* Create ticket */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Crear ticket</DialogTitle><DialogDescription>Abre un nuevo ticket de soporte.</DialogDescription></DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2"><Label>Asunto</Label><Input placeholder="Describe el problema" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Servicio relacionado</Label><Select defaultValue="GM-3"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="GM-3">GM-3</SelectItem><SelectItem value="GM-2">GM-2</SelectItem><SelectItem value="GM-1">GM-1</SelectItem><SelectItem value="none">Ninguno</SelectItem></SelectContent></Select></div>
              <div className="space-y-2"><Label>Categoría</Label><Select defaultValue="hosting"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="hosting">Hosting</SelectItem><SelectItem value="domain">Dominios</SelectItem><SelectItem value="email">Correos</SelectItem><SelectItem value="ssl">SSL</SelectItem><SelectItem value="billing">Facturación</SelectItem></SelectContent></Select></div>
            </div>
            <div className="space-y-2"><Label>Prioridad</Label><Select defaultValue="medium"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="low">Baja</SelectItem><SelectItem value="medium">Media</SelectItem><SelectItem value="high">Alta</SelectItem><SelectItem value="urgent">Urgente</SelectItem></SelectContent></Select></div>
            <div className="space-y-2"><Label>Descripción</Label><Textarea placeholder="Describe tu problema en detalle..." rows={4} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreate(false)}>Cancelar</Button>
            <Button onClick={() => { toast({ title: 'Ticket creado', description: 'Tu ticket ha sido creado correctamente' }); setShowCreate(false); }}>Crear ticket</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
