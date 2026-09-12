import React, { useState } from 'react';
import { PortfolioEntity } from '../types/monitoring';
import { 
  TrendingUp, 
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
  Activity
} from 'lucide-react';
import { TooltipHelp, AGRO_TERMS_GLOSSARY } from './TooltipHelp';

interface MonitoramentoCarteiraViewProps {
  portfolio: PortfolioEntity[];
  onSelectClientForDeepDive: (clientId: string) => void;
}

export const MonitoramentoCarteiraView: React.FC<MonitoramentoCarteiraViewProps> = ({
  portfolio,
  onSelectClientForDeepDive,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<'ALL' | 'PF' | 'PJ'>('ALL');
  const [selectedRatingFilter, setSelectedRatingFilter] = useState<'ALL' | 'A' | 'B' | 'C' | 'D'>('ALL');

  const totalExposure = portfolio.reduce((acc, p) => acc + p.exposureBrl, 0);
  const avgExposure = totalExposure / portfolio.length;
  const pfCount = portfolio.filter((p) => p.type === 'PF').length;
  const pjCount = portfolio.filter((p) => p.type === 'PJ').length;

  const filteredPortfolio = portfolio.filter((p) => {
    if (selectedRatingFilter !== 'ALL' && p.currentRating !== selectedRatingFilter) return false;
    if (selectedTypeFilter !== 'ALL' && p.type !== selectedTypeFilter) return false;
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
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-sky-950/40 via-slate-900 to-slate-950 border border-sky-500/30 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-sky-500/20 text-sky-300 border border-sky-500/30 uppercase tracking-wider">
              Carteira Ativa • Clientes Atuais
            </span>
            <span className="text-xs text-slate-400 font-mono">Fase 3 do Edital 01/2026</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Monitoramento Processual e Financeiro Contínuo
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
            Acompanhamento rotineiro dos clientes que já possuem linha de crédito e saldo aberto com a Krill Tech. Realiza <strong>verificações mensais automatizadas</strong> (PGFN, CNDT trabalhista, FGTS e alterações societárias no QSA) e <strong>checagens por safra</strong> (janela ZARC e anomalia de chuva INMET).
          </p>
        </div>

        <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-right shrink-0">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 block mb-0.5">
            Exposição Total da Carteira
          </span>
          <span className="text-2xl font-black font-mono text-sky-400">
            R$ {(totalExposure / 1000000).toFixed(1)}M
          </span>
          <span className="text-[10px] text-slate-500 block mt-0.5">
            {portfolio.length} clientes ({pfCount} PF / {pjCount} PJ)
          </span>
        </div>
      </div>

      {/* Routine Cards: Mensal vs Safra */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg flex items-start gap-3.5">
          <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Calendar className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">
              Rotina 1 • Mensal Automatizada
            </span>
            <h4 className="text-sm font-bold text-white">
              Varredura Fiscal, Trabalhista e QSA
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Robô de auditoria consulta todo dia 01 as certidões negativas da <strong>PGFN (Dívida Ativa da União)</strong>, <strong>TST (CNDT Trabalhista)</strong>, <strong>Caixa (CRF-FGTS)</strong> e alterações atípicas no quadro societário da Receita Federal.
            </p>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg flex items-start gap-3.5">
          <div className="h-10 w-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
            <Activity className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold text-sky-400 uppercase tracking-wider">
              Rotina 2 • Por Safra Agrícola
            </span>
            <h4 className="text-sm font-bold text-white">
              Conformidade ZARC & Anomalia INMET
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Verifica o cumprimento da janela de plantio oficial do <strong>ZARC (MAPA/Embrapa)</strong> declarada no momento da venda e calcula o déficit hídrico acumulado via rede automática de estações do <strong>INMET</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Portfolio Table Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>Clientes Ativos com Exposição Aberta ({filteredPortfolio.length})</span>
            </h3>
            <p className="text-xs text-slate-400">
              Gerencie a saúde financeira dos tomadores e verifique a data do próximo agendamento automatizado
            </p>
          </div>

          {/* Type Filter Pills */}
          <div className="flex items-center gap-1.5 text-xs">
            <button
              onClick={() => setSelectedTypeFilter('ALL')}
              className={`px-3 py-1 rounded-xl font-semibold transition-all ${
                selectedTypeFilter === 'ALL'
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Todos ({portfolio.length})
            </button>
            <button
              onClick={() => setSelectedTypeFilter('PF')}
              className={`px-3 py-1 rounded-xl font-semibold transition-all ${
                selectedTypeFilter === 'PF'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Produtores PF ({pfCount})
            </button>
            <button
              onClick={() => setSelectedTypeFilter('PJ')}
              className={`px-3 py-1 rounded-xl font-semibold transition-all ${
                selectedTypeFilter === 'PJ'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Revendas PJ ({pjCount})
            </button>
          </div>
        </div>

        {/* Search & Rating Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar cliente atual por nome, CPF/CNPJ ou polo produtor..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs self-end sm:self-center shrink-0">
            <span className="text-slate-400 text-xs mr-1 flex items-center gap-1">
              <Filter className="h-3.5 w-3.5" />
              <span>Rating:</span>
            </span>
            {(['ALL', 'A', 'B', 'C', 'D'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRatingFilter(r)}
                className={`px-2.5 py-1 rounded-lg font-bold text-xs ${
                  selectedRatingFilter === r
                    ? 'bg-slate-800 text-white border border-slate-700'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {r === 'ALL' ? 'Todos' : r}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase font-bold">
                <th className="pb-3">Tomador Ativo</th>
                <th className="pb-3">Polo / Cultura</th>
                <th className="pb-3 text-right">Exposição Atual</th>
                <th className="pb-3 text-center">Score</th>
                <th className="pb-3 text-center">Rating</th>
                <th className="pb-3">Próximo Agendamento</th>
                <th className="pb-3 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredPortfolio.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-500">
                    Nenhum cliente atual encontrado para os filtros selecionados.
                  </td>
                </tr>
              ) : (
                filteredPortfolio.map((entity) => (
                  <tr key={entity.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5">
                      <div className="flex items-center gap-2.5">
                        {entity.type === 'PF' ? (
                          <div className="h-7 w-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                            <User className="h-4 w-4" />
                          </div>
                        ) : (
                          <div className="h-7 w-7 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0">
                            <Building2 className="h-4 w-4" />
                          </div>
                        )}
                        <div>
                          <span className="font-bold text-white block leading-tight">
                            {entity.name}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            {entity.document}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 text-slate-300">
                      <span>{entity.location}</span>
                      <span className="text-[10px] text-slate-400 block">
                        {entity.cropOrSector}
                      </span>
                    </td>

                    <td className="py-3.5 text-right font-mono font-bold text-slate-100">
                      R$ {(entity.exposureBrl / 1000).toLocaleString('pt-BR')}k
                    </td>

                    <td className="py-3.5 text-center font-mono font-bold">
                      <span
                        className={
                          entity.currentScore >= 800
                            ? 'text-emerald-400'
                            : entity.currentScore >= 600
                            ? 'text-sky-400'
                            : entity.currentScore >= 400
                            ? 'text-amber-400'
                            : 'text-rose-400'
                        }
                      >
                        {entity.currentScore}
                      </span>
                    </td>

                    <td className="py-3.5 text-center">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          entity.currentRating === 'A'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : entity.currentRating === 'B'
                            ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                            : entity.currentRating === 'C'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {entity.currentRating}
                      </span>
                    </td>

                    <td className="py-3.5 text-[11px] text-slate-400 font-mono">
                      {entity.nextScheduledCheck}
                    </td>

                    <td className="py-3.5 text-center">
                      <button
                        onClick={() => onSelectClientForDeepDive(entity.id)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-sky-500 hover:text-slate-950 text-slate-300 text-[10px] font-bold transition-all flex items-center gap-1 mx-auto active:scale-95 shadow-sm"
                        title="Ver dossiê detalhado na Due Diligence"
                      >
                        <span>Detalhes</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
