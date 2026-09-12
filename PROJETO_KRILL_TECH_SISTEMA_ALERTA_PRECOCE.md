# SISTEMA INTELIGENTE DE ALERTA PRECOCE DE RECUPERAÇÃO JUDICIAL & INSOLVÊNCIA NO AGRONEGÓCIO
## Documento Técnico e Metodológico da Solução — Desafio Krill Tech | Edital 01/2026 (PMI-DF & IBM)

---

## 1. APRESENTAÇÃO & OBJETIVO DO PROJETO

O presente projeto apresenta a arquitetura, fundamentação metodológica e protótipo funcional desenvolvido para a **Krill Tech**, empresa de tecnologia e comercialização B2B de insumos para o agronegócio, em conformidade com o **Edital 01/2026 promovido pelo Student Club do PMI-DF com apoio tecnológico da IBM (watsonx.ai, watsonx Orchestrate e agentes IBM Bob)**.

O objetivo da solução é responder à dor crítica enfrentada pela Krill Tech nos últimos ciclos: a elevação acentuada da inadimplência, quebras de safra e pedidos repentinos de **Recuperação Judicial (RJ)** por parte de produtores rurais e redes de revendas/agroindústrias.

Conforme preconizado nas **Seções 2 e 3 do Edital**, a solução estrutura-se em quatro fases operacionais integradas:
1. **Triagem Cadastral** — *Novos Clientes (Gate de Entrada)*.
2. **Due Diligence Automatizada** — *Novos Clientes (Antes de conceder a primeira linha de crédito)*.
3. **Monitoramento Processual e Financeiro** — *Clientes Atuais (Carteira já ativa com exposição aberta)*.
4. **Alerta Precoce de RJ/Insolvência** — *Clientes Atuais (Detecção de estresse manifesto e contenção de danos)*.

---

## 2. PROBLEMA & DIAGNÓSTICO REAL (SEM RETÓRICA DE RUPTURA)

O agronegócio brasileiro deixou de ser um segmento de baixa inadimplência histórica por **três causas concretas, mensuráveis e estruturais**, e não por uma volatilidade climática genérica:

### 2.1. Marco Legal: A Lei nº 14.112/2020
A reforma da Lei de Recuperação Judicial e Falências (Lei 11.101/2005) positivou de forma expressa no art. 48 a extensão da RJ ao **produtor rural pessoa física**, exigindo apenas **2 anos de atividade comprovada por meio do Livro Caixa Digital do Produtor Rural (LCDPR)** ou inscrição estadual. Isso reduziu drasticamente a barreira de entrada processual que antes limitava esse tipo de pedido no campo, provocando uma escalada sem precedentes de distribuições judiciais.

### 2.2. Colapso da Rede de Proteção Pública: O Seguro Rural (PSR)
O **Programa de Subvenção ao Prêmio do Seguro Rural (PSR)** — principal mecanismo público de mitigação de risco climático no Brasil — sofreu contingenciamentos severos e **cobriu apenas entre 2,3% e 3,3% da área plantada em 2025**, atingindo o pior resultado desde o início da série histórica em 2006 (muito abaixo da meta governamental de 11,79% e da cobertura de 7,72% realizada em 2024). 
*Impacto direto:* O produtor rural médio brasileiro está desprotegido pelo Estado. O risco climático que antes era parcialmente amortecido pela subvenção pública agora recai integralmente sobre o balanço da **Krill Tech** como credora comercial de insumos.

### 2.3. Efeito Cascata Comprovado: O Caso TerraMagna / AgroGalaxy
A **TerraMagna**, maior agfintech da América Latina, dotada de algoritmos de inteligência artificial e monitoramento contínuo por satélite, acumulou **R$ 28 milhões em créditos concursais a receber na Recuperação Judicial da rede de revendas AgroGalaxy**. 
*Lição prática para o pitch:* Nenhuma ferramenta tecnológica, por mais avançada, elimina o risco de insolvência externa. A promessa responsável e tecnicamente defensável é o **Alerta Precoce** (detecção antecipada para redução de exposição e retenção de garantias), e não a pretensão de "prevenção milagrosa".

---

## 3. PÚBLICO-ALVO E SEGMENTAÇÃO JURÍDICA DE TOMADORES

A solução trata separadamente dois perfis distintos de clientes, pois a via jurídica de Recuperação Judicial e os dados críticos divergem substancialmente:

| Critério Analítico | Produtor Rural Pessoa Física (PF) | Agroindústria / Revenda Pessoa Jurídica (PJ) |
| :--- | :--- | :--- |
| **Fundamento Jurídico** | Art. 48, § 2º, Lei 11.101/2005 (Lei 14.112/2020) | Art. 48, *caput*, Lei 11.101/2005 (Regra Geral) |
| **Comprovação de Atividade** | LCDPR (Livro Caixa Digital) ou Inscrição Estadual $\ge$ 2 anos | Registro na Junta Comercial / Balanços $\ge$ 2 anos |
| **Fontes de Dados Críticas** | CAR/SICAR, histórico agronômico, ZARC, satélite/talhão | QSA (Sócios), CNAE, capital social, execuções de fornecedores |
| **Dinâmica de Inadimplência** | Frustração de safra, seca extrema, ausência de seguro | Quebra em cadeia de agricultores clientes (efeito cascata) |

---

## 4. AS QUATRO FASES OPERACIONAIS DO SISTEMA

### Fase 1: Triagem Cadastral (Novos Clientes — Gate de Entrada)
- **Objetivo:** Filtrar prospectos na entrada sem gastar tempo ou custo computacional desnecessário.
- **Validações:**
  - Consulta da situação cadastral na Receita Federal / Redesim.
  - Verificação da barreira de 2 anos (art. 48 da Lei 11.101) via LCDPR ou Junta Comercial.
  - Checagem prévia no SICAR (bloqueio automático se CAR estiver cancelado ou suspenso).
- **Veredito:** *Aprovado para Due Diligence*, *Aprovado com Ressalva* ou *Reprovado no Gate*.

### Fase 2: Due Diligence Automatizada (Novos Clientes — Concessão da 1ª Linha)
- **Objetivo:** Investigação aprofundada pré-crédito antes de autorizar o primeiro faturamento a prazo.
- **Execução:** Disparo da esteira dos 4 agentes autônomos.
- **Entregáveis:**
  - Cálculo do Scorecard WoE (0 a 1000) e Enquadramento de Rating (A, B, C, D).
  - Verificação das 6 Red Flags operacionais.
  - Definição do limite inicial, prazo máximo e exigência de garantias reais (CPR Física ou Barter).
  - Emissão do Dossiê Padronizado watsonx.ai para o Comitê de Crédito.

### Fase 3: Monitoramento Processual e Financeiro (Clientes Atuais — Carteira Ativa)
- **Objetivo:** Acompanhamento rotineiro dos tomadores que já possuem exposição financeira aberta (R$ 48.5M).
- **Rotinas:**
  - **Rotina Mensal Automatizada:** Varredura no dia 01 de cada mês das bases da PGFN (Dívida Ativa da União), TST (CNDT Trabalhista), Caixa (CRF-FGTS) e alterações societárias no QSA.
  - **Rotina de Safra:** Verificação da janela ZARC no plantio declarado e acúmulo de anomalia pluviométrica INMET durante a floração/enchimento.

### Fase 4: Alerta Precoce de RJ/Insolvência (Clientes Atuais — Risco de Exposição)
- **Objetivo:** Gestão de crise de liquidez exclusivamente sobre quem já deve para a Krill Tech.
- **Gatilho de 24 Horas:** Integração com o DataJud (CNJ) identificando novas ações de execução de título extrajudicial ou petições iniciais de RJ em menos de 24h pós-distribuição.
- **Protocolo de Ação:** Bloqueio imediato de novos faturamentos a prazo, retenção de recebíveis e aceleração da cobrança de CPRs físicas antes do deferimento do *Stay Period*.

---

## 5. ARQUITETURA DOS 4 AGENTES AUTÔNOMOS (COM CORREÇÕES TÉCNICAS)

A solução adota a arquitetura de 4 agentes sugerida na **Seção 6 do Edital**, incorporando correções essenciais de engenharia:

```
┌─────────────────────────┐      ┌─────────────────────────┐      ┌─────────────────────────┐      ┌─────────────────────────┐
│       AGENTE 01         │      │       AGENTE 02         │      │       AGENTE 03         │      │       AGENTE 04         │
│    Coletor & Parser     │─────▶│  Risco Agroclimático    │─────▶│     Motor Scoring       │─────▶│  Sintetizador watsonx   │
│  (DataJud RAG Ingestion)│      │  (ZARC + INMET + Conab) │      │  (Scorecard WoE 0-1000) │      │  (Dossiê Executivo STJ) │
└─────────────────────────┘      └─────────────────────────┘      └─────────────────────────┘      └─────────────────────────┘
```

### Agente 1: Coletor & Parser (RAG / Data Ingestion)
- **Fontes Gratuitas Integradas:** DataJud (CNJ), Receita Federal, PGFN, TST/BNDT, Caixa CRF, SICAR, Conab e INMET.
- **Ressalva Técnica de Engenharia:** A API Pública do DataJud é indexada por **tribunal e processo**, e não por CPF/CNPJ de forma centralizada em chamada única. Cobrir os ~90 tribunais exige uma camada de consolidação cross-court (sugerindo-se a integração complementar com Jusbrasil/Escavador para escala).

### Agente 2: Risco Agro & Climático
- **Correção Metodológica:** O **ZARC não é um termômetro contínuo**, mas uma classificação categórica anual da Portaria MAPA/Embrapa (Apto / Moderado / Não Apto).
- **Lógica do Índice Derivado (0 a 100):**
  1. Verifica se o plantio ocorreu dentro da janela ZARC (desvio = Red Flag imediata).
  2. Cruza com o desvio percentual de chuva real da estação meteorológica do INMET (série de 30 anos).
  3. Cruza com a produtividade média regional da Conab.
  4. Trata a ausência de seguro rural (PSR) como penalidade de pontuação, sem agir como veto bloqueante (para não inviabilizar a concessão diante do colapso do PSR para 2,3%).

### Agente 3: Motor de Decisão & Scoring (Weight of Evidence)
- **Correção Conceitual:** Uma Probabilidade de Inadimplência (PD) estatística de Machine Learning exige base massiva de eventos de default, inexistente em produtos novos. A metodologia correta — padrão de bureaus reais como **Serasa e Boa Vista** — é o **Scorecard Heurístico Ponderado (Weight of Evidence / points-based)** de 0 a 1000, 100% explicável.

### Agente 4: Sintetizador & Gerador de Relatórios (watsonx.ai / IBM Bob)
- Compila os achados técnicos em linguagem natural corporativa e redige o **Dossiê Padronizado**, incorporando o parecer jurídico de blindagem patrimonial.

---

## 6. METODOLOGIA DO SCORECARD PONDERADO (0 A 1000)

| Dimensão | Peso | Pontuação | Fonte Oficial | Racional Técnico de Risco |
| :--- | :---: | :---: | :--- | :--- |
| **Processual & Jurídico** | 30% | 0 a 300 pts | DataJud / DJEs / Cartórios | Maior peso: sinal mais direto de insolvência já judicializada (execuções ativas e distribuição de RJ). |
| **Agronômico & Climático** | 25% | 0 a 250 pts | ZARC (MAPA) / INMET / Conab | Segundo maior peso: principal driver estrutural de risco específico do agronegócio. |
| **Fiscal & Trabalhista** | 20% | 0 a 200 pts | PGFN / TST / Caixa CRF | Dívida ativa federal e passivos de FGTS antecedem a quebra de liquidez operacional. |
| **Cadastral & Societário** | 15% | 0 a 150 pts | Receita Federal / Redesim / QSA | Maturidade operacional ($\ge$ 2 anos da Lei 11.101) e estabilidade de sócios. |
| **Territorial & Ambiental** | 10% | 0 a 100 pts | SICAR / IBAMA | Sem CAR regular, o tomador não acessa crédito oficial, pressionando o credor de insumos. |

### Faixas de Rating & Decisão Operacional
- **Rating A (800–1000 pts):** Baixo Risco. Liberação em prazo padrão (180 dias de safra) sem exigência de garantias extraordinárias.
- **Rating B (600–799 pts):** Risco Moderado. Prazo encurtado para até 120 dias e monitoramento trimestral automático no DataJud.
- **Rating C (400–599 pts):** Risco Alto / Alerta Precoce. Exigência mandatória de **CPR Física registrada (B3/Cerc) ou operação de Barter estruturado**. A falta de seguro PSR reduz o score, mas a garantia real de grãos compensa o risco.
- **Rating D (< 400 pts):** Risco Crítico / Alerta de RJ Iminente. **Bloqueio imediato de novas concessões** e protocolo de renegociação das posições abertas.

---

## 7. MATRIZ DE 6 RED FLAGS OPERACIONAIS

1. **Inscrição em Dívida Ativa da União (PGFN)** nos últimos 12 meses.
2. **CNDT Positiva (TST)** ou irregularidade no recolhimento do FGTS (**Caixa CRF**).
3. **Execução de título judicial/extrajudicial ou pedido de RJ** distribuído no **DataJud**.
4. **Embargo ambiental ativo do IBAMA** ou suspensão/cancelamento do CAR no **SICAR**.
5. **Semeadura fora da janela ZARC** da Portaria MAPA para a cultura e município declarados.
6. **Anomalia pluviométrica severa no INMET** ($\le -30\%$) durante a fase crítica da lavoura.

---

## 8. PARECER JURÍDICO CONSULTIVO: STAY PERIOD E ALIENAÇÃO FIDUCIÁRIA (STJ)

É dogma de mercado supor que a Alienação Fiduciária (crédito extraconcursal — art. 49, § 3º, Lei 11.101) blinda 100% o credor da Recuperação Judicial. 
**A solução Krill Tech incorpora a jurisprudência dominante do Superior Tribunal de Justiça (STJ) e dos Tribunais dos polos agro (TJMT, TJGO, TJMS):**
- Durante o *Stay Period* (180 dias prorrogáveis), **é vedada a busca e apreensão de bens de capital essenciais à atividade produtiva do devedor**, competindo ao juízo da recuperação declarar essa essencialidade.
- Colheitadeiras, tratores, pivôs de irrigação e safras em formação são rotineiramente declarados essenciais, paralisando a execução fiduciária.
- **Conclusão:** O crédito só está verdadeiramente seguro se o risco for detectado **antes** do ajuizamento da RJ (na transição dos ratings B e C), viabilizando travas bancárias, cessões fiduciárias de recebíveis e liquidação física de CPRs.

---

## 9. ARQUITETURA DE NEGÓCIOS, CUSTOS & VANTAGEM DEFENSÁVEL

### 9.1. Viabilidade Financeira do MVP (Custo Zero em Fontes Abertas)
- **Custo Zero:** DataJud (CNJ), Receita Federal, PGFN, TST/BNDT, Caixa CRF, SICAR, IBAMA, Conab, ZARC/MAPA e INMET são públicas e gratuitas. Dispensa licenças do Banco Central (SCR/Bacen) no escopo do hackathon.
- **Custo Variável Opcional:** Parceria com agregadores de tribunais (Jusbrasil ou Escavador) para cobrir a cauda longa de varredura.
- **Infraestrutura de IA:** IBM watsonx.ai e watsonx Orchestrate fornecidos no programa de inovação.

### 9.2. Diferencial Defensável da Krill Tech vs Fintechs Puras
Produtos de score agro já operam no mercado (a **TerraMagna lançou a *tmdigital*** em 2025; a **Traive estruturou FIDC digital** com a Syngenta). O diferencial competitivo da Krill Tech **não é inventar um score**, mas sim o seu **relacionamento comercial direto e os dados agronômicos proprietários** gerados a cada venda e aplicação de insumos nos talhões atendidos — algo que nenhum bureau financeiro puro possui.

---

## 10. PROJECT CANVAS DA SOLUÇÃO (SEÇÃO 7.1 DO EDITAL)

| Bloco do Canvas | Especificação da Solução Krill Tech |
| :--- | :--- |
| **Problema & Diagnóstico** | Escalada de pedidos de RJ via Lei 14.112/2020 (apenas 2 anos de LCDPR), desproteção pelo colapso do PSR (2,3%–3,3% em 2025) e efeito cascata demonstrado pelo caso TerraMagna/AgroGalaxy (R$ 28M). |
| **Público-Alvo / Beneficiários** | Times de Crédito, Comercial e Jurídico da Krill Tech, avaliando segmentadamente Produtores Rurais PF (LCDPR/CAR) e Revendas PJ (QSA/CNAE). |
| **Lógica de Funcionamento** | Esteira de 4 Agentes Autônomos (Coletor, AgroClimático com ZARC categórico, Motor de Decisão WoE e Sintetizador watsonx.ai). |
| **Score & Classificação** | Scorecard Heurístico Ponderado (0 a 1000 pts): Processual 30%, Agroclimático 25%, Fiscal 20%, Cadastral 15%, Territorial 10%. Ratings A, B, C e D. |
| **Matriz de Red Flags** | 6 gatilhos objetivos: Dívida Ativa PGFN, CNDT/FGTS, Execução DataJud, CAR/IBAMA, Desvio ZARC e Seca Severa INMET. |
| **Decisão Operacional** | Rating A (padrão), B (120d + monitoramento), C (exigência mandatória de CPR Física/Barter) e D (bloqueio imediato). Ausência de seguro penaliza score sem atuar como veto bloqueante. |
| **Monitoramento Contínuo** | Gatilho imediato de 24h no DataJud, varredura mensal automatizada (PGFN, CNDT, QSA) e acompanhamento sazonal por safra (ZARC e chuvas INMET). |
| **Arquitetura de Negócios** | Fontes públicas abertas a custo zero; infraestrutura IBM watsonx.ai; diferencial centrado nos dados agronômicos proprietários da Krill Tech. |
| **Premissas & Riscos** | Scorecard explicável e defensável (WoE); ressalva da essencialidade de bens no *Stay Period* do STJ mesmo em alienação fiduciária. |
| **Próximos Passos** | Calibração empírica dos pesos com a base histórica de recebíveis Krill Tech e integração direta via webhook ao ERP da empresa. |

---
*Documento elaborado pela equipe participante do Hackathon 2026 — Parceria Krill Tech, PMI-DF e IBM.*
