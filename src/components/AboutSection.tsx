import { useLang } from '@/i18n/LanguageContext';
import { User, Award, Eye } from 'lucide-react';
import logo from '@/assets/logo.png';

const AboutSection = () => {
  const { t } = useLang();

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-4">{t.about.title}</h2>
        <div className="w-20 h-1 bg-gold mx-auto mb-10 rounded-full" />

        <div className="bg-card rounded-2xl p-8 shadow-card text-center">
          <img src={logo} alt={t.about.name} className="w-28 h-28 mx-auto mb-6 object-contain" />
          <h3 className="text-2xl font-bold text-primary mb-2">{t.about.name}</h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <span className="flex items-center gap-2 text-gold font-semibold">
              <Award className="w-5 h-5" /> {t.about.experience}
            </span>
            <span className="flex items-center gap-2 text-muted-foreground">
              <User className="w-5 h-5" /> {t.about.specialty}
            </span>
          </div>
          <div className="flex items-center justify-center gap-2 text-lg text-primary font-medium">
            <Eye className="w-5 h-5 text-gold" />
            {t.about.vision}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
