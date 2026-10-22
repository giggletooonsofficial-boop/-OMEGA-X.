import React from 'react';
import { Sparkles, ArrowRight, Construction } from 'lucide-react';

interface PlaceholderViewProps {
  title: string;
  phase: string;
  targetGoal: string;
  dependencies: string[];
}

export const PlaceholderView: React.FC<PlaceholderViewProps> = ({
  title,
  phase,
  targetGoal,
  dependencies,
}) => {
  return (
    <div className="border border-omega-800 rounded-xl bg-omega-900/60 p-8 text-center max-w-2xl mx-auto my-12 shadow-sm">
      <div className="inline-flex p-3 rounded-2xl bg-omega-850 border border-omega-700 text-omega-accent mb-4">
        <Construction className="w-8 h-8" />
      </div>

      <div className="inline-block px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-800/80 text-omega-accent text-xs font-mono font-medium mb-3">
        {phase} TARGET
      </div>

      <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
      <p className="text-slate-400 text-sm mb-6 max-w-lg mx-auto">
        {targetGoal}
      </p>

      <div className="text-left bg-omega-950 border border-omega-850 rounded-lg p-4 font-mono text-xs mb-6">
        <div className="text-slate-300 text-[10px] uppercase tracking-wider mb-2 font-bold flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-omega-accent" />
          <span>Architecture Prerequisites (Server Isolated)</span>
        </div>
        <div className="space-y-1.5">
          {dependencies.map((dep, idx) => (
            <div key={idx} className="flex items-center gap-2 text-slate-300">
              <ArrowRight className="w-3 h-3 text-cyan-400" />
              <span>{dep}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-slate-300 font-mono">
        Strict Phase 1 rule: Core shell & verified server telemetry are enabled. Agent execution will be provisioned in Phase 2.
      </p>
    </div>
  );
};