import { MOCK_CASES } from './src/data/mockCases.ts';
import { runFullPipeline } from './src/services/monitoringEngine.ts';

console.log('=== TESTE DE VALIDAÇÃO DO SCORECARD & MOTOR DE RISCO KRILL TECH ===\n');

let passCount = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`✅ PASS: ${message}`);
    passCount++;
  } else {
    console.error(`❌ FAIL: ${message}`);
  }
}

// 1. Validar Caso 1: João Silveira Bastos (PF - Soja Sorriso)
const case1 = MOCK_CASES.find(c => c.id === 'case-pf-sorriso');
const res1 = runFullPipeline(case1);

console.log(`\n--- Testando Caso 1: ${case1.name} (PF - Sorriso/MT) ---`);
console.log(`Score: ${res1.scoreResult.totalScore} | Rating: ${res1.scoreResult.rating}`);
console.log(`Red Flags Ativas: ${res1.scoreResult.activeRedFlags.map(rf => rf.title).join(' | ')}`);

assert(res1.scoreResult.rating === 'C', 'Caso 1 deve ser classificado como Rating C (Alerta Precoce / Risco Elevado)');
assert(res1.scoreResult.totalScore >= 400 && res1.scoreResult.totalScore < 600, 'Caso 1 deve ter Score entre 400 e 599');
assert(!res1.agroAnalysis.zarcCompliance.isInWindow, 'Caso 1 deve acusar quebra de conformidade de janela ZARC');
assert(res1.agroAnalysis.inmetAnomaly.severity === 'SECA_SEVERA', 'Caso 1 deve acusar seca severa INMET');
assert(res1.scoreResult.recommendation.creditPolicy === 'GARANTIA_ADICIONAL_CPR', 'Caso 1 deve exigir CPR Física ou Barter mandatório');

// 2. Validar Caso 2: Agrobov Insumos (PJ - Rio Verde/GO estilo AgroGalaxy)
const case2 = MOCK_CASES.find(c => c.id === 'case-pj-rio-verde');
const res2 = runFullPipeline(case2);

console.log(`\n--- Testando Caso 2: ${case2.name} (PJ - Rio Verde/GO) ---`);
console.log(`Score: ${res2.scoreResult.totalScore} | Rating: ${res2.scoreResult.rating}`);
console.log(`Red Flags Ativas: ${res2.scoreResult.activeRedFlags.map(rf => rf.title).join(' | ')}`);

assert(res2.scoreResult.rating === 'D', 'Caso 2 deve ser classificado como Rating D (Risco Crítico / Alerta de RJ)');
assert(res2.scoreResult.totalScore < 400, 'Caso 2 deve ter Score < 400');
assert(res2.collectorData.datajud.executionsCount >= 3, 'Caso 2 deve registrar 3 execuções no DataJud');
assert(res2.collectorData.pgfn.hasActiveDebt, 'Caso 2 deve registrar Dívida Ativa PGFN');
assert(res2.scoreResult.recommendation.creditPolicy === 'BLOQUEIO_CREDITO', 'Caso 2 deve exigir Bloqueio de Crédito imediato');

// 3. Validar Caso 4: Mariana Albuquerque (PF - Café Patrocínio)
const case4 = MOCK_CASES.find(c => c.id === 'case-pf-patrocinio');
const res4 = runFullPipeline(case4);

console.log(`\n--- Testando Caso 4: ${case4.name} (PF - Patrocínio/MG) ---`);
console.log(`Score: ${res4.scoreResult.totalScore} | Rating: ${res4.scoreResult.rating}`);

assert(res4.scoreResult.rating === 'A', 'Caso 4 deve ser classificado como Rating A (Baixo Risco)');
assert(res4.scoreResult.totalScore >= 800, 'Caso 4 deve ter Score >= 800');
assert(res4.scoreResult.activeRedFlags.length === 0, 'Caso 4 não deve ter nenhuma Red Flag ativa');
assert(res4.scoreResult.recommendation.creditPolicy === 'LIBERADO_PADRAO', 'Caso 4 deve ter crédito liberado em prazo padrão');

// 4. Validar Dossiê watsonx.ai
assert(res1.report.fullMarkdownContent.includes('STJ'), 'Dossiê deve conter o parecer jurídico sobre o STJ e Stay Period');
assert(res1.report.fullMarkdownContent.includes('2,3%'), 'Dossiê deve citar o colapso do PSR para 2,3% a 3,3%');

console.log(`\n==================================================`);
console.log(`RESULTADO DOS TESTES: ${passCount} / ${totalTests} testes passaram com sucesso!`);
console.log(`==================================================`);

if (passCount === totalTests) {
  process.exit(0);
} else {
  process.exit(1);
}
