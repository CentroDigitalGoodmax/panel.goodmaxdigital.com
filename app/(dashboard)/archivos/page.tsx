'use client';

import { useState } from 'react';
import {
  FolderOpen, File, Upload, FolderPlus, MoreHorizontal, ChevronRight,
  Download, Pencil, Trash2, Move, Home,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { PageHeader } from '@/components/shared';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { fileManager } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function ArchivosPage() {
  const { toast } = useToast();
  const [path, setPath] = useState(fileManager.path);
  const [showNewFolder, setShowNewFolder] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Administrador de archivos" description="Gestiona los archivos de tus sitios web.">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => toast({ title: 'Subir archivo', description: 'Selecciona un archivo para subir' })}><Upload className="h-4 w-4 mr-2" /> Subir</Button>
          <Button size="sm" onClick={() => setShowNewFolder(true)}><FolderPlus className="h-4 w-4 mr-2" /> Nueva carpeta</Button>
        </div>
      </PageHeader>

      <Card className="p-0 overflow-hidden">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1 border-b p-3 text-sm overflow-x-auto scrollbar-thin">
          <Home className="h-4 w-4 text-muted-foreground shrink-0" />
          {path.map((segment, i) => (
            <div key={i} className="flex items-center gap-1 shrink-0">
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
              <button className="text-muted-foreground hover:text-foreground transition-colors">{segment}</button>
            </div>
          ))}
          {selected.length > 0 && (
            <div className="ml-auto flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">{selected.length} seleccionados</Badge>
              <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => toast({ title: 'Descargar', description: `${selected.length} archivos` })}><Download className="h-3.5 w-3.5 mr-1" /> Descargar</Button>
              <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive" onClick={() => { toast({ title: 'Eliminar', description: `${selected.length} archivos eliminados`, variant: 'destructive' }); setSelected([]); }}><Trash2 className="h-3.5 w-3.5 mr-1" /> Eliminar</Button>
            </div>
          )}
        </div>

        {/* File table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8"><input type="checkbox" className="rounded" onChange={(e) => setSelected(e.target.checked ? fileManager.items.map((i) => i.id) : [])} /></TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead className="hidden md:table-cell">Tamaño</TableHead>
              <TableHead className="hidden md:table-cell">Modificado</TableHead>
              <TableHead className="hidden lg:table-cell">Permisos</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fileManager.items.map((item) => (
              <TableRow
                key={item.id}
                className={cn('hover:bg-secondary/30 cursor-pointer', selected.includes(item.id) && 'bg-secondary/40')}
                onClick={() => toggleSelect(item.id)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}><input type="checkbox" className="rounded" checked={selected.includes(item.id)} onChange={() => toggleSelect(item.id)} /></TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {item.type === 'folder' ? <FolderOpen className="h-4 w-4 text-info" /> : <File className="h-4 w-4 text-muted-foreground" />}
                    <span className="text-sm font-medium">{item.name}</span>
                    {item.type === 'folder' && <Badge variant="outline" className="text-[10px]">Carpeta</Badge>}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{item.size}</TableCell>
                <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{item.modified}</TableCell>
                <TableCell className="hidden lg:table-cell"><Badge variant="secondary" className="font-mono text-xs">{item.permissions}</Badge></TableCell>
                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-3.5 w-3.5" /></Button></DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="cursor-pointer" onClick={() => toast({ title: 'Descargar', description: item.name })}><Download className="mr-2 h-4 w-4" /> Descargar</DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer" onClick={() => toast({ title: 'Renombrar', description: item.name })}><Pencil className="mr-2 h-4 w-4" /> Renombrar</DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer" onClick={() => toast({ title: 'Mover', description: item.name })}><Move className="mr-2 h-4 w-4" /> Mover</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer text-destructive" onClick={() => toast({ title: 'Eliminar', description: item.name, variant: 'destructive' })}><Trash2 className="mr-2 h-4 w-4" /> Eliminar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* New folder dialog */}
      {showNewFolder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowNewFolder(false)}>
          <Card className="p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-base font-semibold mb-4">Crear nueva carpeta</h2>
            <Input placeholder="nombre-carpeta" autoFocus />
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setShowNewFolder(false)}>Cancelar</Button>
              <Button onClick={() => { toast({ title: 'Carpeta creada', description: 'La carpeta se ha creado correctamente' }); setShowNewFolder(false); }}>Crear</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
