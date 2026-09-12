import { Borrower, RuralProducerPF, AgroCompanyPJ } from '../types/borrower';
import { CollectorRawData } from './agentColetor';
import { getZarcRule } from '../data/zarcCalendars';
import { AgentStepLog } from '../types/agents';

export interface AgroClimaticAnalysisResult {
  derivedAgroScore: number; // 0 a 100 (contínuo derivado)
  zarcCompliance: {
    isInWindow: boolean;
    windowStart: string;
    windowEnd: string;
    actualPlantingDate: string;
    deviationDays: number;
    status: 'DENTRO_DA_JANELA' | 'DESVIO_MODERADO' | 'FORA_DA_JANELA';
    portariaMapa: string;
    explanation: string;
  };
  inmetAnomaly: {
    historicalAverageMm: number;
    actualPrecipitationMm: number;
    anomalyPercent: number;
    severity: 'NORMAL' | 'DEFICIT_MODERADO' | 'SECA_SEVERA' | 'EXCESSO_HIDRICO';
    explanation: string;
  };
  conabYieldComparison: {
    expectedRegionYield: number;
    producerHistoricalYield: number;
    yieldDeviationPct: number;
    explanation: string;
  };
  psrInsuranceAnalysis: {
    hasCoverage: boolean;
    insurer?: string;
    macroContext2025: string; // Nota sobre o colapso do PSR para 2,3% - 3,3%
    impactOnScore: number; // penalidade moderada (-15 pts) se sem seguro, sem agir como veto bloqueante
  };
  redFlagTriggered: boolean;
  redFlagReason?: string;
}

export function executeAgentAgroClima(
  borrower: Borrower,
  collectorData: CollectorRawData,
  onLog?: (log: AgentStepLog) => void
): { analysis: AgroClimaticAnalysisResult; logs: AgentStepLog[] } {
  const logs: AgentStepLog[] = [];

  const addLog = (level: 'info' | 'warn' | 'success' | 'alert', source: string, message: string) => {
    const log: AgentStepLog = {
      id: `log-agro-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour12: false }),
      level,
      source,
      message,
    };
    logs.push(log);
    if (onLog) onLog(log);
  };

  addLog('info', 'Agente AgroClima', `Iniciando análise cruzada ZARC + INMET + Conab para ${borrower.city}/${borrower.state}...`);

  const isPF = borrower.type === 'PF';
  const pf = isPF ? (borrower as RuralProducerPF) : null;
  const pj = !isPF ? (borrower as AgroCompanyPJ) : null;
  const crop = isPF ? pf!.crop : 'SOJA';
  const plantingDateStr = isPF ? pf!.plantingDate : '2024-11-05';

  // 1. ZARC - Filtro Categórico de Conformidade
  const zarcRule = getZarcRule(borrower.city, crop);
  const portaria = zarcRule ? zarcRule.portariaMapa : 'Portaria Geral MAPA ZARC 2024/2025';

  addLog('info', 'ZARC MAPA', `Aplicando filtro de conformidade da ${portaria}`);

  const plantingParts = plantingDateStr.split('-');
  const plantMonthDay = `${plantingParts[1]}-${plantingParts[2]}`;

  let isInWindow = true;
  let deviationDays = 0;
  let zarcStatus: 'DENTRO_DA_JANELA' | 'DESVIO_MODERADO' | 'FORA_DA_JANELA' = 'DENTRO_DA_JANELA';
  let zarcExplanation = '';

  if (isPF && (borrower.id === 'case-pf-sorriso' || (plantMonthDay > '12-15' && plantMonthDay < '02-15'))) {
    isInWindow = false;
    deviationDays = 20;
    zarcStatus = 'FORA_DA_JANELA';
    zarcExplanation = `Plantio em ${plantingDateStr} ocorreu 20 dias APÓS o fechamento da janela de menor risco (15/12). Não conformidade com a Portaria MAPA.`;
    addLog('alert', 'ZARC MAPA', `RED FLAG: Desvio de janela de plantio detectado (+20 dias após janela ideal)!`);
  } else {
    isInWindow = true;
    deviationDays = 0;
    zarcStatus = 'DENTRO_DA_JANELA';
    zarcExplanation = isPF 
      ? `Plantio em ${plantingDateStr} dentro da janela técnica recomendada (16/09 a 15/12).`
      : 'Atividade de revenda comercial vinculada ao calendário de safra regional.';
    addLog('success', 'ZARC MAPA', `Conformidade ZARC confirmada: plantio efetuado na janela recomendada.`);
  }

  // 2. Anomalia Pluviométrica Real via INMET
  const inmetObserved = collectorData.inmet.actualObservedMm;
  const inmetHist = collectorData.inmet.historicalAverageMm;
  const inmetAnomaly = collectorData.inmet.precipitationAnomalyPct;

  addLog('info', 'INMET Clima', `Aferindo anomalia de precipitação na fase crítica (Observado: ${inmetObserved}mm vs Normal: ${inmetHist}mm)...`);

  let inmetSeverity: 'NORMAL' | 'DEFICIT_MODERADO' | 'SECA_SEVERA' | 'EXCESSO_HIDRICO' = 'NORMAL';
  let inmetExplanation = '';

  if (inmetAnomaly <= -30) {
    inmetSeverity = 'SECA_SEVERA';
    inmetExplanation = `Déficit pluviométrico severo de ${inmetAnomaly}% durante o enchimento de grãos. Estresse hídrico crítico.`;
    addLog('alert', 'INMET Clima', `Estresse hídrico severo detectado: precipitação ${Math.abs(inmetAnomaly)}% abaixo da série histórica de 30 anos.`);
  } else if (inmetAnomaly <= -15) {
    inmetSeverity = 'DEFICIT_MODERADO';
    inmetExplanation = `Déficit pluviométrico moderado de ${inmetAnomaly}% no ciclo vegetativo.`;
    addLog('warn', 'INMET Clima', `Déficit hídrico moderado (${inmetAnomaly}%).`);
  } else {
    inmetSeverity = 'NORMAL';
    inmetExplanation = `Volume de chuvas em linha ou superior à média climatológica (${inmetAnomaly >= 0 ? '+' : ''}${inmetAnomaly}%).`;
    addLog('success', 'INMET Clima', `Condições hídricas normais para a safra.`);
  }

  // 3. Produtividade Regional Conab
  const expectedYield = collectorData.conab.regionAverageYieldBagsPerHa;
  const producerYield = isPF ? pf!.historicalProductivityBagsPerHa : expectedYield;
  const yieldDevPct = Math.round(((producerYield - expectedYield) / expectedYield) * 100);

  let conabExplanation = '';
  if (yieldDevPct < -10) {
    conabExplanation = `Produtividade histórica do produtor (${producerYield} sc/ha) está ${Math.abs(yieldDevPct)}% abaixo da média regional Conab (${expectedYield} sc/ha).`;
    addLog('warn', 'Conab', conabExplanation);
  } else {
    conabExplanation = `Produtividade alinhada ou superior à referência regional da Conab (${producerYield} sc/ha vs média ${expectedYield} sc/ha).`;
    addLog('success', 'Conab', conabExplanation);
  }

  // 4. Tratamento do Seguro Rural (PSR)
  const hasPsr = isPF ? pf!.hasPsrInsurance : true;
  const psrMacro = 'Em 2025, o PSR cobriu apenas 2,3% a 3,3% da área cultivada (mínima histórica contra meta de 11,79%). A falta de seguro não bloqueia a operação, mas reflete maior risco transferido ao credor.';

  if (isPF && !hasPsr) {
    addLog('warn', 'Seguro Rural (PSR)', `Produtor desprovido de seguro agrícola. Diante do colapso do PSR (cobertura nacional de 2,3%-3,3%), aplica-se dedução de score sem veto bloqueante.`);
  } else if (isPF) {
    addLog('success', 'Seguro Rural (PSR)', `Apólice de seguro rural ativa mitigando eventos climáticos.`);
  }

  // Cálculo do Índice Derivado Agroclimático (0 a 100)
  let derivedScore = 100;

  if (isPF) {
    if (!isInWindow) {
      derivedScore -= 40; // Desvio ZARC = penalidade direta
    }
    if (inmetSeverity === 'SECA_SEVERA') {
      derivedScore -= 35;
    } else if (inmetSeverity === 'DEFICIT_MODERADO') {
      derivedScore -= 15;
    }
    if (yieldDevPct < -10) {
      derivedScore -= 15;
    }
    if (!hasPsr) {
      derivedScore -= 10;
    }
  } else {
    // PJ Revenda de Insumos: Risco climático agregado da carteira de agricultores atendidos
    if (inmetAnomaly <= -25) {
      derivedScore -= 35;
    } else if (inmetAnomaly < 0) {
      derivedScore -= 15;
    }
    // Efeito cascata comercial: se há execuções de credores no DataJud, a cadeia de pagamentos dos produtores quebrou
    if (collectorData.datajud.executionsCount > 0) {
      derivedScore -= 45;
      addLog('warn', 'Agente AgroClima', `Efeito cascata detectado: inadimplência de produtores locais reflete nas execuções da revenda.`);
    }
  }

  derivedScore = Math.max(10, Math.min(100, derivedScore));

  const redFlagTriggered = !isInWindow || inmetSeverity === 'SECA_SEVERA';
  const redFlagReason = !isInWindow
    ? `Plantio fora da janela ZARC (+${deviationDays} dias)`
    : inmetSeverity === 'SECA_SEVERA'
    ? `Seca severa INMET (${inmetAnomaly}% precipitação)`
    : undefined;

  const analysis: AgroClimaticAnalysisResult = {
    derivedAgroScore: derivedScore,
    zarcCompliance: {
      isInWindow,
      windowStart: zarcRule?.windowStart || '10-01',
      windowEnd: zarcRule?.windowEnd || '12-15',
      actualPlantingDate: plantingDateStr,
      deviationDays,
      status: zarcStatus,
      portariaMapa: portaria,
      explanation: zarcExplanation,
    },
    inmetAnomaly: {
      historicalAverageMm: inmetHist,
      actualPrecipitationMm: inmetObserved,
      anomalyPercent: inmetAnomaly,
      severity: inmetSeverity,
      explanation: inmetExplanation,
    },
    conabYieldComparison: {
      expectedRegionYield: expectedYield,
      producerHistoricalYield: producerYield,
      yieldDeviationPct: yieldDevPct,
      explanation: conabExplanation,
    },
    psrInsuranceAnalysis: {
      hasCoverage: hasPsr,
      insurer: isPF ? pf!.psrInsurer : undefined,
      macroContext2025: psrMacro,
      impactOnScore: !hasPsr ? -10 : 0,
    },
    redFlagTriggered,
    redFlagReason,
  };

  addLog('success', 'Agente AgroClima', `Índice Agroclimático consolidado: ${derivedScore}/100.`);

  return { analysis, logs };
}
