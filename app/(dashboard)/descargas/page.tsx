'use client';

import { useState } from 'react';
import { Download, Search, FileText, File, Archive, BookOpen, Package, Wrench } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/shared';
import { downloads } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const categories = ['Todos', 'Aplicaciones', 'Plugins', 'Documentación', 'Instaladores', 'Recursos', 'Licencias'];
const catIcons: Record<string, typeof Download> = {
  Aplicaciones: Package, Plugins: Wrench, Documentación: BookOpen, Instaladores: Archive, Recursos: File, Licencias: FileText,
};

export default function DescargasPage() {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todos');

  const filtered = downloads.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'Todos' || d.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      <PageHeader title="Descargas" description="Centro de descargas de GoodMax Cloud." />

      {/* Search + Categories */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar descarga..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-thin pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                'rounded-lg border px-3 py-1.5 text-xs font-medium transition-all whitespace-nowrap',
                category === cat ? 'border-primary bg-primary text-primary-foreground' : 'hover:bg-secondary'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Downloads grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => {
          const Icon = catIcons[item.category] || Download;
          return (
            <Card key={item.id} className="p-5 transition-all hover:shadow-md">
              <div className="flex items-start justify-between mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                  <Icon className="h-5 w-5" />
                </div>
                <Badge variant="secondary" className="text-xs">{item.category}</Badge>
              </div>
              <h3 className="text-sm font-semibold mb-1">{item.name}</h3>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                <span>v{item.version}</span><span>·</span><span>{item.size}</span><span>·</span><span>{item.date}</span>
              </div>
              <Button variant="outline" size="sm" className="w-full" onClick={() => toast({ title: 'Descargando', description: item.name })}>
                <Download className="h-4 w-4 mr-2" /> Descargar
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
