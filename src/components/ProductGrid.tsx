import { ProductsByCategory } from '@/types/Product';
import { ProductCard } from './ProductCard';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductGridProps {
  productsByCategory: ProductsByCategory;
  loading: boolean;
}

export const ProductGrid = ({ productsByCategory, loading }: ProductGridProps) => {
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton className="aspect-video w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (Object.keys(productsByCategory).length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Nenhum produto encontrado
          </h2>
          <p className="text-muted-foreground">
            Não conseguimos carregar os produtos no momento. Tente novamente mais tarde.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {Object.entries(productsByCategory).map(([category, products]) => (
        <section key={category} className="mb-12">
          <div className="flex items-center mb-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-neon-purple via-neon-pink to-neon-blue bg-clip-text text-transparent">
              {category}
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-neon-purple/50 to-transparent ml-4" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ProductCard
                key={`${product.nome}-${index}`}
                product={product}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};