import { useLang } from '@/i18n/LanguageContext';
import { ShieldCheck, Clock, Search } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const TrustSection = () => {
  const { t } = useLang();
  const { ref, inView } = useInView();

  const items = [
    { icon: ShieldCheck, label: t.trust.privacy },
    { icon: Clock, label: t.trust.deadlines },
    { icon: Search, label: t.trust.precision },
  ];

  return (
    <section className="py-16 bg-muted" ref={ref}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-primary mb-10">{t.trust.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className={`flex items-center gap-4 bg-card rounded-xl p-6 shadow-card ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                <item.icon className="w-7 h-7 text-gold" />
              </div>
              <span className="text-lg font-semibold text-primary">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
