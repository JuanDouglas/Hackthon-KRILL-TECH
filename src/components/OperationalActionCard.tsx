import React, { useState } from 'react';
import { OperationalRecommendation } from '../types/score';
import { 
  CheckSquare, 
  Clock, 
  ShieldCheck, 
  Scale, 
  AlertTriangle, 
  FileCheck2, 
  Lock, 
  Copy, 
  Check, 
  ListChecks,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { TooltipHelp, AGRO_TERMS_GLOSSARY } from './TooltipHelp';

interface OperationalActionCardProps {
  recommendation: OperationalRecommendation;
  borrowerExposureBrl: number;
}

export const OperationalActionCard: React.FC<OperationalActionCardProps> = ({
  recommendation,
  borrowerExposureBrl,
}) => {
  const [copied, setCopied] = useState(false);
  const [showLegalDetails, setShowLegalDetails] = useState(false);

  const isBlock = recommendation.rating === 'D';
  const isCprMandatory = recommendation.rating === 'C';
  const isStandard = recommendation.rating === 'A';
  const isReduced = recommendation.rating === 'B';

  const handleCopySummary = () => {
    const textToCopy = `[PARECER DE CRÉDITO KRILL TECH]\nDecisão: ${recommendation.label}\nPrazo Máximo: ${recommendation.paymentTermsDays === 0 ? 'Suspenso a Prazo' : `${recommendation.paymentTermsDays} dias`}\nGarantia Mandatória: ${recommendation.mandatoryCollateral}\nCondição Seguro: ${recommendation.psrInsuranceRequirement}\nMonitoramento: ${recommendation.monitoringFrequency}\nResumo: ${recommendation.executiveSummary}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Checklist de providências operacionais enxuto
  const checklistItems = isBlock
    ? [
        'Travar imediatamente pedidos comerciais no ERP (webhook watsonx)',
        'Notificar jurídico para apuração e preferência de garantias reais',
        'Formalizar confissão de dívida com alienação fiduciária de grãos',
        'Acionar alerta diário 24h no DataJud para distribuição de RJ',
      ]
    : isCprMandatory
    ? [
        'Exigir CPR Física com registro imediato (B3/Cerc)',
        'Limitar o vencimento da fatura à data de colheita',
        'Verificar apólice de seguro rural privada ou barter com trava',
        'Inserir cliente no radar intensivo mensal do EWS',
      ]
    : isReduced
    ? [
        'Ajustar prazo de pagamento para o teto de 120 dias',
        'Exigir aval dos sócios e penhor de safra',
        'Agendar monitoramento trimestral no DataJud e PGFN',
      ]
    : [
        'Liberar faturamento em prazo comercial padrão (180 dias)',
        'Cadastrar no monitoramento anual preventivo de safra',
        'Incentivar seguro parceiro para bonificação de taxa',
      ];

  return (
    <div className="bg-[#09090e] border border-[#231c3a] rounded-2xl p-6 shadow-2xl space-y-5 h-full flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#231c3a]">
          <div>
            <span className="text-xs font-display font-bold text-[#8b4dff] uppercase tracking-wider">
              Diretriz Operacional Concreta
            </span>
            <h3 className="text-base font-display font-black text-white mt-0.5">
              Recomendação para Comitê de Crédito
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              className="px-3 py-1.5 rounded-lg text-xs font-sans font-semibold bg-[#141422] hover:bg-[#1c182c] text-slate-200 border border-[#231c3a] hover:border-[#6618F7]/40 flex items-center gap-1.5 transition-all active:scale-95"
              title="Copiar parecer formatado para colar em e-mail ou WhatsApp"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copiado!' : 'Copiar Parecer'}</span>
            </button>

            <div
              className={`px-3 py-1.5 rounded-lg text-xs font-display font-bold border flex items-center gap-1.5 ${
                isBlock
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                  : isCprMandatory
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  : isReduced
                  ? 'bg-sky-500/20 text-sky-300 border-sky-500/30'
                  : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
              }`}
            >
              {isBlock ? <Lock className="h-3.5 w-3.5" /> : <CheckSquare className="h-3.5 w-3.5" />}
              <span>{recommendation.label}</span>
            </div>
          </div>
        </div>

        {/* 3 Core Operational Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs pt-4">
          <div className="bg-[#0e0e17] p-3.5 rounded-xl border border-[#231c3a] flex flex-col justify-between">
            <div>
              <span className="text-slate-400 block mb-1 flex items-center gap-1.5 text-[11px] font-display">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                <span>Prazo de Pagamento</span>
              </span>
              <div className="text-base font-black font-display text-white">
                {recommendation.paymentTermsDays === 0
                  ? '0 dias (À Vista / Bloqueado)'
                  : `${recommendation.paymentTermsDays} dias (Safra)`}
              </div>
            </div>
            <span className="text-[10px] text-slate-500 mt-2 block font-sans">
              {isStandard ? 'Condição comercial ampla' : isReduced ? 'Prazo encurtado preventivo' : isCprMandatory ? 'Vencimento no ato da colheita' : 'Suspensão de concessão'}
            </span>
          </div>

          <div className="bg-[#0e0e17] p-3.5 rounded-xl border border-[#231c3a] flex flex-col justify-between">
            <div>
              <span className="text-slate-400 block mb-1 flex items-center gap-1.5 text-[11px] font-display">
                <ShieldCheck className="h-3.5 w-3.5 text-[#8b4dff]" />
                <span>Garantia Obrigatória</span>
              </span>
              <div className="font-bold text-amber-300 text-xs leading-snug font-sans">
                {recommendation.mandatoryCollateral}
              </div>
            </div>
            <span className="text-[10px] text-slate-500 mt-2 block font-sans">
              {isCprMandatory ? 'CPR Física com preferência legal de grãos' : 'Garantia usual de carteira'}
            </span>
          </div>

          <div className="bg-[#0e0e17] p-3.5 rounded-xl border border-[#231c3a] flex flex-col justify-between">
            <div>
              <span className="text-slate-400 block mb-1 flex items-center gap-1.5 text-[11px] font-display">
                <FileCheck2 className="h-3.5 w-3.5 text-sky-400" />
                <span>Seguro Rural (PSR)</span>
              </span>
              <div className="font-semibold text-slate-200 text-xs leading-snug font-sans">
                {recommendation.psrInsuranceRequirement}
              </div>
            </div>
            <span className="text-[10px] text-slate-500 mt-2 block font-sans">
              Penaliza o score sem agir como veto (2,3% PSR em 2025).
            </span>
          </div>
        </div>

        {/* Analyst Checklist */}
        <div className="bg-[#0e0e17] p-4 rounded-xl border border-[#231c3a] mt-4 text-xs">
          <span className="text-slate-300 font-bold text-xs flex items-center gap-2 mb-2 font-display">
            <ListChecks className="h-4 w-4 text-[#8b4dff]" />
            <span>Checklist Operacional para a Equipe de Crédito:</span>
          </span>
          <div className="space-y-1.5 text-[11px] text-slate-300 font-sans">
            {checklistItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="h-4 w-4 rounded bg-[#141422] border border-[#231c3a] flex items-center justify-center text-[#8b4dff] text-[9px] font-bold shrink-0 font-display">
                  {idx + 1}
                </span>
                <span className="truncate">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stay Period Caveat Collapsible */}
      <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-3 text-xs mt-2 transition-all">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Scale className="h-4 w-4 text-amber-400 shrink-0" />
            <div>
              <span className="font-display font-bold text-amber-300 text-[11px]">
                Ressalva STJ: Stay Period & Bens Essenciais (Art. 49, §3º)
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowLegalDetails(!showLegalDetails)}
            className="text-[10px] font-display font-semibold text-amber-300 hover:text-amber-100 px-2 py-1 rounded bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 shrink-0 flex items-center gap-1 transition-all cursor-pointer"
          >
            <span>{showLegalDetails ? 'Ocultar' : 'Ver Parecer'}</span>
            {showLegalDetails ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>
        </div>

        {showLegalDetails && (
          <div className="mt-2.5 pt-2.5 border-t border-amber-500/20 text-slate-300 text-[11px] leading-relaxed font-sans">
            {recommendation.legalCaveatStayPeriod}
          </div>
        )}
      </div>
    </div>
  );
};
