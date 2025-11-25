import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './ui/button' // Importando o componente Button
import { TestimonialCard } from './TestimonialCard' // 1. Importar o novo componente

// Importe as imagens diretamente para que o bundler (Vite/Webpack) possa processá-las
import gabrielImage from '../assets/gabriel.jpg';
import pedroImage from '../assets/pedro.jpg';
import mustafaImage from '../assets/mustafa.jpg';
import analauraImage from '../assets/analaura.jpg';

const instagramProfiles = [
  {
    username: "@gabs7fss",
    name: "Gabriel",
    profileUrl: "https://www.instagram.com/gabs7fss",
    image: gabrielImage,
    fallbackImage: "https://ui-avatars.com/api/?name=Gabriel&background=FFB84D&color=fff&size=256&bold=true&font-size=0.5",
    testimonial: "Um livro transformador que conecta sabedoria milenar com a vida moderna. Recomendo a todos que buscam propósito!"
  },
  {
    username: "@pedro_bianquini",
    name: "Pedro Bianquini",
    profileUrl: "https://www.instagram.com/pedro_bianquini",
    image: pedroImage,
    fallbackImage: "https://ui-avatars.com/api/?name=Pedro+Bianquini&background=FFB84D&color=fff&size=256&bold=true&font-size=0.4",
    testimonial: "Leitura essencial para quem busca propósito e clareza na vida. Os princípios bíblicos aplicados são incríveis!"
  },
  {
    username: "@mustafat.humed",
    name: "Mustafa Humed",
    profileUrl: "https://www.instagram.com/mustafat.humed",
    image: mustafaImage,
    testimonial: "Princípios atemporais aplicados aos desafios do século XXI. Este manual mudou minha perspectiva sobre sucesso!"
  },
  {
    username: "@analaurabatistaa_",
    name: "Ana Laura Batista",
    profileUrl: "https://www.instagram.com/analaurabatistaa_/",
    image: analauraImage,
    fallbackImage: "https://ui-avatars.com/api/?name=Ana+Laura&background=FFB84D&color=fff&size=256&bold=true&font-size=0.5",
    testimonial: "Recomendo este manual para todos que buscam uma vida com significado. Transformador e prático!"
  }
]

// 2. Definir constantes para "números mágicos"
const AUTOPLAY_INTERVAL = 5000;

export function InstagramCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [imageErrors, setImageErrors] = useState({})

  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % instagramProfiles.length)
    }, AUTOPLAY_INTERVAL)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + instagramProfiles.length) % instagramProfiles.length)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % instagramProfiles.length)
  }

  const goToSlide = (index) => {
    setIsAutoPlaying(false)
    setCurrentIndex(index)
  }

  const handleImageError = (index) => {
    setImageErrors(prev => ({ ...prev, [index]: true }))
  }

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <div className="overflow-hidden rounded-3xl shadow-2xl">
        <div 
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {instagramProfiles.map((profile, index) => (
            <div  className="min-w-full  bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
              {/* 3. Usar o novo componente TestimonialCard */}
              <TestimonialCard
                key={profile.username}
                profile={profile}
                imageSrc={imageErrors[index] ? profile.fallbackImage : profile.image}
                onImageError={() => handleImageError(index)}
              />
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center items-center gap-4 mt-10">
        <Button
          onClick={goToPrevious}
          variant="outline"
          size="icon"
          className="h-14 w-14 rounded-full bg-white hover:bg-amber-50 text-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 border-2 border-amber-200 hover:border-amber-400"
          aria-label="Perfil anterior"
        >
          <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
        </Button>
        
        <div className="flex gap-3">
          {instagramProfiles.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-12 bg-amber-600 shadow-lg'
                  : 'w-3 bg-amber-300 hover:bg-amber-400'
              }`}
              aria-label={`Ir para perfil ${index + 1}`}
            />
          ))}
        </div>
        
        <Button
          onClick={goToNext}
          variant="outline"
          size="icon"
          className="h-14 w-14 rounded-full bg-white hover:bg-amber-50 text-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 border-2 border-amber-200 hover:border-amber-400"
          aria-label="Próximo perfil"
        >
          <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
        </Button>
      </div>
    </div>
  )
}
