import { useState } from 'react';
import { useLang } from '@/i18n/LanguageContext';
import { useInView } from '@/hooks/useInView';
import { FileText, HeartPulse, Users, Plane, Globe, GraduationCap, Printer, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

import adminImg from '@/assets/services-admin.jpg';
import cnssImg from '@/assets/services-social.jpg';
import workImg from '@/assets/services-work.jpg';
import visaImg from '@/assets/services-visa.jpg';
import abroadImg from '@/assets/services-abroad.jpg';
import studentsImg from '@/assets/services-students.jpg';
import officeImg from '@/assets/services-office.jpg';

const serviceKeys = ['admin', 'legal', 'work', 'visa', 'abroad', 'students', 'office'] as const;
type ServiceKey = typeof serviceKeys[number];

const ServicesSection = () => {
  const { t } = useLang();
  const { ref, inView } = useInView();
  const [openService, setOpenService] = useState<ServiceKey | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const services = [
    { key: 'admin' as const, icon: FileText, img: adminImg, accent: 'border-blue-500', iconBg: 'bg-blue-500/10' },
    { key: 'legal' as const, icon: HeartPulse, img: cnssImg, accent: 'border-rose-500', iconBg: 'bg-rose-500/10' },
    { key: 'work' as const, icon: Users, img: workImg, accent: 'border-emerald-500', iconBg: 'bg-emerald-500/10' },
    { key: 'visa' as const, icon: Plane, img: visaImg, accent: 'border-sky-500', iconBg: 'bg-sky-500/10' },
    { key: 'abroad' as const, icon: Globe, img: abroadImg, accent: 'border-teal-500', iconBg: 'bg-teal-500/10' },
    { key: 'students' as const, icon: GraduationCap, img: studentsImg, accent: 'border-violet-500', iconBg: 'bg-violet-500/10' },
    { key: 'office' as const, icon: Printer, img: officeImg, accent: 'border-orange-500', iconBg: 'bg-orange-500/10' },
  ];

  const handleChoose = (item: string) => {
    setSelectedItem(item);
    toast.success(item, { duration: 2000 });
    setTimeout(() => setSelectedItem(null), 2000);
  };

  const currentService = openService ? services.find(s => s.key === openService) : null;
  const currentData = openService ? t.services[openService] : null;

  return (
    <section id="services" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <div className={`text-center mb-14 scroll-reveal ${inView ? 'revealed' : ''}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">{t.services.title}</h2>
          <div className="w-20 h-1 bg-gold mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          {services.map((s, i) => {
            const data = t.services[s.key];
            return (
              <div
                key={s.key}
                className={`group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-3 border border-border/50 hover:border-gold/30 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={s.img} alt={data.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
                  <div className="absolute bottom-3 start-4 end-4 flex items-center gap-2">
                    <div className={`w-9 h-9 rounded-lg ${s.iconBg} backdrop-blur-sm flex items-center justify-center`}>
                      <s.icon className="w-5 h-5 text-gold" />
                    </div>
                    <h3 className="text-primary-foreground font-bold text-sm">{data.title}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <ul className="space-y-2 mb-4">
                    {data.items.slice(0, 3).map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-foreground/80">
                        <span className="text-gold mt-0.5 text-xs">●</span>
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
                    className="w-full border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded-xl"
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
        <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto rounded-2xl">
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
                className={`flex items-center justify-between gap-3 p-3 rounded-xl border transition-all duration-200 hover:shadow-md ${
                  selectedItem === item
                    ? 'bg-primary/10 border-primary'
                    : 'bg-card border-border hover:border-primary/40'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-gold text-lg">●</span>
                  <span className="text-sm font-medium text-foreground">{item}</span>
                </div>
                <Button
                  size="sm"
                  variant={selectedItem === item ? 'default' : 'outline'}
                  className="shrink-0 text-xs h-8 rounded-lg"
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
