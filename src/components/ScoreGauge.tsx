import { RatingBand, TemporalPdPrediction, OrchestrateAction } from '../types/score';
import { ShieldCheck, AlertCircle, AlertOctagon, ShieldAlert, Zap, Clock } from 'lucide-react';
import { TooltipHelp, AGRO_TERMS_GLOSSARY } from './TooltipHelp';

interface ScoreGaugeProps {
  score: number;
  rating: RatingBand;
  ratingLabel: string;
  derivedAgroScore: number;
  evaluatedAt: string;
  temporalPd?: TemporalPdPrediction;
  orchestrateAction?: OrchestrateAction;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  score,
  rating,
  ratingLabel,
  derivedAgroScore,
  evaluatedAt,
  temporalPd,
  orchestrateAction,
}) => {
  const ratingConfig: Record<
    RatingBand,
    {
      label: string;
      color: string;
      bgColor: string;
      borderColor: string;
      strokeColor: string;
      icon: React.ElementType;
      riskDesc: string;
    }
  > = {
    A: {
      label: 'Rating A • Baixo Risco',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      strokeColor: '#10b981',
      icon: ShieldCheck,
      riskDesc: 'Conformidade plena cadastral, climática e processual. Liberação de crédito em prazo padrão sem exigência de garantias extraordinárias.',
    },
    B: {
      label: 'Rating B • Risco Moderado',
      color: 'text-sky-400',
      bgColor: 'bg-sky-500/10',
      borderColor: 'border-sky-500/30',
      strokeColor: '#0ea5e9',
      icon: AlertCircle,
      riskDesc: 'Operação viável com monitoramento trimestral automático. Prazo de liquidação reduzido para até 120 dias.',
    },
    C: {
      label: 'Rating C • Alerta Precoce / Risco Alto',
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      strokeColor: '#f59e0b',
      icon: AlertOctagon,
      riskDesc: 'Estresse agroclimático ou apontamentos iniciais detectados. Exigência mandatória de garantia real (CPR Física ou Barter) para mitigar o colapso do PSR.',
    },
    D: {
      label: 'Rating D • Risco Crítico / Alerta de RJ',
      color: 'text-rose-400',
      bgColor: 'bg-rose-500/10',
      borderColor: 'border-rose-500/30',
      strokeColor: '#f43f5e',
      icon: ShieldAlert,
      riskDesc: 'ALERTA MÁXIMO DE INSOLVÊNCIA: Múltiplas execuções, inadimplência fiscal ou quebra irreversível. Bloqueio imediato de novos limites comerciais.',
    },
  };

  const currentConfig = ratingConfig[rating];
  const Icon = currentConfig.icon;

  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const progressPercent = Math.min(100, Math.max(0, (score / 1000) * 100));
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="bg-[#09090e] border border-[#231c3a] rounded-2xl p-5 shadow-2xl flex flex-col justify-between h-full space-y-4">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#231c3a]">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-display font-bold text-slate-400 uppercase tracking-wider">
                Motor de Decisão & Scoring (Seção 6)
              </span>
              <TooltipHelp
                term={AGRO_TERMS_GLOSSARY.WOE.term}
                definition={AGRO_TERMS_GLOSSARY.WOE.definition}
                sourceBadge="Metodologia"
              />
            </div>
            <h3 className="text-sm font-display font-black text-white mt-0.5">
              Scorecard WoE & Modelagem Preditiva
            </h3>
          </div>

          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-display font-bold ${currentConfig.bgColor} ${currentConfig.color} border ${currentConfig.borderColor}`}>
            <Icon className="h-3.5 w-3.5" />
            <span>RATING {rating}</span>
          </div>
        </div>

        {/* Circular Gauge and breakdown */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 py-4">
          {/* Circular SVG Meter */}
          <div className="relative flex items-center justify-center shrink-0">
            <svg className="w-36 h-36 transform -rotate-90">
              <circle
                cx="72"
                cy="72"
                r={radius}
                stroke="#141422"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="72"
                cy="72"
                r={radius}
                stroke={currentConfig.strokeColor}
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Center score */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-black font-display tracking-tight text-white">
                {score}
              </span>
              <span className="text-[9px] font-display font-bold text-slate-400 uppercase tracking-wider">
                de 1000 pts
              </span>
              <span className={`text-[10px] font-display font-black mt-0.5 px-1.5 py-0.2 rounded ${currentConfig.bgColor} ${currentConfig.color}`}>
                RATING {rating}
              </span>
            </div>
          </div>

          {/* Enquadramento e contexto */}
          <div className="flex-1 space-y-2 text-xs w-full">
            <div className="bg-[#0e0e17] p-3 rounded-xl border border-[#231c3a]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-slate-400 text-[11px] font-medium">Faixa de Enquadramento:</span>
                <span className={`font-bold font-display text-xs ${currentConfig.color}`}>{currentConfig.label}</span>
              </div>
              <p className="text-slate-300 text-[11px] font-sans leading-relaxed">
                {currentConfig.riskDesc}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="bg-[#0e0e17] p-2 rounded-xl border border-[#231c3a]">
                <span className="text-slate-400 block text-[9px] font-display">Índice Agroclimático:</span>
                <span className="font-display font-bold text-sky-400 text-xs">{derivedAgroScore}/100</span>
                <span className="text-[8px] text-slate-500 block font-sans">ZARC + INMET</span>
              </div>
              <div className="bg-[#0e0e17] p-2 rounded-xl border border-[#231c3a]">
                <span className="text-slate-400 block text-[9px] font-display">Escala Oficial:</span>
                <span className="font-display font-bold text-slate-200 text-xs">
                  {rating === 'A' ? '800–1000' : rating === 'B' ? '600–799' : rating === 'C' ? '400–599' : '< 400'}
                </span>
                <span className="text-[8px] text-slate-500 block font-sans">Faixa Regulatória</span>
              </div>
            </div>
          </div>
        </div>

        {/* Horizonte Preditivo Temporal de Default (6, 12 e 24 Meses - Exigência do Edital) */}
        {temporalPd && (
          <div className="bg-[#0e0e17] p-3.5 rounded-xl border border-purple-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-display font-bold text-[#a78bfa] uppercase tracking-wider flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>Horizontes Preditivos de Default (PD)</span>
              </span>
              <span className="text-[9px] font-display font-bold px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300">
                Risco RJ: {temporalPd.rjRiskHorizon}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-lg bg-[#141422] border border-[#231c3a]">
                <span className="text-[9px] text-slate-400 block font-display">Horizonte 6m</span>
                <span className="text-sm font-display font-black text-white">
                  {temporalPd.pd6MonthsPercent}%
                </span>
              </div>

              <div className="p-2 rounded-lg bg-[#141422] border border-[#231c3a]">
                <span className="text-[9px] text-slate-400 block font-display">Horizonte 12m</span>
                <span className={`text-sm font-display font-black ${
                  temporalPd.pd12MonthsPercent > 30 ? 'text-rose-400' : temporalPd.pd12MonthsPercent > 15 ? 'text-amber-400' : 'text-emerald-400'
                }`}>
                  {temporalPd.pd12MonthsPercent}%
                </span>
              </div>

              <div className="p-2 rounded-lg bg-[#141422] border border-[#231c3a]">
                <span className="text-[9px] text-slate-400 block font-display">Horizonte 24m</span>
                <span className={`text-sm font-display font-black ${
                  temporalPd.pd24MonthsPercent > 50 ? 'text-rose-400' : temporalPd.pd24MonthsPercent > 20 ? 'text-amber-400' : 'text-emerald-400'
                }`}>
                  {temporalPd.pd24MonthsPercent}%
                </span>
              </div>
            </div>
          </div>
        )}

        {/* watsonx Orchestrate Automation Trigger Indicator */}
        {orchestrateAction && orchestrateAction.actionTriggered && (
          <div className="p-2.5 rounded-xl bg-purple-950/20 border border-[#6618F7]/50 flex items-center justify-between text-[11px] font-sans">
            <div className="flex items-center gap-2">
              <Zap className="h-3.5 w-3.5 text-[#8b4dff]" />
              <span className="text-slate-300">
                <strong>watsonx Orchestrate:</strong> {orchestrateAction.actionType === 'ERP_CREDIT_LOCK' ? 'Trava de Faturamento no SAP S/4HANA (T+0h)' : 'Notificação de Redução de Prazos no ERP'}
              </span>
            </div>
            <span className="text-[9px] font-display font-bold text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded">
              {orchestrateAction.status}
            </span>
          </div>
        )}
      </div>

      {/* Methodology Footer */}
      <div className="pt-2 border-t border-[#231c3a] flex items-center justify-between text-[10px] text-slate-500">
        <span className="font-sans">Scorecard WoE + Preditivo 6/12/24m calibrado.</span>
        <span className="font-display">{evaluatedAt}</span>
      </div>
    </div>
  );
};
