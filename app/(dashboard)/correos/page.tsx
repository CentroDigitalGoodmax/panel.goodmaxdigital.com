'use client';

import { useState } from 'react';
import { Mail, Plus, MoreHorizontal, Search, Globe, Users, HardDrive } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { StatusBadge } from '@/components/status-badge';
import { PageHeader, EmptyState } from '@/components/shared';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { emailDomains, emailAccounts } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

export default function CorreosPage() {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [showCreate, setShowCreate] = useState(false);

  const filtered = emailAccounts.filter((e) => e.address.includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <PageHeader title="Correos" description="Gestión de correo empresarial.">
        <Button onClick={() => setShowCreate(true)}><Plus className="h-4 w-4 mr-2" /> Crear cuenta</Button>
      </PageHeader>

      {/* Domain cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {emailDomains.map((dom) => (
          <Card key={dom.id} className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary"><Globe className="h-4 w-4" /></div>
              <span className="text-sm font-medium">{dom.domain}</span>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs mb-1"><span className="text-muted-foreground flex items-center gap-1"><Users className="h-3 w-3" /> Cuentas</span><span className="font-mono">{dom.accounts}/{dom.accountsLimit}</span></div>
                <Progress value={(dom.accounts / dom.accountsLimit) * 100} className="h-1.5" />
              </div>
              <div>
                <div className="flex items-center justify-between text-xs mb-1"><span className="text-muted-foreground flex items-center gap-1"><HardDrive className="h-3 w-3" /> Almacenamiento</span><span className="font-mono">{dom.storageUsed}/{dom.storageLimit} GB</span></div>
                <Progress value={(dom.storageUsed / dom.storageLimit) * 100} className="h-1.5" />
              </div>
              <div className="flex items-center justify-between text-xs"><span className="text-muted-foreground">Aliases</span><span className="font-mono">{dom.aliases}</span></div>
            </div>
          </Card>
        ))}
      </div>

      {/* Accounts table */}
      <Card className="p-0 overflow-hidden">
        <div className="flex items-center gap-3 border-b p-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar correo..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Badge variant="secondary" className="text-xs">{filtered.length} cuentas</Badge>
        </div>
        {filtered.length === 0 ? (
          <EmptyState icon={Mail} title="Sin resultados" description="No se encontraron cuentas de correo." />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Correo</TableHead><TableHead>Estado</TableHead>
                <TableHead className="hidden md:table-cell">Almacenamiento</TableHead>
                <TableHead className="hidden lg:table-cell">Último acceso</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((acc) => (
                <TableRow key={acc.id} className="hover:bg-secondary/30">
                  <TableCell><div className="flex items-center gap-2"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary"><Mail className="h-4 w-4 text-muted-foreground" /></div><span className="text-sm font-medium">{acc.address}</span></div></TableCell>
                  <TableCell><StatusBadge status={acc.status} /></TableCell>
                  <TableCell className="hidden md:table-cell"><div className="flex items-center gap-2"><Progress value={(acc.storageUsed / acc.storageQuota) * 100} className="h-1.5 w-20" /><span className="text-xs text-muted-foreground">{acc.storageUsed}/{acc.storageQuota} GB</span></div></TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{acc.lastAccess}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-3.5 w-3.5" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="cursor-pointer" onClick={() => toast({ title: 'Cambiar contraseña', description: acc.address })}>Cambiar contraseña</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" onClick={() => toast({ title: 'Cambiar cuota', description: acc.address })}>Cambiar cuota</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" onClick={() => toast({ title: 'Suspender cuenta', description: acc.address, variant: 'destructive' })}>Suspender</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer text-destructive" onClick={() => toast({ title: 'Eliminar cuenta', description: acc.address, variant: 'destructive' })}>Eliminar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>

      <CreateEmailDialog open={showCreate} onOpenChange={setShowCreate} />
    </div>
  );
}

function CreateEmailDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { toast } = useToast();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear cuenta de correo</DialogTitle>
          <DialogDescription>Crea una nueva cuenta de correo empresarial.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Nombre</Label><Input placeholder="Juan" /></div>
            <div className="space-y-2"><Label>Apellido</Label><Input placeholder="Pérez" /></div>
          </div>
          <div className="space-y-2">
            <Label>Correo</Label>
            <div className="flex gap-2">
              <Input placeholder="juan.perez" />
              <Select defaultValue="empresa.com">
                <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {emailDomains.map((d) => <SelectItem key={d.id} value={d.domain}>@{d.domain}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2"><Label>Contraseña</Label><Input type="password" placeholder="••••••••" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Cuota (GB)</Label><Input type="number" defaultValue={5} /></div>
            <div className="space-y-2"><Label>Estado</Label><Select defaultValue="active"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="active">Activo</SelectItem><SelectItem value="suspended">Suspendido</SelectItem></SelectContent></Select></div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={() => { toast({ title: 'Cuenta creada', description: 'La cuenta de correo se ha creado correctamente' }); onOpenChange(false); }}>Crear cuenta</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
