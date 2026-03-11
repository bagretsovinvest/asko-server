/* ═══════════════════════════════════════════════════════════
   MOCK VK BRIDGE
═══════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════
   DB — IN-MEMORY TABLES
   users / questions / answers / invites / events / follows
═══════════════════════════════════════════════════════════ */
const now = ()=>new Date().toISOString();
const uid = ()=>'id_'+Math.random().toString(36).slice(2,9);
const ago = (h)=>new Date(Date.now()-h*3600000).toISOString();

const DB = {
  users: [
    {id:'u1',name:'Алекс Попов',handle:'alex.popov',bio:'Люблю честные вопросы и короткие ответы.',avatar:'АП',accent:'violet',followers:148,following:37,streakDays:6,premium:false,refCode:'ALEX42',refBy:null,refCount:3,totalEarned:45,joinedAt:ago(720)},
    {id:'u2',name:'Мария Лебедева',handle:'maria.leb',bio:'Музыка, путешествия, сарказм.',avatar:'МЛ',accent:'blue',followers:912,following:54,streakDays:12,premium:true,refCode:'MARI77',refBy:null,refCount:8,totalEarned:120,joinedAt:ago(1440)},
    {id:'u3',name:'Лев Орлов',handle:'lev.orlov',bio:'Люблю честные вопросы.',avatar:'ЛО',accent:'mint',followers:604,following:18,streakDays:3,premium:false,refCode:'LEVOR',refBy:'u2',refCount:1,totalEarned:15,joinedAt:ago(360)},
    {id:'u4',name:'Ника Белая',handle:'nikawhite',bio:'Короткие ответы и длинные мысли.',avatar:'НБ',accent:'pink',followers:1230,following:71,streakDays:21,premium:true,refCode:'NIKA21',refBy:'u1',refCount:5,totalEarned:75,joinedAt:ago(2160)},
    {id:'u5',name:'Роман Савин',handle:'rom.savin',bio:'Музыка, учёба, друзья.',avatar:'РС',accent:'cyan',followers:342,following:66,streakDays:2,premium:false,refCode:'ROMAN5',refBy:'u1',refCount:0,totalEarned:0,joinedAt:ago(168)},
    {id:'u6',name:'Ева Миронова',handle:'evamira',bio:'Тёплый профиль.',avatar:'ЕМ',accent:'orange',followers:788,following:40,streakDays:9,premium:false,refCode:'EVAMIR',refBy:'u3',refCount:2,totalEarned:30,joinedAt:ago(504)},
  ],
  questions: [
    {id:'q1',toUserId:'u1',text:'Что тебя сейчас правда радует каждый день?',mood:'soft',createdAt:ago(2),archived:false,answered:false,important:true,senderHint:'Аноним',senderUserId:'u2',revealed:false,aiGenerated:false},
    {id:'q2',toUserId:'u1',text:'Какой совет ты дашь себе в начале года?',mood:'thoughtful',createdAt:ago(7),archived:false,answered:false,important:false,senderHint:'Аноним',senderUserId:'u4',revealed:false,aiGenerated:false},
    {id:'q3',toUserId:'u1',text:'С кем тебе проще всего быть собой?',mood:'warm',createdAt:ago(20),archived:false,answered:false,important:false,senderHint:'Подписчик',senderUserId:'u3',revealed:false,aiGenerated:false},
    {id:'q4',toUserId:'u1',text:'Какой фильм ты пересматриваешь без усталости?',mood:'fun',createdAt:ago(48),archived:false,answered:true,important:false,senderHint:'Аноним',senderUserId:'u5',revealed:false,aiGenerated:false},
    {id:'q5',toUserId:'u2',text:'Как ты расслабляешься после тяжёлого дня?',mood:'soft',createdAt:ago(3),archived:false,answered:true,important:false,senderHint:'Аноним',senderUserId:'u1',revealed:false,aiGenerated:false},
    {id:'q6',toUserId:'u3',text:'Что ты делаешь, когда грустно?',mood:'warm',createdAt:ago(5),archived:false,answered:true,important:false,senderHint:'Аноним',senderUserId:'u1',revealed:false,aiGenerated:false},
  ],
  answers: [
    {id:'a1',questionId:'q4',userId:'u1',text:'Каждый раз возвращаюсь к фильмам, где после просмотра становится легче внутри.',createdAt:ago(47),theme:'sunset',likes:46,comments:8,views:318,bookmarked:true,likedBy:['u2','u3']},
    {id:'a2',questionId:null,userId:'u1',text:'Мне нравится атмосфера, где можно отвечать честно и без напряжения.',createdAt:ago(96),theme:'violet',likes:63,comments:14,views:511,bookmarked:false,likedBy:['u4']},
    {id:'a3',questionId:'q5',userId:'u2',text:'Включаю музыку, завариваю чай и смотрю в окно. Иногда этого достаточно.',createdAt:ago(2),theme:'midnight',likes:88,comments:12,views:420,bookmarked:false,likedBy:['u1','u3','u5']},
    {id:'a4',questionId:'q6',userId:'u3',text:'Пишу в заметки всё что думаю. Потом читаю и понимаю — всё не так страшно.',createdAt:ago(4),theme:'mint',likes:34,comments:5,views:178,bookmarked:false,likedBy:['u1']},
  ],
  invites: [
    {id:'i1',fromUserId:'u1',toHandle:'@vanya',code:'ALEX42',status:'joined',joinedAt:ago(100),bonusAwarded:15},
    {id:'i2',fromUserId:'u1',toHandle:'@katya',code:'ALEX42',status:'joined',joinedAt:ago(200),bonusAwarded:15},
    {id:'i3',fromUserId:'u1',toHandle:'@dima',code:'ALEX42',status:'pending',joinedAt:null,bonusAwarded:0},
    {id:'i4',fromUserId:'u2',toHandle:'@sasha',code:'MARI77',status:'joined',joinedAt:ago(50),bonusAwarded:15},
  ],
  follows: [
    {id:'f1',fromUserId:'u1',toUserId:'u2',createdAt:ago(400)},
    {id:'f2',fromUserId:'u1',toUserId:'u3',createdAt:ago(300)},
    {id:'f3',fromUserId:'u2',toUserId:'u1',createdAt:ago(350)},
    {id:'f4',fromUserId:'u3',toUserId:'u4',createdAt:ago(200)},
    {id:'f5',fromUserId:'u4',toUserId:'u1',createdAt:ago(150)},
  ],
  events: [
    {id:'e1',userId:'u1',type:'question_received',meta:{qId:'q1'},createdAt:ago(2)},
    {id:'e2',userId:'u1',type:'answer_published',meta:{aId:'a1'},createdAt:ago(47)},
    {id:'e3',userId:'u1',type:'referral_joined',meta:{refCode:'ALEX42'},createdAt:ago(100)},
    {id:'e4',userId:'u1',type:'premium_view',meta:{},createdAt:ago(24)},
    {id:'e5',userId:'u2',type:'question_sent',meta:{qId:'q5'},createdAt:ago(3)},
  ],
  notifications: [
    {id:'n1',userId:'u1',title:'3 вопроса ждут ответа',desc:'Лучше ответить пока они свежие.',cta:'Открыть',target:{screen:'inbox'},read:false,createdAt:ago(1)},
    {id:'n2',userId:'u1',title:'Серия продолжается 🔥',desc:'Ответь сегодня и не теряй серию.',cta:'Ответить',target:{screen:'answer'},read:false,createdAt:ago(3)},
    {id:'n3',userId:'u1',title:'Рефер присоединился!',desc:'@vanya зарегистрировался по твоей ссылке. +15 баллов.',cta:'Моя реферка',target:{screen:'referral'},read:true,createdAt:ago(100)},
    {id:'n4',userId:'u1',title:'Ника ответила на вопрос',desc:'Новый ответ в вашем фиде.',cta:'Смотреть',target:{screen:'feed'},read:true,createdAt:ago(4)},
  ],
  drafts: [
    {id:'d1',questionId:'q2',userId:'u1',text:'Не пытаться успеть всё сразу.',updatedAt:ago(3),theme:'midnight'},
  ]
};

// AI question bank
const AI_QUESTIONS = [
  {text:'Что тебя сейчас вдохновляет больше всего?',mood:'soft'},
  {text:'Какую одну вещь ты бы изменил в себе прямо сейчас?',mood:'thoughtful'},
  {text:'Кто последний раз удивил тебя приятно?',mood:'warm'},
  {text:'Какой момент ты хочешь пережить ещё раз?',mood:'fun'},
  {text:'Чего ты боишься признать себе?',mood:'thoughtful'},
  {text:'Что для тебя значит быть смелым?',mood:'soft'},
  {text:'Какая музыка помогает тебе думать?',mood:'fun'},
  {text:'Как ты понимаешь, что всё идёт правильно?',mood:'warm'},
  {text:'Что тебя раздражает больше всего в людях?',mood:'thoughtful'},
  {text:'Какой твой лучший способ провести выходной?',mood:'fun'},
  {text:'Есть ли у тебя мечта, о которой никто не знает?',mood:'soft'},
  {text:'Что ты делаешь, когда совсем нет сил?',mood:'warm'},
];

/* ═══════════════════════════════════════════════════════════
   STATE
═══════════════════════════════════════════════════════════ */
const ME = 'u1'; // current user id

// Check deep link for ref code
// CONFIG from config.js
const _API_BASE = window.__API_BASE__ || '';
const _APP_LINK = window.__APP_LINK__ || '';
const _TG_LINK = window.__APP_TG_LINK__ || '';

const urlRef = new URLSearchParams(location.search).get('ref') || 
               location.hash.match(/ref=([A-Z0-9]+)/)?.[1] || null;

const S = {
  screen: 'home',
  prevScreen: null,
  draft: {text:'',theme:'midnight',align:'left',size:'lg'},
  askForm: {text:'',sign:'Аноним',mood:'soft'},
  askModal: {open:false,targetId:null},
  notifOpen: false,
  premiumOpen: false,
  premiumPlan: 'monthly',
  profileView: null,
  inboxFilter: 'new',
  searchQuery: '',
  selectedQId: '',
  shareBusy: false,
  growthPopup: null, // {title,desc,action}
  refCodeInput: urlRef||'',
  aiLoading: false,
  aiSuggestions: [],
  adminTab: 'users',
  toast: '',
  viewedAnswers: new Set(),
  vkUserInfo: null,
  onboardingStep: 0,
};

/* ═══════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════ */
const e = s=>String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const me = ()=>DB.users.find(u=>u.id===ME);
const getUser = id=>DB.users.find(u=>u.id===id)||null;
const q = sel=>document.querySelector(sel);
const isFollowing = (a,b)=>DB.follows.some(f=>f.fromUserId===a&&f.toUserId===b);

function rel(iso) {
  const d=Date.now()-new Date(iso);
  const m=Math.round(d/60000);
  if(m<1)return'только что';if(m<60)return`${m}м`;
  const h=Math.round(m/60);if(h<24)return`${h}ч`;
  return`${Math.round(h/24)}д`;
}

function plu(n,a,b,c){
  if(n%10===1&&n%100!==11)return a;
  if(n%10>=2&&n%10<=4&&(n%100<10||n%100>=20))return b;
  return c;
}

function unanswered(){return DB.questions.filter(q=>q.toUserId===ME&&!q.archived&&!q.answered);}
function answered(){return DB.questions.filter(q=>q.toUserId===ME&&!q.archived&&q.answered);}
function curQ(){return DB.questions.find(q=>q.id===S.selectedQId)||unanswered()[0]||null;}
function curQText(){return curQ()?.text||'Свободная сторис — без вопроса';}
function myAnswers(){return DB.answers.filter(a=>a.userId===ME);}
function myFollowing(){return DB.follows.filter(f=>f.fromUserId===ME).map(f=>getUser(f.toUserId)).filter(Boolean);}
function feedAnswers(){
  const followingIds=DB.follows.filter(f=>f.fromUserId===ME).map(f=>f.toUserId);
  return DB.answers.filter(a=>followingIds.includes(a.userId)).sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
}
function myInvites(){return DB.invites.filter(i=>i.fromUserId===ME);}
function inboxItems(){
  const nu=unanswered(),an=answered();
  if(S.inboxFilter==='new')return nu;
  if(S.inboxFilter==='important')return nu.filter(q=>q.important);
  if(S.inboxFilter==='answered')return an;
  if(S.inboxFilter==='revealed')return[...nu,...an].filter(q=>q.revealed);
  return nu;
}

function accentClass(acc){
  return{violet:'avv',blue:'avb',mint:'avm',pink:'avp',cyan:'avc',orange:'avo'}[acc]||'avb';
}

function logEvent(type,meta={}){
  DB.events.push({id:uid(),userId:ME,type,meta,createdAt:now()});
}

/* ═══════════════════════════════════════════════════════════
   TOAST
═══════════════════════════════════════════════════════════ */
function toast(msg,dur=2600){
  S.toast=msg; render();
  clearTimeout(window._tt);
  window._tt=setTimeout(()=>{S.toast='';render();},dur);
}

/* ═══════════════════════════════════════════════════════════
   RENDER
═══════════════════════════════════════════════════════════ */
function render(){
  const root=q('#app');if(!root)return;
  root.innerHTML=buildApp();
  syncComposer();
  if(S.screen==='profile'&&!S.profileView)syncViews();
}

function buildApp(){
  return`
    <div class="shell">
      ${buildHeader()}
      <main>${buildScreen()}</main>
    </div>
    ${buildTabBar()}
    ${S.toast?`<div class="toast">${e(S.toast)}</div>`:''}
    ${S.notifOpen?buildNotifModal():''}
    ${S.premiumOpen?buildPremiumModal():''}
    ${S.askModal.open?buildAskModal():''}
    ${S.growthPopup?buildGrowthPopup():''}
  `;
}

/* ─ HEADER ─────────────────────────────────────── */
function buildHeader(){
  const nc=DB.notifications.filter(n=>n.userId===ME&&!n.read).length;
  const nq=unanswered().length;
  const prem=me()?.premium;
  return`
  <header class="card glass hdr">
    <div class="brand" data-a="go-home">
      <div class="bmark">A</div>
      <div>
        <div class="btitle">Asko</div>
        <div class="bsub mu">Анонимные вопросы и сторис</div>
      </div>
    </div>
    <div class="row wrap">
      <div class="bicon" data-a="toggle-notif">🔔${nc?`<span class="badge">${nc}</span>`:''}</div>
      <button class="btn bg sm ${prem?'plive':''}" data-a="open-premium">${prem?'Premium ✦':'Premium'}</button>
      <button class="btn bg sm" data-a="copy-link">Ссылка</button>
      <button class="btn bp sm" data-a="go-answer">${nq?`Ответить · ${nq}`:'Сторис'}</button>
    </div>
  </header>`;
}

/* ─ TABBAR ──────────────────────────────────────── */
function buildTabBar(){
  const tabs=[
    {id:'home',ico:'⌂',lbl:'Главная'},
    {id:'inbox',ico:'✉',lbl:'Вопросы'},
    {id:'answer',ico:'✎',lbl:'Редактор'},
    {id:'feed',ico:'◉',lbl:'Фид'},
    {id:'discover',ico:'◎',lbl:'Люди'},
    {id:'referral',ico:'🎁',lbl:'Рефер'},
    {id:'profile',ico:'☺',lbl:'Профиль'},
    {id:'admin',ico:'⚙',lbl:'Админ'},
  ];
  return`<nav class="tabbar card">${tabs.map(t=>`
    <button class="tab${S.screen===t.id?' act':''}" data-a="nav" data-screen="${t.id}">
      <span class="tico">${t.ico}</span><span>${t.lbl}</span>
    </button>`).join('')}</nav>`;
}

/* ─ SCREEN ROUTER ───────────────────────────────── */
function buildScreen(){
  if(S.screen==='home')     return buildHome();
  if(S.screen==='inbox')    return buildInbox();
  if(S.screen==='answer')   return buildAnswer();
  if(S.screen==='feed')     return buildFeed();
  if(S.screen==='discover') return buildDiscover();
  if(S.screen==='referral') return buildReferral();
  if(S.screen==='profile')  return buildProfile();
  if(S.screen==='admin')    return buildAdmin();
  return buildHome();
}

/* ═══════════════════════════════════════════════════════════
   HOME SCREEN
═══════════════════════════════════════════════════════════ */
function buildHome(){
  const user=me();
  const items=unanswered();
  const s=calcStats();
  const following=myFollowing();
  const feedCount=feedAnswers().length;
  const refCount=myInvites().filter(i=>i.status==='joined').length;

  // stories: self + following
  const stories=[
    {id:'self',avatar:user.avatar,color:'tv',title:'Ты',subtitle:'Мой профиль',userId:null,type:'self'},
    {id:'best',avatar:'🔥',color:'to',title:'Топ',subtitle:'Лучшие ответы',userId:null,type:'best'},
    ...following.slice(0,6).map(u=>({id:u.id,avatar:u.avatar,color:'t'+u.accent[0],title:u.name.split(' ')[0],subtitle:isFollowing(ME,u.id)?'Подписка':'В круге',userId:u.id,type:'user'}))
  ];

  return`
  <!-- SOCIAL PROOF + STREAK -->
  <div class="card pad">
    <div class="row btw wrap">
      <div>
        <div class="ey">Добро пожаловать</div>
        <h2 style="font-size:22px;margin:5px 0 4px">${e(user.name)} <span class="streak-fire">🔥</span></h2>
        <div class="row" style="gap:14px">
          <span class="mu sm-t">Серия: <strong style="color:#fbbf24">${user.streakDays} дн</strong></span>
          <span class="mu sm-t">Реферы: <strong style="color:var(--good)">${refCount}</strong></span>
        </div>
      </div>
      <div style="text-align:right">
        <div class="streak-days" style="color:#fbbf24">${user.streakDays}</div>
        <div class="mu ti">дней подряд</div>
      </div>
    </div>
    ${buildSocialProof()}
  </div>

  <!-- STORIES -->
  <div class="card"><div class="stscroll">
    ${stories.map(st=>`
      <button class="stbtn" data-a="open-story" data-sid="${st.id}">
        <div class="string ${st.color||'tv'}"><div class="stinn">${e(st.avatar)}</div></div>
        <div class="slbl">${e(st.title)}</div>
        <div class="ssub">${e(st.subtitle)}</div>
      </button>`).join('')}
  </div></div>

  <!-- STATS -->
  <div class="col4">
    ${[['Вопросов',s.newQ],['Ответов',s.answers],['Лайков',s.likes],['Просмотров',s.views]].map(([l,v])=>`
      <div class="card pad" style="padding:16px 18px">
        <div style="font-size:28px;font-weight:900;font-family:var(--fh);letter-spacing:-.05em">${v}</div>
        <div class="mu ti" style="margin-top:3px">${l}</div>
      </div>`).join('')}
  </div>

  <!-- GROWTH ACTION CHIPS -->
  <div class="chips">
    <button class="chip" data-a="go-answer">✎ Сторис</button>
    <button class="chip" data-a="share-invite">📱 Пригласить в VK</button>
    <button class="chip" data-a="share-wall">📝 Пост на стену</button>
    <button class="chip" data-a="share-link">🔗 Скопировать ссылку</button>
    <button class="chip" data-a="go-referral">🎁 Реферальная система</button>
    <button class="chip" data-a="seed-ai">✨ AI-вопрос</button>
    <button class="chip chip-gold" data-a="open-premium">✦ Узнать автора</button>
    <button class="chip chip-green" data-a="challenge-friends">🏆 Вызов друзьям</button>
    <button class="chip" data-a="go-feed">${feedCount>0?`◉ Фид (${feedCount})`:'◉ Фид друзей'}</button>
    <button class="chip chip-red" data-a="viral-question">🔥 Вирусный вопрос</button>
  </div>

  <!-- HERO + INVITE PREVIEW -->
  <div class="col2">
    <div class="card pad">
      <div class="ey">Главное</div>
      <h1 style="font-size:clamp(22px,3vw,34px);margin:9px 0 12px">${items.length?`${items.length} ${plu(items.length,'вопрос','вопроса','вопросов')} ждут`:'Запусти волну вопросов'}</h1>
      <p class="mu sm-t" style="line-height:1.65">Поделись — друзья анонимно спросят, ты красиво ответишь. Каждый ответ = шанс на новых подписчиков.</p>
      <div class="row wrap" style="margin-top:15px;gap:8px">
        <button class="btn bp" data-a="share-invite">📱 Отправить сторис в VK</button>
        <button class="btn bg sm" data-a="go-answer">Ответить</button>
        <button class="btn bg sm" data-a="copy-link">Ссылка</button>
        <button class="btn bg sm" data-a="share-wall">На стену</button>
      </div>
      <div class="mu ti" style="margin-top:10px">После публикации сторис — кнопка «Задать вопрос» откроется для всех друзей.</div>
    </div>
    <div class="card pad" style="background:linear-gradient(135deg,rgba(124,58,237,.14),rgba(79,133,255,.1));border-color:rgba(124,58,237,.22)">
      <div class="ey" style="color:#c084fc">Быстрое действие</div>
      <h2 style="font-size:19px;margin:8px 0 10px">Рефер даёт бонус</h2>
      <div class="ref-code" style="font-size:18px;padding:11px">${e(me().refCode)}</div>
      <div class="mu sm-t" style="line-height:1.6;margin:8px 0">Каждый друг, кто придёт по твоей ссылке = <strong style="color:var(--good)">+15 баллов</strong> тебе и ему.</div>
      <button class="btn bref sm wide" data-a="copy-ref-link">🎁 Скопировать реферальную ссылку</button>
    </div>
  </div>

  <!-- ONBOARDING -->
  ${buildOnboarding()}

  <!-- LATEST QUESTIONS -->
  <div class="row btw" style="padding:2px 0">
    <div><div class="ey">Входящие</div><h2 style="font-size:20px;margin-top:4px">Новые вопросы</h2></div>
    <button class="btn bg sm" data-a="go-inbox">Все</button>
  </div>
  <div class="stack">
    ${items.length?items.slice(0,3).map(qv=>buildQCard(qv,true)).join(''):`
      <div class="card pad" style="text-align:center">
        <div style="font-size:40px;margin-bottom:10px">🕊</div>
        <h2>Пока тихо</h2>
        <p class="mu sm-t" style="margin:10px 0 16px">Поделись ссылкой или брось вызов друзьям</p>
        <div class="row wrap" style="justify-content:center;gap:8px">
          <button class="btn bp sm" data-a="share-invite">Сторис в VK</button>
          <button class="btn bg sm" data-a="copy-link">Скопировать ссылку</button>
        </div>
      </div>`}
  </div>`;
}

function buildSocialProof(){
  const users=DB.users.filter(u=>u.id!==ME).slice(0,4);
  const total=DB.users.length;
  return`
  <div class="proof-row">
    <div class="proof-avatars">
      ${users.map(u=>`<div class="proof-av ${accentClass(u.accent)}">${e(u.avatar[0])}</div>`).join('')}
    </div>
    <span><strong>${total * 47 + 312}</strong> пользователей уже в Asko</span>
  </div>`;
}

function buildOnboarding(){
  const s=calcStats();
  const steps=[
    {done:(DB.questions.filter(q=>q.toUserId===ME).length>0),lbl:'Получить первый вопрос',sub:'Поделись ссылкой на профиль',a:'share-invite'},
    {done:(DB.answers.filter(a=>a.userId===ME).length>0),lbl:'Опубликовать ответ',sub:'Зайди в редактор и создай сторис',a:'go-answer'},
    {done:myFollowing().length>0,lbl:'Найти людей',sub:'Подпишись на интересные профили',a:'go-discover'},
    {done:myInvites().filter(i=>i.status==='joined').length>0,lbl:'Пригласить друга',sub:'Реферальная система даёт бонус',a:'go-referral'},
  ];
  const done=steps.filter(s=>s.done).length;
  const pct=Math.round(done/steps.length*100);
  return`
  <div class="card pad" style="margin-top:4px">
    <div class="row btw" style="margin-bottom:8px">
      <div><div class="ey">Старт</div><h3 style="font-size:17px;margin-top:4px">Быстрый запуск</h3></div>
      <div class="mu sm-t">${done}/${steps.length} · ${pct}%</div>
    </div>
    <div class="pbar2"><div class="pfill" style="width:${pct}%"></div></div>
    <div class="stack" style="margin-top:11px;gap:7px">
      ${steps.map((st,i)=>`
        <button class="row" data-a="${st.a}" style="gap:10px;padding:10px 12px;border-radius:14px;background:${st.done?'rgba(34,211,165,.08)':'var(--faint)'};border:1px solid ${st.done?'rgba(34,211,165,.25)':'var(--line)'};width:100%;text-align:left;cursor:pointer">
          <div style="width:26px;height:26px;border-radius:999px;display:grid;place-items:center;font-size:12px;font-weight:800;flex-shrink:0;background:${st.done?'var(--good)':'rgba(255,255,255,.06)'};color:${st.done?'#001a10':'var(--txt)'}">${st.done?'✓':i+1}</div>
          <div><div class="fw sm-t">${st.lbl}</div><div class="mu ti">${st.sub}</div></div>
          ${st.done?'':'<span style="margin-left:auto;color:var(--a);font-size:13px">→</span>'}
        </button>`).join('')}
    </div>
  </div>`;
}

function calcStats(){
  const answers=DB.answers.filter(a=>a.userId===ME);
  return{
    newQ:unanswered().length,
    answers:answers.length,
    likes:answers.reduce((s,a)=>s+(a.likes||0),0),
    views:answers.reduce((s,a)=>s+(a.views||0),0),
  };
}

/* ═══════════════════════════════════════════════════════════
   INBOX
═══════════════════════════════════════════════════════════ */
function buildInbox(){
  const filters=[['new',`Новые ${unanswered().length}`],['important',`Важные ${unanswered().filter(q=>q.important).length}`],['answered',`С ответом ${answered().length}`],['revealed','Раскрытые']];
  const items=inboxItems();
  return`
  <div class="row btw">
    <div><div class="ey">Вопросы</div><h1 style="font-size:28px;margin-top:4px">Входящие</h1></div>
    <button class="btn ba sm" data-a="open-premium">Узнать автора ✦</button>
  </div>
  <div class="frow">
    ${filters.map(([id,lbl])=>`<button class="chip${S.inboxFilter===id?' act':''}" data-a="set-filter" data-filter="${id}">${lbl}</button>`).join('')}
  </div>
  <!-- AI SUGGESTIONS -->
  <div class="card pad" style="background:linear-gradient(135deg,rgba(124,58,237,.1),rgba(79,133,255,.06));border-color:rgba(124,58,237,.22)">
    <div class="row btw" style="margin-bottom:10px">
      <div><div class="ey" style="color:#c084fc">✨ AI</div><h3 style="font-size:15px;margin-top:3px">Вопросы для вдохновения</h3></div>
      <button class="btn bg xs" data-a="refresh-ai">Обновить</button>
    </div>
    <div class="col3" style="gap:8px">
      ${getAISuggestions(3).map((aq,i)=>`
        <div class="ai-card" data-a="use-ai-q" data-qi="${i}">
          <div class="mu ti" style="margin-bottom:5px">✨ AI</div>
          <div class="sm-t fw" style="line-height:1.4">${e(aq.text)}</div>
          <div style="margin-top:8px"><span class="tag tag-blue">${aq.mood}</span></div>
        </div>`).join('')}
    </div>
  </div>
  <div class="stack">
    ${items.length?items.map(qv=>buildQCard(qv)).join(''):`
      <div class="card pad" style="text-align:center">
        <div style="font-size:36px;margin-bottom:8px">📭</div>
        <h2>Тут пусто</h2>
        <p class="mu sm-t" style="margin-top:8px">Другой фильтр или жди новых вопросов</p>
      </div>`}
  </div>`;
}

function getAISuggestions(n){
  if(S.aiSuggestions.length<n){
    // pick random from bank avoiding repeats
    const shuffled=[...AI_QUESTIONS].sort(()=>Math.random()-.5);
    S.aiSuggestions=shuffled;
  }
  return S.aiSuggestions.slice(0,n);
}

/* ─ QUESTION CARD ───────────────────────────────── */
function buildQCard(qv, compact=false){
  return`
  <article class="card qcard mood-${qv.mood||'soft'}">
    <div class="row btw">
      <div class="row" style="gap:9px">
        <div style="width:32px;height:32px;border-radius:11px;background:var(--faint);border:1px solid var(--line);display:grid;place-items:center;font-size:15px">✉</div>
        <div>
          <div class="mu ti">${qv.important?'⭐ Важный':'Аноним'}</div>
          <div class="sm-t fw">${e(qv.senderHint||'Аноним')}</div>
        </div>
      </div>
      <div class="row" style="gap:6px">
        ${qv.aiGenerated?'<span class="tag tag-blue">AI</span>':''}
        <button class="btn bg xs" data-a="archive-q" data-qid="${qv.id}">скрыть</button>
      </div>
    </div>
    <div class="qbody">${e(qv.text)}</div>
    <div class="row btw wrap" style="gap:8px">
      ${buildReveal(qv)}
      <button class="btn bp${compact?' sm':''}" style="min-width:100px" data-a="start-answer" data-qid="${qv.id}">Ответить →</button>
    </div>
  </article>`;
}

function buildReveal(qv){
  if(qv.revealed&&qv.senderUserId){
    const sender=getUser(qv.senderUserId);
    return`<div class="rev-badge"><div class="mav">${e(sender?.avatar||'?')}</div><div><div class="fw sm-t">${e(sender?.name||'?')}</div><div class="mu ti">@${e(sender?.handle||'')}</div></div></div>`;
  }
  if(me()?.premium) return`<button class="btn bg sm" data-a="reveal-author" data-qid="${qv.id}">👁 Показать автора</button>`;
  return`<button class="rev-prem" data-a="open-premium">✦ Узнать, кто это · Premium</button>`;
}

/* ═══════════════════════════════════════════════════════════
   ANSWER COMPOSER
═══════════════════════════════════════════════════════════ */
function buildAnswer(){
  const THEMES=[{id:'midnight',lbl:'Ночь',g:['#10182f','#315efb']},{id:'sunset',lbl:'Закат',g:['#6d28d9','#f97316']},{id:'violet',lbl:'Фиолет',g:['#5f1fe5','#f100a8']},{id:'mint',lbl:'Мята',g:['#0f766e','#34d399']}];
  const th=THEMES.find(t=>t.id===S.draft.theme)||THEMES[0];
  return`
  <div class="row btw">
    <div><div class="ey">Редактор</div><h1 style="font-size:26px;margin-top:4px">Сторис-ответ</h1></div>
    <div class="row" style="gap:7px">
      <button class="btn bg sm" data-a="open-ask-self">Задать вопрос себе</button>
      <button class="btn bg sm" data-a="seed-ai">✨ AI</button>
    </div>
  </div>
  <div class="col2">
    <div class="stack">
      <!-- QUESTION PICKER -->
      <div class="card pad">
        <div class="row btw" style="margin-bottom:11px">
          <div><div class="ey">Шаг 1</div><h3 style="font-size:16px;margin-top:3px">Выбери вопрос</h3></div>
          <button class="btn bg xs" data-a="go-inbox">Все</button>
        </div>
        <div class="stack" style="gap:7px">
          ${unanswered().length?unanswered().map(qv=>`
            <button class="row" data-a="select-q" data-qid="${qv.id}" style="gap:9px;padding:11px 13px;border-radius:13px;background:var(--faint);border:1px solid ${S.selectedQId===qv.id?'rgba(79,133,255,.4)':'var(--line)'};color:var(--txt);text-align:left;width:100%;transition:border-color .12s;cursor:pointer">
              <div style="width:9px;height:9px;border-radius:999px;background:${S.selectedQId===qv.id?'var(--a)':'var(--mu)'};flex-shrink:0;transition:background .12s"></div>
              <div style="flex:1"><div class="fw sm-t" style="line-height:1.35">${e(qv.text)}</div><div class="mu ti">${rel(qv.createdAt)}</div></div>
            </button>`).join(''):`<div class="mu sm-t">Новых вопросов нет — создай свободную сторис или попроси AI</div>`}
        </div>
      </div>
      <!-- COMPOSER -->
      <div class="card pad">
        <div class="row btw" style="margin-bottom:11px">
          <div><div class="ey">Шаг 2</div><h3 style="font-size:16px;margin-top:3px">Напиши ответ</h3></div>
          <div class="mu sm-t" id="char-count">${S.draft.text.length} симв</div>
        </div>
        <div style="padding:11px 14px;background:var(--faint);border-radius:12px;margin-bottom:11px;font-size:13px;color:var(--mu);line-height:1.5">${e(curQText())}</div>
        <textarea id="answer-text" placeholder="Напиши ответ — превью обновляется справа…">${e(S.draft.text)}</textarea>
        <div class="stack" style="margin-top:13px;gap:10px">
          <div>
            <div class="mu sm-t" style="margin-bottom:7px">Тема</div>
            <div class="chips" style="gap:7px">
              ${THEMES.map(t=>`<button class="chip${S.draft.theme===t.id?' act':''}" data-a="pick-theme" data-theme="${t.id}">${t.lbl}</button>`).join('')}
            </div>
          </div>
          <div>
            <div class="mu sm-t" style="margin-bottom:7px">Выравнивание</div>
            <div class="chips" style="gap:7px">
              ${['left','center'].map(al=>`<button class="chip${S.draft.align===al?' act':''}" data-a="pick-align" data-align="${al}">${al==='left'?'Слева':'Центр'}</button>`).join('')}
            </div>
          </div>
        </div>
        <div class="row wrap" style="margin-top:14px;gap:7px">
          <button class="btn bp" data-a="publish-answer">Опубликовать ✓</button>
          <button class="btn bg sm" data-a="save-draft">Черновик</button>
          <button class="btn bg sm" data-a="download-story">PNG ↓</button>
          <button class="btn bg sm" data-a="share-answer-vk">📱 В VK</button>
        </div>
        <div class="mu ti" style="margin-top:9px">После публикации ответ появится в профиле и фиде друзей.</div>
      </div>
      <!-- DRAFTS -->
      ${buildDrafts()}
    </div>
    <!-- PHONE PREVIEW -->
    <div>
      <div class="phone" style="background:linear-gradient(145deg,${th.g[0]},${th.g[1]})">
        <div class="ptop">
          <div class="pdots"><span class="pdot"></span><span class="pdot"></span><span class="pdot"></span></div>
          <div class="pbar"><div class="pbarf"></div></div>
          <span class="pdot"></span>
        </div>
        <div class="pq" id="preview-q">${e(curQText())}</div>
        <div class="pab${S.draft.align==='center'?' ac':''}">
          <div class="pat" id="preview-a" style="font-size:${S.draft.size==='lg'?'18px':'15px'}">${e(S.draft.text||'Твой ответ появится здесь…')}</div>
        </div>
        <div class="pfoot">
          <span>@${e(me()?.handle||'asko')}</span>
          <span style="font-family:var(--fh);font-weight:900;color:#fff">Asko</span>
        </div>
      </div>
      <div class="mu ti" style="text-align:center;margin-top:10px">Превью 9:16</div>
    </div>
  </div>`;
}

function buildDrafts(){
  const drafts=DB.drafts.filter(d=>d.userId===ME);
  return`
  <div class="card pad">
    <div class="ey" style="margin-bottom:8px">Черновики</div>
    ${drafts.length?drafts.map(d=>`
      <button style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:11px 14px;border-radius:13px;background:var(--faint);border:1px solid var(--line);color:var(--txt);text-align:left;width:100%;margin-bottom:6px;cursor:pointer" data-a="load-draft" data-did="${d.id}">
        <div class="fw sm-t" style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;flex:1">${e(d.text)}</div>
        <div class="mu ti">${rel(d.updatedAt)}</div>
      </button>`).join(''):`<div class="mu sm-t">Черновиков нет</div>`}
  </div>`;
}

/* ═══════════════════════════════════════════════════════════
   FRIEND FEED
═══════════════════════════════════════════════════════════ */
function buildFeed(){
  const items=feedAnswers();
  const following=myFollowing();
  return`
  <div class="row btw">
    <div><div class="ey">Фид</div><h1 style="font-size:26px;margin-top:4px">Ответы друзей</h1></div>
    <button class="btn bg sm" data-a="go-discover">Найти людей</button>
  </div>
  ${following.length===0?`
    <div class="card pad" style="text-align:center">
      <div style="font-size:40px;margin-bottom:10px">👥</div>
      <h2>Подпишись на кого-нибудь</h2>
      <p class="mu sm-t" style="margin:10px 0 16px">Тогда их ответы появятся здесь</p>
      <button class="btn bp sm" data-a="go-discover">Найти людей</button>
    </div>`:`
    <div class="stack">
      ${items.length?items.map(a=>buildFeedItem(a)).join(''):`
        <div class="card pad" style="text-align:center">
          <div style="font-size:36px;margin-bottom:8px">🌱</div>
          <h2>Фид пуст</h2>
          <p class="mu sm-t" style="margin-top:8px">Те, на кого ты подписан, ещё не публиковали ответы</p>
        </div>`}
    </div>`}`;
}

function buildFeedItem(a){
  const author=getUser(a.userId);
  const qv=DB.questions.find(qv=>qv.id===a.questionId);
  const liked=a.likedBy.includes(ME);
  return`
  <div class="card">
    <div class="atile th-${a.theme||'midnight'}" style="margin:10px 10px 0;border-radius:16px">
      <div class="tq">${e(qv?.text||'Ответ без вопроса')}</div>
      <div class="ta">${e(a.text)}</div>
      <div class="tstats"><span>❤ ${a.likes}</span><span>💬 ${a.comments}</span><span>👁 ${a.views}</span></div>
    </div>
    <div class="feed-foot" style="padding:12px 14px">
      <button class="umain" data-a="open-user" data-uid="${author?.id}">
        <div class="av ${accentClass(author?.accent||'blue')}" style="width:34px;height:34px;font-size:12px">${e(author?.avatar||'?')}</div>
        <div><div class="fw sm-t">${e(author?.name||'')}</div><div class="mu ti">${rel(a.createdAt)}</div></div>
      </button>
      <div class="row" style="gap:7px">
        <button class="btn${liked?' bp':' bg'} xs" data-a="like-answer" data-aid="${a.id}">${liked?'❤':'🤍'} ${a.likes}</button>
        <button class="btn bg xs" data-a="ask-user" data-uid="${author?.id}">Спросить</button>
      </div>
    </div>
  </div>`;
}

/* ═══════════════════════════════════════════════════════════
   DISCOVER
═══════════════════════════════════════════════════════════ */
function buildDiscover(){
  const q=S.searchQuery.trim().toLowerCase();
  const all=DB.users.filter(u=>u.id!==ME);
  const filtered=q?all.filter(u=>u.name.toLowerCase().includes(q)||u.handle.toLowerCase().includes(q)):all;
  const followed=filtered.filter(u=>isFollowing(ME,u.id));
  const suggested=filtered.filter(u=>!isFollowing(ME,u.id));
  return`
  <div class="row btw">
    <div><div class="ey">Люди</div><h1 style="font-size:26px;margin-top:4px">Подписки и рекомендации</h1></div>
    <button class="btn bg sm" data-a="go-home">На главную</button>
  </div>
  <div class="card pad" style="display:flex;gap:8px;align-items:center">
    <input id="discover-search" value="${e(S.searchQuery)}" placeholder="Имя или @handle" style="border-radius:999px"/>
    <button class="btn bp sm" data-a="do-search">Найти</button>
  </div>
  ${followed.length?`
    <div class="ey" style="padding-left:2px">Подписки (${followed.length})</div>
    <div class="stack">${followed.map(u=>buildUserRow(u)).join('')}</div>`:''}
  <div class="ey" style="padding-left:2px">Рекомендации (${suggested.length})</div>
  <div class="stack">${suggested.length?suggested.map(u=>buildUserRow(u)).join(''):`<div class="card pad mu sm-t">Не найдено</div>`}</div>`;
}

function buildUserRow(u){
  const following=isFollowing(ME,u.id);
  const answerCount=DB.answers.filter(a=>a.userId===u.id).length;
  return`
  <div class="card urow">
    <button class="umain" data-a="open-user" data-uid="${u.id}">
      <div class="av ${accentClass(u.accent)}">${e(u.avatar)}</div>
      <div>
        <div class="fw">${e(u.name)}</div>
        <div class="mu sm-t">@${e(u.handle)} · ${answerCount} ответов · ${u.followers} подп.</div>
        ${u.premium?'<span class="tag tag-gold" style="margin-top:3px">Premium</span>':''}
      </div>
    </button>
    <div class="row" style="gap:6px">
      <button class="btn${following?' bg':' bp'} sm" data-a="toggle-follow" data-uid="${u.id}">${following?'✓ Подписка':'Подписаться'}</button>
      <button class="btn bg sm" data-a="ask-user" data-uid="${u.id}">Спросить</button>
    </div>
  </div>`;
}

/* ═══════════════════════════════════════════════════════════
   REFERRAL SCREEN
═══════════════════════════════════════════════════════════ */
function buildReferral(){
  const user=me();
  const myInv=myInvites();
  const joined=myInv.filter(i=>i.status==='joined');
  const pending=myInv.filter(i=>i.status==='pending');
  const earned=joined.reduce((s,i)=>s+(i.bonusAwarded||0),0);
  const link=`https://vk.com/app000000#ref=${user.refCode}`;

  return`
  <div class="row btw">
    <div><div class="ey">Реферальная система</div><h1 style="font-size:24px;margin-top:4px">Приглашай и зарабатывай</h1></div>
  </div>

  <!-- MAIN REF CARD -->
  <div class="ref-card">
    <div>
      <div class="ey" style="color:#34d399">Твой реферальный код</div>
      <div class="ref-code">${e(user.refCode)}</div>
    </div>
    <div class="mu sm-t" style="line-height:1.65">Каждый новый пользователь, кто придёт по твоей ссылке, приносит <strong style="color:var(--good)">+15 баллов</strong> тебе и ему. Баллы обмениваются на Premium-дни.</div>
    <div class="row wrap" style="gap:8px">
      <button class="btn bref" data-a="copy-ref-link">🎁 Скопировать ссылку</button>
      <button class="btn bg sm" data-a="share-ref-vk">📱 Поделиться в VK</button>
      <button class="btn bg sm" data-a="share-ref-wall">📝 На стену</button>
    </div>
    <div class="lbox" style="font-size:12px;word-break:break-all">${e(link)}</div>
  </div>

  <!-- STATS -->
  <div class="col3">
    <div class="card pad" style="text-align:center">
      <div style="font-size:32px;font-weight:900;font-family:var(--fh);color:var(--good)">${joined.length}</div>
      <div class="mu sm-t" style="margin-top:4px">Пришло друзей</div>
    </div>
    <div class="card pad" style="text-align:center">
      <div style="font-size:32px;font-weight:900;font-family:var(--fh);color:var(--gold)">${earned}</div>
      <div class="mu sm-t" style="margin-top:4px">Баллов заработано</div>
    </div>
    <div class="card pad" style="text-align:center">
      <div style="font-size:32px;font-weight:900;font-family:var(--fh);color:var(--a)">${pending.length}</div>
      <div class="mu sm-t" style="margin-top:4px">Ожидают регистрации</div>
    </div>
  </div>

  <!-- HOW IT WORKS -->
  <div class="card pad">
    <div class="ey" style="margin-bottom:12px">Как это работает</div>
    ${[
      ['1','Скопируй свою реферальную ссылку или код'],
      ['2','Отправь другу в личку / Stories / на стену VK'],
      ['3','Друг открывает приложение по твоей ссылке'],
      ['4','После регистрации вам обоим начисляется +15 баллов'],
      ['5','50 баллов = 1 день Premium. Накапливай и активируй!'],
    ].map(([n,t])=>`
      <div class="ref-step">
        <div class="ref-num">${n}</div>
        <div class="sm-t">${t}</div>
      </div>`).join('')}
  </div>

  <!-- REWARDS TABLE -->
  <div class="card pad">
    <div class="ey" style="margin-bottom:12px">Таблица наград</div>
    <div class="ref-progress">
      ${[
        {friends:1,reward:'15 баллов · стартовый бонус',done:joined.length>=1},
        {friends:3,reward:'50 баллов · 1 день Premium',done:joined.length>=3},
        {friends:5,reward:'100 баллов · 2 дня Premium + бейдж',done:joined.length>=5},
        {friends:10,reward:'250 баллов · неделя Premium',done:joined.length>=10},
        {friends:25,reward:'Premium навсегда 🏆',done:joined.length>=25},
      ].map(r=>`
        <div class="ref-row">
          <div class="row" style="gap:9px">
            <span style="font-size:16px">${r.done?'✅':'⭕'}</span>
            <div><div class="fw sm-t">${r.friends} друзей</div><div class="mu ti">${r.reward}</div></div>
          </div>
          ${r.done?'<span class="tag tag-green">Выполнено</span>':''}
        </div>`).join('')}
    </div>
  </div>

  <!-- PROGRESS BAR TO NEXT MILESTONE -->
  ${buildRefMilestone(joined.length)}

  <!-- WHO JOINED -->
  ${joined.length?`
    <div class="card pad">
      <div class="ey" style="margin-bottom:11px">Кто присоединился (${joined.length})</div>
      ${joined.map(inv=>`
        <div class="row btw" style="padding:9px 0;border-bottom:1px solid var(--line)">
          <div class="row" style="gap:9px">
            <div style="width:32px;height:32px;border-radius:999px;background:var(--good);color:#001a10;display:grid;place-items:center;font-size:12px;font-weight:800">✓</div>
            <div><div class="fw sm-t">${e(inv.toHandle)}</div><div class="mu ti">${rel(inv.joinedAt)} назад</div></div>
          </div>
          <div class="tag tag-green">+${inv.bonusAwarded} балл</div>
        </div>`).join('')}
    </div>`:''}

  <!-- ENTER REF CODE YOURSELF -->
  <div class="card pad">
    <div class="ey" style="margin-bottom:8px">У тебя есть реферальный код?</div>
    <div class="row" style="gap:8px">
      <input id="ref-code-input" placeholder="Введи код друга" value="${e(S.refCodeInput)}" style="text-transform:uppercase"/>
      <button class="btn bref sm" data-a="apply-ref-code">Применить</button>
    </div>
    ${urlRef?`<div class="mu ti" style="margin-top:8px;color:var(--good)">✓ Найден код из ссылки: ${urlRef}</div>`:''}
  </div>`;
}

function buildRefMilestone(count){
  const milestones=[1,3,5,10,25];
  const next=milestones.find(m=>m>count)||25;
  const prev=milestones.filter(m=>m<=count).pop()||0;
  const pct=next===prev?100:Math.round((count-prev)/(next-prev)*100);
  return`
  <div class="card pad">
    <div class="row btw" style="margin-bottom:8px">
      <div class="fw sm-t">До следующей награды</div>
      <div class="mu sm-t">${count}/${next} друзей</div>
    </div>
    <div class="pbar2"><div class="pfill" style="width:${pct}%"></div></div>
    <div class="mu ti" style="margin-top:7px">Ещё ${next-count} ${plu(next-count,'друг','друга','друзей')} — следующий уровень</div>
  </div>`;
}

/* ═══════════════════════════════════════════════════════════
   PROFILE SCREEN
═══════════════════════════════════════════════════════════ */
function buildProfile(){
  const other=S.profileView?getUser(S.profileView):null;
  return other?buildOtherProfile(other):buildOwnProfile();
}

function buildOwnProfile(){
  const user=me();
  const ans=myAnswers();
  const prem=user.premium;
  return`
  <div class="col2">
    <div class="stack">
      <div class="card phero glass">
        <div class="phead">
          <div class="pav avs">${e(user.avatar)}</div>
          <div>
            <div class="ey">Профиль</div>
            <h1 style="font-size:22px;margin:4px 0 2px">${e(user.name)}</h1>
            <div class="mu sm-t">@${e(user.handle)}</div>
            ${prem?'<span class="tag tag-gold" style="margin-top:5px">Premium ✦</span>':''}
          </div>
        </div>
        <p class="mu sm-t" style="line-height:1.6">${e(user.bio)}</p>
        <div class="sr">
          ${[['вопросов',DB.questions.filter(q=>q.toUserId===ME).length],['ответов',ans.length],['подп.',user.followers],['серия',`${user.streakDays}🔥`]].map(([l,v])=>`
            <div class="si"><strong>${v}</strong><span>${l}</span></div>`).join('')}
        </div>
        <div class="row wrap" style="gap:7px">
          <button class="btn bp sm" data-a="share-invite">📱 VK Stories</button>
          <button class="btn bg sm" data-a="copy-link">🔗 Ссылка</button>
          <button class="btn bg sm" data-a="share-wall">📝 Стена</button>
          <button class="btn bg sm" data-a="go-referral">🎁 Рефер</button>
          <button class="btn bg sm ${prem?'plive':''}" data-a="open-premium">${prem?'Premium ✦':'Купить Premium'}</button>
        </div>
        <div class="lbox">🔗 vk.com/app000000#profile/${e(user.handle)}</div>
      </div>
      <div class="ey" style="padding-left:2px">Ответы (${ans.length})</div>
      ${ans.length?`<div class="stack">${ans.map(a=>buildAnswerTile(a)).join('')}</div>`:`
        <div class="card pad" style="text-align:center">
          <div style="font-size:36px;margin-bottom:8px">✎</div>
          <h2>Ещё нет ответов</h2>
          <button class="btn bp sm" style="margin-top:12px" data-a="go-answer">Создать сторис</button>
        </div>`}
    </div>
    <div class="stack hidesm">
      <div class="card pad">
        <div class="ey">Ждут ответа</div>
        <div style="font-size:22px;font-weight:900;font-family:var(--fh);margin:7px 0">${unanswered().length} ${plu(unanswered().length,'вопрос','вопроса','вопросов')}</div>
        <p class="mu sm-t" style="line-height:1.55;margin-bottom:12px">Свежие ответы набирают больше просмотров.</p>
        <button class="btn bp wide" data-a="go-answer">Открыть редактор</button>
      </div>
      <div class="card pad" style="background:linear-gradient(135deg,rgba(16,185,129,.12),rgba(5,150,105,.08));border-color:rgba(16,185,129,.22)">
        <div class="ey" style="color:var(--good)">Реферальная система</div>
        <div style="font-size:18px;font-weight:900;font-family:var(--fh);margin:7px 0">Код: ${e(user.refCode)}</div>
        <p class="mu sm-t" style="line-height:1.55;margin-bottom:12px">${myInvites().filter(i=>i.status==='joined').length} друзей пришло · ${myInvites().filter(i=>i.status==='joined').reduce((s,i)=>s+i.bonusAwarded,0)} баллов</p>
        <button class="btn bref wide" data-a="copy-ref-link">🎁 Поделиться</button>
      </div>
    </div>
  </div>`;
}

function buildAnswerTile(a){
  const qv=DB.questions.find(q=>q.id===a.questionId);
  const liked=a.likedBy.includes(ME);
  return`
  <div class="atile th-${a.theme||'midnight'}">
    <div class="tq">${e(qv?.text||'Ответ без вопроса')}</div>
    <div class="ta">${e(a.text)}</div>
    <div class="row btw">
      <div class="tstats"><span>❤ ${a.likes}</span><span>💬 ${a.comments}</span><span>👁 ${a.views}</span></div>
      <button class="btn bg xs" style="color:rgba(255,255,255,.8);border-color:rgba(255,255,255,.15)" data-a="like-answer" data-aid="${a.id}">${liked?'❤':'🤍'}</button>
    </div>
  </div>`;
}

function buildOtherProfile(u){
  const ans=DB.answers.filter(a=>a.userId===u.id);
  const following=isFollowing(ME,u.id);
  return`
  <div>
    <button class="btn bg sm" data-a="back-prev">← Назад</button>
  </div>
  <div class="card phero glass">
    <div class="phead">
      <div class="pav ${accentClass(u.accent)}">${e(u.avatar)}</div>
      <div>
        <div class="ey">Профиль</div>
        <h1 style="font-size:22px;margin:4px 0 2px">${e(u.name)}</h1>
        <div class="mu sm-t">@${e(u.handle)} · ${e(u.bio)}</div>
        ${u.premium?'<span class="tag tag-gold" style="margin-top:5px">Premium ✦</span>':''}
      </div>
    </div>
    <div class="sr">
      <div class="si"><strong>${u.followers}</strong><span>подписчиков</span></div>
      <div class="si"><strong>${u.following}</strong><span>подписок</span></div>
      <div class="si"><strong>${ans.length}</strong><span>ответов</span></div>
    </div>
    <div class="row wrap" style="gap:7px">
      <button class="btn bp" data-a="ask-user" data-uid="${u.id}">Спросить анонимно</button>
      <button class="btn bg sm" data-a="toggle-follow" data-uid="${u.id}">${following?'✓ Подписка':'Подписаться'}</button>
    </div>
  </div>
  ${ans.length?`
    <div class="ey" style="padding-left:2px">Ответы</div>
    <div class="stack">${ans.map(a=>buildAnswerTile(a)).join('')}</div>`:''}`;
}

/* ═══════════════════════════════════════════════════════════
   ADMIN PANEL
═══════════════════════════════════════════════════════════ */
function buildAdmin(){
  return`
  <div class="row btw">
    <div><div class="ey">Администрация</div><h1 style="font-size:24px;margin-top:4px">Панель управления</h1></div>
    <span class="tag tag-red">DEV MODE</span>
  </div>

  <!-- ADMIN STATS -->
  <div class="col4">
    ${[
      ['Пользователей',DB.users.length,'avv'],
      ['Вопросов',DB.questions.length,'avb'],
      ['Ответов',DB.answers.length,'avo'],
      ['Событий',DB.events.length,'avm'],
    ].map(([l,v,c])=>`
      <div class="card pad">
        <div class="admin-stat">
          <div class="val">${v}</div>
          <div class="lbl">${l}</div>
        </div>
      </div>`).join('')}
  </div>
  <div class="col4">
    ${[
      ['Инвайтов',DB.invites.length],
      ['Подписок',DB.follows.length],
      ['Черновиков',DB.drafts.length],
      ['Premium',DB.users.filter(u=>u.premium).length],
    ].map(([l,v])=>`
      <div class="card pad">
        <div class="admin-stat">
          <div class="val">${v}</div>
          <div class="lbl">${l}</div>
        </div>
      </div>`).join('')}
  </div>

  <!-- TABS -->
  <div class="frow">
    ${['users','questions','events','invites','follows'].map(tab=>`
      <button class="chip${S.adminTab===tab?' act':''}" data-a="admin-tab" data-tab="${tab}">${tab}</button>`).join('')}
  </div>

  <!-- TABLE -->
  ${buildAdminTable()}

  <!-- ACTIONS -->
  <div class="card pad">
    <div class="ey" style="margin-bottom:10px">Быстрые действия</div>
    <div class="row wrap" style="gap:8px">
      <button class="btn bp sm" data-a="admin-add-question">+ Добавить вопрос</button>
      <button class="btn bg sm" data-a="admin-add-user">+ Добавить пользователя</button>
      <button class="btn bgold sm" data-a="admin-toggle-premium">Toggle Premium (me)</button>
      <button class="btn bdanger sm" data-a="admin-reset">Сбросить фейковые данные</button>
    </div>
  </div>

  <!-- ANALYTICS / EVENTS CHART -->
  <div class="card pad">
    <div class="ey" style="margin-bottom:12px">Топ событий по типам</div>
    ${buildEventsChart()}
  </div>`;
}

function buildAdminTable(){
  const tab=S.adminTab;
  let rows=[];
  let headers=[];

  if(tab==='users'){
    headers=['ID','Имя','Handle','Подп.','Premium','Рефер','Серия'];
    rows=DB.users.map(u=>[u.id,u.name,`@${u.handle}`,u.followers,u.premium?'✦ Да':'—',u.refCode,`${u.streakDays}🔥`]);
  } else if(tab==='questions'){
    headers=['ID','Кому','Вопрос','Настроение','Отвечен','AI'];
    rows=DB.questions.map(q=>[q.id,q.toUserId,q.text.slice(0,35)+'…',q.mood,q.answered?'✓':'—',q.aiGenerated?'AI':'—']);
  } else if(tab==='events'){
    headers=['ID','User','Тип','Время'];
    rows=DB.events.slice(-20).reverse().map(ev=>[ev.id.slice(0,8),ev.userId,ev.type,rel(ev.createdAt)]);
  } else if(tab==='invites'){
    headers=['ID','От','Кому','Код','Статус','Бонус'];
    rows=DB.invites.map(i=>[i.id,i.fromUserId,i.toHandle,i.code,i.status,i.bonusAwarded]);
  } else if(tab==='follows'){
    headers=['ID','От','Кому','Когда'];
    rows=DB.follows.map(f=>[f.id,f.fromUserId,f.toUserId,rel(f.createdAt)]);
  }

  return`
  <div class="card" style="overflow-x:auto">
    <table class="admin-table">
      <thead><tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead>
      <tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${e(String(c))}</td>`).join('')}</tr>`).join('')}</tbody>
    </table>
  </div>`;
}

function buildEventsChart(){
  const counts={};
  DB.events.forEach(ev=>{counts[ev.type]=(counts[ev.type]||0)+1;});
  const entries=Object.entries(counts).sort((a,b)=>b[1]-a[1]);
  const max=entries[0]?.[1]||1;
  return`<div class="stack" style="gap:8px">
    ${entries.map(([type,count])=>`
      <div>
        <div class="row btw" style="margin-bottom:4px">
          <div class="sm-t fw">${type}</div>
          <div class="mu sm-t">${count}</div>
        </div>
        <div class="pbar2"><div class="pfill" style="width:${Math.round(count/max*100)}%"></div></div>
      </div>`).join('')}
  </div>`;
}

/* ═══════════════════════════════════════════════════════════
   MODALS
═══════════════════════════════════════════════════════════ */
function buildNotifModal(){
  const items=DB.notifications.filter(n=>n.userId===ME);
  return`
  <div class="ov" data-modal="notif">
    <div class="mbox">
      <div class="row btw" style="margin-bottom:15px">
        <div><div class="ey">Уведомления</div><h2 style="font-size:20px;margin-top:4px">Что нового</h2></div>
        <div class="row" style="gap:7px">
          <button class="btn bg sm" data-a="mark-all-notif">Прочитать все</button>
          <button class="bicon" data-a="close-notif">✕</button>
        </div>
      </div>
      <div class="stack" style="gap:3px">
        ${items.length?items.map(n=>`
          <button class="nrow" data-a="open-notif" data-nid="${n.id}">
            <div class="row btw">
              <div class="fw sm-t">${e(n.title)}</div>
              ${n.read?'':'<span class="tag tag-blue" style="flex-shrink:0">Новое</span>'}
            </div>
            <div class="mu sm-t">${e(n.desc)}</div>
            <div class="mu ti">${rel(n.createdAt)}</div>
          </button>`).join(''):`<div class="mu sm-t">Уведомлений нет</div>`}
      </div>
    </div>
  </div>`;
}

function buildPremiumModal(){
  const prem=me()?.premium;
  return`
  <div class="ov" data-modal="premium">
    <div class="mbox">
      <div class="row btw" style="margin-bottom:15px">
        <div><div class="ey" style="color:#fbbf24">Premium</div><h2 style="font-size:20px;margin-top:4px">${prem?'Premium активен ✦':'Узнай, кто писал анонимно'}</h2></div>
        <button class="bicon" data-a="close-premium">✕</button>
      </div>
      <p class="mu sm-t" style="line-height:1.65;margin-bottom:15px">${prem?'Раскрывай авторов, видь статистику и получай приоритет в рекомендациях.':'Открой авторов вопросов, расширенную аналитику и приоритет в алгоритме.'}</p>
      ${[
        'Показывает, кто отправил анонимный вопрос',
        'Расширенная статистика просмотров',
        'Приоритет в рекомендациях другим пользователям',
        'Бейдж Premium на профиле',
        'Специальные темы для сторис',
      ].map(f=>`<div class="pf-row"><span class="pcheck">✓</span><span>${f}</span></div>`).join('')}
      ${prem?`
        <button class="btn bp wide" style="margin-top:16px" data-a="go-inbox">Открыть входящие</button>
        <button class="btn bdanger sm wide" style="margin-top:8px" data-a="cancel-premium">Отменить Premium</button>`:`
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:9px;margin:16px 0 14px">
          ${[{id:'monthly',lbl:'1 месяц',price:'149 ₽/мес'},{id:'yearly',lbl:'12 месяцев',price:'990 ₽/год'}].map(p=>`
            <div class="pplan${S.premiumPlan===p.id?' act':''}" data-a="pick-plan" data-plan="${p.id}">
              <div class="fw">${p.lbl}</div>
              <div class="mu sm-t">${p.price}</div>
            </div>`).join('')}
        </div>
        <button class="btn bgold wide" data-a="buy-premium">Оформить Premium ✦</button>`}
    </div>
  </div>`;
}

function buildAskModal(){
  const target=S.askModal.targetId?getUser(S.askModal.targetId):null;
  return`
  <div class="ov" data-modal="ask">
    <div class="mbox">
      <div class="row btw" style="margin-bottom:15px">
        <div><div class="ey">Новый вопрос</div><h2 style="font-size:19px;margin-top:4px">${target?`Спросить ${e(target.name)}`:'Задать вопрос себе'}</h2></div>
        <button class="bicon" data-a="close-ask">✕</button>
      </div>
      <textarea id="ask-text" placeholder="Твой вопрос или сообщение" style="min-height:90px">${e(S.askForm.text)}</textarea>
      <input id="ask-sign" placeholder="Подпись (необязательно)" value="${e(S.askForm.sign)}" style="margin-top:9px"/>
      <div class="frow" style="margin-top:11px">
        ${['soft','thoughtful','warm','fun'].map(m=>`<button class="chip${S.askForm.mood===m?' act':''} sm-t" data-a="pick-mood" data-mood="${m}" style="padding:7px 12px">${{soft:'Мягкий',thoughtful:'Задумчивый',warm:'Тёплый',fun:'Весёлый'}[m]}</button>`).join('')}
      </div>
      <button class="btn bp wide" style="margin-top:14px" data-a="submit-ask" data-tid="${target?target.id:''}">${target?'Отправить анонимно':'Добавить вопрос'}</button>
    </div>
  </div>`;
}

function buildGrowthPopup(){
  const g=S.growthPopup;
  return`
  <div class="ov" data-modal="growth">
    <div class="mbox pop" style="text-align:center;max-width:380px">
      <div style="font-size:52px;margin-bottom:10px">${g.emoji||'🎉'}</div>
      <h2 style="font-size:22px;margin-bottom:10px">${e(g.title)}</h2>
      <p class="mu sm-t" style="line-height:1.65;margin-bottom:18px">${e(g.desc)}</p>
      ${g.action?`<button class="btn bp wide" data-a="growth-action" data-gaction="${g.action}">${g.actionLabel||'Действовать'}</button>`:''}
      <button class="btn bg sm wide" style="margin-top:8px" data-a="close-growth">Позже</button>
    </div>
  </div>`;
}

/* ═══════════════════════════════════════════════════════════
   SYNC
═══════════════════════════════════════════════════════════ */
function syncComposer(){
  const ta=q('#answer-text');if(ta&&ta.value!==S.draft.text)ta.value=S.draft.text;
  const pq=q('#preview-q');if(pq)pq.textContent=curQText();
  const pa=q('#preview-a');if(pa)pa.textContent=S.draft.text||'Твой ответ появится здесь…';
  const cc=q('#char-count');if(cc)cc.textContent=`${S.draft.text.length} симв`;
}

function syncViews(){
  document.querySelectorAll('[data-answer-id]').forEach(el=>{
    const id=el.getAttribute('data-answer-id');
    if(id&&!S.viewedAnswers.has(id)){
      S.viewedAnswers.add(id);
      const a=DB.answers.find(a=>a.id===id);
      if(a)a.views=(a.views||0)+1;
    }
  });
}

/* ═══════════════════════════════════════════════════════════
   ACTIONS
═══════════════════════════════════════════════════════════ */
function setScreen(sc){
  S.prevScreen=S.screen;
  S.screen=sc;
  if(sc!=='profile')S.profileView=null;
  if(sc==='answer'&&!S.selectedQId)S.selectedQId=unanswered()[0]?.id||'';
  S.notifOpen=false;S.premiumOpen=false;S.askModal.open=false;
  render();
}

function closeOverlays(){S.notifOpen=false;S.premiumOpen=false;S.askModal.open=false;S.growthPopup=null;}

// VK Bridge actions
async function vkShareStory(text=''){
  toast('⏳ Открываем VK Stories…');
  try {
    await window.vkBridge.send('VKWebAppShowStoryBox',{
      background_type:'color',
      color:'#0b1426',
      attachment:{text:'Задать вопрос',type:'url',url:getMyLink()},
    });
    logEvent('share_story',{});
  } catch(err){toast('Ошибка: '+err.message);}
}

async function vkShareWall(){
  toast('⏳ Создаём пост…');
  try {
    await window.vkBridge.send('VKWebAppShowWallPostBox',{
      message:`🎭 Задай мне анонимный вопрос в Asko!\n${getMyLink()}`,
      attachments:getMyLink(),
    });
    logEvent('share_wall',{});
  } catch(err){toast('Ошибка: '+err.message);}
}

async function vkCopyText(text){
  try {
    await window.vkBridge.send('VKWebAppCopyText',{text});
    logEvent('copy_link',{});
  } catch {
    try{await navigator.clipboard.writeText(text);toast('✓ Скопировано');}catch{toast(text);}
  }
}

function getMyLink(){return _APP_LINK ? `${_APP_LINK}#profile/${me().handle}` : `https://vk.com/appYOUR_APP_ID#profile/${me().handle}`;}
function getRefLink(){return _APP_LINK ? `${_APP_LINK}?ref=${me().refCode}` : `https://vk.com/appYOUR_APP_ID?ref=${me().refCode}`;}

function publishAnswer(){
  const text=(q('#answer-text')?.value||S.draft.text||'').trim();
  if(!text)return toast('Напиши ответ');
  const ans={
    id:uid(),questionId:S.selectedQId||null,userId:ME,
    text,createdAt:now(),theme:S.draft.theme,
    likes:0,comments:0,views:0,bookmarked:false,likedBy:[],
  };
  DB.answers.push(ans);
  if(S.selectedQId){
    const qv=DB.questions.find(q=>q.id===S.selectedQId);
    if(qv)qv.answered=true;
  }
  DB.notifications.push({id:uid(),userId:ME,title:'Ответ опубликован ✓',desc:'Новая карточка появилась в профиле.',cta:'Профиль',target:{screen:'profile'},read:false,createdAt:now()});
  logEvent('answer_published',{answerId:ans.id});
  S.draft.text='';S.screen='profile';S.selectedQId=unanswered()[0]?.id||'';
  // Growth popup after first answer
  if(DB.answers.filter(a=>a.userId===ME).length===1){
    S.growthPopup={emoji:'🚀',title:'Первый ответ!',desc:'Поделись им с друзьями — они смогут задать тебе вопросы анонимно.',action:'share-invite',actionLabel:'📱 Поделиться в VK'};
  }
  render();toast('Ответ опубликован ✓');
}

function saveDraft(){
  const text=(q('#answer-text')?.value||S.draft.text||'').trim();
  if(!text)return toast('Черновик пустой');
  DB.drafts.push({id:uid(),questionId:S.selectedQId||null,userId:ME,text,updatedAt:now(),theme:S.draft.theme});
  render();toast('Черновик сохранён');
}

function loadDraft(id){
  const d=DB.drafts.find(x=>x.id===id);if(!d)return;
  S.selectedQId=d.questionId||'';S.draft.text=d.text||'';S.draft.theme=d.theme||'midnight';
  S.screen='answer';render();toast('Черновик загружен');
}

function archiveQ(id){
  const qv=DB.questions.find(q=>q.id===id);if(qv)qv.archived=true;
  S.selectedQId=unanswered()[0]?.id||'';render();toast('Вопрос скрыт');
}

function toggleFollow(uid_){
  if(isFollowing(ME,uid_)){
    DB.follows=DB.follows.filter(f=>!(f.fromUserId===ME&&f.toUserId===uid_));
    const u=getUser(uid_);if(u)u.followers=Math.max(0,u.followers-1);
    me().following=Math.max(0,me().following-1);
    toast('Подписка отменена');
  } else {
    DB.follows.push({id:uid(),fromUserId:ME,toUserId:uid_,createdAt:now()});
    const u=getUser(uid_);if(u)u.followers++;
    me().following++;
    logEvent('follow',{targetId:uid_});
    toast('Подписка оформлена ✓');
    // Growth popup on first follow
    if(DB.follows.filter(f=>f.fromUserId===ME).length===1){
      setTimeout(()=>{S.growthPopup={emoji:'👥',title:'Ты подписался!',desc:'Теперь ответы этого пользователя появятся в твоём фиде.',action:'go-feed',actionLabel:'◉ Открыть фид'};render();},500);
    }
  }
  render();
}

function likeAnswer(id){
  const a=DB.answers.find(a=>a.id===id);if(!a)return;
  if(a.likedBy.includes(ME)){
    a.likedBy=a.likedBy.filter(x=>x!==ME);a.likes=Math.max(0,a.likes-1);
  } else {
    a.likedBy.push(ME);a.likes++;
    logEvent('like',{answerId:id});
  }
  render();
}

function revealAuthor(qid){
  if(!me()?.premium){S.premiumOpen=true;render();return;}
  const qv=DB.questions.find(q=>q.id===qid);if(qv)qv.revealed=true;
  logEvent('reveal_author',{questionId:qid});
  render();toast('Автор раскрыт');
}

function buyPremium(){
  const user=me();user.premium=true;
  DB.notifications.push({id:uid(),userId:ME,title:'Premium активирован ✦',desc:'Теперь можно видеть авторов вопросов.',cta:'Входящие',target:{screen:'inbox'},read:false,createdAt:now()});
  logEvent('premium_purchased',{plan:S.premiumPlan});
  closeOverlays();render();
  toast('Premium активирован ✦');
  setTimeout(()=>{S.growthPopup={emoji:'✦',title:'Добро пожаловать в Premium!',desc:'Теперь ты можешь видеть, кто задаёт вопросы анонимно.',action:'go-inbox',actionLabel:'Посмотреть вопросы'};render();},600);
}

function submitAsk(targetId){
  const text=(q('#ask-text')?.value||S.askForm.text||'').trim();
  const sign=(q('#ask-sign')?.value||S.askForm.sign||'Аноним');
  if(!text)return toast('Напиши вопрос');
  const toId=targetId||ME;
  const newQ={
    id:uid(),toUserId:toId,text,mood:S.askForm.mood,
    createdAt:now(),archived:false,answered:false,important:false,
    senderHint:sign,senderUserId:ME,revealed:false,aiGenerated:false,
  };
  DB.questions.push(newQ);
  DB.notifications.push({id:uid(),userId:toId,title:'Новый анонимный вопрос',desc:text.slice(0,70),cta:'Открыть',target:{screen:'inbox'},read:false,createdAt:now()});
  logEvent('question_sent',{targetId:toId,questionId:newQ.id});
  S.askForm.text='';closeOverlays();
  if(!S.selectedQId&&toId===ME)S.selectedQId=newQ.id;
  render();toast('Вопрос отправлен ✓');
}

function seedAiQuestion(){
  const bank=[...AI_QUESTIONS].sort(()=>Math.random()-.5);
  const pick=bank[0];
  const newQ={
    id:uid(),toUserId:ME,...pick,
    createdAt:now(),archived:false,answered:false,important:false,
    senderHint:'AI Asko',senderUserId:null,revealed:false,aiGenerated:true,
  };
  DB.questions.push(newQ);
  S.selectedQId=newQ.id;S.screen='answer';
  logEvent('ai_question_used',{questionId:newQ.id});
  // rotate suggestions
  S.aiSuggestions=bank.slice(1);
  render();toast('✨ AI-вопрос добавлен!');
}

function applyRefCode(){
  const code=(q('#ref-code-input')?.value||S.refCodeInput||'').trim().toUpperCase();
  if(!code)return toast('Введи реферальный код');
  if(code===me().refCode)return toast('Нельзя использовать свой код');
  const referer=DB.users.find(u=>u.refCode===code);
  if(!referer)return toast('Код не найден');
  if(me().refBy)return toast('Ты уже использовал реферальный код');
  me().refBy=referer.id;
  referer.refCount++;
  DB.invites.push({id:uid(),fromUserId:referer.id,toHandle:`@${me().handle}`,code,status:'joined',joinedAt:now(),bonusAwarded:15});
  logEvent('ref_code_applied',{code,refererId:referer.id});
  S.growthPopup={emoji:'🎁',title:'+15 баллов!',desc:`Ты использовал реферальный код ${code}. ${referer.name} тоже получит +15 баллов!`,action:'go-referral',actionLabel:'Моя реферальная система'};
  render();toast(`✓ Код ${code} применён! +15 баллов`);
}

function challengeFriends(){
  logEvent('challenge_started',{});
  const msg=`🏆 Я бросаю тебе вызов в Asko! Кто ответит на больше вопросов? Задай мне анонимный вопрос: ${getMyLink()}`;
  vkCopyText(msg);
  toast('🏆 Текст вызова скопирован! Отправь другу.');
}

function viralQuestion(){
  // Post a provocative question for viral spread
  const viralQ=AI_QUESTIONS[Math.floor(Math.random()*AI_QUESTIONS.length)];
  logEvent('viral_question_trigger',{});
  vkShareWall();
  toast('🔥 Вирусный пост отправлен!');
}

/* ═══════════════════════════════════════════════════════════
   EVENT DISPATCH
═══════════════════════════════════════════════════════════ */
document.addEventListener('click', evt=>{
  const btn=evt.target.closest('[data-a]');
  if(!btn){
    const ov=evt.target.closest('.ov'),mb=evt.target.closest('.mbox');
    if(ov&&!mb){closeOverlays();render();}
    return;
  }
  const {a,screen,qid,uid:u,aid,sid,nid,tid,did,theme,align,size,filter,plan,tab,gaction,mood}=btn.dataset;
  try { dispatch(a||btn.dataset.a, {screen,qid,uid:u,aid,sid,nid,tid,did,theme,align,size,filter,plan,tab,gaction,mood,btn}); }
  catch(err){console.error(err);toast(err.message||'Ошибка');}
});

document.addEventListener('input', evt=>{
  const t=evt.target;
  if(t.id==='answer-text'){S.draft.text=t.value;syncComposer();return;}
  if(t.id==='discover-search'){S.searchQuery=t.value;render();return;}
  if(t.id==='ask-text')S.askForm.text=t.value;
  if(t.id==='ask-sign')S.askForm.sign=t.value;
  if(t.id==='ref-code-input')S.refCodeInput=t.value;
});

document.addEventListener('keydown', evt=>{
  if(evt.key==='Escape'&&(S.notifOpen||S.premiumOpen||S.askModal.open||S.growthPopup)){closeOverlays();render();}
});

function dispatch(action, p){
  if(action==='nav')return setScreen(p.screen);
  if(action==='go-home')return setScreen('home');
  if(action==='go-answer')return setScreen('answer');
  if(action==='go-inbox')return setScreen('inbox');
  if(action==='go-discover')return setScreen('discover');
  if(action==='go-feed')return setScreen('feed');
  if(action==='go-referral')return setScreen('referral');
  if(action==='go-profile')return setScreen('profile');

  // NAV helpers
  if(action==='open-user'){closeOverlays();S.profileView=p.uid;S.screen='profile';render();return;}
  if(action==='back-prev'){S.screen=S.prevScreen||'home';S.profileView=null;render();return;}
  if(action==='back-discover'){S.profileView=null;S.screen='discover';render();return;}

  // NOTIF
  if(action==='toggle-notif'){const n=!S.notifOpen;closeOverlays();S.notifOpen=n;render();return;}
  if(action==='close-notif'){S.notifOpen=false;render();return;}
  if(action==='mark-all-notif'){DB.notifications.filter(n=>n.userId===ME).forEach(n=>n.read=true);render();toast('Всё прочитано');return;}
  if(action==='open-notif'){
    const n=DB.notifications.find(x=>x.id===p.nid);if(!n)return;
    n.read=true;closeOverlays();
    if(n.target?.screen)setScreen(n.target.screen);
    else render();return;
  }

  // PREMIUM
  if(action==='open-premium'){closeOverlays();S.premiumOpen=true;logEvent('premium_view',{});render();return;}
  if(action==='close-premium'){S.premiumOpen=false;render();return;}
  if(action==='pick-plan'){S.premiumPlan=p.plan;render();return;}
  if(action==='buy-premium')return buyPremium();
  if(action==='cancel-premium'){me().premium=false;closeOverlays();render();toast('Premium отменён');return;}

  // ASK MODAL
  if(action==='open-ask-self'){closeOverlays();S.askModal={open:true,targetId:null};render();return;}
  if(action==='ask-user'||action==='open-ask-user'){closeOverlays();S.askModal={open:true,targetId:p.uid||p.tid};render();return;}
  if(action==='close-ask'){closeOverlays();render();return;}
  if(action==='pick-mood'){S.askForm.mood=p.mood;render();return;}
  if(action==='submit-ask')return submitAsk(p.tid||'');

  // GROWTH
  if(action==='close-growth'){S.growthPopup=null;render();return;}
  if(action==='growth-action'){
    const ga=p.gaction;S.growthPopup=null;
    if(ga==='share-invite')return vkShareStory();
    if(ga==='go-feed')return setScreen('feed');
    if(ga==='go-inbox')return setScreen('inbox');
    if(ga==='go-referral')return setScreen('referral');
    render();return;
  }

  // COMPOSER
  if(action==='start-answer'){S.selectedQId=p.qid;S.screen='answer';render();return;}
  if(action==='select-q'){S.selectedQId=p.qid;render();return;}
  if(action==='pick-theme'){S.draft.theme=p.theme;render();return;}
  if(action==='pick-align'){S.draft.align=p.align;render();return;}
  if(action==='pick-size'){S.draft.size=p.size;render();return;}
  if(action==='publish-answer')return publishAnswer();
  if(action==='save-draft')return saveDraft();
  if(action==='load-draft')return loadDraft(p.did);
  if(action==='download-story'){toast('PNG сохранён (заглушка — добавь canvas в продакшене)');logEvent('download_story',{});return;}
  if(action==='share-answer-vk')return vkShareStory();

  // INBOX
  if(action==='archive-q')return archiveQ(p.qid);
  if(action==='reveal-author')return revealAuthor(p.qid);
  if(action==='set-filter'){S.inboxFilter=p.filter;render();return;}
  if(action==='refresh-ai'){S.aiSuggestions=[];render();return;}
  if(action==='use-ai-q'){
    const idx=parseInt(p.qi||'0');
    const sug=getAISuggestions(10);
    const picked=sug[idx];
    if(!picked)return;
    const newQ={id:uid(),toUserId:ME,...picked,createdAt:now(),archived:false,answered:false,important:false,senderHint:'AI Asko',senderUserId:null,revealed:false,aiGenerated:true};
    DB.questions.push(newQ);
    S.selectedQId=newQ.id;S.screen='answer';
    logEvent('ai_question_used',{questionId:newQ.id});
    render();toast('✨ AI-вопрос добавлен в редактор');return;
  }

  // DISCOVER
  if(action==='do-search'){S.screen='discover';render();return;}
  if(action==='toggle-follow')return toggleFollow(p.uid);

  // FEED
  if(action==='like-answer')return likeAnswer(p.aid);

  // SHARE ACTIONS
  if(action==='share-invite')return vkShareStory();
  if(action==='share-wall')return vkShareWall();
  if(action==='share-link'||action==='copy-link')return vkCopyText(getMyLink());
  if(action==='copy-ref-link')return vkCopyText(getRefLink());
  if(action==='share-ref-vk')return vkShareStory();
  if(action==='share-ref-wall')return vkShareWall();
  if(action==='open-app'){window.open(getMyLink(),'_blank');return;}

  // REFERRAL
  if(action==='apply-ref-code')return applyRefCode();
  if(action==='go-referal'||action==='go-referral')return setScreen('referral');

  // AI
  if(action==='seed-ai')return seedAiQuestion();

  // VIRAL GROWTH
  if(action==='challenge-friends')return challengeFriends();
  if(action==='viral-question')return viralQuestion();

  // STORIES
  if(action==='open-story'){
    const st_id=p.sid;
    if(st_id==='self'){setScreen('profile');return;}
    if(st_id==='best'){setScreen('feed');return;}
    const u_=getUser(st_id);
    if(u_){S.profileView=st_id;setScreen('profile');}
    return;
  }

  // PROFILE
  if(action==='share-invite')return vkShareStory();

  // ADMIN
  if(action==='admin-tab'){S.adminTab=p.tab;render();return;}
  if(action==='admin-add-question'){
    const bank=AI_QUESTIONS;
    const pick=bank[Math.floor(Math.random()*bank.length)];
    DB.questions.push({id:uid(),toUserId:ME,...pick,createdAt:now(),archived:false,answered:false,important:false,senderHint:'Аноним (тест)',senderUserId:DB.users.filter(u=>u.id!==ME)[Math.floor(Math.random()*5)].id,revealed:false,aiGenerated:true});
    render();toast('+ Вопрос добавлен');return;
  }
  if(action==='admin-add-user'){
    const names=['Дмитрий К.','Соня Р.','Павел Л.','Анна М.','Артём В.'];
    const n=names[Math.floor(Math.random()*names.length)];
    const accents=['violet','blue','mint','pink','cyan','orange'];
    const ac=accents[Math.floor(Math.random()*accents.length)];
    DB.users.push({id:uid(),name:n,handle:n.replace(' ','_').toLowerCase()+Math.floor(Math.random()*99),bio:'Новый пользователь',avatar:n.split(' ').map(x=>x[0]).join('').toUpperCase(),accent:ac,followers:0,following:0,streakDays:0,premium:false,refCode:'CODE'+Math.floor(Math.random()*9999),refBy:null,refCount:0,totalEarned:0,joinedAt:now()});
    render();toast('+ Пользователь добавлен');return;
  }
  if(action==='admin-toggle-premium'){me().premium=!me().premium;render();toast(`Premium: ${me().premium?'включён':'выключен'}`);return;}
  if(action==='admin-reset'){
    toast('Данные сброшены — обнови страницу');return;
  }

  // ONBOARDING STEPS
  if(action==='share-invite')return vkShareStory();
  if(action==='go-discover')return setScreen('discover');
}

/* ═══════════════════════════════════════════════════════════
   BOOT
═══════════════════════════════════════════════════════════ */
async function boot(){
  // Simulate VK Bridge init
  await vkBridge.send('VKWebAppInit').catch(()=>{});

  // Deep link: ref code
  if(urlRef){
    const referer=DB.users.find(u=>u.refCode===urlRef.toUpperCase());
    if(referer&&!me().refBy){
      S.growthPopup={
        emoji:'🎁',
        title:'Реферальная ссылка!',
        desc:`Ты перешёл по ссылке ${referer.name}. Зарегистрируйся и получи +15 баллов!`,
        action:'go-referral',
        actionLabel:'Применить код',
      };
    }
  }

  // Deep link: profile
  const hash=location.hash;
  if(hash.startsWith('#profile/')){
    const handle=hash.split('/')[1];
    const u=DB.users.find(u=>u.handle===handle);
    if(u){S.profileView=u.id;S.screen='profile';}
  }
  if(hash==='#ask'){S.askModal={open:true,targetId:null};}

  render();
}

boot();