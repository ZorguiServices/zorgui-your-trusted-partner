import { useLang } from '@/i18n/LanguageContext';
import { BookOpen } from 'lucide-react';

const BlogSection = () => {
  const { t } = useLang();

  return (
    <section id="blog" className="py-20 gradient-section">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-primary mb-4">{t.blog.title}</h2>
        <div className="w-20 h-1 bg-gold mx-auto mb-10 rounded-full" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.blog.posts.map((post, i) => (
            <div key={i} className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
              <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition">
                <BookOpen className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-bold text-primary mb-2 group-hover:text-gold transition">{post.title}</h3>
              <p className="text-sm text-muted-foreground">{post.excerpt}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
