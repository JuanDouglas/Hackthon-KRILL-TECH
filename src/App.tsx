import React, { useState, useEffect } from 'react';
import { Header, MainAppTab } from './components/Header';
import { ExecutiveDashboardView } from './components/ExecutiveDashboardView';
import { TriagemCadastralView } from './components/TriagemCadastralView';
import { DueDiligenceView } from './components/DueDiligenceView';
import { MonitoramentoCarteiraView } from './components/MonitoramentoCarteiraView';
import { AlertaPrecoceRJView } from './components/AlertaPrecoceRJView';
import { PitchMethodologyView } from './components/PitchMethodologyView';
import { ReportModal } from './components/ReportModal';
import { MiniTutorialModal } from './components/MiniTutorialModal';
import { TestBenchDrawer } from './components/TestBenchDrawer';

import { MOCK_CASES, getCaseById } from './data/mockCases';
import { INITIAL_PORTFOLIO, INITIAL_ALERTS } from './data/portfolioData';
import { runFullPipeline, FullPipelineExecutionResult } from './services/monitoringEngine';
import { Borrower } from './types/borrower';
import { EwsAlert, PortfolioEntity } from './types/monitoring';
import { AgentStepLog } from './types/agents';

export function App() {
  const [activeTab, setActiveTab] = useState<MainAppTab>('dashboard');
  const [selectedBorrower, setSelectedBorrower] = useState<Borrower>(MOCK_CASES[0]);
  const [isRunningPipeline, setIsRunningPipeline] = useState(false);
  const [activeAgentIndex, setActiveAgentIndex] = useState(0);
  const [pipelineLogs, setPipelineLogs] = useState<AgentStepLog[]>([]);
  const [pipelineResult, setPipelineResult] = useState<FullPipelineExecutionResult | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [isTestBenchOpen, setIsTestBenchOpen] = useState(false);

  // Carteira e Alertas do EWS
  const [portfolio, setPortfolio] = useState<PortfolioEntity[]>(INITIAL_PORTFOLIO);
  const [alerts, setAlerts] = useState<EwsAlert[]>(INITIAL_ALERTS);

  // Executa o pipeline na inicialização ou troca de tomador
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
    <div className="min-h-screen bg-[#000000] text-slate-100 flex flex-col font-sans selection:bg-[#6618F7] selection:text-white">
      {/* Header com as visualizações e atalho para a bancada de testes */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeAlertCount={activeAlertCount}
        totalExposureBrl={totalExposureBrl}
        onOpenTutorial={() => setIsTutorialOpen(true)}
        onOpenTestBench={() => setIsTestBenchOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* 0. Visão Geral / Dashboard Executivo da Carteira */}
        {activeTab === 'dashboard' && (
          <ExecutiveDashboardView
            portfolio={portfolio}
            alerts={alerts}
            onNavigateTab={setActiveTab}
            onOpenTestBench={() => setIsTestBenchOpen(true)}
            onOpenTutorial={() => setIsTutorialOpen(true)}
          />
        )}

        {/* 1. Triagem Cadastral (Novos Clientes - Gate de Entrada + Busca CNPJ) */}
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

        {/* 3. Monitoramento Processual e Financeiro (Clientes Atuais - Carteira Ativa + Simulação de Crise) */}
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
            onOpenTestBench={() => setIsTestBenchOpen(true)}
          />
        )}

        {/* 5. Matriz Estratégica & Arquitetura da Plataforma */}
        {activeTab === 'canvas' && <PitchMethodologyView />}
      </main>

      {/* Menu Lateral Desacoplado: Bancada de Testes & Simulação */}
      <TestBenchDrawer
        isOpen={isTestBenchOpen}
        onClose={() => setIsTestBenchOpen(false)}
        portfolio={portfolio}
        borrowersList={MOCK_CASES}
        onAddAlert={handleAddAlert}
      />

      {/* Modal do Manual Operacional */}
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
      <footer className="border-t border-[#231c3a] bg-[#000000] py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <span className="font-display tracking-wider text-slate-300">
              <strong className="text-white font-black">AGRO-STRESS DASHBOARD</strong> • Krill Tech Risk Engine
            </span>
            <span className="text-[#231c3a] hidden sm:inline">•</span>
            <span className="text-slate-400 font-sans">
              Desenvolvido pela equipe{' '}
              <a
                href="https://brocode.net.br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#a78bfa] hover:text-white font-bold underline decoration-[#6618F7] transition-colors"
                title="Acesse o site oficial da BroCode Softwares"
              >
                BroCode Softwares (brocode.net.br)
              </a>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsTutorialOpen(true)}
              className="text-[#8b4dff] hover:text-[#a78bfa] hover:underline font-medium text-[11px] cursor-pointer"
            >
              Manual Operacional
            </button>
            <span className="text-[#231c3a]">•</span>
            <button
              onClick={() => setIsTestBenchOpen(true)}
              className="text-[#8b4dff] hover:text-[#a78bfa] hover:underline font-medium text-[11px] cursor-pointer"
            >
              Bancada de Testes
            </button>
            <span className="text-[#231c3a]">•</span>
            <span className="font-display text-[11px] text-slate-500 tracking-wider hidden lg:inline">
              Dashboard • Triagem • Due Diligence • Monitoramento • Alerta RJ
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
