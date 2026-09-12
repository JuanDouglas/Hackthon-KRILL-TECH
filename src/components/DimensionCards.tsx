import React, { useState } from 'react';
import { ScoreDimension } from '../types/score';
import { Scale, CloudSun, ReceiptText, ShieldAlert, Trees, ChevronDown, ChevronUp, Check, AlertTriangle, XCircle } from 'lucide-react';

interface DimensionCardsProps {
  dimensions: ScoreDimension[];
}

export const DimensionCards: React.FC<DimensionCardsProps> = ({ dimensions }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getDimensionIcon = (id: string) => {
    switch (id) {
      case 'processualJuridico':
        return Scale;
      case 'agronomicoClimatico':
        return CloudSun;
      case 'fiscalTrabalhista':
        return ReceiptText;
      case 'cadastralSocietario':
        return ShieldAlert;
      case 'territorialAmbiental':
        return Trees;
      default:
        return Scale;
    }
  };

  const getSignalStatusIcon = (status: string) => {
    switch (status) {
      case 'OPTIMAL':
        return <Check className="h-3.5 w-3.5 text-emerald-400" />;
      case 'MODERATE':
      case 'ADVERSE':
        return <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />;
      case 'CRITICAL':
        return <XCircle className="h-3.5 w-3.5 text-rose-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            Decomposição Analítica Ponderada
          </span>
          <h3 className="text-base font-bold text-white mt-0.5">
            As 5 Dimensões Oficiais do Scorecard (Soma: 1000 pts)
          </h3>
        </div>
        <div className="text-xs text-slate-400">
          Pesos justificados por <span className="text-slate-200 font-semibold">relevância de sinal de risco</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5 pt-5">
        {dimensions.map((dim) => {
          const Icon = getDimensionIcon(dim.id);
          const percentEarned = Math.round((dim.earnedScore / dim.maxScore) * 100);
          const isExpanded = expandedId === dim.id;

          return (
            <div
              key={dim.id}
              className={`bg-slate-950/70 rounded-xl p-4 border transition-all flex flex-col justify-between ${
                isExpanded ? 'border-emerald-500/50 ring-1 ring-emerald-500/20 shadow-lg' : 'border-slate-800/90 hover:border-slate-700'
              }`}
            >
              <div>
                {/* Header with weight and icon */}
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-extrabold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {dim.weightPercent}%
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-white">
                    {dim.earnedScore} <span className="text-[10px] text-slate-500 font-normal">/ {dim.maxScore} pts</span>
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-100 leading-snug mb-1">
                  {dim.title}
                </h4>

                <span className="text-[10px] text-slate-400 block mb-2 font-mono truncate" title={dim.officialSource}>
                  Fonte: {dim.officialSource.split('/')[0]}
                </span>

                {/* Progress bar */}
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-3">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      percentEarned >= 80
                        ? 'bg-emerald-500'
                        : percentEarned >= 60
                        ? 'bg-sky-500'
                        : percentEarned >= 40
                        ? 'bg-amber-500'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${percentEarned}%` }}
                  />
                </div>

                <p className="text-[11px] text-slate-400 line-clamp-3 leading-relaxed mb-3">
                  {dim.weightOfEvidenceRtl}
                </p>
              </div>

              {/* Toggle Signals Details */}
              <div>
                <button
                  onClick={() => setExpandedId(isExpanded ? null : dim.id)}
                  className="w-full text-[11px] text-slate-400 hover:text-white py-1 px-2 rounded bg-slate-900/90 border border-slate-800 flex items-center justify-between transition-all"
                >
                  <span>{dim.signals.length} sinais avaliados</span>
                  {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                </button>

                {isExpanded && (
                  <div className="mt-2.5 pt-2.5 border-t border-slate-800 space-y-2 text-[10px]">
                    {dim.signals.map((sig, sIdx) => (
                      <div key={sIdx} className="bg-slate-900/90 p-2 rounded border border-slate-800/80">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <span className="font-semibold text-slate-200 truncate">{sig.name}</span>
                          <span className="shrink-0">{getSignalStatusIcon(sig.status)}</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-400">
                          <span>{String(sig.value)}</span>
                          <span className={`font-mono font-bold ${sig.scoreImpact < 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                            {sig.scoreImpact === 0 ? '0 pt' : `${sig.scoreImpact} pts`}
                          </span>
                        </div>
                        <p className="text-[9px] text-slate-400 mt-1 leading-normal">
                          {sig.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
