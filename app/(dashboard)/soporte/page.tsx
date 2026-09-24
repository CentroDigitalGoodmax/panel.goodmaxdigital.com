'use client';

import { useState } from 'react';
import {
  HelpCircle, Search, MessageSquare, Activity, ChevronDown,
  Globe, Server, Mail, Code2, Database, Shield,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';
import { PageHeader } from '@/components/shared';
import { faqItems, infraServices } from '@/lib/mock-data';
import Link from 'next/link';

export default function SoportePage() {
  const [search, setSearch] = useState('');

  const filteredFaqs = faqItems.filter((f) =>
    f.question.toLowerCase().includes(search.toLowerCase()) || f.answer.toLowerCase().includes(search.toLowerCase())
  );

  const helpCategories = [
    { icon: Globe, label: 'Dominios', count: 12 },
    { icon: Server, label: 'Hosting', count: 24 },
    { icon: Mail, label: 'Correos', count: 18 },
    { icon: Code2, label: 'Aplicaciones', count: 15 },
    { icon: Database, label: 'Bases de datos', count: 9 },
    { icon: Shield, label: 'SSL', count: 7 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Soporte" description="Centro de ayuda y documentación GoodMax Cloud." />

      {/* Hero search */}
      <Card className="p-8 text-center">
        <div className="flex justify-center mb-4"><div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary"><HelpCircle className="h-7 w-7" /></div></div>
        <h2 className="text-xl font-bold mb-2">¿Cómo podemos ayudarte?</h2>
        <p className="text-sm text-muted-foreground mb-4">Busca en nuestra documentación y preguntas frecuentes</p>
        <div className="relative max-w-lg mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar documentación..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-12 text-base" />
        </div>
      </Card>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {helpCategories.map((cat) => (
          <Card key={cat.label} className="p-4 text-center transition-all hover:shadow-md cursor-pointer">
            <div className="flex justify-center mb-2"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary"><cat.icon className="h-5 w-5" /></div></div>
            <div className="text-sm font-medium">{cat.label}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{cat.count} artículos</div>
          </Card>
        ))}
      </div>

      {/* FAQ + Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* FAQ */}
        <Card className="lg:col-span-2 p-6">
          <h2 className="text-base font-semibold mb-4">Preguntas frecuentes</h2>
          <Accordion type="single" collapsible>
            {filteredFaqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-sm text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>

        {/* Status + Tickets */}
        <div className="space-y-4">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold">Estado de servicios</h2>
              <span className="flex h-2.5 w-2.5 rounded-full bg-success" />
            </div>
            <div className="space-y-2">
              {infraServices.map((s) => (
                <div key={s.name} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{s.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{s.uptime}</span>
                    <span className="flex h-2 w-2 rounded-full bg-success" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-3"><MessageSquare className="h-5 w-5" /><h2 className="text-base font-semibold">Soporte directo</h2></div>
            <p className="text-sm text-muted-foreground mb-4">¿No encuentras lo que buscas? Abre un ticket.</p>
            <Button asChild className="w-full"><Link href="/tickets"><MessageSquare className="h-4 w-4 mr-2" /> Abrir ticket</Link></Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
