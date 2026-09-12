import React, { useState } from 'react';
import { Borrower, RuralProducerPF, AgroCompanyPJ } from '../types/borrower';
import { MOCK_CASES } from '../data/mockCases';
import { TooltipHelp, AGRO_TERMS_GLOSSARY } from './TooltipHelp';
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
  Sparkles
} from 'lucide-react';

interface TriagemCadastralViewProps {
  onProceedToDueDiligence: (borrower: Borrower) => void;
}

export const TriagemCadastralView: React.FC<TriagemCadastralViewProps> = ({
  onProceedToDueDiligence,
}) => {
  // Lista de novos prospectos simulados para a triagem inicial
  const [prospects, setProspects] = useState<Borrower[]>(MOCK_CASES);
  const [selectedProspectId, setSelectedProspectId] = useState<string>(prospects[0].id);

  const selectedProspect = prospects.find((p) => p.id === selectedProspectId) || prospects[0];
  const isPF = selectedProspect.type === 'PF';
  const pf = isPF ? (selectedProspect as RuralProducerPF) : null;
  const pj = !isPF ? (selectedProspect as AgroCompanyPJ) : null;

  // Lógica do Gate de Entrada (Triagem Cadastral):
  // 1. Requisito de elegibilidade da Lei 14.112/2020: mínimo 2 anos de atividade
  const yearsActive = isPF ? pf?.lcdprYearsProven || 0 : pj?.activityYears || 0;
  const satisfiesLegalYears = yearsActive >= 2;

  // 2. Regularidade do CAR / SICAR preliminar
  const carOk = isPF ? pf?.carStatus === 'ATIVO' : true;
  const carPendente = isPF ? pf?.carStatus === 'PENDENTE' : false;

  // 3. Status da Receita Federal
  const docValid = selectedProspect.document.length > 8;

  let gateStatus: 'APROVADO' | 'COM_RESSALVA' | 'REPROVADO' = 'APROVADO';
  let gateReason = '';

  if (!satisfiesLegalYears) {
    gateStatus = 'REPROVADO';
    gateReason = 'Atividade rural comprovada inferior a 2 anos (inobservância do art. 48 da Lei 11.101/2005 c/c Lei 14.112/2020).';
  } else if (carPendente) {
    gateStatus = 'COM_RESSALVA';
    gateReason = 'CAR em status PENDENTE no SICAR (necessita de validação estadual de sobreposição de Reserva Legal antes da concessão).';
  } else {
    gateStatus = 'APROVADO';
    gateReason = 'Elegibilidade cadastral inicial comprovada. Apto para processamento completo na Due Diligence Automatizada.';
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/30 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
              Gate de Entrada • Novos Clientes
            </span>
            <span className="text-xs text-slate-400 font-mono">Fase 1 do Edital 01/2026</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Triagem Cadastral Automatizada
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Filtro preventivo primário para novos tomadores antes da alocação de esforço analítico de crédito. Valida a conformidade normativa da <strong>Lei 14.112/2020</strong> (mínimo de 2 anos de atividade via LCDPR ou regularidade societária) e o status fundiário no SICAR.
          </p>
        </div>

        <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 text-right shrink-0">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 block mb-0.5">
            Custo desta Etapa
          </span>
          <span className="text-lg font-black font-mono text-emerald-400">R$ 0,00</span>
          <span className="text-[10px] text-slate-500 block">100% Fontes Públicas</span>
        </div>
      </div>

      {/* Prospect Selector */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white">
              Selecione o Prospecto em Análise de Triagem
            </h3>
            <p className="text-xs text-slate-400">
              Alternância entre candidatos a novo cliente para testar a aprovação ou reprovação no gate
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {prospects.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedProspectId(p.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                  p.id === selectedProspectId
                    ? p.type === 'PF'
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                      : 'bg-teal-500 text-slate-950 font-bold shadow-md shadow-teal-500/20'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                <span>{p.type === 'PF' ? '🌱' : '🏢'}</span>
                <span>{p.name.split(' ')[0]}</span>
                <span className="text-[10px] opacity-75 font-mono">({p.type})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Evaluation Checklist Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5">
          {/* Check 1: Receita Federal & Identidade */}
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Receita Federal / Redesim</span>
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              </div>
              <h4 className="text-xs font-bold text-white mb-1">
                {selectedProspect.name}
              </h4>
              <p className="text-[11px] text-slate-400 font-mono mb-2">
                {selectedProspect.type === 'PF' ? 'CPF' : 'CNPJ'}: {selectedProspect.document}
              </p>
              <div className="space-y-1 text-[11px] text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Situação Cadastral:</span>
                  <span className="font-bold text-emerald-400">ATIVA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Localização:</span>
                  <span className="text-white">{selectedProspect.city}/{selectedProspect.state}</span>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-800/80 text-[10px] text-slate-400">
              ✓ Documentação cadastral em situação regular.
            </div>
          </div>

          {/* Check 2: Carência Legal de 2 Anos (Lei 14.112/2020) */}
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Elegibilidade Legal (2 Anos)</span>
                {satisfiesLegalYears ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                ) : (
                  <XCircle className="h-4 w-4 text-rose-400" />
                )}
              </div>
              <h4 className="text-xs font-bold text-white mb-1">
                {isPF ? 'Comprovação via LCDPR (Art. 48)' : 'Tempo de Atividade da Empresa'}
              </h4>
              <p className="text-[11px] text-slate-400 mb-2">
                Exigência mínima de 2 anos estipulada pela Lei 11.101 alterada pela Lei 14.112.
              </p>
              <div className="space-y-1 text-[11px] text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Tempo Comprovado:</span>
                  <span className={`font-mono font-bold ${satisfiesLegalYears ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {yearsActive} anos ({isPF ? 'Livro Caixa Digital' : 'Junta Comercial'})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Barreira de Entrada:</span>
                  <span className="text-slate-200">{satisfiesLegalYears ? 'Superada' : 'Não Atendida'}</span>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-800/80 text-[10px] text-slate-400">
              {satisfiesLegalYears
                ? '✓ Cumpre o requisito legal de estabilidade mínima.'
                : '❌ Reprovado: Menos de 2 anos de atividade.'}
            </div>
          </div>

          {/* Check 3: Territorial & Ambiental Preliminar */}
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase">SICAR / Cadastro Ambiental</span>
                {carOk ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                ) : carPendente ? (
                  <AlertTriangle className="h-4 w-4 text-amber-400" />
                ) : (
                  <XCircle className="h-4 w-4 text-rose-400" />
                )}
              </div>
              <h4 className="text-xs font-bold text-white mb-1">
                {isPF ? 'Regularidade do CAR' : 'Licença Ambiental / Armazenagem'}
              </h4>
              <p className="text-[11px] text-slate-400 mb-2">
                Impedimento automático para concessão de crédito rural caso cancelado/suspenso.
              </p>
              <div className="space-y-1 text-[11px] text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Status SICAR:</span>
                  <span
                    className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                      carOk
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : carPendente
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-rose-500/20 text-rose-400'
                    }`}
                  >
                    {isPF ? pf?.carStatus : 'LICENCIADO'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Restrição Impeditiva:</span>
                  <span className="text-slate-200">{carPendente ? 'Ressalva Formal' : 'Nenhuma'}</span>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-800/80 text-[10px] text-slate-400">
              {carOk
                ? '✓ Sem impedimentos fundiários prévios.'
                : '⚠️ Requer regularização prévia junto ao órgão estadual.'}
            </div>
          </div>
        </div>

        {/* Gate Decision & Transition Box */}
        <div className={`mt-5 p-4 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
          gateStatus === 'APROVADO'
            ? 'bg-emerald-950/20 border-emerald-500/30'
            : gateStatus === 'COM_RESSALVA'
            ? 'bg-amber-950/20 border-amber-500/30'
            : 'bg-rose-950/20 border-rose-500/30'
        }`}>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-black px-2.5 py-0.5 rounded-full uppercase ${
                gateStatus === 'APROVADO'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : gateStatus === 'COM_RESSALVA'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              }`}>
                {gateStatus === 'APROVADO' ? 'GATE APROVADO' : gateStatus === 'COM_RESSALVA' ? 'GATE APROVADO COM RESSALVA' : 'REPROVADO NO GATE'}
              </span>
              <span className="text-xs font-bold text-white">
                Veredito da Triagem Cadastral
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
              {gateReason}
            </p>
          </div>

          <button
            onClick={() => onProceedToDueDiligence(selectedProspect)}
            className="px-4 py-2.5 rounded-xl text-xs font-extrabold bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 hover:brightness-110 shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all active:scale-95 shrink-0"
          >
            <span>Avançar para Due Diligence Automatizada</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
