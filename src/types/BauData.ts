export interface BauData {
    id: string;
    nome: string;
    itens: {
      nome: string;
      quantidade: number;
    }[];
  }