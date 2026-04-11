import { useLang } from '@/i18n/LanguageContext';
import { Phone } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const CTASection = () => {
  const { t } = useLang();
  const { ref, inView } = useInView();

  return (
    <section className="py-20 bg-gradient-to-r from-gold-dark via-gold to-gold-light" ref={ref}>
      <div className="container mx-auto px-4 text-center">
        <h2 className={`text-3xl md:text-4xl font-bold text-primary mb-8 scroll-reveal-scale ${inView ? 'revealed' : ''}`}>{t.cta.title}</h2>
        <a
          href="tel:+21698284858"
          className={`inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground rounded-xl text-xl font-bold hover:bg-navy-light transition-all shadow-lg hover:scale-110 hover-glow scroll-reveal ${inView ? 'revealed' : ''}`}
          style={{ transitionDelay: '200ms' }}
        >
          <Phone className="w-6 h-6" />
          {t.cta.button}
        </a>
      </div>
    </section>
  );
};

export default CTASection;
