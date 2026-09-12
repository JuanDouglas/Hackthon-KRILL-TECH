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
  Calendar,
  LayoutDashboard,
  FlaskConical,
  Zap
} from 'lucide-react';

import { BroCodeLogo } from './BroCodeLogo';

export type MainAppTab = 
  | 'dashboard'
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
  onOpenTestBench: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  activeAlertCount,
  totalExposureBrl,
  onOpenTutorial,
  onOpenTestBench,
}) => {
  return (
    <header className="border-b border-[#231c3a] bg-[#000000]/95 backdrop-blur-md sticky top-0 z-40 transition-all shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Bro-Code Brand Logo & System Identity */}
          <div className="flex items-center space-x-3.5">
            <div className="cursor-pointer" onClick={() => setActiveTab('dashboard')} title="Ir para o Agro-Stress Dashboard">
              <BroCodeLogo size="sm" variant="full" />
            </div>
            <div className="h-8 w-px bg-[#231c3a] hidden sm:block" />
            <div className="hidden sm:block">
              <div className="flex items-center space-x-2">
                <span className="text-base font-display font-black tracking-wider text-white">
                  AGRO-STRESS <span className="text-[#8b4dff]">DASHBOARD</span>
                </span>
                <span className="px-2 py-0.5 text-[9px] font-display font-bold rounded bg-[#6618F7]/20 text-[#a78bfa] border border-[#6618F7]/40 uppercase tracking-widest">
                  Krill Tech
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-400 font-sans">
                <span>Alerta Precoce de RJ & Insolvência</span>
                <span className="text-[#231c3a]">•</span>
                <a 
                  href="https://brocode.net.br" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#a78bfa] hover:text-white hover:underline font-semibold flex items-center gap-1 transition-colors"
                  title="Equipe de Engenharia BroCode Softwares"
                >
                  <span>Por BroCode Softwares</span>
                  <span className="text-[10px] text-slate-500 font-display">(brocode.net.br)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Portfolio Metrics Counter */}
          <div className="hidden xl:flex items-center space-x-3 text-xs">
            <div className="flex items-center space-x-2 bg-[#09090e] px-3.5 py-1.5 rounded-lg border border-[#231c3a]">
              <TrendingUp className="h-3.5 w-3.5 text-[#8b4dff]" />
              <span className="text-slate-400 font-sans">Exposição Total:</span>
              <strong className="text-white font-display tracking-wide font-bold">
                R$ {(totalExposureBrl / 1000000).toFixed(1)}M
              </strong>
            </div>

            <div className="flex items-center space-x-2 bg-[#09090e] px-3.5 py-1.5 rounded-lg border border-[#231c3a]">
              <Bell className="h-3.5 w-3.5 text-amber-400" />
              <span className="text-slate-400 font-sans">Alertas EWS:</span>
              <span className={`px-2 py-0.5 rounded font-display font-bold text-xs ${activeAlertCount > 0 ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}>
                {activeAlertCount}
              </span>
            </div>
          </div>

          {/* Navigation & Controls */}
          <div className="flex items-center space-x-2">
            {/* Decoupled Test Bench Trigger Button */}
            <button
              onClick={onOpenTestBench}
              className="px-2.5 py-1.5 rounded-lg text-xs font-sans font-bold bg-[#141422] text-[#a78bfa] border border-[#231c3a] hover:border-[#6618F7]/60 hover:bg-[#6618F7]/15 transition-all flex items-center gap-1.5 shadow-sm active:scale-95 shrink-0 cursor-pointer"
              title="Bancada de Testes Desacoplada (Injeção de Eventos)"
            >
              <FlaskConical className="h-3.5 w-3.5 text-[#8b4dff]" />
              <span className="hidden md:inline">Bancada de Testes</span>
            </button>

            {/* Operational Manual Modal Trigger */}
            <button
              onClick={onOpenTutorial}
              className="px-2.5 py-1.5 rounded-lg text-xs font-sans font-bold bg-[#141422] text-slate-300 border border-[#231c3a] hover:border-[#6618F7]/60 hover:bg-[#6618F7]/10 transition-all flex items-center gap-1.5 shadow-sm active:scale-95 shrink-0 cursor-pointer"
              title="Manual Operacional do Sistema"
            >
              <Lightbulb className="h-3.5 w-3.5 text-amber-400" />
              <span className="hidden lg:inline">Manual</span>
            </button>

            {/* Navigation Tabs */}
            <nav className="flex space-x-1 bg-[#09090e] p-1 rounded-xl border border-[#231c3a] text-xs overflow-x-auto">
              {/* Tab 0: Visão Geral / Dashboard */}
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-sans font-medium transition-all shrink-0 cursor-pointer ${
                  activeTab === 'dashboard'
                    ? 'bg-[#6618F7] text-white font-bold shadow-lg shadow-[#6618F7]/30'
                    : 'text-slate-400 hover:text-white hover:bg-[#141422]'
                }`}
                title="Visão Geral: Dashboard Executivo da Carteira"
              >
                <LayoutDashboard className="h-3.5 w-3.5" />
                <span>Visão Geral</span>
              </button>

              {/* Separator */}
              <span className="w-px h-5 bg-[#231c3a] self-center mx-0.5" />

              {/* Group 1: Novos Clientes */}
              <button
                onClick={() => setActiveTab('triagem')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-sans font-medium transition-all shrink-0 cursor-pointer ${
                  activeTab === 'triagem'
                    ? 'bg-[#6618F7] text-white font-bold shadow-lg shadow-[#6618F7]/30'
                    : 'text-slate-400 hover:text-white hover:bg-[#141422]'
                }`}
                title="Triagem Cadastral: Gate de entrada para novos clientes (Busca CNPJ)"
              >
                <UserCheck className="h-3.5 w-3.5" />
                <span>Triagem</span>
              </button>

              <button
                onClick={() => setActiveTab('duediligence')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-sans font-medium transition-all shrink-0 cursor-pointer ${
                  activeTab === 'duediligence'
                    ? 'bg-[#6618F7] text-white font-bold shadow-lg shadow-[#6618F7]/30'
                    : 'text-slate-400 hover:text-white hover:bg-[#141422]'
                }`}
                title="Due Diligence Automatizada: Avaliação prévia à concessão da 1ª linha"
              >
                <Activity className="h-3.5 w-3.5" />
                <span>Due Diligence</span>
              </button>

              {/* Separator */}
              <span className="w-px h-5 bg-[#231c3a] self-center mx-0.5" />

              {/* Group 2: Clientes Atuais */}
              <button
                onClick={() => setActiveTab('monitoramento')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-sans font-medium transition-all shrink-0 cursor-pointer ${
                  activeTab === 'monitoramento'
                    ? 'bg-[#6618F7] text-white font-bold shadow-lg shadow-[#6618F7]/30'
                    : 'text-slate-400 hover:text-white hover:bg-[#141422]'
                }`}
                title="Monitoramento Processual e Financeiro: Acompanhamento de carteira ativa"
              >
                <Calendar className="h-3.5 w-3.5" />
                <span>Monitoramento</span>
              </button>

              <button
                onClick={() => setActiveTab('alerta_rj')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-sans font-medium transition-all shrink-0 relative cursor-pointer ${
                  activeTab === 'alerta_rj'
                    ? 'bg-rose-600 text-white font-bold shadow-lg shadow-rose-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-[#141422]'
                }`}
                title="Alerta Precoce de RJ: Clientes atuais com exposição em risco crítico"
              >
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>Alerta RJ</span>
                {activeAlertCount > 0 && (
                  <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                )}
              </button>

              {/* Separator */}
              <span className="w-px h-5 bg-[#231c3a] self-center mx-0.5" />

              {/* Strategic Architecture & Canvas */}
              <button
                onClick={() => setActiveTab('canvas')}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg font-sans font-medium transition-all shrink-0 cursor-pointer ${
                  activeTab === 'canvas'
                    ? 'bg-[#141422] text-[#8b4dff] font-bold border border-[#6618F7]/60'
                    : 'text-slate-400 hover:text-white hover:bg-[#141422]'
                }`}
                title="Matriz Estratégica & Arquitetura da Plataforma"
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Matriz Estratégica</span>
                <span className="sm:hidden">Canvas</span>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
