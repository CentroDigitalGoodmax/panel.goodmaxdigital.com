'use client';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertTriangle, XCircle, Clock, Pause, X } from 'lucide-react';
import type { ServiceStatus, SSLStatus, AppStatus, TicketStatus, InvoiceStatus } from '@/lib/types';

const statusConfig: Record<string, { label: string; className: string; icon: typeof CheckCircle2 }> = {
  active: { label: 'Activo', className: 'bg-success/10 text-success border-success/20', icon: CheckCircle2 },
  pending: { label: 'Pendiente', className: 'bg-warning/10 text-warning border-warning/20', icon: Clock },
  suspended: { label: 'Suspendido', className: 'bg-muted text-muted-foreground border-border', icon: Pause },
  expired: { label: 'Expirado', className: 'bg-destructive/10 text-destructive border-destructive/20', icon: XCircle },
  cancelled: { label: 'Cancelado', className: 'bg-muted text-muted-foreground border-border', icon: X },
  running: { label: 'Running', className: 'bg-success/10 text-success border-success/20', icon: CheckCircle2 },
  stopped: { label: 'Stopped', className: 'bg-muted text-muted-foreground border-border', icon: Pause },
  deploying: { label: 'Deploying', className: 'bg-info/10 text-info border-info/20', icon: Clock },
  error: { label: 'Error', className: 'bg-destructive/10 text-destructive border-destructive/20', icon: XCircle },
  expiring: { label: 'Próximo a vencer', className: 'bg-warning/10 text-warning border-warning/20', icon: AlertTriangle },
  open: { label: 'Abierto', className: 'bg-info/10 text-info border-info/20', icon: Clock },
  resolved: { label: 'Resuelto', className: 'bg-success/10 text-success border-success/20', icon: CheckCircle2 },
  closed: { label: 'Cerrado', className: 'bg-muted text-muted-foreground border-border', icon: X },
  paid: { label: 'Pagada', className: 'bg-success/10 text-success border-success/20', icon: CheckCircle2 },
  overdue: { label: 'Vencida', className: 'bg-destructive/10 text-destructive border-destructive/20', icon: XCircle },
  online: { label: 'Online', className: 'bg-success/10 text-success border-success/20', icon: CheckCircle2 },
  degraded: { label: 'Degradado', className: 'bg-warning/10 text-warning border-warning/20', icon: AlertTriangle },
  offline: { label: 'Offline', className: 'bg-destructive/10 text-destructive border-destructive/20', icon: XCircle },
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  const config = statusConfig[status] || statusConfig.active;
  const Icon = config.icon;
  return (
    <Badge variant="outline" className={cn('gap-1.5 font-medium', config.className, className)}>
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
}

export function PriorityBadge({ priority }: { priority: string }) {
  const config: Record<string, string> = {
    low: 'bg-muted text-muted-foreground border-border',
    medium: 'bg-info/10 text-info border-info/20',
    high: 'bg-warning/10 text-warning border-warning/20',
    urgent: 'bg-destructive/10 text-destructive border-destructive/20',
  };
  const labels: Record<string, string> = {
    low: 'Baja',
    medium: 'Media',
    high: 'Alta',
    urgent: 'Urgente',
  };
  return (
    <Badge variant="outline" className={cn('font-medium', config[priority] || config.low)}>
      {labels[priority] || priority}
    </Badge>
  );
}
