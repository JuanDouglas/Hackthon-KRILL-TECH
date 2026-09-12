export type AgentId = 
  | 'coletor_parser' 
  | 'risco_agroclima' 
  | 'motor_scoring' 
  | 'sintetizador_watsonx';

export type AgentStatus = 'idle' | 'running' | 'completed' | 'warning' | 'error';

export interface AgentStepLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'success' | 'alert';
  source: string;
  message: string;
  metadata?: Record<string, unknown>;
}

export interface AgentState {
  id: AgentId;
  name: string;
  role: string;
  status: AgentStatus;
  progress: number; // 0 to 100
  logs: AgentStepLog[];
  startedAt?: string;
  finishedAt?: string;
  summaryOutput?: string;
  keyOutputs: { label: string; value: string; badge?: string }[];
}

export interface PipelineState {
  currentAgentIndex: number;
  isRunning: boolean;
  isComplete: boolean;
  totalProgress: number;
  agents: Record<AgentId, AgentState>;
}
