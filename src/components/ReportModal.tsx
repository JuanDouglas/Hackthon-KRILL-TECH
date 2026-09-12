import React, { useState } from 'react';
import { SynthesizedReport } from '../services/agentSintetizador';
import { 
  X, 
  Copy, 
  Check, 
  Printer, 
  Sparkles, 
  FileText, 
  Download, 
  ShieldCheck, 
  Scale, 
  CloudSun,
  TrendingUp,
  Cpu,
  Server,
  Lock,
  AlertOctagon
} from 'lucide-react';

interface ReportModalProps {
  report: SynthesizedReport | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  report,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !report) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(report.fullMarkdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0D0C0A]/90 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#151310] border border-[#2E2A22] w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#2E2A22] flex items-center justify-between bg-[#100E0B]">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-[#4A6FE0]/20 border border-[#4A6FE0]/40 flex items-center justify-center text-[#E0A94E]">
              <Sparkles className="h-4 w-4 text-[#E0A94E]" />
            </div>
            <div>
              <h3 className="text-sm font-display font-black text-white flex items-center gap-2">
                <span>Dossiê Padronizado de Risco & Alerta Precoce</span>
                <span className="text-[10px] font-display px-2 py-0.5 rounded-full bg-[#4A6FE0]/20 text-[#E0A94E] border border-[#4A6FE0]/40">
                  watsonx.ai Engine
                </span>
              </h3>
              <p className="text-[11px] text-stone-400 font-display">
                {report.dossierId} • Emitido em {report.generatedAt}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-xl text-xs font-display font-medium bg-[#1C1915] hover:bg-[#242019] text-stone-200 border border-[#2E2A22] flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-[#E0A94E]" />}
              <span>{copied ? 'Copiado!' : 'Copiar Dossiê'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl text-xs font-display font-medium bg-[#1C1915] hover:bg-[#242019] text-stone-200 border border-[#2E2A22] flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Printer className="h-3.5 w-3.5 text-[#E0A94E]" />
              <span>Imprimir</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-stone-400 hover:text-white hover:bg-[#1C1915] border border-transparent hover:border-[#2E2A22] transition-all cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Standardized Dossier */}
        <div className="p-6 overflow-y-auto space-y-6 text-stone-200 text-xs leading-relaxed font-sans">
          {/* Top Banner Card */}
          <div className="bg-[#1C1915] p-5 rounded-2xl border border-[#2E2A22] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
            <div>
              <span className="text-[10px] font-display font-bold text-[#E0A94E] uppercase tracking-wider">
                Tomador Analisado
              </span>
              <h4 className="text-base font-display font-bold text-white mt-0.5">{report.borrowerName}</h4>
              <p className="text-stone-400 text-xs font-display">
                {report.borrowerTypeLabel} • Doc: {report.borrowerDocument}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-[10px] font-display text-stone-400 uppercase block">Score Consolidado</span>
                <span className="text-2xl font-black font-display text-[#E0A94E]">
                  {report.overallScore} <span className="text-xs text-stone-500 font-normal">/ 1000</span>
                </span>
              </div>
              <div className="h-12 w-14 rounded-2xl bg-[#242019] border border-[#4A6FE0]/50 flex items-center justify-center font-black font-display text-xl text-white shadow-lg shadow-[#4A6FE0]/20">
                {report.ratingBand}
              </div>
            </div>
          </div>

          {/* Temporal Predictive Default Horizons (6m, 12m, 24m) */}
          {report.temporalPd && (
            <div className="bg-[#1C1915] p-5 rounded-2xl border border-[#2E2A22] space-y-3 shadow-xl">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-[#E0A94E]" />
                  <h5 className="font-display font-bold text-white text-xs uppercase tracking-wider">
                    Horizontes Preditivos Temporais de Default (Seção 6 do Edital)
                  </h5>
                </div>
                <span className="text-[10px] font-display px-2 py-0.5 rounded-full bg-[#4A6FE0]/20 text-[#E0A94E] border border-[#4A6FE0]/40">
                  Calibrado via WoE & Microdados
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-[#151310] border border-[#2E2A22]">
                  <span className="text-[10px] font-display text-stone-400 block">Probabilidade 6 Meses</span>
                  <span className="text-lg font-black font-display text-white">
                    {report.temporalPd.pd6MonthsPercent}%
                  </span>
                  <span className="text-[9px] font-sans text-stone-500 block mt-0.5">Janela safra imediata</span>
                </div>

                <div className="p-3 rounded-xl bg-[#151310] border border-[#2E2A22]">
                  <span className="text-[10px] font-display text-stone-400 block">Probabilidade 12 Meses</span>
                  <span className="text-lg font-black font-display text-white">
                    {report.temporalPd.pd12MonthsPercent}%
                  </span>
                  <span className="text-[9px] font-sans text-stone-500 block mt-0.5">Ciclo safra + safrinha</span>
                </div>

                <div className="p-3 rounded-xl bg-[#151310] border border-[#2E2A22]">
                  <span className="text-[10px] font-display text-stone-400 block">Probabilidade 24 Meses</span>
                  <span className="text-lg font-black font-display text-white">
                    {report.temporalPd.pd24MonthsPercent}%
                  </span>
                  <span className="text-[9px] font-sans text-stone-500 block mt-0.5">Horizonte plurianual</span>
                </div>

                <div className="p-3 rounded-xl bg-[#151310] border border-[#2E2A22]">
                  <span className="text-[10px] font-display text-stone-400 block">Risco de Distribuição RJ</span>
                  <span className={`text-sm font-black font-display block mt-1 ${
                    report.temporalPd.rjRiskHorizon === 'CRITICO' ? 'text-rose-400' :
                    report.temporalPd.rjRiskHorizon === 'ELEVADO' ? 'text-amber-400' :
                    report.temporalPd.rjRiskHorizon === 'MODERADO' ? 'text-sky-400' : 'text-emerald-400'
                  }`}>
                    {report.temporalPd.rjRiskHorizon}
                  </span>
                  <span className="text-[9px] font-sans text-stone-500 block mt-0.5">
                    Horizonte 24m (Lei 14.112)
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* watsonx Orchestrate ERP Automation Lock */}
          {report.orchestrateAction && (
            <div className="bg-[#1C1915] p-5 rounded-2xl border border-[#2E2A22] space-y-3 shadow-xl">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-[#E0A94E]" />
                  <h5 className="font-display font-bold text-white text-xs uppercase tracking-wider">
                    watsonx Orchestrate — Automação de Trava de ERP (T+0h)
                  </h5>
                </div>
                <span className={`text-[10px] font-display px-2 py-0.5 rounded-full border ${
                  report.orchestrateAction.actionTriggered
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                }`}>
                  {report.orchestrateAction.status}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-[#151310] border border-[#2E2A22]">
                  <span className="text-[10px] font-display text-stone-400 block">Sistema Conectado</span>
                  <span className="text-xs font-display font-bold text-white">
                    {report.orchestrateAction.targetSystem === 'SAP_S4HANA' ? 'SAP S/4HANA Cloud' : 'TOTVS Protheus Agro'}
                  </span>
                  <span className="text-[9px] font-sans text-stone-500 block mt-0.5">Webhook homologado</span>
                </div>

                <div className="p-3 rounded-xl bg-[#151310] border border-[#2E2A22]">
                  <span className="text-[10px] font-display text-stone-400 block">Diretriz Executada</span>
                  <span className={`text-xs font-display font-bold ${
                    report.orchestrateAction.actionTriggered ? 'text-rose-400' : 'text-emerald-400'
                  }`}>
                    {report.orchestrateAction.actionType}
                  </span>
                  <span className="text-[9px] font-sans text-stone-500 block mt-0.5">Tempo de resposta: instantâneo</span>
                </div>

                <div className="p-3 rounded-xl bg-[#151310] border border-[#2E2A22]">
                  <span className="text-[10px] font-display text-stone-400 block">Auditoria Criptográfica</span>
                  <span className="text-xs font-mono text-[#E0A94E] truncate block" title={report.orchestrateAction.auditHash}>
                    {report.orchestrateAction.auditHash}
                  </span>
                  <span className="text-[9px] font-sans text-stone-500 block mt-0.5">Log imutável de governança</span>
                </div>
              </div>
            </div>
          )}

          {/* Section 1: Executive Summary */}
          <div className="bg-[#1C1915] p-5 rounded-2xl border border-[#2E2A22]">
            <h5 className="font-display font-bold text-[#E0A94E] text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileText className="h-4 w-4" />
              <span>1. Sumário Executivo para Comitê de Crédito</span>
            </h5>
            <p className="text-stone-300 leading-relaxed text-xs">
              {report.executiveSummary}
            </p>
          </div>

          {/* Section 2: Legal Eligibility Diagnostic */}
          <div className="bg-[#1C1915] p-5 rounded-2xl border border-[#2E2A22]">
            <h5 className="font-display font-bold text-white text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Scale className="h-4 w-4 text-[#E0A94E]" />
              <span>2. Diagnóstico Jurídico & Elegibilidade de RJ (Lei 14.112/2020)</span>
            </h5>
            <p className="text-stone-300 leading-relaxed text-xs">
              {report.legalDiagnosticSection}
            </p>
          </div>

          {/* Section 3: AgroClimatic & ZARC Diagnostic */}
          <div className="bg-[#1C1915] p-5 rounded-2xl border border-[#2E2A22]">
            <h5 className="font-display font-bold text-white text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CloudSun className="h-4 w-4 text-sky-400" />
              <span>3. Diagnóstico Agroclimático (ZARC + INMET + Conab)</span>
            </h5>
            <p className="text-stone-300 leading-relaxed text-xs whitespace-pre-line">
              {report.agroClimaticSection}
            </p>
          </div>

          {/* Section 4: PSR Collapse Context */}
          <div className="bg-amber-950/20 p-5 rounded-2xl border border-amber-500/30">
            <h5 className="font-display font-bold text-amber-300 text-xs uppercase tracking-wider mb-2">
              4. Cenário de Seguro Rural: Colapso Histórico do PSR (2,3% - 3,3% da Área)
            </h5>
            <p className="text-stone-300 leading-relaxed text-xs">
              {report.psrCollapseContextSection}
            </p>
          </div>

          {/* Section 5: Fiduciary Alienation Stay Period Jurisprudence */}
          <div className="bg-[#1C1915] p-5 rounded-2xl border border-[#2E2A22]">
            <h5 className="font-display font-bold text-stone-300 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Scale className="h-4 w-4 text-rose-400" />
              <span>5. Parecer Consultivo: Stay Period e Alienação Fiduciária (STJ)</span>
            </h5>
            <p className="text-stone-300 leading-relaxed text-xs whitespace-pre-line">
              {report.fiduciaryAlienationCaveatSection}
            </p>
          </div>

          {/* Full Markdown Preview Area */}
          <div className="border-t border-[#2E2A22] pt-4">
            <span className="text-[11px] font-display font-bold text-stone-400 block mb-2">
              Visualização do Dossiê Markdown Formatado para Exportação / Integração de Sistemas:
            </span>
            <pre className="bg-[#0D0C0A] p-4 rounded-xl border border-[#2E2A22] text-[10px] text-stone-400 font-mono overflow-x-auto max-h-48 leading-relaxed">
              {report.fullMarkdownContent}
            </pre>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-[#2E2A22] bg-[#100E0B] flex items-center justify-between text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <span className="font-display text-white font-bold">AGRO-STRESS</span>
            <span className="text-stone-600">•</span>
            <span className="font-sans">Dossiê oficial watsonx.ai gerado pela equipe BroCode Softwares</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#4A6FE0] hover:bg-[#6584E8] text-white font-display font-bold transition-all cursor-pointer shadow-lg shadow-[#4A6FE0]/30 active:scale-95"
          >
            Fechar Visualização
          </button>
        </div>
      </div>
    </div>
  );
};
