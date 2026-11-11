/* TechMood Technology — no external JS dependencies, no back-end claims. */
const PRODUCTS = [
 {id:'platform',group:'education',icon:'✦',color:'blue',alias:'MentorMood',url:'https://techmoodtech.com',ar:'منصة TechMood',en:'TechMood Platform',arDesc:'منصة للتعلّم والتوجيه المهني وربط المهارات بالمشاريع والفرص.',enDesc:'A learning and professional mentoring platform connecting skills, projects and opportunities.'},
 {id:'codemood',group:'education',icon:'⌘',color:'violet',alias:'CodeMood',ar:'CodeMood',en:'CodeMood',arDesc:'مساحة لتعلّم البرمجة والذكاء الاصطناعي والتطبيق العملي.',enDesc:'A practical space for coding, artificial intelligence and real projects.'},
 {id:'growthmood',group:'education',icon:'↗',color:'cyan',alias:'GrowthMood',ar:'GrowthMood',en:'GrowthMood',arDesc:'حلول لإدارة التدريب والبرامج التعليمية وتطوير التجربة داخل المراكز.',enDesc:'Tools for managing learning programs and training-centre experiences.'},
 {id:'market',group:'commerce',icon:'▦',color:'green',alias:'Gaza Online Market',url:'https://capital-digital-market.vercel.app',ar:'سوق العاصمة الرقمي',en:'Capital Digital Market',arDesc:'سوق رقمي يربط متاجر المنطقة الوسطى بالعملاء وخدمات التوصيل.',enDesc:'A local marketplace connecting central Gaza shops, shoppers and delivery.'},
 {id:'aljamal',group:'commerce',icon:'◇',color:'orange',alias:'AlJamal Store',url:'https://aljamalstore.vercel.app',ar:'متجر الجمل',en:'AlJamal Store',arDesc:'واجهة تجارة إلكترونية لعرض المنتجات وإدارة تجربة التسوق.',enDesc:'An e-commerce storefront and a digital shopping experience.'},
 {id:'storemood',group:'commerce',icon:'▣',color:'violet',alias:'StoreMood',ar:'StoreMood',en:'StoreMood',arDesc:'متجر للخدمات الرقمية والأدوات والاشتراكات المرتبطة بالمنظومة.',enDesc:'A planned home for digital services, tools and subscriptions.'},
 {id:'paymood',group:'finance',icon:'◎',color:'cyan',alias:'PayMood',ar:'PayMood',en:'PayMood',arDesc:'تصور لخدمات الدفع والمعاملات الرقمية عند توفر المتطلبات التشغيلية والتنظيمية.',enDesc:'A proposed payments layer, subject to operational and regulatory readiness.'},
 {id:'halaqati',group:'faith',icon:'۞',color:'green',alias:'Halaqati',url:'https://halaqati.vercel.app',ar:'حلقتي',en:'Halaqati',arDesc:'إدارة حلقات تحفيظ القرآن ومتابعة الطلاب والحضور والإنجاز.',enDesc:'Quran memorisation circle management, attendance and student progress.'},
 {id:'quranoasis',group:'faith',icon:'☼',color:'green',alias:'Wahat Al Quran',url:'https://quranoasis.vercel.app',ar:'واحة القرآن',en:'Quran Oasis',arDesc:'تجربة رقمية متخصصة لخدمة تعلم القرآن الكريم ومتابعة الرحلة التعليمية.',enDesc:'A specialised digital experience for Quran learning and progress.'},
 {id:'healthmood',group:'impact',icon:'✚',color:'rose',alias:'HealthMood',ar:'HealthMood',en:'HealthMood',arDesc:'تصور لخدمات صحية رقمية تراعي خصوصية المعلومات وسلامة المستخدم.',enDesc:'A digital-health concept emphasising privacy and user safety.'},
 {id:'peace',group:'impact',icon:'⌂',color:'orange',alias:'Peace Council',ar:'Peace Council',en:'Peace Council',arDesc:'مفهوم رقمي لمحاكاة التخطيط وإعادة الإعمار والمشاركة المجتمعية في غزة.',enDesc:'A concept for simulating planning, reconstruction and community participation in Gaza.'},
 {id:'impact',group:'impact',icon:'✳',color:'violet',alias:'ImpactMood',ar:'ImpactMood',en:'ImpactMood',arDesc:'توثيق المبادرات وقياس أثر المشاريع المجتمعية والتنموية.',enDesc:'Document initiatives and measure community and development impact.'}
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
 skip:'تخطَّ إلى المحتوى',navServices:'الخدمات',navProducts:'المنتجات',navCore:'المنظومة',navAbout:'الشركة',navContact:'تواصل',startProject:'ابدأ مشروعًا',heroEyebrow:'AI-POWERED TECHNOLOGY ECOSYSTEM',heroTitle:'نحوّل الأفكار إلى <em>حلول رقمية ذكية</em> تعمل فعلاً',heroDescription:'TechMood Technology شركة تقنية فلسطينية تطوّر وتدير منظومة منتجات رقمية مستقلة تتكامل بذكاء، من التعليم وتنمية المهارات إلى الأعمال والتجارة والخدمات.',exploreProducts:'اكتشف منتجاتنا',exploreServices:'استكشف خدماتنا',palestine:'فلسطين',bilingual:'العربية والإنجليزية',independentProducts:'منتجات مستقلة، رؤية واحدة',orbitAi:'الذكاء الاصطناعي',orbitDev:'البرمجيات',orbitBusiness:'الأعمال الرقمية',orbitLearn:'التعلم والمهارات',orbitData:'البيانات',orbitImpact:'الأثر المجتمعي',statProducts:'منتجًا ومنصة',statSectors:'قطاعات رئيسية',statEcosystem:'منظومة مترابطة',motto:'One Ecosystem. Many Possibilities.',servicesKicker:'WHAT WE DO',servicesTitle:'مجالات عملنا',servicesIntro:'خبرات تقنية متكاملة، من الفكرة الأولى إلى بناء منتج رقمي قابل للنمو.',discussProject:'ناقش مشروعك ↗',productsKicker:'OUR VENTURES',productsTitle:'منتجاتنا ومشاريعنا',productsIntro:'اثنا عشر منتجًا مستقلًا، لكل منها وظيفة وجمهور، وتجمعها رؤية واحدة.',productUnit:'منتجًا',noResults:'لا توجد نتائج مطابقة. جرّب كلمة بحث أخرى.',availabilityNote:'روابط «زيارة المنتج» تظهر فقط للمنتجات ذات عناوين مواقع منشورة ومتحقق منها. وجود رابط لا يعني اكتمال جميع وظائف المنتج.',coreKicker:'SMARTLY CONNECTED',coreTitle:'مستقلّة في عملها.<br><em>متكاملة في رؤيتها.</em>',coreIntro:'لسنا بصدد جمع المنتجات في تطبيق واحد. كل منصة تحتفظ بميزاتها وبياناتها وصلاحياتها، فيما توفر TechMood Core الخدمات المشتركة عند الحاجة.',coreOne:'منتجات مستقلة ومستودعات منفصلة',coreTwo:'تجربة انتقال سلسة وروابط واضحة',coreThree:'تكاملات تدريجية، وليست وعودًا مطبقة',partnership:'ناقش فرصة شراكة',sharedServices:'خدمات مشتركة حسب الحاجة',identity:'الهوية والحسابات',aiLayer:'طبقة ذكاء مشتركة',notifications:'الإشعارات',integrations:'التكامل بين المنصات',coreDisclaimer:'هذه خريطة معمارية مقترحة؛ لا تعني أن كل خدمة متاحة حاليًا.',aboutKicker:'THE COMPANY',aboutTitle:'نبني تقنية تخدم <em>الإنسان والفكرة.</em>',aboutText:'TechMood Technology هي الشركة الأم للمنتجات التي ننشئها ونديرها. نركز على حلول عملية في التعليم، وتطوير البرمجيات، والتجارة الرقمية، والخدمات المتخصصة، ونسعى لبناء منتجات قابلة للتوسع دون التضحية بهويتها المستقلة.',value1:'✧ تصميم يضع المستخدم أولًا',value2:'✧ تقنية قابلة للتطوير',value3:'✧ أثر اقتصادي ومجتمعي',contactKicker:'LET’S BUILD SOMETHING',contactTitle:'لديك فكرة تستحق أن تتحوّل إلى واقع؟',contactText:'احكِ لنا عن مشروعك أو شراكتك، ولنبدأ من الهدف الحقيقي.',emailUs:'راسلنا عبر البريد',viewGithub:'استعرض مستودع الشركة ↗',footerDescription:'من فلسطين إلى العالم. منتجات مستقلة تجمعها رؤية تقنية واحدة.',rights:'جميع الحقوق محفوظة.',home:'الرئيسية',filters:{all:'الكل',education:'التعليم والمهارات',commerce:'التجارة',finance:'المدفوعات',faith:'القرآن',impact:'الصحة والأثر'},search:'ابحث عن منتج...',details:'التفاصيل',visit:'زيارة المنتج ↗',linked:'رابط منشور',catalog:'ضمن المنظومة',more:'اكتشف المزيد ↗',close:'إغلاق',noLink:'هذا المنتج ضمن خارطة المنظومة، ولم يُتحقق من رابط مستقل له بعد.',serviceMore:'تواصل معنا ↗',productFrom:'ضمن منتجات TechMood Technology'},
 en:{
 skip:'Skip to content',navServices:'Services',navProducts:'Ventures',navCore:'Ecosystem',navAbout:'Company',navContact:'Contact',startProject:'Start a project',heroEyebrow:'AI-POWERED TECHNOLOGY ECOSYSTEM',heroTitle:'We turn ideas into <em>intelligent digital solutions</em> that work.',heroDescription:'TechMood Technology is a Palestinian technology company building independent digital products that connect through a shared vision — from learning and skills to business, commerce and services.',exploreProducts:'Discover our ventures',exploreServices:'Explore our services',palestine:'Palestine',bilingual:'Arabic & English',independentProducts:'Independent products, one vision',orbitAi:'Artificial Intelligence',orbitDev:'Software',orbitBusiness:'Digital Commerce',orbitLearn:'Learning & Skills',orbitData:'Data',orbitImpact:'Social Impact',statProducts:'Products & platforms',statSectors:'Core sectors',statEcosystem:'Connected ecosystem',motto:'One Ecosystem. Many Possibilities.',servicesKicker:'WHAT WE DO',servicesTitle:'Our expertise',servicesIntro:'Connected technology capabilities, from the first idea to a product that can grow.',discussProject:'Discuss your project ↗',productsKicker:'OUR VENTURES',productsTitle:'Products & ventures',productsIntro:'Twelve independent products, each with its own audience and purpose, connected by one vision.',productUnit:'ventures',noResults:'No matching results. Try a different search.',availabilityNote:'Visit links are shown only for products with verified published URLs. A published website does not imply that all product features are complete.',coreKicker:'SMARTLY CONNECTED',coreTitle:'Independent in operation.<br><em>Connected by design.</em>',coreIntro:'We are not combining every product into one app. Each platform keeps its own features, data and permissions; TechMood Core provides shared services where they are genuinely useful.',coreOne:'Independent products and repositories',coreTwo:'Clear links and smooth navigation',coreThree:'Gradual integrations — not assumed functionality',partnership:'Explore a partnership',sharedServices:'Shared services when needed',identity:'Accounts and identity',aiLayer:'Shared AI layer',notifications:'Notifications',integrations:'Cross-product integrations',coreDisclaimer:'This is a proposed architecture, not a claim that every integration is live.',aboutKicker:'THE COMPANY',aboutTitle:'Technology that serves <em>people and ideas.</em>',aboutText:'TechMood Technology is the parent company behind the products we build and manage. Our focus is practical solutions for education, software, digital commerce and specialised services. Each product can grow while keeping its own identity.',value1:'✧ People-first design',value2:'✧ Technology built to scale',value3:'✧ Economic and social impact',contactKicker:'LET’S BUILD SOMETHING',contactTitle:'Have an idea worth making real?',contactText:'Tell us about your venture or partnership. We can start with the real goal.',emailUs:'Send us an email',viewGithub:'Browse our company repository ↗',footerDescription:'From Palestine to the world. Independent products, one technology vision.',rights:'All rights reserved.',home:'Home',filters:{all:'All',education:'Learning',commerce:'Commerce',finance:'Payments',faith:'Quran',impact:'Health & Impact'},search:'Search products...',details:'Details',visit:'Visit product ↗',linked:'Published link',catalog:'In portfolio',more:'Learn more ↗',close:'Close',noLink:'This venture is included in the ecosystem roadmap; a separate public URL has not been verified yet.',serviceMore:'Contact us ↗',productFrom:'Part of TechMood Technology'}
};
let language = (localStorage.getItem('tm-language') || 'ar') === 'en' ? 'en' : 'ar';
let selectedGroup = 'all';
const $ = (id) => document.getElementById(id);
const t = (key) => TEXT[language][key] ?? key;
function safeExternal(url){ try {const u = new URL(url);return u.protocol==='https:' ? u.href : ''; }catch{return '';} }
function renderServices(){
 $('servicesGrid').innerHTML = SERVICE_ITEMS.map(s=>`<article class="service-card"><span class="service-icon" aria-hidden="true">${s.icon}</span><h3>${s[language]}</h3><p>${s[language+'Desc']}</p><a class="service-cta" href="#contact"><span>${t('serviceMore')}</span><span class="round-arrow" aria-hidden="true">↗</span></a></article>`).join('');
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
    <div class="card-top"><span class="product-icon" data-color="${p.color}" aria-hidden="true">${p.icon}</span><span class="product-status${url?' live':''}">${url?t('linked'):t('catalog')}</span></div>
    <h3>${p[language]}</h3><p class="product-alias" dir="ltr">${p.alias}</p>
    <p class="product-desc">${p[language+'Desc']}</p>
    <div class="product-actions"><button type="button" class="detail-button" data-product="${p.id}">${t('details')} ↗</button>${url?`<a class="external-link" href="${url}" target="_blank" rel="noopener noreferrer">${t('visit')}</a>`:`<span class="external-link" aria-hidden="true">${t('catalog')}</span>`}</div>
   </article>`;
 }).join('');
 $('productGrid').querySelectorAll('[data-product]').forEach(btn=>btn.addEventListener('click',()=>showProduct(btn.dataset.product)));
}
function showProduct(id){
 const p=PRODUCTS.find(item=>item.id===id);if(!p)return;
 $('dialogIcon').textContent=p.icon;
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
 renderServices();renderFilters();renderProducts();
}
function setTheme(theme){
 const next=theme==='dark'?'dark':'light';document.documentElement.dataset.theme=next;localStorage.setItem('tm-theme',next);
 $('themeIcon').textContent=next==='dark'?'☀':'☾';
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