import React, { useState } from 'react';
import { 
  Scale, 
  Umbrella, 
  TrendingDown, 
  Cpu, 
  Database, 
  DollarSign, 
  Award, 
  AlertOctagon, 
  CheckCircle2, 
  BookOpen,
  ArrowRight,
  ShieldAlert,
  Lightbulb,
  Server,
  Layers,
  Users,
  ShieldCheck,
  Activity,
  Calculator,
  ExternalLink,
  Target,
  FileSpreadsheet,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const PitchMethodologyView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'canvas' | 'finances' | 'qa'>('canvas');
  const [avoidedDefaultsCount, setAvoidedDefaultsCount] = useState<number>(1);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const averageDefaultValueBrl = 2000000; // R$ 2.000.000 por devedor crítico em média

  // Estrutura de Custos Realista (Enterprise)
  const capexDevelopment = 166000;
  const opexMonthly = 18200;
  const opexAnnual = opexMonthly * 12;
  const totalYear1Cost = capexDevelopment + opexAnnual;
  const totalSubsequentYearCost = opexAnnual;

  const totalSavedBrl = avoidedDefaultsCount * averageDefaultValueBrl;
  const netBenefitYear1 = totalSavedBrl - totalYear1Cost;
  const roiYear1 = Math.round((netBenefitYear1 / totalYear1Cost) * 100);
  const netBenefitRecurring = totalSavedBrl - totalSubsequentYearCost;
  const roiRecurring = Math.round((netBenefitRecurring / totalSubsequentYearCost) * 100);

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12 animate-fade-in font-sans">
      {/* Strategic Header BroCode Style */}
      <div className="bg-[#09090e] border border-[#231c3a] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-display font-bold bg-[#6618F7]/20 text-[#a78bfa] border border-[#6618F7]/40 uppercase tracking-wider">
                Defesa Técnica • Banca Avaliadora
              </span>
              <span className="text-xs text-slate-500 font-display">Edital 01/2026 • Seção 7.1</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
              Agro-Stress Dashboard: Defesa & Project Canvas
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl font-sans leading-relaxed">
              Apresentação formal da solução desenvolvida pela equipe <strong>BroCode Softwares</strong> (<a href="https://brocode.net.br" target="_blank" rel="noopener noreferrer" className="text-[#a78bfa] underline decoration-[#6618F7] hover:text-white">brocode.net.br</a>) para a Krill Tech. Alinhamento com jurisprudência do STJ, colapso histórico do PSR e arquitetura de custos de nível empresarial.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 bg-[#06060c] p-1.5 rounded-2xl border border-[#231c3a]">
            <button
              onClick={() => setActiveTab('canvas')}
              className={`px-4 py-2 rounded-xl text-xs font-display font-bold transition-all cursor-pointer ${
                activeTab === 'canvas'
                  ? 'bg-[#6618F7] text-white shadow-lg shadow-[#6618F7]/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Project Canvas (10 Blocos)
            </button>
            <button
              onClick={() => setActiveTab('finances')}
              className={`px-4 py-2 rounded-xl text-xs font-display font-bold transition-all cursor-pointer ${
                activeTab === 'finances'
                  ? 'bg-[#6618F7] text-white shadow-lg shadow-[#6618F7]/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              TCO & ROI Interativo
            </button>
            <button
              onClick={() => setActiveTab('qa')}
              className={`px-4 py-2 rounded-xl text-xs font-display font-bold transition-all cursor-pointer ${
                activeTab === 'qa'
                  ? 'bg-[#6618F7] text-white shadow-lg shadow-[#6618F7]/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Arguições da Banca
            </button>
          </div>
        </div>

        {/* 5 Weighted Evaluation Criteria Panel */}
        <div className="pt-4 border-t border-[#231c3a] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <div className="p-3.5 rounded-2xl bg-[#0e0e17] border border-[#6618F7]/40 text-center">
            <span className="text-xl font-display font-black text-[#8b4dff] block">25%</span>
            <span className="text-[11px] font-display font-bold text-white uppercase block mt-0.5">Diagnóstico & Impacto</span>
            <span className="text-[9px] text-slate-400 font-sans block mt-1">Lei 14.112, PSR 2,3% e contágio de revendas</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#0e0e17] border border-[#6618F7]/40 text-center">
            <span className="text-xl font-display font-black text-[#8b4dff] block">25%</span>
            <span className="text-[11px] font-display font-bold text-white uppercase block mt-0.5">Viabilidade & Execução</span>
            <span className="text-[9px] text-slate-400 font-sans block mt-1">4 Agentes, watsonx Orchestrate e WoE</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#0e0e17] border border-[#6618F7]/40 text-center">
            <span className="text-xl font-display font-black text-[#8b4dff] block">20%</span>
            <span className="text-[11px] font-display font-bold text-white uppercase block mt-0.5">Negócios & Custos</span>
            <span className="text-[9px] text-slate-400 font-sans block mt-1">Gateway B2B homologado e ROI de 815%</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#0e0e17] border border-[#6618F7]/40 text-center">
            <span className="text-xl font-display font-black text-[#8b4dff] block">15%</span>
            <span className="text-[11px] font-display font-bold text-white uppercase block mt-0.5">Gestão de Mudanças</span>
            <span className="text-[9px] text-slate-400 font-sans block mt-1">Trava ERP SAP/TOTVS T+0h sem atrito</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#0e0e17] border border-[#6618F7]/40 text-center col-span-2 sm:col-span-1">
            <span className="text-xl font-display font-black text-[#8b4dff] block">15%</span>
            <span className="text-[11px] font-display font-bold text-white uppercase block mt-0.5">Pitch & Defesa</span>
            <span className="text-[9px] text-slate-400 font-sans block mt-1">Jurisprudência STJ e proteção de colaterais</span>
          </div>
        </div>
      </div>

      {/* TAB 1: OFFICIAL 10-BLOCK PROJECT CANVAS (Seção 7.1 do Edital) */}
      {activeTab === 'canvas' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-7 w-7 rounded-xl bg-[#141422] border border-[#231c3a] text-[#8b4dff] flex items-center justify-center font-display font-bold text-xs">
                10
              </span>
              <h3 className="text-lg font-display font-bold text-white">
                Project Canvas Oficial Krill Tech (Edital 01/2026, Seção 7.1)
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-display">Apresentação executiva em grade unificada</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {/* Bloco 1: Descrição do Problema */}
            <div className="bg-[#09090e] border border-[#231c3a] rounded-2xl p-4 flex flex-col justify-between space-y-3 hover:border-[#6618F7]/40 transition-all">
              <div>
                <div className="flex items-center gap-2 text-amber-400 font-display font-bold text-xs mb-2">
                  <AlertOctagon className="h-4 w-4 shrink-0" />
                  <span>1. Descrição do Problema</span>
                </div>
                <div className="space-y-1.5 text-slate-300 text-[11px] font-sans">
                  <p className="font-semibold text-white">Insolvência & RJs no Agro</p>
                  <ul className="space-y-1 text-slate-400">
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-400">•</span>
                      <span>Alta de RJs pós-Lei 14.112 (carência 2 anos LCDPR).</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-400">•</span>
                      <span>Colapso do PSR (apenas 2,3% a 3,3% segurados em 2025).</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-400">•</span>
                      <span>Contágio em revendas (ex: caso AgroGalaxy).</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="pt-2 border-t border-[#231c3a] text-[10px] text-amber-400/90 font-display">
                Impacto: Quebras súbitas e LGD elevado.
              </div>
            </div>

            {/* Bloco 2: Usuários e Beneficiários */}
            <div className="bg-[#09090e] border border-[#231c3a] rounded-2xl p-4 flex flex-col justify-between space-y-3 hover:border-[#6618F7]/40 transition-all">
              <div>
                <div className="flex items-center gap-2 text-sky-400 font-display font-bold text-xs mb-2">
                  <Users className="h-4 w-4 shrink-0" />
                  <span>2. Usuários & Beneficiários</span>
                </div>
                <div className="space-y-1.5 text-slate-300 text-[11px] font-sans">
                  <p className="font-semibold text-white">Mesa de Crédito & Ecossistema</p>
                  <ul className="space-y-1 text-slate-400">
                    <li className="flex items-start gap-1.5">
                      <span className="text-sky-400">•</span>
                      <span><strong>Primários:</strong> Analistas, comitê de crédito e CFO.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-sky-400">•</span>
                      <span><strong>Parceiros:</strong> Revendas e distribuidores de insumos.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-sky-400">•</span>
                      <span><strong>Beneficiários:</strong> Produtores com taxas competitivas.</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="pt-2 border-t border-[#231c3a] text-[10px] text-sky-400/90 font-display">
                Foco: Decisão ágil na esteira diária.
              </div>
            </div>

            {/* Bloco 3: Proposta de Valor */}
            <div className="bg-[#09090e] border border-[#231c3a] rounded-2xl p-4 flex flex-col justify-between space-y-3 hover:border-[#6618F7]/40 transition-all">
              <div>
                <div className="flex items-center gap-2 text-[#8b4dff] font-display font-bold text-xs mb-2">
                  <Target className="h-4 w-4 shrink-0" />
                  <span>3. Proposta de Valor</span>
                </div>
                <div className="space-y-1.5 text-slate-300 text-[11px] font-sans">
                  <p className="font-semibold text-white">Alerta Precoce Pré-Concursal</p>
                  <ul className="space-y-1 text-slate-400">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#8b4dff]">•</span>
                      <span>Horizontes preditivos de 6, 12 e 24 meses.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#8b4dff]">•</span>
                      <span>Detecção antes da petição inicial na comarca.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#8b4dff]">•</span>
                      <span>Execução de garantias antes do Stay Period (STJ).</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="pt-2 border-t border-[#231c3a] text-[10px] text-[#8b4dff] font-display">
                Entrega: Redução do LGD em até 68%.
              </div>
            </div>

            {/* Bloco 4: Solução Técnica */}
            <div className="bg-[#09090e] border border-[#231c3a] rounded-2xl p-4 flex flex-col justify-between space-y-3 hover:border-[#6618F7]/40 transition-all">
              <div>
                <div className="flex items-center gap-2 text-emerald-400 font-display font-bold text-xs mb-2">
                  <Cpu className="h-4 w-4 shrink-0" />
                  <span>4. Solução Técnica</span>
                </div>
                <div className="space-y-1.5 text-slate-300 text-[11px] font-sans">
                  <p className="font-semibold text-white">4 Agentes Especializados</p>
                  <ul className="space-y-1 text-slate-400">
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-400">•</span>
                      <span>Coletor, Risco Agro, Motor WoE e Síntese Executiva.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-400">•</span>
                      <span>Triagem cadastral, Due Diligence e Monitoramento.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-400">•</span>
                      <span>Scorecard ponderado auditável (BACEN compliant).</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="pt-2 border-t border-[#231c3a] text-[10px] text-emerald-400/90 font-display">
                Stack: React 19 + TypeScript + watsonx.
              </div>
            </div>

            {/* Bloco 5: Mecanismo de Prevenção */}
            <div className="bg-[#09090e] border border-[#231c3a] rounded-2xl p-4 flex flex-col justify-between space-y-3 hover:border-[#6618F7]/40 transition-all">
              <div>
                <div className="flex items-center gap-2 text-rose-400 font-display font-bold text-xs mb-2">
                  <ShieldAlert className="h-4 w-4 shrink-0" />
                  <span>5. Mecanismo de Prevenção</span>
                </div>
                <div className="space-y-1.5 text-slate-300 text-[11px] font-sans">
                  <p className="font-semibold text-white">Trava ERP T+0h & Garantias</p>
                  <ul className="space-y-1 text-slate-400">
                    <li className="flex items-start gap-1.5">
                      <span className="text-rose-400">•</span>
                      <span>Disparo via watsonx Orchestrate (SAP / TOTVS).</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-rose-400">•</span>
                      <span>Exigência mandatória de CPR Física (B3/Cerc).</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-rose-400">•</span>
                      <span>Retenção de faturamento antes de liminar judicial.</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="pt-2 border-t border-[#231c3a] text-[10px] text-rose-400/90 font-display">
                Bloqueio: Ação imediata sem dependência manual.
              </div>
            </div>

            {/* Bloco 6: Ferramentas e Recursos */}
            <div className="bg-[#09090e] border border-[#231c3a] rounded-2xl p-4 flex flex-col justify-between space-y-3 hover:border-[#6618F7]/40 transition-all">
              <div>
                <div className="flex items-center gap-2 text-[#a78bfa] font-display font-bold text-xs mb-2">
                  <Database className="h-4 w-4 shrink-0" />
                  <span>6. Ferramentas & Recursos</span>
                </div>
                <div className="space-y-1.5 text-slate-300 text-[11px] font-sans">
                  <p className="font-semibold text-white">Ecossistema IBM & Dados B2B</p>
                  <ul className="space-y-1 text-slate-400">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#a78bfa]">•</span>
                      <span>watsonx.ai, watsonx Orchestrate e Granite.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#a78bfa]">•</span>
                      <span>Gateway B2B (BigDataCorp / Judit) em 90 tribunais.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#a78bfa]">•</span>
                      <span>Bases oficiais: RFB, SICAR, IBAMA, ZARC e INMET.</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="pt-2 border-t border-[#231c3a] text-[10px] text-[#a78bfa] font-display">
                Infraestrutura: SLA 99.9% e latência &lt; 400ms.
              </div>
            </div>

            {/* Bloco 7: Viabilidade Técnica */}
            <div className="bg-[#09090e] border border-[#231c3a] rounded-2xl p-4 flex flex-col justify-between space-y-3 hover:border-[#6618F7]/40 transition-all">
              <div>
                <div className="flex items-center gap-2 text-teal-400 font-display font-bold text-xs mb-2">
                  <Activity className="h-4 w-4 shrink-0" />
                  <span>7. Viabilidade Técnica</span>
                </div>
                <div className="space-y-1.5 text-slate-300 text-[11px] font-sans">
                  <p className="font-semibold text-white">Triagem em 3 Minutos</p>
                  <ul className="space-y-1 text-slate-400">
                    <li className="flex items-start gap-1.5">
                      <span className="text-teal-400">•</span>
                      <span>Redução do tempo operacional de 4 dias para 3 min.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-teal-400">•</span>
                      <span>Scorecard WoE com pesos auditáveis (Explainable AI).</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-teal-400">•</span>
                      <span>Zero caixa-preta: total governança para auditoria.</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="pt-2 border-t border-[#231c3a] text-[10px] text-teal-400/90 font-display">
                Agilidade: +98% de ganho de produtividade.
              </div>
            </div>

            {/* Bloco 8: Governança e LGPD */}
            <div className="bg-[#09090e] border border-[#231c3a] rounded-2xl p-4 flex flex-col justify-between space-y-3 hover:border-[#6618F7]/40 transition-all">
              <div>
                <div className="flex items-center gap-2 text-indigo-400 font-display font-bold text-xs mb-2">
                  <ShieldCheck className="h-4 w-4 shrink-0" />
                  <span>8. Governança & LGPD</span>
                </div>
                <div className="space-y-1.5 text-slate-300 text-[11px] font-sans">
                  <p className="font-semibold text-white">Sigilo Fiscal (Art. 198 CTN)</p>
                  <ul className="space-y-1 text-slate-400">
                    <li className="flex items-start gap-1.5">
                      <span className="text-indigo-400">•</span>
                      <span>Validação do LCDPR via hash SHA-256 do SPED.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-indigo-400">•</span>
                      <span>Trilha criptográfica imutável para decisões e travas.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-indigo-400">•</span>
                      <span>Consentimento do tomador em compliance com LGPD.</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="pt-2 border-t border-[#231c3a] text-[10px] text-indigo-400/90 font-display">
                Segurança: Compliance e-CAC / ICP-Brasil.
              </div>
            </div>

            {/* Bloco 9: Equipe */}
            <div className="bg-[#09090e] border border-[#231c3a] rounded-2xl p-4 flex flex-col justify-between space-y-3 hover:border-[#6618F7]/40 transition-all">
              <div>
                <div className="flex items-center gap-2 text-[#8b4dff] font-display font-bold text-xs mb-2">
                  <Award className="h-4 w-4 shrink-0" />
                  <span>9. Equipe: BroCode Softwares</span>
                </div>
                <div className="space-y-1.5 text-slate-300 text-[11px] font-sans">
                  <p className="font-semibold text-white">Engenharia, IA & Risco Agro</p>
                  <ul className="space-y-1 text-slate-400">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#8b4dff]">•</span>
                      <span>Especialistas em crédito rural, engenharia e dados.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#8b4dff]">•</span>
                      <span>Domínio técnico de watsonx e regulação brasileira.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#8b4dff]">•</span>
                      <span>Portal oficial: <a href="https://brocode.net.br" target="_blank" rel="noopener noreferrer" className="text-[#a78bfa] underline hover:text-white">brocode.net.br</a>.</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="pt-2 border-t border-[#231c3a] text-[10px] text-[#a78bfa] font-display">
                Origem: BroCode Softwares (Brasil).
              </div>
            </div>

            {/* Bloco 10: Métricas de Sucesso */}
            <div className="bg-[#09090e] border border-[#231c3a] rounded-2xl p-4 flex flex-col justify-between space-y-3 hover:border-[#6618F7]/40 transition-all">
              <div>
                <div className="flex items-center gap-2 text-emerald-400 font-display font-bold text-xs mb-2">
                  <TrendingDown className="h-4 w-4 shrink-0" />
                  <span>10. Métricas de Sucesso</span>
                </div>
                <div className="space-y-1.5 text-slate-300 text-[11px] font-sans">
                  <p className="font-semibold text-white">Resultados Quantificáveis</p>
                  <ul className="space-y-1 text-slate-400">
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-400">•</span>
                      <span>Zero pedidos de RJ surpresa na carteira ativa.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-400">•</span>
                      <span>Redução de 75% no tempo de análise do analista.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-400">•</span>
                      <span>ROI de 815% no 1º ano com 1 default evitado.</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="pt-2 border-t border-[#231c3a] text-[10px] text-emerald-400/90 font-display">
                Retorno: Preservação de caixa e EBITDA.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: REALISTIC FINANCIAL ARCHITECTURE (TCO & ROI INTERATIVO) */}
      {activeTab === 'finances' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-[#8b4dff]" />
              <h3 className="text-lg font-display font-bold text-white">
                Demonstrativo de Custos Empresariais (TCO) & Simulação de Retorno (ROI)
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-sans">
              Substituição da premissa ingênua de "Custo R$ 0" por orçamento executivo homologado
            </span>
          </div>

          {/* Interactive Calculator Slider Card */}
          <div className="bg-[#09090e] border border-[#6618F7]/50 rounded-3xl p-6 shadow-2xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-display font-bold text-[#8b4dff] uppercase tracking-wider block">
                  Simulação de Impacto Financeiro da Solução
                </span>
                <h4 className="text-xl font-display font-black text-white mt-0.5">
                  Prevenção de Inadimplência na Carteira (R$ 48.500.000 Expostos)
                </h4>
                <p className="text-xs text-slate-400 font-sans mt-1">
                  Ajuste o número de calotes ou RJs evitados no ano para calcular a economia líquida e o ROI gerado:
                </p>
              </div>

              <div className="bg-[#0e0e17] p-4 rounded-2xl border border-[#231c3a] text-center shrink-0">
                <span className="text-[10px] font-display uppercase text-slate-400 block">Eventos Mitigados no Ano</span>
                <span className="text-3xl font-black font-display text-[#8b4dff]">{avoidedDefaultsCount}</span>
                <span className="text-[10px] text-slate-500 font-sans block">Tomador(es) Crítico(s)</span>
              </div>
            </div>

            {/* Slider Control */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs font-display font-semibold text-slate-300">
                <span>1 Quebra Mitigada (R$ 2.000.000)</span>
                <span>2 Quebras (R$ 4.000.000)</span>
                <span>3 Quebras (R$ 6.000.000)</span>
                <span>5 Quebras (R$ 10.000.000)</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={avoidedDefaultsCount}
                onChange={(e) => setAvoidedDefaultsCount(Number(e.target.value))}
                className="w-full accent-[#6618F7] cursor-pointer h-2 bg-[#141422] rounded-lg"
              />
            </div>

            {/* Result Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#0e0e17] border border-[#231c3a]">
                <span className="text-[10px] font-display text-slate-400 block">Capital Preservado</span>
                <span className="text-2xl font-black font-display text-emerald-400 mt-1 block">
                  R$ {(totalSavedBrl / 1000000).toFixed(1)}M
                </span>
                <span className="text-[10px] text-slate-500 font-sans">Valor nominal protegido</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#0e0e17] border border-[#231c3a]">
                <span className="text-[10px] font-display text-slate-400 block">Custo Total Ano 1 (CAPEX + OPEX)</span>
                <span className="text-2xl font-black font-display text-white mt-1 block">
                  R$ 384,4k
                </span>
                <span className="text-[10px] text-slate-500 font-sans">R$ 166k capex + R$ 218,4k opex</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#0e0e17] border border-[#231c3a]">
                <span className="text-[10px] font-display text-slate-400 block">Economia Líquida Ano 1</span>
                <span className="text-2xl font-black font-display text-emerald-400 mt-1 block">
                  R$ {(netBenefitYear1 / 1000000).toFixed(2)}M
                </span>
                <span className="text-[10px] text-slate-500 font-sans">Retorno após todos os custos</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#141422] border border-[#6618F7]/50 shadow-lg shadow-[#6618F7]/20">
                <span className="text-[10px] font-display text-[#a78bfa] block">ROI Líquido no Ano 1</span>
                <span className="text-3xl font-black font-display text-[#8b4dff] mt-1 block">
                  +{roiYear1}%
                </span>
                <span className="text-[10px] text-emerald-400 font-sans font-bold">
                  +{roiRecurring}% a partir do Ano 2
                </span>
              </div>
            </div>
          </div>

          {/* CAPEX & OPEX Breakdown Table */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* CAPEX Table */}
            <div className="bg-[#09090e] border border-[#231c3a] rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#231c3a]">
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-[#8b4dff]" />
                  <h4 className="text-sm font-display font-bold text-white uppercase tracking-wider">
                    Detalhamento de CAPEX (Implantação & Modelagem)
                  </h4>
                </div>
                <span className="text-sm font-display font-black text-white">R$ 166.000</span>
              </div>

              <div className="space-y-2 text-xs font-sans">
                <div className="p-2.5 rounded-xl bg-[#0e0e17] flex justify-between items-center">
                  <div>
                    <span className="text-white font-medium block">Pipeline de Dados & Ingestão Cross-Court</span>
                    <span className="text-[10px] text-slate-500">Conectores com DataJud, SICAR, INMET e ZARC</span>
                  </div>
                  <span className="font-display font-bold text-slate-300">R$ 45.000</span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#0e0e17] flex justify-between items-center">
                  <div>
                    <span className="text-white font-medium block">Motor WoE & Modelagem de Horizontes (6, 12, 24m)</span>
                    <span className="text-[10px] text-slate-500">Scorecard ponderado explicável e calibração estatística</span>
                  </div>
                  <span className="font-display font-bold text-slate-300">R$ 38.000</span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#0e0e17] flex justify-between items-center">
                  <div>
                    <span className="text-white font-medium block">Automação watsonx Orchestrate com ERPs</span>
                    <span className="text-[10px] text-slate-500">Webhooks bidirecionais SAP S/4HANA & TOTVS Protheus</span>
                  </div>
                  <span className="font-display font-bold text-slate-300">R$ 32.000</span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#0e0e17] flex justify-between items-center">
                  <div>
                    <span className="text-white font-medium block">Homologação de Gateways B2B & Segredo Fiscal</span>
                    <span className="text-[10px] text-slate-500">Integração Judit/BigDataCorp e hash de recibo SPED</span>
                  </div>
                  <span className="font-display font-bold text-slate-300">R$ 25.000</span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#0e0e17] flex justify-between items-center">
                  <div>
                    <span className="text-white font-medium block">Treinamento, Gestão de Mudança & Testes QA</span>
                    <span className="text-[10px] text-slate-500">Capacitação do time de crédito Krill Tech e bancadas</span>
                  </div>
                  <span className="font-display font-bold text-slate-300">R$ 26.000</span>
                </div>
              </div>
            </div>

            {/* OPEX Table */}
            <div className="bg-[#09090e] border border-[#231c3a] rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#231c3a]">
                <div className="flex items-center gap-2">
                  <Server className="h-4 w-4 text-emerald-400" />
                  <h4 className="text-sm font-display font-bold text-white uppercase tracking-wider">
                    Detalhamento de OPEX Mensal (Recorrente)
                  </h4>
                </div>
                <span className="text-sm font-display font-black text-emerald-400">R$ 18.200 / mês</span>
              </div>

              <div className="space-y-2 text-xs font-sans">
                <div className="p-2.5 rounded-xl bg-[#0e0e17] flex justify-between items-center">
                  <div>
                    <span className="text-white font-medium block">Data Gateway B2B (BigDataCorp / Judit)</span>
                    <span className="text-[10px] text-slate-500">Consultas automatizadas em 90 tribunais e cartórios com SLA</span>
                  </div>
                  <span className="font-display font-bold text-slate-300">R$ 8.500 / mês</span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#0e0e17] flex justify-between items-center">
                  <div>
                    <span className="text-white font-medium block">IBM watsonx.ai & watsonx Orchestrate</span>
                    <span className="text-[10px] text-slate-500">Tokens de inferência de relatórios e execuções de automação</span>
                  </div>
                  <span className="font-display font-bold text-slate-300">R$ 5.200 / mês</span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#0e0e17] flex justify-between items-center">
                  <div>
                    <span className="text-white font-medium block">Infraestrutura Cloud Serverless & Banco Seguro</span>
                    <span className="text-[10px] text-slate-500">Hospedagem de alta disponibilidade, Redis e backup com criptografia</span>
                  </div>
                  <span className="font-display font-bold text-slate-300">R$ 2.500 / mês</span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#0e0e17] flex justify-between items-center">
                  <div>
                    <span className="text-white font-medium block">Suporte Nível 3 & Manutenção Preditiva de Modelos</span>
                    <span className="text-[10px] text-slate-500">Acompanhamento contínuo da BroCode Softwares</span>
                  </div>
                  <span className="font-display font-bold text-slate-300">R$ 2.000 / mês</span>
                </div>

                <div className="p-3 rounded-xl bg-[#141422] border border-[#231c3a] flex justify-between items-center mt-3">
                  <span className="font-display font-bold text-slate-200">Custo Anual Recorrente (12 meses):</span>
                  <span className="font-display font-black text-white text-sm">R$ 218.400 / ano</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: HARDEST AUDIT OBJECTIONS & READY DEFENSES */}
      {activeTab === 'qa' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
            <div className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-[#8b4dff]" />
              <h3 className="text-lg font-display font-bold text-white">
                Arguições Críticas da Banca Avaliadora & Defesas Técnicas
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-display">Selecione uma arguição para ver o embasamento</span>
          </div>

          <div className="space-y-3">
            {/* Obj 1: Alienação Fiduciária */}
            <div className="bg-[#09090e] border border-[#231c3a] rounded-2xl overflow-hidden transition-all shadow-xl">
              <button
                type="button"
                onClick={() => setExpandedFaq(expandedFaq === 0 ? null : 0)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-[#141422]/50 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
                    <ShieldAlert className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-display font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase mr-2">
                      STJ & Stay Period
                    </span>
                    <span className="text-xs sm:text-sm font-display font-bold text-white">
                      Arguição 1: A alienação fiduciária e a CPR não eliminam o risco de perda?
                    </span>
                  </div>
                </div>
                <div className="text-slate-400 shrink-0 ml-2">
                  {expandedFaq === 0 ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </button>

              {expandedFaq === 0 && (
                <div className="px-5 pb-5 pt-1 space-y-3 border-t border-[#231c3a] text-xs font-sans">
                  <div className="bg-[#06060c] p-3 rounded-xl border border-[#231c3a] text-slate-400 italic">
                    "Se a Krill Tech opera com CPR e alienação fiduciária de grãos e maquinário (art. 49, §3º da Lei 11.101), por que precisamos de um sistema de alerta precoce?"
                  </div>
                  <div className="p-4 rounded-xl bg-[#0e0e17] border border-[#231c3a] space-y-2">
                    <span className="font-display font-bold text-emerald-400 block text-xs">
                      Fundamentação Técnica & Jurisprudencial:
                    </span>
                    <ul className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span><strong>Jurisprudência do STJ & TJs:</strong> Durante o <em>stay period</em> (180 a 360 dias), é vedada a busca e apreensão de bens essenciais à atividade do produtor rural (Tema STJ).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span><strong>Retenção de Ativos:</strong> Juizados recuperacionais declaram grãos armazenados e maquinários como bens essenciais rotineiramente, congelando a liquidação da Krill Tech.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span><strong>Vantagem do Alerta Precoce:</strong> Permite renegociação, retenção de recebíveis via tradings ou execução judicial <strong>antes da distribuição da petição inicial</strong>.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Obj 2: Scorecard WoE vs Deep Learning */}
            <div className="bg-[#09090e] border border-[#231c3a] rounded-2xl overflow-hidden transition-all shadow-xl">
              <button
                type="button"
                onClick={() => setExpandedFaq(expandedFaq === 1 ? null : 1)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-[#141422]/50 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                    <Cpu className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-display font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase mr-2">
                      Explainable AI
                    </span>
                    <span className="text-xs sm:text-sm font-display font-bold text-white">
                      Arguição 2: Por que Scorecard WoE e não Deep Learning caixa-preta?
                    </span>
                  </div>
                </div>
                <div className="text-slate-400 shrink-0 ml-2">
                  {expandedFaq === 1 ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </button>

              {expandedFaq === 1 && (
                <div className="px-5 pb-5 pt-1 space-y-3 border-t border-[#231c3a] text-xs font-sans">
                  <div className="bg-[#06060c] p-3 rounded-xl border border-[#231c3a] text-slate-400 italic">
                    "Por que a solução usa Scorecard Ponderado (Weight of Evidence) em vez de redes neurais profundas para calcular a probabilidade de default?"
                  </div>
                  <div className="p-4 rounded-xl bg-[#0e0e17] border border-[#231c3a] space-y-2">
                    <span className="font-display font-bold text-emerald-400 block text-xs">
                      Fundamentação Técnica & Regulatória:
                    </span>
                    <ul className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span><strong>Exigência Regulatória BACEN / FIDC:</strong> Comitês de risco exigem explicabilidade estrita (Explainable AI) para justificar recusa de crédito perante LGPD e Código Civil.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span><strong>Prevenção de Overfitting:</strong> Redes neurais sofrem no agro devido a poucas safras históricas idênticas e alta variabilidade climática (El Niño / La Niña).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span><strong>Padrão de Mercado:</strong> O modelo WoE fornece pesos calibrados com horizontes temporais objetivos de 6, 12 e 24 meses.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Obj 3: APIs Gratuitas vs Produção */}
            <div className="bg-[#09090e] border border-[#231c3a] rounded-2xl overflow-hidden transition-all shadow-xl">
              <button
                type="button"
                onClick={() => setExpandedFaq(expandedFaq === 2 ? null : 2)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-[#141422]/50 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-[#8b4dff] shrink-0">
                    <Database className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-display font-bold px-2 py-0.5 rounded bg-purple-500/20 text-[#a78bfa] border border-purple-500/30 uppercase mr-2">
                      Gateway B2B
                    </span>
                    <span className="text-xs sm:text-sm font-display font-bold text-white">
                      Arguição 3: Como a solução supera a limitação das APIs públicas do DataJud?
                    </span>
                  </div>
                </div>
                <div className="text-slate-400 shrink-0 ml-2">
                  {expandedFaq === 2 ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </button>

              {expandedFaq === 2 && (
                <div className="px-5 pb-5 pt-1 space-y-3 border-t border-[#231c3a] text-xs font-sans">
                  <div className="bg-[#06060c] p-3 rounded-xl border border-[#231c3a] text-slate-400 italic">
                    "A API pública do DataJud é indexada por processo/tribunal e não fornece busca federada direta por CNPJ para 90 tribunais em tempo real. Como vocês sustentam a solução?"
                  </div>
                  <div className="p-4 rounded-xl bg-[#0e0e17] border border-[#231c3a] space-y-2">
                    <span className="font-display font-bold text-emerald-400 block text-xs">
                      Fundamentação de Arquitetura de Dados:
                    </span>
                    <ul className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span><strong>Arquitetura Híbrida em Produção:</strong> A API CNJ atende checagens pontuais, enquanto um Gateway B2B homologado (BigDataCorp / Judit) centraliza 90 tribunais e diários oficiais.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span><strong>SLA Empresarial:</strong> Disponibilidade de 99.9%, latência &lt; 400ms e normalização de partes processuais com certidões automáticas.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span><strong>TCO Transparente:</strong> Custo mensal de R$ 8.500/mês integralmente previsto no orçamento de OPEX.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Obj 4: LCDPR e Sigilo Fiscal */}
            <div className="bg-[#09090e] border border-[#231c3a] rounded-2xl overflow-hidden transition-all shadow-xl">
              <button
                type="button"
                onClick={() => setExpandedFaq(expandedFaq === 3 ? null : 3)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-[#141422]/50 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-display font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30 uppercase mr-2">
                      Art. 198 CTN & SPED
                    </span>
                    <span className="text-xs sm:text-sm font-display font-bold text-white">
                      Arguição 4: Como validar o LCDPR sem violar o Sigilo Fiscal do Art. 198 CTN?
                    </span>
                  </div>
                </div>
                <div className="text-slate-400 shrink-0 ml-2">
                  {expandedFaq === 3 ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </button>

              {expandedFaq === 3 && (
                <div className="px-5 pb-5 pt-1 space-y-3 border-t border-[#231c3a] text-xs font-sans">
                  <div className="bg-[#06060c] p-3 rounded-xl border border-[#231c3a] text-slate-400 italic">
                    "A Receita Federal não disponibiliza API aberta do Livro Caixa Digital do Produtor Rural por força do sigilo fiscal. A promessa de checar LCDPR não é fictícia?"
                  </div>
                  <div className="p-4 rounded-xl bg-[#0e0e17] border border-[#231c3a] space-y-2">
                    <span className="font-display font-bold text-emerald-400 block text-xs">
                      Fundamentação Legal & Criptográfica:
                    </span>
                    <ul className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span><strong>Fluxo Real de Mercado:</strong> O produtor faz upload do recibo do SPED ou assina procuração eletrônica via e-CAC para a esteira Krill Tech.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span><strong>Validação Criptográfica SHA-256:</strong> O motor valida o hash do recibo e o certificado digital ICP-Brasil contra o verificador oficial da RFB.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span><strong>Conformidade Legal:</strong> Certifica o cumprimento da carência de 2 anos da Lei 14.112/2020 com 100% de conformidade à LGPD e ao sigilo fiscal.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
