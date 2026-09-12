export type BorrowerType = 'PF' | 'PJ';

export interface BaseBorrower {
  id: string;
  type: BorrowerType;
  name: string; // Nome PF ou Razão Social PJ
  document: string; // CPF ou CNPJ formatado
  state: string; // UF (ex: MT, GO, MA)
  city: string; // Município (ex: Sorriso, Rio Verde)
  exposureValueBrl: number; // Exposição financeira atual com a Krill Tech (R$)
  createdAt: string;
}

// Produtor Rural Pessoa Física (Art. 48, Lei 11.101/2005 com redação da Lei 14.112/2020)
export interface RuralProducerPF extends BaseBorrower {
  type: 'PF';
  stateRegistration: string; // Inscrição Estadual (IE)
  lcdprYearsProven: number; // Anos de Livro Caixa Digital do Produtor Rural comprovados (min 2 anos para RJ)
  carNumber: string; // Código do CAR no SICAR
  carStatus: 'ATIVO' | 'PENDENTE' | 'SUSPENSO' | 'CANCELADO';
  crop: 'SOJA' | 'MILHO' | 'ALGODAO' | 'CAFE';
  plantedAreaHa: number; // Área plantada em hectares
  plantingDate: string; // Data efetiva do plantio (YYYY-MM-DD)
  hasPsrInsurance: boolean; // Cobertura de Seguro Rural (PSR/MAPA)
  psrInsurer?: string;
  landTenure: 'PROPRIETARIO' | 'ARRENDATARIO' | 'MISTO';
  historicalProductivityBagsPerHa: number;
}

// Agroindústria / Revenda de Insumos Pessoa Jurídica (Requisitos societários padrão)
export interface AgroCompanyPJ extends BaseBorrower {
  type: 'PJ';
  tradeName: string; // Nome Fantasia
  cnae: string; // Código CNAE (ex: 46.83-4/00 - Comércio atacadista de defensivos agrícolas)
  cnaeDescription: string;
  activityYears: number; // Tempo de atividade regular
  shareCapitalBrl: number; // Capital Social
  qsaPartners: {
    name: string;
    role: string;
    cpfCnpj: string;
    entryDate: string;
    recentChangeInLast6Months: boolean;
  }[];
  annualRevenueBrl: number;
  hasRetailNetwork: boolean; // Rede de revendas de insumos (estilo AgroGalaxy)
  activeSupplierCount: number;
}

export type Borrower = RuralProducerPF | AgroCompanyPJ;
