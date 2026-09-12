import { RuralProducerPF, AgroCompanyPJ, Borrower } from '../types/borrower';

export const MOCK_CASES: Borrower[] = [
  {
    id: 'case-pf-sorriso',
    type: 'PF',
    name: 'João Silveira Bastos',
    document: '418.902.771-34',
    stateRegistration: '13.442.891-0',
    state: 'MT',
    city: 'Sorriso',
    exposureValueBrl: 2450000,
    createdAt: '2022-04-10',
    lcdprYearsProven: 3, // Elegível para RJ via LCDPR (Art. 48 Lei 11.101 alterado pela Lei 14.112)
    carNumber: 'MT-5107925-8821.9932.1102.3382',
    carStatus: 'ATIVO',
    crop: 'SOJA',
    plantedAreaHa: 1420,
    plantingDate: '2025-01-04', // FORA DA JANELA ZARC (Janela Sorriso encerra em 15/12) -> +20 dias de atraso
    hasPsrInsurance: false, // Descoberto pelo colapso do PSR (cobriu apenas 2,3%-3,3% da área em 2025)
    landTenure: 'PROPRIETARIO',
    historicalProductivityBagsPerHa: 54, // Média regional Conab: 61 sc/ha
  } as RuralProducerPF,

  {
    id: 'case-pj-rio-verde',
    type: 'PJ',
    name: 'Agrobov Distribuição de Insumos & Cereais Ltda',
    tradeName: 'Agrobov Insumos (Rede Revendas)',
    document: '29.384.112/0001-89',
    state: 'GO',
    city: 'Rio Verde',
    exposureValueBrl: 5800000, // Exposição elevada Krill Tech (estilo cascata AgroGalaxy / TerraMagna)
    createdAt: '2021-06-15',
    cnae: '46.83-4/00',
    cnaeDescription: 'Comércio atacadista de defensivos agrícolas, adubos e fertilizantes',
    activityYears: 4, // > 2 anos: elegível para Recuperação Judicial societária
    shareCapitalBrl: 8500000,
    annualRevenueBrl: 64000000,
    hasRetailNetwork: true,
    activeSupplierCount: 18,
    qsaPartners: [
      {
        name: 'Roberto Vilela Antunes',
        role: 'Sócio-Administrador (Entrada recente)',
        cpfCnpj: '***.441.201-**',
        entryDate: '2024-10-18', // Alteração brusca de controle há 5 meses
        recentChangeInLast6Months: true,
      },
      {
        name: 'Goiás Capital Agro Fundo de Investimento',
        role: 'Sócio Investidor',
        cpfCnpj: '33.102.991/0001-12',
        entryDate: '2021-06-15',
        recentChangeInLast6Months: false,
      },
    ],
  } as AgroCompanyPJ,

  {
    id: 'case-pf-balsas',
    type: 'PF',
    name: 'Carlos Eduardo Meneghetti',
    document: '622.189.403-12',
    stateRegistration: '12.981.332-9',
    state: 'MA',
    city: 'Balsas',
    exposureValueBrl: 1650000,
    createdAt: '2020-08-20',
    lcdprYearsProven: 5,
    carNumber: 'MA-2101400-0912.4412.8831.0021',
    carStatus: 'PENDENTE', // Irregularidade ambiental / sobreposição de reserva legal
    crop: 'MILHO',
    plantedAreaHa: 980,
    plantingDate: '2024-11-28', // Dentro da janela ZARC Balsas (encerra 31/12)
    hasPsrInsurance: false,
    landTenure: 'MISTO',
    historicalProductivityBagsPerHa: 98, // Média regional Conab: 104 sc/ha
  } as RuralProducerPF,

  {
    id: 'case-pf-patrocinio',
    type: 'PF',
    name: 'Mariana Albuquerque Guimarães',
    document: '319.445.606-55',
    stateRegistration: '06.551.902-1',
    state: 'MG',
    city: 'Patrocínio',
    exposureValueBrl: 3200000,
    createdAt: '2018-09-10',
    lcdprYearsProven: 7,
    carNumber: 'MG-3148103-7721.5541.9902.1144',
    carStatus: 'ATIVO',
    crop: 'CAFE',
    plantedAreaHa: 450,
    plantingDate: '2024-10-25', // Dentro da janela ideal ZARC Café
    hasPsrInsurance: true, // Produtora protegida com apólice ativa
    psrInsurer: 'Brasilseg / BB Seguros',
    landTenure: 'PROPRIETARIO',
    historicalProductivityBagsPerHa: 42, // Acima da média Conab Cerrado Mineiro (36 sc/ha)
  } as RuralProducerPF,
];

export function getCaseById(id: string): Borrower {
  return MOCK_CASES.find((c) => c.id === id) || MOCK_CASES[0];
}
