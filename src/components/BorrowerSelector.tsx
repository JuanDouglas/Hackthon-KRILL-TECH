import React from 'react';
import { Borrower, RuralProducerPF, AgroCompanyPJ } from '../types/borrower';
import { MOCK_CASES } from '../data/mockCases';
import { TooltipHelp, AGRO_TERMS_GLOSSARY } from './TooltipHelp';
import { 
  User, 
  Building2, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Sprout, 
  Store, 
  ShieldCheck, 
  AlertCircle,
  FileSpreadsheet
} from 'lucide-react';

interface BorrowerSelectorProps {
  selectedBorrower: Borrower;
  onSelectBorrower: (borrower: Borrower) => void;
  isRunningPipeline: boolean;
}

export const BorrowerSelector: React.FC<BorrowerSelectorProps> = ({
  selectedBorrower,
  onSelectBorrower,
  isRunningPipeline,
}) => {
  const isPF = selectedBorrower.type === 'PF';
  const pf = isPF ? (selectedBorrower as RuralProducerPF) : null;
  const pj = !isPF ? (selectedBorrower as AgroCompanyPJ) : null;

  return (
    <div className="rounded-2xl p-5 shadow-2xl border transition-all bg-[#09090e] border-[#231c3a]">
      {/* Selector Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#231c3a]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-display uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-[#6618F7]/20 text-[#a78bfa] border border-[#6618F7]/40">
              {isPF ? 'Pessoa Física • Produtor Rural' : 'Pessoa Jurídica • Revenda de Insumos'}
            </span>
            <span className="text-slate-500 font-sans text-xs">• Caso Selecionado</span>
          </div>

          <h2 className="text-xl font-display font-black text-white flex items-center gap-2.5 mt-1">
            <div className="h-7 w-7 rounded-lg bg-[#6618F7]/20 text-[#8b4dff] flex items-center justify-center border border-[#6618F7]/30">
              {isPF ? <Sprout className="h-4 w-4" /> : <Store className="h-4 w-4" />}
            </div>
            <span>{selectedBorrower.name}</span>
          </h2>
        </div>

        {/* Quick Selection Presets */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-display text-slate-400 mr-1 hidden sm:inline">Casos de Teste:</span>
          {MOCK_CASES.map((item) => {
            const isSelected = item.id === selectedBorrower.id;
            return (
              <button
                key={item.id}
                disabled={isRunningPipeline}
                onClick={() => onSelectBorrower(item)}
                className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#6618F7] text-white font-bold shadow-lg shadow-[#6618F7]/30'
                    : 'bg-[#0e0e17] text-slate-400 border border-[#231c3a] hover:border-[#6618F7]/40 hover:text-white'
                } ${isRunningPipeline ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}`}
              >
                <span>{item.type === 'PF' ? '🌱' : '🏢'}</span>
                <span>{item.name.split(' ')[0]}</span>
                <span className="text-[10px] opacity-75 font-display">({item.city})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Structured Details Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 text-xs">
        <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
          <span className="text-slate-400 block mb-0.5 text-[11px]">Documento</span>
          <span className="font-mono font-bold text-white text-xs">{selectedBorrower.document}</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">
            {isPF ? 'CPF / Inscrição Estadual' : 'CNPJ Ativo (Receita)'}
          </span>
        </div>

        <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
          <span className="text-slate-400 block mb-0.5 text-[11px] flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-slate-400" />
            <span>Polo Agrícola</span>
          </span>
          <span className="font-bold text-white text-xs">{selectedBorrower.city} - {selectedBorrower.state}</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Região Produtora</span>
        </div>

        <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
          <span className="text-slate-400 block mb-0.5 text-[11px] flex items-center gap-1">
            <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
            <span>Exposição em Risco</span>
          </span>
          <span className="font-mono font-black text-emerald-400 text-xs">
            R$ {selectedBorrower.exposureValueBrl.toLocaleString('pt-BR')}
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Fornecimento Krill Tech</span>
        </div>

        {isPF && pf ? (
          <>
            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
              <span className="text-slate-400 block mb-0.5 text-[11px]">Cultura / Área</span>
              <span className="font-bold text-amber-300 text-xs">{pf.crop}</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                {pf.plantedAreaHa.toLocaleString('pt-BR')} ha ({pf.landTenure})
              </span>
            </div>

            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
              <span className="text-slate-400 block mb-0.5 text-[11px] flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                <span>Plantio & LCDPR</span>
              </span>
              <span className="font-mono font-bold text-white text-xs">{pf.plantingDate}</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                <TooltipHelp
                  term={AGRO_TERMS_GLOSSARY.LCDPR.term}
                  definition={AGRO_TERMS_GLOSSARY.LCDPR.definition}
                  sourceBadge="Lei 14.112"
                >
                  {pf.lcdprYearsProven} anos de LCDPR
                </TooltipHelp>
              </span>
            </div>

            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
              <span className="text-slate-400 block mb-0.5 text-[11px]">Cadastro CAR</span>
              <span
                className={`font-bold text-[11px] px-2 py-0.5 rounded-full inline-block ${
                  pf.carStatus === 'ATIVO'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}
              >
                {pf.carStatus}
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5 truncate" title={pf.carNumber}>
                SICAR: {pf.carNumber.slice(0, 10)}...
              </span>
            </div>
          </>
        ) : pj ? (
          <>
            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
              <span className="text-slate-400 block mb-0.5 text-[11px]">CNAE Principal</span>
              <span className="font-mono font-bold text-teal-400 text-xs">{pj.cnae}</span>
              <span className="text-[10px] text-slate-400 block mt-0.5 truncate" title={pj.cnaeDescription}>
                Revenda Defensivos
              </span>
            </div>

            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
              <span className="text-slate-400 block mb-0.5 text-[11px]">Tempo Regular</span>
              <span className="font-bold text-white text-xs">{pj.activityYears} anos</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                Cap. R$ {(pj.shareCapitalBrl / 1000000).toFixed(1)}M
              </span>
            </div>

            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80">
              <span className="text-slate-400 block mb-0.5 text-[11px]">Modelo de Negócio</span>
              <span className="font-bold text-amber-300 text-xs">
                {pj.hasRetailNetwork ? 'Rede de Lojas' : 'Loja Única'}
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                {pj.activeSupplierCount} fornecedores
              </span>
            </div>
          </>
        ) : null}
      </div>

      {/* Legal distinction contextual banner */}
      <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5">
          <FileSpreadsheet className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>
            {isPF ? (
              <>
                <strong>Regra Jurídica PF:</strong> Elegibilidade para RJ simplificada pela{' '}
                <TooltipHelp
                  term={AGRO_TERMS_GLOSSARY.LCDPR.term}
                  definition={AGRO_TERMS_GLOSSARY.LCDPR.definition}
                  sourceBadge="Art. 48"
                >
                  Lei 14.112/2020
                </TooltipHelp>{' '}
                (apenas 2 anos de LCDPR comprovados).
              </>
            ) : (
              <>
                <strong>Regra Jurídica PJ:</strong> Elegibilidade societária geral. Foco na estabilidade do QSA e efeito cascata de rede de revendas (análogo AgroGalaxy / TerraMagna).
              </>
            )}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <TooltipHelp
            term={AGRO_TERMS_GLOSSARY.PSR.term}
            definition={AGRO_TERMS_GLOSSARY.PSR.definition}
            sourceBadge="2,3% em 2025"
          >
            <span className="text-amber-400 font-medium">⚠️ Contexto PSR 2025 (2,3%)</span>
          </TooltipHelp>
        </div>
      </div>
    </div>
  );
};
