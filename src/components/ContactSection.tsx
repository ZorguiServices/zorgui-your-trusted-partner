import { useLang } from '@/i18n/LanguageContext';
import { useState } from 'react';
import { Send } from 'lucide-react';
import { toast } from 'sonner';

const ContactSection = () => {
  const { t, lang } = useLang();
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', message: '' });

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


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(lang === 'ar' ? 'تم إرسال طلبك بنجاح! سيتم الاتصال بك قريباً' : 'Votre demande a été envoyée ! Nous vous contacterons bientôt');
    setForm({ name: '', phone: '', email: '', service: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 gradient-section">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-4">{t.contact.title}</h2>
        <div className="w-20 h-1 bg-gold mx-auto mb-10 rounded-full" />

        <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-6 md:p-8 shadow-card space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text" required placeholder={t.contact.name} value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-gold focus:border-gold outline-none transition"
            />
            <input
              type="tel" required placeholder={t.contact.phone} value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-gold focus:border-gold outline-none transition"
            />
          </div>
          <input
            type="email" placeholder={t.contact.email} value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-gold focus:border-gold outline-none transition"
          />
          <select
            value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-gold focus:border-gold outline-none transition"
          >
            <option value="">{t.contact.selectService}</option>
            {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <textarea
            placeholder={t.contact.message} value={form.message} rows={4}
            onChange={e => setForm({ ...form, message: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-gold focus:border-gold outline-none transition resize-none"
          />
          <div>
            <label className="block text-sm text-muted-foreground mb-2">{t.contact.file}</label>
            <input type="file" accept=".pdf,.jpg,.png" className="text-sm" />
          </div>
          <button type="submit" className="w-full py-4 bg-gold text-secondary-foreground font-bold text-lg rounded-lg hover:bg-gold-light transition-all flex items-center justify-center gap-2 shadow-gold hover:scale-[1.02]">
            <Send className="w-5 h-5" />
            {t.contact.send}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
