import { useLang } from '@/i18n/LanguageContext';
import { Phone, MessageCircle } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const CTASection = () => {
  const { t } = useLang();
  const { ref, inView } = useInView();

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-r from-gold-dark via-gold to-gold-light" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--navy)/0.1),transparent_60%)]" />
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className={`text-3xl md:text-4xl font-bold text-primary mb-4 scroll-reveal-scale ${inView ? 'revealed' : ''}`}>
          {t.cta.title}
        </h2>
        <p className={`text-primary/70 text-lg mb-10 max-w-xl mx-auto scroll-reveal ${inView ? 'revealed' : ''}`} style={{ transitionDelay: '100ms' }}>
          {t.hero.subtitle}
        </p>
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 scroll-reveal ${inView ? 'revealed' : ''}`} style={{ transitionDelay: '200ms' }}>
          <a
            href="tel:+21698284858"
            className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground rounded-xl text-xl font-bold hover:bg-navy-light transition-all shadow-lg hover:scale-105 hover-glow"
          >
            <Phone className="w-6 h-6" />
            {t.cta.button}
          </a>
          <a
            href="https://wa.me/21698284858"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-card text-primary rounded-xl text-xl font-bold hover:bg-card/90 transition-all shadow-lg hover:scale-105"
          >
            <MessageCircle className="w-6 h-6 text-emerald-500" />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
