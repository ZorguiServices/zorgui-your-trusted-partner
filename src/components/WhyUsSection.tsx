import { useLang } from '@/i18n/LanguageContext';
import { Zap, Award, ArrowRight, ShieldCheck } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const WhyUsSection = () => {
  const { t } = useLang();
  const { ref, inView } = useInView();

  const items = [
    { icon: Zap, title: t.whyUs.speed, desc: t.whyUs.speedDesc, delay: '0ms' },
    { icon: Award, title: t.whyUs.expertise, desc: t.whyUs.expertiseDesc, delay: '100ms' },
    { icon: ArrowRight, title: t.whyUs.followUp, desc: t.whyUs.followUpDesc, delay: '200ms' },
    { icon: ShieldCheck, title: t.whyUs.privacy, desc: t.whyUs.privacyDesc, delay: '300ms' },
  ];

  return (
    <section id="why-us" className="py-20 gradient-section" ref={ref}>
      <div className="container mx-auto px-4">
        <h2 className={`text-3xl md:text-4xl font-bold text-center text-primary mb-12 scroll-reveal ${inView ? 'revealed' : ''}`}>
          {t.whyUs.title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className={`bg-card rounded-xl p-6 text-center shadow-card hover-lift hover-border-gold ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: item.delay }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                <item.icon className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
