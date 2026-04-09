import { useState, useMemo } from 'react';
import { useLang } from '@/i18n/LanguageContext';
import { useInView } from '@/hooks/useInView';
import { blogPosts, blogLabels, categoryLabels, type BlogCategory, type BlogPost } from '@/data/blogData';
import { Search, X, Phone, Calendar, MessageCircle, ChevronRight, BookOpen, ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const POSTS_PER_PAGE = 6;
const categories: BlogCategory[] = ['visa', 'work', 'social', 'students', 'admin'];

const BlogSection = () => {
  const { lang } = useLang();
  const { ref, inView } = useInView(0.05);
  const labels = blogLabels[lang];

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<BlogCategory | 'all'>('all');
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const filtered = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchCategory = activeCategory === 'all' || post.category === activeCategory;
      const postLang = post[lang];
      const matchSearch =
        !search ||
        postLang.title.toLowerCase().includes(search.toLowerCase()) ||
        postLang.excerpt.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, search, lang]);

  const visible = filtered.slice(0, visibleCount);

  return (
    <section id="blog" ref={ref} className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full mb-4">
            <BookOpen className="w-5 h-5" />
            <span className="font-semibold">{labels.title}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">{labels.title}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{labels.subtitle}</p>
        </div>

        {/* Search + Filters */}
        <div className={`max-w-4xl mx-auto mb-10 space-y-4 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Search */}
          <div className="relative">
            <Search className="absolute top-1/2 -translate-y-1/2 start-4 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setVisibleCount(POSTS_PER_PAGE); }}
              placeholder={labels.searchPlaceholder}
              className="w-full ps-12 pe-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50 transition"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute top-1/2 -translate-y-1/2 end-4">
                <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => { setActiveCategory('all'); setVisibleCount(POSTS_PER_PAGE); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === 'all'
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-card border border-border text-muted-foreground hover:border-primary/30 hover:text-foreground'
              }`}
            >
              {labels.allCategories}
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setVisibleCount(POSTS_PER_PAGE); }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-card border border-border text-muted-foreground hover:border-primary/30 hover:text-foreground'
                }`}
              >
                {categoryLabels[cat].icon} {categoryLabels[cat][lang]}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        {visible.length === 0 ? (
          <p className="text-center text-muted-foreground text-lg py-12">{labels.noResults}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {visible.map((post, i) => {
              const p = post[lang];
              return (
                <article
                  key={post.id}
                  className={`group bg-card rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-pointer ${
                    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${(i % 6) * 100 + 200}ms` }}
                  onClick={() => setSelectedPost(post)}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={p.title}
                      loading="lazy"
                      width={800}
                      height={512}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <Badge className="absolute top-3 start-3 bg-secondary/90 text-secondary-foreground border-0">
                      {categoryLabels[post.category].icon} {categoryLabels[post.category][lang]}
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-bold text-foreground text-lg mb-2 line-clamp-2 group-hover:text-secondary transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{p.excerpt}</p>
                    <span className="inline-flex items-center gap-1 text-secondary font-medium text-sm group-hover:gap-2 transition-all">
                      {labels.readMore}
                      <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Load More */}
        {visibleCount < filtered.length && (
          <div className="text-center mt-10">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setVisibleCount((c) => c + POSTS_PER_PAGE)}
              className="rounded-full px-8 border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all"
            >
              {labels.loadMore}
            </Button>
          </div>
        )}
      </div>

      {/* Article Modal */}
      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0 rounded-2xl">
          {selectedPost && (() => {
            const p = selectedPost[lang];
            return (
              <>
                {/* Modal Image */}
                <div className="relative h-56 md:h-64">
                  <img
                    src={selectedPost.image}
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 start-6 end-6">
                    <Badge className="bg-secondary/90 text-secondary-foreground border-0 mb-2">
                      {categoryLabels[selectedPost.category].icon} {categoryLabels[selectedPost.category][lang]}
                    </Badge>
                    <DialogHeader>
                      <DialogTitle className="text-white text-xl md:text-2xl font-bold leading-tight text-start">
                        {p.title}
                      </DialogTitle>
                    </DialogHeader>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Content paragraphs */}
                  <div className="space-y-3">
                    {p.content.map((para, i) => (
                      <p key={i} className="text-foreground/90 leading-relaxed">{para}</p>
                    ))}
                  </div>

                  {/* Tips */}
                  <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-5 border border-green-200 dark:border-green-800">
                    <h4 className="font-bold text-green-700 dark:text-green-400 mb-3">{labels.tips}</h4>
                    <ul className="space-y-2">
                      {p.tips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-green-800 dark:text-green-300">
                          <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Mistakes */}
                  <div className="bg-red-50 dark:bg-red-950/30 rounded-xl p-5 border border-red-200 dark:border-red-800">
                    <h4 className="font-bold text-red-700 dark:text-red-400 mb-3">{labels.mistakes}</h4>
                    <ul className="space-y-2">
                      {p.mistakes.map((m, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-red-800 dark:text-red-300">
                          <X className="w-4 h-4 mt-0.5 shrink-0" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    <a
                      href="tel:+21698284858"
                      className="flex-1 min-w-[140px]"
                    >
                      <Button className="w-full bg-primary hover:bg-primary/90 rounded-xl gap-2">
                        <Phone className="w-4 h-4" />
                        {labels.contactCta}
                      </Button>
                    </a>
                    <a
                      href="#booking"
                      onClick={() => setSelectedPost(null)}
                      className="flex-1 min-w-[140px]"
                    >
                      <Button variant="outline" className="w-full rounded-xl gap-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                        <Calendar className="w-4 h-4" />
                        {labels.bookingCta}
                      </Button>
                    </a>
                    <a
                      href="https://wa.me/21698284858"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-w-[140px]"
                    >
                      <Button className="w-full bg-green-600 hover:bg-green-700 rounded-xl gap-2">
                        <MessageCircle className="w-4 h-4" />
                        {labels.whatsappCta}
                      </Button>
                    </a>
                  </div>
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default BlogSection;
