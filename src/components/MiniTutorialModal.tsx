import React, { useState, useEffect } from 'react';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  User, 
  Building2, 
  Database, 
  Cpu, 
  ShieldAlert, 
  HelpCircle,
  Lightbulb,
  FileCheck2,
  Play
} from 'lucide-react';

interface MiniTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: 'pipeline' | 'monitoring' | 'methodology') => void;
}

export const MiniTutorialModal: React.FC<MiniTutorialModalProps> = ({
  isOpen,
  onClose,
  onSelectTab,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentStep((prev) => Math.max(0, prev - 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const steps = [
    {
      stepNumber: 1,
      badge: 'Contexto & Diagnóstico',
      title: 'O Problema Real do Agronegócio Brasileiro em 2025',
      subtitle: 'Três causas concretas e mensuráveis — sem retórica de "ruptura de paradigma"',
      icon: Lightbulb,
      color: 'emerald',
      content: (
        <div className="space-y-3.5 text-xs text-slate-300">
          <p className="leading-relaxed">
            O agro brasileiro deixou de ser um segmento de baixa inadimplência por três motivos reais:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
              <span className="text-amber-400 font-bold block mb-1">1. Marco Legal (Lei 14.112)</span>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Permite Recuperação Judicial para produtor rural pessoa física com apenas <strong>2 anos de LCDPR</strong> ou inscrição estadual, derrubando a barreira judicial de entrada.
              </p>
            </div>
            <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
              <span className="text-rose-400 font-bold block mb-1">2. Colapso do PSR (2,3%)</span>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                O Seguro Rural cobriu apenas <strong>2,3% a 3,3% da área em 2025</strong> (pior nível desde 2006). Sem o Estado absorvendo o risco climático, ele recai direto na Krill Tech.
              </p>
            </div>
            <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
              <span className="text-sky-400 font-bold block mb-1">3. Efeito Cascata Comprovado</span>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                A <strong>TerraMagna</strong>, maior agfintech da América Latina com satélite e IA, ficou com <strong>R$ 28 milhões</strong> a receber na RJ da AgroGalaxy. A solução não elimina o risco: ela oferece <em>Alerta Precoce</em>.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      stepNumber: 2,
      badge: 'Público-Alvo Segmentado',
      title: 'Distinção Estrutural: Produtor Rural (PF) vs Revenda (PJ)',
      subtitle: 'A via jurídica para Recuperação Judicial é diferente para cada perfil',
      icon: User,
      color: 'teal',
      content: (
        <div className="space-y-3.5 text-xs text-slate-300">
          <p className="leading-relaxed">
            No Canvas e no Cockpit, tratamos PF e PJ separadamente porque a esteira de dados críticos muda:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div className="bg-emerald-950/20 p-4 rounded-xl border border-emerald-500/30">
              <div className="flex items-center gap-2 text-emerald-400 font-bold mb-2">
                <User className="h-4 w-4" />
                <span>Produtor Rural Pessoa Física (PF)</span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-slate-300">
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-400">✓</span>
                  <span><strong>Elegibilidade de RJ:</strong> Art. 48 Lei 11.101 via Livro Caixa Digital (LCDPR) de 2 anos.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-400">✓</span>
                  <span><strong>Dados Críticos:</strong> Regularidade do CAR/SICAR, histórico agronômico e janela ZARC.</span>
                </li>
              </ul>
            </div>

            <div className="bg-teal-950/20 p-4 rounded-xl border border-teal-500/30">
              <div className="flex items-center gap-2 text-teal-400 font-bold mb-2">
                <Building2 className="h-4 w-4" />
                <span>Agroindústria / Revenda Pessoa Jurídica (PJ)</span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-slate-300">
                <li className="flex items-start gap-1.5">
                  <span className="text-teal-400">✓</span>
                  <span><strong>Elegibilidade de RJ:</strong> Requisitos societários padrão (&gt; 2 anos, CNPJ regular).</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-teal-400">✓</span>
                  <span><strong>Dados Críticos:</strong> Estabilidade do QSA, CNAE de comércio de insumos e execuções de fornecedores.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      stepNumber: 3,
      badge: 'Arquitetura Multi-Agente',
      title: 'A Esteira dos 4 Agentes em Operação Contínua',
      subtitle: 'Separando responsabilidades e garantindo 100% de auditabilidade',
      icon: Database,
      color: 'sky',
      content: (
        <div className="space-y-3 text-xs text-slate-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-emerald-400 font-bold block mb-1">01. Coletor & Parser</span>
              <p className="text-[11px] text-slate-400">
                8 fontes públicas gratuitas. Resolução técnica: DataJud indexado por tribunal + camada cross-court.
              </p>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-sky-400 font-bold block mb-1">02. Risco Agroclimático</span>
              <p className="text-[11px] text-slate-400">
                ZARC é filtro categórico de janela MAPA, cruzado com INMET (30 anos), Conab e PSR.
              </p>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-amber-400 font-bold block mb-1">03. Motor de Scoring</span>
              <p className="text-[11px] text-slate-400">
                Scorecard explicável Weight of Evidence (0-1000) e Matriz de 6 Red Flags operacionais.
              </p>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-teal-400 font-bold block mb-1">04. Sintetizador watsonx</span>
              <p className="text-[11px] text-slate-400">
                Emite o Dossiê Padronizado com parecer sobre Stay Period e bens de capital essenciais no STJ.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      stepNumber: 4,
      badge: 'Metodologia de Risco',
      title: 'Scorecard Explicável (0–1000) vs PD Caixa-Preta',
      subtitle: 'Por que o método Weight of Evidence (WoE) é o único defensável perante a banca',
      icon: Cpu,
      color: 'amber',
      content: (
        <div className="space-y-3.5 text-xs text-slate-300">
          <p className="leading-relaxed">
            Uma Probabilidade de Inadimplência (PD) estatística exige base histórica massiva de eventos de default que produtos novos não possuem. Como bureaus reais (<strong>Serasa e Boa Vista</strong>) fazem, adotamos um <strong>scorecard ponderado transparente</strong>:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-[11px]">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Processual</span>
              <span className="text-emerald-400 font-bold text-sm">30%</span>
              <span className="text-[9px] text-slate-500 block">DataJud / DJEs</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Agroclimático</span>
              <span className="text-sky-400 font-bold text-sm">25%</span>
              <span className="text-[9px] text-slate-500 block">ZARC / INMET</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Fiscal / Trab.</span>
              <span className="text-amber-400 font-bold text-sm">20%</span>
              <span className="text-[9px] text-slate-500 block">PGFN / TST / Caixa</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Cadastral</span>
              <span className="text-teal-400 font-bold text-sm">15%</span>
              <span className="text-[9px] text-slate-500 block">Receita / QSA</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 col-span-2 sm:col-span-1">
              <span className="text-slate-400 block text-[10px]">Ambiental</span>
              <span className="text-rose-400 font-bold text-sm">10%</span>
              <span className="text-[9px] text-slate-500 block">SICAR / IBAMA</span>
            </div>
          </div>
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 text-[11px] flex items-center justify-between">
            <span className="text-slate-300">
              <strong>Decisão: </strong>
              Rating A (padrão) • B (120d) • C (CPR Física obrigatória) • D (Bloqueio / Alerta RJ).
            </span>
          </div>
        </div>
      ),
    },
    {
      stepNumber: 5,
      badge: 'Cockpit & Simulador',
      title: 'Cockpit EWS: Monitoramento Contínuo & Simulação ao Vivo',
      subtitle: 'O entregável central do edital demonstrado em tempo real para a banca',
      icon: ShieldAlert,
      color: 'rose',
      content: (
        <div className="space-y-3.5 text-xs text-slate-300">
          <p className="leading-relaxed">
            O Sistema de Alerta Precoce opera em três cadências automatizadas:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-rose-950/20 p-3 rounded-xl border border-rose-500/30">
              <span className="text-rose-300 font-bold block mb-1">⚡ Gatilho Imediato 24h</span>
              <p className="text-[11px] text-slate-300">
                Nova distribuição de ação de execução ou pedido de RJ no DataJud dispara reclassificação e notificação em até 24h.
              </p>
            </div>
            <div className="bg-amber-950/20 p-3 rounded-xl border border-amber-500/30">
              <span className="text-amber-300 font-bold block mb-1">📅 Verificação Mensal</span>
              <p className="text-[11px] text-slate-300">
                Varredura periódica de novas inscrições na PGFN, CNDT trabalhista e alterações no QSA de sócios.
              </p>
            </div>
            <div className="bg-sky-950/20 p-3 rounded-xl border border-sky-500/30">
              <span className="text-sky-300 font-bold block mb-1">🌾 Verificação de Safra</span>
              <p className="text-[11px] text-slate-300">
                Aderência à janela ZARC no plantio declarado + monitoramento da anomalia acumulada de chuva no INMET.
              </p>
            </div>
          </div>

          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-[11px] text-emerald-300 flex items-center justify-between">
            <span>
              💡 <strong>Dica para o Pitch:</strong> Na aba <em>"Cockpit EWS"</em>, use os botões do simulador para injetar uma execução judicial ao vivo na frente dos avaliadores!
            </span>
          </div>
        </div>
      ),
    },
  ];

  const current = steps[currentStep];
  const Icon = current.icon;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header with Step Progress */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/90">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">
                  Mini Tutorial Interativo Krill Tech
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-emerald-400 border border-slate-700">
                  Etapa {currentStep + 1} de {steps.length}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Guia prático de conceitos de risco agro e operação dos 4 agentes
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Fechar Tutorial (Esc)"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-1">
          <div
            className="bg-emerald-500 h-1 transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-0.5">
                {current.badge}
              </span>
              <h4 className="text-base font-bold text-white leading-snug">
                {current.title}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {current.subtitle}
              </p>
            </div>
          </div>

          <div className="pt-2">
            {current.content}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {steps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStep(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentStep
                    ? 'w-6 bg-emerald-400'
                    : 'w-2 bg-slate-700 hover:bg-slate-600'
                }`}
                title={`Ir para etapa ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <button
                onClick={handlePrev}
                className="px-3.5 py-1.5 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1.5 transition-all"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Anterior</span>
              </button>
            )}

            <button
              onClick={handleNext}
              className="px-4 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 hover:brightness-110 shadow-md shadow-emerald-500/20 flex items-center gap-1.5 transition-all"
            >
              <span>{currentStep === steps.length - 1 ? 'Concluir e Explorar' : 'Próximo'}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
