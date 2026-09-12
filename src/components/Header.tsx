import React from 'react';
import { 
  ShieldAlert, 
  Activity, 
  BookOpen, 
  Layers, 
  Bell, 
  CheckCircle2, 
  TrendingUp,
  Lightbulb,
  UserCheck,
  Search,
  FileCheck2,
  Calendar
} from 'lucide-react';

export type MainAppTab = 
  | 'triagem' 
  | 'duediligence' 
  | 'monitoramento' 
  | 'alerta_rj' 
  | 'canvas';

interface HeaderProps {
  activeTab: MainAppTab;
  setActiveTab: (tab: MainAppTab) => void;
  activeAlertCount: number;
  totalExposureBrl: number;
  onOpenTutorial: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  activeAlertCount,
  totalExposureBrl,
  onOpenTutorial,
}) => {
  return (
    <header className="border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md sticky top-0 z-40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Identity */}
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-400/30">
              <Layers className="h-5 w-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-extrabold tracking-tight text-white">
                  KRILL <span className="text-emerald-400">TECH</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hidden lg:inline-block uppercase tracking-wider">
                  Edital 01/2026 PMI-DF
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                Prevenção à Inadimplência & Análise de Risco no Agronegócio
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="hidden 2xl:flex items-center space-x-4 text-xs text-slate-300">
            <div className="flex items-center space-x-2 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-slate-400">Carteira Ativa:</span>
              <strong className="text-white font-mono">
                R$ {(totalExposureBrl / 1000000).toFixed(1)}M
              </strong>
            </div>

            <div className="flex items-center space-x-2 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800">
              <Bell className="h-3.5 w-3.5 text-amber-400" />
              <span className="text-slate-400">Alertas:</span>
              <span className={`px-1.5 py-0.2 rounded font-bold font-mono ${activeAlertCount > 0 ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                {activeAlertCount}
              </span>
            </div>
          </div>

          {/* Actions & Navigation Tabs */}
          <div className="flex items-center space-x-2">
            {/* Interactive Mini Tutorial Trigger Button */}
            <button
              onClick={onOpenTutorial}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 transition-all flex items-center gap-1.5 shadow-sm active:scale-95 shrink-0"
              title="Abrir o Mini Tutorial Guiado Interativo"
            >
              <Lightbulb className="h-3.5 w-3.5 text-amber-400 fill-amber-400/20" />
              <span className="hidden sm:inline">Tutorial</span>
            </button>

            {/* Navigation Tabs - Segregated by the 4 Official Regulation Views */}
            <nav className="flex space-x-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800/90 text-xs overflow-x-auto">
              {/* Group 1: Novos Clientes */}
              <button
                onClick={() => setActiveTab('triagem')}
                className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg font-medium transition-all shrink-0 ${
                  activeTab === 'triagem'
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
                title="Novos Clientes: Gate de Entrada"
              >
                <UserCheck className="h-3.5 w-3.5" />
                <span>Triagem</span>
              </button>

              <button
                onClick={() => setActiveTab('duediligence')}
                className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg font-medium transition-all shrink-0 ${
                  activeTab === 'duediligence'
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
                title="Novos Clientes: Antes de conceder a primeira linha"
              >
                <Activity className="h-3.5 w-3.5" />
                <span>Due Diligence</span>
              </button>

              {/* Separator */}
              <span className="w-px h-5 bg-slate-800 self-center mx-0.5" />

              {/* Group 2: Clientes Atuais */}
              <button
                onClick={() => setActiveTab('monitoramento')}
                className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg font-medium transition-all shrink-0 ${
                  activeTab === 'monitoramento'
                    ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
                title="Clientes Atuais: Carteira já ativa"
              >
                <Calendar className="h-3.5 w-3.5" />
                <span>Monitoramento</span>
              </button>

              <button
                onClick={() => setActiveTab('alerta_rj')}
                className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg font-medium transition-all shrink-0 relative ${
                  activeTab === 'alerta_rj'
                    ? 'bg-rose-500 text-white font-bold shadow-md shadow-rose-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
                title="Clientes Atuais: Risco Crítico de RJ e Exposição Aberta"
              >
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>Alerta RJ</span>
                {activeAlertCount > 0 && (
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                )}
              </button>

              {/* Separator */}
              <span className="w-px h-5 bg-slate-800 self-center mx-0.5" />

              {/* Project Canvas & Pitch */}
              <button
                onClick={() => setActiveTab('canvas')}
                className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg font-medium transition-all shrink-0 ${
                  activeTab === 'canvas'
                    ? 'bg-slate-800 text-emerald-400 font-bold border border-emerald-500/40'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
                title="Project Canvas & Pitch da Solução (Seção 7 do Edital)"
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>Canvas</span>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
