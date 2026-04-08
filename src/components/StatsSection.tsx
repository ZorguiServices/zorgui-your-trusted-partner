import { useLang } from '@/i18n/LanguageContext';
import { useInView } from '@/hooks/useInView';
import { useEffect, useState } from 'react';

const AnimatedCounter = ({ target, suffix = '' }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref as any}>{count >= 100 && suffix === '%' ? count : `+${count}`}{suffix}</span>;
};

const StatsSection = () => {
  const { t } = useLang();

  const stats = [
    { value: 30, label: t.stats.experience },
    { value: 5000, label: t.stats.files, suffix: '' },
    { value: 98, label: t.stats.satisfaction, suffix: '%' },
  ];

  return (
    <section className="py-16 gradient-hero">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">
                <AnimatedCounter target={s.value} suffix={s.suffix} />
              </div>
              <div className="text-primary-foreground/80 text-lg">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
