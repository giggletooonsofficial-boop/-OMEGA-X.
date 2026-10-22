export type NavigationId = 
  | 'dashboard' 
  | 'workspace' 
  | 'agent-studio' 
  | 'security-lab' 
  | 'model-providers' 
  | 'research-library' 
  | 'settings';

export interface HealthData {
  status: 'healthy' | 'degraded' | 'offline';
  system: string;
  phase: string;
  timestamp: string;
  uptimeSeconds: number;
  environment: string;
  version: string;
  nodeVersion: string;
  memory: {
    heapUsedMB: number;
    heapTotalMB: number;
    rssMB: number;
  };
  services: {
    apiGateway: string;
    agentRegistry: string;
    securityEnclave: string;
  };
}

export interface NavItemConfig {
  id: NavigationId;
  label: string;
  iconName: string;
  phase: 1 | 2 | 3;
  badge?: string;
}