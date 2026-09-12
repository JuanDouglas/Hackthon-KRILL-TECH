import React, { useState } from 'react';
import { Database, Sparkles, FlaskConical, Info, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

interface DataOriginLegendProps {
  className?: string;
  defaultExpanded?: boolean;
}

export const DataOriginLegend: React.FC<DataOriginLegendProps> = ({ 
  className = '',
  defaultExpanded = false 
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className={`bg-[#0e0e17] border border-[#231c3a] rounded-2xl p-4 text-xs font-sans transition-all ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-[#8b4dff] shrink-0" />
          <span className="text-white font-display font-bold text-xs uppercase tracking-wider">
            Arquitetura de Confiabilidade dos Dados (3 Camadas)
          </span>
        </div>

        {/* 3 Origin Chips */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Layer 1: Fato de API */}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 text-[10px] font-display font-bold">
            <Database className="h-3 w-3 text-emerald-400" />
            <span>FATO REAL DE API PÚBLICA</span>
          </span>

          {/* Layer 2: Visão Analítica por IA */}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#6618F7]/25 text-[#d8b4fe] border border-[#6618F7]/50 text-[10px] font-display font-bold">
            <Sparkles className="h-3 w-3 text-[#a78bfa]" />
            <span>VISÃO ANALÍTICA POR IA (watsonx)</span>
          </span>

          {/* Layer 3: Simulação de Estresse */}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/40 border-dashed text-[10px] font-display font-bold">
            <FlaskConical className="h-3 w-3 text-amber-400" />
            <span>PROJEÇÃO DE SIMULAÇÃO</span>
          </span>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#141422] transition-all cursor-pointer ml-1"
            title={isExpanded ? 'Recolher detalhes' : 'Expandir explicação das camadas'}
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Expandable Explanation Details */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-[#231c3a] grid grid-cols-1 md:grid-cols-3 gap-3 animate-fade-in text-[11px] leading-relaxed">
          {/* Layer 1 Detail */}
          <div className="p-3 rounded-xl bg-[#09090e] border border-emerald-500/30 space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-400 font-display font-bold">
              <Database className="h-3.5 w-3.5" />
              <span>1. Fato Real de API Pública</span>
            </div>
            <p className="text-slate-300 font-sans">
              Dados fáticos brutos e auditáveis obtidos diretamente de bases governamentais e cartorárias (<strong>DataJud, Receita Federal, PGFN, TST, Caixa, SICAR e INMET</strong>). Representam fatos jurídicos e cadastrais comprovados, livres de inferência.
            </p>
          </div>

          {/* Layer 2 Detail */}
          <div className="p-3 rounded-xl bg-[#09090e] border border-[#6618F7]/40 space-y-1">
            <div className="flex items-center gap-1.5 text-[#d8b4fe] font-display font-bold">
              <Sparkles className="h-3.5 w-3.5 text-[#a78bfa]" />
              <span>2. Visão Analítica por IA (watsonx)</span>
            </div>
            <p className="text-slate-300 font-sans">
              Interpretação e síntese calculadas pelos agentes inteligentes (<strong>Scorecard Weight of Evidence 0-1000, Rating inferido A/B/C/D, parecer STJ e detecção de Inadimplência Técnica</strong>). É o valor intelectual preditivo aplicado sobre os fatos.
            </p>
          </div>

          {/* Layer 3 Detail */}
          <div className="p-3 rounded-xl bg-[#09090e] border border-amber-500/40 border-dashed space-y-1">
            <div className="flex items-center gap-1.5 text-amber-300 font-display font-bold">
              <FlaskConical className="h-3.5 w-3.5 text-amber-400" />
              <span>3. Projeção de Simulação (Estresse)</span>
            </div>
            <p className="text-slate-300 font-sans">
              Cenários hipotéticos de estresse (<strong>Safra 25/26, queda severa de commodities, veranico e injeções da bancada de testes</strong>). Servem para testes de sensibilidade e nunca alteram a base cadastral oficial da Krill Tech.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
