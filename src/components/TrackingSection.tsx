import { useLang } from '@/i18n/LanguageContext';
import { useState } from 'react';
import { Search, Clock, Send as SendIcon, CheckCircle } from 'lucide-react';

const TrackingSection = () => {
  const { t } = useLang();
  const [fileNum, setFileNum] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileNum.trim()) return;
    // Demo: random status
    const statuses = [t.tracking.processing, t.tracking.sent, t.tracking.completed];
    setStatus(statuses[Math.floor(Math.random() * statuses.length)]);
  };

  const getStatusIcon = () => {
    if (status === t.tracking.completed) return <CheckCircle className="w-8 h-8 text-emerald-500" />;
    if (status === t.tracking.sent) return <SendIcon className="w-8 h-8 text-blue-500" />;
    return <Clock className="w-8 h-8 text-amber-500" />;
  };

  return (
    <section id="tracking" className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-lg">
        <h2 className="text-3xl font-bold text-center text-primary mb-4">{t.tracking.title}</h2>
        <div className="w-20 h-1 bg-gold mx-auto mb-10 rounded-full" />

        <form onSubmit={handleSearch} className="bg-card rounded-2xl p-6 shadow-card">
          <div className="flex gap-2">
            <input
              type="text" value={fileNum} onChange={e => setFileNum(e.target.value)}
              placeholder={t.tracking.placeholder}
              className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-gold outline-none transition"
            />
            <button type="submit" className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-navy-light transition flex items-center gap-2">
              <Search className="w-4 h-4" />
              {t.tracking.button}
            </button>
          </div>
          {status && (
            <div className="mt-6 p-4 bg-muted rounded-lg flex items-center gap-3 animate-fade-in-up">
              {getStatusIcon()}
              <span className="font-semibold text-foreground">{status}</span>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default TrackingSection;
