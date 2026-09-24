'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowUpRight, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  count: number;
  countLabel: string;
  icon: typeof ArrowUpRight;
  href: string;
  actionLabel: string;
  statusLabel: string;
  statusType?: 'success' | 'warning' | 'info';
}

export function ServiceCard({
  title, count, countLabel, icon: Icon, href, actionLabel, statusLabel, statusType = 'success',
}: ServiceCardProps) {
  const statusColors = {
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    info: 'bg-info/10 text-info',
  };
  return (
    <Card className="group p-5 transition-all hover:shadow-md hover:border-foreground/20">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
            <Icon className="h-5 w-5 text-foreground" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-2xl font-bold">{count}</span>
              <span className="text-xs text-muted-foreground">{countLabel}</span>
            </div>
          </div>
        </div>
        <span className={cn('rounded-full px-2 py-0.5 text-[10px] font-medium', statusColors[statusType])}>
          {statusLabel}
        </span>
      </div>
      <Link
        href={href}
        className="flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground group-hover:text-foreground"
      >
        {actionLabel}
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </Card>
  );
}

interface UsageCardProps {
  label: string;
  used: number;
  total: number;
  unit: string;
  icon: typeof ArrowUpRight;
  color?: string;
}

export function UsageCard({ label, used, total, unit, icon: Icon, color = 'bg-primary' }: UsageCardProps) {
  const percentage = Math.min((used / total) * 100, 100);
  const isHigh = percentage > 80;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">{label}</span>
        </div>
        <span className={cn('text-xs font-mono', isHigh ? 'text-warning' : 'text-muted-foreground')}>
          {used} / {total} {unit}
        </span>
      </div>
      <Progress value={percentage} className={cn('h-2', isHigh && '[&>*]:bg-warning')} />
    </div>
  );
}

interface EmptyStateProps {
  icon: typeof ArrowUpRight;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary mb-4">
        <Icon className="h-7 w-7 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground max-w-sm">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      </div>
      {children && <div className="flex items-center gap-2 flex-wrap">{children}</div>}
    </div>
  );
}
