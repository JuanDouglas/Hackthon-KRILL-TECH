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
  CloudSun 
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Relatório Padronizado de Risco & Alerta Precoce</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-emerald-400 border border-slate-700">
                  watsonx.ai Engine
                </span>
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                {report.dossierId} • Emitido em {report.generatedAt}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-all"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copiado!' : 'Copiar Dossiê'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-all"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Imprimir</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Standardized Dossier */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-200 text-xs leading-relaxed">
          {/* Top Banner Card */}
          <div className="bg-gradient-to-r from-slate-950 to-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                Tomador Analisado
              </span>
              <h4 className="text-base font-bold text-white">{report.borrowerName}</h4>
              <p className="text-slate-400 text-xs font-mono">
                {report.borrowerTypeLabel} • Doc: {report.borrowerDocument}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase block">Score Consolidado</span>
                <span className="text-2xl font-black font-mono text-emerald-400">
                  {report.overallScore} <span className="text-xs text-slate-500 font-normal">/ 1000</span>
                </span>
              </div>
              <div className="h-10 w-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-black text-lg text-white">
                {report.ratingBand}
              </div>
            </div>
          </div>

          {/* Section 1: Executive Summary */}
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80">
            <h5 className="font-bold text-emerald-400 text-xs uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5" />
              <span>1. Sumário Executivo para Comitê de Crédito</span>
            </h5>
            <p className="text-slate-300 leading-relaxed text-xs">
              {report.executiveSummary}
            </p>
          </div>

          {/* Section 2: Legal Eligibility Diagnostic */}
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80">
            <h5 className="font-bold text-slate-300 text-xs uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Scale className="h-3.5 w-3.5 text-teal-400" />
              <span>2. Diagnóstico Jurídico & Elegibilidade de RJ (Lei 14.112/2020)</span>
            </h5>
            <p className="text-slate-300 leading-relaxed text-xs">
              {report.legalDiagnosticSection}
            </p>
          </div>

          {/* Section 3: AgroClimatic & ZARC Diagnostic */}
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80">
            <h5 className="font-bold text-slate-300 text-xs uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <CloudSun className="h-3.5 w-3.5 text-sky-400" />
              <span>3. Diagnóstico Agroclimático (ZARC + INMET + Conab)</span>
            </h5>
            <p className="text-slate-300 leading-relaxed text-xs whitespace-pre-line">
              {report.agroClimaticSection}
            </p>
          </div>

          {/* Section 4: PSR Collapse Context */}
          <div className="bg-amber-950/20 p-4 rounded-xl border border-amber-500/30">
            <h5 className="font-bold text-amber-300 text-xs uppercase tracking-wider mb-1.5">
              4. Cenário de Seguro Rural: Colapso Histórico do PSR (2,3% - 3,3% da Área)
            </h5>
            <p className="text-slate-300 leading-relaxed text-xs">
              {report.psrCollapseContextSection}
            </p>
          </div>

          {/* Section 5: Fiduciary Alienation Stay Period Jurisprudence */}
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80">
            <h5 className="font-bold text-slate-300 text-xs uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Scale className="h-3.5 w-3.5 text-rose-400" />
              <span>5. Parecer Consultivo: Stay Period e Alienação Fiduciária (STJ)</span>
            </h5>
            <p className="text-slate-300 leading-relaxed text-xs whitespace-pre-line">
              {report.fiduciaryAlienationCaveatSection}
            </p>
          </div>

          {/* Full Markdown Preview Area */}
          <div className="border-t border-slate-800 pt-4">
            <span className="text-[11px] font-bold text-slate-400 block mb-2 font-mono">
              Visualização de Código Markdown para Integração / API:
            </span>
            <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-[10px] text-slate-400 font-mono overflow-x-auto max-h-48">
              {report.fullMarkdownContent}
            </pre>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/90 flex items-center justify-between text-xs text-slate-400">
          <span>Relatório gerado em conformidade com a Seção 6 do Edital Krill Tech</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-all font-medium"
          >
            Fechar Visualização
          </button>
        </div>
      </div>
    </div>
  );
};
