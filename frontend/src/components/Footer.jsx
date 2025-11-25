import { Instagram, Facebook, Heart } from 'lucide-react'
import { socialLinks } from '../content.js'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer 
      className="bg-gray-900 text-white border-t-4 border-amber-500"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          {/* Coluna 1: Sobre */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold text-amber-400 mb-4">Manual da Vida Moderna</h3>
            <p className="text-gray-400 text-sm">
              Um guia prático com princípios bíblicos para os desafios do século XXI. Transforme sua perspectiva e encontre propósito.
            </p>
          </div>

          {/* Coluna 2: Links Úteis */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold text-amber-400 mb-4">Links Úteis</h3>
            <ul className="space-y-3">
              <li>
                <a href="#sobre" className="text-gray-300 hover:text-amber-400 transition-colors duration-300">
                  Sobre Nós
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Redes Sociais */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold text-amber-400 mb-4">Siga-nos</h3>
            <div className="flex justify-center md:justify-start space-x-5">
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-300 hover:text-amber-400 transition-transform duration-300 hover:scale-110">
                <Instagram size={24} />
              </a>
              <a href={socialLinks.threads} target="_blank" rel="noopener noreferrer" aria-label="Threads" className="text-gray-300 hover:text-amber-400 transition-colors duration-300 font-bold text-xl">
                @
              </a>
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-300 hover:text-amber-400 transition-transform duration-300 hover:scale-110">
                <Facebook size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} Manual da Vida Moderna. Todos os direitos reservados.
          </p>
          <p className="text-sm text-gray-500 mt-2 flex items-center justify-center gap-2">
            Desenvolvido com <Heart className="w-4 h-4 text-red-500" /> por Sérgio Dias Filho e Yan Menephyl Works
          </p>
        </div>
      </div>
    </footer>
  )
}