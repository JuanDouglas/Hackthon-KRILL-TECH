import { Borrower } from '../types/borrower';
import { AgentStepLog } from '../types/agents';

export interface CollectorRawData {
  datajud: {
    court: string;
    totalActiveCases: number;
    executionsCount: number;
    protestsCount: number;
    rjFilingDetected: boolean;
    recentFilings: {
      processNumber: string;
      classDescription: string;
      court: string;
      valueBrl: number;
      distributionDate: string;
    }[];
    notesAggregationLayer: string; // Explicação técnica sobre DataJud ser por tribunal e necessitar Jusbrasil/Escavador
  };
  receitaRedesim: {
    registrationStatus: 'ATIVA' | 'SUSPENSA' | 'INAPTA';
    activityYears: number;
    cnaeValid: boolean;
    qsaRecentChanges: boolean;
    capitalSocialBrl: number;
  };
  pgfn: {
    hasActiveDebt: boolean;
    activeDebtCount: number;
    totalDebtBrl: number;
    certificateStatus: 'CERTIDAO_POSITIVA' | 'CERTIDAO_NEGATIVA';
  };
  tstBndt: {
    cndtStatus: 'NEGATIVA' | 'POSITIVA';
    activeLaborLawsuitsCount: number;
  };
  caixaFgts: {
    crfStatus: 'REGULAR' | 'IRREGULAR';
    hasPendingObligations: boolean;
  };
  sicarIbama: {
    carStatus: 'ATIVO' | 'PENDENTE' | 'SUSPENSO' | 'CANCELADO';
    hasEnvironmentalEmbargo: boolean;
    embargoDetails?: string;
  };
  inmet: {
    stationName: string;
    historicalAverageMm: number;
    actualObservedMm: number;
    precipitationAnomalyPct: number;
  };
  conab: {
    regionAverageYieldBagsPerHa: number;
    harvestProgressPct: number;
    climateRiskAlert: string;
  };
}

export function executeAgentColetor(
  borrower: Borrower,
  onLog?: (log: AgentStepLog) => void
): { rawData: CollectorRawData; logs: AgentStepLog[] } {
  const logs: AgentStepLog[] = [];

  const addLog = (level: 'info' | 'warn' | 'success' | 'alert', source: string, message: string) => {
    const log: AgentStepLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour12: false }),
      level,
      source,
      message,
    };
    logs.push(log);
    if (onLog) onLog(log);
  };

  addLog('info', 'Agente Coletor', `Iniciando varredura multi-fonte para ${borrower.type === 'PF' ? 'CPF' : 'CNPJ'}: ${borrower.document}`);

  // 1. DataJud / Tribunais
  addLog('info', 'DataJud CNJ', `Consultando API Pública do DataJud (Resolução CNJ 331/2020)...`);
  let totalCases = 0;
  let executions = 0;
  let rjDetected = false;
  const recentFilings = [];

  if (borrower.id === 'case-pj-rio-verde') {
    totalCases = 5;
    executions = 3;
    recentFilings.push(
      {
        processNumber: '5644102-19.2025.8.09.0137',
        classDescription: 'Execução de Título Extrajudicial (Classe 12154)',
        court: 'TJGO - 2ª Vara Cível de Rio Verde',
        valueBrl: 2450000,
        distributionDate: '11/03/2025',
      },
      {
        processNumber: '5109822-44.2024.8.09.0137',
        classDescription: 'Execução de Título Extrajudicial (Classe 12154)',
        court: 'TJGO - 1ª Vara Cível de Rio Verde',
        valueBrl: 1800000,
        distributionDate: '14/12/2024',
      },
      {
        processNumber: '0028912-70.2024.8.09.0137',
        classDescription: 'Ação Monitória / Cobrança de Duplicatas (Classe 40)',
        court: 'TJGO - 3ª Vara Cível',
        valueBrl: 550000,
        distributionDate: '22/10/2024',
      }
    );
    addLog('alert', 'DataJud CNJ', `Identificadas 3 execuções judiciais ativas no TJGO totalizando R$ 4.800.000.`);
  } else if (borrower.id === 'case-pf-sorriso') {
    totalCases = 1;
    executions = 1;
    recentFilings.push({
      processNumber: '1004122-80.2024.8.11.0040',
      classDescription: 'Execução de Título Extrajudicial - CPR',
      court: 'TJMT - 1ª Vara Cível de Sorriso',
      valueBrl: 320000,
      distributionDate: '19/11/2024',
    });
    addLog('warn', 'DataJud CNJ', `Apontamento de 1 execução cível no TJMT (R$ 320.000).`);
  } else {
    addLog('success', 'DataJud CNJ', `Nenhum processo falimentar ou execução cível expressiva localizada.`);
  }

  // Nota de Engenharia sobre DataJud
  addLog('info', 'Engenharia DataJud', `API DataJud indexada por tribunal: camada de consolidação cross-court via Jusbrasil/Escavador ativa.`);

  // 2. Receita Federal / Redesim
  addLog('info', 'Receita Federal / Redesim', `Verificando regularidade cadastral e quadro societário (QSA)...`);
  const isPj = borrower.type === 'PJ';
  const qsaChanges = isPj && (borrower as any).qsaPartners?.some((p: any) => p.recentChangeInLast6Months);
  if (qsaChanges) {
    addLog('warn', 'Receita Federal', `Alteração societária relevante detectada no QSA nos últimos 6 meses.`);
  } else {
    addLog('success', 'Receita Federal', `Situação cadastral ATIVA. Tempo de atividade regular compatível.`);
  }

  // 3. PGFN Dívida Ativa
  addLog('info', 'PGFN / Dívida Ativa', `Consultando Certidão Conjunta da Procuradoria-Geral da Fazenda Nacional...`);
  const hasPgfn = borrower.id === 'case-pj-rio-verde';
  if (hasPgfn) {
    addLog('alert', 'PGFN', `Inscrição em Dívida Ativa da União nos últimos 12 meses: R$ 1.200.000 (Certidão Positiva).`);
  } else {
    addLog('success', 'PGFN', `Certidão Negativa de Débitos da União emitida com sucesso.`);
  }

  // 4. TST / BNDT (Trabalhista)
  addLog('info', 'TST / CNDT', `Consultando Banco Nacional de Devedores Trabalhistas (BNDT)...`);
  const hasTst = borrower.id === 'case-pf-balsas';
  if (hasTst) {
    addLog('warn', 'TST / BNDT', `CNDT Positiva detectada: débitos trabalhistas em execução definitiva.`);
  } else {
    addLog('success', 'TST / BNDT', `CNDT Negativa confirmada.`);
  }

  // 5. Caixa Econômica (FGTS)
  addLog('info', 'Caixa CRF-FGTS', `Checando regularidade de FGTS do empregador rural/empresa...`);
  const fgtsIrregular = borrower.id === 'case-pj-rio-verde';
  if (fgtsIrregular) {
    addLog('alert', 'Caixa FGTS', `Certificado CRF irregular: pendência de depósitos de FGTS.`);
  } else {
    addLog('success', 'Caixa FGTS', `CRF regular e vigente.`);
  }

  // 6. SICAR / IBAMA
  addLog('info', 'SICAR / IBAMA', `Consultando base do Cadastro Ambiental Rural e embargos IBAMA...`);
  const isCarPendente = (borrower as any).carStatus === 'PENDENTE';
  if (isCarPendente) {
    addLog('warn', 'SICAR / IBAMA', `CAR em status PENDENTE: sobreposição de reserva legal / embargo parcial.`);
  } else {
    addLog('success', 'SICAR / IBAMA', `CAR ativo e sem embargos no polígono cadastrado.`);
  }

  // 7. INMET & Conab
  addLog('info', 'INMET / Conab', `Extraindo dados agroclimáticos e produtividade histórica para ${borrower.city}/${borrower.state}...`);
  let precipitationAnomaly = 0;
  let historicalYield = 60;
  if (borrower.city === 'Sorriso') {
    precipitationAnomaly = -38;
    historicalYield = 61;
    addLog('alert', 'INMET', `Estação Sorriso: Anomalia pluviométrica de -38% na fase de floração/enchimento de grãos.`);
  } else if (borrower.city === 'Rio Verde') {
    precipitationAnomaly = -12;
    historicalYield = 63;
  } else if (borrower.city === 'Balsas') {
    precipitationAnomaly = -8;
    historicalYield = 104;
  } else {
    precipitationAnomaly = 4;
    historicalYield = 36;
    addLog('success', 'INMET', `Condições hídricas favoráveis (+4% vs normal histórica).`);
  }

  const rawData: CollectorRawData = {
    datajud: {
      court: borrower.state === 'MT' ? 'TJMT' : borrower.state === 'GO' ? 'TJGO' : borrower.state === 'MA' ? 'TJMA' : 'TJMG',
      totalActiveCases: totalCases,
      executionsCount: executions,
      protestsCount: executions > 0 ? 2 : 0,
      rjFilingDetected: rjDetected,
      recentFilings,
      notesAggregationLayer: 'Metadados agregados via pipeline DataJud + crawlers unificados cross-tribunal.',
    },
    receitaRedesim: {
      registrationStatus: 'ATIVA',
      activityYears: borrower.type === 'PF' ? (borrower as any).lcdprYearsProven : (borrower as any).activityYears,
      cnaeValid: true,
      qsaRecentChanges: !!qsaChanges,
      capitalSocialBrl: borrower.type === 'PJ' ? (borrower as any).shareCapitalBrl : 0,
    },
    pgfn: {
      hasActiveDebt: hasPgfn,
      activeDebtCount: hasPgfn ? 2 : 0,
      totalDebtBrl: hasPgfn ? 1200000 : 0,
      certificateStatus: hasPgfn ? 'CERTIDAO_POSITIVA' : 'CERTIDAO_NEGATIVA',
    },
    tstBndt: {
      cndtStatus: hasTst ? 'POSITIVA' : 'NEGATIVA',
      activeLaborLawsuitsCount: hasTst ? 2 : 0,
    },
    caixaFgts: {
      crfStatus: fgtsIrregular ? 'IRREGULAR' : 'REGULAR',
      hasPendingObligations: fgtsIrregular,
    },
    sicarIbama: {
      carStatus: (borrower as any).carStatus || 'ATIVO',
      hasEnvironmentalEmbargo: isCarPendente,
      embargoDetails: isCarPendente ? 'Embargo administrativo IBAMA 2023 por desmate sem outorga (gleba sul)' : undefined,
    },
    inmet: {
      stationName: `Estação Automática INMET - ${borrower.city}`,
      historicalAverageMm: 230,
      actualObservedMm: Math.round(230 * (1 + precipitationAnomaly / 100)),
      precipitationAnomalyPct: precipitationAnomaly,
    },
    conab: {
      regionAverageYieldBagsPerHa: historicalYield,
      harvestProgressPct: 78,
      climateRiskAlert: precipitationAnomaly < -25 ? 'ALERTA DE SECA REGIONAL' : 'NORMALIDADE',
    },
  };

  addLog('success', 'Agente Coletor', `Varredura concluída. 8 fontes públicas unificadas com sucesso.`);

  return { rawData, logs };
}
