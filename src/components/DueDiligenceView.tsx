import React from 'react';
import { Borrower } from '../types/borrower';
import { BorrowerSelector } from './BorrowerSelector';
import { AgentPipelineVisualizer } from './AgentPipelineVisualizer';
import { ScoreGauge } from './ScoreGauge';
import { DimensionCards } from './DimensionCards';
import { RedFlagsCard } from './RedFlagsCard';
import { OperationalActionCard } from './OperationalActionCard';
import { FullPipelineExecutionResult } from '../services/monitoringEngine';
import { AgentStepLog } from '../types/agents';
import { ShieldCheck, Sparkles, FileText } from 'lucide-react';

interface DueDiligenceViewProps {
  selectedBorrower: Borrower;
  onSelectBorrower: (borrower: Borrower) => void;
  isRunningPipeline: boolean;
  activeAgentIndex: number;
  onRunPipeline: () => void;
  pipelineLogs: AgentStepLog[];
  pipelineResult: FullPipelineExecutionResult | null;
  onOpenReportModal: () => void;
}

export const DueDiligenceView: React.FC<DueDiligenceViewProps> = ({
  selectedBorrower,
  onSelectBorrower,
  isRunningPipeline,
  activeAgentIndex,
  onRunPipeline,
  pipelineLogs,
  pipelineResult,
  onOpenReportModal,
}) => {
  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/30 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
              Análise Pré-Crédito • Novos Clientes
            </span>
            <span className="text-xs text-slate-400 font-mono">Fase 2 do Edital 01/2026</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Due Diligence Automatizada (Concessão da 1ª Linha)
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
            Investigação aprofundada antes de conceder a primeira linha de crédito comercial. Executa a esteira dos <strong>4 agentes autônomos</strong>, calcula o <strong>Scorecard WoE (0 a 1000)</strong> com ZARC/INMET e emite o <strong>Dossiê Padronizado watsonx.ai</strong> com diretrizes de garantias reais (CPR Física / Barter).
          </p>
        </div>

        {pipelineResult?.report && (
          <button
            onClick={onOpenReportModal}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25 flex items-center gap-2 transition-all shrink-0 active:scale-95 shadow-lg"
          >
            <Sparkles className="h-4 w-4" />
            <span>Ver Dossiê watsonx.ai</span>
          </button>
        )}
      </div>

      {/* Seletor de Tomador com distinção PF vs PJ */}
      <BorrowerSelector
        selectedBorrower={selectedBorrower}
        onSelectBorrower={onSelectBorrower}
        isRunningPipeline={isRunningPipeline}
      />

      {/* Pipeline Visual dos 4 Agentes */}
      <AgentPipelineVisualizer
        isRunning={isRunningPipeline}
        activeAgentIndex={activeAgentIndex}
        onRunPipeline={onRunPipeline}
        logs={pipelineLogs}
        onOpenReportModal={onOpenReportModal}
        hasReport={!!pipelineResult?.report}
        scoreSummary={
          pipelineResult
            ? {
                score: pipelineResult.scoreResult.totalScore,
                rating: pipelineResult.scoreResult.rating,
                derivedAgroScore: pipelineResult.agroAnalysis.derivedAgroScore,
                activeRedFlagsCount: pipelineResult.scoreResult.activeRedFlags.length,
              }
            : undefined
        }
      />

      {/* Resultados do Scorecard e Análise Detalhada */}
      {pipelineResult && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-5">
              <ScoreGauge
                score={pipelineResult.scoreResult.totalScore}
                rating={pipelineResult.scoreResult.rating}
                ratingLabel={pipelineResult.scoreResult.recommendation.label}
                derivedAgroScore={pipelineResult.agroAnalysis.derivedAgroScore}
                evaluatedAt={pipelineResult.scoreResult.evaluatedAt}
              />
            </div>
            <div className="lg:col-span-7">
              <OperationalActionCard
                recommendation={pipelineResult.scoreResult.recommendation}
                borrowerExposureBrl={selectedBorrower.exposureValueBrl}
              />
            </div>
          </div>

          <DimensionCards dimensions={pipelineResult.scoreResult.dimensions} />

          <RedFlagsCard
            allRedFlags={pipelineResult.scoreResult.allRedFlags}
            activeRedFlags={pipelineResult.scoreResult.activeRedFlags}
          />
        </div>
      )}
    </div>
  );
};
