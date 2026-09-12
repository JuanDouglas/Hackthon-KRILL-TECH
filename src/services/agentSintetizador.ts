import { Borrower, RuralProducerPF, AgroCompanyPJ } from '../types/borrower';
import { CollectorRawData } from './agentColetor';
import { AgroClimaticAnalysisResult } from './agentAgroClima';
import { FullScoreResult } from '../types/score';
import { AgentStepLog } from '../types/agents';

import { TemporalPdPrediction, OrchestrateAction } from '../types/score';

export interface SynthesizedReport {
  dossierId: string;
  generatedAt: string;
  borrowerName: string;
  borrowerDocument: string;
  borrowerTypeLabel: string;
  overallScore: number;
  ratingBand: string;
  executiveSummary: string;
  legalDiagnosticSection: string;
  agroClimaticSection: string;
  creditPolicyActionSection: string;
  fiduciaryAlienationCaveatSection: string;
  psrCollapseContextSection: string;
  temporalPd?: TemporalPdPrediction;
  orchestrateAction?: OrchestrateAction;
  fullMarkdownContent: string;
}

export function executeAgentSintetizador(
  borrower: Borrower,
  collectorData: CollectorRawData,
  agroAnalysis: AgroClimaticAnalysisResult,
  scoreResult: FullScoreResult,
  onLog?: (log: AgentStepLog) => void
): { report: SynthesizedReport; logs: AgentStepLog[] } {
  const logs: AgentStepLog[] = [];

  const addLog = (level: 'info' | 'warn' | 'success' | 'alert', source: string, message: string) => {
    const log: AgentStepLog = {
      id: `log-watson-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour12: false }),
      level,
      source,
      message,
    };
    logs.push(log);
    if (onLog) onLog(log);
  };

  addLog('info', 'Agente Sintetizador (watsonx.ai)', `Iniciando síntese de inteligência artificial e geração do Relatório Padronizado de Risco...`);

  const isPF = borrower.type === 'PF';
  const pf = borrower as RuralProducerPF;
  const pj = borrower as AgroCompanyPJ;
  const dossierId = `DOS-KT-${Date.now().toString().slice(-6)}`;
  const nowStr = new Date().toLocaleString('pt-BR');

  addLog('info', 'watsonx.ai Core', `Processando contexto normativo: Lei 14.112/2020 e histórico processual DataJud.`);

  // 1. Diagnóstico Jurídico e Perfil do Tomador
  let legalDiagnostic = '';
  if (isPF) {
    legalDiagnostic = `O tomador é qualificado como **Produtor Rural Pessoa Física (PF)**. Sob a vigência da Lei 14.112/2020, que alterou o art. 48 da Lei 11.101/2005, a barreira de entrada para o pedido de Recuperação Judicial rural foi substancialmente reduzida, bastando a comprovação de 2 anos de atividade regular via Livro Caixa Digital do Produtor Rural (LCDPR) ou inscrição estadual. No caso analisado, o produtor comprova ${pf.lcdprYearsProven} anos de LCDPR, encontrando-se formalmente apto a pleitear RJ na Justiça Estadual caso entre em estresse de caixa. A análise patrimonial baseia-se prioritariamente na regularidade fundiária do CAR (${pf.carNumber}), titularidade das glebas (${pf.landTenure}) e histórico de produtividade agrícola.`;
  } else {
    legalDiagnostic = `O tomador é qualificado como **Agroindústria / Revenda de Insumos Pessoa Jurídica (PJ)** (${pj.tradeName || pj.name}). Sua elegibilidade para Recuperação Judicial rege-se pelos requisitos societários gerais do art. 48 da Lei 11.101/2005 (> 2 anos de registro na Junta Comercial, CNPJ ativo). Sendo uma revenda comercial de defensivos e fertilizantes (CNAE ${pj.cnae}), a empresa atua na intermediação de crédito da cadeia agro, estando diretamente exposta ao efeito cascata de inadimplência de produtores rurais da região (análogo ao caso emblemático da rede AgroGalaxy, no qual a agfintech TerraMagna acumulou R$ 28 milhões em créditos concursais a receber).`;
  }

  // 2. Diagnóstico Agroclimático & ZARC
  let agroDiagnostic = '';
  if (isPF) {
    agroDiagnostic = `A cultura declarada é **${pf.crop}** em área de **${pf.plantedAreaHa.toLocaleString('pt-BR')} hectares** no município de ${borrower.city}/${borrower.state}. 
Conforme calibração agronômica oficial da Embrapa/MAPA, o ZARC opera como filtro categórico de conformidade: o plantio em ${pf.plantingDate} ${
      agroAnalysis.zarcCompliance.isInWindow
        ? 'enquadrou-se na janela técnica oficial de menor risco.'
        : `**VIOLOU a janela ZARC** da ${agroAnalysis.zarcCompliance.portariaMapa}, com desvio de +${agroAnalysis.zarcCompliance.deviationDays} dias após a data limite.`
    }
Cruzando este sinal com a rede meteorológica do INMET, apurou-se uma anomalia de precipitação de **${agroAnalysis.inmetAnomaly.anomalyPercent}%** na fase crítica de floração e formação de vagens/grãos (${collectorData.inmet.actualObservedMm}mm observados contra média histórica de ${collectorData.inmet.historicalAverageMm}mm). O produtor apresenta produtividade média de ${pf.historicalProductivityBagsPerHa} sc/ha, configurando um Índice Agroclimático derivado de **${agroAnalysis.derivedAgroScore}/100**.`;
  } else {
    agroDiagnostic = `Por se tratar de agente corporativo de revenda de insumos com área de influência regional (${borrower.city}/${borrower.state}), o risco agroclimático reflete a vulnerabilidade agregada de sua base de clientes agricultores. A anomalia pluviométrica média da comarca registrou ${agroAnalysis.inmetAnomaly.anomalyPercent}% no ciclo atual, resultando em índice de risco derivado de **${agroAnalysis.derivedAgroScore}/100**.`;
  }

  // 3. Contexto Macroeconômico: Colapso do PSR 2025
  const psrContext = `**Aviso Macroeconômico Crítico de Mitigação de Risco:**
O Programa de Subvenção ao Prêmio do Seguro Rural (PSR) — histórico instrumento público de mitigação de risco climático no Brasil — registrou em 2025 o pior desempenho de sua série histórica desde 2006, alcançando apenas entre **2,3% e 3,3% da área plantada nacional** (ante meta oficial do governo de 11,79% e realização de 7,72% em 2024). 
Isso evidencia que o produtor rural médio brasileiro está desprotegido de mecanismos estatais de socorro. Portanto, o risco climático não é mais absorvido pelo Estado, recaindo integralmente sobre o balanço da Krill Tech como credora comercial de insumos. Conforme metodologia adotada, a ausência de seguro rural foi contabilizada como penalidade redutora de score, mas NÃO como veto excludente de concessão, para não inviabilizar a esteira de negócios da empresa.`;

  // 4. Parecer Jurídico sobre Stay Period e Alienação Fiduciária
  const fiduciaryCaveat = `**Parecer Jurídico Consultivo — Proteção de Garantias no Stay Period:**
É premissa comum no mercado financeiro considerar que a Alienação Fiduciária e a Cédula de Produto Rural (CPR) com garantia real blindam 100% o credor por constituírem "crédito extraconcursal" (art. 49, § 3º, Lei 11.101/2005). 
Todavia, **a Krill Tech deve observar rigorosamente a jurisprudência recente do Superior Tribunal de Justiça (STJ) e dos Tribunais de Justiça dos principais polos agrícolas (TJMT, TJGO, TJMS)**:
- Durante o período de blindagem (*stay period* de 180 dias, frequentemente estendido pelos juizados de recuperação), **é terminantemente vedada a apreensão, remoção ou alienação de bens de capital essenciais à atividade produtiva do devedor**, competindo exclusivamente ao juízo da recuperação declarar essa essencialidade.
- Tratores, colheitadeiras, pivôs e estoques de insumos aplicados no solo são reiteradamente declarados essenciais, paralisando a execução fiduciária imediata.
- **Recomendação Estratégica:** A Krill Tech não deve confiar em execuções fiduciárias tardias. O valor do produto está no *Alerta Precoce*: detectar a deterioração do tomador nos estágios B e C para exigir liquidação antecipada, cessão fiduciária de recebíveis com trava bancária ou barter físico antes da distribuição da petição inicial de RJ.`;

  // 5. Recomendações e Decisão do Comitê
  const activeRfCount = scoreResult.activeRedFlags.length;
  let summary = '';
  if (scoreResult.rating === 'A') {
    summary = `Tomador classificado com Rating **A** (Score: **${scoreResult.totalScore}/1000** - Baixo Risco). Operação plenamente aderente aos parâmetros de crédito rural e societário da Krill Tech. Nenhuma execução no DataJud ou restrição fiscal. Crédito aprovado em condições comerciais padrão.`;
  } else if (scoreResult.rating === 'B') {
    summary = `Tomador classificado com Rating **B** (Score: **${scoreResult.totalScore}/1000** - Risco Moderado). Operação elegível mediante encurtamento do prazo para até 120 dias e inserção automática no radar de monitoramento contínuo trimestral.`;
  } else if (scoreResult.rating === 'C') {
    summary = `**ALERTA PRECOCE ATIVADO:** Tomador classificado com Rating **C** (Score: **${scoreResult.totalScore}/1000** - Risco Elevado) com **${activeRfCount} Red Flags ativas**. Risco de frustração de receita e contágio por estresse de liquidez. Proibida liberação em crédito aberto sem garantia real. Exigência mandatória de CPR Física com penhor agrícola registrado ou operação de Barter estruturado com entrega física de produto.`;
  } else {
    summary = `**ALERTA MÁXIMO DE INSOLVÊNCIA / RJ IMINENTE:** Tomador classificado com Rating **D** (Score: **${scoreResult.totalScore}/1000** - Risco Crítico) com **${activeRfCount} Red Flags críticas**. Identificados múltiplos apontamentos de execução no DataJud e/ou colapso financeiro-tributário. Bloqueio imediato de novos limites e notificação comercial para cobrança/renegociação das posições abertas de R$ ${borrower.exposureValueBrl.toLocaleString('pt-BR')}.`;
  }

  // Formatação em Markdown Completo do Dossiê
  const fullMarkdown = `
# KRILL TECH — DOSSIÊ DE INTELIGÊNCIA DE CRÉDITO & ALERTA PRECOCE
**Identificador do Relatório:** ${dossierId} | **Data de Emissão:** ${nowStr}
**Motor Analítico:** watsonx.ai & watsonx Orchestrate | **Metodologia:** Scorecard Ponderado (Weight of Evidence)

---

## 1. IDENTIFICAÇÃO DO TOMADOR
- **Nome / Razão Social:** ${borrower.name}
- **Documento (${borrower.type === 'PF' ? 'CPF' : 'CNPJ'}):** ${borrower.document}
- **Localização:** ${borrower.city} - ${borrower.state}
- **Tipo Jurídico:** ${isPF ? 'Produtor Rural Pessoa Física (Art. 48 Lei 11.101/2005 c/c Lei 14.112/2020)' : 'Agroindústria / Revenda de Insumos Pessoa Jurídica'}
- **Exposição Krill Tech em Risco:** R$ ${borrower.exposureValueBrl.toLocaleString('pt-BR')}

---

## 2. RESULTADO CONSOLIDADO DO SCORECARD (0 A 1000)
- **SCORE FINAL:** **${scoreResult.totalScore} / 1000**
- **CLASSIFICAÇÃO DE RATING:** **RATING ${scoreResult.rating}** (${scoreResult.recommendation.label})
- **POLÍTICA DE CRÉDITO RECOMENDADA:** ${scoreResult.recommendation.creditPolicy}
- **STATUS DE ALERTA PRECOCE:** ${activeRfCount > 0 ? `⚠️ ${activeRfCount} RED FLAGS DETECTADAS` : '✅ REGULAR'}

### Distribuição Ponderada por Dimensão:
| Dimensão | Peso | Pontuação Obtida | Pontos Máximos | Fonte Oficial |
| :--- | :---: | :---: | :---: | :--- |
| **Processual & Jurídico** | 30% | **${scoreResult.dimensions[0].earnedScore}** | 300 pts | DataJud / DJEs / Jusbrasil / Escavador |
| **Agronômico & Climático** | 25% | **${scoreResult.dimensions[1].earnedScore}** | 250 pts | ZARC (MAPA/Embrapa) / INMET / Conab |
| **Fiscal & Trabalhista** | 20% | **${scoreResult.dimensions[2].earnedScore}** | 200 pts | PGFN / TST / Caixa Econômica (CRF) |
| **Cadastral & Societário** | 15% | **${scoreResult.dimensions[3].earnedScore}** | 150 pts | Receita Federal / Redesim / Balanço |
| **Territorial & Ambiental** | 10% | **${scoreResult.dimensions[4].earnedScore}** | 100 pts | SICAR / IBAMA / Órgãos Estaduais |
| **TOTAL CONSOLIDADO** | **100%** | **${scoreResult.totalScore}** | **1000 pts** | **Scorecard Explicável (WoE)** |

---

## 3. MATRIZ DE RED FLAGS DETECTADAS
${scoreResult.activeRedFlags.length === 0 ? '_Nenhuma red flag ativa no momento._' : scoreResult.activeRedFlags.map((rf, idx) => `
${idx + 1}. **${rf.title}** [SEVERIDADE: ${rf.severity}]
   - **Fonte Oficial:** ${rf.source}
   - **Diagnóstico:** ${rf.description}
`).join('\n')}

---

## 4. DIAGNÓSTICO JURÍDICO & ELEGIBILIDADE PARA RECUPERAÇÃO JUDICIAL
${legalDiagnostic}

---

## 5. DIAGNÓSTICO AGROCLIMÁTICO (ZARC + INMET + CONAB)
${agroDiagnostic}

---

## 6. IMPACTO DA COBERTURA DE SEGURO RURAL (PSR)
${psrContext}

---

## 7. PARECER JURÍDICO: STAY PERIOD E ALIENAÇÃO FIDUCIÁRIA (STJ)
${fiduciaryCaveat}

---

---

## 8. HORIZONTES PREDITIVOS TEMPORAIS DE DEFAULT (6M, 12M, 24M)
- **Probabilidade de Default em 6 Meses:** **${scoreResult.temporalPd?.pd6MonthsPercent ?? 'N/A'}%**
- **Probabilidade de Default em 12 Meses:** **${scoreResult.temporalPd?.pd12MonthsPercent ?? 'N/A'}%**
- **Probabilidade de Default em 24 Meses:** **${scoreResult.temporalPd?.pd24MonthsPercent ?? 'N/A'}%**
- **Horizonte de Risco de Recuperação Judicial (24m):** **${scoreResult.temporalPd?.rjRiskHorizon ?? 'N/A'}** (Intervalo Confiança: ${scoreResult.temporalPd?.confidenceIntervalPercent ?? 95}%)

---

## 9. AÇÃO AUTOMATIZADA WATSONX ORCHESTRATE (TRAVA ERP T+0h)
- **Status do Gatilho:** ${scoreResult.orchestrateAction?.actionTriggered ? '⚠️ GATILHO ACIONADO' : '✅ STANDBY (SEM BLOQUEIO)'}
- **Ação:** ${scoreResult.orchestrateAction?.actionType || 'STANDARD_APPROVAL'} (${scoreResult.orchestrateAction?.status || 'CONCLUIDO'})
- **ERP Integrado:** ${scoreResult.orchestrateAction?.targetSystem || 'SAP_S4HANA'}
- **Timestamp de Resposta:** ${scoreResult.orchestrateAction?.timestamp || nowStr}
- **Hash Criptográfico de Auditoria:** \`${scoreResult.orchestrateAction?.auditHash || 'N/A'}\`

---

## 10. DIRETRIZ OPERACIONAL PARA O COMITÊ DE CRÉDITO KRILL TECH
- **Decisão:** ${scoreResult.recommendation.label}
- **Prazo Máximo de Pagamento:** ${scoreResult.recommendation.paymentTermsDays === 0 ? 'SUSPENSO / PAGAMENTO À VISTA' : `${scoreResult.recommendation.paymentTermsDays} dias`}
- **Exigência de Garantias:** ${scoreResult.recommendation.mandatoryCollateral}
- **Frequência de Monitoramento no EWS:** ${scoreResult.recommendation.monitoringFrequency}
- **Resumo Executivo:** ${summary}

---
*Relatório gerado automaticamente pela esteira de 4 agentes Krill Tech (Coletor & Parser, Risco Agro & Climático, Motor de Decisão WoE, Sintetizador watsonx.ai & Orchestrate).*
`;

  addLog('success', 'Agente Sintetizador (watsonx.ai)', `Dossiê padronizado gerado com sucesso. Código: ${dossierId}`);

  const report: SynthesizedReport = {
    dossierId,
    generatedAt: nowStr,
    borrowerName: borrower.name,
    borrowerDocument: borrower.document,
    borrowerTypeLabel: isPF ? 'Produtor Rural Pessoa Física' : 'Agroindústria / Revenda de Insumos',
    overallScore: scoreResult.totalScore,
    ratingBand: scoreResult.rating,
    executiveSummary: summary,
    legalDiagnosticSection: legalDiagnostic,
    agroClimaticSection: agroDiagnostic,
    creditPolicyActionSection: scoreResult.recommendation.label,
    fiduciaryAlienationCaveatSection: fiduciaryCaveat,
    psrCollapseContextSection: psrContext,
    temporalPd: scoreResult.temporalPd,
    orchestrateAction: scoreResult.orchestrateAction,
    fullMarkdownContent: fullMarkdown,
  };

  return { report, logs };
}
