import { useLang } from '@/i18n/LanguageContext';
import { Zap, Award, ArrowRight, ShieldCheck } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const WhyUsSection = () => {
  const { t } = useLang();
  const { ref, inView } = useInView();

  const items = [
    { icon: Zap, title: t.whyUs.speed, desc: t.whyUs.speedDesc, gradient: 'from-blue-500/10 to-blue-600/5' },
    { icon: Award, title: t.whyUs.expertise, desc: t.whyUs.expertiseDesc, gradient: 'from-amber-500/10 to-amber-600/5' },
    { icon: ArrowRight, title: t.whyUs.followUp, desc: t.whyUs.followUpDesc, gradient: 'from-emerald-500/10 to-emerald-600/5' },
    { icon: ShieldCheck, title: t.whyUs.privacy, desc: t.whyUs.privacyDesc, gradient: 'from-violet-500/10 to-violet-600/5' },
  ];

  return (
    <section id="why-us" className="py-24 gradient-section" ref={ref}>
      <div className="container mx-auto px-4">
        <div className={`text-center mb-14 scroll-reveal ${inView ? 'revealed' : ''}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">{t.whyUs.title}</h2>
          <div className="w-20 h-1 bg-gold mx-auto rounded-full" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, i) => (
            <div
              key={i}
              className={`group bg-card rounded-2xl p-8 text-center shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-3 border border-border/50 hover:border-gold/30 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className={`w-18 h-18 mx-auto mb-5 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center w-[4.5rem] h-[4.5rem] group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-lg font-bold text-primary mb-3">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
