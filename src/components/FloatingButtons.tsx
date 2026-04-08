import { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, MessageCircle } from 'lucide-react';

const sections = ['#hero', '#why-us', '#services', '#booking', '#tracking', '#blog', '#about', '#contact'];

const FloatingButtons = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToNext = () => {
    const y = window.scrollY + 100;
    for (const id of sections) {
      const el = document.querySelector(id);
      if (el && (el as HTMLElement).offsetTop > y) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
  };

  return (
    <>
      {/* WhatsApp */}
      <a
        href="https://wa.me/21698284858"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 start-6 z-50 w-14 h-14 bg-emerald-500 text-card rounded-full flex items-center justify-center shadow-lg hover:bg-emerald-600 transition-all hover:scale-110"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>

      {/* Nav arrows */}
      <div className="fixed bottom-6 end-6 z-50 flex flex-col gap-2">
        {showTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:bg-navy-light transition-all hover:scale-110"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
        <button
          onClick={scrollToNext}
          className="w-12 h-12 bg-gold text-secondary-foreground rounded-full flex items-center justify-center shadow-lg hover:bg-gold-light transition-all hover:scale-110"
          aria-label="Next section"
        >
          <ArrowDown className="w-5 h-5" />
        </button>
      </div>
    </>
  );
};

export default FloatingButtons;
