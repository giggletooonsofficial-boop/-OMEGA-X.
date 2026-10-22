import { Router, Request, Response } from 'express';

export const healthRouter = Router();

const startTime = Date.now();

healthRouter.get('/health', (_req: Request, res: Response) => {
  const memoryUsage = process.memoryUsage();

  res.status(200).json({
    status: 'healthy',
    system: 'OMEGA X Core Runtime',
    phase: 'Phase 1 - Shell & Telemetry',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor((Date.now() - startTime) / 1000),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0-phase1',
    nodeVersion: process.version,
    memory: {
      heapUsedMB: Math.round((memoryUsage.heapUsed / 1024 / 1024) * 100) / 100,
      heapTotalMB: Math.round((memoryUsage.heapTotal / 1024 / 1024) * 100) / 100,
      rssMB: Math.round((memoryUsage.rss / 1024 / 1024) * 100) / 100,
    },
    services: {
      apiGateway: 'active',
      agentRegistry: 'idle_ready',
      securityEnclave: 'initialized',
    },
  });
});