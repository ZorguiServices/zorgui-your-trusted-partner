import blogVisa from '@/assets/blog-visa.jpg';
import blogVisa2 from '@/assets/blog-visa-2.jpg';
import blogWork from '@/assets/blog-work.jpg';
import blogWork2 from '@/assets/blog-work-2.jpg';
import blogSocial from '@/assets/blog-social.jpg';
import blogSocial2 from '@/assets/blog-social-2.jpg';
import blogStudents from '@/assets/blog-students.jpg';
import blogStudents2 from '@/assets/blog-students-2.jpg';
import blogAdmin from '@/assets/blog-admin.jpg';
import blogAdmin2 from '@/assets/blog-admin-2.jpg';

export type BlogCategory = 'visa' | 'work' | 'social' | 'students' | 'admin';

export interface BlogPost {
  id: string;
  category: BlogCategory;
  image: string;
  ar: {
    title: string;
    excerpt: string;
    content: string[];
    tips: string[];
    mistakes: string[];
  };
  fr: {
    title: string;
    excerpt: string;
    content: string[];
    tips: string[];
    mistakes: string[];
  };
}

export const categoryLabels: Record<BlogCategory, { ar: string; fr: string; icon: string }> = {
  visa: { ar: 'التأشيرات', fr: 'Visas', icon: '✈️' },
  work: { ar: 'الشغل', fr: 'Travail', icon: '💼' },
  social: { ar: 'الضمان الاجتماعي', fr: 'Sécurité Sociale', icon: '🏥' },
  students: { ar: 'الطلبة', fr: 'Étudiants', icon: '🎓' },
  admin: { ar: 'نصائح إدارية', fr: 'Conseils Admin', icon: '📄' },
};

export const categoryImages: Record<BlogCategory, string> = {
  visa: blogVisa,
  work: blogWork,
  social: blogSocial,
  students: blogStudents,
  admin: blogAdmin,
};

export const blogPosts: BlogPost[] = [
  {
    id: 'visa-success-file',
    category: 'visa',
    image: blogVisa,
    ar: {
      title: 'كيفاش تعمل ملف تأشيرة ناجح؟',
      excerpt: 'دليل شامل لتحضير ملف تأشيرة قوي يضمن لك القبول من أول مرة.',
      content: [
        'تحضير ملف التأشيرة يتطلب دقة واهتمام بالتفاصيل. الملف الناجح هو الذي يحتوي على كل الوثائق المطلوبة بشكل منظم ومرتب.',
        'أول خطوة هي تحديد نوع التأشيرة المطلوبة (سياحية، عمل، دراسة) ثم جمع الوثائق الأساسية.',
        'الوثائق الأساسية تشمل: جواز السفر ساري المفعول، صور شخصية، كشف حساب بنكي، تأمين سفر، حجز فندق أو دعوة، وتذكرة طيران.',
        'من المهم جدًا أن تكون كل الوثائق مترجمة ومصادق عليها حسب متطلبات السفارة.',
      ],
      tips: [
        'قدّم ملفك قبل الموعد بشهرين على الأقل',
        'تأكد من صلاحية جواز السفر (6 أشهر على الأقل)',
        'جهّز كشف حساب بنكي لآخر 3 أشهر',
        'أضف رسالة تحفيزية توضح سبب السفر',
      ],
      mistakes: [
        'تقديم وثائق منتهية الصلاحية',
        'عدم ترجمة الوثائق',
        'كشف حساب بنكي فارغ أو غير كافي',
        'عدم حجز موعد مسبق في السفارة',
      ],
    },
    fr: {
      title: 'Comment préparer un dossier de visa réussi ?',
      excerpt: 'Guide complet pour constituer un dossier de visa solide et maximiser vos chances d\'acceptation.',
      content: [
        'La préparation d\'un dossier de visa nécessite de la précision et une attention aux détails. Un dossier réussi contient tous les documents requis, organisés et bien présentés.',
        'La première étape consiste à identifier le type de visa requis (tourisme, travail, études) puis à rassembler les documents de base.',
        'Les documents essentiels incluent : passeport valide, photos d\'identité, relevé bancaire, assurance voyage, réservation d\'hôtel ou invitation, et billet d\'avion.',
        'Il est très important que tous les documents soient traduits et certifiés selon les exigences de l\'ambassade.',
      ],
      tips: [
        'Déposez votre dossier au moins 2 mois à l\'avance',
        'Vérifiez la validité du passeport (6 mois minimum)',
        'Préparez un relevé bancaire des 3 derniers mois',
        'Ajoutez une lettre de motivation expliquant le but du voyage',
      ],
      mistakes: [
        'Présenter des documents périmés',
        'Ne pas traduire les documents',
        'Relevé bancaire insuffisant',
        'Ne pas prendre de rendez-vous à l\'ambassade',
      ],
    },
  },
  {
    id: 'visa-rejection',
    category: 'visa',
    image: blogVisa,
    ar: {
      title: 'أهم أسباب رفض الفيزا وكيف تتجنبها',
      excerpt: 'تعرّف على الأسباب الشائعة لرفض التأشيرة وكيف تتفاداها.',
      content: [
        'رفض التأشيرة أمر شائع لكن يمكن تجنبه بسهولة إذا فهمت الأسباب الرئيسية.',
        'من أبرز الأسباب: ملف غير مكتمل، وثائق مزورة أو غير صحيحة، وعدم إثبات القدرة المالية.',
        'السفارات تبحث عن ضمانات بأنك ستعود إلى بلدك: عقد عمل، ملكية عقار، أو روابط عائلية قوية.',
        'التحضير الجيد هو المفتاح. ننصح دائمًا بالاستعانة بمختص لمراجعة ملفك قبل تقديمه.',
      ],
      tips: [
        'كن صادقًا في كل المعلومات',
        'أثبت روابطك ببلدك (عمل، عائلة، ملكية)',
        'قدّم ملفًا نظيفًا ومرتبًا',
        'لا تترك أي وثيقة ناقصة',
      ],
      mistakes: [
        'تقديم معلومات خاطئة',
        'عدم إثبات القدرة المالية',
        'ملف غير مرتب',
        'تجاهل متطلبات السفارة',
      ],
    },
    fr: {
      title: 'Les principales causes de refus de visa et comment les éviter',
      excerpt: 'Découvrez les raisons courantes de refus de visa et apprenez à les éviter.',
      content: [
        'Le refus de visa est courant mais peut être facilement évité si vous comprenez les raisons principales.',
        'Parmi les causes principales : dossier incomplet, documents falsifiés ou incorrects, et incapacité à prouver les moyens financiers.',
        'Les ambassades cherchent des garanties de retour : contrat de travail, propriété immobilière, ou liens familiaux solides.',
        'Une bonne préparation est la clé. Nous recommandons toujours de faire vérifier votre dossier par un spécialiste.',
      ],
      tips: [
        'Soyez honnête dans toutes vos informations',
        'Prouvez vos liens avec votre pays (travail, famille, propriété)',
        'Présentez un dossier propre et organisé',
        'Ne laissez aucun document manquant',
      ],
      mistakes: [
        'Fournir de fausses informations',
        'Ne pas prouver la capacité financière',
        'Dossier désorganisé',
        'Ignorer les exigences de l\'ambassade',
      ],
    },
  },
  {
    id: 'work-rights-fired',
    category: 'work',
    image: blogWork,
    ar: {
      title: 'حقوقك بعد الطرد من العمل',
      excerpt: 'تعرّف على حقوقك القانونية إذا تم طردك من العمل في تونس.',
      content: [
        'الطرد من العمل لا يعني نهاية حقوقك. القانون التونسي يضمن حماية واسعة للعمال.',
        'في حالة الطرد التعسفي، يحق لك الحصول على تعويضات تشمل: منحة الطرد، أجرة الإعلام المسبق، وتعويض عن الأضرار.',
        'يجب تقديم شكاية لدى تفقدية الشغل في أجل 30 يومًا من تاريخ الطرد.',
        'إذا لم تُحل القضية وديًا، يمكنك رفع قضية أمام قاضي الشغل.',
      ],
      tips: [
        'احتفظ بنسخة من عقد العمل وكشوف الأجور',
        'سجّل تاريخ الطرد وظروفه',
        'قدّم شكايتك في الآجال القانونية',
        'استعن بمختص لتحرير الشكاية',
      ],
      mistakes: [
        'التأخر في تقديم الشكاية',
        'عدم الاحتفاظ بالوثائق',
        'قبول تسوية غير عادلة',
        'عدم المطالبة بكل حقوقك',
      ],
    },
    fr: {
      title: 'Vos droits après un licenciement',
      excerpt: 'Connaissez vos droits légaux en cas de licenciement en Tunisie.',
      content: [
        'Le licenciement ne signifie pas la fin de vos droits. Le droit tunisien garantit une protection étendue aux travailleurs.',
        'En cas de licenciement abusif, vous avez droit à des indemnités incluant : prime de licenciement, préavis, et dommages et intérêts.',
        'Vous devez déposer une plainte auprès de l\'inspection du travail dans un délai de 30 jours suivant le licenciement.',
        'Si l\'affaire n\'est pas résolue à l\'amiable, vous pouvez saisir le juge prud\'homal.',
      ],
      tips: [
        'Conservez une copie de votre contrat et fiches de paie',
        'Notez la date et les circonstances du licenciement',
        'Déposez votre plainte dans les délais légaux',
        'Faites appel à un spécialiste pour rédiger la plainte',
      ],
      mistakes: [
        'Tarder à déposer la plainte',
        'Ne pas conserver les documents',
        'Accepter un arrangement injuste',
        'Ne pas réclamer tous vos droits',
      ],
    },
  },
  {
    id: 'work-case-win',
    category: 'work',
    image: blogWork,
    ar: {
      title: 'كيف تربح قضية شغل؟',
      excerpt: 'خطوات عملية لتحضير قضية شغل ناجحة.',
      content: [
        'الفوز في قضية شغل يتطلب تحضيرًا جيدًا وملفًا قويًا.',
        'اجمع كل الأدلة: عقد العمل، كشوف الأجور، شهادات الزملاء، والمراسلات مع المشغّل.',
        'قدّم شكاية لدى تفقدية الشغل أولاً. هذه خطوة إلزامية قبل اللجوء للقضاء.',
        'في المحكمة، الملف المنظم والأدلة الواضحة هي مفتاح النجاح.',
      ],
      tips: [
        'وثّق كل شيء من البداية',
        'احترم الإجراءات القانونية',
        'استعن بمختص في قضايا الشغل',
        'كن صبورًا - القضايا تأخذ وقتها',
      ],
      mistakes: [
        'عدم المرور بتفقدية الشغل',
        'فقدان الوثائق المهمة',
        'تقديم معلومات متناقضة',
        'التنازل تحت الضغط',
      ],
    },
    fr: {
      title: 'Comment gagner un procès prud\'homal ?',
      excerpt: 'Étapes pratiques pour préparer une affaire prud\'homale réussie.',
      content: [
        'Gagner un procès prud\'homal nécessite une bonne préparation et un dossier solide.',
        'Rassemblez toutes les preuves : contrat de travail, fiches de paie, témoignages de collègues, et correspondances avec l\'employeur.',
        'Déposez d\'abord une plainte auprès de l\'inspection du travail. C\'est une étape obligatoire avant de saisir la justice.',
        'Au tribunal, un dossier organisé et des preuves claires sont la clé du succès.',
      ],
      tips: [
        'Documentez tout dès le début',
        'Respectez les procédures légales',
        'Faites appel à un spécialiste du droit du travail',
        'Soyez patient - les affaires prennent du temps',
      ],
      mistakes: [
        'Ne pas passer par l\'inspection du travail',
        'Perdre des documents importants',
        'Fournir des informations contradictoires',
        'Abandonner sous la pression',
      ],
    },
  },
  {
    id: 'social-retirement-calc',
    category: 'social',
    image: blogSocial,
    ar: {
      title: 'كيفاش تحسب التقاعد؟',
      excerpt: 'دليل مبسّط لفهم حساب جراية التقاعد في تونس.',
      content: [
        'حساب جراية التقاعد يعتمد على عدة عوامل أساسية: مدة الاشتراك، معدل الأجور، والسن.',
        'الحد الأدنى للاشتراك هو 120 شهرًا (10 سنوات). كلما زادت مدة الاشتراك، زادت الجراية.',
        'تُحسب الجراية على أساس معدل أجور آخر 10 سنوات مضروبًا في نسبة تتراوح بين 30% و80%.',
        'السن القانونية للتقاعد هي 60 سنة، مع إمكانية التقاعد المبكر في حالات معينة.',
      ],
      tips: [
        'تحقق من عدد أشهر اشتراكك في CNSS/CNRPS',
        'احتفظ بكل كشوف الأجور',
        'قدّم ملفك قبل 6 أشهر من تاريخ التقاعد',
        'استفسر عن الاتفاقيات الثنائية إذا عملت بالخارج',
      ],
      mistakes: [
        'عدم التحقق من سنوات الاشتراك',
        'فقدان كشوف الأجور القديمة',
        'التأخر في تقديم الملف',
        'عدم الاستفادة من الاتفاقيات الثنائية',
      ],
    },
    fr: {
      title: 'Comment calculer sa retraite ?',
      excerpt: 'Guide simplifié pour comprendre le calcul de la pension de retraite en Tunisie.',
      content: [
        'Le calcul de la pension de retraite dépend de plusieurs facteurs clés : durée de cotisation, moyenne des salaires, et âge.',
        'La durée minimale de cotisation est de 120 mois (10 ans). Plus la durée est longue, plus la pension est élevée.',
        'La pension est calculée sur la base du salaire moyen des 10 dernières années, multiplié par un taux variant de 30% à 80%.',
        'L\'âge légal de la retraite est de 60 ans, avec possibilité de retraite anticipée dans certains cas.',
      ],
      tips: [
        'Vérifiez le nombre de mois de cotisation CNSS/CNRPS',
        'Conservez toutes vos fiches de paie',
        'Déposez votre dossier 6 mois avant la date de retraite',
        'Renseignez-vous sur les conventions bilatérales si vous avez travaillé à l\'étranger',
      ],
      mistakes: [
        'Ne pas vérifier les années de cotisation',
        'Perdre les anciennes fiches de paie',
        'Tarder à déposer le dossier',
        'Ne pas profiter des conventions bilatérales',
      ],
    },
  },
  {
    id: 'social-recover-rights',
    category: 'social',
    image: blogSocial,
    ar: {
      title: 'كيف تسترجع مستحقاتك من الضمان الاجتماعي؟',
      excerpt: 'خطوات عملية لاسترجاع حقوقك في التعويضات والجرايات.',
      content: [
        'كثير من المواطنين لا يعرفون أن لديهم مستحقات غير مصروفة لدى صناديق الضمان الاجتماعي.',
        'تشمل المستحقات: تعويضات المرض، إجازة الأمومة، حوادث الشغل، ومنح العائلة.',
        'للمطالبة بمستحقاتك، يجب تقديم ملف كامل لدى الفرع المختص مع الوثائق الداعمة.',
        'في حالة الرفض، يمكنك تقديم عريضة لدى قاضي الضمان الاجتماعي.',
      ],
      tips: [
        'راجع حسابك لدى CNSS بانتظام',
        'احتفظ بالشهادات الطبية والوثائق',
        'قدّم مطالبك في الآجال المحددة',
        'لا تتردد في الطعن في حالة الرفض',
      ],
      mistakes: [
        'تجاهل حقوقك في التعويضات',
        'عدم متابعة الملف',
        'فقدان الوثائق الطبية',
        'القبول بالرفض دون طعن',
      ],
    },
    fr: {
      title: 'Comment récupérer vos droits à la sécurité sociale ?',
      excerpt: 'Étapes pratiques pour récupérer vos indemnités et pensions.',
      content: [
        'Beaucoup de citoyens ignorent qu\'ils ont des prestations non versées auprès des caisses de sécurité sociale.',
        'Les prestations incluent : indemnités maladie, congé maternité, accidents du travail, et allocations familiales.',
        'Pour réclamer vos droits, vous devez déposer un dossier complet auprès de l\'agence compétente avec les pièces justificatives.',
        'En cas de refus, vous pouvez saisir le juge de la sécurité sociale.',
      ],
      tips: [
        'Vérifiez régulièrement votre compte CNSS',
        'Conservez les certificats médicaux et documents',
        'Déposez vos demandes dans les délais',
        'N\'hésitez pas à faire appel en cas de refus',
      ],
      mistakes: [
        'Ignorer vos droits aux indemnités',
        'Ne pas suivre le dossier',
        'Perdre les documents médicaux',
        'Accepter le refus sans recours',
      ],
    },
  },
  {
    id: 'students-orientation',
    category: 'students',
    image: blogStudents,
    ar: {
      title: 'كيف تختار اختصاصك الجامعي؟',
      excerpt: 'دليل شامل للتوجيه الجامعي واختيار التخصص المناسب.',
      content: [
        'اختيار التخصص الجامعي من أهم القرارات في حياتك. يجب أن يكون مبنيًا على ميولاتك وقدراتك وسوق الشغل.',
        'ابدأ بتقييم ميولاتك: ما هي المواد التي تتفوق فيها؟ ما هي اهتماماتك؟',
        'ادرس سوق الشغل: ما هي التخصصات المطلوبة؟ ما هي فرص العمل المتاحة؟',
        'استشر أشخاصًا يعملون في المجالات التي تهمك. تجربتهم ستساعدك في اتخاذ القرار.',
      ],
      tips: [
        'لا تختار تخصصًا فقط لأنه "مرموق"',
        'ابحث عن فرص العمل لكل تخصص',
        'زر الجامعات والمعاهد قبل التسجيل',
        'استفد من خدمات التوجيه المتاحة',
      ],
      mistakes: [
        'اختيار تخصص بناءً على رأي الآخرين فقط',
        'تجاهل سوق الشغل',
        'عدم البحث عن التخصص مسبقًا',
        'التسرع في القرار',
      ],
    },
    fr: {
      title: 'Comment choisir votre spécialité universitaire ?',
      excerpt: 'Guide complet d\'orientation universitaire pour choisir la bonne spécialité.',
      content: [
        'Le choix de la spécialité universitaire est l\'une des décisions les plus importantes de votre vie. Il doit être basé sur vos intérêts, capacités et le marché du travail.',
        'Commencez par évaluer vos intérêts : dans quelles matières excellez-vous ? Quels sont vos centres d\'intérêt ?',
        'Étudiez le marché du travail : quelles spécialités sont demandées ? Quelles opportunités d\'emploi existent ?',
        'Consultez des personnes travaillant dans les domaines qui vous intéressent. Leur expérience vous aidera à prendre votre décision.',
      ],
      tips: [
        'Ne choisissez pas une spécialité juste parce qu\'elle est "prestigieuse"',
        'Recherchez les opportunités d\'emploi pour chaque spécialité',
        'Visitez les universités avant de vous inscrire',
        'Profitez des services d\'orientation disponibles',
      ],
      mistakes: [
        'Choisir une spécialité basée uniquement sur l\'avis des autres',
        'Ignorer le marché du travail',
        'Ne pas se renseigner sur la spécialité',
        'Se précipiter dans la décision',
      ],
    },
  },
  {
    id: 'students-motivation-letter',
    category: 'students',
    image: blogStudents,
    ar: {
      title: 'كيف تكتب Lettre de motivation ناجحة؟',
      excerpt: 'نصائح عملية لكتابة رسالة تحفيزية تلفت الانتباه.',
      content: [
        'الرسالة التحفيزية هي فرصتك لإقناع الجامعة أو المؤسسة بقبولك. يجب أن تكون شخصية ومقنعة.',
        'ابدأ بمقدمة قوية تعرّف فيها نفسك وتوضّح سبب تقدّمك.',
        'في الجسم الرئيسي، اذكر مؤهلاتك وخبراتك وكيف تتوافق مع متطلبات البرنامج.',
        'اختم بخلاصة تؤكد حماسك واستعدادك.',
      ],
      tips: [
        'خصّص كل رسالة للمؤسسة المستهدفة',
        'كن صادقًا ومحددًا',
        'أبرز ما يميزك عن الآخرين',
        'راجع الرسالة عدة مرات قبل الإرسال',
      ],
      mistakes: [
        'نسخ رسالة جاهزة من الإنترنت',
        'كتابة رسالة عامة لكل المؤسسات',
        'أخطاء إملائية ولغوية',
        'الإطالة المفرطة',
      ],
    },
    fr: {
      title: 'Comment rédiger une lettre de motivation réussie ?',
      excerpt: 'Conseils pratiques pour écrire une lettre de motivation qui attire l\'attention.',
      content: [
        'La lettre de motivation est votre chance de convaincre l\'université ou l\'institution de vous accepter. Elle doit être personnelle et convaincante.',
        'Commencez par une introduction forte qui vous présente et explique votre candidature.',
        'Dans le corps principal, mentionnez vos qualifications et expériences et comment elles correspondent aux exigences du programme.',
        'Concluez par un résumé confirmant votre enthousiasme et votre engagement.',
      ],
      tips: [
        'Personnalisez chaque lettre pour l\'institution visée',
        'Soyez honnête et précis',
        'Mettez en avant ce qui vous distingue',
        'Relisez la lettre plusieurs fois avant l\'envoi',
      ],
      mistakes: [
        'Copier une lettre toute faite d\'Internet',
        'Écrire une lettre générique pour toutes les institutions',
        'Erreurs d\'orthographe et de grammaire',
        'Longueur excessive',
      ],
    },
  },
  {
    id: 'admin-complaint',
    category: 'admin',
    image: blogAdmin,
    ar: {
      title: 'كيفاش تعمل شكاية إدارية صحيحة؟',
      excerpt: 'تعلّم كيفية تحرير شكاية إدارية بالشكل القانوني الصحيح.',
      content: [
        'الشكاية الإدارية هي وسيلة قانونية للمطالبة بحقوقك أمام الإدارة.',
        'يجب أن تحتوي على: بيانات المشتكي، الجهة المعنية، موضوع الشكاية، والوقائع بالتفصيل.',
        'استخدم لغة رسمية ومحترمة. تجنب العبارات العاطفية أو التهديدية.',
        'أرفق كل الوثائق الداعمة وأرسل نسخة مسجّلة مع إشعار بالاستلام.',
      ],
      tips: [
        'كن واضحًا ومحددًا في شكايتك',
        'أرقّم الوثائق المرفقة',
        'احتفظ بنسخة من كل المراسلات',
        'حدد ما تطلبه بوضوح',
      ],
      mistakes: [
        'كتابة شكاية بلغة غير رسمية',
        'عدم إرفاق الوثائق الداعمة',
        'عدم الاحتفاظ بنسخة',
        'عدم متابعة الشكاية',
      ],
    },
    fr: {
      title: 'Comment rédiger une réclamation administrative correcte ?',
      excerpt: 'Apprenez à rédiger une réclamation administrative dans les règles.',
      content: [
        'La réclamation administrative est un moyen légal pour revendiquer vos droits auprès de l\'administration.',
        'Elle doit contenir : les données du plaignant, l\'organisme concerné, l\'objet de la réclamation, et les faits en détail.',
        'Utilisez un langage formel et respectueux. Évitez les expressions émotionnelles ou menaçantes.',
        'Joignez tous les documents justificatifs et envoyez une copie en recommandé avec accusé de réception.',
      ],
      tips: [
        'Soyez clair et précis dans votre réclamation',
        'Numérotez les documents joints',
        'Gardez une copie de toute la correspondance',
        'Précisez clairement ce que vous demandez',
      ],
      mistakes: [
        'Rédiger en langage informel',
        'Ne pas joindre les pièces justificatives',
        'Ne pas garder de copie',
        'Ne pas suivre la réclamation',
      ],
    },
  },
  {
    id: 'admin-commercial-register',
    category: 'admin',
    image: blogAdmin,
    ar: {
      title: 'كل ما تحتاج معرفته عن السجل التجاري',
      excerpt: 'دليل شامل لاستخراج وتجديد السجل التجاري في تونس.',
      content: [
        'السجل التجاري هو وثيقة أساسية لكل نشاط تجاري في تونس.',
        'للحصول على السجل التجاري، تحتاج: بطاقة التعريف، عقد الكراء أو ملكية المحل، وتصريح بالنشاط.',
        'يتم التسجيل لدى كتابة المحكمة الابتدائية المختصة.',
        'يجب تجديد السجل التجاري سنويًا لتفادي الغرامات.',
      ],
      tips: [
        'جهّز كل الوثائق قبل الذهاب',
        'تأكد من صحة عقد الكراء',
        'جدّد السجل في الوقت المحدد',
        'احتفظ بنسخ من كل الوثائق',
      ],
      mistakes: [
        'نسيان تجديد السجل سنويًا',
        'وثائق غير مكتملة',
        'عدم التصريح بتغيير النشاط',
        'تجاهل الآجال القانونية',
      ],
    },
    fr: {
      title: 'Tout savoir sur le registre de commerce',
      excerpt: 'Guide complet pour obtenir et renouveler le registre de commerce en Tunisie.',
      content: [
        'Le registre de commerce est un document essentiel pour toute activité commerciale en Tunisie.',
        'Pour l\'obtenir, vous avez besoin de : carte d\'identité, contrat de bail ou titre de propriété, et déclaration d\'activité.',
        'L\'inscription se fait auprès du greffe du tribunal de première instance compétent.',
        'Le registre de commerce doit être renouvelé annuellement pour éviter les amendes.',
      ],
      tips: [
        'Préparez tous les documents avant de vous déplacer',
        'Vérifiez la validité du contrat de bail',
        'Renouvelez le registre dans les temps',
        'Conservez des copies de tous les documents',
      ],
      mistakes: [
        'Oublier le renouvellement annuel',
        'Documents incomplets',
        'Ne pas déclarer un changement d\'activité',
        'Ignorer les délais légaux',
      ],
    },
  },
];

export const blogLabels = {
  ar: {
    title: 'المدونة',
    subtitle: 'مقالات ونصائح مفيدة لمساعدتك في إجراءاتك',
    searchPlaceholder: 'ابحث في المقالات...',
    allCategories: 'الكل',
    readMore: 'اقرأ المزيد',
    tips: '💡 نصائح مهمة',
    mistakes: '⚠️ أخطاء يجب تجنبها',
    contactCta: 'اتصل بنا',
    bookingCta: 'احجز موعد',
    whatsappCta: 'واتساب',
    loadMore: 'عرض المزيد',
    noResults: 'لا توجد نتائج',
    latest: 'أحدث المقالات',
    popular: 'الأكثر قراءة',
  },
  fr: {
    title: 'Blog',
    subtitle: 'Articles et conseils utiles pour vos démarches',
    searchPlaceholder: 'Rechercher un article...',
    allCategories: 'Tous',
    readMore: 'Lire la suite',
    tips: '💡 Conseils importants',
    mistakes: '⚠️ Erreurs à éviter',
    contactCta: 'Contactez-nous',
    bookingCta: 'Prendre RDV',
    whatsappCta: 'WhatsApp',
    loadMore: 'Voir plus',
    noResults: 'Aucun résultat',
    latest: 'Derniers articles',
    popular: 'Les plus lus',
  },
};
