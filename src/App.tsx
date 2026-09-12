import React, { useState, useEffect } from 'react';
import { Header, MainAppTab } from './components/Header';
import { TriagemCadastralView } from './components/TriagemCadastralView';
import { DueDiligenceView } from './components/DueDiligenceView';
import { MonitoramentoCarteiraView } from './components/MonitoramentoCarteiraView';
import { AlertaPrecoceRJView } from './components/AlertaPrecoceRJView';
import { PitchMethodologyView } from './components/PitchMethodologyView';
import { ReportModal } from './components/ReportModal';
import { MiniTutorialModal } from './components/MiniTutorialModal';

import { MOCK_CASES, getCaseById } from './data/mockCases';
import { INITIAL_PORTFOLIO, INITIAL_ALERTS } from './data/portfolioData';
import { runFullPipeline, FullPipelineExecutionResult } from './services/monitoringEngine';
import { Borrower } from './types/borrower';
import { EwsAlert, PortfolioEntity } from './types/monitoring';
import { AgentStepLog } from './types/agents';

export function App() {
  const [activeTab, setActiveTab] = useState<MainAppTab>('triagem');
  const [selectedBorrower, setSelectedBorrower] = useState<Borrower>(MOCK_CASES[0]);
  const [isRunningPipeline, setIsRunningPipeline] = useState(false);
  const [activeAgentIndex, setActiveAgentIndex] = useState(0);
  const [pipelineLogs, setPipelineLogs] = useState<AgentStepLog[]>([]);
  const [pipelineResult, setPipelineResult] = useState<FullPipelineExecutionResult | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);

  // Carteira e Alertas do EWS
  const [portfolio, setPortfolio] = useState<PortfolioEntity[]>(INITIAL_PORTFOLIO);
  const [alerts, setAlerts] = useState<EwsAlert[]>(INITIAL_ALERTS);

  // Executa o pipeline imediatamente na inicialização ou troca de tomador
  useEffect(() => {
    executePipelineForBorrower(selectedBorrower);
  }, [selectedBorrower.id]);

  const executePipelineForBorrower = (borrower: Borrower) => {
    setIsRunningPipeline(true);
    setActiveAgentIndex(0);
    setPipelineLogs([]);

    // Simulação visual do processamento sequencial entre os 4 agentes
    const result = runFullPipeline(borrower);

    // Agente 1: Coletor & Parser
    setActiveAgentIndex(0);
    setTimeout(() => {
      // Agente 2: Risco Agroclimático
      setActiveAgentIndex(1);
    }, 450);

    setTimeout(() => {
      // Agente 3: Motor de Scoring
      setActiveAgentIndex(2);
    }, 900);

    setTimeout(() => {
      // Agente 4: Sintetizador watsonx
      setActiveAgentIndex(3);
    }, 1350);

    setTimeout(() => {
      setPipelineResult(result);
      setPipelineLogs(result.allLogs);
      setIsRunningPipeline(false);
      setActiveAgentIndex(4);
    }, 1750);
  };

  const handleSelectBorrower = (borrower: Borrower) => {
    setSelectedBorrower(borrower);
  };

  const handleProceedFromTriagem = (borrower: Borrower) => {
    setSelectedBorrower(borrower);
    setActiveTab('duediligence');
  };

  const handleSelectClientForDeepDive = (borrowerId: string) => {
    const found = getCaseById(borrowerId);
    setSelectedBorrower(found);
    setActiveTab('duediligence');
  };

  const handleAddAlert = (newAlert: EwsAlert, updatedEntity: Partial<PortfolioEntity>) => {
    setAlerts((prev) => [newAlert, ...prev]);
    setPortfolio((prev) =>
      prev.map((item) => {
        if (item.id === newAlert.borrowerId) {
          return {
            ...item,
            ...updatedEntity,
            alertCount: item.alertCount + 1,
            hasActiveAlert: true,
          };
        }
        return item;
      })
    );
  };

  const totalExposureBrl = portfolio.reduce((acc, p) => acc + p.exposureBrl, 0);
  const activeAlertCount = alerts.filter((a) => !a.isRead).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Header com as 4 visualizações oficiais segregadas */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeAlertCount={activeAlertCount}
        totalExposureBrl={totalExposureBrl}
        onOpenTutorial={() => setIsTutorialOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* 1. Triagem Cadastral (Novos Clientes - Gate de Entrada) */}
        {activeTab === 'triagem' && (
          <TriagemCadastralView onProceedToDueDiligence={handleProceedFromTriagem} />
        )}

        {/* 2. Due Diligence Automatizada (Novos Clientes - Concessão da 1ª Linha) */}
        {activeTab === 'duediligence' && (
          <DueDiligenceView
            selectedBorrower={selectedBorrower}
            onSelectBorrower={handleSelectBorrower}
            isRunningPipeline={isRunningPipeline}
            activeAgentIndex={activeAgentIndex}
            onRunPipeline={() => executePipelineForBorrower(selectedBorrower)}
            pipelineLogs={pipelineLogs}
            pipelineResult={pipelineResult}
            onOpenReportModal={() => setIsReportModalOpen(true)}
          />
        )}

        {/* 3. Monitoramento Processual e Financeiro (Clientes Atuais - Carteira Ativa) */}
        {activeTab === 'monitoramento' && (
          <MonitoramentoCarteiraView
            portfolio={portfolio}
            onSelectClientForDeepDive={handleSelectClientForDeepDive}
          />
        )}

        {/* 4. Alerta Precoce de RJ/Insolvência (Clientes Atuais - Exposição Aberta) */}
        {activeTab === 'alerta_rj' && (
          <AlertaPrecoceRJView
            portfolio={portfolio}
            alerts={alerts}
            onAddAlert={handleAddAlert}
            borrowersList={MOCK_CASES}
            onSelectClientForDeepDive={handleSelectClientForDeepDive}
          />
        )}

        {/* 5. Project Canvas & Pitch da Solução */}
        {activeTab === 'canvas' && <PitchMethodologyView />}
      </main>

      {/* Modal do Mini Tutorial Interativo (Guiado) */}
      <MiniTutorialModal
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
        onSelectTab={(tab) => {
          if (tab === 'pipeline') setActiveTab('duediligence');
          else if (tab === 'monitoring') setActiveTab('alerta_rj');
          else setActiveTab('canvas');
        }}
      />

      {/* Modal do Dossiê Padronizado watsonx.ai */}
      <ReportModal
        report={pipelineResult?.report || null}
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-5 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Krill Tech • Desafio PMI-DF & IBM • Edital 01/2026</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsTutorialOpen(true)}
              className="text-emerald-400 hover:underline font-medium text-[11px]"
            >
              Abrir Mini Tutorial
            </button>
            <span className="text-slate-700">•</span>
            <span className="font-mono text-[11px] text-slate-400">
              Triagem • Due Diligence • Monitoramento • Alerta RJ
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
