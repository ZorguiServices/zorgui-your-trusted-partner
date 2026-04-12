import { useLang } from '@/i18n/LanguageContext';
import { useInView } from '@/hooks/useInView';
import { useEffect, useState } from 'react';
import { TrendingUp, FileCheck, Smile } from 'lucide-react';

const AnimatedCounter = ({ target, suffix = '' }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        setIsDone(true);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref as any} className={isDone ? 'counter-done inline-block' : 'inline-block'}>
      {count >= 100 && suffix === '%' ? count : `+${count}`}{suffix}
    </span>
  );
};

const StatsSection = () => {
  const { t } = useLang();

  const stats = [
    { value: 30, label: t.stats.experience, suffix: '', icon: TrendingUp },
    { value: 5000, label: t.stats.files, suffix: '', icon: FileCheck },
    { value: 98, label: t.stats.satisfaction, suffix: '%', icon: Smile },
  ];

  return (
    <section className="py-20 gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--gold)/0.05),transparent_60%)]" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center group hover-glow rounded-2xl p-8 cursor-default border border-primary-foreground/5 hover:border-gold/20 transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gold/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <s.icon className="w-8 h-8 text-gold" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-gold mb-3">
                <AnimatedCounter target={s.value} suffix={s.suffix} />
              </div>
              <div className="text-primary-foreground/80 text-lg font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
