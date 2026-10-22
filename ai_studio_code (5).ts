import React from 'react';

interface StatusBadgeProps {
  status: 'healthy' | 'degraded' | 'offline' | 'loading';
  showPulse?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, showPulse = true }) => {
  const statusConfig = {
    healthy: {
      text: 'SYSTEM HEALTHY',
      bg: 'bg-emerald-950/60',
      border: 'border-emerald-500/40',
      textCol: 'text-emerald-400',
      indicator: 'bg-emerald-400',
    },
    degraded: {
      text: 'DEGRADED',
      bg: 'bg-amber-950/60',
      border: 'border-amber-500/40',
      textCol: 'text-amber-400',
      indicator: 'bg-amber-400',
    },
    offline: {
      text: 'CORE OFFLINE',
      bg: 'bg-rose-950/60',
      border: 'border-rose-500/40',
      textCol: 'text-rose-400',
      indicator: 'bg-rose-500',
    },
    loading: {
      text: 'CONNECTING...',
      bg: 'bg-cyan-950/60',
      border: 'border-cyan-500/40',
      textCol: 'text-cyan-400',
      indicator: 'bg-cyan-400',
    },
  }[status];

  return (
    <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full border text-xs font-mono font-medium ${statusConfig.bg} ${statusConfig.border} ${statusConfig.textCol}`}>
      <span className="relative flex h-2 w-2">
        {showPulse && status !== 'offline' && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${statusConfig.indicator}`} />
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${statusConfig.indicator}`} />
      </span>
      <span>{statusConfig.text}</span>
    </div>
  );
};