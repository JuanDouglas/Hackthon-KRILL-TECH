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
  ListChecks 
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

  // Checklist de providências operacionais
  const checklistItems = isBlock
    ? [
        'Suspender imediatamente aprovação de novos pedidos comerciais no ERP',
        'Notificar departamento jurídico para apurar preferência de garantias',
        'Iniciar negociação de confissão de dívida com garantia hipotecária ou alienação fiduciária',
        'Acompanhar distribuição no DataJud com alerta diário 24h',
      ]
    : isCprMandatory
    ? [
        'Exigir formalização e registro de CPR Física (com colheita vinculada) em registradora B3/Cerc',
        'Limitar o prazo da fatura à data de colheita da safra',
        'Verificar disponibilidade de apólice de seguro rural privada ou barter com trava',
        'Inserir cliente no radar intensivo mensal do EWS',
      ]
    : isReduced
    ? [
        'Ajustar prazo de pagamento para o teto de 120 dias',
        'Exigir aval dos sócios e penhor de safra',
        'Agendar monitoramento trimestral automático no DataJud e PGFN',
      ]
    : [
        'Liberar faturamento em prazo padrão comercial (180 dias)',
        'Cadastrar no monitoramento anual de safra do EWS',
        'Incentivar contratação de seguro PSR parceiro para desconto em taxa',
      ];

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5 h-full flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Diretriz Operacional Concreta
            </span>
            <h3 className="text-base font-extrabold text-white mt-0.5">
              Recomendação para Comitê de Crédito
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-all active:scale-95"
              title="Copiar parecer formatado para colar em e-mail ou WhatsApp"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copiado!' : 'Copiar Parecer'}</span>
            </button>

            <div
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 ${
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
          <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-slate-400 block mb-1 flex items-center gap-1.5 text-[11px]">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                <span>Prazo de Pagamento</span>
              </span>
              <div className="text-base font-black font-mono text-white">
                {recommendation.paymentTermsDays === 0
                  ? '0 dias (À Vista / Bloqueado)'
                  : `${recommendation.paymentTermsDays} dias (Safra)`}
              </div>
            </div>
            <span className="text-[10px] text-slate-400 mt-2 block">
              {isStandard ? 'Condição comercial ampla' : isReduced ? 'Prazo encurtado preventivo' : isCprMandatory ? 'Vencimento no ato da colheita' : 'Suspensão de concessão'}
            </span>
          </div>

          <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-slate-400 block mb-1 flex items-center gap-1.5 text-[11px]">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>Garantia Obrigatória</span>
              </span>
              <div className="font-bold text-amber-300 text-xs leading-snug">
                {recommendation.mandatoryCollateral}
              </div>
            </div>
            <span className="text-[10px] text-slate-400 mt-2 block">
              {isCprMandatory ? 'CPR Física com preferência legal de grãos' : 'Garantia usual de carteira'}
            </span>
          </div>

          <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-slate-400 block mb-1 flex items-center gap-1.5 text-[11px]">
                <FileCheck2 className="h-3.5 w-3.5 text-sky-400" />
                <span>Seguro Rural (PSR)</span>
              </span>
              <div className="font-semibold text-slate-200 text-xs leading-snug">
                {recommendation.psrInsuranceRequirement}
              </div>
            </div>
            <span className="text-[10px] text-slate-400 mt-2 block">
              Penaliza o score, sem agir como veto bloqueante (2,3% PSR em 2025).
            </span>
          </div>
        </div>

        {/* Analyst Checklist */}
        <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 mt-4 text-xs">
          <span className="text-slate-300 font-bold text-xs flex items-center gap-2 mb-2">
            <ListChecks className="h-4 w-4 text-emerald-400" />
            <span>Checklist de Providências para a Equipe Krill Tech:</span>
          </span>
          <div className="space-y-1.5 text-[11px] text-slate-300">
            {checklistItems.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="h-4 w-4 rounded bg-slate-900 border border-slate-700 flex items-center justify-center text-emerald-400 text-[9px] font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stay Period Caveat */}
      <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-3.5 text-xs mt-2">
        <div className="flex items-start gap-2.5">
          <Scale className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-amber-300 block text-[11px]">
              Ressalva Jurídica Estratégica: Stay Period e Bens de Capital Essenciais (STJ)
            </span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              {recommendation.legalCaveatStayPeriod}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
