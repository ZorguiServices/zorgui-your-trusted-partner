import { useLang } from '@/i18n/LanguageContext';
import logo from '@/assets/logo.png';
import heroBg from '@/assets/hero-bg.jpg';
import { MessageCircle, Phone, ArrowRight } from 'lucide-react';
import { useTypingEffect } from '@/hooks/useTypingEffect';

const HeroSection = () => {
  const { t } = useLang();
  const { displayed, done } = useTypingEffect(t.hero.title, 40, 800);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover scale-105" width={1920} height={1080} />
        <div className="absolute inset-0 gradient-hero opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--navy-dark)/0.2)_100%)]" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 start-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 end-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <img src={logo} alt="Zorgui Services" className="mx-auto h-28 md:h-40 w-auto mb-8 animate-float drop-shadow-2xl" />
        
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight max-w-4xl mx-auto min-h-[2.5em]">
          <span className={done ? '' : 'typing-cursor'}>{displayed}</span>
        </h1>
        
        <p className="text-lg md:text-2xl text-gold mb-12 max-w-2xl mx-auto animate-fade-in-up font-medium" style={{ animationDelay: '1.5s', animationFillMode: 'both' }}>
          {t.hero.subtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '2s', animationFillMode: 'both' }}>
          <a href="#contact" className="group px-8 py-4 rounded-xl bg-gold text-secondary-foreground font-bold text-lg hover:bg-gold-light transition-all shadow-gold hover:scale-105 hover-glow flex items-center gap-2">
            {t.hero.cta}
            <ArrowRight className="w-5 h-5 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </a>
          <a href="https://wa.me/21698284858" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-xl border-2 border-gold text-gold font-bold text-lg hover:bg-gold/10 transition-all flex items-center gap-2 hover:scale-105">
            <MessageCircle className="w-5 h-5" />
            {t.hero.whatsapp}
          </a>
          <a href="tel:+21698284858" className="px-8 py-4 rounded-xl border-2 border-primary-foreground/30 text-primary-foreground font-bold text-lg hover:bg-primary-foreground/10 transition-all flex items-center gap-2 hover:scale-105">
            <Phone className="w-5 h-5" />
            {t.hero.call}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-3 bg-gold rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
