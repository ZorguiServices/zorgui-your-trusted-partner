import { useLang } from '@/i18n/LanguageContext';
import { User, Award, Eye } from 'lucide-react';
import ownerPhoto from '@/assets/owner-photo.png';
import { useInView } from '@/hooks/useInView';

const AboutSection = () => {
  const { t } = useLang();
  const { ref, inView } = useInView();

  return (
    <section id="about" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4 max-w-3xl">
        <div className={`text-center mb-14 scroll-reveal ${inView ? 'revealed' : ''}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">{t.about.title}</h2>
          <div className="w-20 h-1 bg-gold mx-auto rounded-full" />
        </div>

        <div className={`bg-card rounded-2xl p-8 md:p-10 shadow-card hover:shadow-card-hover transition-all duration-500 text-center border border-border/50 scroll-reveal-scale ${inView ? 'revealed' : ''}`} style={{ transitionDelay: '200ms' }}>
          <div className="relative inline-block mb-6">
            <img src={ownerPhoto} alt={t.about.name} className="w-32 h-32 object-cover rounded-full border-4 border-gold shadow-gold" />
            <div className="absolute -bottom-2 -end-2 w-10 h-10 bg-gold rounded-full flex items-center justify-center shadow-lg">
              <Award className="w-5 h-5 text-secondary-foreground" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-primary mb-3">{t.about.name}</h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <span className="flex items-center gap-2 text-gold font-semibold bg-gold/10 px-4 py-2 rounded-full">
              <Award className="w-5 h-5" /> {t.about.experience}
            </span>
            <span className="flex items-center gap-2 text-muted-foreground bg-muted px-4 py-2 rounded-full">
              <User className="w-5 h-5" /> {t.about.specialty}
            </span>
          </div>
          <div className="flex items-center justify-center gap-2 text-lg text-primary font-medium bg-gradient-to-r from-gold/5 to-transparent p-4 rounded-xl">
            <Eye className="w-5 h-5 text-gold" />
            {t.about.vision}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
