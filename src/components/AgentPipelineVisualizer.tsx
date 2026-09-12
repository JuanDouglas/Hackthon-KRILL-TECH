import React, { useState } from 'react';
import { 
  Database, 
  CloudRain, 
  Cpu, 
  FileText, 
  Play, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  Terminal,
  ArrowRight,
  ShieldCheck,
  Info
} from 'lucide-react';
import { AgentId, AgentStepLog } from '../types/agents';
import { TooltipHelp, AGRO_TERMS_GLOSSARY } from './TooltipHelp';

interface AgentPipelineVisualizerProps {
  isRunning: boolean;
  activeAgentIndex: number;
  onRunPipeline: () => void;
  logs: AgentStepLog[];
  onOpenReportModal: () => void;
  hasReport: boolean;
  scoreSummary?: {
    score: number;
    rating: string;
    derivedAgroScore: number;
    activeRedFlagsCount: number;
  };
}

export const AgentPipelineVisualizer: React.FC<AgentPipelineVisualizerProps> = ({
  isRunning,
  activeAgentIndex,
  onRunPipeline,
  logs,
  onOpenReportModal,
  hasReport,
  scoreSummary,
}) => {
  const [showConsole, setShowConsole] = useState(false);

  const agentsConfig = [
    {
      id: 'coletor_parser' as AgentId,
      stepNumber: '01',
      title: 'Coletor & Parser',
      subtitle: '8 Fontes Públicas Abertas',
      icon: Database,
      description: 'Varredura estruturada de DataJud (CNJ), Receita, PGFN, TST, Caixa CRF, SICAR, Conab e INMET.',
      technicalBadge: 'DataJud API + Agregação',
      dataOutputPreview: 'Metadados unificados & certidões',
      tooltip: AGRO_TERMS_GLOSSARY.DATAJUD,
    },
    {
      id: 'risco_agroclima' as AgentId,
      stepNumber: '02',
      title: 'Risco Agro & Climático',
      subtitle: 'ZARC + INMET + Conab',
      icon: CloudRain,
      description: 'ZARC como filtro de conformidade de janela, anomalia pluviométrica INMET (30 anos) e PSR.',
      technicalBadge: 'ZARC Categórico MAPA',
      dataOutputPreview: 'Índice Agroclimático 0-100',
      tooltip: AGRO_TERMS_GLOSSARY.ZARC,
    },
    {
      id: 'motor_scoring' as AgentId,
      stepNumber: '03',
      title: 'Motor de Decisão',
      subtitle: 'Scorecard WoE (0–1000)',
      icon: Cpu,
      description: 'Scorecard ponderado explicável com 5 dimensões oficiais e Matriz de 6 Red Flags operacionais.',
      technicalBadge: 'Metodologia Bureaus Serasa',
      dataOutputPreview: 'Score 0-1000 & Rating A-D',
      tooltip: AGRO_TERMS_GLOSSARY.WOE,
    },
    {
      id: 'sintetizador_watsonx' as AgentId,
      stepNumber: '04',
      title: 'Sintetizador watsonx',
      subtitle: 'Dossiê & Parecer STJ',
      icon: FileText,
      description: 'Gera o Relatório Padronizado executivo com parecer sobre bens essenciais no Stay Period (STJ).',
      technicalBadge: 'watsonx.ai Engine',
      dataOutputPreview: 'Dossiê em Linguagem Natural',
      tooltip: AGRO_TERMS_GLOSSARY.STAY_PERIOD,
    },
  ];

  return (
    <div className="bg-[#09090e] border border-[#231c3a] rounded-2xl p-5 shadow-2xl">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#231c3a]">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#8b4dff] animate-pulse" />
            <h3 className="text-base font-display font-black text-white tracking-tight">
              Esteira dos 4 Agentes Autônomos (Arquitetura Auditável)
            </h3>
          </div>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Fluxo contínuo de dados das fontes públicas até o parecer executivo do comitê
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowConsole(!showConsole)}
            className={`px-3 py-2 rounded-lg text-xs font-sans font-semibold flex items-center gap-2 border transition-all ${
              showConsole
                ? 'bg-[#141422] text-[#8b4dff] border-[#6618F7]/60'
                : 'bg-[#0e0e17] text-slate-400 border-[#231c3a] hover:text-white'
            }`}
          >
            <Terminal className="h-4 w-4" />
            <span>Console ({logs.length})</span>
            {showConsole ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>

          <button
            disabled={isRunning}
            onClick={onRunPipeline}
            className={`px-4 py-2 rounded-lg text-xs font-sans font-bold flex items-center gap-2 shadow-lg transition-all ${
              isRunning
                ? 'bg-[#141422] text-slate-500 cursor-not-allowed border border-[#231c3a]'
                : 'bg-[#6618F7] hover:bg-[#7b2cfa] text-white shadow-[#6618F7]/30 active:scale-95'
            }`}
          >
            {isRunning ? (
              <>
                <div className="h-4 w-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                <span>Processando Agentes...</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4 fill-current" />
                <span>Reexecutar Pipeline</span>
              </>
            )}
          </button>

          {hasReport && (
            <button
              onClick={onOpenReportModal}
              className="px-3.5 py-2 rounded-lg text-xs font-sans font-bold bg-[#141422] text-[#a78bfa] border border-[#6618F7]/40 hover:bg-[#6618F7]/15 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#8b4dff]" />
              <span>Dossiê watsonx</span>
            </button>
          )}
        </div>
      </div>

      {/* Agents 4-column visual flow with active connectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-5 relative">
        {agentsConfig.map((agent, idx) => {
          const Icon = agent.icon;
          const isCurrent = isRunning && activeAgentIndex === idx;
          const isDone = !isRunning || activeAgentIndex > idx;
          const isPending = isRunning && activeAgentIndex < idx;

          return (
            <div
              key={agent.id}
              className={`relative rounded-2xl p-4 border transition-all flex flex-col justify-between ${
                isCurrent
                  ? 'bg-[#0e0e17] border-[#6618F7] ring-2 ring-[#6618F7]/40 shadow-xl shadow-[#6618F7]/20 scale-[1.02]'
                  : isDone
                  ? 'bg-[#0e0e17] border-[#231c3a] hover:border-[#6618F7]/40'
                  : 'bg-[#09090e] border-[#231c3a] opacity-50'
              }`}
            >
              <div>
                {/* Step indicator header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-display font-bold text-slate-400 flex items-center gap-1">
                    <span>AGENTE {agent.stepNumber}</span>
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-display font-bold uppercase ${
                      isCurrent
                        ? 'bg-[#6618F7]/30 text-white border border-[#6618F7] animate-pulse'
                        : isDone
                        ? 'bg-[#141422] text-[#a78bfa] border border-[#6618F7]/30'
                        : 'bg-[#141422] text-slate-500'
                    }`}
                  >
                    {isCurrent ? 'Processando' : isDone ? 'Concluído' : 'Aguardando'}
                  </span>
                </div>

                {/* Agent Title & Icon */}
                <div className="flex items-start gap-3 mb-2.5">
                  <div
                    className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 transition-transform ${
                      isCurrent
                        ? 'bg-[#6618F7] text-white shadow-md shadow-[#6618F7]/40 scale-110'
                        : isDone
                        ? 'bg-[#141422] text-[#8b4dff] border border-[#231c3a]'
                        : 'bg-[#09090e] text-slate-600'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-display font-bold text-white leading-snug flex items-center gap-1.5">
                      <span>{agent.title}</span>
                    </h4>
                    <span className="text-[11px] text-slate-400 font-sans font-medium">{agent.subtitle}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 font-sans mb-3 leading-relaxed">
                  {agent.description}
                </p>
              </div>

              <div>
                {/* Technical Badge with Tooltip */}
                <div className="mb-2.5">
                  <TooltipHelp
                    term={agent.tooltip.term}
                    definition={agent.tooltip.definition}
                    sourceBadge={agent.tooltip.source}
                  >
                    <span className="text-[10px] font-display px-2 py-0.5 rounded bg-[#141422] text-slate-300 border border-[#231c3a] inline-block hover:border-[#6618F7]/50 transition-colors">
                      ⚙️ {agent.technicalBadge}
                    </span>
                  </TooltipHelp>
                </div>

                {/* Data Handover preview */}
                <div className="p-2 rounded-lg bg-[#000000] border border-[#231c3a] text-[10px] text-slate-400 flex items-center justify-between">
                  <span className="text-slate-500 font-sans">Entrega:</span>
                  <span className="font-semibold text-slate-200 font-sans">{agent.dataOutputPreview}</span>
                </div>
              </div>

              {/* Flow connector arrow for desktop */}
              {idx < agentsConfig.length - 1 && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center border ${
                    isDone ? 'bg-[#141422] border-[#6618F7]/60 text-[#8b4dff]' : 'bg-[#09090e] border-[#231c3a] text-slate-600'
                  }`}>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Real-time Console Log Accordion */}
      {showConsole && (
        <div className="mt-5 p-4 rounded-2xl bg-[#000000] border border-[#231c3a] font-mono text-xs">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#231c3a]">
            <span className="text-[#8b4dff] font-semibold flex items-center gap-2 font-display">
              <Terminal className="h-4 w-4" />
              <span>Console de Auditoria dos Agentes</span>
            </span>
            <span className="text-slate-500 text-[11px] font-display">
              {logs.length} eventos processados
            </span>
          </div>

          <div className="max-h-56 overflow-y-auto space-y-1.5 pr-2">
            {logs.length === 0 ? (
              <div className="text-slate-400 italic py-2">
                Nenhum evento registrado ainda. Clique em "Reexecutar Pipeline".
              </div>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="flex items-start gap-2.5 text-[11px] leading-relaxed">
                  <span className="text-slate-400 shrink-0">{log.timestamp}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded font-semibold text-[10px] shrink-0 ${
                      log.level === 'alert'
                        ? 'bg-rose-500/20 text-rose-400'
                        : log.level === 'warn'
                        ? 'bg-amber-500/20 text-amber-400'
                        : log.level === 'success'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {log.source}
                  </span>
                  <span
                    className={`${
                      log.level === 'alert'
                        ? 'text-rose-300 font-medium'
                        : log.level === 'warn'
                        ? 'text-amber-300'
                        : log.level === 'success'
                        ? 'text-emerald-300'
                        : 'text-slate-300'
                    }`}
                  >
                    {log.message}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
