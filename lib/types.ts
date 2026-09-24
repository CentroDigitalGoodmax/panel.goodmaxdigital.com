export type ServiceStatus = 'active' | 'pending' | 'suspended' | 'expired' | 'cancelled';
export type InvoiceStatus = 'paid' | 'pending' | 'overdue' | 'cancelled';
export type TicketStatus = 'open' | 'pending' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
export type SSLStatus = 'active' | 'expiring' | 'expired';
export type InfraStatus = 'online' | 'degraded' | 'offline';
export type AppStatus = 'running' | 'stopped' | 'deploying' | 'error';

export interface Domain {
  id: string;
  name: string;
  isSubdomain: boolean;
  parentDomain?: string;
  status: ServiceStatus;
  registrar: string;
  registeredDate: string;
  expiryDate: string;
  autoRenew: boolean;
  hostingService: string;
  sslStatus: SSLStatus;
  sslIssuer: string;
  sslExpiry: string;
  sslAutoRenew: boolean;
  dnsRecords: DNSRecord[];
  subdomains: Subdomain[];
}

export interface Subdomain {
  id: string;
  name: string;
  parentDomain: string;
  status: ServiceStatus;
  target: string;
  ssl: boolean;
}

export interface DNSRecord {
  id: string;
  type: 'A' | 'AAAA' | 'CNAME' | 'MX' | 'TXT' | 'NS' | 'SRV';
  name: string;
  value: string;
  priority?: number;
  ttl: number;
}

export interface HostingService {
  id: string;
  plan: string;
  status: ServiceStatus;
  domain: string;
  diskUsed: number;
  diskTotal: number;
  trafficUsed: number;
  trafficTotal: number;
  cpu: number;
  ram: number;
  ramTotal: number;
  databases: number;
  emails: number;
  renewalDate: string;
  phpVersion: string;
  sites: HostingSite[];
  databasesList: DatabaseInfo[];
  emailAccounts: EmailAccount[];
}

export interface HostingSite {
  id: string;
  domain: string;
  status: ServiceStatus;
  disk: string;
  ssl: boolean;
}

export interface DatabaseInfo {
  id: string;
  name: string;
  engine: 'MySQL' | 'MariaDB' | 'PostgreSQL';
  size: string;
  user: string;
  hostingId: string;
  status: ServiceStatus;
}

export interface EmailAccount {
  id: string;
  address: string;
  domain: string;
  status: ServiceStatus;
  storageUsed: number;
  storageQuota: number;
  lastAccess: string;
}

export interface EmailDomain {
  id: string;
  domain: string;
  accounts: number;
  accountsLimit: number;
  storageUsed: number;
  storageLimit: number;
  aliases: number;
  status: ServiceStatus;
}

export interface App {
  id: string;
  name: string;
  domain: string;
  status: AppStatus;
  nodeVersion: string;
  cpu: number;
  ram: number;
  storage: string;
  lastDeploy: string;
  entryPoint: string;
  port: number;
  directory: string;
  envVars: { key: string; value: string }[];
  pm2Id: number;
  sslStatus: SSLStatus;
  logs: { timestamp: string; level: 'info' | 'warn' | 'error'; message: string }[];
}

export interface SSLCertificate {
  id: string;
  domain: string;
  status: SSLStatus;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  autoRenew: boolean;
  type: string;
}

export interface License {
  id: string;
  product: string;
  licenseKey: string;
  status: 'active' | 'expired' | 'suspended';
  activationDate: string;
  expiryDate: string;
  associatedService: string;
}

export interface Download {
  id: string;
  name: string;
  category: 'Aplicaciones' | 'Plugins' | 'Documentación' | 'Instaladores' | 'Recursos' | 'Licencias';
  version: string;
  date: string;
  size: string;
  description: string;
}

export interface Invoice {
  id: string;
  number: string;
  date: string;
  concept: string;
  amount: number;
  status: InvoiceStatus;
  dueDate: string;
  items: InvoiceItem[];
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Ticket {
  id: string;
  number: string;
  subject: string;
  service: string;
  category: string;
  priority: TicketPriority;
  status: TicketStatus;
  lastUpdate: string;
  createdAt: string;
  messages: TicketMessage[];
}

export interface TicketMessage {
  id: string;
  author: string;
  isStaff: boolean;
  message: string;
  timestamp: string;
  attachments?: string[];
}

export interface ActivityLog {
  id: string;
  date: string;
  time: string;
  action: string;
  resource: string;
  type: 'domain' | 'email' | 'app' | 'invoice' | 'ticket' | 'security' | 'hosting' | 'database';
  ip: string;
}

export interface InfraService {
  name: string;
  status: InfraStatus;
  uptime: string;
  latency: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  company: string;
  plan: string;
  avatar: string;
  twoFactorEnabled: boolean;
}
