import React, { useState } from 'react';
import { PortfolioEntity, EwsAlert, AlertFrequency } from '../types/monitoring';
import { Borrower } from '../types/borrower';
import { 
  ShieldAlert, 
  Bell, 
  Clock, 
  AlertOctagon, 
  TrendingDown, 
  Sparkles, 
  Zap, 
  Lock, 
  Scale, 
  FileWarning, 
  User, 
  Building2,
  ArrowRight,
  FlaskConical,
  Info,
  CheckCircle2,
  Database
} from 'lucide-react';
import { TooltipHelp, AGRO_TERMS_GLOSSARY } from './TooltipHelp';

interface AlertaPrecoceRJViewProps {
  portfolio: PortfolioEntity[];
  alerts: EwsAlert[];
  onAddAlert: (alert: EwsAlert, updatedEntity: Partial<PortfolioEntity>) => void;
  borrowersList: Borrower[];
  onSelectClientForDeepDive: (clientId: string) => void;
  onOpenTestBench?: () => void;
}

export const AlertaPrecoceRJView: React.FC<AlertaPrecoceRJViewProps> = ({
  portfolio,
  alerts,
  onAddAlert,
  borrowersList,
  onSelectClientForDeepDive,
  onOpenTestBench,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'IMMEDIATE_24H' | 'PERIODIC' | 'SIMULATED'>('ALL');

  // Considera apenas alertas sobre tomadores com exposição aberta
  const criticalClients = portfolio.filter((p) => p.currentRating === 'D');
  const highRiskClients = portfolio.filter((p) => p.currentRating === 'C');
  const totalExposureAtRisk = [...criticalClients, ...highRiskClients].reduce(
    (acc, p) => acc + p.exposureBrl,
    0
  );

  const realAlertsCount = alerts.filter((a) => !a.isSimulated).length;
  const simAlertsCount = alerts.filter((a) => a.isSimulated).length;

  const filteredAlerts = alerts.filter((a) => {
    if (selectedFilter === 'IMMEDIATE_24H' && a.frequency !== 'IMMEDIATE_24H') return false;
    if (selectedFilter === 'PERIODIC' && a.frequency === 'IMMEDIATE_24H') return false;
    if (selectedFilter === 'SIMULATED' && !a.isSimulated) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto pb-10">
      {/* Top Banner */}
      <div className="bg-[#151310] border border-[#2E2A22] rounded-3xl p-6 sm:p-7 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 rounded-full text-xs font-display font-bold bg-[#4A6FE0]/20 text-[#E0A94E] border border-[#4A6FE0]/40 uppercase tracking-wider">
              Exposição Ativa
            </span>
            <span className="text-xs text-stone-500 font-display">Alerta Precoce de Insolvência</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
            Alerta Precoce de Recuperação Judicial & Insolvência
          </h2>

          <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-3xl font-sans leading-relaxed">
            Monitoramento de eventos judiciais (DataJud), execuções de duplicatas e protestos para tomadores com exposição na Krill Tech, acionando o protocolo de contenção antes do <strong>Stay Period</strong> de 180 dias.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-[#1C1915] p-4 rounded-2xl border border-rose-500/30 text-right">
            <span className="text-[10px] font-display uppercase tracking-wider text-rose-400 block mb-0.5">
              Exposição em Risco (C & D)
            </span>
            <span className="text-2xl font-black font-display text-rose-400">
              R$ {(totalExposureAtRisk / 1000000).toFixed(1)}M
            </span>
            <span className="text-[10px] text-stone-500 block mt-0.5 font-sans">
              {criticalClients.length} em Rating D • {highRiskClients.length} em Rating C
            </span>
          </div>

          {onOpenTestBench && (
            <button
              onClick={onOpenTestBench}
              className="px-4 py-3 rounded-2xl bg-[#242019] hover:bg-[#4A6FE0] text-[#E0A94E] hover:text-white border border-[#2E2A22] hover:border-[#4A6FE0] text-xs font-display font-bold flex items-center gap-2 transition-all cursor-pointer h-full"
              title="Abrir bancada lateral para injetar testes"
            >
              <Zap className="h-4 w-4 text-[#E0A94E]" />
              <span className="hidden sm:inline">Testes</span>
            </button>
          )}
        </div>
      </div>

      {/* Protocolo Operacional de Resposta Rápida (4 Etapas de Contenção) */}
      <div className="bg-[#151310] border border-[#2E2A22] rounded-2xl p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#2E2A22]">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-rose-400" />
            <h3 className="text-sm font-display font-bold text-white">
              Protocolo Operacional de Blindagem & Contenção de Perdas
            </h3>
          </div>
          <span className="text-xs text-stone-400 font-display">Ação Imediata</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-[#1C1915] border border-[#2E2A22] space-y-0.5">
            <span className="text-[10px] font-display font-bold text-[#E0A94E] uppercase">Passo 1 • T + 0h</span>
            <h4 className="text-xs font-display font-bold text-white">Trava de Faturas</h4>
            <p className="text-[11px] text-stone-400 font-sans">
              Bloqueio automatizado de liberação de insumos a prazo no ERP.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-[#1C1915] border border-[#2E2A22] space-y-0.5">
            <span className="text-[10px] font-display font-bold text-[#E0A94E] uppercase">Passo 2 • T + 4h</span>
            <h4 className="text-xs font-display font-bold text-white">Retenção de Recebíveis</h4>
            <p className="text-[11px] text-stone-400 font-sans">
              Notificação a compradores para retenção de liquidações de grãos.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-[#1C1915] border border-[#2E2A22] space-y-0.5">
            <span className="text-[10px] font-display font-bold text-[#E0A94E] uppercase">Passo 3 • T + 12h</span>
            <h4 className="text-xs font-display font-bold text-white">Execução de CPR Física</h4>
            <p className="text-[11px] text-stone-400 font-sans">
              Apropriação de grãos colhidos antes de liminar do Stay Period.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-[#1C1915] border border-[#2E2A22] space-y-0.5">
            <span className="text-[10px] font-display font-bold text-rose-400 uppercase">Passo 4 • T + 24h</span>
            <h4 className="text-xs font-display font-bold text-white">Comitê de Crise Jurídica</h4>
            <p className="text-[11px] text-stone-400 font-sans">
              Habilitação tempestiva de créditos e garantias extraconcursais.
            </p>
          </div>
        </div>
      </div>

      {/* Critical Alerts Timeline Feed */}
      <div className="bg-[#151310] border border-[#2E2A22] rounded-2xl p-6 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#2E2A22]">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-rose-400" />
            <h3 className="text-base font-display font-black text-white">
              Feed de Alertas de Exposição ({filteredAlerts.length})
            </h3>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              onClick={() => setSelectedFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg font-display font-medium transition-all cursor-pointer ${
                selectedFilter === 'ALL'
                  ? 'bg-[#4A6FE0] text-white font-bold shadow-md shadow-[#4A6FE0]/30'
                  : 'bg-[#1C1915] text-stone-400 border border-[#2E2A22] hover:text-white'
              }`}
            >
              Todos ({alerts.length})
            </button>

            <button
              onClick={() => setSelectedFilter('IMMEDIATE_24H')}
              className={`px-3 py-1.5 rounded-lg font-display font-medium transition-all cursor-pointer ${
                selectedFilter === 'IMMEDIATE_24H'
                  ? 'bg-rose-600 text-white font-bold shadow-md shadow-rose-600/30'
                  : 'bg-[#1C1915] text-stone-400 border border-[#2E2A22] hover:text-white'
              }`}
            >
              Gatilhos 24h DataJud ({alerts.filter((a) => a.frequency === 'IMMEDIATE_24H').length})
            </button>

            <button
              onClick={() => setSelectedFilter('PERIODIC')}
              className={`px-3 py-1.5 rounded-lg font-display font-medium transition-all cursor-pointer ${
                selectedFilter === 'PERIODIC'
                  ? 'bg-[#242019] text-white font-bold border border-[#4A6FE0]'
                  : 'bg-[#1C1915] text-stone-400 border border-[#2E2A22] hover:text-white'
              }`}
            >
              Varreduras Periódicas ({alerts.filter((a) => a.frequency !== 'IMMEDIATE_24H').length})
            </button>

            {simAlertsCount > 0 && (
              <button
                onClick={() => setSelectedFilter('SIMULATED')}
                className={`px-3 py-1.5 rounded-lg font-display font-medium transition-all cursor-pointer ${
                  selectedFilter === 'SIMULATED'
                    ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-600/30'
                    : 'bg-[#1C1915] text-purple-300 border border-purple-500/40 border-dashed hover:text-white'
                }`}
              >
                Cenários Injetados ({simAlertsCount})
              </button>
            )}
          </div>
        </div>

        {/* Alerts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAlerts.map((alert) => {
            const isSim = alert.isSimulated;

            return (
              <div
                key={alert.id}
                className={`p-4 rounded-xl border text-xs flex flex-col justify-between transition-all ${
                  alert.severity === 'CRITICAL'
                    ? 'bg-rose-950/20 border-rose-500/40 shadow-lg shadow-rose-950/20'
                    : 'bg-amber-950/20 border-amber-500/40'
                } ${isSim ? 'border-dashed border-purple-500/60' : ''}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[10px] font-display font-bold px-2 py-0.5 rounded uppercase ${
                          alert.frequency === 'IMMEDIATE_24H'
                            ? 'bg-rose-500/30 text-rose-200 border border-rose-500/40'
                            : 'bg-amber-500/30 text-amber-200 border border-amber-500/40'
                        }`}
                      >
                        {alert.frequency === 'IMMEDIATE_24H' ? '⚡ Gatilho 24h DataJud' : '📅 Verificação Periódica'}
                      </span>

                      {isSim && (
                        <span className="text-[9px] font-display font-semibold text-purple-300 bg-purple-500/20 px-1.5 py-0.5 rounded border border-purple-500/40 border-dashed">
                          Simulação Injetada
                        </span>
                      )}
                    </div>

                    <span className="text-[10px] font-display text-stone-500">{alert.timestamp}</span>
                  </div>

                  <h4 className="text-xs font-display font-extrabold text-white mb-1.5 leading-snug">
                    {alert.title}
                  </h4>

                  <p className="text-[11px] text-stone-300 font-sans leading-relaxed mb-3">
                    {alert.detail}
                  </p>
                </div>

                <div className="bg-[#0D0C0A] p-3 rounded-xl border border-[#2E2A22] text-[11px] space-y-1.5">
                  <div className="flex justify-between items-center font-sans">
                    <span className="text-stone-500">Tomador com Exposição:</span>
                    <span className="font-bold text-white font-display">{alert.borrowerName}</span>
                  </div>
                  <div className="flex justify-between items-center font-sans">
                    <span className="text-stone-500">Degradação no Score:</span>
                    <span className="font-display font-bold text-rose-400">
                      {alert.scoreImpact} pts (Rating {alert.previousRating} → {alert.newRating})
                    </span>
                  </div>
                  <div className="pt-1.5 border-t border-[#2E2A22] text-stone-300 font-sans leading-relaxed">
                    <strong className="text-amber-400 font-display">Protocolo Obrigatório: </strong>
                    <span>{alert.actionRequired}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
