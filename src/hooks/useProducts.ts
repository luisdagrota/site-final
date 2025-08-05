import { useState, useEffect } from 'react';
import { Product, ProductsByCategory } from '@/types/Product';

const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1er-QqJee4-gheiE6jrQziFlbUrDkrb0uc2lO_8jnHSg/export?format=csv&gid=0';

export const useProducts = () => {
  const [products, setProducts] = useState<ProductsByCategory>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(SHEET_CSV_URL);
        const csvText = await response.text();
        
        const lines = csvText.split('\n').filter(line => line.trim());
        const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
        
        const productsData: Product[] = [];
        
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
          
          if (values.length >= 6) {
            const product: Product = {
              categoria: values[0] || 'Sem categoria',
              nome: values[1] || 'Produto sem nome',
              estoque: parseInt(values[2]) || 0,
              preco: parseFloat(values[3]) || 0,
              descricao: values[4] || 'Sem descrição',
              imagem: values[5] || '/placeholder.svg',
              linkCompra: values[6] || undefined
            };
            
            productsData.push(product);
          }
        }
        
        // Agrupar produtos por categoria
        const productsByCategory: ProductsByCategory = {};
        productsData.forEach(product => {
          if (!productsByCategory[product.categoria]) {
            productsByCategory[product.categoria] = [];
          }
          productsByCategory[product.categoria].push(product);
        });
        
        setProducts(productsByCategory);
        setError(null);
      } catch (err) {
        console.error('Erro ao carregar produtos:', err);
        setError('Erro ao carregar produtos');
        
        // Dados de exemplo em caso de erro
        setProducts({
          'Contas': [
            {
              categoria: 'Contas',
              nome: 'EA Sports',
              estoque: 5,
              preco: 29.90,
              descricao: 'Conta EA Sports com jogos',
              imagem: '/placeholder.svg'
            }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};