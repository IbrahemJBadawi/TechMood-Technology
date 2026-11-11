/* CodeMood learning MVP. All data is local to this browser, no untrusted code is executed. */
(function(){
"use strict";
var I=window.CMIcons.svg;
var STORE="codemood_preview_v1";
var courses=[
{id:"python",title:"أساسيات Python",en:"PYTHON PATH",subtitle:"ابدأ من الصفر، واكتب أول برامجك بخطوات قصيرة.",icon:"terminal",level:"مبتدئ",duration:"20 دقيقة",accent:"python",ready:true},
{id:"javascript",title:"تعلّم JavaScript",en:"JAVASCRIPT PATH",subtitle:"تعرّف إلى لغة الويب وأساسيات التفاعل.",icon:"code-2",level:"مبتدئ",duration:"15 دقيقة",accent:"js",ready:true},
{id:"ai",title:"الذكاء الاصطناعي",en:"AI & AGENTS",subtitle:"من أساسيات الذكاء الاصطناعي إلى بناء الوكلاء.",icon:"sparkles",level:"قريبًا",duration:"سيضاف لاحقًا",accent:"ai",ready:false}
];
var lessons=[
{id:"py1",track:"python",title:"أول سطر برمجي",duration:3,subtitle:"أهلًا بك في عالم البرمجة!",description:"لغة Python تقرأ التعليمات المكتوبة سطرًا بعد سطر. أبسط أمر سنستخدمه اليوم هو print لطباعة نص.",points:["البرنامج يتكوّن من تعليمات واضحة.","الدالة print تعرض نصًا أو قيمة.","النص يوضع بين علامتي اقتباس."],task:"اكتب أمرًا يطبع النص Hello, CodeMood!",starter:'# اكتب أول برنامج لك هنا\n',solution:'print("Hello, CodeMood!")',expected:"Hello, CodeMood!",hint:"ابدأ بكلمة print، ثم ضع النص المطلوب بين قوسين وعلامتي اقتباس.",language:"Python"},
{id:"py2",track:"python",title:"المتغيرات والنصوص",duration:4,subtitle:"احفظ المعلومة ثم استخدمها",description:"المتغير مثل صندوق نخزّن فيه قيمة. يمكنك إنشاء متغير بالاسم الذي تريده، واستخدامه لاحقًا بدل كتابة النص من جديد.",points:["علامة = تسند قيمة إلى متغير.","النص المحفوظ يمكن طباعته باسمه.","لا تحتاج إلى تحديد نوع المتغير في Python."],task:"أنشئ متغيرًا باسم language قيمته Python، ثم اطبع المتغير.",starter:'# أنشئ المتغير ثم اطبعه\n',solution:'language = "Python"\nprint(language)',expected:"Python",hint:"في السطر الأول اكتب language = \"Python\"، وفي الثاني print(language).",language:"Python"},
{id:"py3",track:"python",title:"الأرقام والعمليات",duration:4,subtitle:"اجعل البرنامج يحسب بدلًا منك",description:"يستطيع Python الجمع والطرح والضرب والقسمة. ويمكن حفظ الأرقام في متغيرات واستخدامها في المعادلات.",points:["الأرقام لا تحتاج إلى علامات اقتباس.","رمز * يعني عملية الضرب.","يمكن طباعة نتيجة عملية رياضية مباشرة."],task:"عرّف متغيرًا number بقيمة 7 ثم اطبع نتيجة ضربه في 2.",starter:'# العدد 7 مضروبًا في 2\n',solution:'number = 7\nprint(number * 2)',expected:"14",hint:"استخدم number = 7 ثم print(number * 2).",language:"Python"},
{id:"py4",track:"python",title:"اتّخاذ القرار",duration:5,subtitle:"أضف أول شرط إلى برنامجك",description:"الجملة if تتحقق من شرط معيّن، وعندما يكون صحيحًا تُنفّذ الأوامر الموجودة تحتها بمسافة بادئة.",points:["تعني if: إذا تحقق الشرط.","الرمز > يعني أكبر من.","السطر داخل الشرط يبدأ بمسافة بادئة."],task:"إذا كان 5 أكبر من 3، اطبع النص True باستخدام if.",starter:'# جرّب أول شرط\n',solution:'if 5 > 3:\n    print("True")',expected:"True",hint:"اكتب if 5 > 3: ثم في السطر التالي أربع مسافات قبل print.",language:"Python"},
{id:"js1",track:"javascript",title:"مرحبًا JavaScript",duration:3,subtitle:"أول أمر في لغة الويب",description:"تعمل JavaScript داخل المتصفحات وأماكن أخرى. نستعمل console.log لعرض قيم أثناء التعلّم والتجربة.",points:["console.log تعرض قيمة.","النصوص توضع بين علامتي اقتباس.","يمكن إنهاء الأمر بفاصلة منقوطة."],task:"اطبع النص Hello, JavaScript! بواسطة console.log.",starter:'// أول أمر JavaScript\n',solution:'console.log("Hello, JavaScript!");',expected:"Hello, JavaScript!",hint:"استخدم console.log مع قوسين ونص بداخلهما.",language:"JavaScript"},
{id:"js2",track:"javascript",title:"الثوابت والحساب",duration:4,subtitle:"تعلّم const والعمليات البسيطة",description:"نستخدم const لتعريف قيمة لا نريد إعادة إسنادها. بعدها نستطيع استعمال اسمها في عملية حسابية.",points:["const تنشئ ربطًا لا يمكن إعادة إسناده.","علامة + تجمع قيمتين عدديتين.","يمكن طباعة تعبير كامل في console.log."],task:"عرّف ثابتًا باسم score قيمته 5 ثم اطبع score + 3.",starter:'// عرّف الثابت ثم اطبع الناتج\n',solution:'const score = 5;\nconsole.log(score + 3);',expected:"8",hint:"اكتب const score = 5; ثم console.log(score + 3).",language:"JavaScript"},
{id:"js3",track:"javascript",title:"أول دالة",duration:5,subtitle:"اكتب أمرًا قابلًا لإعادة الاستخدام",description:"الدالة مجموعة أوامر تحمل اسمًا. يمكن استدعاؤها أكثر من مرة، واستخدام return لإعادة نتيجة.",points:["function تعرّف دالة.","return تعيد قيمة من الدالة.","لاستدعاء الدالة، أضف () إلى اسمها."],task:"أنشئ دالة greet تعيد النص Welcome، ثم اطبع ناتج greet().",starter:'// أنشئ دالة greet واستدعها\n',solution:'function greet() {\n  return "Welcome";\n}\nconsole.log(greet());',expected:"Welcome",hint:"اكتب function greet() { return \"Welcome\"; } ثم console.log(greet());",language:"JavaScript"}
];
var badges=[
{title:"الخطوة الأولى",caption:"أكمل درسًا واحدًا",icon:"rocket",test:function(){return completed().length>=1}},
{title:"نقطة الانطلاق",caption:"أكمل 3 دروس",icon:"star",test:function(){return completed().length>=3}},
{title:"متعلم مثابر",caption:"تعلّم يومين متتابعين",icon:"flame",test:function(){return activeStreak()>=2}},
{title:"خبير Python",caption:"أكمل مسار Python",icon:"terminal",test:function(){return countCourse("python")===4}},
{title:"مبدع JavaScript",caption:"أكمل مسار JavaScript",icon:"code-2",test:function(){return countCourse("javascript")===3}},
{title:"بطل CodeMood",caption:"أنهِ 7 تحديات",icon:"trophy",test:function(){return completed().length>=7}}
];
var initial={name:"متعلم",completed:[],drafts:{},lastActivity:"",streak:0,hearts:5,heartDay:"",welcomed:false,attempts:0};
function safeParse(raw){try{return JSON.parse(raw)}catch(e){return {}}}
var state;
try{state=Object.assign({},initial,safeParse(localStorage.getItem(STORE)));}catch(e){state=Object.assign({},initial)}
if(!Array.isArray(state.completed))state.completed=[];
if(!state.drafts||typeof state.drafts!=="object")state.drafts={};
var feedback=null,showHint=false,toastTimer=null;
function esc(s){return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}
function save(){try{localStorage.setItem(STORE,JSON.stringify(state))}catch(e){}}
function today(){var d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")}
function dayBefore(iso){var d=new Date(iso+"T12:00:00");if(isNaN(d.getTime()))return "";d.setDate(d.getDate()+1);return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")}
function refreshHearts(){if(state.heartDay!==today()){state.hearts=5;state.heartDay=today();save()}}
function activeStreak(){return state.lastActivity===today()||dayBefore(state.lastActivity)===today()?Number(state.streak)||0:0}
function completeLesson(id){if(state.completed.indexOf(id)>-1)return false;state.completed.push(id);var d=today();if(state.lastActivity!==d){state.streak=dayBefore(state.lastActivity)===d?(Number(state.streak)||0)+1:1;state.lastActivity=d}save();return true}
function completed(){return state.completed.filter(function(id){return lessons.some(function(l){return l.id===id})})}
function xp(){return completed().length*20}
function countCourse(course){return lessons.filter(function(l){return l.track===course&&completed().indexOf(l.id)>-1}).length}
function totalCourse(course){return lessons.filter(function(l){return l.track===course}).length}
function coursePct(course){var total=totalCourse(course);return total?Math.round(countCourse(course)*100/total):0}
function getLesson(id){return lessons.find(function(l){return l.id===id})}
function getCourse(id){return courses.find(function(c){return c.id===id})}
function isUnlocked(l){var list=lessons.filter(function(x){return x.track===l.track}),i=list.findIndex(function(x){return x.id===l.id});return i===0||completed().indexOf(list[i-1].id)>-1||completed().indexOf(l.id)>-1}
function nextLesson(l){var list=lessons.filter(function(x){return x.track===l.track});return list[list.findIndex(function(x){return x.id===l.id})+1]}
function firstTodo(){return lessons.find(function(l){return l.track==="python"&&completed().indexOf(l.id)<0})||lessons.find(function(l){return completed().indexOf(l.id)<0})}
function stat(iconName,value,title,tint){return '<div class="stat"><span class="stat-icon '+tint+'">'+I(iconName)+'</span><span><b>'+value+'</b><small>'+title+'</small></span></div>'}
function heading(title,desc,action){return '<div class="page-heading"><div><h1>'+title+'</h1><p>'+desc+'</p></div>'+(action||'')+'</div>'}
function section(title,desc,act){return '<div class="section-head"><div><h2 class="section-title">'+title+'</h2>'+(desc?'<p class="section-copy">'+desc+'</p>':'')+'</div>'+(act||'')+'</div>'}
function navButton(label,route,cls,iconName){return '<button type="button" data-go="'+esc(route)+'" class="button '+(cls||'primary')+'">'+label+(iconName?' '+I(iconName):'')+'</button>'}
function lessonRow(l){var done=completed().indexOf(l.id)>-1,locked=!isUnlocked(l);return '<div class="lesson-row '+(done?'done ': '')+(locked?'locked':'')+'"><span class="lesson-index">'+(done?I("check"):lessons.filter(function(x){return x.track===l.track}).indexOf(l)+1)+'</span><span style="flex:1"><b>'+esc(l.title)+'</b><small>'+l.duration+' دقائق · +20 XP</small></span><button class="row-action" type="button" '+(locked?'disabled':'data-go="lesson/'+l.id+'"')+'>'+(done?'راجع الدرس':locked?'مغلق':'ابدأ الآن')+'</button></div>'}
function courseTile(c){var pct=coursePct(c.id);return '<button class="course-tile" data-go="'+(c.ready?'track/'+c.id:'tracks')+'" type="button" style="text-align:right;width:100%"><span class="tile-mark '+(c.accent==="javascript"?"js":c.accent==="ai"?"ai":"")+'">'+I(c.icon)+'</span><span class="course-info"><b>'+esc(c.title)+'</b><p>'+esc(c.subtitle)+'</p><span class="small-progress progress"><span style="width:'+pct+'%"></span></span></span><span class="chev">'+(c.ready?I("chevron-left"):I("lock-keyhole"))+'</span></button>'}
function nextAction(){var next=firstTodo();return next?"lesson/"+next.id:"achievements"}
function homePage(){
var next=firstTodo(),username=esc(state.name||"متعلم");
var lessonItems=lessons.filter(function(l){return l.track==="python"}).map(lessonRow).join("");
var mock='<div class="hero-art"><div class="editor-mock"><div class="editor-head"><span>hello.py</span><span class="window-dots"><i></i><i></i><i></i></span></div><div class="editor-code"><div><span class="num">01</span><span class="pink">def</span> <span class="blue">hello</span>():</div><div><span class="num">02</span>  <span class="pink">print</span>(<span class="yellow">"CodeMood!"</span>)</div><div><span class="num">03</span></div><div><span class="num">04</span><span class="blue">hello</span>()</div></div><div class="editor-footer">'+I("check-circle-2")+' Your code is ready</div></div><div class="hero-bubble">'+I("zap")+' +20 XP لكل إنجاز</div></div>';
return '<div class="page-heading"><div><div class="eyebrow">'+I("sparkles")+' بداية كل إنجاز هي خطوة</div><h1>مرحبًا، '+username+' 👋</h1><p>مستعد لجرعة برمجة صغيرة اليوم؟ رحلتك تبدأ من هنا.</p></div></div>'+
'<section class="hero"><div><span class="eyebrow">'+I("rocket")+' تعلّم بمتعة، وتقدم بثقة</span><h2>كل سطر كود،<br><span>يقربك من حلمك.</span></h2><p>دروس قصيرة، تحديات عملية، ونقاط تكافئ اجتهادك. ابدأ بمستواك، واصنع تقدمًا حقيقيًا كل يوم.</p><div class="hero-actions">'+navButton(next?'أكمل التعلّم':'شاهد إنجازاتك',nextAction(),'lime','arrow-left')+navButton('استكشف المسارات','tracks','outline','route')+'</div></div>'+mock+'</section>'+
'<div class="stats-grid">'+stat("zap",xp(),"نقاط الخبرة XP","orange")+stat("flame",activeStreak(),"أيام متتالية","purple")+stat("check-circle-2",completed().length,"دروس أتممتها","green")+stat("heart",state.hearts+"/5","قلوب المحاولة اليوم","blue")+'</div>'+
'<div class="content-grid"><div>'+section("ابدأ من هنا","مسارك الأول، خطوة بعد خطوة",'<button class="text-link" data-go="track/python" type="button">عرض المسار '+I("arrow-left")+'</button>')+
'<div class="card card-body"><div class="card-header"><div><h3>Python: خطوتك الأولى</h3><p style="margin:2px 0 10px">أنجز '+countCourse("python")+' من '+totalCourse("python")+' دروس</p></div><span class="chip purple">'+coursePct("python")+'% مكتمل</span></div><div class="progress" style="margin-bottom:20px"><span style="width:'+coursePct("python")+'%"></span></div><div class="study-list">'+lessonItems+'</div></div>'+
'</div><div>'+section("المسارات المتاحة","اختر مهارة وابدأ التحدي")+
courses.map(courseTile).join('')+
'<div class="side-challenge"><div style="display:flex;align-items:center;gap:10px">'+I("target")+'<b>هدف اليوم: درس واحد</b></div><p>خصص خمس دقائق، واجمع 20 نقطة جديدة.</p>'+navButton("ابدأ التحدي",nextAction(),"primary","arrow-left")+'</div></div></div>'+
'<div class="feature-note" style="margin-top:24px">'+I("info")+' هذه نسخة تجريبية تفاعلية. التقدم محفوظ على هذا الجهاز فقط، والتحقق من الإجابات تعليمي ولا يشغّل الأكواد بصورة عامة.</div>';
}
function tracksPage(){return heading("مساراتك التعليمية","مهارة واحدة في كل مرة، من الأساسيات إلى المشاريع.")+
'<div class="track-grid">'+courses.map(function(c){var pct=coursePct(c.id);return '<article class="track-card '+(!c.ready?'locked':'')+'"><div class="track-header"><span class="track-art '+(c.accent==="javascript"?"js":c.accent==="ai"?"ai":"")+'">'+I(c.icon)+'</span><span class="chip '+(c.ready?'green':'gray')+'">'+(c.ready?c.level:'قريبًا')+'</span></div><div><small class="muted" style="font:700 10px Plus Jakarta Sans,sans-serif">'+c.en+'</small><h3>'+esc(c.title)+'</h3><p>'+esc(c.subtitle)+'</p></div><div class="progress"><span style="width:'+pct+'%"></span></div><div class="track-foot"><span class="muted" style="font-size:11px">'+(c.ready?countCourse(c.id)+' / '+totalCourse(c.id)+' دروس':'قيد التحضير')+'</span>'+(c.ready?navButton("استكشف المسار","track/"+c.id,"ghost","arrow-left"):'<span class="chip gray">'+I("lock-keyhole")+' غير متاح</span>')+'</div></article>'}).join('')+'</div>'+
'<div class="feature-note" style="margin-top:22px">'+I("info")+' سيتم إضافة مسارات تطوير الويب وقواعد البيانات وLLMs وAI Agents في مراحل لاحقة. محتوى النسخة الحالية تجريبي ومحدود.</div>'}
function trackPage(id){var c=getCourse(id);if(!c||!c.ready)return tracksPage();var list=lessons.filter(function(l){return l.track===id});return '<div class="lesson-title-card"><span class="chip dark">'+I(c.icon)+' '+esc(c.level)+'</span><h1>'+esc(c.title)+'</h1><p>'+esc(c.subtitle)+'</p><div class="lesson-short-progress"><span style="width:'+coursePct(id)+'%"></span></div><div style="margin-top:11px;color:#c6dfc9;font-size:11px">'+countCourse(id)+' من '+list.length+' دروس مكتملة · '+coursePct(id)+'%</div></div>'+
section("خطوات المسار","كل درس جديد يفتح بعد إنهاء الدرس السابق.")+
'<div class="card card-body"><div class="module-list">'+list.map(lessonRow).join('')+'</div></div>'+
'<div class="lesson-actions">'+navButton("جميع المسارات","tracks","outline","arrow-right")+(list.some(function(l){return completed().indexOf(l.id)<0&&isUnlocked(l)})?navButton("أكمل من حيث وصلت","lesson/"+list.find(function(l){return completed().indexOf(l.id)<0&&isUnlocked(l)}).id,"primary","arrow-left"):'')+'</div>'}
function challengesPage(){return heading("التحديات البرمجية","جرّب ما تعلمته، واجمع 20 XP عند اجتياز كل تحدٍّ للمرة الأولى.")+
'<div class="card card-body"><div class="search-row"><input class="input" id="challengeSearch" type="search" placeholder="ابحث عن درس أو لغة برمجة..." aria-label="البحث في التحديات"></div><div id="challengeResults">'+challengeResults("")+'</div></div>'+
'<div class="feature-note" style="margin-top:20px">'+I("shield-check")+' الفحص الحالي مقيّد بأمثلة محددة ولا ينفّذ الكود فعليًا، لذلك لا يُعدّ بديلًا عن تشغيل Python أو JavaScript في بيئة تنفيذ معزولة.</div>'}
function challengeResults(q){q=(q||"").trim().toLowerCase();var found=lessons.filter(function(l){return (l.title+" "+l.language+" "+l.task).toLowerCase().indexOf(q)>-1});return found.length?'<div class="study-list">'+found.map(lessonRow).join('')+'</div>':'<div class="empty">لا توجد تحديات مطابقة للبحث.</div>'}
function achievementsPage(){var done=badges.filter(function(b){return b.test()}).length;return heading("إنجازاتك","كل خطوة تستحق الاحتفال، حتى لو كانت صغيرة.")+
'<div class="stats-grid" style="margin:0 0 22px">'+stat("award",done+"/"+badges.length,"شارات مكتسبة","green")+stat("zap",xp(),"نقاط الخبرة","orange")+stat("flame",activeStreak(),"سلسلة نشاط","purple")+stat("check-circle-2",completed().length,"دروس مكتملة","blue")+'</div>'+
section("مجموعة الشارات","أكمل الدروس لتحصل على إنجازات جديدة")+
'<div class="badge-grid">'+badges.map(function(b){var has=b.test();return '<article class="badge-item '+(has?'earned':'')+'"><span class="badge-art">'+I(has?b.icon:"lock-keyhole")+'</span><strong>'+esc(b.title)+'</strong><small>'+esc(b.caption)+'</small><span class="chip '+(has?'':'gray')+'" style="margin-top:11px">'+(has?'مكتسبة':'لم تكتسب بعد')+'</span></article>'}).join('')+'</div>'}
function profilePage(){return heading("ملف المتعلم","اجعل تجربة التعلّم أقرب إليك وتحكّم في بياناتك.")+
'<div class="profile-grid"><div class="card card-body"><h3>البيانات الأساسية</h3><p>يظهر اسمك في الصفحة الرئيسية. لا توجد حسابات أو مزامنة سحابية حاليًا.</p><label class="form-label" for="profileName">الاسم الذي تحب أن نناديك به</label><input class="input" id="profileName" maxlength="40" value="'+esc(state.name)+'" autocomplete="nickname"><div style="margin-top:15px"><button class="button primary" data-action="save-profile" type="button">'+I("check")+' حفظ الاسم</button></div>'+
section("بيانات التقدم","يمكنك حفظ نسخة احتياطية أو البدء من جديد.")+
'<div class="setting-row"><div><strong>تصدير تقدمي</strong><p>تحميل ملف JSON على جهازك</p></div><button class="button outline" data-action="export" type="button">'+I("download")+' تنزيل</button></div>'+
'<div class="setting-row"><div><strong>مسح التقدم</strong><p>إزالة النقاط والدروس المكتملة من هذا الجهاز</p></div><button class="button danger" data-action="reset" type="button">'+I("trash-2")+' مسح</button></div></div>'+
'<div class="card card-body"><div class="card-header"><h3>بطاقتك التعليمية</h3><span class="chip">نسخة تجريبية</span></div><div style="display:flex;align-items:center;gap:14px;margin:23px 0"><span class="avatar" style="width:56px;height:56px;display:grid;place-items:center;font-size:21px">'+esc((state.name||"م").slice(0,1))+'</span><div><b style="font-size:17px">'+esc(state.name)+'</b><p style="margin:0">متعلم CodeMood</p></div></div><div class="progress"><span style="width:'+Math.round(completed().length*100/lessons.length)+'%"></span></div><p>أنجزت '+completed().length+' من '+lessons.length+' تحديات أولية.</p><div class="feature-note">'+I("info")+' جميع المعلومات محفوظة محليًا في المتصفح. إذا مسحت بياناته أو استخدمت جهازًا آخر فلن تنتقل إليه تلقائيًا.</div></div></div>'}
function normalized(code){return String(code||"").replace(/^\s*(#|\/\/).*$/gm,"").trim()}
function hasPrint(code,want){var m=code.match(/\bprint\s*\(\s*(["'])(.*?)\1\s*\)/m);return !!(m&&m[2]===want)}
function hasLog(code,want){var m=code.match(/\bconsole\s*\.\s*log\s*\(\s*(["'])(.*?)\1\s*\)\s*;?/m);return !!(m&&m[2]===want)}
function validate(l,raw){var c=normalized(raw),good=false;if(!c)return {ok:false,message:"اكتب الحل في مساحة الكود ثم اضغط «تحقق من الحل»."};
switch(l.id){
case "py1":good=hasPrint(c,"Hello, CodeMood!");break;
case "py2":good=/\blanguage\s*=\s*(["'])Python\1/.test(c)&&/\bprint\s*\(\s*language\s*\)/.test(c);break;
case "py3":good=/\bnumber\s*=\s*7\b/.test(c)&&/\bprint\s*\(\s*number\s*\*\s*2\s*\)/.test(c);break;
case "py4":good=/\bif\s+5\s*>\s*3\s*:\s*\n[ \t]+print\s*\(\s*(["'])True\1\s*\)/.test(c);break;
case "js1":good=hasLog(c,"Hello, JavaScript!");break;
case "js2":good=/\bconst\s+score\s*=\s*5\s*;?/.test(c)&&/\bconsole\s*\.\s*log\s*\(\s*score\s*\+\s*3\s*\)\s*;?/.test(c);break;
case "js3":good=/\bfunction\s+greet\s*\(\s*\)\s*\{[\s\S]*?\breturn\s+(["'])Welcome\1\s*;?[\s\S]*?\}/.test(c)&&/\bconsole\s*\.\s*log\s*\(\s*greet\s*\(\s*\)\s*\)\s*;?/.test(c);break;
}
return good?{ok:true,message:"إجابتك تطابق القاعدة التعليمية لهذا التحدي. الناتج المتوقع: "+l.expected}:{ok:false,message:"لم يطابق الحل شروط التحدي بعد. راجع النص المطلوب، الأسماء، والأقواس ثم حاول مرة أخرى."}}
function lessonPage(id){var l=getLesson(id);if(!l)return tracksPage();if(!isUnlocked(l))return '<div class="empty">أنهِ التحدي السابق أولًا.</div>'+navButton("العودة للمسار","track/"+l.track,"outline","arrow-right");var list=lessons.filter(function(x){return x.track===l.track}),idx=list.findIndex(function(x){return x.id===id}),done=completed().indexOf(id)>-1;
var code=Object.prototype.hasOwnProperty.call(state.drafts,id)?state.drafts[id]:l.starter;
var niceFeedback=feedback&&feedback.id===id?'<div class="feedback '+(feedback.ok?'success':'error')+'">'+I(feedback.ok?"check-circle-2":"circle-help")+'<div><strong>'+(feedback.ok?'أحسنت! التحدي مجتاز':'لم ينجح التحقق بعد')+'</strong><p>'+esc(feedback.message)+'</p>'+(feedback.ok?'<p>هذه نتيجة تحقق تعليمي من النمط، وليست نتيجة تشغيل كود عام.</p>':'')+'</div></div>':'';
var right='<section class="card workspace"><div class="workspace-head"><div><strong dir="ltr">'+(l.language==="Python"?"main.py":"main.js")+'</strong><div class="label">مساحة كتابة الكود · LTR</div></div><div class="workspace-tools"><span class="chip dark">'+l.language+'</span><button type="button" data-action="restore-code" title="استعادة البداية">'+I("refresh-ccw")+'</button></div></div><div class="code-area"><textarea id="codeInput" aria-label="محرر كود '+esc(l.language)+'" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off">'+esc(code)+'</textarea></div><div class="workspace-foot"><span class="micro">'+I("shield-check")+' فحص تعليمي بدون تنفيذ الكود</span><button class="button lime" data-action="run" type="button" '+(state.hearts===0&&!done?'disabled':'')+'>'+I("check-circle-2")+' تحقق من الحل</button></div>'+niceFeedback+'</section>';
var left='<section class="card lesson-copy"><span class="chip purple">'+I("book-open")+' درس عملي</span><h2 style="margin-top:13px">'+esc(l.subtitle)+'</h2><p>'+esc(l.description)+'</p><ul>'+l.points.map(function(v){return '<li>'+esc(v)+'</li>'}).join('')+'</ul><div class="task-box"><b>'+I("target")+' التحدي المطلوب</b><p>'+esc(l.task)+'</p></div><div class="lesson-actions"><button class="button outline" data-action="hint" type="button">'+I("lightbulb")+' '+(showHint?'إخفاء التلميح':'اعرض تلميحًا')+'</button><span class="chip orange">'+I("zap")+' +20 XP</span></div>'+(showHint?'<div class="hint-box"><strong>تلميح</strong><p>'+esc(l.hint)+'</p></div>':'')+'<p class="subtle">يمكنك حفظ كتابتك تلقائيًا على هذا الجهاز أثناء التمرين. لا توجد خدمة تشغيل Python أو JavaScript عامة في هذه النسخة.</p></section>';
var next=nextLesson(l);
return '<div class="lesson-title-card"><span class="chip dark">'+I("terminal")+' '+esc(l.language)+'</span><div class="steps-count" style="margin-top:11px">التحدي '+(idx+1)+' من '+list.length+' · '+l.duration+' دقائق</div><h1>'+esc(l.title)+'</h1><p>'+esc(l.subtitle)+'</p><div class="lesson-short-progress"><span style="width:'+Math.round((idx+1)*100/list.length)+'%"></span></div></div>'+
'<div class="lesson-layout">'+left+right+'</div><div class="lesson-actions">'+navButton("العودة للمسار","track/"+l.track,"outline","arrow-right")+(done?navButton(next?"الدرس التالي":"شاهد إنجازاتك",next?"lesson/"+next.id:"achievements","primary","arrow-left"):'<span class="chip">'+I("heart")+' المحاولات اليوم: '+state.hearts+'/5</span>')+'</div>';
}
function parseRoute(){return (location.hash||"#home").replace(/^#\/?/,"")||"home"}
function go(route){var hash="#/"+route;if(location.hash===hash){render();window.scrollTo({top:0,behavior:"smooth"})}else location.hash=hash}
function render(){refreshHearts();var route=parseRoute(),parts=route.split("/"),view=document.getElementById("view"),crumb="الرئيسية",body="";
if(parts[0]==="home"){body=homePage();crumb="الرئيسية"}
else if(parts[0]==="tracks"){body=tracksPage();crumb="المسارات"}
else if(parts[0]==="track"){body=trackPage(parts[1]);crumb="المسارات"}
else if(parts[0]==="challenges"){body=challengesPage();crumb="التحديات"}
else if(parts[0]==="achievements"){body=achievementsPage();crumb="الإنجازات"}
else if(parts[0]==="profile"){body=profilePage();crumb="الإعدادات"}
else if(parts[0]==="lesson"){body=lessonPage(parts[1]);crumb="درس تفاعلي"}
else{body=homePage();crumb="الرئيسية"}
view.innerHTML=body;document.getElementById("crumb").textContent=crumb;document.getElementById("headerXp").textContent=xp();document.getElementById("avatarLetter").textContent=(state.name||"م").slice(0,1);
document.querySelectorAll(".nav-item,.mobile-bottom button").forEach(function(btn){var nav=btn.getAttribute("data-go"),active=nav===(parts[0]==="track"?"tracks":parts[0]==="lesson"?"challenges":parts[0]);btn.classList.toggle("active",active)});
window.CMIcons.hydrate(view);closeSidebar();
window.scrollTo({top:0,behavior:"instant"});
}
function closeSidebar(){document.getElementById("sidebar").classList.remove("is-open");document.getElementById("sidebarOverlay").classList.remove("is-open")}
function toast(msg){var el=document.getElementById("toast");el.textContent=msg;el.classList.add("visible");clearTimeout(toastTimer);toastTimer=setTimeout(function(){el.classList.remove("visible")},3400)}
function handleRun(){var route=parseRoute(),id=route.split("/")[1],l=getLesson(id);if(!l||!isUnlocked(l))return;if(state.hearts===0&&completed().indexOf(id)<0){toast("نفدت القلوب لهذا اليوم، عُد غدًا للمحاولة.");return}
var input=document.getElementById("codeInput"),code=input?input.value:"";state.drafts[id]=code;state.attempts=(Number(state.attempts)||0)+1;
var result=validate(l,code),fresh=false;
if(result.ok){fresh=completeLesson(id);feedback={id:id,ok:true,message:result.message+(fresh?" حصلت على 20 نقطة XP!":" سبق لك إكمال هذا التحدي.")};if(fresh)toast("رائع! +20 XP · تحدٍّ جديد مكتمل 🎉")}
else{state.hearts=Math.max(0,state.hearts-1);feedback={id:id,ok:false,message:result.message+(state.hearts===0?" انتهت قلوب اليوم.":"")};toast("حاول مجددًا، بقي لديك "+state.hearts+" قلوب")}
save();render()}
function download(){var payload={product:"CodeMood",version:1,exportedAt:new Date().toISOString(),name:state.name,completed:completed(),streak:state.streak,lastActivity:state.lastActivity};var blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="codemood-progress.json";document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(url)},1500);toast("تم إعداد ملف التقدم على جهازك")}
function showWelcome(){if(state.welcomed)return;var root=document.getElementById("modalRoot");root.innerHTML='<div class="modal-backdrop" role="presentation"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="welcomeTitle"><button type="button" data-action="welcome-browse" class="close" aria-label="إغلاق">'+I("x")+'</button><div class="modal-mark">'+I("code-2")+'</div><span class="eyebrow">'+I("sparkles")+' أهلاً بك في CodeMood</span><h2 id="welcomeTitle">أول سطر كود، أول خطوة للأمام.</h2><p>تعلّم البرمجة بطريقتك، في دروس قصيرة وتحديات ممتعة. اجمع نقاط XP وتابع تقدمك يومًا بعد يوم.</p><div class="feature-note">'+I("info")+' هذه معاينة تفاعلية، والتقدم محفوظ على جهازك فقط. لا يتم تشغيل الكود العام.</div><div class="modal-actions"><button type="button" data-action="welcome-start" class="button primary">ابدأ مسار Python '+I("arrow-left")+'</button><button type="button" data-action="welcome-browse" class="button outline">استكشف الصفحة</button></div></section></div>';
}
function dismissWelcome(route){state.welcomed=true;save();document.getElementById("modalRoot").innerHTML="";if(route)go(route)}
document.addEventListener("click",function(e){var nav=e.target.closest("[data-go]");if(nav){e.preventDefault();go(nav.getAttribute("data-go"));return}var btn=e.target.closest("[data-action]");if(!btn)return;var action=btn.getAttribute("data-action");
if(action==="run")handleRun();
if(action==="hint"){showHint=!showHint;render()}
if(action==="restore-code"){var id=parseRoute().split("/")[1],l=getLesson(id);if(l){state.drafts[id]=l.starter;feedback=null;save();render()}}
if(action==="save-profile"){var value=(document.getElementById("profileName").value||"").trim().slice(0,40);if(!value){toast("أدخل اسمًا أولاً");return}state.name=value;save();render();toast("تم حفظ الاسم")}
if(action==="export")download();
if(action==="reset"){if(window.confirm("هل تريد مسح تقدمك المحلي والنقاط وكل محاولاتك؟ لا يمكن التراجع.")){var name=state.name;state=Object.assign({},initial,{name:name,welcomed:true,heartDay:today()});feedback=null;save();render();toast("تم مسح تقدم الجهاز")}}
if(action==="welcome-start")dismissWelcome("lesson/py1");
if(action==="welcome-browse")dismissWelcome("home");
});
document.addEventListener("input",function(e){if(e.target.id==="codeInput"){var id=parseRoute().split("/")[1];state.drafts[id]=e.target.value;save()}if(e.target.id==="challengeSearch"){document.getElementById("challengeResults").innerHTML=challengeResults(e.target.value);window.CMIcons.hydrate(document.getElementById("challengeResults"))}});
document.getElementById("menuButton").addEventListener("click",function(){document.getElementById("sidebar").classList.add("is-open");document.getElementById("sidebarOverlay").classList.add("is-open")});
document.getElementById("sidebarOverlay").addEventListener("click",closeSidebar);
document.addEventListener("keydown",function(e){if(e.key==="Escape"){closeSidebar();if(document.querySelector(".modal-backdrop"))dismissWelcome("home")}if(e.key==="Tab"&&e.target.id==="codeInput"){e.preventDefault();var el=e.target,start=el.selectionStart;el.value=el.value.slice(0,start)+"    "+el.value.slice(el.selectionEnd);el.selectionStart=el.selectionEnd=start+4;state.drafts[parseRoute().split("/")[1]]=el.value;save()}});
window.addEventListener("hashchange",function(){feedback=null;showHint=false;render()});
window.CMIcons.hydrate(document);
render();showWelcome();
})();