import React from 'react';
import { 
  Scale, 
  Umbrella, 
  TrendingDown, 
  Cpu, 
  Database, 
  DollarSign, 
  Award, 
  AlertOctagon, 
  CheckCircle2, 
  BookOpen,
  ArrowRight,
  ShieldAlert,
  Lightbulb
} from 'lucide-react';

export const PitchMethodologyView: React.FC = () => {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Strategic Header */}
      <div className="bg-[#09090e] border border-[#231c3a] rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded text-xs font-display font-bold bg-[#6618F7]/20 text-[#a78bfa] border border-[#6618F7]/40 uppercase tracking-wider">
            Matriz Estratégica & Arquitetura
          </span>
          <span className="text-xs text-slate-500 font-display">Whitepaper Técnico de Risco</span>
        </div>
        <h2 className="text-2xl font-display font-black text-white tracking-tight">
          Fundamentos Técnicos do Sistema de Alerta Precoce Krill Tech
        </h2>
        <p className="text-xs text-slate-300 mt-1 max-w-3xl font-sans leading-relaxed">
          Sem retórica de "ruptura de paradigma": diagnóstico honesto, mensurável e sustentado por dados públicos oficiais, jurisprudência do STJ e realidade do agronegócio brasileiro em 2025.
        </p>

        {/* 5 Weighted Evaluation Criteria Panel */}
        <div className="mt-5 pt-5 border-t border-[#231c3a] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <div className="p-3 rounded-xl bg-[#0e0e17] border border-[#6618F7]/40 text-center">
            <span className="text-lg font-display font-black text-[#8b4dff] block">25%</span>
            <span className="text-[10px] font-display font-bold text-white uppercase block mt-0.5">Diagnóstico & Impacto</span>
            <span className="text-[9px] text-slate-400 font-sans block mt-1">Lei 14.112, PSR 2,3% e contágio AgroGalaxy</span>
          </div>

          <div className="p-3 rounded-xl bg-[#0e0e17] border border-[#6618F7]/40 text-center">
            <span className="text-lg font-display font-black text-[#8b4dff] block">25%</span>
            <span className="text-[10px] font-display font-bold text-white uppercase block mt-0.5">Viabilidade & Execução</span>
            <span className="text-[9px] text-slate-400 font-sans block mt-1">4 Agentes watsonx.ai, WoE e DataJud</span>
          </div>

          <div className="p-3 rounded-xl bg-[#0e0e17] border border-[#6618F7]/40 text-center">
            <span className="text-lg font-display font-black text-[#8b4dff] block">20%</span>
            <span className="text-[10px] font-display font-bold text-white uppercase block mt-0.5">Negócios & Custos</span>
            <span className="text-[9px] text-slate-400 font-sans block mt-1">Custo R$ 0 em dados e vantagem em talhões</span>
          </div>

          <div className="p-3 rounded-xl bg-[#0e0e17] border border-[#6618F7]/40 text-center">
            <span className="text-lg font-display font-black text-[#8b4dff] block">15%</span>
            <span className="text-[10px] font-display font-bold text-white uppercase block mt-0.5">Gestão de Mudanças</span>
            <span className="text-[9px] text-slate-400 font-sans block mt-1">Integração ERP, fluxo natural do operador</span>
          </div>

          <div className="p-3 rounded-xl bg-[#0e0e17] border border-[#6618F7]/40 text-center col-span-2 sm:col-span-1">
            <span className="text-lg font-display font-black text-[#8b4dff] block">15%</span>
            <span className="text-[10px] font-display font-bold text-white uppercase block mt-0.5">Pitch & Defesa</span>
            <span className="text-[9px] text-slate-400 font-sans block mt-1">Respostas a arguições duras e STJ</span>
          </div>
        </div>
      </div>

      {/* Pillar 1: As Três Causas Concretas da Inadimplência no Agro */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="h-6 w-6 rounded-lg bg-[#141422] border border-[#231c3a] text-[#8b4dff] flex items-center justify-center font-display font-bold text-xs">
            1
          </span>
          <h3 className="text-base font-display font-bold text-white">
            Problema & Diagnóstico Real: As 3 Causas Mensuráveis da Crise
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Causa 1: Marco Legal */}
          <div className="bg-[#0e0e17] p-5 rounded-2xl border border-[#231c3a] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-amber-400 font-display font-bold mb-2">
                <Scale className="h-4 w-4 shrink-0" />
                <span>Marco Legal: Lei 14.112/2020</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[12px] font-sans">
                Positivou a <strong>Recuperação Judicial para o Produtor Rural Pessoa Física (PF)</strong>, exigindo apenas <strong>2 anos de atividade comprovada via Livro Caixa Digital (LCDPR)</strong> ou inscrição estadual (art. 48, Lei 11.101/2005).
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-[#231c3a] text-[11px] text-slate-400 font-sans">
              <strong className="text-white">Impacto: </strong>
              Derrubou a barreira de entrada judicial que antes restringia pedidos de RJ no campo.
            </div>
          </div>

          {/* Causa 2: Colapso do PSR */}
          <div className="bg-[#0e0e17] p-5 rounded-2xl border border-[#231c3a] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-rose-400 font-display font-bold mb-2">
                <Umbrella className="h-4 w-4 shrink-0" />
                <span>Colapso do PSR: Cobertura 2,3% a 3,3%</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[12px] font-sans">
                O Programa de Subvenção ao Prêmio do Seguro Rural (PSR) cobriu apenas <strong>2,3% a 3,3% da área cultivada em 2025</strong> (pior nível desde 2006, contra meta oficial de 11,79% e 7,72% em 2024).
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-[#231c3a] text-[11px] text-slate-400 font-sans">
              <strong className="text-white">Impacto: </strong>
              O produtor está desprotegido do Estado; o risco climático recai direto sobre o balanço da Krill Tech.
            </div>
          </div>

          {/* Causa 3: Efeito Cascata AgroGalaxy */}
          <div className="bg-[#0e0e17] p-5 rounded-2xl border border-[#231c3a] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#8b4dff] font-display font-bold mb-2">
                <TrendingDown className="h-4 w-4 shrink-0" />
                <span>Efeito Cascata: TerraMagna & AgroGalaxy</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[12px] font-sans">
                A TerraMagna, maior agfintech da América Latina com satélite e IA, tornou-se credora na RJ da rede AgroGalaxy com <strong>R$ 28 milhões a receber</strong>.
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-[#231c3a] text-[11px] text-slate-400 font-sans">
              <strong className="text-white">Impacto: </strong>
              Nenhuma IA elimina o risco de RJ; a promessa honesta é <em>Alerta Precoce</em> e redução de exposição.
            </div>
          </div>
        </div>
      </div>

      {/* Pillar 2: Correções Técnicas da Arquitetura dos Agentes */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="h-6 w-6 rounded-lg bg-[#141422] border border-[#231c3a] text-[#8b4dff] flex items-center justify-center font-display font-bold text-xs">
            2
          </span>
          <h3 className="text-base font-display font-bold text-white">
            Engenharia de Dados: Calibrações e Arquitetura de Fontes Oficiais
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-[#0e0e17] p-5 rounded-2xl border border-[#231c3a]">
            <span className="text-[#8b4dff] font-display text-[10px] font-bold block mb-1">
              AGENTE COLETOR
            </span>
            <h4 className="text-sm font-display font-bold text-white mb-2">
              Realidade Técnica da API DataJud
            </h4>
            <p className="text-slate-300 text-[11px] font-sans leading-relaxed mb-3">
              A API Pública do DataJud (aberta desde 2023) é indexada por <strong>tribunal e processo</strong>, e não por CPF/CNPJ único centralizado. Cobrir os cerca de 90 tribunais exige camada de agregação cross-court (por isso recomenda-se integração complementar com Jusbrasil/Escavador).
            </p>
            <span className="text-[10px] text-[#8b4dff] font-medium font-sans">
              ✓ Integração resiliente via camada de federação cross-court.
            </span>
          </div>

          <div className="bg-[#0e0e17] p-5 rounded-2xl border border-[#231c3a]">
            <span className="text-sky-400 font-display text-[10px] font-bold block mb-1">
              AGENTE AGROCLIMÁTICO
            </span>
            <h4 className="text-sm font-display font-bold text-white mb-2">
              ZARC é Filtro Categórico, Não Termômetro
            </h4>
            <p className="text-slate-300 text-[11px] font-sans leading-relaxed mb-3">
              O ZARC da Embrapa/MAPA classifica aptidão (Apto / Moderado / Não Apto) por portaria anual. A lógica correta é: <strong>(1) checar janela ZARC</strong> (desvio = red flag); <strong>(2) cruzar com anomalia real do INMET</strong>; <strong>(3) cruzar com Conab regional</strong>.
            </p>
            <span className="text-[10px] text-sky-400 font-medium font-sans">
              ✓ Evita prometer o que a fonte ZARC não entrega.
            </span>
          </div>

          <div className="bg-[#0e0e17] p-5 rounded-2xl border border-[#231c3a]">
            <span className="text-amber-400 font-display text-[10px] font-bold block mb-1">
              MOTOR DE SCORING
            </span>
            <h4 className="text-sm font-display font-bold text-white mb-2">
              Scorecard WoE vs PD de Caixa-Preta
            </h4>
            <p className="text-slate-300 text-[11px] font-sans leading-relaxed mb-3">
              Calcular PD estatística via ML exige base histórica robusta de eventos de default que produtos novos não possuem. A saída defensável — padrão de bureaus como <strong>Serasa e Boa Vista</strong> — é o <strong>Scorecard Ponderado (Weight of Evidence)</strong> explicável.
            </p>
            <span className="text-[10px] text-amber-400 font-medium font-sans">
              ✓ Modelo 100% auditável e explicável para comitês e reguladores.
            </span>
          </div>
        </div>
      </div>

      {/* Pillar 3: Matriz de Pesos Justificados e Custos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Justified Weights */}
        <div className="bg-[#09090e] border border-[#231c3a] rounded-2xl p-5 shadow-2xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="h-6 w-6 rounded-lg bg-[#141422] border border-[#231c3a] text-[#8b4dff] flex items-center justify-center font-display font-bold text-xs">
              3
            </span>
            <h3 className="text-sm font-display font-bold text-white">
              Pesos Justificados por Racional de Risco (0 a 1000)
            </h3>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="bg-[#0e0e17] p-3 rounded-xl border border-[#231c3a] flex items-center justify-between">
              <div>
                <span className="font-display font-bold text-white block">Processual & Jurídico (30%)</span>
                <span className="text-[11px] text-slate-500 font-display">DataJud / DJEs / Cartórios</span>
              </div>
              <span className="text-[11px] text-slate-300 font-sans text-right max-w-xs">
                Sinal mais direto de estresse já manifesto (execuções ativas e distribuição de RJ).
              </span>
            </div>

            <div className="bg-[#0e0e17] p-3 rounded-xl border border-[#231c3a] flex items-center justify-between">
              <div>
                <span className="font-display font-bold text-white block">Agronômico & Climático (25%)</span>
                <span className="text-[11px] text-slate-500 font-display">ZARC / INMET / Conab</span>
              </div>
              <span className="text-[11px] text-slate-300 font-sans text-right max-w-xs">
                Driver estrutural do agro que diferencia este modelo de um bureau de crédito genérico.
              </span>
            </div>

            <div className="bg-[#0e0e17] p-3 rounded-xl border border-[#231c3a] flex items-center justify-between">
              <div>
                <span className="font-display font-bold text-white block">Fiscal & Trabalhista (20%)</span>
                <span className="text-[11px] text-slate-500 font-display">PGFN / TST / Caixa CRF</span>
              </div>
              <span className="text-[11px] text-slate-300 font-sans text-right max-w-xs">
                Inscrição na Dívida Ativa da União e passivos de FGTS antecedem o colapso de caixa.
              </span>
            </div>

            <div className="bg-[#0e0e17] p-3 rounded-xl border border-[#231c3a] flex items-center justify-between">
              <div>
                <span className="font-display font-bold text-white block">Cadastral & Societário (15%)</span>
                <span className="text-[11px] text-slate-500 font-display">Receita / Redesim / QSA</span>
              </div>
              <span className="text-[11px] text-slate-300 font-sans text-right max-w-xs">
                Maturidade da empresa (&gt;2 anos) e estabilidade do quadro societário.
              </span>
            </div>

            <div className="bg-[#0e0e17] p-3 rounded-xl border border-[#231c3a] flex items-center justify-between">
              <div>
                <span className="font-display font-bold text-white block">Territorial & Ambiental (10%)</span>
                <span className="text-[11px] text-slate-500 font-display">SICAR / IBAMA</span>
              </div>
              <span className="text-[11px] text-slate-300 font-sans text-right max-w-xs">
                Sem CAR ativo, o produtor não acessa crédito oficial, pressionando o credor comercial.
              </span>
            </div>
          </div>
        </div>

        {/* Right: Business Architecture & Krill Tech Competitive Edge */}
        <div className="bg-[#09090e] border border-[#231c3a] rounded-2xl p-5 shadow-2xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="h-6 w-6 rounded-lg bg-[#141422] border border-[#231c3a] text-[#8b4dff] flex items-center justify-center font-display font-bold text-xs">
              4
            </span>
            <h3 className="text-sm font-display font-bold text-white">
              Arquitetura de Custos & Vantagem Defensável
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="bg-[#0e0e17] p-3.5 rounded-xl border border-[#6618F7]/30">
              <div className="flex items-center gap-2 text-[#8b4dff] font-display font-bold mb-1">
                <DollarSign className="h-4 w-4" />
                <span>Fontes 100% Custo Zero no MVP</span>
              </div>
              <p className="text-slate-300 text-[11px] font-sans leading-relaxed">
                Receita Federal, DataJud, PGFN, TST (CNDT), Caixa CRF-FGTS, SICAR/IBAMA, Conab, ZARC/MAPA e INMET são <strong>gratuitas e abertas</strong>. Dispensa licenças do Banco Central (SCR/Bacen), reduzindo o custo operacional do protótipo a zero.
              </p>
            </div>

            <div className="bg-[#0e0e17] p-3.5 rounded-xl border border-[#231c3a]">
              <div className="flex items-center gap-2 text-[#a78bfa] font-display font-bold mb-1">
                <Award className="h-4 w-4" />
                <span>Diferencial Krill Tech vs Fintechs Puras</span>
              </div>
              <p className="text-slate-300 text-[11px] font-sans leading-relaxed">
                Produtos de risco agro já existem no mercado (TerraMagna lançou a <em>tmdigital</em> em 2025; Traive fechou FIDC com Syngenta). O diferencial da Krill Tech <strong>não é "ter um score"</strong>, mas sim o <strong>relacionamento comercial direto e os dados agronômicos proprietários</strong> gerados na venda e aplicação de insumos.
              </p>
            </div>

            <div className="bg-[#0e0e17] p-3.5 rounded-xl border border-amber-500/30">
              <div className="flex items-center gap-2 text-amber-400 font-display font-bold mb-1">
                <Scale className="h-4 w-4" />
                <span>Ressalva Jurídica da Alienação Fiduciária (STJ)</span>
              </div>
              <p className="text-slate-300 text-[11px] font-sans leading-relaxed">
                <strong>Análise Crítica de Objeção:</strong> <em>"A alienação fiduciária não blinda totalmente o crédito comercial?"</em>
                <br />
                <strong>Fundamentação: </strong>Não blinda 100%. Pela jurisprudência recente do STJ e tribunais (TJGO, TJMS), bens de capital essenciais à atividade produtiva do produtor em RJ não podem ser retirados durante o <em>stay period</em>. Daí a urgência do Alerta Precoce nos ratings B e C.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
