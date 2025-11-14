import { MessageCircle } from 'lucide-react'

export function WhatsAppButton() {
  const phoneNumber = "+554497164827"
  const message = "Olá! Gostaria de saber mais sobre o Manual da Vida Moderna."
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-6 z-50 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full p-4 md:p-5 shadow-2xl hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-110 animate-bounce hover:animate-none group"
      style={{ bottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}
      aria-label="Fale conosco no WhatsApp"
    >
      <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
      <span className="sr-only">WhatsApp</span>
      <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
        !
      </div>
      <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-gray-900 text-white text-sm px-5 py-3 rounded-lg whitespace-nowrap shadow-lg">
          Fale conosco
          <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
        </div>
      </div>
    </a>
  )
}
