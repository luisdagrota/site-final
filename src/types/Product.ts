export interface Product {
  categoria: string;
  nome: string;
  estoque: number;
  preco: number;
  descricao: string;
  imagem: string;
  linkCompra?: string;
}

export interface ProductsByCategory {
  [category: string]: Product[];
}