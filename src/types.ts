export interface Game {
  id: string;
  nome: string;
  plataforma: string;
  qualidade: 'Ótima' | 'Boa' | 'Ruim' | string;
  encarte: boolean;
  box: boolean;
  data: string | null;
  preco: number | null;
  foto1: string;
  foto2: string;
  foto3: string;
  registrationDate: string;
}
