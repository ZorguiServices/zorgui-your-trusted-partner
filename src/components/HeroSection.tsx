import { useLang } from '@/i18n/LanguageContext';
import logo from '@/assets/logo.png';
import heroBg from '@/assets/hero-bg.jpg';
import { MessageCircle, Phone } from 'lucide-react';
import { useTypingEffect } from '@/hooks/useTypingEffect';

const HeroSection = () => {
  const { t } = useLang();
  const { displayed, done } = useTypingEffect(t.hero.title, 40, 800);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 gradient-hero opacity-90" />
      </div>
      <div className="relative z-10 container mx-auto px-4 text-center">
        <img src={logo} alt="Zorgui Services" className="mx-auto h-32 md:h-44 w-auto mb-8 animate-float drop-shadow-2xl" />
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight max-w-4xl mx-auto min-h-[2.5em]">
          <span className={done ? '' : 'typing-cursor'}>{displayed}</span>
        </h1>
        <p className="text-lg md:text-2xl text-gold mb-10 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '1.5s', animationFillMode: 'both' }}>
          {t.hero.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '2s', animationFillMode: 'both' }}>
          <a href="#contact" className="px-8 py-4 rounded-lg bg-gold text-secondary-foreground font-bold text-lg hover:bg-gold-light transition-all shadow-gold hover:scale-105 hover-glow">
            {t.hero.cta}
          </a>
          <a href="https://wa.me/21698284858" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-lg border-2 border-gold text-gold font-bold text-lg hover:bg-gold/10 transition-all flex items-center gap-2 hover:scale-105">
            <MessageCircle className="w-5 h-5" />
            {t.hero.whatsapp}
          </a>
          <a href="tel:+21698284858" className="px-8 py-4 rounded-lg border-2 border-primary-foreground/30 text-primary-foreground font-bold text-lg hover:bg-primary-foreground/10 transition-all flex items-center gap-2 hover:scale-105">
            <Phone className="w-5 h-5" />
            {t.hero.call}
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
