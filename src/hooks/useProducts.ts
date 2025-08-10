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
        
        console.log('🔍 CSV completo:', csvText);
        
        const lines = csvText.split('\n').filter(line => line.trim());
        console.log(`📝 Total de linhas: ${lines.length}`);
        
        if (lines.length <= 1) {
          console.error('❌ CSV vazio ou só tem header!');
          throw new Error('CSV vazio');
        }
        
        // Header: id,name,description,price,category,stock,image_url
        console.log('🔍 Header:', lines[0]);
        
        const productsData: Product[] = [];
        
        // Processar cada linha (pulando header linha 0)
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue;
          
          console.log(`🔍 Processando linha ${i}:`, line);
          
          // Parse CSV simples por vírgula
          const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
          
          console.log(`📊 Valores parseados (${values.length} colunas):`, values);
          
          if (values.length >= 7) {
            // Estrutura real: id,name,description,price,category,stock,image_url
            const id = values[0] || '';
            const nome = values[1] || 'Produto sem nome';
            const descricao = values[2] || 'Sem descrição';
            const precoText = values[3] || '0';
            const categoria = values[4] || 'Sem categoria';
            const estoqueText = values[5] || '0';
            const imagem = values[6] || '/placeholder.svg';
            
            // Converter estoque e preço
            const estoque = parseInt(estoqueText.toString().replace(/[^0-9]/g, '')) || 0;
            const preco = parseFloat(precoText.toString().replace(/[^0-9,\.]/g, '').replace(',', '.')) || 0;
            
            console.log(`✅ Produto encontrado: ${nome}, Estoque: ${estoque}, Preço: ${preco}`);
            
            const product: Product = {
              categoria,
              nome,
              estoque,
              preco,
              descricao,
              imagem,
              linkCompra: undefined
            };
            
            // Adicionar todos os produtos (mesmo sem estoque para debug)
            productsData.push(product);
            console.log(`➕ Produto adicionado: ${product.nome}`);
          } else {
            console.log(`⚠️ Linha ${i} ignorada (${values.length} colunas insuficientes)`);
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
          'Games': [
            {
              categoria: 'Games',
              nome: 'EA Sports FC 25',
              estoque: 12,
              preco: 35.99,
              descricao: 'Conta Steam com EA Sports FC 25',
              imagem: 'https://images.kinguin.net/yt/carousel-main/vi/pBM2xyco_Kg/maxresdefault.jpg'
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