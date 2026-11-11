/* StoreMood MVP: local-only, clearly labelled demo. No remote data, payment or admin verification. */
(function () {
  'use strict';

  var KEY = 'storemood_mvp_v1';
  var THEME_KEY = 'storemood_theme';
  var pages = ['overview', 'subscriptions', 'catalog', 'orders', 'notifications', 'settings'];
  var pageNames = {overview:'الرئيسية',subscriptions:'اشتراكاتي',catalog:'متجر الخدمات',orders:'طلباتي',notifications:'الإشعارات',settings:'الإعدادات'};
  var currencySymbols = {ILS:'₪', USD:'$', JOD:'د.أ'};
  var cycleNames = {monthly:'شهري', yearly:'سنوي'};
  var tones = ['blue','violet','green','sky','orange'];
  var services = [
    {id:'website',title:'تصميم وتطوير موقع إلكتروني',desc:'موقع عصري سريع ومتجاوب يدعم العربية ويعكس هوية مشروعك.',type:'مواقع ومتاجر',category:'web',icon:'globe',tone:'blue'},
    {id:'commerce',title:'إطلاق متجر إلكتروني',desc:'واجهة متجر وكتالوج منتجات وتجربة تسوق مناسبة للهاتف.',type:'مواقع ومتاجر',category:'web',icon:'store',tone:'sky'},
    {id:'ai-agent',title:'مساعد ذكاء اصطناعي للأعمال',desc:'تصور وتنفيذ مساعد رقمي يجيب العملاء وينظم المهام المتكررة.',type:'ذكاء اصطناعي',category:'ai',icon:'sparkles',tone:'violet'},
    {id:'automation',title:'أتمتة سير العمل',desc:'توصيل الأدوات وتبسيط العمليات لتقليل العمل اليدوي.',type:'ذكاء اصطناعي',category:'ai',icon:'zap',tone:'green'},
    {id:'branding',title:'الهوية والتصميم الرقمي',desc:'هوية واضحة وواجهات وأصول بصرية تعطي منتجك حضورًا مميزًا.',type:'تصميم وهوية',category:'brand',icon:'palette',tone:'orange'},
    {id:'support',title:'صيانة ومتابعة المواقع',desc:'فحص الأداء والنسخ الاحتياطي وتحسين تجربة الاستخدام.',type:'دعم وتشغيل',category:'support',icon:'headphones',tone:'blue'}
  ];
  var serviceFilter = 'all';
  var state;
  var activePage = 'overview';
  var toastTimer;

  function $(id) { return document.getElementById(id); }
  function esc(value) { return String(value == null ? '' : value).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
  function icon(name) { return '<svg class="icon" aria-hidden="true"><use href="#i-'+esc(name)+'"></use></svg>'; }
  function uid() { return 'sm-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,9); }
  function pad(n) {return String(n).padStart(2,'0');}
  function toISO(d) { return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate()); }
  function parseDate(s) { var m = String(s||'').match(/^(\d{4})-(\d{2})-(\d{2})$/); if(!m) return null; var d=new Date(Number(m[1]),Number(m[2])-1,Number(m[3]),12);return !isNaN(d.getTime()) && d.getMonth()===Number(m[2])-1 && d.getDate()===Number(m[3])?d:null; }
  function addDays(n) { var d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()+n);return toISO(d); }
  function addCycle(dateString,cycle) {var d=parseDate(dateString)||new Date();d.setHours(12,0,0,0);var now=new Date();now.setHours(12,0,0,0);if(d<now)d=now;var y=d.getFullYear(),m=d.getMonth()+(cycle==='yearly'?12:1),day=d.getDate();var first=new Date(y,m,1,12);var max=new Date(first.getFullYear(),first.getMonth()+1,0,12).getDate();first.setDate(Math.min(day,max));return toISO(first);}
  function daysUntil(dateString) {var d=parseDate(dateString);if(!d)return 0;var now=new Date();return Math.round((Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())-Date.UTC(now.getFullYear(),now.getMonth(),now.getDate()))/86400000);}
  function dateLabel(s) {var d=parseDate(s);return d?new Intl.DateTimeFormat('ar-PS',{day:'numeric',month:'short',year:'numeric'}).format(d):'—';}
  function money(amount,currency) {return new Intl.NumberFormat('ar-PS',{maximumFractionDigits:2}).format(Number(amount)||0)+' '+(currencySymbols[currency]||'');}
  function statusText(days) {return days<0?'منتهي منذ '+Math.abs(days)+' يوم':days===0?'يتجدد اليوم':days===1?'يتجدد غدًا':days<=7?'خلال '+days+' أيام':'بعد '+days+' يوم';}
  function statusClass(days) {return days<0?'late':days<=7?'soon':'';}
  function toast(message){var el=$('toast');if(!el)return;el.textContent=message;el.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(function(){el.hidden=true;},3600);}

  function freshSeed(){
    return {subscriptions:[
      {id:'demo-host',name:'استضافة موقع تجريبي',price:35,currency:'ILS',cycle:'monthly',renewal:addDays(5),source:'external',tone:'blue',example:true},
      {id:'demo-design',name:'أداة تصميم تجريبية',price:12,currency:'USD',cycle:'monthly',renewal:addDays(12),source:'external',tone:'violet',example:true},
      {id:'demo-backup',name:'نسخ احتياطي تجريبي',price:120,currency:'ILS',cycle:'yearly',renewal:addDays(36),source:'external',tone:'green',example:true}
    ],orders:[],read:[]};
  }
  function load(){
    try {var data=localStorage.getItem(KEY);if(data){var parsed=JSON.parse(data);if(parsed && Array.isArray(parsed.subscriptions)&&Array.isArray(parsed.orders)){return {subscriptions:parsed.subscriptions.filter(function(s){return s && typeof s.id==='string' && typeof s.name==='string' && parseDate(s.renewal);}).slice(0,500),orders:parsed.orders.filter(function(o){return o && typeof o.id==='string';}).slice(0,500),read:Array.isArray(parsed.read)?parsed.read.filter(function(s){return typeof s==='string';}).slice(0,1000):[]};}}}catch(e){}
    return freshSeed();
  }
  function save(){try{localStorage.setItem(KEY,JSON.stringify(state));return true;}catch(e){toast('تعذر حفظ البيانات في المتصفح الحالي.');return false;}}
  function subSorted(){return state.subscriptions.slice().sort(function(a,b){return daysUntil(a.renewal)-daysUntil(b.renewal);});}
  function totalPerMonth(){
    var out={};state.subscriptions.forEach(function(s){var amount=Number(s.price)||0;if(amount>=0){out[s.currency]=(out[s.currency]||0)+(s.cycle==='yearly'?amount/12:amount);}});return out;
  }
  function summary(){
    var sum={all:state.subscriptions.length,soon:0,late:0};state.subscriptions.forEach(function(s){var d=daysUntil(s.renewal);if(d<0)sum.late++;else if(d<=7)sum.soon++;});return sum;
  }
  function subGlyph(sub){
    return '<span class="renew-symbol '+esc(sub.tone||'blue')+'">'+icon('calendar')+'</span>';
  }
  function emptyState(heading,body,iconName,action){
    return '<div class="empty-state">'+icon(iconName||'calendar')+'<h3>'+esc(heading)+'</h3><p>'+esc(body)+'</p>'+(action?'<button type="button" class="btn btn-primary" '+action+'>'+icon('plus')+'إضافة جديد</button>':'')+'</div>';
  }
  function renderOverview(){
    var s=summary(),totals=totalPerMonth();
    $('heroCount').textContent=s.all;
    var totalCurrencies=Object.keys(totals).filter(function(c){return totals[c]>0;});
    var monthly=totalCurrencies.length?totalCurrencies.map(function(c){return '<div>'+money(totals[c],c)+'</div>';}).join(''):'<div>—</div>';
    var cards=[
      {icon:'layers',tone:'blue',label:'كل الاشتراكات',number:s.all,sub:'اشتراكات مسجلة'},
      {icon:'check',tone:'green',label:'اشتراكات سارية',number:s.all-s.late,sub:'بحسب تواريخ التجديد'},
      {icon:'clock',tone:'amber',label:'تجديدات قريبة',number:s.soon,sub:'خلال الأيام السبعة القادمة'},
      {icon:'chart',tone:'purple',label:'متوسط شهري تقريبي',number:monthly,sub:'كل عملة على حدة',html:true}
    ];
    $('overviewStats').innerHTML=cards.map(function(c){return '<article class="stat-card"><span class="stat-icon '+c.tone+'">'+icon(c.icon)+'</span><span>'+c.label+'</span>'+(c.html?'<div class="money-rows">'+c.number+'</div>':'<strong>'+c.number+'</strong>')+'<small>'+c.sub+'</small></article>';}).join('');
    var items=subSorted().slice(0,3);
    $('upcomingList').innerHTML=items.length?'<div class="renew-list">'+items.map(function(sub){var days=daysUntil(sub.renewal);return '<div class="renew-row">'+subGlyph(sub)+'<div class="renew-description"><strong>'+esc(sub.name)+'</strong><span>'+dateLabel(sub.renewal)+' · '+esc(cycleNames[sub.cycle]||'')+(sub.example?' · مثال':'')+'</span></div><div class="renew-right"><strong>'+money(sub.price,sub.currency)+'</strong><span class="status-tag '+statusClass(days)+'">'+statusText(days)+'</span></div></div>';}).join('')+'</div>':emptyState('ابدأ بإضافة اشتراك','لا توجد اشتراكات مسجلة حتى الآن.','calendar','data-add-sub');
    $('featuredServices').innerHTML=services.slice(0,3).map(serviceCard).join('');
  }
  function renderSubs(){
    var query=$('subSearch').value.trim().toLocaleLowerCase();
    var entries=subSorted().filter(function(s){return s.name.toLocaleLowerCase().includes(query);});
    $('subPageCount').textContent='('+state.subscriptions.length+')';
    $('subscriptionsList').innerHTML=entries.length?entries.map(function(s){
      var days=daysUntil(s.renewal),span=Math.max(1,s.cycle==='yearly'?365:31);
      var progress=Math.max(5,Math.min(100,Math.round((1-days/span)*100)));
      return '<article class="sub-card"><div class="sub-card-head"><div class="sub-identity">'+subGlyph(s)+'<div><strong>'+esc(s.name)+'</strong><span>'+(s.source==='storemood'?'StoreMood':'اشتراك خارجي')+' · '+(s.example?'بيانات توضيحية':esc(cycleNames[s.cycle]||''))+'</span></div></div><span class="status-tag '+statusClass(days)+'">'+statusText(days)+'</span></div><div class="sub-date"><div><small>تاريخ التجديد القادم</small><b>'+dateLabel(s.renewal)+'</b></div><div style="text-align:left"><small>التكلفة</small><b>'+money(s.price,s.currency)+'</b></div></div><div class="sub-progress" role="progressbar" aria-label="الوقت حتى التجديد" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+progress+'"><span style="width:'+progress+'%"></span></div><div class="sub-card-actions"><button class="btn btn-secondary" type="button" data-renew="'+esc(s.id)+'">'+icon('refresh')+'تسجيل تجديد</button><button class="tiny-button" data-edit="'+esc(s.id)+'" type="button" aria-label="تعديل الاشتراك" title="تعديل">'+icon('edit')+'</button><button class="tiny-button danger" data-delete="'+esc(s.id)+'" type="button" aria-label="حذف الاشتراك" title="حذف">'+icon('trash')+'</button></div></article>';
    }).join(''):emptyState(query?'لا توجد نتائج':'لا توجد اشتراكات',query?'جرب البحث بكلمة أخرى.':'سجّل أول اشتراك ليظهر هنا.','calendar',query?'':'data-add-sub');
  }
  function serviceCard(s){
    return '<article class="service-card"><div class="service-head"><span class="service-symbol '+s.tone+'">'+icon(s.icon)+'</span><span class="service-type">'+s.type+'</span></div><h3>'+s.title+'</h3><p>'+s.desc+'</p><div class="service-foot"><strong class="service-price">السعر حسب الاتفاق</strong><button class="btn btn-secondary" type="button" data-buy="'+s.id+'">طلب مبدئي '+icon('arrow')+'</button></div></article>';
  }
  function renderCatalog(){
    var q=$('serviceSearch').value.trim().toLocaleLowerCase();
    var matches=services.filter(function(s){return (serviceFilter==='all'||s.category===serviceFilter)&&(s.title+' '+s.desc+' '+s.type).toLocaleLowerCase().includes(q);});
    $('servicesGrid').innerHTML=matches.length?matches.map(serviceCard).join(''):emptyState('لا توجد خدمات مطابقة','جرّب تغيير البحث أو التصنيف.','search');
    document.querySelectorAll('[data-filter]').forEach(function(b){b.classList.toggle('selected',b.dataset.filter===serviceFilter);});
  }
  function renderOrders(){
    $('ordersList').innerHTML=state.orders.length?state.orders.slice().reverse().map(function(o){
      var service=services.find(function(s){return s.id===o.serviceId;});
      var title=service?service.title:'خدمة رقمية';
      return '<article class="order-card"><span class="renew-symbol blue">'+icon('bag')+'</span><div class="order-info"><strong>'+esc(title)+'</strong><p>مسودة طلب محلية · '+dateLabel((o.createdAt||'').slice(0,10))+'</p><small>الرقم: '+esc(o.id)+'</small></div><div class="order-controls"><button type="button" class="tiny-button" data-copy="'+esc(o.id)+'" aria-label="نسخ الطلب" title="نسخ تفاصيل الطلب">'+icon('copy')+'</button><button type="button" class="tiny-button danger" data-remove-order="'+esc(o.id)+'" aria-label="حذف المسودة" title="حذف المسودة">'+icon('trash')+'</button></div></article>';
    }).join(''):emptyState('ليس لديك طلبات بعد','تصفح الخدمات واحفظ طلبًا مبدئيًا لتراجعه قبل التواصل مع الفريق.','bag');
  }
  function listAlerts(){
    var alertItems=[];
    state.subscriptions.forEach(function(s){
      var days=daysUntil(s.renewal);
      if(days<=14){var key='renew-'+s.id+'-'+s.renewal;alertItems.push({id:key,kind:'calendar',title:days<0?'اشتراك يحتاج تجديدًا':'تجديد اشتراك قريب',body:s.name+' — '+statusText(days)+' ('+dateLabel(s.renewal)+')',urgent:days<=7});}
    });
    state.orders.forEach(function(o){alertItems.push({id:'order-'+o.id,kind:'bag',title:'مسودة طلب محفوظة',body:'طلبك المبدئي محفوظ على هذا الجهاز ولم يُرسل إلى الفريق.',urgent:false});});
    return alertItems;
  }
  function renderNotifications(){
    var alerts=listAlerts(),unread=alerts.filter(function(n){return !state.read.includes(n.id);});
    $('topDot').hidden=!unread.length;$('bottomDot').hidden=!unread.length;
    $('sideCount').hidden=!unread.length;$('sideCount').textContent=unread.length>9?'9+':String(unread.length);
    $('notificationsList').innerHTML=alerts.length?alerts.map(function(a){
      var read=state.read.includes(a.id);
      return '<article class="notice-card '+(read?'':'unread')+'"><span class="renew-symbol '+(a.urgent?'orange':'blue')+'">'+icon(a.kind)+'</span><div class="notice-info"><strong>'+esc(a.title)+'</strong><p>'+esc(a.body)+'</p></div><span class="status-tag '+(read?'':'soon')+'">'+(read?'مقروء':'جديد')+'</span></article>';
    }).join(''):emptyState('كل شيء تحت السيطرة','ليس لديك تنبيهات حاليًا.','check');
    $('markRead').disabled=!unread.length;
  }
  function renderTheme(){
    var t=document.documentElement.dataset.theme;
    if(t!=='dark'&&t!=='light'){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}
    document.querySelectorAll('[data-theme-choice]').forEach(function(b){b.classList.toggle('selected',b.dataset.themeChoice===t);});
    $('themeToggle').innerHTML=icon(t==='dark'?'sun':'moon');
    $('themeToggle').setAttribute('aria-label',t==='dark'?'التبديل إلى الوضع الفاتح':'التبديل إلى الوضع الداكن');
  }
  function renderAll(){renderOverview();renderSubs();renderCatalog();renderOrders();renderNotifications();renderTheme();}
  function navigate(page,updateHash){
    if(!pages.includes(page))page='overview';activePage=page;
    document.querySelectorAll('[data-view]').forEach(function(el){el.hidden=el.dataset.view!==page;});
    document.querySelectorAll('[data-page]').forEach(function(el){var selected=el.dataset.page===page;el.classList.toggle('active',selected);if(selected)el.setAttribute('aria-current','page');else el.removeAttribute('aria-current');});
    $('currentPage').textContent=pageNames[page];
    if(updateHash!==false&&location.hash!=='#'+page){history.replaceState(null,'','#'+page);}
    window.scrollTo({top:0,behavior:'smooth'});
  }
  function openModal(markup){
    var dlg=$('appModal');dlg.innerHTML=markup;dlg.showModal();
    var close=dlg.querySelector('[data-close-modal]');
    if(close)close.addEventListener('click',function(){dlg.close();});
  }
  function closeModal(){$('appModal').close();}
  function option(value,text,selected){return '<option value="'+value+'"'+(value===selected?' selected':'')+'>'+text+'</option>';}
  function openSubForm(id){
    var s=state.subscriptions.find(function(x){return x.id===id;});
    var editing=!!s;
    s=s||{name:'',price:0,currency:'ILS',cycle:'monthly',renewal:addDays(30),source:'external'};
    var markup='<div class="modal-header"><div><h2>'+(editing?'تعديل الاشتراك':'إضافة اشتراك جديد')+'</h2><p>سجّل تاريخ التجديد لمتابعته بسهولة.</p></div><button type="button" class="modal-close" data-close-modal aria-label="إغلاق">'+icon('x')+'</button></div>'+
      '<form id="subForm"><div class="form-grid"><div class="field wide"><label for="s-name">اسم الاشتراك *</label><input id="s-name" name="name" maxlength="70" placeholder="مثال: استضافة موقعي" required value="'+esc(s.name)+'"></div>'+
      '<div class="field"><label for="s-price">التكلفة *</label><input id="s-price" name="price" type="number" min="0" max="100000000" step="0.01" inputmode="decimal" required value="'+esc(s.price)+'"></div>'+
      '<div class="field"><label for="s-currency">العملة</label><select id="s-currency" name="currency">'+option('ILS','شيكل (₪)',s.currency)+option('USD','دولار ($)',s.currency)+option('JOD','دينار (د.أ)',s.currency)+'</select></div>'+
      '<div class="field"><label for="s-cycle">دورة التجديد</label><select id="s-cycle" name="cycle">'+option('monthly','شهري',s.cycle)+option('yearly','سنوي',s.cycle)+'</select></div>'+
      '<div class="field"><label for="s-renewal">تاريخ التجديد *</label><input id="s-renewal" name="renewal" type="date" required value="'+esc(s.renewal)+'"></div>'+
      '<div class="field wide"><label for="s-source">نوع الاشتراك</label><select id="s-source" name="source">'+option('external','اشتراك خارجي أتابعه بنفسي',s.source)+option('storemood','خدمة ضمن StoreMood (تسجيل فقط)',s.source)+'</select></div></div>'+
      '<p class="form-hint">'+icon('info')+' هذا التتبع محلي، ولا يجدد الاشتراك عند مزود الخدمة.</p>'+
      '<div class="modal-actions"><button type="submit" class="btn btn-primary">'+icon('check')+(editing?'حفظ التغييرات':'إضافة الاشتراك')+'</button><button type="button" class="btn btn-secondary" data-close-modal>إلغاء</button></div></form>';
    openModal(markup);
    $('subForm').addEventListener('submit',function(e){
      e.preventDefault();var f=new FormData(e.currentTarget),name=String(f.get('name')||'').trim(),price=Number(f.get('price')),renewal=String(f.get('renewal')||''),cycle=String(f.get('cycle')),currency=String(f.get('currency')),source=String(f.get('source'));
      if(name.length<2||name.length>70||!Number.isFinite(price)||price<0||price>100000000||!parseDate(renewal)||!cycleNames[cycle]||!currencySymbols[currency]||!['external','storemood'].includes(source)){toast('تأكد من اسم الاشتراك والسعر وتاريخ التجديد.');return;}
      var newSub={id:editing?id:uid(),name:name,price:price,currency:currency,cycle:cycle,renewal:renewal,source:source,tone:editing?s.tone:tones[state.subscriptions.length%tones.length],example:false};
      if(editing)state.subscriptions=state.subscriptions.map(function(it){return it.id===id?newSub:it;});else state.subscriptions.unshift(newSub);
      save();closeModal();renderAll();toast(editing?'تم حفظ التعديلات على هذا الجهاز.':'تمت إضافة الاشتراك على هذا الجهاز.');
    });
    $('subForm').querySelector('[data-close-modal]').addEventListener('click',closeModal);
    $('s-name').focus();
  }
  function renew(id){
    var sub=state.subscriptions.find(function(s){return s.id===id;});if(!sub)return;
    var next=addCycle(sub.renewal,sub.cycle);
    if(!window.confirm('تسجيل تجديد "'+sub.name+'" حتى '+dateLabel(next)+'؟\nهذا لن يجدد الخدمة لدى مزودها.'))return;
    sub.renewal=next;sub.example=false;save();renderAll();toast('تم تسجيل التجديد محليًا.');
  }
  function deleteSub(id){
    var sub=state.subscriptions.find(function(s){return s.id===id;});
    if(!sub||!window.confirm('حذف الاشتراك "'+sub.name+'" من هذا الجهاز؟'))return;
    state.subscriptions=state.subscriptions.filter(function(s){return s.id!==id;});save();renderAll();toast('تم حذف الاشتراك.');
  }
  function openOrder(serviceId){
    var s=services.find(function(x){return x.id===serviceId;});if(!s)return;
    openModal('<div class="modal-header"><div><h2>طلب مبدئي</h2><p>'+esc(s.title)+'</p></div><button type="button" class="modal-close" data-close-modal aria-label="إغلاق">'+icon('x')+'</button></div><form id="orderForm"><div class="notice notice-info">'+icon('info')+'<div><strong>هذه مسودة فقط.</strong> لن تُرسل إلى TechMood ولن تُنشأ عملية دفع.</div></div><div class="field"><label for="orderNotes">احكِ لنا عن احتياجك (اختياري)</label><textarea id="orderNotes" name="notes" maxlength="450" placeholder="وصف موجز للمشروع أو الخدمة المطلوبة..."></textarea></div><div class="modal-actions"><button type="submit" class="btn btn-primary">'+icon('check')+'حفظ مسودة الطلب</button><button type="button" class="btn btn-secondary" data-close-modal>إلغاء</button></div></form>');
    $('orderForm').addEventListener('submit',function(e){e.preventDefault();var f=new FormData(e.currentTarget);state.orders.push({id:uid(),serviceId:s.id,notes:String(f.get('notes')||'').trim().slice(0,450),createdAt:new Date().toISOString(),status:'draft'});save();closeModal();renderAll();navigate('orders');toast('تم حفظ المسودة على جهازك. لم تُرسل إلى الفريق.');});
    $('orderForm').querySelector('[data-close-modal]').addEventListener('click',closeModal);
  }
  function copyOrder(id){
    var o=state.orders.find(function(x){return x.id===id;});if(!o)return;
    var s=services.find(function(x){return x.id===o.serviceId;});
    var text='مسودة طلب StoreMood\nالرقم: '+o.id+'\nالخدمة: '+(s?s.title:o.serviceId)+'\nالتفاصيل: '+(o.notes||'غير محددة')+'\nملاحظة: المسودة غير مرسلة ولا مدفوعة.';
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(text).then(function(){toast('تم نسخ تفاصيل الطلب.');}).catch(function(){toast('تعذر النسخ. راجع إذن الحافظة.');});}else toast('النسخ غير متاح في هذا المتصفح.');
  }
  function themeSet(theme){if(!['dark','light'].includes(theme))return;document.documentElement.dataset.theme=theme;try{localStorage.setItem(THEME_KEY,theme);}catch(e){}renderTheme();}
  function init(){
    state=load();renderAll();
    var hash=location.hash.replace('#','');navigate(pages.includes(hash)?hash:'overview',false);
    document.addEventListener('click',function(e){
      var btn=e.target.closest('button[data-page],a[data-page],button[data-add-sub],button[data-buy],button[data-renew],button[data-edit],button[data-delete],button[data-copy],button[data-remove-order],button[data-filter],button[data-theme-choice]');
      if(!btn)return;
      if(btn.dataset.page){e.preventDefault();navigate(btn.dataset.page);return;}
      if(btn.hasAttribute('data-add-sub')){openSubForm();return;}
      if(btn.dataset.buy){openOrder(btn.dataset.buy);return;}
      if(btn.dataset.renew){renew(btn.dataset.renew);return;}
      if(btn.dataset.edit){openSubForm(btn.dataset.edit);return;}
      if(btn.dataset.delete){deleteSub(btn.dataset.delete);return;}
      if(btn.dataset.copy){copyOrder(btn.dataset.copy);return;}
      if(btn.dataset.removeOrder){if(window.confirm('هل تريد حذف هذه المسودة المحلية؟')){state.orders=state.orders.filter(function(o){return o.id!==btn.dataset.removeOrder;});save();renderAll();toast('تم حذف المسودة.');}return;}
      if(btn.dataset.filter){serviceFilter=btn.dataset.filter;renderCatalog();return;}
      if(btn.dataset.themeChoice){themeSet(btn.dataset.themeChoice);return;}
    });
    $('heroAdd').addEventListener('click',function(){openSubForm();});
    $('guidanceAdd').addEventListener('click',function(){openSubForm();});
    $('addSubscription').addEventListener('click',function(){openSubForm();});
    $('subSearch').addEventListener('input',renderSubs);
    $('serviceSearch').addEventListener('input',renderCatalog);
    $('themeToggle').addEventListener('click',function(){var t=document.documentElement.dataset.theme;if(!t)t=window.matchMedia&&window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';themeSet(t==='dark'?'light':'dark');});
    $('markRead').addEventListener('click',function(){var keys=listAlerts().map(function(a){return a.id;});state.read=Array.from(new Set(state.read.concat(keys)));save();renderNotifications();toast('تم تعليم الإشعارات كمقروءة.');});
    $('resetData').addEventListener('click',function(){if(!window.confirm('مسح جميع الاشتراكات ومسودات الطلبات والإشعارات المحفوظة على هذا الجهاز؟ لا يمكن التراجع.'))return;state={subscriptions:[],orders:[],read:[]};save();renderAll();navigate('overview');toast('تم مسح البيانات المحلية.');});
    $('appModal').addEventListener('click',function(e){if(e.target===$('appModal'))$('appModal').close();});
    window.addEventListener('hashchange',function(){var hash=location.hash.replace('#','');if(pages.includes(hash))navigate(hash,false);});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
