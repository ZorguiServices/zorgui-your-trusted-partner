import { useLang } from '@/i18n/LanguageContext';
import { useInView } from '@/hooks/useInView';
import { Star, Quote } from 'lucide-react';

const reviewsData = {
  ar: {
    title: 'آراء عملائنا',
    subtitle: 'ثقة عملائنا هي أكبر شهادة نجاحنا',
    reviews: [
      {
        name: 'أحمد بن علي',
        role: 'متقاعد',
        text: 'خدمة ممتازة وسريعة. تم إنجاز ملف التقاعد في وقت قياسي. شكراً جزيلاً لفريق زرقي للخدمات.',
        rating: 5,
      },
      {
        name: 'فاطمة الزهراء',
        role: 'طالبة جامعية',
        text: 'ساعدوني في التسجيل الجامعي بالخارج وتحضير كل الوثائق. خدمة احترافية ومتابعة دقيقة من البداية حتى النهاية.',
        rating: 5,
      },
      {
        name: 'محمد التونسي',
        role: 'تونسي بالخارج',
        text: 'من فرنسا، تعاملت معهم لتحويل الجراية. سرية تامة واحترام الآجال. أنصح الجميع بالتعامل معهم.',
        rating: 5,
      },
      {
        name: 'سامية العبيدي',
        role: 'موظفة',
        text: 'قدّموا لي المساعدة في شكاية قاضي الشغل. خبرة واضحة وتعامل راقي. نتيجة ممتازة الحمد لله.',
        rating: 4,
      },
    ],
  },
  fr: {
    title: 'Avis de nos clients',
    subtitle: 'La confiance de nos clients est notre plus grande réussite',
    reviews: [
      {
        name: 'Ahmed Ben Ali',
        role: 'Retraité',
        text: 'Service excellent et rapide. Mon dossier de retraite a été traité en un temps record. Merci beaucoup à l\'équipe Zorgui Services.',
        rating: 5,
      },
      {
        name: 'Fatma Zahra',
        role: 'Étudiante universitaire',
        text: 'Ils m\'ont aidée pour l\'inscription universitaire à l\'étranger et la préparation de tous les documents. Service professionnel du début à la fin.',
        rating: 5,
      },
      {
        name: 'Mohamed Tounsi',
        role: 'Tunisien à l\'étranger',
        text: 'Depuis la France, j\'ai fait appel à eux pour le transfert de ma pension. Confidentialité totale et respect des délais. Je recommande vivement.',
        rating: 5,
      },
      {
        name: 'Samia Abidi',
        role: 'Employée',
        text: 'Ils m\'ont assistée dans une plainte prud\'homale. Expertise évidente et traitement de qualité. Excellent résultat.',
        rating: 4,
      },
    ],
  },
};

const ReviewsSection = () => {
  const { lang } = useLang();
  const { ref, inView } = useInView(0.05);
  const data = reviewsData[lang];

  return (
    <section id="reviews" ref={ref} className="py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-14 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-full mb-4">
            <Star className="w-5 h-5 fill-current" />
            <span className="font-semibold text-sm">★★★★★</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">{data.title}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{data.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {data.reviews.map((review, i) => (
            <div
              key={i}
              className={`relative bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 border border-border/50 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <Quote className="absolute top-4 end-4 w-8 h-8 text-gold/15" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className={`w-4 h-4 ${j < review.rating ? 'text-gold fill-gold' : 'text-border'}`}
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground/80 text-sm leading-relaxed mb-5 min-h-[5rem]">
                "{review.text}"
              </p>

              {/* Author */}
              <div className="border-t border-border/50 pt-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-navy-light flex items-center justify-center mb-2">
                  <span className="text-primary-foreground font-bold text-sm">
                    {review.name.charAt(0)}
                  </span>
                </div>
                <p className="font-bold text-primary text-sm">{review.name}</p>
                <p className="text-muted-foreground text-xs">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
