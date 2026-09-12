import React, { useState } from 'react';
import { PortfolioEntity, EwsAlert, SimulationTriggerType, AlertFrequency } from '../types/monitoring';
import { simulateMonitoringTrigger } from '../services/monitoringEngine';
import { Borrower } from '../types/borrower';
import { TooltipHelp, AGRO_TERMS_GLOSSARY } from './TooltipHelp';
import { 
  ShieldAlert, 
  Bell, 
  Clock, 
  Calendar, 
  Sparkles, 
  Search, 
  TrendingDown, 
  User, 
  Building2, 
  Filter, 
  CheckCircle2, 
  ArrowUpRight,
  Flame,
  Zap,
  HelpCircle
} from 'lucide-react';

interface EarlyWarningDashboardProps {
  portfolio: PortfolioEntity[];
  alerts: EwsAlert[];
  onAddAlert: (alert: EwsAlert, updatedEntity: Partial<PortfolioEntity>) => void;
  borrowersList: Borrower[];
  onSelectBorrowerForAnalysis: (borrowerId: string) => void;
}

export const EarlyWarningDashboard: React.FC<EarlyWarningDashboardProps> = ({
  portfolio,
  alerts,
  onAddAlert,
  borrowersList,
  onSelectBorrowerForAnalysis,
}) => {
  const [selectedFreqFilter, setSelectedFreqFilter] = useState<'ALL' | AlertFrequency>('ALL');
  const [selectedRatingFilter, setSelectedRatingFilter] = useState<'ALL' | 'A' | 'B' | 'C' | 'D'>('ALL');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<'ALL' | 'PF' | 'PJ'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [targetBorrowerId, setTargetBorrowerId] = useState<string>(portfolio[0]?.id || 'case-pf-sorriso');
  const [lastSimulationNote, setLastSimulationNote] = useState<string | null>(null);

  // KPIs
  const totalExposure = portfolio.reduce((acc, p) => acc + p.exposureBrl, 0);
  const highRiskExposure = portfolio
    .filter((p) => p.currentRating === 'C' || p.currentRating === 'D')
    .reduce((acc, p) => acc + p.exposureBrl, 0);
  const criticalCount = portfolio.filter((p) => p.currentRating === 'D').length;
  const highRiskCount = portfolio.filter((p) => p.currentRating === 'C').length;

  // Filtered Alerts
  const filteredAlerts = alerts.filter((a) => {
    if (selectedFreqFilter !== 'ALL' && a.frequency !== selectedFreqFilter) return false;
    return true;
  });

  // Filtered Portfolio by Rating, Type and Search Query
  const filteredPortfolio = portfolio.filter((p) => {
    if (selectedRatingFilter !== 'ALL' && p.currentRating !== selectedRatingFilter) return false;
    if (selectedTypeFilter !== 'ALL' && p.type !== selectedTypeFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchDoc = p.document.includes(q);
      const matchLoc = p.location.toLowerCase().includes(q);
      if (!matchName && !matchDoc && !matchLoc) return false;
    }
    return true;
  });

  const handleSimulate = (triggerType: SimulationTriggerType) => {
    const borrower = borrowersList.find((b) => b.id === targetBorrowerId) || borrowersList[0];
    const { newAlert, updatedEntity } = simulateMonitoringTrigger(borrower, triggerType);
    onAddAlert(newAlert, updatedEntity);
    setLastSimulationNote(`⚡ Evento Simulado: ${newAlert.title} (${borrower.name})`);
    setTimeout(() => setLastSimulationNote(null), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Exposição Monitorada</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <div className="text-2xl font-black font-mono text-white">
            R$ {(totalExposure / 1000000).toFixed(1)}M
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {portfolio.length} clientes ativos na carteira Krill Tech
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Exposição em Risco (C & D)</span>
            <TrendingDown className="h-4 w-4 text-rose-400" />
          </div>
          <div className="text-2xl font-black font-mono text-rose-400">
            R$ {(highRiskExposure / 1000000).toFixed(1)}M
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {criticalCount + highRiskCount} clientes sob alerta de insolvência
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Gatilhos Imediatos 24h</span>
            <Clock className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black font-mono text-amber-400">
            {alerts.filter((a) => a.frequency === 'IMMEDIATE_24H').length} alertas
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Execuções e pedidos de RJ no DataJud
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>SLA de Alerta Precoce</span>
            <CheckCircle2 className="h-4 w-4 text-teal-400" />
          </div>
          <div className="text-2xl font-black font-mono text-teal-400">
            &lt; 24 horas
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Tempo médio de detecção pós-distribuição
          </p>
        </div>
      </div>

      {/* Interactive Simulation Cockpit for Pitch & Judges */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border-2 border-emerald-500/40 rounded-2xl p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-400" />
              <h3 className="text-base font-bold text-white tracking-tight">
                Simulador de Eventos de Estresse em Tempo Real (Pitch & Demonstração)
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Injente eventos reais para ver o sistema detectar, reclassificar o score e disparar o alerta imediato
            </p>
          </div>

          {/* Target Borrower Selector */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Alvo:</span>
            <select
              value={targetBorrowerId}
              onChange={(e) => setTargetBorrowerId(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200 font-semibold focus:outline-none focus:border-emerald-500"
            >
              {portfolio.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name.split(' ')[0]} ({p.type} - {p.location})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Simulation Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-4">
          <button
            onClick={() => handleSimulate('DATAJUD_EXECUTION')}
            className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-left border border-slate-800 hover:border-rose-500/50 transition-all group active:scale-95"
          >
            <span className="text-[10px] font-mono text-rose-400 font-bold block mb-1">GATILHO 24H</span>
            <span className="text-xs font-bold text-slate-200 group-hover:text-white block">
              + Execução Judicial
            </span>
            <span className="text-[10px] text-slate-400 block mt-1">DataJud R$ 1.8M</span>
          </button>

          <button
            onClick={() => handleSimulate('DATAJUD_RJ_FILING')}
            className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-left border border-slate-800 hover:border-rose-500/50 transition-all group active:scale-95"
          >
            <span className="text-[10px] font-mono text-rose-400 font-bold block mb-1">ALERTA MÁXIMO</span>
            <span className="text-xs font-bold text-slate-200 group-hover:text-white block">
              Distribuição de RJ
            </span>
            <span className="text-[10px] text-slate-400 block mt-1">Stay Period Iminente</span>
          </button>

          <button
            onClick={() => handleSimulate('PGFN_ACTIVE_DEBT')}
            className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-left border border-slate-800 hover:border-amber-500/50 transition-all group active:scale-95"
          >
            <span className="text-[10px] font-mono text-amber-400 font-bold block mb-1">MENSAL AUTO</span>
            <span className="text-xs font-bold text-slate-200 group-hover:text-white block">
              Inscrição Dívida Ativa
            </span>
            <span className="text-[10px] text-slate-400 block mt-1">PGFN R$ 840k</span>
          </button>

          <button
            onClick={() => handleSimulate('INMET_DROUGHT_SPIKE')}
            className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-left border border-slate-800 hover:border-sky-500/50 transition-all group active:scale-95"
          >
            <span className="text-[10px] font-mono text-sky-400 font-bold block mb-1">CHECK SAFRA</span>
            <span className="text-xs font-bold text-slate-200 group-hover:text-white block">
              Seca Severa (-45%)
            </span>
            <span className="text-[10px] text-slate-400 block mt-1">INMET Fase R4</span>
          </button>

          <button
            onClick={() => handleSimulate('ZARC_WINDOW_VIOLATION')}
            className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-left border border-slate-800 hover:border-amber-500/50 transition-all group active:scale-95"
          >
            <span className="text-[10px] font-mono text-amber-400 font-bold block mb-1">RED FLAG SAFRA</span>
            <span className="text-xs font-bold text-slate-200 group-hover:text-white block">
              Desvio Janela ZARC
            </span>
            <span className="text-[10px] text-slate-400 block mt-1">+22 dias após prazo</span>
          </button>

          <button
            onClick={() => handleSimulate('QSA_SUSPICIOUS_CHANGE')}
            className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-left border border-slate-800 hover:border-teal-500/50 transition-all group active:scale-95"
          >
            <span className="text-[10px] font-mono text-teal-400 font-bold block mb-1">MENSAL AUTO</span>
            <span className="text-xs font-bold text-slate-200 group-hover:text-white block">
              Mudança no QSA
            </span>
            <span className="text-[10px] text-slate-400 block mt-1">Receita Federal</span>
          </button>
        </div>

        {lastSimulationNote && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between animate-fade-in">
            <span className="font-semibold flex items-center gap-2">
              <Zap className="h-4 w-4 text-emerald-400" />
              <span>{lastSimulationNote}</span>
            </span>
            <span className="text-[10px] text-emerald-400/80">Alerta adicionado e carteira recalculada</span>
          </div>
        )}
      </div>

      {/* Two columns: Alert Feed & Searchable Portfolio Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Alerts Feed (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-amber-400" />
                <h4 className="text-sm font-bold text-white">
                  Linha do Tempo de Alertas ({filteredAlerts.length})
                </h4>
              </div>

              {/* Filter by Frequency */}
              <div className="flex items-center gap-1 text-[11px]">
                <button
                  onClick={() => setSelectedFreqFilter('ALL')}
                  className={`px-2 py-0.5 rounded font-medium ${selectedFreqFilter === 'ALL' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400'}`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setSelectedFreqFilter('IMMEDIATE_24H')}
                  className={`px-2 py-0.5 rounded font-medium ${selectedFreqFilter === 'IMMEDIATE_24H' ? 'bg-rose-500/20 text-rose-300 font-bold' : 'text-slate-400'}`}
                >
                  24h
                </button>
                <button
                  onClick={() => setSelectedFreqFilter('MONTHLY_AUTOMATED')}
                  className={`px-2 py-0.5 rounded font-medium ${selectedFreqFilter === 'MONTHLY_AUTOMATED' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-slate-400'}`}
                >
                  Mensal
                </button>
                <button
                  onClick={() => setSelectedFreqFilter('SEASONAL_HARVEST')}
                  className={`px-2 py-0.5 rounded font-medium ${selectedFreqFilter === 'SEASONAL_HARVEST' ? 'bg-sky-500/20 text-sky-300 font-bold' : 'text-slate-400'}`}
                >
                  Safra
                </button>
              </div>
            </div>

            {/* Alert List */}
            <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
              {filteredAlerts.length === 0 ? (
                <div className="text-slate-400 text-xs text-center py-8">
                  Nenhum alerta para o filtro selecionado.
                </div>
              ) : (
                filteredAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-3.5 rounded-xl border text-xs transition-all ${
                      alert.severity === 'CRITICAL'
                        ? 'bg-rose-950/20 border-rose-500/30'
                        : alert.severity === 'HIGH'
                        ? 'bg-amber-950/20 border-amber-500/30'
                        : 'bg-slate-950/70 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          alert.frequency === 'IMMEDIATE_24H'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : alert.frequency === 'MONTHLY_AUTOMATED'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                        }`}
                      >
                        {alert.frequency === 'IMMEDIATE_24H'
                          ? '⚡ Gatilho 24h'
                          : alert.frequency === 'MONTHLY_AUTOMATED'
                          ? '📅 Mensal Auto'
                          : '🌾 Check Safra'}
                      </span>

                      <span className="text-[10px] font-mono text-slate-400">{alert.timestamp}</span>
                    </div>

                    <h5 className="font-bold text-white text-xs mb-1 leading-snug">
                      {alert.title}
                    </h5>

                    <p className="text-[11px] text-slate-300 mb-2 leading-relaxed">
                      {alert.detail}
                    </p>

                    <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800 text-[10px] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Cliente / Tomador:</span>
                        <span className="font-semibold text-slate-200">{alert.borrowerName}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Impacto no Score:</span>
                        <span className="font-mono font-bold text-rose-400">
                          {alert.scoreImpact} pts (Rating {alert.previousRating} → {alert.newRating})
                        </span>
                      </div>
                      <div className="pt-1 border-t border-slate-800 text-slate-300">
                        <strong className="text-amber-400">Ação Krill Tech: </strong>
                        <span>{alert.actionRequired}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right: Searchable Portfolio Monitor Table (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <h4 className="text-sm font-bold text-white">
                Carteira sob Monitoramento ({filteredPortfolio.length})
              </h4>
              <p className="text-[11px] text-slate-400">
                Acompanhamento contínuo de exposição e reavaliação periódica
              </p>
            </div>

            {/* Type Filter Pills */}
            <div className="flex items-center gap-1.5 text-[11px]">
              <button
                onClick={() => setSelectedTypeFilter('ALL')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  selectedTypeFilter === 'ALL'
                    ? 'bg-slate-800 text-white font-bold border border-slate-700'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setSelectedTypeFilter('PF')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  selectedTypeFilter === 'PF'
                    ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Produtor (PF)
              </button>
              <button
                onClick={() => setSelectedTypeFilter('PJ')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  selectedTypeFilter === 'PJ'
                    ? 'bg-teal-500/20 text-teal-300 font-bold border border-teal-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Revenda (PJ)
              </button>
            </div>
          </div>

          {/* Search bar and rating filter */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nome, documento ou município..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div className="flex items-center gap-1 text-[11px] self-end sm:self-center shrink-0">
              <span className="text-slate-400 text-xs mr-1 flex items-center gap-1">
                <Filter className="h-3 w-3" />
              </span>
              {(['ALL', 'A', 'B', 'C', 'D'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedRatingFilter(r)}
                  className={`px-2 py-0.5 rounded font-bold ${
                    selectedRatingFilter === r
                      ? 'bg-slate-800 text-white border border-slate-700'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {r === 'ALL' ? 'Todos' : r}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase font-bold">
                  <th className="pb-2.5">Tomador</th>
                  <th className="pb-2.5">Local / Atividade</th>
                  <th className="pb-2.5 text-right">Exposição</th>
                  <th className="pb-2.5 text-center">Score</th>
                  <th className="pb-2.5 text-center">Rating</th>
                  <th className="pb-2.5 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredPortfolio.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-slate-500">
                      Nenhum cliente encontrado para os critérios de busca.
                    </td>
                  </tr>
                ) : (
                  filteredPortfolio.map((entity) => {
                    return (
                      <tr key={entity.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            {entity.type === 'PF' ? (
                              <User className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                            ) : (
                              <Building2 className="h-3.5 w-3.5 text-teal-400 shrink-0" />
                            )}
                            <div>
                              <span className="font-bold text-white block leading-tight">
                                {entity.name}
                              </span>
                              <span className="text-[10px] font-mono text-slate-400">
                                {entity.document}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 text-slate-300">
                          <span>{entity.location}</span>
                          <span className="text-[10px] text-slate-400 block">
                            {entity.cropOrSector}
                          </span>
                        </td>

                        <td className="py-3 text-right font-mono font-bold text-slate-200">
                          R$ {(entity.exposureBrl / 1000).toLocaleString('pt-BR')}k
                        </td>

                        <td className="py-3 text-center font-mono font-bold">
                          <span
                            className={
                              entity.currentScore >= 800
                                ? 'text-emerald-400'
                                : entity.currentScore >= 600
                                ? 'text-sky-400'
                                : entity.currentScore >= 400
                                ? 'text-amber-400'
                                : 'text-rose-400'
                            }
                          >
                            {entity.currentScore}
                          </span>
                        </td>

                        <td className="py-3 text-center">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              entity.currentRating === 'A'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : entity.currentRating === 'B'
                                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                                : entity.currentRating === 'C'
                                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            }`}
                          >
                            {entity.currentRating}
                          </span>
                        </td>

                        <td className="py-3 text-center">
                          <button
                            onClick={() => onSelectBorrowerForAnalysis(entity.id)}
                            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-300 text-[10px] font-bold transition-all flex items-center gap-1 mx-auto active:scale-95 shadow-sm"
                          >
                            <span>Analisar</span>
                            <ArrowUpRight className="h-3 w-3" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
