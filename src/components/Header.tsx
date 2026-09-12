import React from 'react';
import {
  ShieldAlert,
  Activity,
  BookOpen,
  Bell,
  TrendingUp,
  Lightbulb,
  UserCheck,
  Calendar,
  LayoutDashboard,
  FlaskConical,
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

const NAV_ITEMS: Array<{
  tab: MainAppTab;
  label: string;
  shortLabel?: string;
  icon: React.ElementType;
  title: string;
  group?: 'divider-before';
}> = [
  { tab: 'dashboard', label: 'Visão Geral', icon: LayoutDashboard, title: 'Visão Geral: Dashboard Executivo da Carteira' },
  { tab: 'triagem', label: 'Triagem', icon: UserCheck, title: 'Triagem Cadastral: Gate de entrada para novos clientes', group: 'divider-before' },
  { tab: 'duediligence', label: 'Due Diligence', icon: Activity, title: 'Due Diligence Automatizada: Avaliação prévia à concessão da 1ª linha' },
  { tab: 'monitoramento', label: 'Monitoramento', icon: Calendar, title: 'Monitoramento Processual e Financeiro: carteira ativa', group: 'divider-before' },
  { tab: 'alerta_rj', label: 'Alerta RJ', icon: ShieldAlert, title: 'Alerta Precoce de RJ: exposição em risco crítico' },
  { tab: 'canvas', label: 'Matriz Estratégica', shortLabel: 'Canvas', icon: BookOpen, title: 'Matriz Estratégica & Arquitetura da Plataforma', group: 'divider-before' },
];

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  activeAlertCount,
  totalExposureBrl,
  onOpenTutorial,
  onOpenTestBench,
}) => {
  return (
    <header className="border-b border-[#2E2A22] bg-[#0D0C0A]/95 backdrop-blur-md sticky top-0 z-40 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Row 1: identity + portfolio metrics + utility actions */}
        <div className="flex items-center justify-between gap-4 h-16 border-b border-[#2E2A22]/70">
          <div className="flex items-center gap-3.5 min-w-0">
            <button
              className="cursor-pointer shrink-0"
              onClick={() => setActiveTab('dashboard')}
              title="Ir para o Agro-Stress Dashboard"
            >
              <BroCodeLogo size="sm" variant="full" />
            </button>
            <div className="h-8 w-px bg-[#2E2A22] hidden md:block shrink-0" />
            <div className="hidden md:block min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-display font-semibold text-white whitespace-nowrap">
                  Agro-Stress <span className="text-[#E0A94E]">Dashboard</span>
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-sans font-bold rounded bg-[#4A6FE0]/20 text-[#E0A94E] border border-[#4A6FE0]/40 shrink-0">
                  KRILL TECH
                </span>
              </div>
              <p className="text-[11px] text-stone-400 font-sans truncate">
                Alerta Precoce de RJ & Insolvência
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Portfolio metrics */}
            <div className="hidden xl:flex items-center gap-2 text-xs">
              <div className="flex items-center gap-2 bg-[#151310] px-3 py-1.5 rounded-lg border border-[#2E2A22]">
                <TrendingUp className="h-3.5 w-3.5 text-[#E0A94E]" />
                <span className="text-stone-400 font-sans">Exposição:</span>
                <strong className="text-white font-display font-semibold">
                  R$ {(totalExposureBrl / 1000000).toFixed(1)}M
                </strong>
              </div>

              <div className="flex items-center gap-2 bg-[#151310] px-3 py-1.5 rounded-lg border border-[#2E2A22]">
                <Bell className="h-3.5 w-3.5 text-amber-400" />
                <span className="text-stone-400 font-sans">Alertas:</span>
                <span className={`px-1.5 py-0.5 rounded font-display font-bold text-xs ${activeAlertCount > 0 ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}>
                  {activeAlertCount}
                </span>
              </div>
            </div>

            <button
              onClick={onOpenTestBench}
              className="px-2.5 py-1.5 rounded-lg text-xs font-sans font-semibold bg-[#242019] text-[#E0A94E] border border-[#2E2A22] hover:border-[#4A6FE0]/60 hover:bg-[#4A6FE0]/15 transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
              title="Bancada de Testes Desacoplada (Injeção de Eventos)"
            >
              <FlaskConical className="h-3.5 w-3.5" />
              <span className="hidden lg:inline">Bancada de Testes</span>
            </button>

            <button
              onClick={onOpenTutorial}
              className="px-2.5 py-1.5 rounded-lg text-xs font-sans font-semibold bg-[#242019] text-stone-300 border border-[#2E2A22] hover:border-[#4A6FE0]/60 hover:bg-[#4A6FE0]/10 transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
              title="Manual Operacional do Sistema"
            >
              <Lightbulb className="h-3.5 w-3.5 text-amber-400" />
              <span className="hidden lg:inline">Manual</span>
            </button>
          </div>
        </div>

        {/* Row 2: primary navigation, given its own full-width row so it never collides with row 1 */}
        <nav className="flex items-center gap-0.5 h-11 overflow-x-auto text-xs">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.tab;
            const isAlert = item.tab === 'alerta_rj';
            return (
              <React.Fragment key={item.tab}>
                {item.group === 'divider-before' && (
                  <span className="w-px h-5 bg-[#2E2A22] shrink-0 mx-1" />
                )}
                <button
                  onClick={() => setActiveTab(item.tab)}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-sans font-medium transition-colors shrink-0 cursor-pointer ${
                    isActive
                      ? isAlert
                        ? 'bg-rose-600 text-white font-semibold'
                        : 'bg-[#4A6FE0] text-white font-semibold'
                      : 'text-stone-400 hover:text-white hover:bg-[#151310]'
                  }`}
                  title={item.title}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span className={item.shortLabel ? 'hidden sm:inline' : ''}>{item.label}</span>
                  {item.shortLabel && <span className="sm:hidden">{item.shortLabel}</span>}
                  {isAlert && activeAlertCount > 0 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse shrink-0" />
                  )}
                </button>
              </React.Fragment>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
