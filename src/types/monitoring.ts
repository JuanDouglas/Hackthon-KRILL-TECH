import { RatingBand } from './score';

export type AlertFrequency = 'IMMEDIATE_24H' | 'MONTHLY_AUTOMATED' | 'SEASONAL_HARVEST';
export type AlertSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface EwsAlert {
  id: string;
  borrowerId: string;
  borrowerName: string;
  borrowerType: 'PF' | 'PJ';
  frequency: AlertFrequency;
  severity: AlertSeverity;
  source: string; // DataJud, PGFN, TST, INMET, ZARC, Receita
  title: string;
  detail: string;
  scoreImpact: number; // ex: -120 pts
  previousRating: RatingBand;
  newRating: RatingBand;
  timestamp: string;
  isRead: boolean;
  actionRequired: string;
  isSimulated?: boolean;
  simulationScenario?: string;
}

export type SimulationTriggerType = 
  | 'DATAJUD_EXECUTION'
  | 'DATAJUD_RJ_FILING'
  | 'PGFN_ACTIVE_DEBT'
  | 'INMET_DROUGHT_SPIKE'
  | 'ZARC_WINDOW_VIOLATION'
  | 'QSA_SUSPICIOUS_CHANGE';

export interface PortfolioEntity {
  id: string;
  name: string;
  document: string;
  type: 'PF' | 'PJ';
  location: string;
  cropOrSector: string;
  exposureBrl: number;
  currentScore: number;
  currentRating: RatingBand;
  hasActiveAlert: boolean;
  alertCount: number;
  lastMonitoredAt: string;
  nextScheduledCheck: string;
  // Campos de Simulação de Crise e Estresse Setorial
  crisisSimulatedScore?: number;
  crisisSimulatedRating?: RatingBand;
  crisisTechnicalDefault?: boolean;
  crisisStressTrigger?: string;
}
