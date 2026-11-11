export type ScaleCategory = 'Maiores' | 'Menores' | 'Pentatônicas' | 'Modos' | 'Blues' | 'Simétricas' | 'Cromáticas' | 'Outras';

export interface Scale {
  id: string;
  name: string;
  root: string;
  type: string;
  notes: string[];
  degrees: string[];
  formula: string;
  category: ScaleCategory;
  application: string;
  sertanejoApplication?: string;
}
