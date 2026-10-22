import { useState, useEffect, useCallback, useRef } from 'react';
import { HealthData } from '../types';

interface HealthState {
  data: HealthData | null;
  loading: boolean;
  error: string | null;
  latencyMs: number | null;
  lastChecked: Date | null;
}

export const useHealthCheck = (pollIntervalMs = 15000) => {
  const [state, setState] = useState<HealthState>({
    data: null,
    loading: true,
    error: null,
    latencyMs: null,
    lastChecked: null,
  });

  const isMounted = useRef(true);

  const checkHealth = useCallback(async () => {
    const start = performance.now();
    try {
      setState(prev => ({ ...prev, loading: !prev.data }));
      
      const response = await fetch('/api/health', {
        headers: { 'Accept': 'application/json' },
      });

      const end = performance.now();
      const latency = Math.round(end - start);

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const json: HealthData = await response.json();

      if (isMounted.current) {
        setState({
          data: json,
          loading: false,
          error: null,
          latencyMs: latency,
          lastChecked: new Date(),
        });
      }
    } catch (err: unknown) {
      if (isMounted.current) {
        const message = err instanceof Error ? err.message : 'Connection failed';
        setState(prev => ({
          ...prev,
          loading: false,
          error: message,
          latencyMs: null,
          lastChecked: new Date(),
        }));
      }
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    checkHealth();

    const timer = setInterval(() => {
      checkHealth();
    }, pollIntervalMs);

    return () => {
      isMounted.current = false;
      clearInterval(timer);
    };
  }, [checkHealth, pollIntervalMs]);

  return { ...state, refetch: checkHealth };
};