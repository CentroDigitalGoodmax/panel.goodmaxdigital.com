import type {
  Domain, HostingService, App, EmailDomain, EmailAccount, DatabaseInfo,
  SSLCertificate, License, Download, Invoice, Ticket, ActivityLog,
  InfraService, Notification, UserProfile, DNSRecord,
} from './types';

export const currentUser: UserProfile = {
  name: 'Kevin Borja',
  email: 'kevin.borja@goodmax.com',
  phone: '+593 99 123 4567',
  company: 'Borja Digital S.A.',
  plan: 'GM-3',
  avatar: 'KB',
  twoFactorEnabled: true,
};

export const dnsRecords: DNSRecord[] = [
  { id: 'dns-1', type: 'A', name: '@', value: '192.168.1.100', ttl: 3600 },
  { id: 'dns-2', type: 'A', name: 'www', value: '192.168.1.100', ttl: 3600 },
  { id: 'dns-3', type: 'A', name: 'api', value: '192.168.1.101', ttl: 3600 },
  { id: 'dns-4', type: 'A', name: 'mail', value: '192.168.1.102', ttl: 3600 },
  { id: 'dns-5', type: 'AAAA', name: '@', value: '2001:db8::1', ttl: 3600 },
  { id: 'dns-6', type: 'MX', name: '@', value: 'mail.goodmax.com', priority: 10, ttl: 3600 },
  { id: 'dns-7', type: 'MX', name: '@', value: 'mail2.goodmax.com', priority: 20, ttl: 3600 },
  { id: 'dns-8', type: 'TXT', name: '@', value: 'v=spf1 include:_spf.goodmax.com ~all', ttl: 3600 },
  { id: 'dns-9', type: 'CNAME', name: 'app', value: 'goodmax.com', ttl: 3600 },
  { id: 'dns-10', type: 'CNAME', name: 'admin', value: 'goodmax.com', ttl: 3600 },
  { id: 'dns-11', type: 'NS', name: '@', value: 'ns1.goodmax.com', ttl: 86400 },
  { id: 'dns-12', type: 'NS', name: '@', value: 'ns2.goodmax.com', ttl: 86400 },
];

export const domains: Domain[] = [
  {
    id: 'dom-1',
    name: 'goodmax.com',
    isSubdomain: false,
    status: 'active',
    registrar: 'GoodMax Registrar',
    registeredDate: '2020-03-15',
    expiryDate: '2027-10-24',
    autoRenew: true,
    hostingService: 'GM-3',
    sslStatus: 'active',
    sslIssuer: "Let's Encrypt",
    sslExpiry: '2026-12-20',
    sslAutoRenew: true,
    dnsRecords,
    subdomains: [
      { id: 'sub-1', name: 'www', parentDomain: 'goodmax.com', status: 'active', target: '192.168.1.100', ssl: true },
      { id: 'sub-2', name: 'api', parentDomain: 'goodmax.com', status: 'active', target: '192.168.1.101', ssl: true },
      { id: 'sub-3', name: 'app', parentDomain: 'goodmax.com', status: 'active', target: 'goodmax.com', ssl: true },
      { id: 'sub-4', name: 'mail', parentDomain: 'goodmax.com', status: 'active', target: '192.168.1.102', ssl: true },
      { id: 'sub-5', name: 'admin', parentDomain: 'goodmax.com', status: 'active', target: 'goodmax.com', ssl: true },
    ],
  },
  {
    id: 'dom-2',
    name: 'cliente.com',
    isSubdomain: false,
    status: 'active',
    registrar: 'GoodMax Registrar',
    registeredDate: '2021-06-10',
    expiryDate: '2026-12-15',
    autoRenew: true,
    hostingService: 'GM-2',
    sslStatus: 'active',
    sslIssuer: "Let's Encrypt",
    sslExpiry: '2026-11-30',
    sslAutoRenew: true,
    dnsRecords: dnsRecords.slice(0, 6),
    subdomains: [
      { id: 'sub-6', name: 'www', parentDomain: 'cliente.com', status: 'active', target: '192.168.1.100', ssl: true },
      { id: 'sub-7', name: 'tienda', parentDomain: 'cliente.com', status: 'active', target: '192.168.1.100', ssl: true },
    ],
  },
  {
    id: 'dom-3',
    name: 'tienda.com',
    isSubdomain: false,
    status: 'active',
    registrar: 'Namecheap',
    registeredDate: '2022-01-20',
    expiryDate: '2026-11-05',
    autoRenew: false,
    hostingService: 'GM-1',
    sslStatus: 'expiring',
    sslIssuer: "Let's Encrypt",
    sslExpiry: '2026-10-10',
    sslAutoRenew: true,
    dnsRecords: dnsRecords.slice(0, 4),
    subdomains: [
      { id: 'sub-8', name: 'www', parentDomain: 'tienda.com', status: 'active', target: '192.168.1.100', ssl: true },
    ],
  },
  {
    id: 'dom-4',
    name: 'empresa.com',
    isSubdomain: false,
    status: 'active',
    registrar: 'GoodMax Registrar',
    registeredDate: '2021-09-12',
    expiryDate: '2027-09-12',
    autoRenew: true,
    hostingService: 'GM-3',
    sslStatus: 'active',
    sslIssuer: "Let's Encrypt",
    sslExpiry: '2026-12-25',
    sslAutoRenew: true,
    dnsRecords: dnsRecords.slice(0, 8),
    subdomains: [
      { id: 'sub-9', name: 'www', parentDomain: 'empresa.com', status: 'active', target: '192.168.1.100', ssl: true },
      { id: 'sub-10', name: 'mail', parentDomain: 'empresa.com', status: 'active', target: '192.168.1.102', ssl: true },
    ],
  },
  {
    id: 'dom-5',
    name: 'portfolio.io',
    isSubdomain: false,
    status: 'pending',
    registrar: 'GoodMax Registrar',
    registeredDate: '2026-09-20',
    expiryDate: '2027-09-20',
    autoRenew: true,
    hostingService: 'Ninguno',
    sslStatus: 'expired',
    sslIssuer: 'Ninguno',
    sslExpiry: '-',
    sslAutoRenew: false,
    dnsRecords: [],
    subdomains: [],
  },
];

export const emailAccounts: EmailAccount[] = [
  { id: 'em-1', address: 'info@empresa.com', domain: 'empresa.com', status: 'active', storageUsed: 2.4, storageQuota: 5, lastAccess: '2026-09-23 18:30' },
  { id: 'em-2', address: 'ventas@empresa.com', domain: 'empresa.com', status: 'active', storageUsed: 1.8, storageQuota: 5, lastAccess: '2026-09-23 15:22' },
  { id: 'em-3', address: 'soporte@empresa.com', domain: 'empresa.com', status: 'active', storageUsed: 3.2, storageQuota: 5, lastAccess: '2026-09-24 09:15' },
  { id: 'em-4', address: 'admin@empresa.com', domain: 'empresa.com', status: 'active', storageUsed: 0.5, storageQuota: 5, lastAccess: '2026-09-22 14:00' },
  { id: 'em-5', address: 'kevin@goodmax.com', domain: 'goodmax.com', status: 'active', storageUsed: 1.2, storageQuota: 10, lastAccess: '2026-09-24 08:00' },
  { id: 'em-6', address: 'contacto@goodmax.com', domain: 'goodmax.com', status: 'active', storageUsed: 0.8, storageQuota: 5, lastAccess: '2026-09-23 20:45' },
  { id: 'em-7', address: 'info@cliente.com', domain: 'cliente.com', status: 'active', storageUsed: 1.5, storageQuota: 5, lastAccess: '2026-09-23 12:00' },
  { id: 'em-8', address: 'ventas@cliente.com', domain: 'cliente.com', status: 'active', storageUsed: 2.0, storageQuota: 5, lastAccess: '2026-09-23 16:30' },
  { id: 'em-9', address: 'info@tienda.com', domain: 'tienda.com', status: 'suspended', storageUsed: 0.3, storageQuota: 5, lastAccess: '2026-09-15 10:00' },
  { id: 'em-10', address: 'soporte@tienda.com', domain: 'tienda.com', status: 'active', storageUsed: 0.1, storageQuota: 5, lastAccess: '2026-09-20 14:00' },
  { id: 'em-11', address: 'admin@goodmax.com', domain: 'goodmax.com', status: 'active', storageUsed: 3.5, storageQuota: 10, lastAccess: '2026-09-24 07:30' },
  { id: 'em-12', address: 'no-reply@goodmax.com', domain: 'goodmax.com', status: 'active', storageUsed: 0.2, storageQuota: 5, lastAccess: '2026-09-22 09:00' },
];

export const emailDomains: EmailDomain[] = [
  { id: 'ed-1', domain: 'empresa.com', accounts: 4, accountsLimit: 20, storageUsed: 7.9, storageLimit: 20, aliases: 6, status: 'active' },
  { id: 'ed-2', domain: 'goodmax.com', accounts: 4, accountsLimit: 30, storageUsed: 5.7, storageLimit: 30, aliases: 10, status: 'active' },
  { id: 'ed-3', domain: 'cliente.com', accounts: 2, accountsLimit: 10, storageUsed: 3.5, storageLimit: 10, aliases: 3, status: 'active' },
  { id: 'ed-4', domain: 'tienda.com', accounts: 2, accountsLimit: 5, storageUsed: 0.4, storageLimit: 5, aliases: 1, status: 'active' },
];

export const databases: DatabaseInfo[] = [
  { id: 'db-1', name: 'goodmax_prod', engine: 'MySQL', size: '1.2 GB', user: 'goodmax_admin', hostingId: 'GM-3', status: 'active' },
  { id: 'db-2', name: 'cliente_db', engine: 'MariaDB', size: '845 MB', user: 'cliente_user', hostingId: 'GM-2', status: 'active' },
  { id: 'db-3', name: 'tienda_shop', engine: 'MySQL', size: '320 MB', user: 'tienda_admin', hostingId: 'GM-1', status: 'active' },
  { id: 'db-4', name: 'crm_data', engine: 'PostgreSQL', size: '680 MB', user: 'crm_user', hostingId: 'GM-3', status: 'active' },
];

export const hostingServices: HostingService[] = [
  {
    id: 'GM-3',
    plan: 'GM-3 Pro',
    status: 'active',
    domain: 'goodmax.com',
    diskUsed: 18.4,
    diskTotal: 50,
    trafficUsed: 142,
    trafficTotal: 500,
    cpu: 35,
    ram: 2.4,
    ramTotal: 8,
    databases: 2,
    emails: 4,
    renewalDate: '2027-03-15',
    phpVersion: '8.2',
    sites: [
      { id: 'site-1', domain: 'goodmax.com', status: 'active', disk: '12.4 GB', ssl: true },
      { id: 'site-2', domain: 'empresa.com', status: 'active', disk: '4.2 GB', ssl: true },
      { id: 'site-3', domain: 'tienda.empresa.com', status: 'active', disk: '1.8 GB', ssl: true },
    ],
    databasesList: databases.filter(d => d.hostingId === 'GM-3'),
    emailAccounts: emailAccounts.filter(e => e.domain === 'goodmax.com' || e.domain === 'empresa.com'),
  },
  {
    id: 'GM-2',
    plan: 'GM-2 Business',
    status: 'active',
    domain: 'cliente.com',
    diskUsed: 8.2,
    diskTotal: 20,
    trafficUsed: 56,
    trafficTotal: 200,
    cpu: 22,
    ram: 1.1,
    ramTotal: 4,
    databases: 1,
    emails: 2,
    renewalDate: '2026-12-15',
    phpVersion: '8.1',
    sites: [
      { id: 'site-4', domain: 'cliente.com', status: 'active', disk: '6.5 GB', ssl: true },
      { id: 'site-5', domain: 'tienda.cliente.com', status: 'active', disk: '1.7 GB', ssl: true },
    ],
    databasesList: databases.filter(d => d.hostingId === 'GM-2'),
    emailAccounts: emailAccounts.filter(e => e.domain === 'cliente.com'),
  },
  {
    id: 'GM-1',
    plan: 'GM-1 Starter',
    status: 'active',
    domain: 'tienda.com',
    diskUsed: 4.82,
    diskTotal: 10,
    trafficUsed: 23,
    trafficTotal: 100,
    cpu: 12,
    ram: 0.6,
    ramTotal: 2,
    databases: 1,
    emails: 2,
    renewalDate: '2026-11-05',
    phpVersion: '8.2',
    sites: [
      { id: 'site-6', domain: 'tienda.com', status: 'active', disk: '4.82 GB', ssl: true },
    ],
    databasesList: databases.filter(d => d.hostingId === 'GM-1'),
    emailAccounts: emailAccounts.filter(e => e.domain === 'tienda.com'),
  },
];

export const apps: App[] = [
  {
    id: 'app-1',
    name: 'CRM Cliente',
    domain: 'app.cliente.com',
    status: 'running',
    nodeVersion: '20',
    cpu: 28,
    ram: 512,
    storage: '1.2 GB',
    lastDeploy: '2026-09-23 14:30',
    entryPoint: 'server.js',
    port: 3000,
    directory: '/home/cliente/app',
    envVars: [
      { key: 'NODE_ENV', value: 'production' },
      { key: 'PORT', value: '3000' },
      { key: 'DATABASE_URL', value: 'mysql://***' },
      { key: 'JWT_SECRET', value: '********' },
    ],
    pm2Id: 1,
    sslStatus: 'active',
    logs: [
      { timestamp: '2026-09-24 09:15:22', level: 'info', message: 'Server started on port 3000' },
      { timestamp: '2026-09-24 09:15:20', level: 'info', message: 'Connected to database crm_data' },
      { timestamp: '2026-09-24 09:15:18', level: 'info', message: 'PM2 process initialized' },
      { timestamp: '2026-09-23 14:30:05', level: 'info', message: 'Deploy completed successfully' },
      { timestamp: '2026-09-23 14:30:02', level: 'info', message: 'Installing dependencies...' },
      { timestamp: '2026-09-23 14:29:58', level: 'info', message: 'Building application...' },
      { timestamp: '2026-09-22 18:45:12', level: 'warn', message: 'High memory usage detected: 480MB' },
      { timestamp: '2026-09-22 10:12:33', level: 'error', message: 'Database connection timeout (recovered)' },
    ],
  },
  {
    id: 'app-2',
    name: 'API Gateway',
    domain: 'api.goodmax.com',
    status: 'running',
    nodeVersion: '20',
    cpu: 15,
    ram: 256,
    storage: '680 MB',
    lastDeploy: '2026-09-22 10:00',
    entryPoint: 'index.js',
    port: 4000,
    directory: '/home/goodmax/api',
    envVars: [
      { key: 'NODE_ENV', value: 'production' },
      { key: 'PORT', value: '4000' },
      { key: 'REDIS_URL', value: 'redis://***' },
    ],
    pm2Id: 2,
    sslStatus: 'active',
    logs: [
      { timestamp: '2026-09-24 09:00:00', level: 'info', message: 'API Gateway running on port 4000' },
      { timestamp: '2026-09-23 22:15:10', level: 'info', message: 'Rate limit: 1200 req/min' },
      { timestamp: '2026-09-22 10:00:15', level: 'info', message: 'Deploy completed' },
      { timestamp: '2026-09-22 10:00:10', level: 'info', message: 'Dependencies installed' },
    ],
  },
];

export const sslCertificates: SSLCertificate[] = [
  { id: 'ssl-1', domain: 'goodmax.com', status: 'active', issuer: "Let's Encrypt", issueDate: '2026-09-20', expiryDate: '2026-12-20', autoRenew: true, type: 'Wildcard' },
  { id: 'ssl-2', domain: 'cliente.com', status: 'active', issuer: "Let's Encrypt", issueDate: '2026-09-01', expiryDate: '2026-11-30', autoRenew: true, type: 'DV' },
  { id: 'ssl-3', domain: 'tienda.com', status: 'expiring', issuer: "Let's Encrypt", issueDate: '2026-07-10', expiryDate: '2026-10-10', autoRenew: true, type: 'DV' },
  { id: 'ssl-4', domain: 'app.cliente.com', status: 'active', issuer: "Let's Encrypt", issueDate: '2026-09-15', expiryDate: '2026-12-15', autoRenew: true, type: 'DV' },
  { id: 'ssl-5', domain: 'api.goodmax.com', status: 'active', issuer: "Let's Encrypt", issueDate: '2026-09-15', expiryDate: '2026-12-15', autoRenew: true, type: 'DV' },
  { id: 'ssl-6', domain: 'empresa.com', status: 'active', issuer: "Let's Encrypt", issueDate: '2026-09-25', expiryDate: '2026-12-25', autoRenew: true, type: 'Wildcard' },
  { id: 'ssl-7', domain: 'tienda.cliente.com', status: 'active', issuer: "Let's Encrypt", issueDate: '2026-09-10', expiryDate: '2026-12-10', autoRenew: true, type: 'DV' },
  { id: 'ssl-8', domain: 'portfolio.io', status: 'expired', issuer: 'Ninguno', issueDate: '-', expiryDate: '-', autoRenew: false, type: 'Ninguno' },
];

export const licenses: License[] = [
  { id: 'lic-1', product: 'Software Pro', licenseKey: 'GMX-AB12-CD34-EF56', status: 'active', activationDate: '2025-01-15', expiryDate: '2027-01-15', associatedService: 'GM-3' },
  { id: 'lic-2', product: 'CPanel Premier', licenseKey: 'GMX-GH78-IJ90-KL12', status: 'active', activationDate: '2025-06-01', expiryDate: '2026-12-01', associatedService: 'GM-3' },
  { id: 'lic-3', product: 'JetBackup Pro', licenseKey: 'GMX-MN34-OP56-QR78', status: 'active', activationDate: '2025-03-20', expiryDate: '2026-11-20', associatedService: 'GM-2' },
  { id: 'lic-4', product: 'Imunify360', licenseKey: 'GMX-ST90-UV12-WX34', status: 'active', activationDate: '2025-09-01', expiryDate: '2026-12-01', associatedService: 'GM-3' },
  { id: 'lic-5', product: 'Softaculous Premium', licenseKey: 'GMX-YZ56-AB78-CD90', status: 'expired', activationDate: '2024-01-10', expiryDate: '2026-01-10', associatedService: 'GM-1' },
  { id: 'lic-6', product: 'LiteSpeed Enterprise', licenseKey: 'GMX-EF12-GH34-IJ56', status: 'active', activationDate: '2025-02-14', expiryDate: '2027-02-14', associatedService: 'GM-3' },
];

export const downloads: Download[] = [
  { id: 'dl-1', name: 'GoodMax Dashboard Mobile', category: 'Aplicaciones', version: '2.4.1', date: '2026-09-15', size: '24.5 MB', description: 'App móvil para gestión de servicios GoodMax Cloud' },
  { id: 'dl-2', name: 'GoodMax CLI Tool', category: 'Aplicaciones', version: '1.8.0', date: '2026-09-10', size: '12.3 MB', description: 'Herramienta de línea de comandos para despliegues' },
  { id: 'dl-3', name: 'WordPress Plugin', category: 'Plugins', version: '3.2.1', date: '2026-08-28', size: '2.1 MB', description: 'Plugin de integración con GoodMax Cloud' },
  { id: 'dl-4', name: 'Cache Optimizer Plugin', category: 'Plugins', version: '1.5.0', date: '2026-08-15', size: '1.8 MB', description: 'Optimización de caché para hosting GoodMax' },
  { id: 'dl-5', name: 'Manual de Usuario PDF', category: 'Documentación', version: '5.0', date: '2026-09-01', size: '8.4 MB', description: 'Guía completa de la plataforma GoodMax Cloud' },
  { id: 'dl-6', name: 'API Reference PDF', category: 'Documentación', version: '3.1', date: '2026-08-20', size: '5.2 MB', description: 'Documentación técnica de la API GoodMax' },
  { id: 'dl-7', name: 'Node.js Installer', category: 'Instaladores', version: '20.10.0', date: '2026-09-18', size: '32.1 MB', description: 'Instalador de Node.js 20 LTS' },
  { id: 'dl-8', name: 'MySQL Workbench', category: 'Instaladores', version: '8.0.36', date: '2026-07-12', size: '45.2 MB', description: 'Cliente de bases de datos MySQL' },
  { id: 'dl-9', name: 'GoodMax Logo Pack', category: 'Recursos', version: '1.0', date: '2026-01-05', size: '3.6 MB', description: 'Pack de logos en diferentes formatos' },
  { id: 'dl-10', name: 'Certificado de Licencia', category: 'Licencias', version: '1.0', date: '2026-09-01', size: '0.8 MB', description: 'Plantilla de certificado de licencia' },
];

export const invoices: Invoice[] = [
  {
    id: 'inv-1', number: 'GMX-2026-0142', date: '2026-09-01', concept: 'Hosting GM-3 Pro — Anual', amount: 480, status: 'paid', dueDate: '2026-09-15',
    items: [{ description: 'Hosting GM-3 Pro (12 meses)', quantity: 1, unitPrice: 480, total: 480 }],
  },
  {
    id: 'inv-2', number: 'GMX-2026-0143', date: '2026-09-15', concept: 'Dominio tienda.com — Renovación', amount: 15, status: 'pending', dueDate: '2026-10-05',
    items: [{ description: 'Renovación dominio tienda.com (1 año)', quantity: 1, unitPrice: 15, total: 15 }],
  },
  {
    id: 'inv-3', number: 'GMX-2026-0138', date: '2026-08-01', concept: 'Hosting GM-2 Business — Anual', amount: 240, status: 'paid', dueDate: '2026-08-15',
    items: [{ description: 'Hosting GM-2 Business (12 meses)', quantity: 1, unitPrice: 240, total: 240 }],
  },
  {
    id: 'inv-4', number: 'GMX-2026-0135', date: '2026-07-15', concept: 'Licencia Software Pro', amount: 120, status: 'paid', dueDate: '2026-07-30',
    items: [{ description: 'Software Pro License (12 meses)', quantity: 1, unitPrice: 120, total: 120 }],
  },
  {
    id: 'inv-5', number: 'GMX-2026-0140', date: '2026-08-20', concept: 'Hosting GM-1 Starter — Anual', amount: 96, status: 'overdue', dueDate: '2026-09-05',
    items: [{ description: 'Hosting GM-1 Starter (12 meses)', quantity: 1, unitPrice: 96, total: 96 }],
  },
  {
    id: 'inv-6', number: 'GMX-2026-0130', date: '2026-06-01', concept: 'SSL Wildcard goodmax.com', amount: 45, status: 'paid', dueDate: '2026-06-15',
    items: [{ description: 'SSL Wildcard (12 meses)', quantity: 1, unitPrice: 45, total: 45 }],
  },
  {
    id: 'inv-7', number: 'GMX-2026-0144', date: '2026-09-20', concept: 'Licencias múltiples', amount: 85, status: 'cancelled', dueDate: '2026-10-01',
    items: [{ description: 'JetBackup Pro', quantity: 1, unitPrice: 35, total: 35 }, { description: 'Imunify360', quantity: 1, unitPrice: 50, total: 50 }],
  },
];

export const tickets: Ticket[] = [
  {
    id: 'tk-1', number: 'GMX-7842', subject: 'No puedo acceder al panel de archivos', service: 'GM-3', category: 'Hosting', priority: 'high', status: 'open', lastUpdate: '2026-09-24 08:30', createdAt: '2026-09-23 16:00',
    messages: [
      { id: 'tm-1', author: 'Kevin Borja', isStaff: false, message: 'Hola, desde esta mañana no puedo acceder al administrador de archivos en mi plan GM-3. Me aparece un error 500.', timestamp: '2026-09-23 16:00' },
      { id: 'tm-2', author: 'Soporte GoodMax', isStaff: true, message: 'Hola Kevin, gracias por contactarnos. Hemos revisado y parece que hay un problema con el servicio de archivos. Lo estamos investigando y te responderemos en breve.', timestamp: '2026-09-23 16:30' },
      { id: 'tm-3', author: 'Kevin Borja', isStaff: false, message: 'Perfecto, quedo atento. Gracias.', timestamp: '2026-09-23 17:00' },
    ],
  },
  {
    id: 'tk-2', number: 'GMX-7839', subject: 'Certificado SSL próximo a vencer', service: 'tienda.com', category: 'SSL', priority: 'medium', status: 'pending', lastUpdate: '2026-09-23 14:00', createdAt: '2026-09-22 10:00',
    messages: [
      { id: 'tm-4', author: 'Kevin Borja', isStaff: false, message: 'El certificado SSL de tienda.com vence pronto. ¿Se renovará automáticamente?', timestamp: '2026-09-22 10:00' },
      { id: 'tm-5', author: 'Soporte GoodMax', isStaff: true, message: 'El certificado tiene auto-renovación activada, pero el dominio no tiene auto-renovación. Te recomendamos activarla.', timestamp: '2026-09-22 11:00' },
    ],
  },
  {
    id: 'tk-3', number: 'GMX-7820', subject: 'Consultar sobre upgrade a GM-3', service: 'GM-1', category: 'Ventas', priority: 'low', status: 'resolved', lastUpdate: '2026-09-20 16:00', createdAt: '2026-09-19 09:00',
    messages: [
      { id: 'tm-6', author: 'Kevin Borja', isStaff: false, message: 'Quiero consultar los precios para upgrade de GM-1 a GM-3.', timestamp: '2026-09-19 09:00' },
      { id: 'tm-7', author: 'Soporte GoodMax', isStaff: true, message: 'El upgrade de GM-1 a GM-3 tiene un costo de diferencia prorrateada. Te enviamos los detalles al correo.', timestamp: '2026-09-19 10:00' },
    ],
  },
  {
    id: 'tk-4', number: 'GMX-7801', subject: 'Base de datos crm_data muy lenta', service: 'GM-3', category: 'Bases de datos', priority: 'urgent', status: 'closed', lastUpdate: '2026-09-15 18:00', createdAt: '2026-09-14 12:00',
    messages: [
      { id: 'tm-8', author: 'Kevin Borja', isStaff: false, message: 'La base de datos crm_data está muy lenta desde ayer.', timestamp: '2026-09-14 12:00' },
      { id: 'tm-9', author: 'Soporte GoodMax', isStaff: true, message: 'Hemos optimizado los índices y la consulta. El problema ha sido resuelto.', timestamp: '2026-09-15 16:00' },
    ],
  },
];

export const activityLogs: ActivityLog[] = [
  { id: 'act-1', date: '2026-09-24', time: '08:30', action: 'Inicio de sesión', resource: 'Panel GoodMax', type: 'security', ip: '186.66.12.34' },
  { id: 'act-2', date: '2026-09-23', time: '21:03', action: 'Dominio creado', resource: 'tienda.com', type: 'domain', ip: '186.66.12.34' },
  { id: 'act-3', date: '2026-09-23', time: '20:44', action: 'Aplicación reiniciada', resource: 'crm.cliente.com', type: 'app', ip: '186.66.12.34' },
  { id: 'act-4', date: '2026-09-23', time: '19:20', action: 'Nueva cuenta de correo', resource: 'ventas@cliente.com', type: 'email', ip: '186.66.12.34' },
  { id: 'act-5', date: '2026-09-23', time: '15:00', action: 'Factura generada', resource: 'GMX-2026-0143', type: 'invoice', ip: '186.66.12.34' },
  { id: 'act-6', date: '2026-09-23', time: '16:00', action: 'Ticket creado', resource: 'GMX-7842', type: 'ticket', ip: '186.66.12.34' },
  { id: 'act-7', date: '2026-09-22', time: '18:45', action: 'Contraseña modificada', resource: 'kevin@goodmax.com', type: 'security', ip: '186.66.12.34' },
  { id: 'act-8', date: '2026-09-22', time: '14:30', action: 'Despliegue de aplicación', resource: 'app.cliente.com', type: 'app', ip: '186.66.12.34' },
  { id: 'act-9', date: '2026-09-22', time: '10:00', action: 'Hosting creado', resource: 'GM-1 Starter', type: 'hosting', ip: '186.66.12.34' },
  { id: 'act-10', date: '2026-09-21', time: '11:15', action: 'Base de datos creada', resource: 'crm_data', type: 'database', ip: '186.66.12.34' },
  { id: 'act-11', date: '2026-09-21', time: '09:00', action: 'Registro DNS modificado', resource: 'goodmax.com', type: 'domain', ip: '186.66.12.34' },
  { id: 'act-12', date: '2026-09-20', time: '16:30', action: 'Certificado SSL instalado', resource: 'empresa.com', type: 'domain', ip: '186.66.12.34' },
];

export const infraServices: InfraService[] = [
  { name: 'Hosting', status: 'online', uptime: '99.98%', latency: '12ms' },
  { name: 'DNS', status: 'online', uptime: '99.99%', latency: '4ms' },
  { name: 'Email', status: 'online', uptime: '99.95%', latency: '18ms' },
  { name: 'API', status: 'online', uptime: '99.97%', latency: '8ms' },
  { name: 'Panel', status: 'online', uptime: '99.99%', latency: '15ms' },
  { name: 'CDN', status: 'online', uptime: '99.96%', latency: '6ms' },
];

export const notifications: Notification[] = [
  { id: 'ntf-1', title: 'SSL próximo a vencer', message: 'El certificado SSL de tienda.com vence el 10/10/2026', type: 'warning', timestamp: '2026-09-24 08:00', read: false },
  { id: 'ntf-2', title: 'Factura pendiente', message: 'La factura GMX-2026-0143 vence el 05/10/2026', type: 'warning', timestamp: '2026-09-23 15:00', read: false },
  { id: 'ntf-3', title: 'Nuevo ticket respondido', message: 'Soporte respondió al ticket GMX-7842', type: 'info', timestamp: '2026-09-23 16:30', read: false },
  { id: 'ntf-4', title: 'Despliegue completado', message: 'La aplicación CRM Cliente se desplegó correctamente', type: 'success', timestamp: '2026-09-22 14:30', read: true },
  { id: 'ntf-5', title: 'Factura vencida', message: 'La factura GMX-2026-0140 está vencida', type: 'error', timestamp: '2026-09-06 00:00', read: true },
];

export const usageChart7d = [
  { day: 'Lun', storage: 17.2, cpu: 28, ram: 2.1, traffic: 18 },
  { day: 'Mar', storage: 17.5, cpu: 32, ram: 2.2, traffic: 22 },
  { day: 'Mié', storage: 17.8, cpu: 25, ram: 2.0, traffic: 15 },
  { day: 'Jue', storage: 18.0, cpu: 38, ram: 2.3, traffic: 28 },
  { day: 'Vie', storage: 18.1, cpu: 30, ram: 2.2, traffic: 20 },
  { day: 'Sáb', storage: 18.2, cpu: 18, ram: 1.8, traffic: 12 },
  { day: 'Dom', storage: 18.4, cpu: 35, ram: 2.4, traffic: 27 },
];

export const trafficChart30d = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}`,
  visitors: Math.floor(Math.random() * 500) + 200,
  bandwidth: Math.floor(Math.random() * 800) + 300,
}));

export const fileManager = {
  path: ['/home', 'web', 'public_html'],
  items: [
    { id: 'f-1', name: 'index.php', type: 'file', size: '4.2 KB', modified: '2026-09-20', permissions: '644' },
    { id: 'f-2', name: 'wp-config.php', type: 'file', size: '3.8 KB', modified: '2026-09-15', permissions: '640' },
    { id: 'f-3', name: '.htaccess', type: 'file', size: '2.1 KB', modified: '2026-09-18', permissions: '644' },
    { id: 'f-4', name: 'wp-content', type: 'folder', size: '12.4 GB', modified: '2026-09-22', permissions: '755' },
    { id: 'f-5', name: 'wp-includes', type: 'folder', size: '28.5 MB', modified: '2026-09-10', permissions: '755' },
    { id: 'f-6', name: 'wp-admin', type: 'folder', size: '15.2 MB', modified: '2026-09-10', permissions: '755' },
    { id: 'f-7', name: 'robots.txt', type: 'file', size: '0.3 KB', modified: '2026-08-28', permissions: '644' },
    { id: 'f-8', name: 'sitemap.xml', type: 'file', size: '1.2 KB', modified: '2026-09-19', permissions: '644' },
    { id: 'f-9', name: 'favicon.ico', type: 'file', size: '1.5 KB', modified: '2026-07-01', permissions: '644' },
    { id: 'f-10', name: 'assets', type: 'folder', size: '8.6 GB', modified: '2026-09-23', permissions: '755' },
    { id: 'f-11', name: 'uploads', type: 'folder', size: '3.8 GB', modified: '2026-09-23', permissions: '755' },
    { id: 'f-12', name: 'error_log', type: 'file', size: '456 KB', modified: '2026-09-24', permissions: '640' },
  ],
};

export const faqItems = [
  { id: 'faq-1', question: '¿Cómo cambio la versión de PHP en mi hosting?', answer: 'Ve a Hosting > [tu plan] > Configuración > PHP. Desde ahí puedes seleccionar la versión y las extensiones que necesites.' },
  { id: 'faq-2', question: '¿Cómo activo la auto-renovación de un dominio?', answer: 'Ve a Dominios, haz clic en "Administrar" del dominio deseado, y activa el toggle de auto-renovación en la sección de resumen.' },
  { id: 'faq-3', question: '¿Cómo creo una cuenta de correo?', answer: 'Ve a Correos, selecciona el dominio y haz clic en "Crear cuenta". Completa el formulario con nombre, contraseña y cuota.' },
  { id: 'faq-4', question: '¿Cómo despliego una aplicación Node.js?', answer: 'Ve a Aplicaciones > Crear aplicación, selecciona el dominio, la versión de Node.js, el entry point y las variables de entorno.' },
  { id: 'faq-5', question: '¿Cómo solicito un reembolso?', answer: 'Abre un ticket de soporte con la categoría "Facturación" indicando el número de factura y el motivo del reembolso.' },
  { id: 'faq-6', question: '¿Cómo configuro un registro DNS personalizado?', answer: 'Ve a DNS > [dominio] > Agregar registro. Selecciona el tipo, nombre, valor y TTL del registro que deseas crear.' },
];
