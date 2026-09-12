import React, { useState } from 'react';
import { 
  X, 
  Zap, 
  FlaskConical, 
  Scale, 
  CloudRain, 
  Building2, 
  FileWarning, 
  AlertOctagon, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  History,
  Info
} from 'lucide-react';
import { PortfolioEntity, EwsAlert, SimulationTriggerType } from '../types/monitoring';
import { Borrower } from '../types/borrower';
import { simulateMonitoringTrigger } from '../services/monitoringEngine';

interface TestBenchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  portfolio: PortfolioEntity[];
  borrowersList: Borrower[];
  onAddAlert: (alert: EwsAlert, updatedEntity: Partial<PortfolioEntity>) => void;
}

export const TestBenchDrawer: React.FC<TestBenchDrawerProps> = ({
  isOpen,
  onClose,
  portfolio,
  borrowersList,
  onAddAlert,
}) => {
  const [targetId, setTargetId] = useState<string>(portfolio[0]?.id || 'case-pj-rio-verde');
  const [logs, setLogs] = useState<Array<{ id: string; time: string; text: string; impact: string }>>([]);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  if (!isOpen) return null;

  const selectedBorrower = borrowersList.find((b) => b.id === targetId) || borrowersList[0];

  const handleTriggerSimulation = (type: SimulationTriggerType, label: string) => {
    const { newAlert, updatedEntity, log } = simulateMonitoringTrigger(selectedBorrower, type);
    
    // Explicitly flag as simulation for auditability
    newAlert.isSimulated = true;
    newAlert.simulationScenario = `Bancada de Testes: ${label}`;

    onAddAlert(newAlert, updatedEntity);

    const now = new Date().toLocaleTimeString('pt-BR');
    setLogs((prev) => [
      {
        id: `bench-log-${Date.now()}`,
        time: now,
        text: `${label} → ${selectedBorrower.name}`,
        impact: `${newAlert.scoreImpact} pts (Rating ${newAlert.previousRating} → ${newAlert.newRating})`,
      },
      ...prev.slice(0, 9),
    ]);

    setSuccessToast(`Injetado: ${label} para ${selectedBorrower.name}`);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose} 
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-lg bg-[#151310] border-l border-[#2E2A22] shadow-2xl h-full flex flex-col z-10 animate-slide-left text-stone-100 font-sans">
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#2E2A22] bg-[#1C1915] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-[#4A6FE0]/20 border border-[#4A6FE0]/40 flex items-center justify-center text-[#E0A94E]">
              <FlaskConical className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-display font-black text-white">
                  Bancada de Testes & Simulação
                </h3>
                <span className="px-2 py-0.5 rounded text-[9px] font-display font-bold bg-[#4A6FE0]/30 text-[#E0A94E] border border-[#4A6FE0]/50 uppercase tracking-wider">
                  Lab Desacoplado
                </span>
              </div>
              <p className="text-[11px] text-stone-400 font-sans">
                Injeção controlada de estresse e eventos sem poluir a rotina do operador
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-[#242019] transition-all cursor-pointer"
            title="Fechar menu lateral"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Audit Disclaimer */}
        <div className="bg-[#242019] px-5 py-2.5 border-b border-[#2E2A22] flex items-center gap-2 text-[11px] text-[#E0A94E]">
          <Info className="h-4 w-4 shrink-0" />
          <span>
            Todos os eventos gerados aqui são marcados com a tag <strong>[SIMULAÇÃO]</strong> para preservar a fidelidade dos dados reais.
          </span>
        </div>

        {/* Toast Notification */}
        {successToast && (
          <div className="mx-5 mt-4 p-3 rounded-xl bg-[#4A6FE0]/20 border border-[#4A6FE0]/50 text-[#F0D9A8] text-xs flex items-center gap-2 animate-fade-in font-sans">
            <Zap className="h-4 w-4 text-[#E0A94E]" />
            <span className="font-semibold">{successToast}</span>
          </div>
        )}

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Target Borrower Selector */}
          <div className="space-y-2">
            <label className="text-xs font-display font-bold text-white uppercase tracking-wider block">
              1. Selecionar Tomador Alvo do Teste
            </label>
            <select
              value={targetId}
              onChange={(e) => setTargetId(e.target.value)}
              className="w-full bg-[#1C1915] border border-[#2E2A22] focus:border-[#4A6FE0] text-white text-xs rounded-xl p-3 outline-none font-sans"
            >
              {portfolio.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.type} • Rating {p.currentRating} • R$ {(p.exposureBrl / 1000000).toFixed(1)}M)
                </option>
              ))}
            </select>
          </div>

          {/* Test Buttons - Categorized */}
          <div className="space-y-4">
            <span className="text-xs font-display font-bold text-white uppercase tracking-wider block">
              2. Disparar Eventos de Estresse
            </span>

            {/* Group A: Judiciais (DataJud) */}
            <div className="space-y-2">
              <span className="text-[11px] font-display font-bold text-rose-400 flex items-center gap-1.5">
                <Scale className="h-3.5 w-3.5" />
                Eventos Processuais no DataJud (Gatilho 24h)
              </span>
              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={() => handleTriggerSimulation('DATAJUD_EXECUTION', 'Execução Extrajudicial de Fornecedor')}
                  className="p-3 rounded-xl bg-[#1C1915] hover:bg-[#242019] border border-[#2E2A22] hover:border-rose-500/50 text-left transition-all active:scale-[0.99] cursor-pointer group"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-display font-bold text-white group-hover:text-rose-400">
                      Injetar Nova Execução de Dívida (R$ 1.85M)
                    </span>
                    <span className="text-[10px] font-display font-bold text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded border border-rose-500/30">
                      -140 pts
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-400 font-sans">
                    Simula distribuição judicial de execução contra o devedor em comarca do agro.
                  </p>
                </button>

                <button
                  onClick={() => handleTriggerSimulation('DATAJUD_RJ_FILING', 'Petição Inicial de Recuperação Judicial')}
                  className="p-3 rounded-xl bg-[#1C1915] hover:bg-[#242019] border border-[#2E2A22] hover:border-rose-500/50 text-left transition-all active:scale-[0.99] cursor-pointer group"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-display font-bold text-white group-hover:text-rose-400">
                      Injetar Pedido de RJ + Stay Period
                    </span>
                    <span className="text-[10px] font-display font-bold text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded border border-rose-500/30">
                      -320 pts (Rating D)
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-400 font-sans">
                    Simula protocolo de RJ requerendo suspensão legal das execuções por 180 dias.
                  </p>
                </button>
              </div>
            </div>

            {/* Group B: Agroclimático (INMET / ZARC) */}
            <div className="space-y-2 pt-2 border-t border-[#2E2A22]">
              <span className="text-[11px] font-display font-bold text-amber-400 flex items-center gap-1.5">
                <CloudRain className="h-3.5 w-3.5" />
                Choques Climáticos & Desvio ZARC
              </span>
              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={() => handleTriggerSimulation('INMET_DROUGHT_SPIKE', 'Seca Severa no Enchimento de Grãos')}
                  className="p-3 rounded-xl bg-[#1C1915] hover:bg-[#242019] border border-[#2E2A22] hover:border-amber-500/50 text-left transition-all active:scale-[0.99] cursor-pointer group"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-display font-bold text-white group-hover:text-amber-400">
                      Injetar Anomalia Hídrica Severa (-45% chuva)
                    </span>
                    <span className="text-[10px] font-display font-bold text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
                      -110 pts
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-400 font-sans">
                    Detecta veranico prolongado na estação do INMET mais próxima da fazenda.
                  </p>
                </button>

                <button
                  onClick={() => handleTriggerSimulation('ZARC_WINDOW_VIOLATION', 'Plantio Fora da Janela ZARC')}
                  className="p-3 rounded-xl bg-[#1C1915] hover:bg-[#242019] border border-[#2E2A22] hover:border-amber-500/50 text-left transition-all active:scale-[0.99] cursor-pointer group"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-display font-bold text-white group-hover:text-amber-400">
                      Injetar Semeadura Fora da Janela (+20 dias)
                    </span>
                    <span className="text-[10px] font-display font-bold text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
                      -130 pts
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-400 font-sans">
                    Violação da Portaria MAPA/Embrapa; perda imediata de conformidade agronômica.
                  </p>
                </button>
              </div>
            </div>

            {/* Group C: Fiscais & Societários */}
            <div className="space-y-2 pt-2 border-t border-[#2E2A22]">
              <span className="text-[11px] font-display font-bold text-[#E0A94E] flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5" />
                Varredura Fiscal & Cadastral (PGFN / TST / QSA)
              </span>
              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={() => handleTriggerSimulation('PGFN_ACTIVE_DEBT', 'Inscrição em Dívida Ativa da União')}
                  className="p-3 rounded-xl bg-[#1C1915] hover:bg-[#242019] border border-[#2E2A22] hover:border-[#4A6FE0]/50 text-left transition-all active:scale-[0.99] cursor-pointer group"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-display font-bold text-white group-hover:text-[#E0A94E]">
                      Injetar Dívida Ativa Federal (R$ 840 mil)
                    </span>
                    <span className="text-[10px] font-display font-bold text-[#E0A94E] bg-[#4A6FE0]/20 px-2 py-0.5 rounded border border-[#4A6FE0]/30">
                      -90 pts
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-400 font-sans">
                    Certidão Positiva de Débitos Tributários da PGFN com bloqueio de CND.
                  </p>
                </button>

                <button
                  onClick={() => handleTriggerSimulation('QSA_SUSPICIOUS_CHANGE', 'Alteração Suspeita no QSA')}
                  className="p-3 rounded-xl bg-[#1C1915] hover:bg-[#242019] border border-[#2E2A22] hover:border-[#4A6FE0]/50 text-left transition-all active:scale-[0.99] cursor-pointer group"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-display font-bold text-white group-hover:text-[#E0A94E]">
                      Injetar Troca Repentina de Controle Societário
                    </span>
                    <span className="text-[10px] font-display font-bold text-[#E0A94E] bg-[#4A6FE0]/20 px-2 py-0.5 rounded border border-[#4A6FE0]/30">
                      -60 pts
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-400 font-sans">
                    Saída dos sócios fundadores registrada na Junta Comercial sem histórico claro.
                  </p>
                </button>
              </div>
            </div>
          </div>

          {/* Execution History */}
          {logs.length > 0 && (
            <div className="space-y-2 pt-4 border-t border-[#2E2A22]">
              <div className="flex items-center gap-1.5 text-xs font-display font-bold text-stone-300">
                <History className="h-3.5 w-3.5 text-[#E0A94E]" />
                <span>Histórico de Eventos Injetados na Sessão ({logs.length})</span>
              </div>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {logs.map((item) => (
                  <div
                    key={item.id}
                    className="p-2.5 rounded-lg bg-[#1C1915] border border-[#2E2A22] text-[11px] flex items-center justify-between font-sans"
                  >
                    <div>
                      <span className="font-semibold text-white block">{item.text}</span>
                      <span className="text-stone-500 text-[10px]">{item.time}</span>
                    </div>
                    <span className="font-display font-bold text-rose-400 text-[10px]">
                      {item.impact}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#2E2A22] bg-[#1C1915] flex items-center justify-between">
          <span className="text-[11px] text-stone-400 font-sans">
            Os alertas gerados aparecem na aba <strong>Alerta RJ</strong> e no <strong>Monitoramento</strong> com a tag [SIMULAÇÃO].
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#4A6FE0] hover:bg-[#6584E8] text-white text-xs font-display font-bold transition-all cursor-pointer"
          >
            Concluir Testes
          </button>
        </div>
      </div>
    </div>
  );
};
