import React from 'react';
import { 
  Activity, 
  Server, 
  Cpu, 
  HardDrive, 
  CheckCircle2, 
  AlertTriangle, 
  Radio, 
  Layers, 
  RefreshCcw 
} from 'lucide-react';
import { HealthData } from '../../types';
import { MetricCard } from '../common/MetricCard';

interface DashboardViewProps {
  health: HealthData | null;
  loading: boolean;
  error: string | null;
  latencyMs: number | null;
  onRefresh: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  health,
  loading,
  error,
  latencyMs,
  onRefresh,
}) => {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-omega-800 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/60 text-omega-accent text-xs font-mono mb-2">
            <Radio className="w-3 h-3 animate-pulse" />
            <span>PHASE 1 DEPLOYMENT ACTIVE</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            System Telemetry & Engine Overview
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time server handshake, core health telemetry, and architectural phase matrix.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onRefresh}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-omega-850 hover:bg-omega-800 text-xs font-mono font-medium border border-omega-700 text-slate-200 transition-all shadow-sm active:scale-95"
          >
            <RefreshCcw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-omega-accent' : ''}`} />
            <span>PING CORE</span>
          </button>
        </div>
      </div>

      {/* Backend Connection Diagnostics State */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/80 text-rose-300 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="text-xs font-mono space-y-1">
            <div className="font-semibold text-rose-200">CORE BACKEND UNREACHABLE</div>
            <div>Error: {error}</div>
            <div className="text-rose-400/80">
              Check if the backend server is running via `npm run dev:backend` on port 4000.
            </div>
          </div>
        </div>
      )}

      {/* Telemetry Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Roundtrip Latency"
          value={latencyMs !== null ? `${latencyMs} ms` : '---'}
          subValue={health ? `Polled ${new Date(health.timestamp).toLocaleTimeString()}` : 'Awaiting data'}
          icon={Activity}
          badge={latencyMs !== null && latencyMs < 50 ? 'OPTIMAL' : 'ONLINE'}
          badgeType={latencyMs !== null && latencyMs < 50 ? 'success' : 'info'}
        />

        <MetricCard
          title="Uptime"
          value={health ? `${health.uptimeSeconds}s` : '---'}
          subValue={health ? `Platform: ${health.system}` : 'Node process idle'}
          icon={Server}
          badge="LIVE"
          badgeType="success"
        />

        <MetricCard
          title="Heap Memory Used"
          value={health ? `${health.memory.heapUsedMB} MB` : '---'}
          subValue={health ? `Total allocated: ${health.memory.heapTotalMB} MB` : 'Node V8 metrics'}
          icon={Cpu}
          badge="V8 ENGINE"
          badgeType="info"
        />

        <MetricCard
          title="Resident Set (RSS)"
          value={health ? `${health.memory.rssMB} MB` : '---'}
          subValue="Physical memory used"
          icon={HardDrive}
          badge="STABLE"
          badgeType="default"
        />
      </div>

      {/* Main Grid: Server Details + Phase Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Core Node Telemetry Card */}
        <div className="lg:col-span-2 bg-omega-900 border border-omega-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-omega-800 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-md bg-omega-850 border border-omega-800 text-omega-accent">
                <Server className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Live Server Node Health Payload
                </h3>
                <p className="text-xs text-slate-400">Direct response from Express endpoint `/api/health`</p>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-1 rounded bg-omega-850 text-slate-300 border border-omega-800">
              JSON STREAM
            </span>
          </div>

          {health ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="p-3 rounded-lg bg-omega-950 border border-omega-850">
                  <div className="text-slate-400 text-[10px]">ENVIRONMENT</div>
                  <div className="text-omega-accent font-semibold mt-1 uppercase">{health.environment}</div>
                </div>
                <div className="p-3 rounded-lg bg-omega-950 border border-omega-850">
                  <div className="text-slate-400 text-[10px]">NODE RUNTIME</div>
                  <div className="text-white font-semibold mt-1">{health.nodeVersion}</div>
                </div>
                <div className="p-3 rounded-lg bg-omega-950 border border-omega-850">
                  <div className="text-slate-400 text-[10px]">API GATEWAY</div>
                  <div className="text-emerald-400 font-semibold mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{health.services.apiGateway}</span>
                  </div>
                </div>
              </div>

              {/* Raw JSON View */}
              <div className="mt-4">
                <div className="text-[11px] font-mono text-slate-400 mb-2">RAW PAYLOAD INSPECTION</div>
                <pre className="bg-omega-950 border border-omega-850 rounded-lg p-4 font-mono text-xs text-cyan-300/90 overflow-x-auto leading-relaxed">
                  {JSON.stringify(health, null, 2)}
                </pre>
              </div>
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 border border-dashed border-omega-800 rounded-lg">
              {loading ? (
                <>
                  <div className="w-8 h-8 border-2 border-omega-accent border-t-transparent rounded-full animate-spin mb-3" />
                  <span className="text-xs font-mono text-slate-400">Querying backend runtime telemetry...</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-8 h-8 text-rose-500 mb-2" />
                  <span className="text-xs font-mono text-slate-400">No active response from backend.</span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Phase 1 vs Future Roadmap Readiness Matrix */}
        <div className="bg-omega-900 border border-omega-800 rounded-xl p-6 shadow-sm flex flex-col">
          <div className="flex items-center gap-2.5 pb-4 border-b border-omega-800 mb-4">
            <div className="p-2 rounded-md bg-omega-850 border border-omega-800 text-omega-accent">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Architecture Roadmap
              </h3>
              <p className="text-xs text-slate-400">Implementation state</p>
            </div>
          </div>

          <div className="space-y-3 flex-1 font-mono text-xs">
            {/* Phase 1 Items */}
            <div className="p-3 rounded-lg bg-omega-850/70 border border-emerald-500/30 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-emerald-400 font-bold">Phase 1: Shell & Telemetry</span>
                <span className="px-1.5 py-0.2 text-[9px] rounded bg-emerald-500/20 text-emerald-300">ACTIVE</span>
              </div>
              <ul className="text-slate-400 space-y-1 text-[11px] list-disc list-inside">
                <li>Vite + React + TS Dark Shell</li>
                <li>Express backend `/api/health`</li>
                <li>Latency and memory telemetry</li>
                <li>Client-side route navigation</li>
              </ul>
            </div>

            {/* Phase 2 Items */}
            <div className="p-3 rounded-lg bg-omega-950/70 border border-omega-800/80 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-bold">Phase 2: Multi-Agent Engine</span>
                <span className="px-1.5 py-0.2 text-[9px] rounded bg-omega-800 text-slate-400">PLANNED</span>
              </div>
              <ul className="text-slate-300 space-y-1 text-[11px] list-disc list-inside">
                <li>Gemini 1.5 SDK server isolation</li>
                <li>Multi-turn agent execution studio</li>
                <li>Tool execution & Web search loop</li>
              </ul>
            </div>

            {/* Phase 3 Items */}
            <div className="p-3 rounded-lg bg-omega-950/70 border border-omega-800/80 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-bold">Phase 3: Security & Sandbox</span>
                <span className="px-1.5 py-0.2 text-[9px] rounded bg-omega-800 text-slate-400">PLANNED</span>
              </div>
              <ul className="text-slate-300 space-y-1 text-[11px] list-disc list-inside">
                <li>Automated prompt injection testing</li>
                <li>Differential privacy benchmarks</li>
                <li>Research export engine</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};