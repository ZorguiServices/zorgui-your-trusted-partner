import { useLang } from '@/i18n/LanguageContext';
import { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { toast } from 'sonner';

const BookingSection = () => {
  const { t, lang } = useLang();
  const [form, setForm] = useState({ date: '', time: '', service: '', name: '', phone: '', email: '' });

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
    toast.success(lang === 'ar' ? 'تم حجز الموعد بنجاح!' : 'Rendez-vous réservé avec succès !');
    setForm({ date: '', time: '', service: '', name: '', phone: '', email: '' });
  };

  return (
    <section id="booking" className="py-20 bg-muted">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-4">{t.booking.title}</h2>
        <div className="w-20 h-1 bg-gold mx-auto mb-10 rounded-full" />

        <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-6 md:p-8 shadow-card space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Calendar className="absolute start-3 top-3.5 w-5 h-5 text-muted-foreground" />
              <input type="date" required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                className="w-full ps-10 pe-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-gold outline-none transition" />
            </div>
            <div className="relative">
              <Clock className="absolute start-3 top-3.5 w-5 h-5 text-muted-foreground" />
              <input type="time" required value={form.time} onChange={e => setForm({ ...form, time: e.target.value })}
                className="w-full ps-10 pe-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-gold outline-none transition" />
            </div>
          </div>
          <select value={form.service} required onChange={e => setForm({ ...form, service: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-gold outline-none transition">
            <option value="">{t.booking.serviceType}</option>
            {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" required placeholder={t.booking.name} value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-gold outline-none transition" />
            <input type="tel" required placeholder={t.booking.phone} value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-gold outline-none transition" />
          </div>
          <input type="email" placeholder={t.booking.email} value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-gold outline-none transition" />
          <div>
            <label className="block text-sm text-muted-foreground mb-2">{t.booking.uploadFiles}</label>
            <input type="file" accept=".pdf,.jpg,.png" multiple className="text-sm" />
          </div>
          <button type="submit" className="w-full py-4 bg-primary text-primary-foreground font-bold text-lg rounded-lg hover:bg-navy-light transition-all flex items-center justify-center gap-2 hover:scale-[1.02]">
            <Calendar className="w-5 h-5" />
            {t.booking.submit}
          </button>
        </form>
      </div>
    </section>
  );
};

export default BookingSection;
