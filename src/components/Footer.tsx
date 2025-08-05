import { MessageCircle, Instagram, Globe } from "lucide-react";

export const Footer = () => {
  return (
    <>
      {/* RGB Animated Line */}
      <div className="rgb-line h-1"></div>
      
      <footer className="bg-card border-t border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo e descrição */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold bg-gradient-to-r from-neon-purple via-neon-pink to-neon-blue bg-clip-text text-transparent">
                Digital Store
              </h3>
              <p className="text-muted-foreground text-sm">
                Sua loja de produtos digitais de confiança. Oferecemos os melhores preços e atendimento personalizado.
              </p>
            </div>

            {/* Links úteis */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">Links Úteis</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-neon-purple transition-colors">
                    Política de Privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-neon-purple transition-colors">
                    Termos de Uso
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-neon-purple transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-neon-purple transition-colors">
                    Suporte
                  </a>
                </li>
              </ul>
            </div>

            {/* Contato */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">Contato</h4>
              <div className="flex flex-col space-y-3">
                <a
                  href="https://wa.me/5561992385559"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-muted-foreground hover:text-neon-green transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">WhatsApp</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-2 text-muted-foreground hover:text-neon-pink transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span className="text-sm">Instagram</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-2 text-muted-foreground hover:text-neon-blue transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">Website</span>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-6 text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Digital Store. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};