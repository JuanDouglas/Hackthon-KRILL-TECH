import { Borrower } from '../types/borrower';
import { executeAgentColetor, CollectorRawData } from './agentColetor';
import { executeAgentAgroClima, AgroClimaticAnalysisResult } from './agentAgroClima';
import { executeAgentScoring } from './agentScoring';
import { executeAgentSintetizador, SynthesizedReport } from './agentSintetizador';
import { FullScoreResult } from '../types/score';
import { AgentStepLog, PipelineState, AgentId } from '../types/agents';
import { EwsAlert, SimulationTriggerType, PortfolioEntity } from '../types/monitoring';

export interface FullPipelineExecutionResult {
  collectorData: CollectorRawData;
  agroAnalysis: AgroClimaticAnalysisResult;
  scoreResult: FullScoreResult;
  report: SynthesizedReport;
  allLogs: AgentStepLog[];
}

export function runFullPipeline(
  borrower: Borrower,
  onStepUpdate?: (state: Partial<PipelineState>) => void,
  onNewLog?: (log: AgentStepLog) => void
): FullPipelineExecutionResult {
  const allLogs: AgentStepLog[] = [];

  const handleLog = (log: AgentStepLog) => {
    allLogs.push(log);
    if (onNewLog) onNewLog(log);
  };

  // 1. Agente Coletor & Parser
  const { rawData: collectorData, logs: colLogs } = executeAgentColetor(borrower, handleLog);

  // 2. Agente Risco Agro & Climático
  const { analysis: agroAnalysis, logs: agroLogs } = executeAgentAgroClima(borrower, collectorData, handleLog);

  // 3. Motor de Decisão & Scoring
  const { scoreResult, logs: scoreLogs } = executeAgentScoring(borrower, collectorData, agroAnalysis, handleLog);

  // 4. Agente Sintetizador & watsonx.ai
  const { report, logs: repLogs } = executeAgentSintetizador(borrower, collectorData, agroAnalysis, scoreResult, handleLog);

  return {
    collectorData,
    agroAnalysis,
    scoreResult,
    report,
    allLogs,
  };
}

export function simulateMonitoringTrigger(
  borrower: Borrower,
  triggerType: SimulationTriggerType
): { newAlert: EwsAlert; updatedEntity: Partial<PortfolioEntity>; log: AgentStepLog } {
  const timestamp = new Date().toLocaleTimeString('pt-BR', { hour12: false });
  const alertId = `alt-sim-${Date.now()}`;

  let title = '';
  let detail = '';
  let source = '';
  let impact = -80;
  let freq: 'IMMEDIATE_24H' | 'MONTHLY_AUTOMATED' | 'SEASONAL_HARVEST' = 'IMMEDIATE_24H';
  let severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' = 'HIGH';
  let actionRequired = '';

  switch (triggerType) {
    case 'DATAJUD_EXECUTION':
      freq = 'IMMEDIATE_24H';
      severity = 'CRITICAL';
      source = 'DataJud (CNJ API Pública)';
      title = 'Alerta 24h: Nova Execução de Título Extrajudicial ajuizada (R$ 1.850.000)';
      detail = 'Distribuição detectada na 1ª Vara Cível da Comarca. Exequente: Trader Multinacional de Grãos. Prazo de citação: 3 dias.';
      impact = -140;
      actionRequired = 'Bloquear novas operações e notificar time jurídico para averiguação de preferência.';
      break;

    case 'DATAJUD_RJ_FILING':
      freq = 'IMMEDIATE_24H';
      severity = 'CRITICAL';
      source = 'DataJud (Vara Regional de Recuperação Judicial e Falência)';
      title = 'ALERTA MÁXIMO 24h: Distribuição de Pedido de Recuperação Judicial';
      detail = 'Petição inicial de RJ protocolada sob segredo de justiça parcial. Pedido de stay period de 180 dias contra credores.';
      impact = -320;
      actionRequired = 'Acionar Comitê de Crise imediatamente. Habilitação de crédito nos autos da RJ em até 15 dias.';
      break;

    case 'PGFN_ACTIVE_DEBT':
      freq = 'MONTHLY_AUTOMATED';
      severity = 'HIGH';
      source = 'PGFN / Dívida Ativa da União';
      title = 'Verificação Mensal: Nova Inscrição em Dívida Ativa da União (R$ 840.000)';
      detail = 'Débitos tributários de PIS/COFINS e IRPJ inscritos na DAU com emissão de Certidão Positiva de Débitos.';
      impact = -90;
      actionRequired = 'Solicitar Certidão Positiva com Efeitos de Negativa (CPEN) ou adesão ao programa de transação tributária.';
      break;

    case 'INMET_DROUGHT_SPIKE':
      freq = 'SEASONAL_HARVEST';
      severity = 'HIGH';
      source = 'INMET / Monitor de Secas';
      title = 'Verificação de Safra: Anomalia Hídrica Severa (-45% no ciclo reprodutivo)';
      detail = 'Veranico de 26 dias consecutivos com precipitação nula na fase R4 de enchimento de vagens/espigas.';
      impact = -110;
      actionRequired = 'Exigir laudo agronômico presencial e formalização de CPR física com colheita vinculada.';
      break;

    case 'ZARC_WINDOW_VIOLATION':
      freq = 'SEASONAL_HARVEST';
      severity = 'CRITICAL';
      source = 'ZARC (Portaria MAPA) / SICAR';
      title = 'Alerta de Safra: Plantio Declarado Fora da Janela ZARC (+22 dias)';
      detail = 'Produtor realizou o plantio após o fechamento da janela climática de menor risco. Risco de perda elevado sem cobertura oficial.';
      impact = -130;
      actionRequired = 'Reclassificar operação para Rating C/D e condicionar fornecimento a garantia real.';
      break;

    case 'QSA_SUSPICIOUS_CHANGE':
      freq = 'MONTHLY_AUTOMATED';
      severity = 'MEDIUM';
      source = 'Receita Federal / Redesim';
      title = 'Verificação Mensal: Alteração no Quadro de Sócios e Administradores (QSA)';
      detail = 'Saída do sócio fundador e transferência da administração para terceiro sem histórico cadastral prévio.';
      impact = -60;
      actionRequired = 'Solicitar alteração contratual registrada na Junta Comercial e certidões dos novos administradores.';
      break;
  }

  const newAlert: EwsAlert = {
    id: alertId,
    borrowerId: borrower.id,
    borrowerName: borrower.name,
    borrowerType: borrower.type,
    frequency: freq,
    severity,
    source,
    title,
    detail,
    scoreImpact: impact,
    previousRating: 'B',
    newRating: severity === 'CRITICAL' ? 'D' : 'C',
    timestamp,
    isRead: false,
    actionRequired,
  };

  const updatedEntity: Partial<PortfolioEntity> = {
    hasActiveAlert: true,
    alertCount: 1,
    currentRating: newAlert.newRating,
    lastMonitoredAt: timestamp,
  };

  const log: AgentStepLog = {
    id: `log-sim-${Date.now()}`,
    timestamp,
    level: severity === 'CRITICAL' ? 'alert' : 'warn',
    source: `EWS Simulador (${source})`,
    message: `${title} -> Impacto no Score: ${impact} pontos.`,
  };

  return { newAlert, updatedEntity, log };
}
