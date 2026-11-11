/* GrowthMood interactive preview — browser-only sample data.
 * This is NOT production authentication, multi-tenant isolation or a database.
 * See README and ../growthmood-backend/schema.sql for production backend requirements.
 */
(function(){
"use strict";
var STORAGE_KEY="growthmood_demo_v1";
var activeCenter="c1", activePage="dashboard", q="", state={};
var nav=[
 ["dashboard","layout-dashboard","لوحة التحكم"],
 ["courses","book-open","الدورات والبرامج"],
 ["trainees","users","المتدربون"],
 ["trainers","presentation","المدربون"],
 ["schedule","calendar-days","الجداول والحصص"],
 ["attendance","clipboard-check","الحضور والغياب"],
 ["branches","building-2","الفروع"],
 ["certificates","award","الشهادات"],
 ["reports","chart-column-increasing","التقارير"],
 ["subscriptions","credit-card","الاشتراكات"],
 ["settings","settings-2","الإعدادات"]
];
var els={landing:document.getElementById("landing"),app:document.getElementById("app"),page:document.getElementById("page"),sideNav:document.getElementById("sideNav"),selector:document.getElementById("centerSelector"),modal:document.getElementById("modalBackdrop"),toast:document.getElementById("toast")};
var ids=0;
function gmIcon(name){return window.GMIcons?window.GMIcons.svg(name):''}
function uid(){ids+=1;return "id"+Date.now().toString(36)+ids.toString(36)}
function esc(s){return String(s===null||s===undefined?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}
function dayPlus(n){var d=new Date();d.setDate(d.getDate()+n);return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")}
function dateLabel(s){if(!s)return "—";var d=new Date(String(s).slice(0,10)+"T12:00:00");return Number.isNaN(d.getTime())?"—":new Intl.DateTimeFormat("ar-PS",{day:"numeric",month:"short",year:"numeric"}).format(d)}
function shortDay(s){var d=new Date(String(s).slice(0,10)+"T12:00:00");return {number:Number.isNaN(d.getTime())?"—":d.getDate(),month:Number.isNaN(d.getTime())?"—":new Intl.DateTimeFormat("ar-PS",{month:"short"}).format(d)}}
function num(n){return new Intl.NumberFormat("ar-PS").format(Number(n)||0)}
function safeSave(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}catch(e){toast("تعذّر حفظ البيانات في هذا المتصفح")}}
function seed(){
 return {
  centers:[{id:"c1",name:"أكاديمية الريادة",city:"غزة",plan:"Growth"},{id:"c2",name:"مركز الأفق للتدريب",city:"رام الله",plan:"Starter"}],
  branches:[{id:"b1",centerId:"c1",name:"الفرع الرئيسي",city:"غزة",address:"وسط المدينة"},{id:"b2",centerId:"c1",name:"فرع التدريب الرقمي",city:"غزة",address:"حي الرمال"},{id:"b3",centerId:"c2",name:"الفرع الرئيسي",city:"رام الله",address:"مركز المدينة"}],
  trainers:[{id:"t1",centerId:"c1",name:"د. سارة أحمد",specialty:"التسويق الرقمي",email:"sara@example.com"},{id:"t2",centerId:"c1",name:"محمود حسن",specialty:"تصميم تجربة المستخدم",email:"mahmoud@example.com"},{id:"t3",centerId:"c2",name:"ليلى يوسف",specialty:"تطوير الويب",email:"layla@example.com"}],
  trainees:[{id:"u1",centerId:"c1",name:"أحمد إبراهيم",email:"ahmad@example.com",phone:"0590000001",joinedAt:dayPlus(-26)},{id:"u2",centerId:"c1",name:"نور محمد",email:"noor@example.com",phone:"0590000002",joinedAt:dayPlus(-20)},{id:"u3",centerId:"c1",name:"يوسف خالد",email:"yousef@example.com",phone:"0590000003",joinedAt:dayPlus(-13)},{id:"u4",centerId:"c1",name:"مريم علي",email:"maryam@example.com",phone:"0590000004",joinedAt:dayPlus(-5)},{id:"u5",centerId:"c2",name:"رامي صالح",email:"rami@example.com",phone:"0590000005",joinedAt:dayPlus(-21)},{id:"u6",centerId:"c2",name:"رنا جميل",email:"rana@example.com",phone:"0590000006",joinedAt:dayPlus(-8)}],
  courses:[{id:"co1",centerId:"c1",title:"تصميم تجربة المستخدم UI/UX",category:"تصميم",trainerId:"t2",branchId:"b2",capacity:20,price:150,status:"active"},{id:"co2",centerId:"c1",title:"التسويق الرقمي من الصفر",category:"تسويق",trainerId:"t1",branchId:"b1",capacity:25,price:120,status:"active"},{id:"co3",centerId:"c1",title:"مهارات القيادة والإدارة",category:"أعمال",trainerId:"t1",branchId:"b1",capacity:20,price:90,status:"draft"},{id:"co4",centerId:"c2",title:"تطوير واجهات الويب",category:"تقنية",trainerId:"t3",branchId:"b3",capacity:18,price:160,status:"active"}],
  enrollments:[{id:"e1",centerId:"c1",traineeId:"u1",courseId:"co1"},{id:"e2",centerId:"c1",traineeId:"u2",courseId:"co1"},{id:"e3",centerId:"c1",traineeId:"u3",courseId:"co2"},{id:"e4",centerId:"c1",traineeId:"u4",courseId:"co2"},{id:"e5",centerId:"c2",traineeId:"u5",courseId:"co4"},{id:"e6",centerId:"c2",traineeId:"u6",courseId:"co4"}],
  sessions:[{id:"s1",centerId:"c1",courseId:"co1",branchId:"b2",date:dayPlus(1),time:"10:00",duration:120,room:"قاعة التصميم"},{id:"s2",centerId:"c1",courseId:"co2",branchId:"b1",date:dayPlus(2),time:"12:30",duration:90,room:"القاعة 2"},{id:"s3",centerId:"c1",courseId:"co1",branchId:"b2",date:dayPlus(-1),time:"10:00",duration:120,room:"قاعة التصميم"},{id:"s4",centerId:"c2",courseId:"co4",branchId:"b3",date:dayPlus(1),time:"11:00",duration:90,room:"مختبر البرمجة"}],
  attendance:[{id:"a1",centerId:"c1",sessionId:"s3",traineeId:"u1",status:"present"},{id:"a2",centerId:"c1",sessionId:"s3",traineeId:"u2",status:"absent"}],
  certificates:[],subscriptions:[]
 };
}
function init(){
 try{var val=JSON.parse(localStorage.getItem(STORAGE_KEY)||"null");state=val&&Array.isArray(val.centers)&&Array.isArray(val.courses)&&Array.isArray(val.trainees)?val:seed()}catch(e){state=seed()}
 ["centers","branches","trainers","trainees","courses","enrollments","sessions","attendance","certificates","subscriptions"].forEach(function(k){if(!Array.isArray(state[k]))state[k]=[]});
 if(!state.centers.some(function(c){return c.id===activeCenter}))activeCenter=state.centers[0]?state.centers[0].id:"";
 if(!localStorage.getItem(STORAGE_KEY))safeSave();
 navRender();selectorRender();bind();if(location.hash==="#demo")openApp(false);
}
function scoped(table){return (state[table]||[]).filter(function(item){return item.centerId===activeCenter})}
function find(table,id){return (state[table]||[]).find(function(item){return item.id===id&&item.centerId===activeCenter})}
function center(){return state.centers.find(function(c){return c.id===activeCenter})||{name:"المركز",plan:"Solo",city:""}}
function countFor(courseId){return scoped("enrollments").filter(function(e){return e.courseId===courseId}).length}
function toast(msg){els.toast.textContent=msg;els.toast.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(function(){els.toast.classList.remove("show")},3400)}
function selectorRender(){els.selector.innerHTML=state.centers.map(function(c){return '<option value="'+esc(c.id)+'"'+(c.id===activeCenter?" selected":"")+'>'+esc(c.name)+'</option>'}).join("");document.getElementById("sidebarCenterName").textContent=center().name}
function navRender(){
 els.sideNav.innerHTML=nav.map(function(item){
  var selected=item[0]===activePage;
  return '<button type="button" class="side-link'+(selected?' active':'')+'" data-nav="'+item[0]+'" aria-current="'+(selected?'page':'false')+'"><span class="side-ico">'+gmIcon(item[1])+'</span>'+item[2]+'</button>'
 }).join("");
 document.querySelectorAll(".bottom-nav [data-nav]").forEach(function(btn){
  var selected=btn.dataset.nav===activePage;
  btn.classList.toggle("active",selected);
  btn.setAttribute("aria-current",selected?"page":"false");
 });
 var more=document.getElementById("bottomMore");
 if(more)more.classList.toggle("active",!["dashboard","courses","trainees","attendance"].includes(activePage));
}
function closeMenu(){document.getElementById("sidebar").classList.remove("open");document.getElementById("mobileOverlay").classList.remove("visible");document.getElementById("mobileMenu").setAttribute("aria-expanded","false")}
function openApp(push){els.landing.classList.add("is-hidden");els.app.classList.remove("is-hidden");if(push!==false)history.replaceState(null,"","#demo");window.scrollTo(0,0);render()}
function exitApp(){els.app.classList.add("is-hidden");els.landing.classList.remove("is-hidden");history.replaceState(null,"",location.pathname);closeMenu();window.scrollTo(0,0)}
function navigate(page){if(!nav.some(function(n){return n[0]===page}))return;activePage=page;q="";navRender();document.getElementById("currentPageName").textContent=nav.find(function(n){return n[0]===page})[2];closeMenu();render();window.scrollTo(0,0)}
function bind(){
 ["landingOpenTop","landingOpenHero","landingOpenSteps","landingOpenBottom"].forEach(function(id){document.getElementById(id).addEventListener("click",function(){openApp()})});
 document.querySelectorAll("[data-open-app]").forEach(function(n){n.addEventListener("click",function(){openApp()})});
 document.getElementById("exitApp").addEventListener("click",exitApp);
 document.getElementById("mobileMenu").addEventListener("click",function(){var isOpen=document.getElementById("sidebar").classList.toggle("open");document.getElementById("mobileOverlay").classList.toggle("visible",isOpen);this.setAttribute("aria-expanded",String(isOpen))});
 document.getElementById("mobileOverlay").addEventListener("click",closeMenu);
 document.getElementById("bottomMore").addEventListener("click",function(){document.getElementById("mobileMenu").click()});
 document.getElementById("demoInfo").addEventListener("click",function(){toast("هذه معاينة تفاعلية؛ تُحفظ البيانات داخل متصفحك فقط. لا تستخدم بيانات حقيقية.")});
 els.selector.addEventListener("change",function(e){var next=e.target.value;if(!state.centers.some(function(c){return c.id===next}))return;activeCenter=next;selectorRender();render();toast("تم الانتقال إلى بيانات "+center().name+" داخل هذه المعاينة فقط")});
 document.getElementById("closeModal").addEventListener("click",closeModal);
 els.modal.addEventListener("click",function(e){if(e.target===els.modal)closeModal()});
 document.addEventListener("keydown",function(e){if(e.key==="Escape")closeModal()});
 document.body.addEventListener("click",onClick);
 document.body.addEventListener("input",function(e){if(e.target.id==="tableSearch"){q=e.target.value;filterRows()}});
 document.body.addEventListener("submit",submitForm);
}
function onClick(e){
 var t=e.target.closest("[data-nav],[data-add],[data-enroll],[data-attend],[data-export],[data-reset],[data-cert],[data-show-cert],[data-close-modal],[data-switch]");
 if(!t)return;
 if(t.dataset.nav){navigate(t.dataset.nav);return}
 if(t.dataset.add){openModal(t.dataset.add,t.dataset.course||"");return}
 if(t.dataset.enroll){openModal("enrollment",t.dataset.enroll);return}
 if(t.dataset.attend){markAttendance(t.dataset.attend,t.dataset.trainee,t.dataset.status);return}
 if(t.dataset.export){exportCsv();return}
 if(t.dataset.reset){if(confirm("إعادة البيانات التجريبية إلى وضعها الأصلي؟ سيتم حذف تعديلات هذا المتصفح فقط.")){state=seed();activeCenter="c1";safeSave();selectorRender();render();toast("تمت إعادة بيانات المعاينة")};return}
 if(t.dataset.cert){openModal("certificate",t.dataset.cert==="new"?"":t.dataset.cert);return}
 if(t.dataset.showCert){printCertificate(t.dataset.showCert);return}
 if(t.dataset.closeModal!==undefined){closeModal();return}
 if(t.dataset.switch){navigate(t.dataset.switch);return}
}
function pageHead(title,subtitle,btnLabel,kind){return '<div class="page-head"><div><h1>'+esc(title)+'</h1><p>'+esc(subtitle)+'</p></div>'+(btnLabel?'<div class="page-actions"><button class="app-btn primary" data-add="'+kind+'">＋ '+esc(btnLabel)+'</button></div>':"")+'</div>'}
function status(s){var map={active:["نشطة",""],draft:["مسودة","draft"],completed:["مكتملة","done"],present:["حاضر",""],absent:["غائب","absent"],excused:["بعذر","draft"]};var v=map[s]||["غير محدد","muted"];return '<span class="status '+v[1]+'">'+v[0]+'</span>'}
function textEmpty(title,description){return '<div class="empty"><span class="empty-icon">'+gmIcon("sparkles")+'</span><b>'+esc(title)+'</b><p>'+esc(description||"يمكنك إضافة أول عنصر من زر الإضافة.")+'</p></div>'}
function render(){if(!activeCenter){els.page.innerHTML=textEmpty("لا يوجد مركز","أنشئ مركزًا لتبدأ");return}var views={dashboard:dashboard,courses:courses,trainees:trainees,trainers:trainers,schedule:schedule,attendance:attendance,branches:branches,certificates:certificates,reports:reports,subscriptions:subscriptions,settings:settings};els.page.innerHTML=(views[activePage]||dashboard)();if(window.GMIcons)window.GMIcons.hydrate(els.page);filterRows()}
function cardKpi(icon,label,value,sub,cls){return '<div class="kpi"><div class="kpi-top"><span class="kpi-label">'+esc(label)+'</span><span class="kpi-icon '+(cls||"")+'">'+gmIcon(icon)+'</span></div><strong>'+num(value)+'</strong><small>'+esc(sub)+'</small></div>'}
function upcoming(){return scoped("sessions").filter(function(s){return s.date>=dayPlus(0)}).sort(function(a,b){return(a.date+a.time).localeCompare(b.date+b.time)}).slice(0,4)}
function dashboard(){
 var tr=scoped("trainees"),cr=scoped("courses"),s=scoped("sessions"),e=scoped("enrollments");
 var series=[28,53,42,71,59,86,68];var n=e.length;series=series.map(function(v,i){return n?Math.min(98,Math.max(12,Math.round(v*n/6))):6});
 var sessions=upcoming();
 return '<div class="page-head"><div><h1>صباح الخير، فريق '+esc(center().name)+' 👋</h1><p>مساحة موحّدة لمتابعة مركزك، وخطوات يومية أوضح لفريقك.</p></div><div class="page-actions"><button class="app-btn" data-switch="reports">'+gmIcon("chart-column-increasing")+' التقارير</button><button class="app-btn primary" data-add="course">'+gmIcon("plus")+' دورة جديدة</button></div></div>'+
 '<div class="overview-greeting"><div><h2>كل إنجاز يبدأ بتنظيم جيد ✨</h2><p>اطّلع على الدورات والحصص القريبة، ونظّم يوم فريقك بثقة.</p></div><span class="sparkle">'+gmIcon("sparkles")+'</span></div>'+
 '<div class="kpi-grid">'+cardKpi("users","إجمالي المتدربين",tr.length,"المسجّلون في مركزك")+
 cardKpi("book-open","الدورات النشطة",cr.filter(function(x){return x.status==="active"}).length,"من "+num(cr.length)+" دورة","orange")+
 cardKpi("graduation-cap","إجمالي التسجيلات",e.length,"عبر الدورات","purple")+
 cardKpi("calendar-days","الحصص المجدولة",s.length,"منها "+num(sessions.length)+" قادمة","blue")+'</div>'+
 '<div class="panel-grid"><div class="panel"><div class="panel-head"><h3>لمحة عن النشاط</h3><small>بيانات عرض توضيحية</small></div><div class="revenue-chart">'+series.map(function(v){return '<div><i style="height:'+v+'%"></i></div>'}).join("")+'</div><div class="chart-axis"><span>السبت</span><span>الأحد</span><span>الإثنين</span><span>الثلاثاء</span><span>الأربعاء</span><span>الخميس</span><span>الجمعة</span></div></div>'+
 '<div class="panel"><div class="panel-head"><h3>الحصص القادمة</h3><button class="mini-link" data-switch="schedule">كل الحصص ←</button></div><div class="upcoming-list">'+(sessions.length?sessions.map(function(x){var d=shortDay(x.date);var c=find("courses",x.courseId);return '<div class="upcoming-item"><div class="datebox"><b>'+d.number+'</b><span>'+d.month+'</span></div><div><strong>'+esc(c?c.title:"دورة غير متاحة")+'</strong><small>'+esc(x.time)+' • '+esc(x.room||"قاعة التدريب")+'</small></div></div>'}).join(""):textEmpty("لا حصص قادمة","أضف جلسة تدريبية جديدة"))+'</div></div></div>'+
 '<div class="panel"><div class="panel-head"><h3>الدورات الجارية</h3><button class="mini-link" data-switch="courses">إدارة الدورات ←</button></div>'+courseTable(cr.slice(0,5))+'</div>';
}
function courseTable(items){if(!items.length)return textEmpty("لا توجد دورات");return '<div class="table-wrap"><table class="data-table"><thead><tr><th>الدورة</th><th>المدرب</th><th>المقاعد</th><th>الحالة</th><th>إجراء</th></tr></thead><tbody>'+items.map(function(c){var trainer=find("trainers",c.trainerId);var enrolled=countFor(c.id);return '<tr data-search="'+esc(c.title+" "+(trainer?trainer.name:""))+'"><td><strong>'+esc(c.title)+'</strong><span class="subtext">'+esc(c.category||"تدريب")+'</span></td><td>'+esc(trainer?trainer.name:"غير معيّن")+'</td><td>'+num(enrolled)+' / '+num(c.capacity)+'</td><td>'+status(c.status)+'</td><td><button class="app-btn small" data-enroll="'+esc(c.id)+'">تسجيل متدرب</button></td></tr>'}).join("")+'</tbody></table></div>'}
function courses(){var items=scoped("courses");return pageHead("الدورات والبرامج","أنشئ الدورات، وحدّد المدربين، وتابع التسجيل والمقاعد المتاحة.","إضافة دورة","course")+
 '<div class="toolbar"><input class="search-field" id="tableSearch" type="search" aria-label="البحث في الدورات" placeholder="⌕ ابحث عن دورة..." value="'+esc(q)+'"><span class="table-summary">'+num(items.length)+' دورات</span></div>'+
 (items.length?'<div class="cards-grid">'+items.map(function(c){var count=countFor(c.id),cap=Math.max(1,Number(c.capacity)||1),trainer=find("trainers",c.trainerId);return '<article class="course-card" data-search="'+esc(c.title+" "+c.category+" "+(trainer?trainer.name:""))+'"><div class="course-cover"><span>'+gmIcon("book-open")+'</span>'+status(c.status)+'</div><div class="course-body"><small style="color:#6d9b7a">'+esc(c.category||"برنامج تدريبي")+'</small><h3>'+esc(c.title)+'</h3><p>♙ '+esc(trainer?trainer.name:"لم يُحدّد مدرب بعد")+'</p><div class="progress-label"><span>التسجيلات</span><span>'+num(count)+' / '+num(cap)+'</span></div><div class="progress-track"><div class="progress-fill" style="width:'+Math.min(100,Math.round(count/cap*100))+'%"></div></div><div class="course-foot"><span>'+num(c.price||0)+' $ <small style="color:#93a496">سعر توضيحي</small></span><button class="app-btn small" data-enroll="'+esc(c.id)+'">＋ تسجيل</button></div></div></article>'}).join("")+'</div>':textEmpty("لا توجد دورات","أضف دورتك الأولى من الأعلى."))}
function trainees(){var items=scoped("trainees");return pageHead("المتدربون","ملفات المتدربين والتسجيلات داخل مركزك فقط.","إضافة متدرب","trainee")+
 '<div class="toolbar"><input class="search-field" id="tableSearch" type="search" placeholder="⌕ ابحث عن متدرب..." aria-label="البحث في المتدربين" value="'+esc(q)+'"><span class="table-summary">'+num(items.length)+' متدربين</span></div><div class="panel">'+(items.length?'<div class="table-wrap"><table class="data-table"><thead><tr><th>المتدرب</th><th>البريد</th><th>الهاتف</th><th>الدورات المسجّل بها</th><th>تاريخ الإضافة</th></tr></thead><tbody>'+items.map(function(u){var count=scoped("enrollments").filter(function(e){return e.traineeId===u.id}).length;return '<tr data-search="'+esc(u.name+" "+u.email+" "+u.phone)+'"><td><span class="item-person"><span class="avatar-circle">'+esc(u.name.slice(0,1))+'</span><strong>'+esc(u.name)+'</strong></span></td><td dir="ltr">'+esc(u.email||"—")+'</td><td dir="ltr">'+esc(u.phone||"—")+'</td><td>'+num(count)+'</td><td>'+dateLabel(u.joinedAt)+'</td></tr>'}).join("")+'</tbody></table></div>':textEmpty("لا يوجد متدربون"))+'</div>'}
function trainers(){var items=scoped("trainers");return pageHead("المدربون","تعرّف على فريق التدريب وتخصصاتهم ودوراتهم المسندة.","إضافة مدرب","trainer")+
 '<div class="toolbar"><input class="search-field" id="tableSearch" type="search" placeholder="⌕ ابحث عن مدرب..." aria-label="البحث في المدربين" value="'+esc(q)+'"><span class="table-summary">'+num(items.length)+' مدربين</span></div><div class="panel">'+(items.length?'<div class="table-wrap"><table class="data-table"><thead><tr><th>المدرب</th><th>التخصص</th><th>البريد</th><th>الدورات</th></tr></thead><tbody>'+items.map(function(u){return '<tr data-search="'+esc(u.name+" "+u.specialty)+'"><td><span class="item-person"><span class="avatar-circle">'+esc(u.name.slice(0,1))+'</span><strong>'+esc(u.name)+'</strong></span></td><td>'+esc(u.specialty||"—")+'</td><td dir="ltr">'+esc(u.email||"—")+'</td><td>'+num(scoped("courses").filter(function(c){return c.trainerId===u.id}).length)+'</td></tr>'}).join("")+'</tbody></table></div>':textEmpty("لا يوجد مدربون"))+'</div>'}
function schedule(){var items=scoped("sessions").slice().sort(function(a,b){return (a.date+a.time).localeCompare(b.date+b.time)});return pageHead("الجداول والحصص","تابع جلسات التدريب حسب اليوم والدورة والفرع.","جدولة حصة","session")+
 (items.length?'<div class="calendar-list">'+items.map(function(s){var d=shortDay(s.date),course=find("courses",s.courseId),branch=find("branches",s.branchId);return '<article class="session-card"><div class="session-date"><b>'+d.number+'</b><span>'+d.month+'</span></div><div class="session-body"><strong>'+esc(course?course.title:"دورة غير موجودة")+'</strong><p>◷ '+esc(s.time)+' • '+num(s.duration||60)+' دقيقة</p><div class="pill-row"><span class="small-pill">⌂ '+esc(branch?branch.name:"بدون فرع")+'</span><span class="small-pill">'+esc(s.room||"قاعة غير محددة")+'</span></div></div><button class="app-btn small" data-switch="attendance">الحضور</button></article>'}).join("")+'</div>':textEmpty("لم تُجدوَل حصص بعد","أضف حصة لدورة موجودة لتبدأ متابعة الحضور."))}
function attendance(){var items=scoped("sessions").slice().sort(function(a,b){return (b.date+b.time).localeCompare(a.date+a.time)});return pageHead("الحضور والغياب","سجّل حضور المتدربين في كل حصة تدريبية.")+
 '<div class="warning">هذه المعاينة تخزّن سجلات الحضور في متصفحك فقط. لا تستخدمها لتسجيل حضور حقيقي.</div>'+
 (items.length?'<div class="attendance-grid">'+items.map(function(s){var c=find("courses",s.courseId);var en=scoped("enrollments").filter(function(e){return e.courseId===s.courseId});return '<article class="attendance-card"><div class="attendance-head"><div><h3>'+esc(c?c.title:"دورة غير موجودة")+'</h3><p>'+dateLabel(s.date)+' • '+esc(s.time)+' • '+num(en.length)+' متدربين مسجّلين</p></div><span class="small-pill">'+esc(s.room||"التدريب")+'</span></div>'+(en.length?en.map(function(e){var u=find("trainees",e.traineeId);if(!u)return "";var a=scoped("attendance").find(function(x){return x.sessionId===s.id&&x.traineeId===u.id});var current=a?a.status:"";return '<div class="attendance-row"><span class="item-person"><span class="avatar-circle">'+esc(u.name.slice(0,1))+'</span>'+esc(u.name)+'</span><div class="choice">'+[["present","حاضر"],["absent","غائب"],["excused","بعذر"]].map(function(opt){return '<button type="button" class="'+(current===opt[0]?"selected "+opt[0]:"")+'" data-attend="'+esc(s.id)+'" data-trainee="'+esc(u.id)+'" data-status="'+opt[0]+'">'+opt[1]+'</button>'}).join("")+'</div></div>'}).join(""):textEmpty("لا يوجد مسجّلون في هذه الدورة","سجّل متدربًا لتتمكن من تحضير الحصة."))+'</article>'}).join("")+'</div>':textEmpty("لا توجد حصص","أنشئ حصة من قسم الجداول أولاً."))}
function branches(){var items=scoped("branches");return pageHead("الفروع","نظّم مواقع التدريب التابعة لمركزك.","إضافة فرع","branch")+
 (items.length?'<div class="cards-grid">'+items.map(function(b){return '<article class="panel"><div class="kpi-icon">⌂</div><h3 style="font-size:15px;margin-bottom:4px">'+esc(b.name)+'</h3><p style="font-size:12px;color:#8a9a8d">'+esc(b.city||center().city)+' • '+esc(b.address||"")+'</p><span class="small-pill">'+num(scoped("sessions").filter(function(s){return s.branchId===b.id}).length)+' حصص مجدولة</span></article>'}).join("")+'</div>':textEmpty("لا توجد فروع"))}
function certificates(){var items=scoped("certificates");return pageHead("الشهادات","سجّل شهادات التدريب وتابع بيانات إصدارها في المعاينة.","إضافة شهادة تجريبية","certificate")+
 '<div class="warning">الشهادات هنا تجريبية ولا تثبت إتمام تدريب أو اعتمادًا رسميًا. إصدار الشهادة المعتمدة يتطلب التحقق من شروط الإنجاز وهويات المستفيدين.</div>'+
 (items.length?'<div class="cards-grid">'+items.map(function(cert){var u=find("trainees",cert.traineeId),c=find("courses",cert.courseId);return '<article class="cert-card"><span class="cert-symbol">'+gmIcon("award")+'</span><h3>شهادة إتمام تدريب (معاينة)</h3><p>المتدرب: <b>'+esc(u?u.name:"غير معروف")+'</b><br>الدورة: '+esc(c?c.title:"—")+'</p><small>'+dateLabel(cert.issuedAt)+'</small><div style="margin-top:12px"><button class="app-btn small" data-show-cert="'+esc(cert.id)+'">عرض الشهادة</button></div></article>'}).join("")+'</div>':textEmpty("لا توجد شهادات تجريبية","يمكن إنشاء سجل شهادة من تسجيل قائم."))}
function reports(){
 var cr=scoped("courses"),en=scoped("enrollments"),tr=scoped("trainees"),at=scoped("attendance");
 var present=at.filter(function(a){return a.status==="present"}).length;
 var rate=at.length?Math.round(present/at.length*100):0;
 var total=en.reduce(function(sum,e){var c=find("courses",e.courseId);return sum+(c?Number(c.price)||0:0)},0);
 var items=cr.map(function(c){return {name:c.title,count:countFor(c.id)}}).sort(function(a,b){return b.count-a.count});
 var max=Math.max(1,...items.map(function(x){return x.count}));
 return pageHead("التقارير والتحليلات","مؤشرات مستمدة من سجلات المعاينة داخل المركز المحدد فقط.")+
 '<div class="page-actions" style="margin-bottom:18px"><button class="app-btn" data-export="yes">'+gmIcon("file-down")+' تصدير CSV للتسجيلات</button></div>'+
 '<div class="warning">قيمة التسجيلات تقديرية (السعر × عدد التسجيلات)، وليست مدفوعات محصّلة. لا توجد بوابة دفع متصلة.</div>'+
 '<div class="kpi-grid">'+cardKpi("users","المتدربون",tr.length,"إجمالي المركز")+cardKpi("book-open","التسجيلات",en.length,"في جميع الدورات","orange")+cardKpi("clipboard-check","نسبة الحضور",rate,"٪ من السجلات المدخلة","purple")+cardKpi("wallet","قيمة تسجيلات تقديرية",total,"دولار أمريكي","blue")+'</div>'+
 '<div class="panel-grid"><div class="panel"><div class="panel-head"><h3>التسجيلات حسب الدورة</h3></div><div class="bar-list">'+(items.length?items.map(function(i){return '<div class="bar-item"><div><span>'+esc(i.name)+'</span><b>'+num(i.count)+'</b></div><div class="progress-track"><div class="progress-fill" style="width:'+Math.round(100*i.count/max)+'%"></div></div></div>'}).join(""):textEmpty("لا توجد بيانات"))+'</div></div>'+
 '<div class="panel"><div class="panel-head"><h3>ملخص مركز التدريب</h3></div><div class="limit-row"><span>عدد الفروع</span><b>'+num(scoped("branches").length)+'</b></div><div class="limit-row"><span>عدد المدربين</span><b>'+num(scoped("trainers").length)+'</b></div><div class="limit-row"><span>عدد الدورات</span><b>'+num(cr.length)+'</b></div><div class="limit-row"><span>الحصص المجدولة</span><b>'+num(scoped("sessions").length)+'</b></div><div class="limit-row"><span>شهادات المعاينة</span><b>'+num(scoped("certificates").length)+'</b></div></div></div>';
}
function subscriptions(){var plan=center().plan||"Starter",limit=plan==="Solo"?1:plan==="Starter"?1:plan==="Growth"?5:"غير محدد";return pageHead("الاشتراكات والباقات","نظرة تصورية على خطط SaaS وحدود الاستخدام.")+
 '<div class="warning">الاشتراكات الظاهرة تجريبية فقط؛ لا يتم تحصيل أموال، أو إصدار فواتير، أو تنفيذ دفع تلقائي.</div>'+
 '<div class="plan-display"><div class="plan-info"><small>خطة المركز الحالية (تجريبية)</small><h2>'+esc(plan)+'</h2><p>خطة مبدئية لأغراض استعراض تجربة إدارة المراكز.</p><span class="small-pill" style="background:#ffffff22;color:white">نسخة معاينة • لا تتطلب دفعًا</span></div>'+
 '<div class="plan-limits"><h3 style="font-size:15px;margin-top:0">استخدام المركز الحالي</h3><div class="limit-row"><span>الفروع المستخدمة</span><b>'+num(scoped("branches").length)+' / '+esc(limit)+'</b></div><div class="limit-row"><span>المدربون</span><b>'+num(scoped("trainers").length)+'</b></div><div class="limit-row"><span>المتدربون</span><b>'+num(scoped("trainees").length)+'</b></div><div class="limit-row"><span>الدورات</span><b>'+num(scoped("courses").length)+'</b></div></div></div><div class="notice">عند تحويل النموذج إلى SaaS فعلي، ستُطبّق حدود الاشتراك على الخادم وقاعدة البيانات، وليس في الواجهة فقط.</div>'}
function settings(){return pageHead("الإعدادات","خيارات معاينة مساحة العمل وإدارة البيانات المحلية.")+
 '<div class="panel" style="max-width:680px"><h3 style="font-size:16px">بيانات المركز التجريبي</h3><div class="limit-row"><span>المركز</span><b>'+esc(center().name)+'</b></div><div class="limit-row"><span>المدينة</span><b>'+esc(center().city||"—")+'</b></div><div class="limit-row"><span>الباقة</span><b>'+esc(center().plan||"—")+'</b></div><p style="font-size:12px;color:#859b8a;line-height:1.9">يمكنك التبديل بين مركزين تجريبيين من أعلى الصفحة. لا يحدث أي دخول حقيقي لحساب آخر، ولا توجد بيانات محفوظة على خادم.</p><div class="page-actions" style="margin-top:20px"><button class="app-btn primary" data-add="center">'+gmIcon("plus")+' إنشاء مركز تجريبي</button><button class="app-btn danger" data-reset="yes">'+gmIcon("refresh-cw")+' إعادة بيانات المعاينة</button></div></div><div class="panel" style="max-width:680px;margin-top:16px"><h3>جاهزية الإنتاج</h3><p style="font-size:12px;color:#809587;line-height:2">للتشغيل الحقيقي يجب تفعيل المصادقة الخلفية وقاعدة البيانات وسياسات العزل المؤسسي واختبارات الصلاحيات؛ الملفات التأسيسية موضّحة في المستودع.</p></div>'}
function filterRows(){var search=q.trim().toLowerCase();els.page.querySelectorAll("[data-search]").forEach(function(node){node.style.display=!search||String(node.dataset.search).toLowerCase().includes(search)?"":"none"})}
function optionRows(items,label){return items.map(function(i){return {value:i.id,label:label(i)}})}
function schema(type,preset){
 var branch=optionRows(scoped("branches"),function(b){return b.name});
 var trainer=optionRows(scoped("trainers"),function(t){return t.name});
 var course=optionRows(scoped("courses"),function(c){return c.title});
 var trainee=optionRows(scoped("trainees"),function(t){return t.name});
 var enrollment=optionRows(scoped("enrollments").filter(function(e){return !scoped("certificates").some(function(c){return c.enrollmentId===e.id})}),function(e){var u=find("trainees",e.traineeId),c=find("courses",e.courseId);return (u?u.name:"—")+" — "+(c?c.title:"—")});
 var fields={
  center:[["name","اسم المركز","text",true],["city","المدينة","text",true],["plan","الباقة التجريبية","select",true,[{value:"Solo",label:"Solo"},{value:"Starter",label:"Starter"},{value:"Growth",label:"Growth"},{value:"Enterprise",label:"Enterprise"}]]],
  branch:[["name","اسم الفرع","text",true],["city","المدينة","text",true],["address","العنوان","text",false]],
  trainer:[["name","اسم المدرب","text",true],["specialty","التخصص","text",true],["email","البريد الإلكتروني","email",false]],
  trainee:[["name","اسم المتدرب","text",true],["email","البريد الإلكتروني","email",false],["phone","رقم الهاتف","tel",false]],
  course:[["title","اسم الدورة","text",true],["category","المجال","text",true],["trainerId","المدرب","select",true,trainer],["branchId","الفرع","select",true,branch],["capacity","عدد المقاعد","number",true],["price","سعر توضيحي بالدولار","number",true],["status","حالة الدورة","select",true,[{value:"active",label:"نشطة"},{value:"draft",label:"مسودة"},{value:"completed",label:"مكتملة"}]]],
  session:[["courseId","الدورة","select",true,course],["branchId","الفرع","select",true,branch],["date","تاريخ الحصة","date",true],["time","الوقت","time",true],["duration","المدة بالدقائق","number",true],["room","قاعة التدريب","text",false]],
  enrollment:[["courseId","الدورة","select",true,course],["traineeId","المتدرب","select",true,trainee]],
  certificate:[["enrollmentId","تسجيل المتدرب","select",true,enrollment]]
 };
 return fields[type]||[];
}
function openModal(type,preset){
 var names={center:"مركز تدريبي جديد",branch:"فرع جديد",trainer:"مدرب جديد",trainee:"متدرب جديد",course:"دورة تدريبية جديدة",session:"حصة تدريبية جديدة",enrollment:"تسجيل متدرب في دورة",certificate:"شهادة تجريبية"};
 if(!names[type])return;
 var fields=schema(type,preset);
 var invalid=fields.some(function(f){return f[2]==="select"&&(!f[4]||f[4].length===0)});
 document.getElementById("modalTitle").textContent=names[type];
 document.getElementById("modalContent").innerHTML=(invalid?'<div class="warning">قبل هذه الخطوة، أضف العناصر المطلوبة (مثل المدرب أو الفرع أو الدورة أو المتدرب).</div>':"")+
 '<form id="entityForm" data-type="'+type+'"><div class="form-grid">'+fields.map(function(f){
 var key=f[0],label=f[1],kind=f[2],required=f[3],opts=f[4]||[];
 var value=(key==="courseId"&&preset)?preset:(key==="date"?dayPlus(1):(key==="time"?"10:00":(key==="capacity"?"20":(key==="price"?"0":(key==="duration"?"90":"")))));
 var input=kind==="select"?'<select id="field_'+key+'" name="'+key+'" '+(required?"required":"")+'><option value="">اختر '+esc(label)+'</option>'+opts.map(function(o){return '<option value="'+esc(o.value)+'"'+(o.value===value?" selected":"")+'>'+esc(o.label)+'</option>'}).join("")+'</select>':
 '<input id="field_'+key+'" name="'+key+'" type="'+kind+'" value="'+esc(value)+'" '+(required?"required":"")+' '+(kind==="number"?'min="0" step="1"':"")+' maxlength="200">';
 return '<div class="form-field'+((key==="title"||key==="name")?" full":"")+'"><label for="field_'+key+'">'+esc(label)+(required?" *":"")+'</label>'+input+'</div>'
 }).join("")+'</div><div class="form-actions"><button class="app-btn" type="button" data-close-modal>إلغاء</button><button class="app-btn primary" type="submit"'+(invalid?" disabled":"")+'>حفظ في المعاينة</button></div></form>';
 els.modal.classList.remove("is-hidden");document.body.style.overflow="hidden";var first=document.querySelector("#entityForm input, #entityForm select");if(first)first.focus();
}
function closeModal(){els.modal.classList.add("is-hidden");document.body.style.overflow=""}
function submitForm(e){
 if(e.target.id!=="entityForm")return;
 e.preventDefault();var type=e.target.dataset.type,raw=new FormData(e.target),obj={id:uid(),centerId:activeCenter};
 schema(type).forEach(function(f){obj[f[0]]=String(raw.get(f[0])||"").trim()});
 if(type==="course"){obj.capacity=Number(obj.capacity);obj.price=Number(obj.price);if(obj.capacity<1||obj.price<0){toast("تأكد من عدد المقاعد والسعر");return}if(!find("trainers",obj.trainerId)||!find("branches",obj.branchId)){toast("المدرب أو الفرع غير صالح");return}}
 if(type==="session"){obj.duration=Number(obj.duration);if(obj.duration<1||!find("courses",obj.courseId)||!find("branches",obj.branchId)){toast("تأكد من بيانات الجلسة");return}}
 if(type==="enrollment"){var c=find("courses",obj.courseId),t=find("trainees",obj.traineeId);if(!c||!t){toast("المتدرب أو الدورة غير صالح داخل هذا المركز");return}if(countFor(c.id)>=Number(c.capacity)){toast("اكتمل العدد المسموح به لهذه الدورة");return}if(scoped("enrollments").some(function(x){return x.traineeId===obj.traineeId&&x.courseId===obj.courseId})){toast("المتدرب مسجّل مسبقًا في هذه الدورة");return}}
 if(type==="certificate"){var en=find("enrollments",obj.enrollmentId);if(!en||scoped("certificates").some(function(c){return c.enrollmentId===en.id})){toast("هذا التسجيل غير متاح لإصدار شهادة تجريبية");return}obj.traineeId=en.traineeId;obj.courseId=en.courseId;obj.issuedAt=dayPlus(0)}
 if(type==="trainee")obj.joinedAt=dayPlus(0);
 if(type==="center"){if(obj.name.length<2){toast("أدخل اسمًا صالحًا للمركز");return}delete obj.centerId;state.centers.push(obj);activeCenter=obj.id;safeSave();selectorRender();closeModal();navigate("dashboard");toast("تم إنشاء المركز في المعاينة المحلية ✓");return}
 var table=({branch:"branches",trainer:"trainers",trainee:"trainees",course:"courses",session:"sessions",enrollment:"enrollments",certificate:"certificates"})[type];
 if(!table)return;state[table].push(obj);safeSave();closeModal();render();toast("تمت الإضافة في بيانات المعاينة المحلية ✓");
}
function markAttendance(sessionId,traineeId,statusValue){
 var s=find("sessions",sessionId),u=find("trainees",traineeId);
 if(!s||!u||!["present","absent","excused"].includes(statusValue))return;
 if(!scoped("enrollments").some(function(e){return e.courseId===s.courseId&&e.traineeId===u.id})){toast("المتدرب غير مسجل في هذه الحصة");return}
 var record=scoped("attendance").find(function(a){return a.sessionId===s.id&&a.traineeId===u.id});
 if(record)record.status=statusValue;else state.attendance.push({id:uid(),centerId:activeCenter,sessionId:s.id,traineeId:u.id,status:statusValue});
 safeSave();render();toast("حُفظ الحضور داخل هذا المتصفح ✓")
}
function exportCsv(){
 var rows=[["المركز","المتدرب","الدورة","البريد الإلكتروني"]];
 scoped("enrollments").forEach(function(e){var u=find("trainees",e.traineeId),c=find("courses",e.courseId);rows.push([center().name,u?u.name:"",c?c.title:"",u?u.email:""])});
 var quote=function(v){return '"'+String(v||"").replace(/"/g,'""')+'"'};var csv="\uFEFF"+rows.map(function(r){return r.map(quote).join(",")}).join("\r\n");
 var blob=new Blob([csv],{type:"text/csv;charset=utf-8"}),url=URL.createObjectURL(blob),link=document.createElement("a");
 link.href=url;link.download="growthmood-enrollments.csv";document.body.appendChild(link);link.click();link.remove();setTimeout(function(){URL.revokeObjectURL(url)},1000);toast("تم تصدير تقرير التسجيلات التجريبي")
}
function printCertificate(id){
 var c=find("certificates",id);if(!c)return;var u=find("trainees",c.traineeId),course=find("courses",c.courseId);if(!u||!course)return;
 var w=window.open("","_blank","width=900,height=700");if(!w){toast("اسمح بالنوافذ المنبثقة لعرض الشهادة");return}
 w.document.open();w.document.write('<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><title>معاينة شهادة GrowthMood</title><style>body{font-family:Tahoma,Arial,sans-serif;padding:30px;text-align:center;color:#174730}.frame{border:10px double #8bb58b;min-height:480px;padding:38px;display:flex;flex-direction:column;justify-content:center}h1{font-size:38px}h2{font-size:28px}p{line-height:2}.stamp{color:#bb6e38;font-weight:bold;font-size:25px}.note{color:#a45b38;font-size:13px}button{padding:12px 25px;background:#174730;border:0;border-radius:9px;color:white;cursor:pointer}@media print{button{display:none}}</style><div class="frame"><span class="stamp">✳ GrowthMood</span><h1>شهادة إتمام تدريب</h1><p>تُعرض لأغراض تجربة الواجهة فقط، باسم</p><h2>'+esc(u.name)+'</h2><p>عن دورة: <b>'+esc(course.title)+'</b></p><p>المركز: '+esc(center().name)+'</p><small>التاريخ: '+dateLabel(c.issuedAt)+'</small><p class="note">نسخة تجريبية غير معتمدة — لا تستخدم كإثبات رسمي</p></div><p><button onclick="window.print()">طباعة المعاينة</button></p></html>');
 w.document.close();
}
init();
})();