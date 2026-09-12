import React, { useState } from 'react';
import { PortfolioEntity, EwsAlert, SimulationTriggerType, AlertFrequency } from '../types/monitoring';
import { simulateMonitoringTrigger } from '../services/monitoringEngine';
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
  ArrowRight
} from 'lucide-react';
import { TooltipHelp, AGRO_TERMS_GLOSSARY } from './TooltipHelp';

interface AlertaPrecoceRJViewProps {
  portfolio: PortfolioEntity[];
  alerts: EwsAlert[];
  onAddAlert: (alert: EwsAlert, updatedEntity: Partial<PortfolioEntity>) => void;
  borrowersList: Borrower[];
  onSelectClientForDeepDive: (clientId: string) => void;
}

export const AlertaPrecoceRJView: React.FC<AlertaPrecoceRJViewProps> = ({
  portfolio,
  alerts,
  onAddAlert,
  borrowersList,
  onSelectClientForDeepDive,
}) => {
  const [selectedFreqFilter, setSelectedFreqFilter] = useState<'ALL' | AlertFrequency>('ALL');
  const [targetBorrowerId, setTargetBorrowerId] = useState<string>(portfolio[0]?.id || 'case-pj-rio-verde');
  const [lastSimulationNote, setLastSimulationNote] = useState<string | null>(null);

  // Considera apenas alertas sobre tomadores com exposição aberta
  const criticalClients = portfolio.filter((p) => p.currentRating === 'D');
  const highRiskClients = portfolio.filter((p) => p.currentRating === 'C');
  const totalExposureAtRisk = [...criticalClients, ...highRiskClients].reduce(
    (acc, p) => acc + p.exposureBrl,
    0
  );

  const filteredAlerts = alerts.filter((a) => {
    if (selectedFreqFilter !== 'ALL' && a.frequency !== selectedFreqFilter) return false;
    return true;
  });

  const handleSimulate = (triggerType: SimulationTriggerType) => {
    const borrower = borrowersList.find((b) => b.id === targetBorrowerId) || borrowersList[0];
    const { newAlert, updatedEntity } = simulateMonitoringTrigger(borrower, triggerType);
    onAddAlert(newAlert, updatedEntity);
    setLastSimulationNote(`⚡ Alerta Disparado: ${newAlert.title} (${borrower.name})`);
    setTimeout(() => setLastSimulationNote(null), 5000);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-rose-950/40 via-slate-900 to-slate-950 border border-rose-500/30 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase tracking-wider">
              Clientes Atuais com Saldo Devedor
            </span>
            <span className="text-xs text-slate-400 font-mono">Fase 4 do Edital 01/2026</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Alerta Precoce de Recuperação Judicial & Insolvência
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
            Só existe alerta de risco sobre quem <strong>já possui exposição financeira aberta</strong> com a Krill Tech. Monitora o risco de estresse manifesto nos tribunais (DataJud), execuções de duplicatas e ajuizamento de RJ para acionar o protocolo de contenção antes do <strong>Stay Period</strong> legal de 180 dias.
          </p>
        </div>

        <div className="bg-slate-950/80 p-4 rounded-xl border border-rose-500/30 text-right shrink-0">
          <span className="text-[10px] uppercase tracking-wider text-rose-400 block mb-0.5">
            Exposição em Risco Crítico (C & D)
          </span>
          <span className="text-2xl font-black font-mono text-rose-400">
            R$ {(totalExposureAtRisk / 1000000).toFixed(1)}M
          </span>
          <span className="text-[10px] text-slate-500 block mt-0.5">
            {criticalClients.length} em Rating D • {highRiskClients.length} em Rating C
          </span>
        </div>
      </div>

      {/* Strategic Rule Box: Alerta Precoce vs Prevenção */}
      <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-5 shadow-lg">
        <div className="flex items-start gap-3">
          <Scale className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <span className="font-bold text-amber-300 text-xs">
              A Premissa Honesta do Projeto: Alerta Precoce, Não "Prevenção Milagrosa"
            </span>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              O caso emblemático da <strong>TerraMagna</strong> (maior agfintech da América Latina, com satélite e IA) como credora de <strong>R$ 28 milhões na RJ da AgroGalaxy</strong> prova que nenhuma tecnologia elimina a insolvência externa. O valor do sistema Krill Tech é <strong>detectar até 6 meses antes</strong> e reduzir a exposição comercial enquanto o devedor ainda possui liquidez e antes que o Stay Period paralise as execuções.
            </p>
          </div>
        </div>
      </div>

      {/* Real-time Interactive Simulator (for Pitch & Hackathon Judges) */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border-2 border-rose-500/40 rounded-2xl p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-rose-400" />
              <h3 className="text-base font-bold text-white tracking-tight">
                Simulador de Disparo de Alerta em Tempo Real (Demonstração da Banca)
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Acione eventos judiciais ou de safra para simular o gatilho imediato de 24h e o rebaixamento de rating
            </p>
          </div>

          {/* Target Selector */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Cliente com Exposição:</span>
            <select
              value={targetBorrowerId}
              onChange={(e) => setTargetBorrowerId(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200 font-semibold focus:outline-none focus:border-rose-500"
            >
              {portfolio.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name.split(' ')[0]} ({p.type} - Exposição R$ {(p.exposureBrl / 1000).toFixed(0)}k)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-4">
          <button
            onClick={() => handleSimulate('DATAJUD_EXECUTION')}
            className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-left border border-slate-800 hover:border-rose-500 transition-all group active:scale-95"
          >
            <span className="text-[10px] font-mono text-rose-400 font-bold block mb-1">GATILHO 24H</span>
            <span className="text-xs font-bold text-slate-200 group-hover:text-white block">
              + Execução Judicial
            </span>
            <span className="text-[10px] text-slate-400 block mt-1">DataJud R$ 1.8M</span>
          </button>

          <button
            onClick={() => handleSimulate('DATAJUD_RJ_FILING')}
            className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-left border border-slate-800 hover:border-rose-500 transition-all group active:scale-95"
          >
            <span className="text-[10px] font-mono text-rose-400 font-bold block mb-1">ALERTA MÁXIMO</span>
            <span className="text-xs font-bold text-slate-200 group-hover:text-white block">
              Distribuição de RJ
            </span>
            <span className="text-[10px] text-slate-400 block mt-1">Stay Period Iminente</span>
          </button>

          <button
            onClick={() => handleSimulate('PGFN_ACTIVE_DEBT')}
            className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-left border border-slate-800 hover:border-amber-500 transition-all group active:scale-95"
          >
            <span className="text-[10px] font-mono text-amber-400 font-bold block mb-1">DÍVIDA ATIVA</span>
            <span className="text-xs font-bold text-slate-200 group-hover:text-white block">
              Inscrição PGFN
            </span>
            <span className="text-[10px] text-slate-400 block mt-1">R$ 840.000 DAU</span>
          </button>

          <button
            onClick={() => handleSimulate('INMET_DROUGHT_SPIKE')}
            className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-left border border-slate-800 hover:border-sky-500 transition-all group active:scale-95"
          >
            <span className="text-[10px] font-mono text-sky-400 font-bold block mb-1">ESTRESSE SAFRA</span>
            <span className="text-xs font-bold text-slate-200 group-hover:text-white block">
              Seca Severa (-45%)
            </span>
            <span className="text-[10px] text-slate-400 block mt-1">INMET Fase R4</span>
          </button>

          <button
            onClick={() => handleSimulate('ZARC_WINDOW_VIOLATION')}
            className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-left border border-slate-800 hover:border-amber-500 transition-all group active:scale-95"
          >
            <span className="text-[10px] font-mono text-amber-400 font-bold block mb-1">DESVIO ZARC</span>
            <span className="text-xs font-bold text-slate-200 group-hover:text-white block">
              Plantio Fora Janela
            </span>
            <span className="text-[10px] text-slate-400 block mt-1">+22 dias atraso</span>
          </button>

          <button
            onClick={() => handleSimulate('QSA_SUSPICIOUS_CHANGE')}
            className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-left border border-slate-800 hover:border-teal-500 transition-all group active:scale-95"
          >
            <span className="text-[10px] font-mono text-teal-400 font-bold block mb-1">MUDANÇA QSA</span>
            <span className="text-xs font-bold text-slate-200 group-hover:text-white block">
              Troca de Controle
            </span>
            <span className="text-[10px] text-slate-400 block mt-1">Junta Comercial</span>
          </button>
        </div>

        {lastSimulationNote && (
          <div className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between animate-fade-in">
            <span className="font-semibold flex items-center gap-2">
              <Zap className="h-4 w-4 text-rose-400" />
              <span>{lastSimulationNote}</span>
            </span>
            <span className="text-[10px] text-rose-400/80">Alerta propagado para a equipe jurídica</span>
          </div>
        )}
      </div>

      {/* Critical Alerts Timeline Feed */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-rose-400" />
            <h3 className="text-base font-bold text-white">
              Alertas Ativos de Exposição Financeira ({filteredAlerts.length})
            </h3>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <button
              onClick={() => setSelectedFreqFilter('ALL')}
              className={`px-3 py-1 rounded-xl font-medium transition-all ${
                selectedFreqFilter === 'ALL'
                  ? 'bg-slate-800 text-white font-bold border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setSelectedFreqFilter('IMMEDIATE_24H')}
              className={`px-3 py-1 rounded-xl font-medium transition-all ${
                selectedFreqFilter === 'IMMEDIATE_24H'
                  ? 'bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Gatilhos 24h ({alerts.filter((a) => a.frequency === 'IMMEDIATE_24H').length})
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-2xl border text-xs flex flex-col justify-between transition-all ${
                alert.severity === 'CRITICAL'
                  ? 'bg-rose-950/20 border-rose-500/40 shadow-lg shadow-rose-950/20'
                  : 'bg-amber-950/20 border-amber-500/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      alert.frequency === 'IMMEDIATE_24H'
                        ? 'bg-rose-500/30 text-rose-200 border border-rose-500/40'
                        : 'bg-amber-500/30 text-amber-200 border border-amber-500/40'
                    }`}
                  >
                    {alert.frequency === 'IMMEDIATE_24H' ? '⚡ Gatilho 24h DataJud' : '📅 Verificação Mensal'}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{alert.timestamp}</span>
                </div>

                <h4 className="text-xs font-extrabold text-white mb-1.5 leading-snug">
                  {alert.title}
                </h4>

                <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
                  {alert.detail}
                </p>
              </div>

              <div className="bg-slate-950/90 p-3 rounded-xl border border-slate-800 text-[11px] space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Cliente / Tomador:</span>
                  <span className="font-bold text-white">{alert.borrowerName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Degradação no Score:</span>
                  <span className="font-mono font-bold text-rose-400">
                    {alert.scoreImpact} pts (Rating {alert.previousRating} → {alert.newRating})
                  </span>
                </div>
                <div className="pt-1.5 border-t border-slate-800 text-slate-300 leading-relaxed">
                  <strong className="text-amber-400">Ação Krill Tech: </strong>
                  <span>{alert.actionRequired}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
