import React, { useState } from 'react';
import { PortfolioEntity } from '../types/monitoring';
import { RatingBand } from '../types/score';
import { 
  TrendingUp, 
  TrendingDown,
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  User, 
  Building2, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertCircle,
  FileSpreadsheet,
  Layers,
  Activity,
  Zap,
  AlertTriangle,
  Scale,
  CloudRain,
  ShieldAlert,
  Info,
  Database,
  Sparkles,
  FlaskConical
} from 'lucide-react';

interface MonitoramentoCarteiraViewProps {
  portfolio: PortfolioEntity[];
  onSelectClientForDeepDive: (clientId: string) => void;
}

// Mapeamento de estresse do cenário de crise setorial (Safra 2025/2026)
interface CrisisSimulationImpact {
  projectedRating: RatingBand;
  projectedScore: number;
  technicalDefault: boolean;
  crisisTrigger: string;
  recommendedAction: string;
}

const CRISIS_IMPACT_MAP: Record<string, CrisisSimulationImpact> = {
  'case-pj-rio-verde': {
    projectedRating: 'D',
    projectedScore: 190,
    technicalDefault: true,
    crisisTrigger: 'Efeito Cascata AgroGalaxy + Queda de margem no milho',
    recommendedAction: 'Acelerar execução de duplicatas e travar recebíveis de clientes finais antes do Stay Period.',
  },
  'case-pf-sorriso': {
    projectedRating: 'D',
    projectedScore: 360,
    technicalDefault: true,
    crisisTrigger: 'Déficit hídrico severo (-38%) + Preço da soja a US$ 9.80/bu sem cobertura de seguro rural (PSR)',
    recommendedAction: 'Exigir depósito físico imediato de grãos colhidos em armazém geral credenciado.',
  },
  'case-pf-balsas': {
    projectedRating: 'D',
    projectedScore: 380,
    technicalDefault: true,
    crisisTrigger: 'Contaminação de CNDT positiva + Quebra de 25% na produtividade de milho no Matopiba',
    recommendedAction: 'Suspender novas faturas a prazo e exigir caução em grãos.',
  },
  'case-pf-patrocinio': {
    projectedRating: 'B',
    projectedScore: 780,
    technicalDefault: false,
    crisisTrigger: 'Resiliência do café especial amortece a crise de grãos; ligeiro aumento de custo de insumos',
    recommendedAction: 'Manter fornecimento regular com acompanhamento semestral.',
  },
  'case-pj-lem-ba': {
    projectedRating: 'C',
    projectedScore: 540,
    technicalDefault: true,
    crisisTrigger: 'Inadimplência cruzada de agricultores locais que não contrataram seguro rural (PSR a 2,8%)',
    recommendedAction: 'Encurtar prazo de pagamento de 180 para 60 dias e exigir aval dos sócios controladores.',
  },
  'case-pf-dourados': {
    projectedRating: 'C',
    projectedScore: 510,
    technicalDefault: true,
    crisisTrigger: 'Veranico na safrinha de milho + compressão de margem com adubos nitrogenados',
    recommendedAction: 'Converter saldo a prazo em CPR Física com entrega em cooperativa parceira.',
  },
  'case-pj-sorriso-graos': {
    projectedRating: 'C',
    projectedScore: 570,
    technicalDefault: false,
    crisisTrigger: 'Redução de giro de armazenagem por retenção especulativa de produtores em crise',
    recommendedAction: 'Monitorar nível de estocagem semanalmente via satélite e vistorias.',
  },
  'case-pj-cuiaba-defensivos': {
    projectedRating: 'D',
    projectedScore: 210,
    technicalDefault: true,
    crisisTrigger: 'Ação preparatória de tutela antecipada (Pré-RJ) confirmada na 1ª Vara de Falências',
    recommendedAction: 'Ajuizar execução imediata de garantias fiduciárias antes da decretação do Stay Period.',
  },
};

export const MonitoramentoCarteiraView: React.FC<MonitoramentoCarteiraViewProps> = ({
  portfolio,
  onSelectClientForDeepDive,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<'ALL' | 'PF' | 'PJ'>('ALL');
  const [selectedRatingFilter, setSelectedRatingFilter] = useState<'ALL' | 'A' | 'B' | 'C' | 'D'>('ALL');
  
  // Toggle de Simulação do Cenário de Crise Setorial
  const [isCrisisSimulationActive, setIsCrisisSimulationActive] = useState<boolean>(false);
  const [filterOnlyCrisisAffected, setFilterOnlyCrisisAffected] = useState<boolean>(false);

  const totalExposure = portfolio.reduce((acc, p) => acc + p.exposureBrl, 0);

  // Exposição real em risco
  const realRiskExposure = portfolio
    .filter((p) => p.currentRating === 'C' || p.currentRating === 'D')
    .reduce((acc, p) => acc + p.exposureBrl, 0);

  // Exposição projetada no cenário de crise
  const simulatedRiskExposure = portfolio
    .filter((p) => {
      const sim = CRISIS_IMPACT_MAP[p.id];
      const rating = isCrisisSimulationActive && sim ? sim.projectedRating : p.currentRating;
      return rating === 'C' || rating === 'D';
    })
    .reduce((acc, p) => acc + p.exposureBrl, 0);

  const filteredPortfolio = portfolio.filter((p) => {
    const sim = CRISIS_IMPACT_MAP[p.id];
    const effectiveRating = isCrisisSimulationActive && sim ? sim.projectedRating : p.currentRating;

    if (selectedRatingFilter !== 'ALL' && effectiveRating !== selectedRatingFilter) return false;
    if (selectedTypeFilter !== 'ALL' && p.type !== selectedTypeFilter) return false;
    if (filterOnlyCrisisAffected && (!sim || sim.projectedRating === p.currentRating)) return false;

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchDoc = p.document.includes(q);
      const matchLoc = p.location.toLowerCase().includes(q);
      if (!matchName && !matchDoc && !matchLoc) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto pb-10">
      {/* Top Banner */}
      <div className="bg-[#09090e] border border-[#231c3a] rounded-3xl p-6 sm:p-7 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 rounded-full text-xs font-display font-bold bg-[#6618F7]/20 text-[#a78bfa] border border-[#6618F7]/40 uppercase tracking-wider">
              Carteira Ativa
            </span>
            <span className="text-xs text-slate-500 font-display">Monitoramento Contínuo</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
            Monitoramento Processual & Financeiro
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl font-sans leading-relaxed">
            Acompanhamento contínuo dos tomadores com saldo aberto na Krill Tech. Varreduras fiscais/trabalhistas mensais (PGFN, CNDT, QSA) e checagem climática por safra (ZARC e estações INMET).
          </p>
        </div>

        <div className="bg-[#0e0e17] p-4 rounded-2xl border border-[#231c3a] text-right shrink-0">
          <span className="text-[10px] font-display uppercase tracking-wider text-slate-400 block mb-0.5">
            Exposição Total da Carteira
          </span>
          <span className="text-2xl font-black font-display text-[#8b4dff]">
            R$ {(totalExposure / 1000000).toFixed(1)}M
          </span>
          <span className="text-[10px] text-slate-500 block font-sans">
            {portfolio.length} tomadores cadastrados
          </span>
        </div>
      </div>

      {/* Routine Cards: Mensal vs Safra */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#09090e] border border-[#231c3a] rounded-xl p-4 flex items-center gap-3.5">
          <div className="h-10 w-10 rounded-xl bg-[#141422] border border-[#231c3a] flex items-center justify-center text-[#8b4dff] shrink-0">
            <Calendar className="h-5 w-5" />
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] font-display font-bold text-[#8b4dff] uppercase tracking-wider block">
              Rotina Mensal Automatizada (Todo dia 01)
            </span>
            <h4 className="text-xs font-display font-bold text-white">
              Varredura Fiscal, Trabalhista e Societária
            </h4>
            <p className="text-[11px] text-slate-400 font-sans">
              PGFN Dívida Ativa, CNDT Trabalhista (TST), CRF-FGTS e alterações no quadro societário (QSA).
            </p>
          </div>
        </div>

        <div className="bg-[#09090e] border border-[#231c3a] rounded-xl p-4 flex items-center gap-3.5">
          <div className="h-10 w-10 rounded-xl bg-[#141422] border border-[#231c3a] flex items-center justify-center text-amber-400 shrink-0">
            <Clock className="h-5 w-5" />
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] font-display font-bold text-amber-400 uppercase tracking-wider block">
              Acompanhamento por Ciclo de Safra
            </span>
            <h4 className="text-xs font-display font-bold text-white">
              Conformidade ZARC & Balanço Hídrico
            </h4>
            <p className="text-[11px] text-slate-400 font-sans">
              Janela oficial de plantio (Portaria MAPA) e precipitação nas estações INMET no enchimento de grãos.
            </p>
          </div>
        </div>
      </div>

      {/* SECTOR CRISIS SIMULATION PANEL (Safra 2025/2026 Stress Test) */}
      <div className={`p-6 rounded-2xl border transition-all ${
        isCrisisSimulationActive
          ? 'bg-purple-950/20 border-[#6618F7]/60 shadow-2xl shadow-purple-950/30'
          : 'bg-[#09090e] border-[#231c3a]'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded text-xs font-display font-bold uppercase tracking-wider ${
                isCrisisSimulationActive
                  ? 'bg-[#6618F7] text-white shadow-md shadow-[#6618F7]/40'
                  : 'bg-[#141422] text-slate-400 border border-[#231c3a]'
              }`}>
                {isCrisisSimulationActive ? '⚡ Simulação de Estresse Ativa' : 'Simulador de Cenários de Crise'}
              </span>
              <span className="text-xs text-slate-400 font-display">Safra 2025/2026</span>
            </div>

            <h3 className="text-base sm:text-lg font-display font-black text-white">
              Cenário Setorial: Queda de Commodities + Seca La Niña + Colapso do PSR
            </h3>

            <p className="text-xs text-slate-300 max-w-3xl font-sans leading-relaxed">
              Permite projetar a sensibilidade da carteira caso os 4 fatores da crise setorial se intensifiquem (soja a US$ 9.80/bu, déficit hídrico regional, ausência de seguro rural e contágio por quebra de revendas).
            </p>
          </div>

          {/* Crisis Toggle Switch */}
          <div className="shrink-0 flex items-center gap-3">
            <div className="flex items-center bg-[#0e0e17] p-1.5 rounded-xl border border-[#231c3a]">
              <button
                onClick={() => setIsCrisisSimulationActive(false)}
                className={`px-3.5 py-2 rounded-lg text-xs font-display font-bold transition-all cursor-pointer ${
                  !isCrisisSimulationActive
                    ? 'bg-[#141422] text-white border border-[#231c3a]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Base Atual
              </button>
              <button
                onClick={() => setIsCrisisSimulationActive(true)}
                className={`px-3.5 py-2 rounded-lg text-xs font-display font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isCrisisSimulationActive
                    ? 'bg-[#6618F7] text-white shadow-lg shadow-[#6618F7]/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Zap className="h-3.5 w-3.5" />
                <span>Simular Cenário de Crise</span>
              </button>
            </div>

            {isCrisisSimulationActive && (
              <button
                onClick={() => setFilterOnlyCrisisAffected(!filterOnlyCrisisAffected)}
                className={`px-3 py-2 rounded-xl text-xs font-display font-bold transition-all shrink-0 cursor-pointer ${
                  filterOnlyCrisisAffected
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-[#141422] text-[#a78bfa] border border-[#231c3a] hover:text-white'
                }`}
              >
                {filterOnlyCrisisAffected ? 'Mostrando Apenas Afetados' : 'Filtrar Degradados'}
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Comparison Bar when Crisis is active */}
        {isCrisisSimulationActive && (
          <div className="mt-5 pt-5 border-t border-[#231c3a] grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in">
            <div className="p-3.5 rounded-xl bg-[#0e0e17] border border-[#231c3a]">
              <span className="text-[10px] font-display uppercase tracking-wider text-slate-400 block mb-1">
                Exposição em Risco Severo (C & D)
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-display text-slate-400 line-through">
                  R$ {(realRiskExposure / 1000000).toFixed(1)}M
                </span>
                <span className="text-lg font-display font-black text-rose-400">
                  R$ {(simulatedRiskExposure / 1000000).toFixed(1)}M
                </span>
              </div>
              <span className="text-[10px] font-display text-rose-400/80 block mt-0.5">
                +R$ {((simulatedRiskExposure - realRiskExposure) / 1000000).toFixed(1)}M projetados sob estresse
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0e0e17] border border-[#231c3a]">
              <span className="text-[10px] font-display uppercase tracking-wider text-slate-400 block mb-1">
                Provável Inadimplência Técnica (Projetada)
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-display font-black text-amber-400">
                  6 de 8 tomadores (75%)
                </span>
              </div>
              <span className="text-[10px] text-slate-400 block mt-0.5 font-sans">
                Probabilidade de descumprimento de covenants na safra sob estresse
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0e0e17] border border-purple-500/30">
              <span className="text-[10px] font-display uppercase tracking-wider text-[#a78bfa] block mb-1">
                Diretriz Operacional do Comitê
              </span>
              <span className="text-xs text-slate-200 font-sans font-semibold block leading-tight">
                Executar retenção de recebíveis e exigir aditivo de CPR Física para tomadores C/D.
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#09090e] border border-[#231c3a] rounded-2xl p-5 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nome do tomador, CNPJ, CPF ou polo agrícola..."
              className="w-full bg-[#0e0e17] border border-[#231c3a] focus:border-[#6618F7] text-white text-xs sm:text-sm rounded-xl pl-10 pr-4 py-2.5 outline-none font-sans"
            />
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSelectedTypeFilter('ALL')}
              className={`px-3 py-2 rounded-xl text-xs font-display font-bold transition-all cursor-pointer ${
                selectedTypeFilter === 'ALL'
                  ? 'bg-[#6618F7] text-white shadow-md shadow-[#6618F7]/30'
                  : 'bg-[#0e0e17] text-slate-400 border border-[#231c3a] hover:text-white'
              }`}
            >
              Todos ({portfolio.length})
            </button>
            <button
              onClick={() => setSelectedTypeFilter('PF')}
              className={`px-3 py-2 rounded-xl text-xs font-display font-bold transition-all cursor-pointer ${
                selectedTypeFilter === 'PF'
                  ? 'bg-[#6618F7] text-white shadow-md shadow-[#6618F7]/30'
                  : 'bg-[#0e0e17] text-slate-400 border border-[#231c3a] hover:text-white'
              }`}
            >
              Produtor PF
            </button>
            <button
              onClick={() => setSelectedTypeFilter('PJ')}
              className={`px-3 py-2 rounded-xl text-xs font-display font-bold transition-all cursor-pointer ${
                selectedTypeFilter === 'PJ'
                  ? 'bg-[#6618F7] text-white shadow-md shadow-[#6618F7]/30'
                  : 'bg-[#0e0e17] text-slate-400 border border-[#231c3a] hover:text-white'
              }`}
            >
              Revenda / PJ
            </button>
          </div>
        </div>

        {/* Portfolio Data Table */}
        <div className="overflow-x-auto rounded-xl border border-[#231c3a]">
          <table className="w-full text-left text-xs text-slate-300 font-sans">
            <thead className="bg-[#0e0e17] text-[10px] font-display font-bold uppercase text-slate-400 border-b border-[#231c3a]">
              <tr>
                <th className="py-3 px-4">Tomador / Documento</th>
                <th className="py-3 px-4">Polo Agrícola</th>
                <th className="py-3 px-4">Exposição Krill</th>
                <th className="py-3 px-4 text-white">Rating Atual</th>
                {isCrisisSimulationActive && (
                  <th className="py-3 px-4 text-amber-300 bg-purple-950/20">
                    Projeção sob Estresse
                  </th>
                )}
                <th className="py-3 px-4">Varredura Oficial</th>
                <th className="py-3 px-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#231c3a]">
              {filteredPortfolio.map((client) => {
                const sim = CRISIS_IMPACT_MAP[client.id];
                const hasDegraded = isCrisisSimulationActive && sim && sim.projectedRating !== client.currentRating;

                return (
                  <tr
                    key={client.id}
                    className={`hover:bg-[#141422]/50 transition-colors ${
                      hasDegraded ? 'bg-purple-950/10' : ''
                    }`}
                  >
                    {/* Name & Document */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-lg bg-[#141422] border border-[#231c3a] flex items-center justify-center text-[#8b4dff] shrink-0">
                          {client.type === 'PF' ? (
                            <User className="h-4 w-4" />
                          ) : (
                            <Building2 className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <span className="font-display font-bold text-white block">
                            {client.name}
                          </span>
                          <span className="text-[10px] text-slate-500 font-display">
                            {client.document} • {client.type}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="py-3.5 px-4">
                      <span className="text-slate-200 block font-medium">{client.location}</span>
                      <span className="text-[10px] text-slate-500">{client.cropOrSector}</span>
                    </td>

                    {/* Exposure */}
                    <td className="py-3.5 px-4">
                      <span className="font-display font-bold text-white block">
                        R$ {(client.exposureBrl / 1000000).toFixed(2)}M
                      </span>
                      <span className="text-[10px] text-slate-500">
                        Score: {client.currentScore} pts
                      </span>
                    </td>

                    {/* Real Rating */}
                    <td className="py-3.5 px-4">
                      <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-display font-black ${
                        client.currentRating === 'A'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : client.currentRating === 'B'
                          ? 'bg-[#6618F7]/20 text-[#a78bfa] border border-[#6618F7]/40'
                          : client.currentRating === 'C'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                      }`}>
                        Rating {client.currentRating}
                      </span>
                    </td>

                    {/* Simulated Projection (Only when Crisis is active) */}
                    {isCrisisSimulationActive && (
                      <td className="py-3.5 px-4">
                        {sim ? (
                          <div className="space-y-1">
                            <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-display font-black border border-dashed ${
                              sim.projectedRating === 'A'
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                                : sim.projectedRating === 'B'
                                ? 'bg-[#6618F7]/20 text-[#d8b4fe] border-[#6618F7]/60'
                                : sim.projectedRating === 'C'
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                                : 'bg-rose-500/20 text-rose-300 border-rose-500/50'
                            }`}>
                              Rating {sim.projectedRating} ({sim.projectedScore} pts)
                            </span>

                            {sim.technicalDefault && (
                              <span className="text-[10px] font-display font-bold text-amber-400 block">
                                ⚠️ Provável Inadimplência Técnica
                              </span>
                            )}

                            <span className="text-[10px] text-slate-400 font-sans block leading-tight max-w-xs">
                              {sim.crisisTrigger}
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-500 text-[10px]">Sem impacto projetado</span>
                        )}
                      </td>
                    )}

                    {/* Next Check */}
                    <td className="py-3.5 px-4">
                      <span className="text-slate-300 block font-sans text-[11px]">
                        {client.nextScheduledCheck}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        Última varredura: {client.lastMonitoredAt}
                      </span>
                    </td>

                    {/* Deep Dive Action */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => onSelectClientForDeepDive(client.id)}
                        className="px-3 py-1.5 rounded-lg bg-[#141422] hover:bg-[#6618F7] text-[#a78bfa] hover:text-white border border-[#231c3a] text-xs font-display font-bold transition-all inline-flex items-center gap-1 cursor-pointer"
                        title="Ver Due Diligence e Dossiê Completo"
                      >
                        <span>Dossiê</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
