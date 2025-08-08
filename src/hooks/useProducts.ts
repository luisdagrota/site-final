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
          
          if (values.length >= 7) {
            // Mapeamento correto das colunas da planilha:
            // 0: id, 1: name, 2: description, 3: price, 4: category, 5: stock, 6: image_url
            
            const estoqueText = values[5] || '0'; // Coluna "stock"
            const estoque = parseInt(estoqueText.replace(/[^0-9]/g, '')) || 0;
            
            const precoText = values[3] || '0'; // Coluna "price"
            const preco = parseFloat(precoText.replace(/[^0-9,\.]/g, '').replace(',', '.')) || 0;
            
            const product: Product = {
              categoria: values[4] || 'Sem categoria', // Coluna "category"
              nome: values[1] || 'Produto sem nome', // Coluna "name"
              estoque: estoque,
              preco: preco,
              descricao: values[2] || 'Sem descrição', // Coluna "description"
              imagem: values[6] || '/placeholder.svg', // Coluna "image_url"
              linkCompra: undefined // Não usar da planilha
            };
            
            // Debug logs
            console.log(`Produto: ${product.nome}`);
            console.log(`- Estoque: ${estoque} (original: "${estoqueText}")`);
            console.log(`- Preço: ${preco} (original: "${precoText}")`);
            console.log(`- Imagem: ${product.imagem}`);
            
            // Só adicionar produtos com estoque maior que 0
            if (estoque > 0) {
              productsData.push(product);
            } else {
              console.log(`Produto ${product.nome} ignorado por estoque: ${estoque}`);
            }
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