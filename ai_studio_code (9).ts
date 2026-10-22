import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { NavigationId } from '../../types';
import { useHealthCheck } from '../../hooks/useHealthCheck';
import { DashboardView } from '../views/DashboardView';
import { PlaceholderView } from '../views/PlaceholderView';

export const Shell: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<NavigationId>('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const health = useHealthCheck(12000);

  const renderContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return (
          <DashboardView 
            health={health.data} 
            loading={health.loading} 
            error={health.error} 
            latencyMs={health.latencyMs} 
            onRefresh={health.refetch} 
          />
        );
      case 'workspace':
        return (
          <PlaceholderView 
            title="AI Research Workspace" 
            phase="Phase 2" 
            targetGoal="Multi-turn reasoning, prompt engineering canvas, and streaming sandbox." 
            dependencies={['Agent Registry', 'Streaming API Gateway', 'Provider Keys']} 
          />
        );
      case 'agent-studio':
        return (
          <PlaceholderView 
            title="Autonomous Agent Studio" 
            phase="Phase 2" 
            targetGoal="DAG-based agent orchestration, self-reflection loops, and tool execution pipeline." 
            dependencies={['Execution Sandbox', 'Vector Long-Term Memory']} 
          />
        );
      case 'security-lab':
        return (
          <PlaceholderView 
            title="Security & Adversarial Lab" 
            phase="Phase 3" 
            targetGoal="Prompt injection red-teaming, jailbreak analysis, and differential privacy checks." 
            dependencies={['Agent Studio Output', 'Red Team Datasets']} 
          />
        );
      case 'model-providers':
        return (
          <PlaceholderView 
            title="Model Providers Hub" 
            phase="Phase 2" 
            targetGoal="Server-side credential configuration for Gemini 1.5 Pro, Flash, and local models." 
            dependencies={['Server Environment Vault']} 
          />
        );
      case 'research-library':
        return (
          <PlaceholderView 
            title="Research Library & Artifacts" 
            phase="Phase 3" 
            targetGoal="Curated benchmark papers, experiment snapshots, and reproducible test matrices." 
            dependencies={['PostgreSQL / SQLite Artifact Store']} 
          />
        );
      case 'settings':
        return (
          <PlaceholderView 
            title="Platform Settings & Topology" 
            phase="Phase 1 (Extended)" 
            targetGoal="Manage telemetry polling intervals, theme configuration, and logging verbosity." 
            dependencies={['Configuration Engine']} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-omega-950 font-sans text-slate-100">
      <Sidebar 
        currentTab={currentTab} 
        onSelectTab={setCurrentTab} 
        collapsed={collapsed} 
        onToggleCollapse={() => setCollapsed(!collapsed)} 
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header 
          healthData={health.data} 
          loading={health.loading} 
          error={health.error} 
          latencyMs={health.latencyMs} 
          onRefresh={health.refetch} 
          collapsed={collapsed} 
          onToggleCollapse={() => setCollapsed(!collapsed)} 
        />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-gradient-to-b from-omega-950 via-omega-900 to-omega-950">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};