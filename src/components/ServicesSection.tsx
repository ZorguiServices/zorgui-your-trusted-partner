import { useState } from 'react';
import { useLang } from '@/i18n/LanguageContext';
import { useInView } from '@/hooks/useInView';
import { FileText, Scale, Briefcase, Heart, Plane, Globe, GraduationCap, Printer, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

import adminImg from '@/assets/services-admin.jpg';
import legalImg from '@/assets/services-legal.jpg';
import workImg from '@/assets/services-work.jpg';
import socialImg from '@/assets/services-social.jpg';
import visaImg from '@/assets/services-visa.jpg';
import abroadImg from '@/assets/services-abroad.jpg';
import studentsImg from '@/assets/services-students.jpg';
import officeImg from '@/assets/services-office.jpg';

const serviceKeys = ['admin', 'legal', 'work', 'social', 'visa', 'abroad', 'students', 'office'] as const;
type ServiceKey = typeof serviceKeys[number];

const ServicesSection = () => {
  const { t } = useLang();
  const { ref, inView } = useInView();
  const [openService, setOpenService] = useState<ServiceKey | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const services = [
    { key: 'admin' as const, icon: FileText, img: adminImg, color: 'from-blue-500/10 to-blue-600/5', accent: 'border-blue-500' },
    { key: 'legal' as const, icon: Scale, img: legalImg, color: 'from-amber-500/10 to-amber-600/5', accent: 'border-amber-500' },
    { key: 'work' as const, icon: Briefcase, img: workImg, color: 'from-emerald-500/10 to-emerald-600/5', accent: 'border-emerald-500' },
    { key: 'social' as const, icon: Heart, img: socialImg, color: 'from-rose-500/10 to-rose-600/5', accent: 'border-rose-500' },
    { key: 'visa' as const, icon: Plane, img: visaImg, color: 'from-sky-500/10 to-sky-600/5', accent: 'border-sky-500' },
    { key: 'abroad' as const, icon: Globe, img: abroadImg, color: 'from-teal-500/10 to-teal-600/5', accent: 'border-teal-500' },
    { key: 'students' as const, icon: GraduationCap, img: studentsImg, color: 'from-violet-500/10 to-violet-600/5', accent: 'border-violet-500' },
    { key: 'office' as const, icon: Printer, img: officeImg, color: 'from-orange-500/10 to-orange-600/5', accent: 'border-orange-500' },
  ];

  const handleChoose = (item: string) => {
    setSelectedItem(item);
    toast.success(item, { duration: 2000 });
    setTimeout(() => setSelectedItem(null), 2000);
  };

  const currentService = openService ? services.find(s => s.key === openService) : null;
  const currentData = openService ? t.services[openService] : null;

  return (
    <section id="services" className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-4">
          {t.services.title}
        </h2>
        <div className="w-20 h-1 bg-gold mx-auto mb-12 rounded-full" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((s, i) => {
            const data = t.services[s.key];
            return (
              <div
                key={s.key}
                className={`group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="relative h-40 overflow-hidden">
                  <img src={s.img} alt={data.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                  <div className="absolute bottom-3 start-4 flex items-center gap-2">
                    <s.icon className="w-5 h-5 text-gold" />
                    <h3 className="text-primary-foreground font-bold">{data.title}</h3>
                  </div>
                </div>
                <div className={`p-4 bg-gradient-to-b ${s.color}`}>
                  <ul className="space-y-1.5 mb-3">
                    {data.items.slice(0, 3).map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-foreground/80">
                        <span className="text-gold mt-0.5">•</span>
                        {item}
                      </li>
                    ))}
                    {data.items.length > 3 && (
                      <li className="text-xs text-muted-foreground">+{data.items.length - 3}...</li>
                    )}
                  </ul>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-primary/30 hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => setOpenService(s.key)}
                  >
                    {t.services.readMore}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Dialog open={!!openService} onOpenChange={(open) => { if (!open) setOpenService(null); }}>
        <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl text-primary">
              {currentService && <currentService.icon className="w-5 h-5 text-gold" />}
              {currentData?.title}
            </DialogTitle>
            <DialogDescription>{t.services.chooseService}</DialogDescription>
          </DialogHeader>
          <div className="space-y-2 mt-2">
            {currentData?.items.map((item, i) => (
              <div
                key={i}
                className={`flex items-center justify-between gap-3 p-3 rounded-lg border transition-all duration-200 hover:shadow-md ${
                  selectedItem === item
                    ? 'bg-primary/10 border-primary'
                    : 'bg-card border-border hover:border-primary/40'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-gold text-lg">•</span>
                  <span className="text-sm font-medium text-foreground">{item}</span>
                </div>
                <Button
                  size="sm"
                  variant={selectedItem === item ? 'default' : 'outline'}
                  className="shrink-0 text-xs h-8"
                  onClick={() => handleChoose(item)}
                  disabled={selectedItem === item}
                >
                  {selectedItem === item ? (
                    <><Check className="w-3 h-3" /> {t.services.selected}</>
                  ) : (
                    t.services.choose
                  )}
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ServicesSection;
