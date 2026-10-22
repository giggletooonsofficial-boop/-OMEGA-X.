import React from 'react';
import { RefreshCw, Shield, Server, Menu } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { HealthData } from '../../types';

interface HeaderProps {
  healthData: HealthData | null;
  loading: boolean;
  error: string | null;
  latencyMs: number | null;
  onRefresh: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  healthData,
  loading,
  error,
  latencyMs,
  onRefresh,
  onToggleCollapse,
}) => {
  const getStatus = () => {
    if (loading && !healthData) return 'loading';
    if (error) return 'offline';
    return 'healthy';
  };

  return (
    <header className="h-16 bg-omega-950/80 backdrop-blur-md border-b border-omega-800/80 px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleCollapse}
          className="p-2 rounded-lg bg-omega-900 hover:bg-omega-850 text-slate-400 hover:text-white transition-colors border border-omega-800"
          aria-label="Toggle sidebar width"
        >
          <Menu className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-300">CORE NODE:</span>
          <span className="text-xs font-mono font-medium text-white bg-omega-900 px-2 py-0.5 rounded border border-omega-800">
            {healthData ? `port-${4000}` : 'connecting...'}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Latency badge */}
        {latencyMs !== null && (
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-omega-900 border border-omega-800 text-xs font-mono text-slate-300">
            <span className="text-slate-300">PING:</span>
            <span className={latencyMs < 100 ? 'text-emerald-400' : 'text-amber-400'}>{latencyMs}ms</span>
          </div>
        )}

        {/* Dynamic status badge */}
        <StatusBadge status={getStatus()} />

        {/* Refresh button */}
        <button
          onClick={onRefresh}
          disabled={loading}
          className="p-2 rounded-lg bg-omega-900 hover:bg-omega-850 text-slate-300 hover:text-white border border-omega-800 transition-colors disabled:opacity-50"
          title="Force health check refresh"
          aria-label="Force telemetry sync"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-omega-accent' : ''}`} />
        </button>

        <div className="h-5 w-px bg-omega-800 mx-1" />

        {/* Security mode pill */}
        <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-md bg-omega-900 border border-omega-800 text-xs font-mono text-slate-300">
          <Shield className="w-3.5 h-3.5 text-omega-accent" />
          <span>VAULT: ISOLATED</span>
        </div>
      </div>
    </header>
  );
};