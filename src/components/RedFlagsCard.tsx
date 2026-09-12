import React from 'react';
import { RedFlag } from '../types/score';
import { AlertTriangle, CheckCircle2, ShieldAlert, AlertOctagon } from 'lucide-react';

interface RedFlagsCardProps {
  allRedFlags: RedFlag[];
  activeRedFlags: RedFlag[];
}

export const RedFlagsCard: React.FC<RedFlagsCardProps> = ({
  allRedFlags,
  activeRedFlags,
}) => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white tracking-tight">
                Matriz de Red Flags Operacionais
              </h3>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${
                  activeRedFlags.length > 0
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}
              >
                {activeRedFlags.length > 0 ? `${activeRedFlags.length} Ativas` : '0 Ativas (Conforme)'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Sinais objetivos e diretos sustentados pelas fontes oficiais (sem indicadores fictícios)
            </p>
          </div>
        </div>

        <div className="text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
          Gatilho de Reclassificação para <strong className="text-rose-400">Rating C/D</strong>
        </div>
      </div>

      {/* Grid of 6 Red Flags */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-5">
        {allRedFlags.map((flag) => {
          const isActive = flag.isActive;

          return (
            <div
              key={flag.id}
              className={`rounded-xl p-4 border transition-all flex flex-col justify-between ${
                isActive
                  ? 'bg-rose-950/20 border-rose-500/40 ring-1 ring-rose-500/20 shadow-md'
                  : 'bg-slate-950/50 border-slate-800/80 opacity-70'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase flex items-center gap-1 ${
                      isActive
                        ? flag.severity === 'CRITICA'
                          ? 'bg-rose-500/30 text-rose-300 border border-rose-500/40'
                          : 'bg-amber-500/30 text-amber-300 border border-amber-500/40'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isActive ? (
                      <>
                        <AlertOctagon className="h-3 w-3" />
                        <span>{flag.severity}</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                        <span>Inativa</span>
                      </>
                    )}
                  </span>

                  <span className="text-[10px] font-mono text-slate-400 truncate max-w-[140px]" title={flag.source}>
                    {flag.source.split('/')[0]}
                  </span>
                </div>

                <h4
                  className={`text-xs font-bold leading-snug mb-1.5 ${
                    isActive ? 'text-rose-200' : 'text-slate-300'
                  }`}
                >
                  {flag.title}
                </h4>

                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {flag.description}
                </p>
              </div>

              {isActive && (
                <div className="mt-3 pt-2.5 border-t border-rose-500/20 flex items-center justify-between text-[10px]">
                  <span className="text-rose-400 font-semibold flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    <span>Red Flag Acionada</span>
                  </span>
                  <span className="text-slate-400 font-mono">Dedução no Score</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
