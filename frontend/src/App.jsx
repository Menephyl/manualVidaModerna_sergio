import { useState, useEffect, memo } from 'react'
import { Button } from './components/ui/button.jsx'
import { Input } from './components/ui/input.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card.jsx'
import { Badge } from './components/ui/badge.jsx'
import { BibleVerseCarousel } from './components/BibleVerseCarousel.jsx'
import { InstagramCarousel } from './components/InstagramCarousel.jsx'
import { ScrollReveal } from './components/ScrollReveal.jsx'
import {
  CheckCircle, Star, BookOpen, Users, Heart, Lightbulb, Target, Shield, Sparkles, Zap, Smartphone,
  TrendingUp, X, CreditCard, QrCode, Copy, Instagram, Facebook, Mail, ExternalLink, MessageCircle,
  ArrowRight, Gift, Clock, Download, Award, Loader2, Lock
} from 'lucide-react'
import ebookPdf from './assets/manual_moderno_com_ilustracoes_e_autor.pdf'
import heroIllustration from './assets/hero-illustration.png'
import problemIllustration from './assets/problem-illustration.png'
import transformationIllustration from './assets/transformation-illustration.png'
import ebookCover from './assets/ebook-cover.png'
import { contactInfo, benefits } from '../content.js'
import { PaymentPix } from './components/PaymentPix.jsx'
import { Footer } from './components/Footer.jsx'
import apiClient from './api/api.js'
import { FAQ } from './components/FAQ.jsx'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalPhase, setModalPhase] = useState('input'); // 'input', 'payment', 'success', 'error'
  const [scrolled, setScrolled] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false);
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [paymentError, setPaymentError] = useState(null); // Para guardar mensagens de erro

  // Estados para o pagamento PIX (integrados do PaymentPix.jsx)
  const [pixData, setPixData] = useState(null);

  const openModal = () => setIsModalOpen(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Polling para verificar o status do pagamento PIX
  useEffect(() => {
    if (modalPhase !== 'payment' || !pixData) return;

    const intervalId = setInterval(async () => {
      try {
        const paymentStatus = await apiClient(`/api/payment/${pixData.id}`);
        if (paymentStatus.status === 'approved') {
          setModalPhase('success');
          clearInterval(intervalId);
        }
      } catch (err) {
        console.error("Erro ao verificar status do pagamento:", err);
        // Opcional: poderia mudar para uma fase de erro se a verificação falhar repetidamente
      }
    }, 3000); // Verifica a cada 3 segundos

    return () => clearInterval(intervalId);
  }, [modalPhase, pixData]);

  const handleGeneratePix = async () => {
    if (!buyerName || !buyerEmail) {
      setPaymentError('Por favor, preencha seu nome e e-mail para gerar o PIX.');
      return;
    }
    setPaymentError(null);
    setIsProcessing(true);

    try {
      const data = await apiClient('/api/checkout/pix', {
        method: 'POST',
        body: JSON.stringify({
          email: buyerEmail,
          amount: 12.59, // Valor do produto para teste
        }),
      });
      setPixData(data);
      setModalPhase('payment'); // Muda para a fase de exibição do PIX
    } catch (err) {
      setPaymentError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const closeModalAndReset = () => {
    setIsModalOpen(false);
    setTimeout(() => { // Delay para a animação de fechar
      setModalPhase('input');
      setPaymentError(null);
      setIsProcessing(false);
      setPixData(null);
      setBuyerName('');
      setBuyerEmail('');
    }, 300);
  };

  const benefitIcons = {
    "Sabedoria Ancestral Aplicada": <BookOpen className="w-7 h-7" />,
    "Propósito e Clareza": <Target className="w-7 h-7" />,
    "Relacionamentos Autênticos": <Users className="w-7 h-7" />,
    "Resiliência e Força Interior": <Shield className="w-7 h-7" />,
    "Liderança Servidora": <Heart className="w-7 h-7" />,
    "Transformação Interior": <Lightbulb className="w-7 h-7" />,
  };

  const problemIcons = {
    "Sobrecarga": <Smartphone className="w-8 h-8 text-red-500" />,
    "Relacionamentos": <Heart className="w-8 h-8 text-red-500" />,
    "Falta": <Target className="w-8 h-8 text-red-500" />,
    "Dificuldade": <BookOpen className="w-8 h-8 text-red-500" />,
    "Busca": <Users className="w-8 h-8 text-red-500" />,
    "Sensação": <Zap className="w-8 h-8 text-red-500" />
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header Melhorado com Carrossel de Textos Bíblicos */}
      <header className={`bg-gradient-to-r from-amber-800/90 to-amber-900/90  sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-3'}`}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4 mb-2">
            <div className="flex items-center gap-3">
              <div className="hidden md:flex w-10 h-10 bg-amber-200/20 rounded-lg items-center justify-center">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-tight">
                Manual da Vida Moderna
              </h1>
            </div>
            <Badge variant="secondary" className="bg-amber-100/90 text-amber-900 px-8 py-4 text-sm md:text-base font-semibold shadow-md">
              Por Sérgio Dias Filho
            </Badge>
          </div>

        </div>
      </header>

      {/* Hero Section Melhorado */}
      <ScrollReveal direction="up">
        <BibleVerseCarousel />
        <section className="py-20 md:py-28 lg:py-32 px-4 sm:px-6 lg:px-12 xl:px-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100/40 via-orange-50/30 to-yellow-100/40"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl"></div>

          <div className="max-w-[1400px] mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
              <div className="text-center lg:text-left max-w-2xl lg:max-w-none mx-auto lg:mx-0">
                <Badge className="mb-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-4 py-2 text-sm md:text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center animate-pulse">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Lançamento Especial
                </Badge>

                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900 mb-8 leading-tight">
                  Desvende os Segredos da{' '}
                  <span className="text-amber-600 relative inline-block">
                    <span className="relative z-10">Sabedoria Ancestral</span>
                    <div className="absolute bottom-2 left-0 w-full h-4 bg-amber-200/60 -z-10 rounded-sm"></div>
                  </span>{' '}
                  para uma Vida Moderna Plena
                </h1>

                <p className="text-lg md:text-xl lg:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto lg:mx-0 leading-relaxed">
                  O guia definitivo para navegar pelos desafios do século XXI com propósito, clareza e uma base sólida de princípios atemporais.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-10">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 md:px-10 py-4 md:py-5 text-base md:text-lg font-bold shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto rounded-xl"
                    onClick={openModal}
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Quero Meu Exemplar Agora
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <div className="flex items-center gap-2 text-gray-700 bg-white/80 px-4 py-2 rounded-lg shadow-md">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm md:text-base font-medium">Download Imediato</span>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 text-sm md:text-base">
                  <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-lg shadow-md">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="font-semibold text-gray-800">4.9/5</span>
                    <span className="text-gray-600">(127 avaliações)</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Gift className="w-5 h-5 text-amber-600" />
                    <span>Bônus Exclusivos</span>
                  </div>
                </div>
              </div>

              <div className="relative flex justify-center lg:justify-end">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500  blur-3xl opacity-30 animate-pulse"></div>
                <div className="relative z-10 transform hover:scale-105 transition-transform duration-500 max-w-md xl:max-w-lg">
                  <img
                    src={heroIllustration}
                    loading="lazy"
                    alt="Sabedoria Ancestral e Vida Moderna"
                    className="w-full rounded-3xl shadow-2xl border-4 border-white/50"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* CTA Intermediário 1 Melhorado */}
      <ScrollReveal direction="up" delay={200}>
        <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-12 xl:px-20 bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          </div>
          <div className="max-w-[1200px] mx-auto text-center relative z-10">
            <p className="text-xl md:text-2xl lg:text-3xl font-semibold mb-8">Não perca esta oportunidade única de transformar sua vida!</p>
            <Button
              size="lg"
              variant="primary"
              className="bg-orange-400 cursor-pointer px-10 py-5 text-lg md:text-xl font-bold  hover:transition-all duration-300 transform hover:scale-105 rounded-xl"
              onClick={openModal}
            >
              <Gift className="w-6 h-6 mr-2" />
              Garantir Agora por R$ 46,99
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
          </div>
        </section>
      </ScrollReveal>

      {/* Problem Section Melhorado */}
      <ScrollReveal direction="up" delay={100}>
        <section className="py-20 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-12 xl:px-20 bg-white relative">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-16 lg:mb-20">
              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6">
                Você Se Sente Perdido em Meio ao Caos da Vida Moderna?
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto">
                Muitas pessoas enfrentam esses desafios diariamente
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
              <div className="order-2 lg:order-1 space-y-6">
                {[
                  "Sobrecarga de informações que deixa você ansioso e confuso sobre qual caminho seguir",
                  "Relacionamentos superficiais em um mundo cada vez mais digital e desconectado",
                  "Falta de propósito e direção clara em meio a tantas expectativas e pressões sociais",
                  "Dificuldade em tomar decisões éticas e manter a integridade em um ambiente competitivo",
                  "Busca constante por validação externa em vez de encontrar paz e satisfação interior",
                  "Sensação de vazio mesmo após conquistas materiais e profissionais"
                ].map((problem, index) => (
                  <ScrollReveal key={index} direction="right" delay={index * 100}>
                    <div className="flex items-start gap-5 p-6 md:p-7 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border-l-4 border-red-500 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                      <div className="text-4xl flex-shrink-0 mt-1">{problemIcons[problem.split(' ')[0]]}</div>
                      <p className="text-gray-700 text-base md:text-lg leading-relaxed pt-2">{problem}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <div className="order-1 lg:order-2 relative flex justify-center lg:justify-end">
                <div className="absolute inset-0 bg-gradient-to-r from-red-200 to-orange-200 rounded-full blur-3xl opacity-40"></div>
                <div className="relative z-10 transform hover:scale-105 transition-transform duration-500 max-w-md xl:max-w-lg">
                  <img
                    src={problemIllustration}
                    loading="lazy"
                    alt="Pessoa perdida no caos moderno"
                    className="w-full rounded-3xl shadow-2xl border-4 border-white/50"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Solution Section Melhorado */}
      <ScrollReveal direction="up" delay={200}>
        <section className="py-20 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-12 xl:px-20 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center mb-20 lg:mb-24">
              <div className="relative flex justify-center lg:justify-start">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-300 to-orange-300 rounded-full blur-3xl opacity-40"></div>
                <div className="relative z-10 transform hover:scale-105 transition-transform duration-500 max-w-md xl:max-w-lg">
                  {/* A imagem solutionIllustration.png não foi encontrada, usando heroIllustration como fallback */}
                  <img
                    src={heroIllustration}
                    loading="lazy"
                    alt="Pessoa encontrando clareza e sabedoria"
                    className="w-full rounded-3xl shadow-2xl border-4 border-white/50"
                  />
                </div>
              </div>

              <div className="max-w-2xl mx-auto lg:mx-0">
                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-8">
                  A Solução Está na Sabedoria que Atravessou Milênios
                </h2>
                <p className="text-lg md:text-xl lg:text-2xl text-gray-700 mb-10 leading-relaxed">
                  O "Manual da Vida Moderna" não é apenas mais um livro de autoajuda. É uma ponte entre a sabedoria milenar da Bíblia e os desafios contemporâneos, oferecendo insights práticos e transformadores para sua vida hoje.
                </p>
                <div className="space-y-6">
                  {[
                    "Princípios testados por milênios",
                    "Aplicação prática para o século XXI",
                    "Transformação real e duradoura"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-5 p-5 md:p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                      <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                        <CheckCircle className="w-7 h-7 text-amber-600" />
                      </div>
                      <span className="text-gray-700 text-base md:text-lg font-semibold">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
              {benefits.map((benefit, index) => (
                <ScrollReveal key={index} direction="up" delay={index * 100}>
                  <Card className="text-center border-2 border-amber-200 hover:border-amber-400 hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white h-full rounded-2xl overflow-hidden p-2">
                    <CardHeader className="pb-6 pt-8">
                      <div className="mx-auto w-24 h-24 bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100 rounded-2xl flex items-center justify-center text-amber-600 mb-6 shadow-xl transform hover:rotate-6 transition-transform">
                        {benefitIcons[benefit.title]}
                      </div>
                      <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-8">
                      <CardDescription className="text-gray-600 text-base md:text-lg leading-relaxed">
                        {benefit.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* CTA Intermediário 2 Melhorado */}
      <ScrollReveal direction="up" delay={100}>
        <section className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 xl:px-20 bg-white border-y-4 border-amber-300 shadow-lg">
          <div className="max-w-[1200px] mx-auto text-center">
            <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-8 lg:mb-10">Transforme sua vida hoje mesmo!</p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-10 py-5 text-lg md:text-xl font-bold shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 transform hover:scale-105 rounded-xl"
              onClick={openModal}
            >
              <BookOpen className="w-6 h-6 mr-2" />
              Adquirir Agora
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
          </div>
        </section>
      </ScrollReveal>

      {/* What You'll Learn Section Melhorado */}
      <ScrollReveal direction="up" delay={200}>
        <section className="py-20 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-12 xl:px-20 bg-gradient-to-br from-white to-gray-50 relative">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-16 lg:mb-20">
              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6">
                O Que Você Vai Descobrir
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto">
                Conteúdo transformador que vai impactar sua vida
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-start">
              <div className="space-y-6">
                {[
                  "Como decifrar os códigos da existência e entender os padrões que moldam sua vida",
                  "Estratégias de liderança e gestão baseadas nos grandes líderes bíblicos",
                  "Como navegar pelos ciclos de sucesso e fracasso com sabedoria e resiliência",
                  "Segredos para construir relacionamentos autênticos e duradouros",
                  "Como encontrar propósito e sentido em meio ao caos moderno",
                  "Técnicas para despertar sua consciência social e agir para a justiça",
                  "Métodos para superar desafios internos e desenvolver força interior",
                  "Princípios éticos para viver com integridade no dia a dia",
                  "Como cultivar esperança e renovação constantes em sua jornada"
                ].map((item, index) => (
                  <ScrollReveal key={index} direction="left" delay={index * 50}>
                    <div className="flex items-start gap-5 p-6 md:p-7 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-l-4 border-green-500 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                      <CheckCircle className="w-7 h-7 md:w-8 md:h-8 text-green-500 flex-shrink-0 mt-1" />
                      <p className="text-gray-700 text-base md:text-lg leading-relaxed pt-2">{item}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <div className="relative flex justify-center lg:justify-end">
                <div className="absolute inset-0 bg-gradient-to-r from-green-200 to-blue-200 rounded-full blur-3xl opacity-40"></div>
                <div className="relative z-10 transform hover:scale-105 transition-transform duration-500 max-w-md xl:max-w-lg">
                  <img
                    src={transformationIllustration}
                    loading="lazy"
                    alt="Transformação e crescimento pessoal"
                    className="w-full rounded-3xl shadow-2xl border-4 border-white/50"
                  />
                  <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-2xl hidden lg:block animate-bounce">
                    <TrendingUp className="w-8 h-8 text-green-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* E-book Preview Section Melhorado */}
      <ScrollReveal direction="up" delay={100}>
        <section className="py-20 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-12 xl:px-20 bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-300/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-300/30 rounded-full blur-3xl"></div>

          <div className="max-w-[1400px] mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
              <div className="relative flex justify-center lg:justify-start">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-3xl blur-3xl opacity-30 animate-pulse"></div>
                <div className="relative z-10 transform hover:scale-105 transition-transform duration-500 max-w-sm xl:max-w-md">
                  <img
                    src={ebookCover}
                    loading="lazy"
                    alt="Capa do Manual da Vida Moderna"
                    className="w-full rounded-3xl shadow-2xl border-4 border-white/50"
                  />
                </div>
              </div>

              <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-8">
                  Seu Guia Completo para uma Vida com Propósito
                </h2>
                <p className="text-lg md:text-xl lg:text-2xl text-gray-700 mb-10 leading-relaxed">
                  Mais de 200 páginas de sabedoria prática, divididas em capítulos organizados que abordam desde os fundamentos da existência até as estratégias para uma vida plena no século XXI.
                </p>

                <div className="grid grid-cols-2 gap-5 md:gap-7 mb-10 max-w-md mx-auto lg:mx-0">
                  {[
                    { number: "9", label: "Capítulos" },
                    { number: "200+", label: "Páginas" },
                    { number: "25+", label: "Ilustrações" },
                    { number: "∞", label: "Valor" }
                  ].map((stat, index) => (
                    <div key={index} className="text-center p-4 md:p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-amber-200">
                      <div className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">{stat.number}</div>
                      <div className="text-xs md:text-sm text-gray-600 font-semibold">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 md:px-10 py-4 md:py-5 text-base md:text-lg font-bold shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto rounded-xl"
                  onClick={openModal}
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Quero Começar Agora
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Instagram Carousel Section Melhorado */}
      <ScrollReveal direction="up" delay={200}>
        <section className="py-20 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-12 xl:px-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-16 lg:mb-20">
              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6">
                O Que Nossos Leitores Estão Dizendo
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-600">
                Depoimentos reais de pessoas que transformaram suas vidas
              </p>
            </div>
            <div className="max-w-5xl mx-auto">
              <InstagramCarousel />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* FAQ Section */}
      <ScrollReveal direction="up" delay={100}>
        <FAQ />
      </ScrollReveal>

      {/* CTA Final Section Melhorado */}
      <ScrollReveal direction="up" delay={100}>
        <section className="py-20 md:py-28 lg:py-32 px-4 sm:px-6 lg:px-12 xl:px-20 bg-gradient-to-r from-amber-600 via-amber-700 to-orange-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="max-w-[1200px] mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 lg:mb-10">
              Transforme Sua Vida Hoje Mesmo
            </h2>
            <p className="text-xl md:text-2xl lg:text-3xl mb-12 lg:mb-14 opacity-95 leading-relaxed">
              Não deixe para amanhã a oportunidade de descobrir os segredos para uma vida plena e com propósito.
            </p>

            <div className="relative max-w-2xl mx-auto">
              {/* Caixa de preço com z-base */}
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-10 lg:p-12 mb-6 border-2 border-white/20 shadow-2xl z-10 relative">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 opacity-90">De R$ 97,00 por apenas</div>
                <div className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 bg-gradient-to-r from-white to-amber-100 bg-clip-text text-transparent">
                  R$ 46,99
                </div>
                <div className="text-lg md:text-xl lg:text-2xl opacity-90 flex items-center justify-center gap-2">
                  <Clock className="w-5 h-5 lg:w-6 lg:h-6" />
                  Oferta por tempo limitado
                </div>
              </div>

              {/* Botão centralizado abaixo da caixa de preço, com z acima */}
              <div className="mt-6 z-20 relative flex justify-center">
                <Button
                  size="lg"
                  className="bg-black text-white hover:bg-gray-900 px-12 md:px-16 lg:px-20 py-4 md:py-5  md:text-2xl font-bold shadow-2xl hover:shadow-black/40 transition-all duration-300 transform hover:scale-105 rounded-2xl"
                  onClick={openModal}
                >
                  <Gift className="w-6 h-6 mr-3" />
                  Garantir Meu Exemplar
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 text-sm md:text-base max-w-4xl mx-auto mt-12">
              <div className="flex flex-col items-center gap-2 bg-white/10 px-4 py-3 rounded-lg backdrop-blur-sm">
                <CheckCircle className="w-6 h-6" />
                <span>Acesso Imediato</span>
              </div>
              <div className="flex flex-col items-center gap-2 bg-white/10 px-4 py-3 rounded-lg backdrop-blur-sm">
                <Download className="w-6 h-6" />
                <span>Download em PDF</span>
              </div>
              <div className="flex flex-col items-center gap-2 bg-white/10 px-4 py-3 rounded-lg backdrop-blur-sm">
                <Award className="w-6 h-6" />
                <span>Garantia de Satisfação</span>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Modal de Pagamento */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={(e) => e.target === e.currentTarget && closeModalAndReset()}
        >
          <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-md w-full max-h-[95vh] overflow-y-auto shadow-2xl border-2 border-amber-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                {modalPhase === 'success' ? 'Pagamento Aprovado!' : 'Adquirir Manual'}
              </h3>
              <Button
                onClick={closeModalAndReset}
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full"
              >
                <X className="w-5 h-5 text-gray-600" />
              </Button>
            </div>

            {/* --- FASE 1: INPUT DE DADOS --- */}
            {modalPhase === 'input' && (
              <div className="space-y-3">
                <div className="space-y-3">
                  <Input type="text" placeholder="Nome Completo" value={buyerName} onChange={(e) => setBuyerName(e.target.value)} required />
                  <Input type="email" placeholder="Seu melhor e-mail" value={buyerEmail} onChange={(e) => setBuyerEmail(e.target.value)} required />
                </div>

                {paymentError && <p className="text-sm text-red-600 text-center">{paymentError}</p>}

                <Button onClick={handleGeneratePix} disabled={isProcessing} className="w-full bg-green-600 hover:bg-green-700 text-base py-2.5 h-auto">
                  {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : '1. Pagar com PIX'}
                </Button>

                <div className="flex items-center text-center my-3">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="flex-shrink mx-4 text-sm font-medium text-gray-500">OU</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <Button asChild size="lg" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold text-base py-2.5 h-auto">
                  <a href="https://mpago.la/1VUrLsp" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                    <CreditCard className="mr-2 h-5 w-5" />
                    2. Pagar com Cartão ou Saldo
                  </a>
                </Button>

                <div className="flex items-center justify-center gap-2 pt-2 text-xs text-gray-500">
                  <Lock className="w-3 h-3" />
                  <span>Ambiente 100% seguro. Pagamento processado pelo Mercado Pago.</span>
                </div>
              </div>
            )}

            {/* --- FASE 2: EXIBIÇÃO DO PIX --- */}
            {modalPhase === 'payment' && <PaymentPix pixData={pixData} />}

            {/* --- FASE 3: SUCESSO --- */}
            {modalPhase === 'success' && (
              <div className="text-center space-y-5 p-4">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-2" />
                <p className="text-lg text-gray-800">Seu pagamento foi confirmado com sucesso!</p>
                <p className="text-sm text-gray-600">Clique no botão abaixo para baixar seu e-book.</p>
                <Button asChild size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold">
                  <a href={ebookPdf} download="manual-vida-moderna.pdf" className="flex items-center justify-center">
                    <Download className="mr-2 h-5 w-5" />
                    Baixar meu E-book
                  </a>
                </Button>
                <p className="text-xs text-gray-500 pt-2">Uma cópia também será enviada para o seu e-mail.</p>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />

    </div>
  )
}

export default App
