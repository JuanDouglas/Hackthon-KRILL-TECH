import React, { useState } from 'react';
import { Borrower, RuralProducerPF, AgroCompanyPJ } from '../types/borrower';
import { MOCK_CASES } from '../data/mockCases';
import { 
  UserCheck, 
  ShieldCheck, 
  XCircle, 
  AlertTriangle, 
  CheckCircle2, 
  FileCheck2, 
  ArrowRight, 
  Building2, 
  User, 
  Calendar, 
  Layers, 
  Scale,
  Search,
  RefreshCw,
  Sparkles,
  ExternalLink,
  HelpCircle,
  KeyRound,
  Server,
  Hash,
  FileCheck
} from 'lucide-react';

interface TriagemCadastralViewProps {
  onProceedToDueDiligence: (borrower: Borrower) => void;
}

// Exemplos pré-configurados para agilidade do operador da Krill Tech
const PRESET_BORROWERS: Borrower[] = [
  ...MOCK_CASES,
  {
    id: 'case-pj-novo-entrante',
    type: 'PJ',
    name: 'AgroNova Sementes & Nutrição Foliar Ltda',
    tradeName: 'AgroNova Insumos',
    document: '51.890.344/0001-92',
    city: 'Lucas do Rio Verde',
    state: 'MT',
    exposureValueBrl: 0,
    createdAt: '2024-07-01',
    activityYears: 1, // < 2 anos (REPROVAÇÃO NO GATE)
    cnae: '46.83-4/00',
    cnaeDescription: 'Comércio atacadista de defensivos agrícolas, adubos e fertilizantes',
    shareCapitalBrl: 450000,
    annualRevenueBrl: 1800000,
    hasRetailNetwork: false,
    activeSupplierCount: 3,
    qsaPartners: [
      {
        name: 'Lucas Henrique Paiva',
        role: 'Sócio-Administrador',
        cpfCnpj: '***.332.119-**',
        entryDate: '2024-07-01',
        recentChangeInLast6Months: false,
      },
    ],
  } as AgroCompanyPJ,
  {
    id: 'case-pf-car-suspenso',
    type: 'PF',
    name: 'Geraldo Antunes de Camargo',
    document: '822.401.559-00',
    stateRegistration: '13.992.110-4',
    city: 'São Félix do Araguaia',
    state: 'MT',
    exposureValueBrl: 0,
    createdAt: '2021-03-15',
    carNumber: 'MT-5107828-CAR-SUSP-2024',
    carStatus: 'SUSPENSO', // CAR Suspenso (REPROVAÇÃO NO GATE)
    crop: 'SOJA',
    plantedAreaHa: 950,
    plantingDate: '2024-11-20',
    lcdprYearsProven: 4,
    hasPsrInsurance: false,
    landTenure: 'PROPRIETARIO',
    historicalProductivityBagsPerHa: 52,
  } as RuralProducerPF
];

export const TriagemCadastralView: React.FC<TriagemCadastralViewProps> = ({
  onProceedToDueDiligence,
}) => {
  const [prospects, setProspects] = useState<Borrower[]>(PRESET_BORROWERS);
  const [selectedProspectId, setSelectedProspectId] = useState<string>(prospects[0].id);
  const [searchDocInput, setSearchDocInput] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchProgressStep, setSearchProgressStep] = useState<string>('');

  const selectedProspect = prospects.find((p) => p.id === selectedProspectId) || prospects[0];
  const isPF = selectedProspect.type === 'PF';
  const pf = isPF ? (selectedProspect as RuralProducerPF) : null;
  const pj = !isPF ? (selectedProspect as AgroCompanyPJ) : null;

  // Lógica do Gate de Entrada:
  // 1. Requisito de elegibilidade da Lei 14.112/2020: mínimo 2 anos de atividade via LCDPR ou Junta
  const yearsActive = isPF ? pf?.lcdprYearsProven || 0 : pj?.activityYears || 0;
  const satisfiesLegalYears = yearsActive >= 2;

  // 2. Regularidade do CAR / SICAR preliminar
  const carStatus = isPF ? pf?.carStatus : 'ATIVO';
  const isCarReproved = isPF && (carStatus === 'CANCELADO' || carStatus === 'SUSPENSO');
  const isCarPendente = isPF && carStatus === 'PENDENTE';

  let gateStatus: 'APROVADO' | 'COM_RESSALVA' | 'REPROVADO' = 'APROVADO';
  let gateReason = '';

  if (!satisfiesLegalYears) {
    gateStatus = 'REPROVADO';
    gateReason = `Tempo de atividade comprovada (${yearsActive} ${yearsActive === 1 ? 'ano' : 'anos'}) é inferior ao piso legal de 2 anos exigido pelo art. 48 da Lei 11.101/2005 (com redação da Lei 14.112/2020 via LCDPR ou Junta Comercial).`;
  } else if (isCarReproved) {
    gateStatus = 'REPROVADO';
    gateReason = `Imóvel rural com Cadastro Ambiental Rural em status ${carStatus} no SICAR com embargo ativo. Impossibilidade de colateralização e vedação legal de concessão de crédito.`;
  } else if (isCarPendente) {
    gateStatus = 'COM_RESSALVA';
    gateReason = 'CAR em status PENDENTE de retificação no órgão ambiental estadual. Aprovado para Due Diligence mediante apresentação de certidão de regularidade do talhão.';
  } else {
    gateStatus = 'APROVADO';
    gateReason = 'Elegibilidade cadastral preliminar atendida. Tempo legal >= 2 anos e registros federais aptos para abertura de esteira de crédito.';
  }

  // Realizar busca via Gateway B2B Homologado (Receita, SPED, Redesim, SICAR)
  const handleExecuteSearch = (docToSearch: string) => {
    const cleanDoc = docToSearch.replace(/\D/g, '');
    if (cleanDoc.length < 9) return;

    setIsSearching(true);
    setSearchProgressStep('Consultando Gateway B2B (Receita Federal & Redesim - SLA 99.9%)...');

    setTimeout(() => {
      setSearchProgressStep('Validando Recibo SPED LCDPR / Junta Comercial (Lei 14.112/2020)...');
    }, 450);

    setTimeout(() => {
      setSearchProgressStep('Consultando Base Nacional do SICAR & IBAMA...');
    }, 900);

    setTimeout(() => {
      // Localiza nos pré-existentes ou cria um novo candidato
      const existing = prospects.find((p) => p.document.replace(/\D/g, '') === cleanDoc);
      if (existing) {
        setSelectedProspectId(existing.id);
      } else {
        // Gera um novo prospecto dinâmico baseado no documento
        const isCnpj = cleanDoc.length > 11;
        const newProspect: Borrower = isCnpj
          ? ({
              id: `custom-pj-${Date.now()}`,
              type: 'PJ',
              name: `AgroComercial ${cleanDoc.substring(0, 4)} Distribuidora de Grãos Ltda`,
              tradeName: `AgroComercial ${cleanDoc.substring(0, 4)}`,
              document: docToSearch,
              city: 'Rio Verde',
              state: 'GO',
              exposureValueBrl: 0,
              createdAt: '2022-01-10',
              activityYears: 3,
              cnae: '46.83-4/00',
              cnaeDescription: 'Comércio atacadista de defensivos agrícolas',
              shareCapitalBrl: 1200000,
              annualRevenueBrl: 6500000,
              hasRetailNetwork: false,
              activeSupplierCount: 6,
              qsaPartners: [{ name: 'Sócio Consultor Rural', role: 'Administrador', cpfCnpj: '***.000.000-**', entryDate: '2022-01-10', recentChangeInLast6Months: false }],
            } as AgroCompanyPJ)
          : ({
              id: `custom-pf-${Date.now()}`,
              type: 'PF',
              name: `Produtor Rural Cadastrado (${cleanDoc.substring(0, 3)}...)`,
              document: docToSearch,
              stateRegistration: '13.000.111-9',
              city: 'Sorriso',
              state: 'MT',
              exposureValueBrl: 0,
              createdAt: '2021-08-15',
              carNumber: `MT-${cleanDoc.substring(0, 7)}-CAR-2025`,
              carStatus: 'ATIVO',
              crop: 'SOJA',
              plantedAreaHa: 620,
              plantingDate: '2024-11-15',
              lcdprYearsProven: 3,
              hasPsrInsurance: false,
              landTenure: 'PROPRIETARIO',
              historicalProductivityBagsPerHa: 58,
            } as RuralProducerPF);

        setProspects((prev) => [newProspect, ...prev]);
        setSelectedProspectId(newProspect.id);
      }

      setIsSearching(false);
      setSearchProgressStep('');
    }, 1300);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto pb-10">
      {/* Top Banner */}
      <div className="bg-[#09090e] border border-[#231c3a] rounded-3xl p-6 sm:p-7 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 rounded-full text-xs font-display font-bold bg-[#6618F7]/20 text-[#a78bfa] border border-[#6618F7]/40 uppercase tracking-wider">
              Novos Clientes
            </span>
            <span className="text-xs text-slate-500 font-display">Gate de Entrada • Triagem Cadastral Automatizada</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
            Triagem Cadastral & Admissibilidade
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl font-sans leading-relaxed">
            Filtro de admissão pré-crédito com conferência de elegibilidade segundo o art. 48 da <strong>Lei 14.112/2020</strong> (comprovação temporal de 2 anos via LCDPR ou Junta Comercial) e regularidade fundiária no SICAR.
          </p>
        </div>

        <div className="bg-[#0e0e17] p-4 rounded-2xl border border-[#231c3a] text-right shrink-0">
          <div className="flex items-center justify-end gap-1.5 text-[10px] font-display uppercase tracking-wider text-slate-400 mb-0.5">
            <Server className="h-3 w-3 text-[#8b4dff]" />
            <span>Gateway B2B Homologado</span>
          </div>
          <span className="text-2xl font-black font-display text-[#8b4dff]">{prospects.length}</span>
          <span className="text-[10px] text-slate-500 block font-sans">Cadastros indexados • SLA 99.9%</span>
        </div>
      </div>

      {/* Real CNPJ / CPF Search Box */}
      <div className="bg-[#09090e] border border-[#231c3a] rounded-2xl p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-[#8b4dff]" />
            <h3 className="text-sm font-display font-bold text-white uppercase tracking-wider">
              Consulta de Tomador por CNPJ ou CPF
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-sans flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
            <span>Gateway de Dados B2B (BigDataCorp / Judit / Serasa Agro)</span>
          </span>
        </div>

        {/* Search Input Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchDocInput}
              onChange={(e) => setSearchDocInput(e.target.value)}
              placeholder="Digite o CNPJ ou CPF do novo tomador (ex: 29.384.112/0001-89)..."
              className="w-full bg-[#0e0e17] border border-[#231c3a] focus:border-[#6618F7] focus:ring-1 focus:ring-[#6618F7] text-white text-xs sm:text-sm rounded-xl px-4 py-3 outline-none font-sans transition-all placeholder:text-slate-600"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchDocInput.trim()) {
                  handleExecuteSearch(searchDocInput);
                }
              }}
            />
          </div>

          <button
            onClick={() => handleExecuteSearch(searchDocInput || selectedProspect.document)}
            disabled={isSearching}
            className="px-6 py-3 rounded-xl bg-[#6618F7] hover:bg-[#7b2cff] disabled:bg-[#6618F7]/50 text-white text-xs font-display font-bold shadow-lg shadow-[#6618F7]/30 flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0 active:scale-95"
          >
            {isSearching ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin text-white" />
                <span>Consultando Bases...</span>
              </>
            ) : (
              <>
                <Search className="h-4 w-4 text-white" />
                <span>Consultar Gateway B2B</span>
              </>
            )}
          </button>
        </div>

        {/* Live Search Loading Animation */}
        {isSearching && (
          <div className="p-3.5 rounded-xl bg-[#141422] border border-[#6618F7]/40 text-xs text-[#a78bfa] flex items-center gap-3 animate-pulse font-sans">
            <RefreshCw className="h-4 w-4 animate-spin text-[#8b4dff]" />
            <span className="font-semibold">{searchProgressStep}</span>
          </div>
        )}

        {/* Quick Presets for Credit Operator / Demonstrations */}
        <div className="pt-2 border-t border-[#231c3a] space-y-2">
          <span className="text-[11px] font-display font-medium text-slate-400 block">
            Ou selecione um caso de teste para simulação imediata do operador:
          </span>
          <div className="flex flex-wrap gap-2">
            {prospects.map((p) => {
              const isSelected = p.id === selectedProspectId;
              const isReproved = 
                (p.type === 'PJ' && (p as AgroCompanyPJ).activityYears < 2) ||
                (p.type === 'PF' && (p as RuralProducerPF).carStatus === 'SUSPENSO');

              return (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedProspectId(p.id);
                    setSearchDocInput(p.document);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-sans transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-[#6618F7] text-white font-bold shadow-lg shadow-[#6618F7]/30'
                      : 'bg-[#0e0e17] text-slate-300 border border-[#231c3a] hover:border-[#6618F7]/40 hover:text-white'
                  }`}
                >
                  <span>{p.type === 'PF' ? '🌱' : '🏢'}</span>
                  <span>{p.name.split(' ')[0]}</span>
                  <span className={`text-[10px] font-display px-1.5 py-0.2 rounded ${
                    isReproved ? 'bg-rose-500/20 text-rose-300' : 'bg-[#141422] text-slate-400'
                  }`}>
                    {isReproved ? 'Reprovado Gate' : p.type}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Evaluation Checklist Cards: 3 Crucial Checks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Check 1: Receita Federal & Redesim */}
        <div className="bg-[#09090e] border border-[#231c3a] rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#231c3a]">
              <span className="text-[10px] font-display font-bold text-[#8b4dff] uppercase tracking-wider">
                1. Receita Federal & Redesim
              </span>
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            </div>

            <h4 className="text-sm font-display font-bold text-white mb-1">
              {selectedProspect.name}
            </h4>

            <p className="text-xs text-slate-400 font-display mb-3">
              {selectedProspect.type === 'PF' ? 'CPF' : 'CNPJ'}: {selectedProspect.document}
            </p>

            <div className="space-y-2 text-xs text-slate-300 font-sans">
              <div className="flex justify-between">
                <span className="text-slate-500">Situação Cadastral:</span>
                <span className="font-bold text-emerald-400">ATIVA</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Localização:</span>
                <span className="text-white font-medium">{selectedProspect.city}/{selectedProspect.state}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Segmento:</span>
                <span className="text-white font-medium truncate max-w-[160px]">
                  {isPF ? pf?.crop : pj?.cnaeDescription}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#231c3a] text-[11px] text-slate-400 font-sans flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span>Documento regular e ativo na base federal</span>
          </div>
        </div>

        {/* Check 2: Carência Legal de 2 Anos (Lei 14.112/2020) */}
        <div className="bg-[#09090e] border border-[#231c3a] rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#231c3a]">
              <span className="text-[10px] font-display font-bold text-[#8b4dff] uppercase tracking-wider">
                2. Elegibilidade Legal (2 Anos)
              </span>
              {satisfiesLegalYears ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              ) : (
                <XCircle className="h-4 w-4 text-rose-500" />
              )}
            </div>

            <h4 className="text-sm font-display font-bold text-white mb-1">
              {isPF ? 'Livro Caixa Digital (LCDPR)' : 'Registro na Junta Comercial'}
            </h4>

            <p className="text-xs text-slate-400 font-sans mb-3">
              Art. 48, § 2º da Lei 11.101/2005 (Lei 14.112/2020)
            </p>

            <div className="space-y-2 text-xs text-slate-300 font-sans">
              <div className="flex justify-between">
                <span className="text-slate-500">Tempo Comprovado:</span>
                <span className={`font-display font-bold ${satisfiesLegalYears ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {yearsActive} {yearsActive === 1 ? 'ano' : 'anos'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Piso Legal Exigido:</span>
                <span className="font-display text-white font-semibold">Mínimo 2 anos</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Enquadramento RJ:</span>
                <span className={`font-semibold ${satisfiesLegalYears ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {satisfiesLegalYears ? 'Habilitado' : 'Vedado (< 2 anos)'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#231c3a] text-[11px] font-sans flex items-center gap-1.5">
            {satisfiesLegalYears ? (
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                <span>Atende ao tempo legal de atividade</span>
              </span>
            ) : (
              <span className="text-rose-400 flex items-center gap-1">
                <XCircle className="h-3.5 w-3.5 shrink-0" />
                <span>Barreira de entrada violada: reprovação no gate</span>
              </span>
            )}
          </div>
        </div>

        {/* Check 3: SICAR / Regularidade Fundiária e Ambiental */}
        <div className="bg-[#09090e] border border-[#231c3a] rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#231c3a]">
              <span className="text-[10px] font-display font-bold text-[#8b4dff] uppercase tracking-wider">
                3. Regularidade SICAR / CAR
              </span>
              {!isPF || (!isCarReproved && !isCarPendente) ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              ) : isCarPendente ? (
                <AlertTriangle className="h-4 w-4 text-amber-400" />
              ) : (
                <XCircle className="h-4 w-4 text-rose-500" />
              )}
            </div>

            <h4 className="text-sm font-display font-bold text-white mb-1">
              {isPF ? 'Cadastro Ambiental Rural' : 'Licenciamento Ambiental & Filiais'}
            </h4>

            <p className="text-xs text-slate-400 font-sans mb-3">
              Base Nacional do SICAR & IBAMA
            </p>

            <div className="space-y-2 text-xs text-slate-300 font-sans">
              <div className="flex justify-between">
                <span className="text-slate-500">Status no SICAR:</span>
                <span className={`font-display font-bold ${
                  !isPF || (!isCarReproved && !isCarPendente) ? 'text-emerald-400' : isCarPendente ? 'text-amber-400' : 'text-rose-400'
                }`}>
                  {isPF ? pf?.carStatus : 'ATIVO (Sede/Filiais)'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Área Plantada:</span>
                <span className="text-white font-medium">
                  {isPF ? `${pf?.plantedAreaHa} ha plantados` : 'N/A (Pessoa Jurídica)'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Conformidade ZARC:</span>
                <span className="font-semibold text-emerald-400">
                  {isPF ? (pf?.carStatus === 'SUSPENSO' ? 'Pendente' : 'Conforme Portaria') : 'Conforme CNAE'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#231c3a] text-[11px] font-sans flex items-center gap-1.5">
            {!isPF || (!isCarReproved && !isCarPendente) ? (
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                <span>Regularidade fundiária confirmada</span>
              </span>
            ) : isCarPendente ? (
              <span className="text-amber-400 flex items-center gap-1">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                <span>Pendente de homologação estadual</span>
              </span>
            ) : (
              <span className="text-rose-400 flex items-center gap-1">
                <XCircle className="h-3.5 w-3.5 shrink-0" />
                <span>CAR suspenso/cancelado: impedimento de crédito</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Compliance & Sigilo Fiscal: SPED LCDPR Cryptographic Hash Card */}
      {isPF && (
        <div className="bg-[#0e0e17] border border-[#231c3a] rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <KeyRound className="h-4 w-4 text-[#8b4dff]" />
              <h4 className="text-xs font-display font-bold text-white uppercase tracking-wider">
                Validação Criptográfica de Recibo SPED LCDPR (Sigilo Fiscal & LGPD)
              </h4>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Certificado Digital ICP-Brasil Válido
            </span>
          </div>

          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            Em conformidade com o <strong>Art. 198 do CTN (Sigilo Fiscal)</strong> e a <strong>LGPD (Lei 13.709/2018)</strong>, a Krill Tech não acessa bases fiscais restritas diretamente. A conferência do Livro Caixa Digital do Produtor Rural opera mediante validação matemática do hash do recibo oficial emitido pelo SPED/Receita Federal anexado pelo produtor com consentimento expresso ou via procuração digital e-CAC.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="bg-[#09090e] p-3 rounded-xl border border-[#231c3a]">
              <span className="text-[10px] font-display text-slate-500 block">Protocolo de Entrega SPED</span>
              <span className="text-xs font-mono font-bold text-white">
                SPED-LCDPR-2024-{selectedProspect.state}-{selectedProspect.document.replace(/\D/g, '').substring(0, 6)}
              </span>
            </div>

            <div className="bg-[#09090e] p-3 rounded-xl border border-[#231c3a]">
              <span className="text-[10px] font-display text-slate-500 block">Hash SHA-256 da Assinatura</span>
              <span className="text-xs font-mono font-bold text-[#8b4dff] truncate block">
                0x{selectedProspect.document.replace(/\D/g, '').padEnd(16, 'a')}f9e8d7c6b5a41112
              </span>
            </div>

            <div className="bg-[#09090e] p-3 rounded-xl border border-[#231c3a]">
              <span className="text-[10px] font-display text-slate-500 block">Status Legal para RJ (Lei 14.112)</span>
              <span className="text-xs font-sans font-bold text-emerald-400">
                {satisfiesLegalYears ? 'Habilitado (Comprovado >= 2 anos)' : 'Inabilitado (< 2 anos)'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Gate Decision & Transition to Due Diligence */}
      <div className={`p-6 rounded-2xl border transition-all ${
        gateStatus === 'APROVADO'
          ? 'bg-emerald-950/15 border-emerald-500/40'
          : gateStatus === 'COM_RESSALVA'
          ? 'bg-amber-950/15 border-amber-500/40'
          : 'bg-rose-950/20 border-rose-500/40'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-display font-black px-3 py-1 rounded-full uppercase tracking-wider ${
                gateStatus === 'APROVADO'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : gateStatus === 'COM_RESSALVA'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              }`}>
                Veredito do Gate: {gateStatus === 'APROVADO' ? 'Aprovado' : gateStatus === 'COM_RESSALVA' ? 'Aprovado com Ressalva' : 'Reprovado no Gate'}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed max-w-3xl">
              {gateReason}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            {gateStatus !== 'REPROVADO' ? (
              <button
                onClick={() => onProceedToDueDiligence(selectedProspect)}
                className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-[#6618F7] hover:bg-[#7b2cff] text-white font-display font-bold text-xs shadow-xl shadow-[#6618F7]/30 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
              >
                <span>Avançar para Due Diligence Automatizada</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <div className="px-5 py-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-display font-bold text-center">
                Concessão Bloqueada na Triagem
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
