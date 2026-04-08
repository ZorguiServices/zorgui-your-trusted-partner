import { useLang } from '@/i18n/LanguageContext';
import logo from '@/assets/logo.png';
import { MapPin, Phone, MessageCircle, Mail } from 'lucide-react';

const Footer = () => {
  const { t } = useLang();

  return (
    <footer className="bg-primary py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="text-center md:text-start">
            <img src={logo} alt="Zorgui Services" className="h-16 w-auto mx-auto md:mx-0 mb-4" />
            <p className="text-primary-foreground font-bold text-lg">Zorgui Services</p>
          </div>

          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2 text-primary-foreground/80">
              <MapPin className="w-5 h-5 text-gold" />
              {t.footer.address}
            </div>
            <div className="flex items-center justify-center gap-2 text-primary-foreground/80">
              <Phone className="w-5 h-5 text-gold" />
              <a href="tel:+21698284858" className="hover:text-gold transition">98 284 858</a>
            </div>
            <div className="flex items-center justify-center gap-2 text-primary-foreground/80">
              <MessageCircle className="w-5 h-5 text-gold" />
              <a href="https://wa.me/21698284858" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition">WhatsApp</a>
            </div>
            <div className="flex items-center justify-center gap-2 text-primary-foreground/80">
              <Mail className="w-5 h-5 text-gold" />
              <a href="mailto:contact@zorgui-services.tn" className="hover:text-gold transition">contact@zorgui-services.tn</a>
            </div>
          </div>

          <div className="text-center md:text-end">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52456.55725384482!2d8.7!3d35.17!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12f9c0c0c0c0c0c1%3A0x0!2sKasserine!5e0!3m2!1sfr!2stn!4v1"
              width="100%" height="150" style={{ border: 0, borderRadius: '0.75rem' }} allowFullScreen loading="lazy" title="Google Maps"
            />
          </div>
        </div>

        <div className="border-t border-gold/20 pt-6 text-center text-primary-foreground/60 text-sm">
          © {new Date().getFullYear()} Zorgui Services. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
