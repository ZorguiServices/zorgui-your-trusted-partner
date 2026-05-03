import { useState, useMemo } from 'react';
import { useLang } from '@/i18n/LanguageContext';
import { useInView } from '@/hooks/useInView';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import {
  Search, Download, Eye, ShoppingCart, MessageCircle, Calendar,
  FileText, Image as ImageIcon, Heart, Plane, Briefcase, GraduationCap, FolderOpen,
  Share2, TrendingUp, Sparkles, Facebook,
} from 'lucide-react';
import infographicRetirement from '@/assets/infographic-retirement.jpg';
import infographicVisa from '@/assets/infographic-visa.jpg';
import infographicWorker from '@/assets/infographic-worker-rights.jpg';
import infographicAdmin from '@/assets/infographic-admin-file.jpg';

type CategoryKey = 'social' | 'visa' | 'work' | 'students' | 'admin';
type ContentType = 'pdf' | 'infographic';
type Label = 'free' | 'paid' | 'new' | 'popular';
type GuideKey =
  | 'retirement' | 'retirementPro' | 'visa' | 'visaPro' | 'workRights' | 'university'
  | 'retirementSteps' | 'visaSteps' | 'workerRights' | 'adminFile';

interface Guide {
  id: string;
  key: GuideKey;
  category: CategoryKey;
  type: ContentType;
  labels: Label[];
  price?: number;
  downloads: number;
  fileUrl?: string; // free PDF (placeholder)
  image?: string; // infographic preview image
  Icon: typeof FileText;
  gradient: string;
}

const guides: Guide[] = [
  { id: 'retirement', key: 'retirement', category: 'social', type: 'pdf', labels: ['free', 'popular'], downloads: 1280, fileUrl: '/guides/retirement.pdf', Icon: Heart, gradient: 'from-rose-500/80 to-rose-700/80' },
  { id: 'retirementPro', key: 'retirementPro', category: 'social', type: 'pdf', labels: ['paid', 'new'], price: 5, downloads: 240, Icon: Heart, gradient: 'from-amber-500/80 to-amber-700/80' },
  { id: 'visa', key: 'visa', category: 'visa', type: 'pdf', labels: ['free'], downloads: 980, fileUrl: '/guides/visa.pdf', Icon: Plane, gradient: 'from-sky-500/80 to-sky-700/80' },
  { id: 'visaPro', key: 'visaPro', category: 'visa', type: 'pdf', labels: ['paid', 'popular'], price: 5, downloads: 410, Icon: Plane, gradient: 'from-amber-500/80 to-amber-700/80' },
  { id: 'workRights', key: 'workRights', category: 'work', type: 'pdf', labels: ['free'], downloads: 760, fileUrl: '/guides/work-rights.pdf', Icon: Briefcase, gradient: 'from-emerald-500/80 to-emerald-700/80' },
  { id: 'university', key: 'university', category: 'students', type: 'pdf', labels: ['free', 'new'], downloads: 540, fileUrl: '/guides/university.pdf', Icon: GraduationCap, gradient: 'from-violet-500/80 to-violet-700/80' },
  { id: 'retirementSteps', key: 'retirementSteps', category: 'social', type: 'infographic', labels: ['free', 'popular'], downloads: 1520, image: infographicRetirement, Icon: Heart, gradient: 'from-rose-400/80 to-pink-600/80' },
  { id: 'visaSteps', key: 'visaSteps', category: 'visa', type: 'infographic', labels: ['free'], downloads: 890, image: infographicVisa, Icon: Plane, gradient: 'from-sky-400/80 to-blue-600/80' },
  { id: 'workerRights', key: 'workerRights', category: 'work', type: 'infographic', labels: ['free', 'new'], downloads: 670, image: infographicWorker, Icon: Briefcase, gradient: 'from-emerald-400/80 to-teal-600/80' },
  { id: 'adminFile', key: 'adminFile', category: 'admin', type: 'infographic', labels: ['free'], downloads: 430, image: infographicAdmin, Icon: FolderOpen, gradient: 'from-orange-400/80 to-amber-600/80' },
];

const categoryIcons: Record<CategoryKey | 'all', typeof FileText> = {
  all: Sparkles,
  social: Heart,
  visa: Plane,
  work: Briefcase,
  students: GraduationCap,
  admin: FolderOpen,
};

const WHATSAPP_NUMBER = '21698284858';

const KnowledgeCenter = () => {
  const { t, dir } = useLang();
  const { ref, inView } = useInView();
  const [activeCategory, setActiveCategory] = useState<CategoryKey | 'all'>('all');
  const [search, setSearch] = useState('');
  const [leadGuide, setLeadGuide] = useState<Guide | null>(null);
  const [buyGuide, setBuyGuide] = useState<Guide | null>(null);
  const [viewGuide, setViewGuide] = useState<Guide | null>(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const filtered = useMemo(() => {
    return guides.filter(g => {
      if (activeCategory !== 'all' && g.category !== activeCategory) return false;
      if (search.trim()) {
        const data = t.knowledge.guides[g.key];
        const haystack = `${data.title} ${data.desc}`.toLowerCase();
        if (!haystack.includes(search.toLowerCase().trim())) return false;
      }
      return true;
    });
  }, [activeCategory, search, t]);

  const handlePrimary = (g: Guide) => {
    if (g.labels.includes('paid')) {
      setBuyGuide(g);
      return;
    }
    if (g.type === 'infographic') {
      setViewGuide(g);
      return;
    }
    // Free PDF -> ask for email/phone first
    setEmail('');
    setPhone('');
    setLeadGuide(g);
  };

  const submitLead = async () => {
    if (!leadGuide) return;
    if (!email.trim() && !phone.trim()) {
      toast.error(t.knowledge.popup.error);
      return;
    }
    setSubmitting(true);
    try {
      // Try saving the lead — silently ignore if backend table not ready
      await supabase.from('knowledge_leads' as never).insert({
        guide_id: leadGuide.id,
        guide_title: t.knowledge.guides[leadGuide.key].title,
        email: email.trim() || null,
        phone: phone.trim() || null,
        source: 'knowledge_center',
      } as never);
    } catch {
      // ignore
    }
    toast.success(t.knowledge.popup.success);
    // Trigger download (placeholder file path — replace with real assets later)
    if (leadGuide.fileUrl) {
      const a = document.createElement('a');
      a.href = leadGuide.fileUrl;
      a.download = `${leadGuide.id}.pdf`;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
    setSubmitting(false);
    setLeadGuide(null);
  };

  const buyOnWhatsapp = (g: Guide) => {
    const title = t.knowledge.guides[g.key].title;
    const msg = encodeURIComponent(`مرحباً، أرغب في شراء: ${title} (${g.price} ${t.knowledge.price})`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  const shareOn = (network: 'facebook' | 'whatsapp', g: Guide) => {
    const title = t.knowledge.guides[g.key].title;
    const url = window.location.href;
    if (network === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank', 'noopener,noreferrer');
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(title + ' - ' + url)}`, '_blank', 'noopener,noreferrer');
    }
  };

  const labelStyle = (l: Label) => {
    switch (l) {
      case 'free': return 'bg-emerald-500 text-white';
      case 'paid': return 'bg-gold text-secondary-foreground';
      case 'new': return 'bg-sky-500 text-white';
      case 'popular': return 'bg-rose-500 text-white';
    }
  };

  const categories: (CategoryKey | 'all')[] = ['all', 'social', 'visa', 'work', 'students', 'admin'];

  return (
    <section id="knowledge" className="py-24 gradient-section" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-12 scroll-reveal ${inView ? 'revealed' : ''}`}>
          <div className="inline-flex items-center gap-2 bg-gold/10 text-gold-dark px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            {t.knowledge.title}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">📘 {t.knowledge.title}</h2>
          <div className="w-20 h-1 bg-gold mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground max-w-2xl mx-auto">{t.knowledge.subtitle}</p>
        </div>

        {/* Search + Filters */}
        <div className={`max-w-4xl mx-auto mb-10 scroll-reveal ${inView ? 'revealed' : ''}`}>
          <div className="relative mb-5">
            <Search className={`absolute top-1/2 -translate-y-1/2 ${dir === 'rtl' ? 'right-4' : 'left-4'} w-5 h-5 text-muted-foreground`} />
            <Input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.knowledge.searchPlaceholder}
              className={`h-12 ${dir === 'rtl' ? 'pr-12' : 'pl-12'} rounded-xl border-2 focus-visible:ring-gold`}
            />
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(c => {
              const Icon = categoryIcons[c];
              const label = c === 'all' ? t.knowledge.all : t.knowledge.categories[c];
              const active = activeCategory === c;
              return (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1.5 transition-all duration-300 border-2 ${
                    active
                      ? 'bg-primary text-primary-foreground border-primary shadow-md scale-105'
                      : 'bg-card text-foreground border-border hover:border-gold hover:text-gold-dark'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cards Grid */}
        {filtered.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">{t.knowledge.noResults}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((g, i) => {
              const data = t.knowledge.guides[g.key];
              const isPaid = g.labels.includes('paid');
              return (
                <article
                  key={g.id}
                  className={`group bg-card rounded-2xl overflow-hidden shadow-card border border-border/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-card-hover hover:border-gold/40 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  {/* Visual */}
                  <div
                    className={`relative h-44 bg-gradient-to-br ${g.gradient} overflow-hidden ${g.image ? 'cursor-zoom-in' : ''}`}
                    onClick={g.image ? () => setViewGuide(g) : undefined}
                  >
                    {g.image ? (
                      <img
                        src={g.image}
                        alt={data.title}
                        loading="lazy"
                        width={1024}
                        height={1024}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-125"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
                        <g.Icon className="w-20 h-20 text-white/90 drop-shadow-lg" strokeWidth={1.5} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    {/* Type badge */}
                    <div className={`absolute top-3 ${dir === 'rtl' ? 'right-3' : 'left-3'} flex items-center gap-1 bg-white/95 backdrop-blur px-2.5 py-1 rounded-lg text-xs font-bold text-primary pointer-events-none`}>
                      {g.type === 'pdf' ? <FileText className="w-3.5 h-3.5" /> : <ImageIcon className="w-3.5 h-3.5" />}
                      {t.knowledge.types[g.type]}
                    </div>
                    {/* Labels */}
                    <div className={`absolute top-3 ${dir === 'rtl' ? 'left-3' : 'right-3'} flex flex-col gap-1.5 items-end pointer-events-none`}>
                      {g.labels.map(l => (
                        <Badge key={l} className={`${labelStyle(l)} border-0 text-xs`}>
                          {l === 'popular' && <TrendingUp className="w-3 h-3 me-1" />}
                          {t.knowledge.labels[l]}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <h3 className="font-bold text-lg text-primary mb-2 line-clamp-2">{data.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{data.desc}</p>

                    <div className="flex items-center justify-between mb-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Download className="w-3.5 h-3.5" />
                        <span>{g.downloads.toLocaleString()} {t.knowledge.downloads}</span>
                      </div>
                      {isPaid && (
                        <div className="font-bold text-gold-dark text-base">
                          {g.price} {t.knowledge.price}
                        </div>
                      )}
                    </div>

                    <Button
                      onClick={() => handlePrimary(g)}
                      className={`w-full rounded-xl font-bold ${
                        isPaid
                          ? 'bg-gold hover:bg-gold-light text-secondary-foreground shadow-gold'
                          : 'bg-primary hover:bg-primary/90'
                      }`}
                    >
                      {isPaid ? (
                        <><ShoppingCart className="w-4 h-4" /> {t.knowledge.buy}</>
                      ) : g.type === 'pdf' ? (
                        <><Download className="w-4 h-4" /> {t.knowledge.download}</>
                      ) : (
                        <><Eye className="w-4 h-4" /> {t.knowledge.view}</>
                      )}
                    </Button>

                    {/* Share */}
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/60">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Share2 className="w-3.5 h-3.5" /> {t.knowledge.shareInfo}
                      </span>
                      <button
                        onClick={() => shareOn('facebook', g)}
                        aria-label="Share on Facebook"
                        className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-110 transition-transform"
                      >
                        <Facebook className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => shareOn('whatsapp', g)}
                        aria-label="Share on WhatsApp"
                        className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:scale-110 transition-transform"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Bottom CTA */}
        <div className={`mt-14 max-w-3xl mx-auto bg-gradient-to-r from-primary to-navy-dark rounded-2xl p-8 text-center shadow-card-hover scroll-reveal-scale ${inView ? 'revealed' : ''}`}>
          <p className="text-primary-foreground text-lg md:text-xl font-semibold mb-6">
            {t.knowledge.ctaTitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold flex items-center justify-center gap-2 transition-all hover:scale-105"
            >
              <MessageCircle className="w-5 h-5" />
              {t.knowledge.ctaWhatsapp}
            </a>
            <a
              href="#booking"
              className="px-6 py-3 rounded-xl bg-gold hover:bg-gold-light text-secondary-foreground font-bold flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-gold"
            >
              <Calendar className="w-5 h-5" />
              {t.knowledge.ctaBooking}
            </a>
          </div>
        </div>
      </div>

      {/* Lead capture popup */}
      <Dialog open={!!leadGuide} onOpenChange={(o) => !o && setLeadGuide(null)}>
        <DialogContent className="max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-primary text-xl">{t.knowledge.popup.title}</DialogTitle>
            <DialogDescription>{t.knowledge.popup.desc}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 mt-2">
            <div>
              <label className="text-sm font-semibold text-foreground mb-1 block">{t.knowledge.popup.email}</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value.slice(0, 255))}
                placeholder="example@email.com"
                className="rounded-xl"
              />
            </div>
            <div className="text-center text-xs text-muted-foreground">— {dir === 'rtl' ? 'أو' : 'ou'} —</div>
            <div>
              <label className="text-sm font-semibold text-foreground mb-1 block">{t.knowledge.popup.phone}</label>
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.slice(0, 30))}
                placeholder="+216 XX XXX XXX"
                className="rounded-xl"
              />
            </div>
            <Button
              onClick={submitLead}
              disabled={submitting}
              className="w-full rounded-xl bg-primary hover:bg-primary/90 font-bold"
            >
              <Download className="w-4 h-4" />
              {t.knowledge.popup.submit}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Buy popup */}
      <Dialog open={!!buyGuide} onOpenChange={(o) => !o && setBuyGuide(null)}>
        <DialogContent className="max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-primary text-xl">{t.knowledge.buyPopup.title}</DialogTitle>
            <DialogDescription>{t.knowledge.buyPopup.desc}</DialogDescription>
          </DialogHeader>
          {buyGuide && (
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-xl p-4">
                <p className="font-bold text-primary mb-1">{t.knowledge.guides[buyGuide.key].title}</p>
                <p className="text-sm text-muted-foreground">{t.knowledge.guides[buyGuide.key].desc}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{t.knowledge.buyPopup.priceLabel}</span>
                  <span className="text-2xl font-bold text-gold-dark">{buyGuide.price} {t.knowledge.price}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2 italic">{t.knowledge.buyPopup.valueNote}</p>
              </div>
              <Button
                onClick={() => buyGuide && buyOnWhatsapp(buyGuide)}
                className="w-full rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold"
              >
                <MessageCircle className="w-4 h-4" />
                {t.knowledge.buyPopup.whatsapp}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Infographic viewer */}
      <Dialog open={!!viewGuide} onOpenChange={(o) => !o && setViewGuide(null)}>
        <DialogContent className="max-w-2xl rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-primary text-xl">
              {viewGuide && t.knowledge.guides[viewGuide.key].title}
            </DialogTitle>
            <DialogDescription>
              {viewGuide && t.knowledge.guides[viewGuide.key].desc}
            </DialogDescription>
          </DialogHeader>
          {viewGuide && (
            <div className={`relative rounded-xl overflow-hidden bg-gradient-to-br ${viewGuide.gradient} aspect-video flex items-center justify-center`}>
              <viewGuide.Icon className="w-32 h-32 text-white/90" strokeWidth={1.2} />
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur rounded-xl p-3 text-center text-sm text-primary font-semibold">
                {dir === 'rtl' ? 'محتوى بصري قريباً — تواصل معنا للاستفسار' : 'Contenu visuel — contactez-nous pour plus d\'infos'}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default KnowledgeCenter;