import { useLang } from '@/i18n/LanguageContext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useInView } from '@/hooks/useInView';
import { HelpCircle } from 'lucide-react';

const faqData = {
  ar: [
    { q: 'كم تستغرق الخدمة؟', a: 'تختلف المدة حسب نوع الخدمة، لكن نحرص دائمًا على إنجاز المعاملات في أسرع وقت ممكن. معظم الخدمات الإدارية تُنجز في غضون 2 إلى 5 أيام عمل.' },
    { q: 'شنوا الوثائق المطلوبة للتقاعد؟', a: 'بطاقة التعريف الوطنية، شهادات العمل، كشوف الأجور، وشهادة الانخراط في الضمان الاجتماعي. نساعدك في تحضير الملف الكامل.' },
    { q: 'كيفاش نخلّص؟', a: 'الدفع يكون نقدًا في المكتب أو عبر تحويل بنكي. الأسعار محددة مسبقًا وبدون تكاليف مخفية.' },
    { q: 'كيفاش نعمل موعد فيزا؟', a: 'نتكفّل بحجز الموعد نيابة عنك وتجهيز كامل الملف المطلوب حسب نوع التأشيرة والسفارة المعنية.' },
    { q: 'كيفاش نعمل شكاية إدارية؟', a: 'نحرّر الشكاية بصياغة قانونية صحيحة ونرسلها للجهة المعنية مع متابعة الملف حتى الحصول على رد.' },
    { q: 'هل الخدمات متاحة للتونسيين بالخارج؟', a: 'نعم، نقدّم خدمات خاصة للتونسيين المقيمين بالخارج تشمل التقاعد، تحويل الجرايات، والمراسلات الإدارية.' },
  ],
  fr: [
    { q: 'Combien de temps prend le service ?', a: 'La durée varie selon le type de service, mais nous veillons toujours à traiter les dossiers le plus rapidement possible. La plupart des services administratifs sont réalisés en 2 à 5 jours ouvrables.' },
    { q: 'Quels documents sont nécessaires pour la retraite ?', a: 'Carte d\'identité nationale, certificats de travail, fiches de paie et attestation d\'affiliation à la sécurité sociale. Nous vous aidons à préparer le dossier complet.' },
    { q: 'Comment payer ?', a: 'Le paiement se fait en espèces au bureau ou par virement bancaire. Les tarifs sont fixés à l\'avance, sans frais cachés.' },
    { q: 'Comment prendre un rendez-vous visa ?', a: 'Nous nous chargeons de la réservation du rendez-vous et de la préparation complète du dossier selon le type de visa et l\'ambassade concernée.' },
    { q: 'Comment faire une réclamation administrative ?', a: 'Nous rédigeons la réclamation avec une formulation juridique correcte et l\'envoyons à l\'organisme concerné, avec suivi jusqu\'à obtention d\'une réponse.' },
    { q: 'Les services sont-ils disponibles pour les Tunisiens à l\'étranger ?', a: 'Oui, nous proposons des services spéciaux pour les Tunisiens résidant à l\'étranger, incluant la retraite, le transfert de pensions et la correspondance administrative.' },
  ],
};

const colorClasses = [
  'border-l-4 border-l-[hsl(var(--secondary))] bg-[hsl(var(--secondary)/0.05)]',
  'border-l-4 border-l-[hsl(var(--navy-light))] bg-[hsl(var(--navy-light)/0.05)]',
  'border-l-4 border-l-[hsl(160,50%,45%)] bg-[hsl(160,50%,45%,0.05)]',
  'border-l-4 border-l-[hsl(280,45%,55%)] bg-[hsl(280,45%,55%,0.05)]',
  'border-l-4 border-l-[hsl(15,70%,55%)] bg-[hsl(15,70%,55%,0.05)]',
  'border-l-4 border-l-[hsl(var(--secondary))] bg-[hsl(var(--secondary)/0.05)]',
];

const FAQSection = () => {
  const { lang } = useLang();
  const { ref, inView } = useInView(0.1);
  const items = faqData[lang];
  const title = lang === 'ar' ? 'الأسئلة المتكررة' : 'Questions Fréquentes';

  return (
    <section id="faq" ref={ref} className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className={`text-center mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <HelpCircle className="w-5 h-5" />
            <span className="font-semibold">FAQ</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary">{title}</h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {items.map((item, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className={`${colorClasses[i % colorClasses.length]} rounded-xl px-5 border-b-0 transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <AccordionTrigger className="text-base md:text-lg font-semibold text-foreground hover:no-underline py-5">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed pb-5">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
