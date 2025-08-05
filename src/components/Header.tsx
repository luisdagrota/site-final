import { ShoppingCart } from "lucide-react";

export const Header = () => {
  return (
    <>
      <header className="relative bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg flex items-center justify-center neon-glow">
                <ShoppingCart className="w-6 h-6 text-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-neon-purple via-neon-pink to-neon-blue bg-clip-text text-transparent">
                  Digital Store
                </h1>
                <p className="text-sm text-muted-foreground">Produtos digitais premium</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <nav className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-neon-purple transition-colors">
                  Início
                </a>
                <a href="#" className="text-muted-foreground hover:text-neon-purple transition-colors">
                  Produtos
                </a>
                <a href="#" className="text-muted-foreground hover:text-neon-purple transition-colors">
                  Contato
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>
      
      {/* RGB Animated Line */}
      <div className="rgb-line h-1"></div>
    </>
  );
};