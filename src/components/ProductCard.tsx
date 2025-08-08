import { Product } from '@/types/Product';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ShoppingCart, Package, X } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const handleBuyClick = () => {
    // SEMPRE redirecionar para WhatsApp, nunca usar o linkCompra da planilha
    const whatsappNumber = '5561992385559';
    const message = `Quero o produto ${product.nome}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="product-card h-full flex flex-col overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow duration-300">
          <div className="aspect-video relative overflow-hidden">
            <img
              src={product.imagem}
              alt={product.nome}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                console.log(`Erro ao carregar imagem: ${product.imagem}`);
                e.currentTarget.src = '/placeholder.svg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          <CardHeader className="flex-grow">
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg font-semibold line-clamp-2 text-foreground">
                {product.nome}
              </CardTitle>
              <Badge 
                variant={product.estoque > 0 ? "default" : "destructive"}
                className="ml-2 flex-shrink-0"
              >
                <Package className="w-3 h-3 mr-1" />
                {product.estoque}
              </Badge>
            </div>
            
            <CardDescription className="text-muted-foreground line-clamp-3 text-sm">
              {product.descricao}
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="text-2xl font-bold text-neon-purple">
              {formatPrice(product.preco)}
            </div>
          </CardContent>

          <CardFooter className="pt-0">
            <div className="w-full text-center text-sm text-muted-foreground">
              Clique para ver detalhes
            </div>
          </CardFooter>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-neon-purple">
            {product.nome}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6">
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <img
              src={product.imagem}
              alt={product.nome}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/placeholder.svg';
              }}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-neon-purple">
                {formatPrice(product.preco)}
              </div>
              <Badge 
                variant={product.estoque > 0 ? "default" : "destructive"}
                className="text-sm"
              >
                <Package className="w-4 h-4 mr-1" />
                Estoque: {product.estoque}
              </Badge>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Descrição</h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {product.descricao}
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleBuyClick}
                disabled={product.estoque === 0}
                className="flex-1 bg-gradient-to-r from-neon-purple to-neon-pink hover:from-neon-pink hover:to-neon-purple text-primary-foreground font-semibold neon-glow transition-all duration-300"
                size="lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {product.estoque > 0 ? 'Comprar Agora' : 'Esgotado'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};