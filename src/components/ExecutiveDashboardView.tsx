import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  Activity, 
  Calendar, 
  UserCheck, 
  Scale, 
  ArrowRight, 
  Clock, 
  Zap, 
  Sparkles,
  BarChart3,
  FileText,
  PieChart,
  DollarSign,
  Database,
  ExternalLink
} from 'lucide-react';
import { PortfolioEntity, EwsAlert } from '../types/monitoring';
import { MainAppTab } from './Header';

interface ExecutiveDashboardViewProps {
  portfolio: PortfolioEntity[];
  alerts: EwsAlert[];
  onNavigateTab: (tab: MainAppTab) => void;
  onOpenTestBench: () => void;
  onOpenTutorial: () => void;
}

export const ExecutiveDashboardView: React.FC<ExecutiveDashboardViewProps> = ({
  portfolio,
  alerts,
  onNavigateTab,
  onOpenTestBench,
  onOpenTutorial,
}) => {
  const totalExposure = portfolio.reduce((acc, p) => acc + p.exposureBrl, 0);
  const criticalClients = portfolio.filter((p) => p.currentRating === 'D');
  const highRiskClients = portfolio.filter((p) => p.currentRating === 'C');
  const moderateClients = portfolio.filter((p) => p.currentRating === 'B');
  const primeClients = portfolio.filter((p) => p.currentRating === 'A');

  const exposureAtRisk = [...criticalClients, ...highRiskClients].reduce(
    (acc, p) => acc + p.exposureBrl,
    0
  );

  const unreadAlerts = alerts.filter((a) => !a.isRead);

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto pb-10">
      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-r from-[#09090e] via-[#0e0e17] to-[#141422] border border-[#231c3a] rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#6618F7]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-display font-bold bg-[#6618F7]/20 text-[#a78bfa] border border-[#6618F7]/40 uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="h-3.5 w-3.5 text-[#8b4dff] animate-pulse" />
                Agro-Stress Dashboard • Krill Tech
              </span>
              <a
                href="https://brocode.net.br"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-0.5 rounded-full text-[11px] font-display font-bold bg-[#141422] text-[#a78bfa] hover:text-white border border-[#231c3a] hover:border-[#6618F7]/60 flex items-center gap-1 transition-colors"
                title="Conheça a equipe BroCode Softwares"
              >
                <span>Por BroCode Softwares (brocode.net.br)</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              <span className="text-xs text-slate-500 font-display">Safra 2025/2026</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-white tracking-tight">
              Painel de Inteligência de Risco & Alerta Precoce
            </h1>

            <p className="text-xs sm:text-sm text-slate-400 font-sans">
              Monitoramento analítico contínuo para <strong className="text-white">R$ {(totalExposure / 1000000).toFixed(1)}M em recebíveis agrícolas</strong> Krill Tech.
            </p>
          </div>

          {/* Quick Action Badges for Operator */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigateTab('triagem')}
              className="px-4 py-2.5 rounded-xl bg-[#6618F7] hover:bg-[#7b2cff] text-white font-sans font-bold text-xs shadow-lg shadow-[#6618F7]/30 flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <UserCheck className="h-4 w-4" />
              <span>Nova Triagem</span>
            </button>

            <button
              onClick={onOpenTestBench}
              className="px-4 py-2.5 rounded-xl bg-[#141422] hover:bg-[#1f1a3a] text-[#a78bfa] border border-[#231c3a] hover:border-[#6618F7]/60 font-sans font-bold text-xs flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
              title="Abrir bancada lateral para testes de injeção de eventos"
            >
              <Zap className="h-4 w-4 text-[#8b4dff]" />
              <span>Bancada de Testes</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Primary Operational KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-[#09090e] border border-[#231c3a] rounded-2xl p-5 shadow-xl hover:border-[#6618F7]/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-display font-medium uppercase tracking-wider">
              Exposição Total
            </span>
            <span className="text-xs text-slate-500 font-display">8 tomadores</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-display font-black text-white">
              R$ {(totalExposure / 1000000).toFixed(1)}M
            </span>
            <span className="text-[11px] font-sans font-semibold text-emerald-400">
              100% ativa
            </span>
          </div>
          <div className="mt-2.5 pt-2.5 border-t border-[#231c3a] flex items-center justify-between text-[11px] text-slate-400 font-sans">
            <span>Produtores PF: R$ 11.8M</span>
            <span>Revendas PJ: R$ 36.7M</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-[#09090e] border border-rose-500/30 rounded-2xl p-5 shadow-xl hover:border-rose-500/60 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-display font-medium uppercase tracking-wider text-rose-400">
              Exposição em Risco (C & D)
            </span>
            <span className="text-xs text-rose-400 font-display font-bold">
              {((exposureAtRisk / totalExposure) * 100).toFixed(1)}%
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-display font-black text-rose-400">
              R$ {(exposureAtRisk / 1000000).toFixed(1)}M
            </span>
            <span className="text-[11px] font-sans font-bold text-rose-300">
              da carteira
            </span>
          </div>
          <div className="mt-2.5 pt-2.5 border-t border-[#231c3a] flex items-center justify-between text-[11px] text-slate-400 font-sans">
            <span>{criticalClients.length} em Rating D (Crítico)</span>
            <span>{highRiskClients.length} em Rating C (Alto)</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-[#09090e] border border-amber-500/30 rounded-2xl p-5 shadow-xl hover:border-amber-500/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-display font-medium uppercase tracking-wider text-amber-400">
              Inadimplência Preventiva
            </span>
            <span className="text-xs text-amber-400 font-display font-bold">Antecipada</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-display font-black text-amber-400">
              14,2%
            </span>
            <span className="text-[11px] font-sans text-amber-300">
              Covenants
            </span>
          </div>
          <div className="mt-2.5 pt-2.5 border-t border-[#231c3a] text-[11px] text-slate-400 font-sans">
            Sinais prévios antes do atraso financeiro formal
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-[#09090e] border border-emerald-500/30 rounded-2xl p-5 shadow-xl hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-display font-medium uppercase tracking-wider text-emerald-400">
              Garantias Reais
            </span>
            <span className="text-xs text-emerald-400 font-display font-bold">Colateral</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-display font-black text-emerald-400">
              84,6%
            </span>
            <span className="text-[11px] font-sans text-emerald-300">
              CPR & Barter
            </span>
          </div>
          <div className="mt-2.5 pt-2.5 border-t border-[#231c3a] text-[11px] text-slate-400 font-sans">
            Crédito com colateralização direta de grãos
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout: Radar da Safra vs. Ratings & Fila Operacional */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Col 1 & 2: Radar de Riscos do Cenário Atual da Safra */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#09090e] border border-[#231c3a] rounded-2xl p-5 sm:p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#231c3a]">
              <div className="flex items-center gap-2.5">
                <BarChart3 className="h-4 w-4 text-[#8b4dff]" />
                <h2 className="text-base font-display font-bold text-white">
                  Radar Macroeconômico & Climático da Safra
                </h2>
              </div>
              <span className="text-xs font-display text-slate-400">Safra 2025/2026</span>
            </div>

            {/* Visual Scannable Grid: Concise Chips Instead of Long Paragraphs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Driver 1 */}
              <div className="p-3 rounded-xl bg-[#0e0e17] border border-[#231c3a] flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-display font-bold text-white">Marco Legal (Lei 14.112)</span>
                    <span className="text-[10px] font-display font-bold text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded">Risco Alto</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans">
                    Carência de apenas 2 anos via LCDPR para pedido de RJ de PF.
                  </p>
                </div>
              </div>

              {/* Driver 2 */}
              <div className="p-3 rounded-xl bg-[#0e0e17] border border-[#231c3a] flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-display font-bold text-white">Seguro Rural (PSR)</span>
                    <span className="text-[10px] font-display font-bold text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded">2,3% - 3,3%</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans">
                    Pior cobertura histórica. Risco climático recai no credor de insumos.
                  </p>
                </div>
              </div>

              {/* Driver 3 */}
              <div className="p-3 rounded-xl bg-[#0e0e17] border border-[#231c3a] flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-display font-bold text-white">Margens & Commodities</span>
                    <span className="text-[10px] font-display font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">Comprimidas</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans">
                    Preços em Chicago reduzem a rentabilidade e elevam dependência de crédito.
                  </p>
                </div>
              </div>

              {/* Driver 4 */}
              <div className="p-3 rounded-xl bg-[#0e0e17] border border-[#231c3a] flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-display font-bold text-white">Contágio de Revendas</span>
                    <span className="text-[10px] font-display font-bold text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded">AgroGalaxy</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans">
                    Quebras de distribuidores exigem colateralização antecipada via barter.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Fila Operacional do Operador (O que fazer hoje) */}
          <div className="bg-[#09090e] border border-[#231c3a] rounded-2xl p-5 sm:p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#231c3a]">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#8b4dff]" />
                <h3 className="text-base font-display font-bold text-white">
                  Fila de Ações do Operador
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-display">Tarefas Prioritárias</span>
            </div>

            <div className="space-y-2.5">
              {/* Task 1 */}
              <div className="p-3 rounded-xl bg-[#0e0e17] border border-[#231c3a] flex items-center justify-between gap-3 hover:border-[#6618F7]/50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-[#6618F7]/10 text-[#8b4dff] flex items-center justify-center shrink-0">
                    <UserCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-display font-bold text-white">
                      Triagem de Novos Clientes
                    </h4>
                    <span className="text-[11px] text-slate-400 font-sans">
                      Conferência de 2 anos LCDPR (Lei 14.112) e SICAR
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onNavigateTab('triagem')}
                  className="px-3 py-1.5 rounded-lg bg-[#141422] hover:bg-[#6618F7] text-slate-300 hover:text-white border border-[#231c3a] text-xs font-display font-bold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer"
                >
                  <span>Acessar</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Task 2 */}
              <div className="p-3 rounded-xl bg-[#0e0e17] border border-[#231c3a] flex items-center justify-between gap-3 hover:border-rose-500/50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0">
                    <ShieldAlert className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-display font-bold text-white">
                        Alertas DataJud com Risco de RJ
                      </h4>
                      <span className="text-[10px] font-display font-bold bg-rose-500/20 text-rose-300 px-1.5 py-0.2 rounded">
                        {unreadAlerts.length} pendentes
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-sans">
                      Execuções distribuídas contra devedores com saldo aberto
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onNavigateTab('alerta_rj')}
                  className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-display font-bold flex items-center gap-1.5 shrink-0 transition-all shadow-md shadow-rose-600/30 cursor-pointer"
                >
                  <span>Ver Alertas</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Task 3 */}
              <div className="p-3 rounded-xl bg-[#0e0e17] border border-[#231c3a] flex items-center justify-between gap-3 hover:border-[#6618F7]/50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-[#6618F7]/10 text-[#8b4dff] flex items-center justify-center shrink-0">
                    <Activity className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-display font-bold text-white">
                      Due Diligence dos 4 Agentes Autônomos
                    </h4>
                    <span className="text-[11px] text-slate-400 font-sans">
                      Dossiês padronizados prontos para deliberação do comitê
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onNavigateTab('duediligence')}
                  className="px-3 py-1.5 rounded-lg bg-[#141422] hover:bg-[#6618F7] text-slate-300 hover:text-white border border-[#231c3a] text-xs font-display font-bold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer"
                >
                  <span>Ver Dossiês</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Col 3: Distribuição por Rating e Jornadas Operacionais */}
        <div className="space-y-6">
          {/* Card: Distribuição de Ratings */}
          <div className="bg-[#09090e] border border-[#231c3a] rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#231c3a]">
              <div className="flex items-center gap-2">
                <PieChart className="h-4 w-4 text-[#8b4dff]" />
                <h3 className="text-sm font-display font-bold text-white">
                  Distribuição da Carteira por Rating
                </h3>
              </div>
              <span className="text-[10px] font-display text-slate-400">Scorecard WoE</span>
            </div>

            <div className="space-y-3">
              {/* Rating A */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-sans">
                  <span className="font-display font-bold text-emerald-400">Rating A (800-1000 pts)</span>
                  <span className="text-slate-300">{primeClients.length} tomadores (25%)</span>
                </div>
                <div className="h-2 w-full bg-[#141422] rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '25%' }} />
                </div>
                <span className="text-[10px] text-slate-500 block font-sans">Baixo Risco • Prazo padrão 180 dias</span>
              </div>

              {/* Rating B */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-sans">
                  <span className="font-display font-bold text-[#a78bfa]">Rating B (600-799 pts)</span>
                  <span className="text-slate-300">{moderateClients.length} tomadores (25%)</span>
                </div>
                <div className="h-2 w-full bg-[#141422] rounded-full overflow-hidden">
                  <div className="h-full bg-[#6618F7] rounded-full" style={{ width: '25%' }} />
                </div>
                <span className="text-[10px] text-slate-500 block font-sans">Risco Moderado • Prazo encurtado 120d</span>
              </div>

              {/* Rating C */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-sans">
                  <span className="font-display font-bold text-amber-400">Rating C (400-599 pts)</span>
                  <span className="text-slate-300">{highRiskClients.length} tomadores (25%)</span>
                </div>
                <div className="h-2 w-full bg-[#141422] rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '25%' }} />
                </div>
                <span className="text-[10px] text-slate-500 block font-sans">Alerta Precoce • CPR Física ou Barter mandatório</span>
              </div>

              {/* Rating D */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-sans">
                  <span className="font-display font-bold text-rose-400">Rating D (&lt; 400 pts)</span>
                  <span className="text-slate-300">{criticalClients.length} tomadores (25%)</span>
                </div>
                <div className="h-2 w-full bg-[#141422] rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: '25%' }} />
                </div>
                <span className="text-[10px] text-slate-500 block font-sans">Risco Crítico / RJ • Bloqueio de novas concessões</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#231c3a]">
              <button
                onClick={() => onNavigateTab('monitoramento')}
                className="w-full py-2 rounded-xl bg-[#0e0e17] hover:bg-[#141422] text-[#a78bfa] hover:text-white border border-[#231c3a] text-xs font-display font-bold text-center transition-all cursor-pointer"
              >
                Explorar Tabela da Carteira Completa
              </button>
            </div>
          </div>

          {/* Quick Guide Card */}
          <div className="bg-[#09090e] border border-[#231c3a] rounded-2xl p-6 shadow-2xl space-y-3">
            <h4 className="text-xs font-display font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-[#8b4dff]" />
              Guia do Operador Krill Tech
            </h4>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              Consulte os fluxos operacionais recomendados, matriz de 6 red flags e critérios regulatórios no manual de bordo.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={onOpenTutorial}
                className="w-full py-2 px-3 rounded-xl bg-[#141422] hover:bg-[#6618F7]/20 text-slate-200 border border-[#231c3a] hover:border-[#6618F7]/50 text-xs font-display font-bold text-left flex items-center justify-between transition-all cursor-pointer"
              >
                <span>Manual Operacional do Sistema</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#8b4dff]" />
              </button>
              <button
                onClick={() => onNavigateTab('canvas')}
                className="w-full py-2 px-3 rounded-xl bg-[#141422] hover:bg-[#6618F7]/20 text-slate-200 border border-[#231c3a] hover:border-[#6618F7]/50 text-xs font-display font-bold text-left flex items-center justify-between transition-all cursor-pointer"
              >
                <span>Project Canvas & Metodologia</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#8b4dff]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
