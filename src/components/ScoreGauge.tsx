import React from 'react';
import { RatingBand } from '../types/score';
import { ShieldCheck, AlertCircle, AlertOctagon, ShieldAlert, HelpCircle } from 'lucide-react';
import { TooltipHelp, AGRO_TERMS_GLOSSARY } from './TooltipHelp';

interface ScoreGaugeProps {
  score: number;
  rating: RatingBand;
  ratingLabel: string;
  derivedAgroScore: number;
  evaluatedAt: string;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  score,
  rating,
  ratingLabel,
  derivedAgroScore,
  evaluatedAt,
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

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const progressPercent = Math.min(100, Math.max(0, (score / 1000) * 100));
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Scorecard Heurístico Ponderado
              </span>
              <TooltipHelp
                term={AGRO_TERMS_GLOSSARY.WOE.term}
                definition={AGRO_TERMS_GLOSSARY.WOE.definition}
                sourceBadge="Metodologia"
              />
            </div>
            <h3 className="text-base font-extrabold text-white mt-0.5">
              Classificação de Risco Oficial
            </h3>
          </div>

          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${currentConfig.bgColor} ${currentConfig.color} border ${currentConfig.borderColor}`}>
            <Icon className="h-4 w-4" />
            <span>RATING {rating}</span>
          </div>
        </div>

        {/* Circular Gauge and breakdown */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-6">
          {/* Circular SVG Meter */}
          <div className="relative flex items-center justify-center shrink-0">
            <svg className="w-44 h-44 transform -rotate-90">
              <circle
                cx="88"
                cy="88"
                r={radius}
                stroke="#1e293b"
                strokeWidth="12"
                fill="transparent"
              />
              <circle
                cx="88"
                cy="88"
                r={radius}
                stroke={currentConfig.strokeColor}
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Center score */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-black font-mono tracking-tight text-white">
                {score}
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                de 1000 pts
              </span>
              <span className={`text-[11px] font-extrabold mt-1 px-2 py-0.5 rounded ${currentConfig.bgColor} ${currentConfig.color}`}>
                RATING {rating}
              </span>
            </div>
          </div>

          {/* Enquadramento e contexto */}
          <div className="flex-1 space-y-3 text-xs w-full">
            <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between mb-1">
                <span className="text-slate-400 font-medium">Faixa de Enquadramento:</span>
                <span className={`font-bold ${currentConfig.color}`}>{currentConfig.label}</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {currentConfig.riskDesc}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 block mb-0.5 text-[10px]">Índice Agroclimático:</span>
                <span className="font-mono font-bold text-sky-400 text-sm">{derivedAgroScore}/100</span>
                <span className="text-[9px] text-slate-400 block mt-0.5">ZARC + INMET</span>
              </div>
              <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 block mb-0.5 text-[10px]">Escala Oficial:</span>
                <span className="font-mono font-bold text-slate-200 text-sm">
                  {rating === 'A' ? '800–1000' : rating === 'B' ? '600–799' : rating === 'C' ? '400–599' : '< 400'}
                </span>
                <span className="text-[9px] text-slate-400 block mt-0.5">Padrão Edital</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Methodology Footer */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <span>Scorecard explicável (Weight of Evidence) — 100% auditável.</span>
        <span className="font-mono text-[10px] text-slate-400">{evaluatedAt}</span>
      </div>
    </div>
  );
};
