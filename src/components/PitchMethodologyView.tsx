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
      {/* Pitch Header */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Defesa Metodológica & Pitch Deck
          </span>
          <span className="text-xs text-slate-400 font-mono">Banca de Avaliação / Hackathon</span>
        </div>
        <h2 className="text-2xl font-black text-white tracking-tight">
          Fundamentos Técnicos do Sistema de Alerta Precoce Krill Tech
        </h2>
        <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
          Sem retórica de "ruptura de paradigma": diagnóstico honesto, mensurável e sustentado por dados públicos oficiais, jurisprudência do STJ e realidade do agronegócio brasileiro em 2025.
        </p>
      </div>

      {/* Pillar 1: As Três Causas Concretas da Inadimplência no Agro */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="h-6 w-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
            1
          </span>
          <h3 className="text-base font-bold text-white">
            Problema & Diagnóstico Real: As 3 Causas Mensuráveis da Crise
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Causa 1: Marco Legal */}
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-amber-400 font-bold mb-2">
                <Scale className="h-4 w-4 shrink-0" />
                <span>Marco Legal: Lei 14.112/2020</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[12px]">
                Positivou a <strong>Recuperação Judicial para o Produtor Rural Pessoa Física (PF)</strong>, exigindo apenas <strong>2 anos de atividade comprovada via Livro Caixa Digital (LCDPR)</strong> ou inscrição estadual (art. 48, Lei 11.101/2005).
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
              <strong className="text-white">Impacto: </strong>
              Derrubou a barreira de entrada judicial que antes restringia pedidos de RJ no campo.
            </div>
          </div>

          {/* Causa 2: Colapso do PSR */}
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-rose-400 font-bold mb-2">
                <Umbrella className="h-4 w-4 shrink-0" />
                <span>Colapso do PSR: Cobertura 2,3% a 3,3%</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[12px]">
                O Programa de Subvenção ao Prêmio do Seguro Rural (PSR) cobriu apenas <strong>2,3% a 3,3% da área cultivada em 2025</strong> (pior nível desde 2006, contra meta oficial de 11,79% e 7,72% em 2024).
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
              <strong className="text-white">Impacto: </strong>
              O produtor está desprotegido do Estado; o risco climático recai direto sobre o balanço da Krill Tech.
            </div>
          </div>

          {/* Causa 3: Efeito Cascata AgroGalaxy */}
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-sky-400 font-bold mb-2">
                <TrendingDown className="h-4 w-4 shrink-0" />
                <span>Efeito Cascata: TerraMagna & AgroGalaxy</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[12px]">
                A TerraMagna, maior agfintech da América Latina com satélite e IA, tornou-se credora na RJ da rede AgroGalaxy com <strong>R$ 28 milhões a receber</strong>.
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
              <strong className="text-white">Impacto: </strong>
              Nenhuma IA elimina o risco de RJ; a promessa honesta é <em>Alerta Precoce</em> e redução de exposição.
            </div>
          </div>
        </div>
      </div>

      {/* Pillar 2: Correções Técnicas da Arquitetura dos Agentes */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="h-6 w-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
            2
          </span>
          <h3 className="text-base font-bold text-white">
            Engenharia de Dados: Correções Técnicas Feitas no Edital
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
            <span className="text-emerald-400 font-mono text-[10px] font-bold block mb-1">
              AGENTE COLETOR
            </span>
            <h4 className="text-sm font-bold text-white mb-2">
              Realidade Técnica da API DataJud
            </h4>
            <p className="text-slate-300 text-[11px] leading-relaxed mb-3">
              A API Pública do DataJud (aberta desde 2023) é indexada por <strong>tribunal e processo</strong>, e não por CPF/CNPJ único centralizado. Cobrir os cerca de 90 tribunais exige camada de agregação cross-court (por isso recomenda-se integração complementar com Jusbrasil/Escavador).
            </p>
            <span className="text-[10px] text-emerald-400 font-medium">
              ✓ Demonstra teste prático da fonte oficial perante a banca.
            </span>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
            <span className="text-sky-400 font-mono text-[10px] font-bold block mb-1">
              AGENTE AGROCLIMÁTICO
            </span>
            <h4 className="text-sm font-bold text-white mb-2">
              ZARC é Filtro Categórico, Não Termômetro
            </h4>
            <p className="text-slate-300 text-[11px] leading-relaxed mb-3">
              O ZARC da Embrapa/MAPA classifica aptidão (Apto / Moderado / Não Apto) por portaria anual. A lógica correta é: <strong>(1) checar janela ZARC</strong> (desvio = red flag); <strong>(2) cruzar com anomalia real do INMET</strong>; <strong>(3) cruzar com Conab regional</strong>.
            </p>
            <span className="text-[10px] text-sky-400 font-medium">
              ✓ Evita prometer o que a fonte ZARC não entrega.
            </span>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
            <span className="text-amber-400 font-mono text-[10px] font-bold block mb-1">
              MOTOR DE SCORING
            </span>
            <h4 className="text-sm font-bold text-white mb-2">
              Scorecard WoE vs PD de Caixa-Preta
            </h4>
            <p className="text-slate-300 text-[11px] leading-relaxed mb-3">
              Calcular PD estatística via ML exige base histórica robusta de eventos de default que produtos novos não possuem. A saída defensável — padrão de bureaus como <strong>Serasa e Boa Vista</strong> — é o <strong>Scorecard Ponderado (Weight of Evidence)</strong> explicável.
            </p>
            <span className="text-[10px] text-amber-400 font-medium">
              ✓ Resiste a qualquer questionamento estatístico da banca.
            </span>
          </div>
        </div>
      </div>

      {/* Pillar 3: Matriz de Pesos Justificados e Custos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Justified Weights */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex items-center gap-2">
            <span className="h-6 w-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
              3
            </span>
            <h3 className="text-sm font-bold text-white">
              Pesos Justificados por Racional de Risco (0 a 1000)
            </h3>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Processual & Jurídico (30%)</span>
                <span className="text-[11px] text-slate-400">DataJud / DJEs / Cartórios</span>
              </div>
              <span className="text-[11px] text-slate-300 text-right max-w-xs">
                Sinal mais direto de estresse já manifesto (execuções ativas e distribuição de RJ).
              </span>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Agronômico & Climático (25%)</span>
                <span className="text-[11px] text-slate-400">ZARC / INMET / Conab</span>
              </div>
              <span className="text-[11px] text-slate-300 text-right max-w-xs">
                Driver estrutural do agro que diferencia este modelo de um bureau de crédito genérico.
              </span>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Fiscal & Trabalhista (20%)</span>
                <span className="text-[11px] text-slate-400">PGFN / TST / Caixa CRF</span>
              </div>
              <span className="text-[11px] text-slate-300 text-right max-w-xs">
                Inscrição na Dívida Ativa da União e passivos de FGTS antecedem o colapso de caixa.
              </span>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Cadastral & Societário (15%)</span>
                <span className="text-[11px] text-slate-400">Receita / Redesim / QSA</span>
              </div>
              <span className="text-[11px] text-slate-300 text-right max-w-xs">
                Maturidade da empresa (&gt;2 anos) e estabilidade do quadro societário.
              </span>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Territorial & Ambiental (10%)</span>
                <span className="text-[11px] text-slate-400">SICAR / IBAMA</span>
              </div>
              <span className="text-[11px] text-slate-300 text-right max-w-xs">
                Sem CAR ativo, o produtor não acessa crédito oficial, pressionando o credor comercial.
              </span>
            </div>
          </div>
        </div>

        {/* Right: Business Architecture & Krill Tech Competitive Edge */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex items-center gap-2">
            <span className="h-6 w-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
              4
            </span>
            <h3 className="text-sm font-bold text-white">
              Arquitetura de Custos & Vantagem Defensável
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-emerald-500/30">
              <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                <DollarSign className="h-4 w-4" />
                <span>Fontes 100% Custo Zero no MVP</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Receita Federal, DataJud, PGFN, TST (CNDT), Caixa CRF-FGTS, SICAR/IBAMA, Conab, ZARC/MAPA e INMET são <strong>gratuitas e abertas</strong>. Dispensa licenças do Banco Central (SCR/Bacen), reduzindo o custo operacional do protótipo a zero.
              </p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2 text-teal-400 font-bold mb-1">
                <Award className="h-4 w-4" />
                <span>Diferencial Krill Tech vs Fintechs Puras</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Produtos de risco agro já existem no mercado (TerraMagna lançou a <em>tmdigital</em> em 2025; Traive fechou FIDC com Syngenta). O diferencial da Krill Tech <strong>não é "ter um score"</strong>, mas sim o <strong>relacionamento comercial direto e os dados agronômicos proprietários</strong> gerados na venda e aplicação de insumos.
              </p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-amber-500/30">
              <div className="flex items-center gap-2 text-amber-400 font-bold mb-1">
                <Scale className="h-4 w-4" />
                <span>Ressalva Jurídica da Alienação Fiduciária (STJ)</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Se a banca perguntar: <em>"A alienação fiduciária não blinda totalmente o crédito?"</em>
                <br />
                <strong>Resposta: </strong>Não blinda 100%. Pela jurisprudência recente do STJ e tribunais (TJGO, TJMS), bens de capital essenciais à atividade produtiva do produtor em RJ não podem ser retirados durante o *stay period*. Daí a urgência do Alerta Precoce nos ratings B e C.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
