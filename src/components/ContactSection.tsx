import { useLang } from '@/i18n/LanguageContext';
import { useState, useRef } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useInView } from '@/hooks/useInView';

const ContactSection = () => {
  const { t, lang } = useLang();
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', message: '' });
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { ref, inView } = useInView();

  const serviceOptions = [
    t.services.admin.title,
    t.services.legal.title,
    t.services.work.title,
    t.services.social.title,
    t.services.visa.title,
    t.services.abroad.title,
    t.services.students.title,
    t.services.office.title,
  ];

  const uploadFiles = async (files: FileList): Promise<string[]> => {
    const urls: string[] = [];
    for (const file of Array.from(files)) {
      const fileName = `contact/${Date.now()}-${file.name}`;
      const { error } = await supabase.storage.from('form-attachments').upload(fileName, file);
      if (!error) {
        const { data } = supabase.storage.from('form-attachments').getPublicUrl(fileName);
        urls.push(data.publicUrl);
      }
    }
    return urls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let attachmentUrls: string[] = [];
      const files = fileInputRef.current?.files;
      if (files && files.length > 0) {
        attachmentUrls = await uploadFiles(files);
      }

      const { error } = await supabase.functions.invoke('send-email', {
        body: {
          type: 'contact',
          ...form,
          attachmentUrls,
        },
      });

      if (error) throw error;

      toast.success(lang === 'ar' ? 'تم إرسال طلبك بنجاح! سيتم الاتصال بك قريباً' : 'Votre demande a été envoyée ! Nous vous contacterons bientôt');
      setForm({ name: '', phone: '', email: '', service: '', message: '' });
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      console.error(err);
      toast.error(lang === 'ar' ? 'حدث خطأ أثناء الإرسال' : 'Erreur lors de l\'envoi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 gradient-section" ref={ref}>
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className={`text-3xl md:text-4xl font-bold text-center text-primary mb-4 scroll-reveal ${inView ? 'revealed' : ''}`}>{t.contact.title}</h2>
        <div className={`w-20 h-1 bg-gold mx-auto mb-10 rounded-full scroll-reveal ${inView ? 'revealed' : ''}`} style={{ transitionDelay: '100ms' }} />

        <form onSubmit={handleSubmit} className={`bg-card rounded-2xl p-6 md:p-8 shadow-card space-y-4 hover-lift scroll-reveal-scale ${inView ? 'revealed' : ''}`} style={{ transitionDelay: '200ms' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text" required placeholder={t.contact.name} value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-gold focus:border-gold outline-none transition hover:border-gold/50"
            />
            <input
              type="tel" required placeholder={t.contact.phone} value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-gold focus:border-gold outline-none transition hover:border-gold/50"
            />
          </div>
          <input
            type="email" placeholder={t.contact.email} value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-gold focus:border-gold outline-none transition hover:border-gold/50"
          />
          <select
            value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-gold focus:border-gold outline-none transition hover:border-gold/50"
          >
            <option value="">{t.contact.selectService}</option>
            {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <textarea
            placeholder={t.contact.message} value={form.message} rows={4}
            onChange={e => setForm({ ...form, message: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-gold focus:border-gold outline-none transition resize-none hover:border-gold/50"
          />
          <div>
            <label className="block text-sm text-muted-foreground mb-2">{t.contact.file}</label>
            <input ref={fileInputRef} type="file" accept=".pdf,.jpg,.png" className="text-sm" />
          </div>
          <button type="submit" disabled={loading} className="w-full py-4 bg-gold text-secondary-foreground font-bold text-lg rounded-lg hover:bg-gold-light transition-all flex items-center justify-center gap-2 shadow-gold hover:scale-[1.02] disabled:opacity-60 active:scale-95">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            {t.contact.send}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
