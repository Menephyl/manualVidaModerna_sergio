import { Instagram, ExternalLink, Star } from 'lucide-react'

export function TestimonialCard({ profile, imageSrc, onImageError }) {
  return (
    <a
      href={profile.profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="p-4 block justify-center bg-gradient-to-br from-white via-amber-50/30 to-orange-50/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 group border-2 border-amber-100 hover:border-amber-300"
    >
      <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-center lg:gap-10 text-center lg:text-left">
        {/* Coluna da Imagem */}
        <div className="relative mb-8 lg:mb-0 flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
          <img
            src={imageSrc}
            alt={profile.name}
            className="relative w-36 h-36 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-2xl group-hover:border-amber-400 transition-all duration-500 group-hover:scale-110 ring-4 ring-amber-200/50"
            onError={onImageError}
            loading="lazy"
          />
          <div className="absolute -bottom-3 -right-3 bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 rounded-full p-4 shadow-xl group-hover:scale-110 transition-transform duration-300 ring-4 ring-white">
            <Instagram className="w-6 h-6 md:w-7 md:h-7 text-white" />
          </div>
        </div>

        {/* Coluna do Conteúdo */}
        <div className="flex flex-col items-center lg:items-start">
          <h4 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors duration-300">
            {profile.name}
          </h4>

          <p className="text-amber-600 font-bold mb-5 text-base md:text-lg flex items-center gap-2">
            {profile.username}
            <ExternalLink className="w-5 h-5" />
          </p>

          <div className="flex items-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 md:w-7 md:h-7 text-yellow-400 fill-yellow-400" />
            ))}
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 mb-6 border border-amber-100 shadow-md w-full">
            <p className="text-gray-800 italic text-base md:text-lg leading-relaxed max-w-lg font-medium mx-auto lg:mx-0">
              "{profile.testimonial}"
            </p>
          </div>
        </div>
      </div>
    </a>
  );
}