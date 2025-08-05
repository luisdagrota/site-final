import { Header } from "@/components/Header";
import { ProductGrid } from "@/components/ProductGrid";
import { Footer } from "@/components/Footer";
import { useProducts } from "@/hooks/useProducts";

const Index = () => {
  const { products, loading, error } = useProducts();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {error && (
          <div className="container mx-auto px-4 py-8">
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-center">
              <p className="text-destructive font-medium">Erro ao carregar produtos</p>
              <p className="text-muted-foreground text-sm mt-1">
                Verifique sua conexão e tente novamente
              </p>
            </div>
          </div>
        )}
        
        <ProductGrid productsByCategory={products} loading={loading} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
