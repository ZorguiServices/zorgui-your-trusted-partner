import { useLang } from '@/i18n/LanguageContext';
import logo from '@/assets/logo.png';
import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';

const sectionIds = ['#hero', '#services', '#knowledge', '#about', '#booking', '#tracking', '#blog', '#contact'];

const Header = () => {
  const { t, toggleLang, lang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');

  const navItems = [
    { label: t.nav.home, href: '#hero' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.knowledge, href: '#knowledge' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.booking, href: '#booking' },
    { label: t.nav.tracking, href: '#tracking' },
    { label: t.nav.blog, href: '#blog' },
    { label: t.nav.contact, href: '#contact' },
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      const y = window.scrollY + 120;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.querySelector(sectionIds[i]);
        if (el && (el as HTMLElement).offsetTop <= y) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-primary/98 backdrop-blur-md shadow-lg border-b border-gold/10' 
        : 'bg-primary/90 backdrop-blur-sm border-b border-gold/20'
    }`}>
      <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">
        <a href="#hero" className="flex items-center gap-2 group">
          <img src={logo} alt="Zorgui Services" className="h-12 md:h-16 w-auto transition-transform group-hover:scale-105" />
          <span className="text-primary-foreground font-bold text-lg hidden sm:block">Zorgui Services</span>
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map(item => (
            <a
              key={item.href}
              href={item.href}
              className={`px-3 py-2 text-sm rounded-md transition-all duration-200 ${
                activeSection === item.href
                  ? 'text-gold bg-gold/10 font-semibold'
                  : 'text-primary-foreground/80 hover:text-gold hover:bg-primary-foreground/5'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 px-3 py-2 text-sm rounded-md bg-gold/20 text-gold hover:bg-gold/30 transition-colors"
          >
            <Globe className="w-4 h-4" />
            {lang === 'ar' ? 'FR' : 'عربي'}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-primary-foreground p-2"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-primary/98 backdrop-blur-md border-t border-gold/20 pb-4">
          {navItems.map(item => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`block px-6 py-3 transition-colors ${
                activeSection === item.href
                  ? 'text-gold bg-gold/10 font-semibold'
                  : 'text-primary-foreground/80 hover:text-gold hover:bg-primary-foreground/5'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
