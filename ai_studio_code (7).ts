import React from 'react';
import { 
  LayoutDashboard, 
  Terminal, 
  Bot, 
  ShieldCheck, 
  Cpu, 
  BookOpen, 
  Settings, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { NavigationId } from '../../types';

interface SidebarProps {
  currentTab: NavigationId;
  onSelectTab: (tab: NavigationId) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

interface NavItem {
  id: NavigationId;
  label: string;
  icon: React.ElementType;
  phase: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, phase: 'P1' },
  { id: 'workspace', label: 'AI Workspace', icon: Terminal, phase: 'P2' },
  { id: 'agent-studio', label: 'Agent Studio', icon: Bot, phase: 'P2' },
  { id: 'security-lab', label: 'Security Lab', icon: ShieldCheck, phase: 'P3' },
  { id: 'model-providers', label: 'Model Providers', icon: Cpu, phase: 'P2' },
  { id: 'research-library', label: 'Research Library', icon: BookOpen, phase: 'P3' },
  { id: 'settings', label: 'Settings', icon: Settings, phase: 'P1' },
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  collapsed,
}) => {
  return (
    <aside 
      className={`h-screen bg-omega-950 border-r border-omega-800/80 flex flex-col transition-all duration-300 z-20 select-none ${
        collapsed ? 'w-20' : 'w-64'
      }`}
      aria-label="Sidebar navigation"
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center px-4 border-b border-omega-800/80 gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-omega-accent via-cyan-600 to-blue-700 flex items-center justify-center shadow-lg shadow-cyan-500/20 shrink-0">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <div className="font-extrabold text-base tracking-wider text-white flex items-center gap-1.5">
              <span>OMEGA</span>
              <span className="text-omega-accent">X</span>
            </div>
            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Research v1.0</p>
          </div>
        )}
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
        <div className={`px-2 pb-2 text-[10px] font-mono tracking-wider text-slate-300 uppercase ${collapsed ? 'text-center' : ''}`}>
          {collapsed ? 'NAV' : 'Platform Modules'}
        </div>
        
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all group relative ${
                isActive
                  ? 'bg-omega-800/90 text-white shadow-sm border border-omega-700/60'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-omega-900/80 border border-transparent'
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-omega-accent rounded-r-md" />
              )}
              
              <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-omega-accent' : 'text-slate-400 group-hover:text-slate-200'}`} />
              
              {!collapsed && (
                <div className="flex-1 flex items-center justify-between text-left">
                  <span className="truncate">{item.label}</span>
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                    item.phase === 'P1' 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-omega-800 text-slate-400'
                  }`}>
                    {item.phase}
                  </span>
                </div>
              )}

              {collapsed && (
                <span className="sr-only">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-3 border-t border-omega-800/80 bg-omega-950/60">
        {!collapsed ? (
          <div className="rounded-lg p-2.5 bg-omega-900/60 border border-omega-800 text-[11px] font-mono">
            <div className="text-slate-400 flex justify-between">
              <span>ACTIVE ARCH</span>
              <span className="text-omega-accent">BUILD MODE</span>
            </div>
            <div className="text-[10px] text-slate-300 mt-1 truncate">
              Credentials: Isolated Server
            </div>
          </div>
        ) : (
          <div className="flex justify-center text-slate-300">
            <ChevronRight className="w-4 h-4" />
          </div>
        )}
      </div>
    </aside>
  );
};