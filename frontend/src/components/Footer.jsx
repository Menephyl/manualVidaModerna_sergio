import { Instagram, Facebook, Mail, MessageCircle } from 'lucide-react';
import { contactInfo, socialLinks } from '../content.js';

export function Footer() {
  // Constrói o link do WhatsApp a partir do número em content.js
  const whatsappMessage = "Olá! Gostaria de saber mais sobre o Manual da Vida Moderna.";
  const whatsappUrl = `https://wa.me/${contactInfo.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <footer className="bg-gradient-to-r from-amber-800 to-amber-900 text-white py-16 px-4 sm:px-6 lg:px-12 xl:px-20">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        {/* Sobre Nós */}
        <div>
          <h3 className="text-xl font-bold mb-4">Sobre Nós</h3>
          <p className="text-amber-200/80 text-sm leading-relaxed">
            Este projeto nasceu da visão de <strong>Sérgio Dias Filho</strong>, idealizador e autor do e-book, com o objetivo de levar sabedoria prática para a vida moderna.
          </p>
          <p className="text-amber-200/80 text-sm leading-relaxed mt-2">
            A plataforma digital e a experiência de compra foram desenvolvidas por <strong>Yan Menephyl</strong>, desenvolvedor Full Stack.
          </p>
        </div>

        {/* Contato */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contato</h3>
          <div className="flex flex-col items-center md:items-start gap-3">
            <a href={`mailto:manualvidamoderna@gmail.com`} className="flex items-center gap-2 hover:text-amber-300 transition-colors">
              <Mail className="w-5 h-5" />
              <span>manualvidamoderna@gmail.com</span>
            </a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-amber-300 transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span>Fale conosco no WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Redes Sociais */}
        <div>
          <h3 className="text-xl font-bold mb-4">Siga-nos</h3>
          <div className="flex flex-col items-center md:items-start gap-4">
            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-amber-300 transition-colors">
              <Instagram className="w-6 h-6" />
              <span>Instagram do Sérgio</span>
            </a>
            <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-amber-300 transition-colors">
              <Facebook className="w-6 h-6" />
              <span>Página do Desenvolvedor</span>
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-amber-200/70 mt-12 border-t border-amber-200/20 pt-8 text-sm">
        <p>&copy; {new Date().getFullYear()} Sérgio Dias Filho & Yan Menephyl Works. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}