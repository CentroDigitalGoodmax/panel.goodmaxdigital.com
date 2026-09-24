'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, Paperclip, MoreHorizontal, Clock, Server } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { StatusBadge, PriorityBadge } from '@/components/status-badge';
import { tickets } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function TicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const ticket = tickets.find((t) => t.id === id) || tickets[0];
  const { toast } = useToast();
  const [reply, setReply] = useState('');

  const handleReply = () => {
    if (!reply.trim()) return;
    toast({ title: 'Respuesta enviada', description: `Respuesta a ${ticket.number}` });
    setReply('');
  };

  return (
    <div className="space-y-6">
      <Link href="/tickets" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Volver a tickets
      </Link>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold tracking-tight">{ticket.subject}</h1>
            <span className="font-mono text-sm text-muted-foreground">{ticket.number}</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <StatusBadge status={ticket.status} />
            <PriorityBadge priority={ticket.priority} />
            <Badge variant="secondary" className="text-xs">{ticket.category}</Badge>
            <span className="text-xs text-muted-foreground">Servicio: {ticket.service}</span>
          </div>
        </div>
      </div>

      {/* Conversation */}
      <Card className="p-6">
        <div className="space-y-6">
          {ticket.messages.map((msg) => (
            <div key={msg.id} className={cn('flex gap-3', msg.isStaff && 'flex-row-reverse')}>
              <Avatar className="h-9 w-9 shrink-0">
                <AvatarFallback className={cn('text-xs font-semibold', msg.isStaff ? 'bg-primary text-primary-foreground' : 'bg-secondary')}>
                  {msg.isStaff ? 'GM' : msg.author.split(' ').map((n) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className={cn('flex-1 max-w-[80%]')}>
                <div className={cn('rounded-lg p-4', msg.isStaff ? 'bg-secondary/50' : 'bg-primary/5')}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">{msg.author}</span>
                    {msg.isStaff && <Badge variant="secondary" className="text-[10px]">Soporte GoodMax</Badge>}
                    <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                  </div>
                  <p className="text-sm">{msg.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Reply */}
      <Card className="p-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Paperclip className="h-4 w-4" /> Adjuntar archivos (opcional)
          </div>
          <Textarea
            placeholder="Escribe tu respuesta..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            rows={3}
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" /> Creado el {ticket.createdAt}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => toast({ title: 'Ticket cerrado', description: ticket.number })}>Cerrar ticket</Button>
              <Button size="sm" onClick={handleReply} disabled={!reply.trim()}>
                <Send className="h-4 w-4 mr-2" /> Enviar respuesta
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
