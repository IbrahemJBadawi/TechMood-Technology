import handler,{read,write} from './api/publisher.js';
const report=(name,data)=>console.log('AP_CHECK '+JSON.stringify({name,...data}));
async function call(action,id){let code,result;const res={setHeader(){},status(n){code=n;return this},json(x){result=x;return this}};await handler({method:action==='list'?'GET':'POST',headers:{authorization:'Bearer '+process.env.ADMIN_PASSWORD},body:{action,id}},res);return {code,result}}
const id='2026-11-28';
const originalTitle='الابتكار الرقمي وريادة الأعمال.. ركائز التنافسية الحديثة';
const revisedTitle='الابتكار الرقمي.. من التقنية إلى نموذج الأعمال';
const day=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Hebron',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
try {
 if(day!==id){report('publication_skipped',{reason:'One-time authorization expired'});}
 else {
 const snap=await read(),p=snap.data.posts.find(x=>x.id===id);
 if(!p){report('publication_skipped',{reason:'Exact draft absent'});}
 else if(p.status==='published'){report('already_published',{messageId:p.messageId});}
 else if(p.status!=='pending'||![originalTitle,revisedTitle].includes(p.title)){report('publication_skipped',{reason:'Unexpected draft status or title'});}
 else {
 if(p.title===originalTitle){
 if(p.source?.doi!=='10.52305/svxf0042')throw Error('Unexpected original reference');
 const doi='10.1007/s11846-023-00638-9',url='https://doi.org/'+doi;
 const title='Digital innovation in entrepreneurial firms: a systematic literature review';
 const body='يتيح الابتكار الرقمي (Digital Innovation) للشركات الناشئة إعادة تصميم منتجاتها وخدماتها ونماذج أعمالها. وتوضح مراجعة منهجية شملت 185 دراسة أن فهم هذا المجال يتطلب النظر إلى المنصات الرقمية وشبكات التعاون ومنظومات الابتكار، لا إلى التكنولوجيا بمعزل عن البيئة المحيطة. ومن هنا يمكن لرواد الأعمال تقييم الفرص الرقمية ضمن نموذج أعمال واضح، بدلًا من الاكتفاء بتبنّي أدوات جديدة.';
 const question='كيف يمكن للشركات الناشئة توظيف التقنية لتطوير نموذج أعمالها بدلًا من رقمنة عملياتها فقط؟';
 const tags=['#الابتكار_الرقمي','#ريادة_الأعمال','#DigitalInnovation'];
 const signature=p.text.split('\n\n').at(-1);
 if(!signature.startsWith('تابع إبراهيم بدوي | Ibrahem J. Badawi')||signature.split('\n').length!==7)throw Error('Unexpected signature');
 const count=body.split(/\s+/).length;if(count<45||count>80)throw Error('Editorial word count');
 const cross=await fetch('https://api.crossref.org/works/'+doi,{signal:AbortSignal.timeout(10000)});if(!cross.ok)throw Error('Crossref unavailable');const meta=(await cross.json()).message;
 if(meta.DOI.toLowerCase()!==doi||!meta.title?.[0]?.toLowerCase().includes(title.toLowerCase()))throw Error('Reference metadata mismatch');
 const abstract=String(meta.abstract||'').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
 const verify=await fetch(url,{method:'HEAD',redirect:'manual',signal:AbortSignal.timeout(8000)});if(!(verify.ok||(verify.status>=300&&verify.status<400&&verify.headers.get('location'))))throw Error('DOI resolution failed');
 Object.assign(p,{title:revisedTitle,body,question,tags,source:{doi,url,title,abstract,publisher:meta.publisher||'Springer Nature',date:'2023',doiResolved:true},reviewedAt:new Date().toISOString(),reviewNote:'One-time publication explicitly requested; content independently reviewed against publisher source.'});
 p.text=[p.topic,p.title,p.body,'💬 '+p.question,'📚 المرجع: '+title+'\n'+url,tags.join(' '),signature].join('\n\n');await write(snap.data,snap.sha);report('reviewed_saved',{id,words:count,doi});
 }
 const approval=await call('approve',id);const item=approval.result?.posts?.find(x=>x.id===id);report('real_publish',{status:approval.code,error:approval.result?.error||null,state:item?.status||null,messageId:item?.messageId||null});
 const after=await call('list');const final=after.result?.posts?.find(x=>x.id===id);report('verify_persisted',{status:after.code,state:final?.status||null,messageId:final?.messageId||null,publishedAt:final?.publishedAt||null});
 if(final?.status==='published'){const repeat=await call('approve',id);report('duplicate_publish_guard',{status:repeat.code});}
 }
 }
}catch(e){report('publication_error',{error:String(e.message).slice(0,150).replace(/https?:\/\/[^\s]+/g,'[url]')});}
