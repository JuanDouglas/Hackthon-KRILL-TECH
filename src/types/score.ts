export type RatingBand = 'A' | 'B' | 'C' | 'D';

export interface ScoreDimension {
  id: 'processualJuridico' | 'agronomicoClimatico' | 'fiscalTrabalhista' | 'cadastralSocietario' | 'territorialAmbiental';
  title: string;
  officialSource: string;
  weightPercent: number; // 30, 25, 20, 15, 10
  maxScore: number; // 300, 250, 200, 150, 100
  earnedScore: number;
  weightOfEvidenceRtl: string; // Racional técnico e justificativa explicável
  signals: {
    name: string;
    value: string | number | boolean;
    status: 'OPTIMAL' | 'MODERATE' | 'ADVERSE' | 'CRITICAL';
    scoreImpact: number; // pontos adicionados ou deduzidos
    detail: string;
  }[];
}

export interface RedFlag {
  id: string;
  title: string;
  source: string;
  isActive: boolean;
  severity: 'CRITICA' | 'ALTA' | 'MODERADA';
  description: string;
  detectedAt?: string;
}

export interface OperationalRecommendation {
  rating: RatingBand;
  label: string;
  creditPolicy: 'LIBERADO_PADRAO' | 'PRAZO_REDUZIDO' | 'GARANTIA_ADICIONAL_CPR' | 'BLOQUEIO_CREDITO';
  paymentTermsDays: number;
  mandatoryCollateral: string;
  psrInsuranceRequirement: string;
  monitoringFrequency: 'TRIMESTRAL_AUTO' | 'MENSAL_INTENSIVO' | 'SEMANAL_ALERTA_RJ' | 'ANUAL_SAFRA';
  executiveSummary: string;
  legalCaveatStayPeriod: string; // Ressalva de bens de capital essenciais no stay period (STJ)
}

export interface TemporalPdPrediction {
  pd6MonthsPercent: number; // Probabilidade de Default em 6 meses (Seção 6 do Edital)
  pd12MonthsPercent: number; // Probabilidade de Default em 12 meses
  pd24MonthsPercent: number; // Probabilidade de Default em 24 meses
  rjRiskHorizon: 'BAIXO' | 'MODERADO' | 'ELEVADO' | 'CRITICO';
  confidenceIntervalPercent: number;
}

export interface OrchestrateAction {
  actionTriggered: boolean;
  targetSystem: 'SAP_S4HANA' | 'TOTVS_PROTHEUS' | 'INTERNAL_CREDIT_DESK';
  actionType: 'ERP_CREDIT_LOCK' | 'REDUCE_TERMS' | 'EXPEDITE_GRAIN_ARREST' | 'STANDARD_APPROVAL';
  status: 'EXECUTADO_T0H' | 'AGUARDANDO_COMITE' | 'CONCLUIDO';
  timestamp: string;
  auditHash: string;
}

export interface FullScoreResult {
  totalScore: number; // 0 a 1000
  rating: RatingBand;
  dimensions: ScoreDimension[];
  activeRedFlags: RedFlag[];
  allRedFlags: RedFlag[];
  recommendation: OperationalRecommendation;
  evaluatedAt: string;
  temporalPd: TemporalPdPrediction; // Horizontes de 6, 12 e 24 meses
  orchestrateAction: OrchestrateAction; // Automação via watsonx Orchestrate
  derivedAgroClimaticScore: number; // 0 a 100
  zarcCompliance: {
    isInWindow: boolean;
    windowStart: string;
    windowEnd: string;
    actualPlantingDate: string;
    deviationDays: number;
    status: 'DENTRO_DA_JANELA' | 'DESVIO_MODERADO' | 'FORA_DA_JANELA';
  };
  inmetAnomaly: {
    historicalAverageMm: number;
    actualPrecipitationMm: number;
    anomalyPercent: number; // ex: -38%
    severity: 'NORMAL' | 'DEFICIT_MODERADO' | 'SECA_SEVERA' | 'EXCESSO_HIDRICO';
  };
  methodologyNote: string; // Explicação técnica de por que WoE/Scorecard e não PD caixa-preta
}
