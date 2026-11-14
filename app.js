
/* Consistent, locally rendered outline icons — no icon font or runtime CDN. */
const ICON_PATHS={
 sparkles:'<path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/><path d="m19 17 .7 1.3L21 19l-1.3.7L19 21l-.7-1.3L17 19l1.3-.7L19 17ZM4 2l.7 1.3L6 4l-1.3.7L4 6l-.7-1.3L2 4l1.3-.7L4 2Z"/>',
 code:'<path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
 repeat:'<path d="m17 2 4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 0 1-3 3H3"/>',
 chart:'<path d="M3 3v18h18M7 15v3M11 10v8M15 12v6M19 5v13"/>',
 panels:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 9v12M15 3v6"/>',
 graduation:'<path d="m2 10 10-5 10 5-10 5-10-5ZM6 12v5c3.8 3 8.2 3 12 0v-5M22 10v6"/>',
 rocket:'<path d="M4.5 16.5c-1.1.9-1.5 3.2-1.5 4.5 1.3 0 3.6-.4 4.5-1.5M12 6l6 6M5.8 16.8 3 14c0-2.5 1.5-4.3 4.5-4.5 1.5-3.3 5.6-6.3 12.5-6.5 0 6.9-3.2 11.2-6.5 12.5-.2 3-2 4.5-4.5 4.5l-2.8-2.7Z"/><circle cx="14" cy="10" r="1.3"/>',
 message:'<path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 8.6 8.6 0 0 1-4-.9L3 21l1.9-5.5a8.5 8.5 0 1 1 16.1-4Z"/><path d="M8 10h9M8 14h6"/>',
 layers:'<path d="m12 2 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 17l9 5 9-5"/>',
 shopping:'<path d="m3 9 2 12h14l2-12H3ZM8 10l4-7 4 7M9 14v3M15 14v3"/>',
 store:'<path d="m3 9 2-6h14l2 6v2a3 3 0 0 1-5 2 3 3 0 0 1-4 0 3 3 0 0 1-4 0 3 3 0 0 1-5-2V9ZM5 15v6h14v-6M10 21v-6h4v6"/>',
 bag:'<rect x="4" y="7" width="16" height="14" rx="2"/><path d="M9 10V6a3 3 0 0 1 6 0v4"/>',
 wallet:'<rect x="3" y="5" width="18" height="15" rx="3"/><path d="M16 12h5v5h-5a2.5 2.5 0 0 1 0-5Z"/><path d="M4 8V5a2 2 0 0 1 2-2h12"/>',
 book:'<path d="M12 6c-3.5-2.5-7-2.7-10-2v15c3-.8 6.5-.6 10 2 3.5-2.6 7-2.8 10-2V4c-3-.7-6.5-.5-10 2ZM12 6v15"/>',
 bookcheck:'<path d="M12 6C8.5 3.5 5 3.3 2 4v15c3-.8 6.5-.6 10 2 3.5-2.6 7-2.8 10-2V4c-3-.7-6.5-.5-10 2ZM12 6v15M15 12l2 2 3-4"/>',
 heartpulse:'<path d="M20.8 4.8a5.5 5.5 0 0 0-7.8 0l-1 1-1-1a5.5 5.5 0 0 0-7.8 7.8l8.8 9 8.8-9a5.5 5.5 0 0 0 0-7.8ZM2 12h5l2-3 3 7 2-4h8"/>',
 building:'<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 21v-5h6v5M8 7h1M15 7h1M8 11h1M15 11h1"/>',
 heart:'<path d="M20.8 4.5a5 5 0 0 0-7.1 0L12 6.2l-1.7-1.7a5 5 0 0 0-7.1 7.1L12 20l8.8-8.4a5 5 0 0 0 0-7.1Z"/><path d="M6 13h3l2-3 2 5 2-2h3"/>',
 grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
 home:'<path d="m3 10 9-7 9 7M5 9v12h14V9M9 21v-8h6v8"/>',
 network:'<rect x="9" y="2" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="16" y="16" width="6" height="6" rx="1"/><path d="M12 8v4M5 16v-4h14v4"/>',
 mail:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m3 6 9 7 9-7"/>',
 fingerprint:'<path d="M5 12V9a7 7 0 0 1 14 0v2M8 16V9a4 4 0 0 1 8 0v6M12 8v9M5 16c0 2 1 4 2 5M16 18c0 1-.5 2-1 3M19 16v1M10 21c1-2 1-4 1-6"/>',
 bell:'<path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4"/>',
 sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
 moon:'<path d="M20.5 14a8.5 8.5 0 0 1-10.5-10.5 8.5 8.5 0 1 0 10.5 10.5Z"/>'
};
function lineIcon(name,size=24){
 const content=ICON_PATHS[name]||ICON_PATHS.sparkles;
 return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${content}</svg>`;
}
const PRODUCT_ICONS={platform:'layers',codemood:'code',growthmood:'graduation',market:'shopping',aljamal:'store',storemood:'bag',paymood:'wallet',halaqati:'book',quranoasis:'bookcheck',healthmood:'heartpulse',peace:'building',impact:'heart'};
const SERVICE_ICONS=['sparkles','code','repeat','chart','panels','graduation','rocket','message'];
const ORBIT_ICONS=['sparkles','code','bag','graduation','chart','heart'];
function enhanceStaticIcons(){
 document.querySelectorAll('.core-tiles > div > span').forEach((el,i)=>el.innerHTML=lineIcon(['fingerprint','sparkles','bell','network'][i],23));
 document.querySelectorAll('.bottom-nav a > span').forEach((el,i)=>el.innerHTML=lineIcon(['home','grid','layers','network','mail'][i],23));
 document.querySelectorAll('.orbit-label').forEach((el,i)=>{
   const text=el.textContent;
   el.textContent='';
   el.insertAdjacentHTML('afterbegin',lineIcon(ORBIT_ICONS[i]||'sparkles',13));
   const label=document.createElement('span');
   label.textContent=text;el.appendChild(label);
 });
}

/* TechMood Technology — no external JS dependencies, no back-end claims. */
const PRODUCTS = [
 {id:'platform',group:'education',icon:'✦',color:'blue',alias:'MentorMood',ar:'MentorMood',en:'MentorMood',arDesc:'منصة للتعلّم والتوجيه المهني وربط المهارات بالمشاريع والفرص.',enDesc:'A learning and professional mentoring platform connecting skills, projects and opportunities.'},
 {id:'codemood',group:'education',icon:'⌘',color:'violet',alias:'CodeMood',url:'https://codemood.vercel.app',ar:'CodeMood',en:'CodeMood',arDesc:'مساحة لتعلّم البرمجة والذكاء الاصطناعي والتطبيق العملي.',enDesc:'A practical space for coding, artificial intelligence and real projects.'},
 {id:'growthmood',group:'education',icon:'↗',color:'cyan',alias:'GrowthMood',url:'https://growthmood.vercel.app',ar:'GrowthMood',en:'GrowthMood',arDesc:'حلول لإدارة التدريب والبرامج التعليمية وتطوير التجربة داخل المراكز.',enDesc:'Tools for managing learning programs and training-centre experiences.'},
 {id:'market',group:'commerce',icon:'▦',color:'green',alias:'Gaza Online Market',url:'https://capital-digital-market.vercel.app',ar:'سوق العاصمة الرقمي',en:'Capital Digital Market',arDesc:'سوق رقمي يربط متاجر المنطقة الوسطى بالعملاء وخدمات التوصيل.',enDesc:'A local marketplace connecting central Gaza shops, shoppers and delivery.'},
 {id:'aljamal',group:'commerce',icon:'◇',color:'orange',alias:'AlJamal Store',url:'https://aljamalbrand.vercel.app',ar:'متجر الجمل',en:'AlJamal Store',arDesc:'واجهة تجارة إلكترونية لعرض المنتجات وإدارة تجربة التسوق.',enDesc:'An e-commerce storefront and a digital shopping experience.'},
 {id:'storemood',group:'commerce',icon:'▣',color:'violet',alias:'StoreMood',url:'https://storemood.vercel.app',ar:'StoreMood',en:'StoreMood',arDesc:'متجر للخدمات الرقمية والأدوات والاشتراكات المرتبطة بالمنظومة.',enDesc:'A planned home for digital services, tools and subscriptions.'},
 {id:'paymood',group:'finance',icon:'◎',color:'cyan',alias:'PayMood',url:'https://paymood.vercel.app',ar:'PayMood',en:'PayMood',arDesc:'تصور لخدمات الدفع والمعاملات الرقمية عند توفر المتطلبات التشغيلية والتنظيمية.',enDesc:'A proposed payments layer, subject to operational and regulatory readiness.'},
 {id:'halaqati',group:'faith',icon:'۞',color:'green',alias:'Halaqati',url:'https://halaqati.vercel.app',ar:'حلقتي',en:'Halaqati',arDesc:'إدارة حلقات تحفيظ القرآن ومتابعة الطلاب والحضور والإنجاز.',enDesc:'Quran memorisation circle management, attendance and student progress.'},
 {id:'quranoasis',group:'faith',icon:'☼',color:'green',alias:'Wahat Al Quran',url:'https://quranoasis.vercel.app',ar:'واحة القرآن',en:'Quran Oasis',arDesc:'تجربة رقمية متخصصة لخدمة تعلم القرآن الكريم ومتابعة الرحلة التعليمية.',enDesc:'A specialised digital experience for Quran learning and progress.'},
 {id:'healthmood',group:'impact',icon:'✚',color:'rose',alias:'HealthMood',url:'https://healthmood.vercel.app',ar:'HealthMood',en:'HealthMood',arDesc:'تصور لخدمات صحية رقمية تراعي خصوصية المعلومات وسلامة المستخدم.',enDesc:'A digital-health concept emphasising privacy and user safety.'},
 {id:'peace',group:'impact',icon:'⌂',color:'orange',alias:'Peace Council',url:'https://peace-council.vercel.app',ar:'Peace Council',en:'Peace Council',arDesc:'مفهوم رقمي لمحاكاة التخطيط وإعادة الإعمار والمشاركة المجتمعية في غزة.',enDesc:'A concept for simulating planning, reconstruction and community participation in Gaza.'},
 {id:'impact',group:'impact',icon:'✳',color:'violet',alias:'ImpactMood',url:'https://impactmood.vercel.app',ar:'ImpactMood',en:'ImpactMood',arDesc:'توثيق المبادرات وقياس أثر المشاريع المجتمعية والتنموية.',enDesc:'Document initiatives and measure community and development impact.'}
];
const SERVICE_ITEMS = [
 {icon:'✺',ar:'الذكاء الاصطناعي والأتمتة',en:'AI & Automation',arDesc:'حلول ذكية تقلّل الأعمال المتكررة وتفتح فرصًا جديدة.',enDesc:'Smarter workflows that reduce repetitive work and create opportunities.'},
 {icon:'⌘',ar:'تطوير البرمجيات وتطبيقات الويب',en:'Web & Software Development',arDesc:'تطبيقات ومواقع رقمية حديثة وسريعة وقابلة للتوسع.',enDesc:'Modern, fast, scalable digital products and web applications.'},
 {icon:'⇄',ar:'التحول الرقمي',en:'Digital Transformation',arDesc:'تحويل العمليات المشتتة إلى تجارب رقمية مترابطة.',enDesc:'Turning fragmented processes into connected digital experiences.'},
 {icon:'▥',ar:'تحليل البيانات وذكاء الأعمال',en:'Data & Business Intelligence',arDesc:'فهم البيانات وتحويلها إلى مؤشرات تدعم القرار.',enDesc:'Making data useful through meaningful insights and decisions.'},
 {icon:'▣',ar:'إدارة المنتجات والفرق الرشيقة',en:'Products & Agile Teams',arDesc:'تطوير الفكرة إلى خطة قابلة للتجربة والقياس.',enDesc:'Moving from a concept to a measurable product roadmap.'},
 {icon:'✧',ar:'التعليم التقني والمهارات الرقمية',en:'Tech Education & Skills',arDesc:'تعلم عملي وبناء مهارات في مشاريع حقيقية.',enDesc:'Project-based learning and relevant digital skills.'},
 {icon:'↗',ar:'بناء المشاريع الناشئة',en:'Digital Venture Building',arDesc:'من اختبار الفكرة إلى إطلاق نسخة أولية.',enDesc:'From validating an idea to launching an initial product.'},
 {icon:'◇',ar:'الاستشارات التقنية',en:'Technology Consulting',arDesc:'مساعدة الفرق على اختيار الحل التقني الأنسب.',enDesc:'Helping teams choose technology that fits their real needs.'}
];
const TEXT = {
 ar:{
 skip:'تخطَّ إلى المحتوى',navServices:'الخدمات',navProducts:'المنتجات',navCore:'المنظومة',navAbout:'الشركة',navContact:'تواصل',startProject:'ابدأ مشروعًا',heroEyebrow:'AI-POWERED TECHNOLOGY ECOSYSTEM',heroTitle:'نحوّل الأفكار إلى <em>حلول رقمية ذكية</em> تعمل فعلاً',heroDescription:'TechMood Technology شركة تقنية فلسطينية تطوّر وتدير منظومة منتجات رقمية مستقلة تتكامل بذكاء، من التعليم وتنمية المهارات إلى الأعمال والتجارة والخدمات.',exploreProducts:'اكتشف منتجاتنا',exploreServices:'استكشف خدماتنا',palestine:'فلسطين',bilingual:'العربية والإنجليزية',independentProducts:'منتجات مستقلة، رؤية واحدة',orbitAi:'الذكاء الاصطناعي',orbitDev:'البرمجيات',orbitBusiness:'الأعمال الرقمية',orbitLearn:'التعلم والمهارات',orbitData:'البيانات',orbitImpact:'الأثر المجتمعي',statProducts:'منتجًا ومنصة',statSectors:'قطاعات رئيسية',statEcosystem:'منظومة مترابطة',motto:'One Ecosystem. Many Possibilities.',servicesKicker:'WHAT WE DO',servicesTitle:'مجالات عملنا',servicesIntro:'خبرات تقنية متكاملة، من الفكرة الأولى إلى بناء منتج رقمي قابل للنمو.',discussProject:'ناقش مشروعك ↗',productsKicker:'OUR VENTURES',productsTitle:'منتجاتنا ومشاريعنا',productsIntro:'اثنا عشر منتجًا مستقلًا، لكل منها وظيفة وجمهور، وتجمعها رؤية واحدة.',productUnit:'منتجًا',noResults:'لا توجد نتائج مطابقة. جرّب كلمة بحث أخرى.',availabilityNote:'روابط زيارة المنتجات مأخوذة من نطاقات Vercel المرتبطة بالمشاريع. قد تكون بعض عمليات النشر قيد الإصلاح؛ ووجود الرابط لا يعني اكتمال وظائف المنتج أو توفره دون انقطاع.',coreKicker:'SMARTLY CONNECTED',coreTitle:'مستقلّة في عملها.<br><em>متكاملة في رؤيتها.</em>',coreIntro:'لسنا بصدد جمع المنتجات في تطبيق واحد. كل منصة تحتفظ بميزاتها وبياناتها وصلاحياتها، فيما توفر TechMood Core الخدمات المشتركة عند الحاجة.',coreOne:'منتجات مستقلة ومستودعات منفصلة',coreTwo:'تجربة انتقال سلسة وروابط واضحة',coreThree:'تكاملات تدريجية، وليست وعودًا مطبقة',partnership:'ناقش فرصة شراكة',sharedServices:'خدمات مشتركة حسب الحاجة',identity:'الهوية والحسابات',aiLayer:'طبقة ذكاء مشتركة',notifications:'الإشعارات',integrations:'التكامل بين المنصات',coreDisclaimer:'هذه خريطة معمارية مقترحة؛ لا تعني أن كل خدمة متاحة حاليًا.',aboutKicker:'THE COMPANY',aboutTitle:'نبني تقنية تخدم <em>الإنسان والفكرة.</em>',aboutText:'TechMood Technology هي الشركة الأم للمنتجات التي ننشئها ونديرها. نركز على حلول عملية في التعليم، وتطوير البرمجيات، والتجارة الرقمية، والخدمات المتخصصة، ونسعى لبناء منتجات قابلة للتوسع دون التضحية بهويتها المستقلة.',value1:'✧ تصميم يضع المستخدم أولًا',value2:'✧ تقنية قابلة للتطوير',value3:'✧ أثر اقتصادي ومجتمعي',contactKicker:'LET’S BUILD SOMETHING',contactTitle:'لديك فكرة تستحق أن تتحوّل إلى واقع؟',contactText:'احكِ لنا عن مشروعك أو شراكتك، ولنبدأ من الهدف الحقيقي.',emailUs:'راسلنا عبر البريد',viewGithub:'استعرض مستودع الشركة ↗',footerDescription:'من فلسطين إلى العالم. منتجات مستقلة تجمعها رؤية تقنية واحدة.',rights:'جميع الحقوق محفوظة.',home:'الرئيسية',filters:{all:'الكل',education:'التعليم والمهارات',commerce:'التجارة',finance:'المدفوعات',faith:'القرآن',impact:'الصحة والأثر'},search:'ابحث عن منتج...',details:'التفاصيل',visit:'زيارة المنتج ↗',linked:'رابط منشور',catalog:'ضمن المنظومة',more:'اكتشف المزيد ↗',close:'إغلاق',noLink:'هذا المنتج ضمن خارطة المنظومة، ولم يُتحقق من رابط مستقل له بعد.',serviceMore:'تواصل معنا ↗',productFrom:'ضمن منتجات TechMood Technology'},
 en:{
 skip:'Skip to content',navServices:'Services',navProducts:'Ventures',navCore:'Ecosystem',navAbout:'Company',navContact:'Contact',startProject:'Start a project',heroEyebrow:'AI-POWERED TECHNOLOGY ECOSYSTEM',heroTitle:'We turn ideas into <em>intelligent digital solutions</em> that work.',heroDescription:'TechMood Technology is a Palestinian technology company building independent digital products that connect through a shared vision — from learning and skills to business, commerce and services.',exploreProducts:'Discover our ventures',exploreServices:'Explore our services',palestine:'Palestine',bilingual:'Arabic & English',independentProducts:'Independent products, one vision',orbitAi:'Artificial Intelligence',orbitDev:'Software',orbitBusiness:'Digital Commerce',orbitLearn:'Learning & Skills',orbitData:'Data',orbitImpact:'Social Impact',statProducts:'Products & platforms',statSectors:'Core sectors',statEcosystem:'Connected ecosystem',motto:'One Ecosystem. Many Possibilities.',servicesKicker:'WHAT WE DO',servicesTitle:'Our expertise',servicesIntro:'Connected technology capabilities, from the first idea to a product that can grow.',discussProject:'Discuss your project ↗',productsKicker:'OUR VENTURES',productsTitle:'Products & ventures',productsIntro:'Twelve independent products, each with its own audience and purpose, connected by one vision.',productUnit:'ventures',noResults:'No matching results. Try a different search.',availabilityNote:'Visit links point to project domains listed in Vercel. Some deployments may need fixes; a listed URL does not guarantee uptime or completed features.',coreKicker:'SMARTLY CONNECTED',coreTitle:'Independent in operation.<br><em>Connected by design.</em>',coreIntro:'We are not combining every product into one app. Each platform keeps its own features, data and permissions; TechMood Core provides shared services where they are genuinely useful.',coreOne:'Independent products and repositories',coreTwo:'Clear links and smooth navigation',coreThree:'Gradual integrations — not assumed functionality',partnership:'Explore a partnership',sharedServices:'Shared services when needed',identity:'Accounts and identity',aiLayer:'Shared AI layer',notifications:'Notifications',integrations:'Cross-product integrations',coreDisclaimer:'This is a proposed architecture, not a claim that every integration is live.',aboutKicker:'THE COMPANY',aboutTitle:'Technology that serves <em>people and ideas.</em>',aboutText:'TechMood Technology is the parent company behind the products we build and manage. Our focus is practical solutions for education, software, digital commerce and specialised services. Each product can grow while keeping its own identity.',value1:'✧ People-first design',value2:'✧ Technology built to scale',value3:'✧ Economic and social impact',contactKicker:'LET’S BUILD SOMETHING',contactTitle:'Have an idea worth making real?',contactText:'Tell us about your venture or partnership. We can start with the real goal.',emailUs:'Send us an email',viewGithub:'Browse our company repository ↗',footerDescription:'From Palestine to the world. Independent products, one technology vision.',rights:'All rights reserved.',home:'Home',filters:{all:'All',education:'Learning',commerce:'Commerce',finance:'Payments',faith:'Quran',impact:'Health & Impact'},search:'Search products...',details:'Details',visit:'Visit product ↗',linked:'Published link',catalog:'In portfolio',more:'Learn more ↗',close:'Close',noLink:'This venture is included in the ecosystem roadmap; a separate public URL has not been verified yet.',serviceMore:'Contact us ↗',productFrom:'Part of TechMood Technology'}
};
let language = (localStorage.getItem('tm-language') || 'ar') === 'en' ? 'en' : 'ar';
let selectedGroup = 'all';
const $ = (id) => document.getElementById(id);
const t = (key) => TEXT[language][key] ?? key;
function safeExternal(url){ try {const u = new URL(url);return u.protocol==='https:' ? u.href : ''; }catch{return '';} }
function renderServices(){
 $('servicesGrid').innerHTML = SERVICE_ITEMS.map((s,i)=>`<article class="service-card"><span class="service-icon" aria-hidden="true">${lineIcon(SERVICE_ICONS[i],25)}</span><h3>${s[language]}</h3><p>${s[language+'Desc']}</p><a class="service-cta" href="#contact"><span>${t('serviceMore')}</span><span class="round-arrow" aria-hidden="true">↗</span></a></article>`).join('');
}
function renderFilters(){
 $('filters').innerHTML = Object.entries(t('filters')).map(([key,label])=>`<button type="button" class="filter-btn${selectedGroup===key?' active':''}" data-group="${key}" aria-pressed="${selectedGroup===key}">${label}</button>`).join('');
 $('filters').querySelectorAll('button').forEach(btn => btn.addEventListener('click',()=>{ selectedGroup=btn.dataset.group;renderFilters();renderProducts(); }));
}
function visibleProducts(){
 const query=$('productSearch').value.trim().toLocaleLowerCase();
 return PRODUCTS.filter(p=>(selectedGroup==='all'||p.group===selectedGroup) && (!query || [p.ar,p.en,p.alias,p.arDesc,p.enDesc].some(x=>x.toLocaleLowerCase().includes(query))));
}
function renderProducts(){
 const matches=visibleProducts();
 $('noProducts').hidden=matches.length!==0;
 $('productGrid').innerHTML=matches.map(p=>{
  const url=p.url?safeExternal(p.url):'';
  return `<article class="product-card">
    <div class="card-top"><span class="product-icon" data-color="${p.color}" aria-hidden="true">${lineIcon(PRODUCT_ICONS[p.id],26)}</span><span class="product-status${url?' live':''}">${url?t('linked'):t('catalog')}</span></div>
    <h3>${p[language]}</h3><p class="product-alias" dir="ltr">${p.alias}</p>
    <p class="product-desc">${p[language+'Desc']}</p>
    <div class="product-actions"><button type="button" class="detail-button" data-product="${p.id}">${t('details')} ↗</button>${url?`<a class="external-link" href="${url}" target="_blank" rel="noopener noreferrer">${t('visit')}</a>`:`<span class="external-link" aria-hidden="true">${t('catalog')}</span>`}</div>
   </article>`;
 }).join('');
 $('productGrid').querySelectorAll('[data-product]').forEach(btn=>btn.addEventListener('click',()=>showProduct(btn.dataset.product)));
}
function showProduct(id){
 const p=PRODUCTS.find(item=>item.id===id);if(!p)return;
 $('dialogIcon').innerHTML=lineIcon(PRODUCT_ICONS[p.id],36);
 $('dialogCategory').textContent=t('filters')[p.group];
 $('dialogTitle').textContent=p[language];
 $('dialogSubtitle').textContent=p.alias;
 $('dialogDescription').textContent=p[language+'Desc']+' '+(!p.url?t('noLink'):t('productFrom'));
 $('dialogLinks').innerHTML=p.url?`<a class="btn btn-primary" target="_blank" rel="noopener noreferrer" href="${safeExternal(p.url)}">${t('visit')}</a>`:`<a class="btn btn-primary" href="#contact" data-dialog-contact>${t('partnership')}</a>`;
 const a=$('dialogLinks').querySelector('[data-dialog-contact]');if(a)a.addEventListener('click',()=>$('productDialog').close());
 $('productDialog').showModal();
}
function applyLanguage(){
 const root=document.documentElement;root.lang=language;root.dir=language==='ar'?'rtl':'ltr';
 document.title=language==='ar'?'TechMood Technology — منظومة واحدة، إمكانيات بلا حدود':'TechMood Technology — One Ecosystem. Many Possibilities.';
 $('languageToggle').textContent=language==='ar'?'EN':'عربي';
 $('languageToggle').setAttribute('aria-label',language==='ar'?'Switch to English':'التحويل إلى العربية');
 document.querySelectorAll('[data-i18n]').forEach(el=>{const key=el.dataset.i18n;if(typeof t(key)==='string')el.textContent=t(key);});
 document.querySelectorAll('[data-i18n-html]').forEach(el=>{const key=el.dataset.i18nHtml;if(typeof t(key)==='string')el.innerHTML=t(key);});
 $('productSearch').placeholder=t('search');$('productSearch').setAttribute('aria-label',t('search'));
 $('dialogClose').setAttribute('aria-label',t('close'));
 renderServices();renderFilters();renderProducts();enhanceStaticIcons();
}
function setTheme(theme){
 const next=theme==='dark'?'dark':'light';document.documentElement.dataset.theme=next;localStorage.setItem('tm-theme',next);
 $('themeIcon').innerHTML=lineIcon(next==='dark'?'sun':'moon',19);
 document.querySelector('meta[name="theme-color"]').content=next==='dark'?'#070d21':'#f6f8fd';
}
$('languageToggle').addEventListener('click',()=>{language=language==='ar'?'en':'ar';localStorage.setItem('tm-language',language);applyLanguage();});
$('themeToggle').addEventListener('click',()=>setTheme(document.documentElement.dataset.theme==='dark'?'light':'dark'));
$('productSearch').addEventListener('input',renderProducts);
$('menuToggle').addEventListener('click',()=>{
 const menu=$('mobileMenu');const open=menu.hidden;menu.hidden=!open;$('menuToggle').setAttribute('aria-expanded',String(open));
});
$('mobileMenu').querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{$('mobileMenu').hidden=true;$('menuToggle').setAttribute('aria-expanded','false');}));
$('dialogClose').addEventListener('click',()=>$('productDialog').close());
$('productDialog').addEventListener('click',event=>{if(event.target===$('productDialog'))$('productDialog').close()});
$('year').textContent=String(new Date().getFullYear());
setTheme(localStorage.getItem('tm-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'));
applyLanguage();