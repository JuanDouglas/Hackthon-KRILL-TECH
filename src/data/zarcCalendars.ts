export interface ZarcWindowRule {
  municipality: string;
  state: string;
  crop: 'SOJA' | 'MILHO' | 'ALGODAO' | 'CAFE';
  portariaMapa: string;
  cycleSafra: string;
  windowStart: string; // MM-DD
  windowEnd: string; // MM-DD
  toleratedLapseDays: number; // dias de tolerância antes de red flag crítica
  favorableSoilTypes: string[];
}

export const ZARC_OFFICIAL_CALENDAR: ZarcWindowRule[] = [
  {
    municipality: 'Sorriso',
    state: 'MT',
    crop: 'SOJA',
    portariaMapa: 'Portaria MAPA nº 312/2024 (ZARC Soja MT Safra 2024/2025)',
    cycleSafra: '2024/2025',
    windowStart: '09-16', // 16 de setembro
    windowEnd: '12-15', // 15 de dezembro
    toleratedLapseDays: 7,
    favorableSoilTypes: ['Tipo 2 (Argiloso)', 'Tipo 3 (Muito Argiloso)'],
  },
  {
    municipality: 'Rio Verde',
    state: 'GO',
    crop: 'SOJA',
    portariaMapa: 'Portaria MAPA nº 289/2024 (ZARC Soja GO Safra 2024/2025)',
    cycleSafra: '2024/2025',
    windowStart: '10-01', // 01 de outubro
    windowEnd: '12-20', // 20 de dezembro
    toleratedLapseDays: 5,
    favorableSoilTypes: ['Tipo 2', 'Tipo 3'],
  },
  {
    municipality: 'Balsas',
    state: 'MA',
    crop: 'MILHO',
    portariaMapa: 'Portaria MAPA nº 345/2024 (ZARC Milho 1ª Safra MA)',
    cycleSafra: '2024/2025',
    windowStart: '10-15', // 15 de outubro
    windowEnd: '12-31', // 31 de dezembro
    toleratedLapseDays: 6,
    favorableSoilTypes: ['Tipo 1 (Arenoso)', 'Tipo 2 (Médio)'],
  },
  {
    municipality: 'Patrocínio',
    state: 'MG',
    crop: 'CAFE',
    portariaMapa: 'Portaria MAPA nº 210/2024 (ZARC Café Arábica MG)',
    cycleSafra: '2024/2025',
    windowStart: '10-01', // 01 de outubro
    windowEnd: '01-15', // 15 de janeiro
    toleratedLapseDays: 10,
    favorableSoilTypes: ['Tipo 2', 'Tipo 3'],
  },
  {
    municipality: 'Luís Eduardo Magalhães',
    state: 'BA',
    crop: 'ALGODAO',
    portariaMapa: 'Portaria MAPA nº 378/2024 (ZARC Algodão BA)',
    cycleSafra: '2024/2025',
    windowStart: '11-20', // 20 de novembro
    windowEnd: '01-10', // 10 de janeiro
    toleratedLapseDays: 5,
    favorableSoilTypes: ['Tipo 2', 'Tipo 3'],
  },
];

export function getZarcRule(city: string, crop: string): ZarcWindowRule | undefined {
  return ZARC_OFFICIAL_CALENDAR.find(
    (z) => z.municipality.toLowerCase() === city.toLowerCase() && z.crop.toLowerCase() === crop.toLowerCase()
  ) || ZARC_OFFICIAL_CALENDAR[0];
}
