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
          const line = lines[i].trim();
          if (!line) continue; // Pular linhas vazias
          
          // Parse CSV mais robusto para lidar com vírgulas dentro de aspas
          const values = [];
          let current = '';
          let inQuotes = false;
          
          for (let j = 0; j < line.length; j++) {
            const char = line[j];
            if (char === '"') {
              inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
              values.push(current.trim().replace(/^"|"$/g, ''));
              current = '';
            } else {
              current += char;
            }
          }
          values.push(current.trim().replace(/^"|"$/g, '')); // Adicionar último valor
          
          console.log(`Linha ${i}: ${values.length} colunas`, values);
          
          if (values.length >= 6) {
            // Mapeamento das colunas: categoria, nome, descrição, preço, estoque, imagem
            const categoria = values[0] || 'Sem categoria';
            const nome = values[1] || 'Produto sem nome';
            const descricao = values[2] || 'Sem descrição';
            const precoText = values[3] || '0';
            const estoqueText = values[4] || '0';
            const imagem = values[5] || '/placeholder.svg';
            
            const estoque = parseInt(estoqueText.replace(/[^0-9]/g, '')) || 0;
            const preco = parseFloat(precoText.replace(/[^0-9,\.]/g, '').replace(',', '.')) || 0;
            
            const product: Product = {
              categoria,
              nome,
              estoque,
              preco,
              descricao,
              imagem,
              linkCompra: undefined
            };
            
            console.log(`Produto ${i}: ${product.nome}, Estoque: ${estoque}, Preço: ${preco}`);
            
            // Só adicionar produtos com estoque maior que 0
            if (estoque > 0) {
              productsData.push(product);
              console.log(`✅ Produto adicionado: ${product.nome}`);
            } else {
              console.log(`❌ Produto ignorado (estoque ${estoque}): ${product.nome}`);
            }
          } else {
            console.log(`⚠️ Linha ${i} ignorada (${values.length} colunas):`, values);
          }
        }
        
        console.log(`📊 Total de produtos carregados: ${productsData.length}`);
        
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