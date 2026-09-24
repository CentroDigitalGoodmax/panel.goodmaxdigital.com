'use client';

import { useState } from 'react';
import {
  Activity, Globe, Mail, Code2, CreditCard, MessageSquare,
  Key, Server, Database, Search, Filter,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PageHeader } from '@/components/shared';
import { activityLogs } from '@/lib/mock-data';

const activityIcons: Record<string, typeof Globe> = {
  domain: Globe, email: Mail, app: Code2, invoice: CreditCard, ticket: MessageSquare,
  security: Key, hosting: Server, database: Database,
};

const typeLabels: Record<string, string> = {
  domain: 'Dominios', email: 'Correos', app: 'Aplicaciones', invoice: 'Facturas',
  ticket: 'Tickets', security: 'Seguridad', hosting: 'Hosting', database: 'Bases de datos',
};

export default function ActividadPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const filtered = activityLogs.filter((log) => {
    const matchSearch = log.action.toLowerCase().includes(search.toLowerCase()) || log.resource.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'all' || log.type === typeFilter;
    return matchSearch && matchType;
  });

  // Group by date
  const grouped = filtered.reduce((acc, log) => {
    if (!acc[log.date]) acc[log.date] = [];
    acc[log.date].push(log);
    return acc;
  }, {} as Record<string, typeof activityLogs>);

  return (
    <div className="space-y-6">
      <PageHeader title="Actividad" description="Historial completo de acciones en tu cuenta." />

      {/* Filters */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar actividad..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full md:w-48"><Filter className="h-4 w-4 mr-2 text-muted-foreground" /><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las categorías</SelectItem>
            {Object.entries(typeLabels).map(([key, label]) => <SelectItem key={key} value={key}>{label}</SelectItem>)}
          </SelectContent>
        </Select>
        <Badge variant="secondary" className="text-xs">{filtered.length} eventos</Badge>
      </div>

      {/* Timeline */}
      <div className="space-y-6">
        {Object.entries(grouped).map(([date, logs]) => (
          <div key={date}>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs font-medium text-muted-foreground px-2">{date}</span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <Card className="p-0 overflow-hidden">
              {logs.map((log, i) => {
                const Icon = activityIcons[log.type] || Activity;
                return (
                  <div key={log.id} className={`flex items-center gap-3 p-4 hover:bg-secondary/30 transition-colors ${i !== logs.length - 1 ? 'border-b' : ''}`}>
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary"><Icon className="h-4 w-4 text-muted-foreground" /></div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">{log.action}</div>
                      <div className="text-xs text-muted-foreground">{log.resource} · IP: {log.ip}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs text-muted-foreground">{log.time}</div>
                      <Badge variant="outline" className="text-[10px] mt-0.5">{typeLabels[log.type] || log.type}</Badge>
                    </div>
                  </div>
                );
              })}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
