import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

interface TooltipHelpProps {
  term: string;
  definition: string;
  sourceBadge?: string;
  children?: React.ReactNode;
}

export const TooltipHelp: React.FC<TooltipHelpProps> = ({
  term,
  definition,
  sourceBadge,
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span
      className="relative inline-flex items-center group cursor-help"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      tabIndex={0}
      role="tooltip"
      aria-label={`${term}: ${definition}`}
    >
      {children ? (
        <span className="border-b border-dotted border-emerald-400/60 hover:border-emerald-400 text-slate-200">
          {children}
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 text-slate-400 hover:text-emerald-400 transition-colors">
          <span>{term}</span>
          <HelpCircle className="h-3 w-3 inline text-emerald-400/70" />
        </span>
      )}

      {isVisible && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2.5 bg-slate-900/95 border border-slate-700 text-slate-200 text-[11px] rounded-xl shadow-2xl backdrop-blur-md z-50 pointer-events-none transition-opacity duration-200 animate-fade-in block">
          <span className="flex items-center justify-between pb-1 mb-1 border-b border-slate-800">
            <strong className="text-emerald-400 font-bold text-xs">{term}</strong>
            {sourceBadge && (
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                {sourceBadge}
              </span>
            )}
          </span>
          <span className="block text-slate-300 leading-relaxed">{definition}</span>
          {/* Subtle pointer arrow */}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
        </span>
      )}
    </span>
  );
};

export const AGRO_TERMS_GLOSSARY = {
  ZARC: {
    term: 'ZARC (Zoneamento Agrícola)',
    definition: 'Instrumento do MAPA/Embrapa que define janelas de plantio de menor risco climático por município e cultura. Não é termômetro em tempo real, mas filtro categórico de aptidão.',
    source: 'MAPA / Embrapa',
  },
  PSR: {
    term: 'PSR (Seguro Rural)',
    definition: 'Programa de Subvenção ao Prêmio do Seguro Rural. Em 2025 sua cobertura caiu para 2,3% a 3,3% da área, transferindo o risco de perda para os credores da cadeia.',
    source: 'Ministério da Agricultura',
  },
  LCDPR: {
    term: 'LCDPR (Livro Caixa Digital)',
    definition: 'Livro Caixa Digital do Produtor Rural. Pela Lei 14.112/2020, 2 anos de comprovação de atividade via LCDPR já conferem legitimidade ativa para pleitear Recuperação Judicial.',
    source: 'Receita Federal / Lei 11.101',
  },
  STAY_PERIOD: {
    term: 'Stay Period & STJ',
    definition: 'Suspensão de 180 dias de execuções contra o devedor em RJ. O STJ e tribunais estaduais proíbem a apreensão de bens de capital essenciais à atividade produtiva mesmo com alienação fiduciária.',
    source: 'Jurisprudência STJ',
  },
  WOE: {
    term: 'Scorecard WoE',
    definition: 'Metodologia Weight of Evidence / scorecard por pontos explicável. Utilizada por bureaus (Serasa/Boa Vista) para novos produtos onde não há base histórica massiva de default.',
    source: 'Metodologia de Risco',
  },
  DATAJUD: {
    term: 'DataJud (CNJ)',
    definition: 'API Pública de metadados processuais do Conselho Nacional de Justiça. Indexada por tribunal/processo; para varredura unificada nos 90 tribunais do país requer camada de agregação (Jusbrasil/Escavador).',
    source: 'Resolução CNJ 331/2020',
  },
};
