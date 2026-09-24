'use client';

import { Database, Plus, MoreHorizontal, Search, Key, Trash2, Eye } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
import { databases, hostingServices } from '@/lib/mock-data';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function BasesDeDatosPage() {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [showCreds, setShowCreds] = useState<string | null>(null);

  const filtered = databases.filter((d) => d.name.includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <PageHeader title="Bases de datos" description="Administra tus bases de datos MySQL, MariaDB y PostgreSQL.">
        <Button onClick={() => setShowCreate(true)}><Plus className="h-4 w-4 mr-2" /> Crear base de datos</Button>
      </PageHeader>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Bases de datos', value: databases.length },
          { label: 'MySQL', value: databases.filter((d) => d.engine === 'MySQL').length },
          { label: 'MariaDB', value: databases.filter((d) => d.engine === 'MariaDB').length },
          { label: 'PostgreSQL', value: databases.filter((d) => d.engine === 'PostgreSQL').length },
        ].map((s) => (
          <Card key={s.label} className="p-4"><div className="text-2xl font-bold">{s.value}</div><div className="text-xs text-muted-foreground mt-1">{s.label}</div></Card>
        ))}
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="flex items-center gap-3 border-b p-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar base de datos..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
        </div>
        {filtered.length === 0 ? (
          <EmptyState icon={Database} title="Sin resultados" description="No se encontraron bases de datos." />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Base de datos</TableHead><TableHead>Motor</TableHead>
                <TableHead className="hidden md:table-cell">Tamaño</TableHead>
                <TableHead className="hidden md:table-cell">Usuario</TableHead>
                <TableHead className="hidden lg:table-cell">Hosting</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((db) => (
                <TableRow key={db.id} className="hover:bg-secondary/30">
                  <TableCell><div className="flex items-center gap-2"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary"><Database className="h-4 w-4 text-muted-foreground" /></div><span className="text-sm font-medium font-mono">{db.name}</span></div></TableCell>
                  <TableCell><Badge variant="secondary">{db.engine}</Badge></TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{db.size}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm font-mono text-muted-foreground">{db.user}</TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{db.hostingId}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-3.5 w-3.5" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="cursor-pointer" onClick={() => toast({ title: 'phpMyAdmin', description: `Abriendo ${db.name}` })}>Administrar</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" onClick={() => setShowCreds(db.id)}><Key className="mr-2 h-4 w-4" /> Credenciales</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer text-destructive" onClick={() => toast({ title: 'Eliminar base de datos', description: db.name, variant: 'destructive' })}><Trash2 className="mr-2 h-4 w-4" /> Eliminar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>

      {/* Create DB */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent>
          <DialogHeader><DialogTitle>Crear base de datos</DialogTitle><DialogDescription>Crea una nueva base de datos.</DialogDescription></DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2"><Label>Nombre</Label><Input placeholder="mi_base_datos" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Motor</Label><Select defaultValue="MySQL"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="MySQL">MySQL</SelectItem><SelectItem value="MariaDB">MariaDB</SelectItem><SelectItem value="PostgreSQL">PostgreSQL</SelectItem></SelectContent></Select></div>
              <div className="space-y-2"><Label>Hosting</Label><Select defaultValue="GM-3"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{hostingServices.map((h) => <SelectItem key={h.id} value={h.id}>{h.id}</SelectItem>)}</SelectContent></Select></div>
            </div>
            <div className="space-y-2"><Label>Usuario</Label><Input placeholder="db_user" /></div>
            <div className="space-y-2"><Label>Contraseña</Label><Input type="password" placeholder="••••••••" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreate(false)}>Cancelar</Button>
            <Button onClick={() => { toast({ title: 'Base de datos creada', description: 'La base de datos se ha creado correctamente' }); setShowCreate(false); }}>Crear base de datos</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Credentials */}
      <Dialog open={!!showCreds} onOpenChange={(v) => !v && setShowCreds(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Credenciales de base de datos</DialogTitle><DialogDescription>Información de conexión</DialogDescription></DialogHeader>
          <div className="space-y-3 py-4">
            {(() => {
              const db = databases.find((d) => d.id === showCreds);
              if (!db) return null;
              return (
                <div className="rounded-lg border p-4 space-y-2 font-mono text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Host</span><span>localhost</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Base de datos</span><span>{db.name}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Usuario</span><span>{db.user}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Contraseña</span><span className="text-muted-foreground">••••••••</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Motor</span><span>{db.engine}</span></div>
                </div>
              );
            })()}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreds(null)}>Cerrar</Button>
            <Button onClick={() => { navigator.clipboard?.writeText(''); toast({ title: 'Credenciales copiadas' }); }}>Copiar credenciales</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
