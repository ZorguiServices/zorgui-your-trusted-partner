import { useLang } from '@/i18n/LanguageContext';
import { ShieldCheck, Clock, Search } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const TrustSection = () => {
  const { t } = useLang();
  const { ref, inView } = useInView();

  const items = [
    { icon: ShieldCheck, label: t.trust.privacy, gradient: 'from-emerald-500/10 to-emerald-600/5' },
    { icon: Clock, label: t.trust.deadlines, gradient: 'from-blue-500/10 to-blue-600/5' },
    { icon: Search, label: t.trust.precision, gradient: 'from-violet-500/10 to-violet-600/5' },
  ];

  return (
    <section className="py-20 bg-muted" ref={ref}>
      <div className="container mx-auto px-4">
        <h2 className={`text-3xl font-bold text-center text-primary mb-12 scroll-reveal ${inView ? 'revealed' : ''}`}>
          {t.trust.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div
              key={i}
              className={`flex items-center gap-5 bg-card rounded-2xl p-7 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 border border-border/50 hover:border-gold/30 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shrink-0`}>
                <item.icon className="w-8 h-8 text-gold" />
              </div>
              <span className="text-lg font-bold text-primary">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
