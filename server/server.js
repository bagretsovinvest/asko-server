
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const https = require('https');

const PORT = Number(process.env.PORT || 3000);
const CLIENT_DIST = path.join(__dirname, '..', 'client', 'dist');
const DATA_FILE = path.join(__dirname, 'data.json');
const API_PREFIX = '/api';
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '*').split(',').map((s) => s.trim()).filter(Boolean);
const VK_BOT_TOKEN = process.env.VK_BOT_TOKEN || '';
const VK_USER_ID = process.env.VK_USER_ID || '';
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '';

function nowIso() { return new Date().toISOString(); }
function addDays(days) { return new Date(Date.now() + days * 24 * 3600 * 1000).toISOString(); }
function randomFrom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function viewerIdFrom(req, body) { return (body && body.viewerId) || req.headers['x-viewer-id'] || 'anonymous-viewer'; }
function requestJson(target) {
  return new Promise((resolve, reject) => {
    const req = https.get(target, (res) => {
      let raw = '';
      res.on('data', (c) => raw += c);
      res.on('end', () => { try { resolve(raw ? JSON.parse(raw) : {}); } catch (e) { reject(e); } });
    });
    req.on('error', reject);
  });
}
async function sendQuestionNotifications(data, question) {
  const text = `📩 Новый вопрос в Asko\n\n${question.text}\n\nОткрыть: ${data.user.profileLink}`;
  const tasks = [];
  if (VK_BOT_TOKEN && VK_USER_ID) {
    const apiUrl = new URL('https://api.vk.com/method/messages.send');
    apiUrl.searchParams.set('user_id', VK_USER_ID);
    apiUrl.searchParams.set('random_id', String(Date.now()));
    apiUrl.searchParams.set('message', text);
    apiUrl.searchParams.set('access_token', VK_BOT_TOKEN);
    apiUrl.searchParams.set('v', '5.199');
    tasks.push(requestJson(apiUrl.toString()).catch(() => null));
  }
  if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
    const tgUrl = new URL(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`);
    tgUrl.searchParams.set('chat_id', TELEGRAM_CHAT_ID);
    tgUrl.searchParams.set('text', text);
    tasks.push(requestJson(tgUrl.toString()).catch(() => null));
  }
  if (tasks.length) await Promise.allSettled(tasks);
}

function createSeedData() {
  const now = Date.now();
  const h = 3600 * 1000;
  const d = 24 * h;
  const discoverUsers = [
    { id: 'p1', name: 'Мария Лебедева', handle: 'maria.leb', avatar: 'МЛ', note: 'Отвечает с юмором', followers: 912, following: 54, followed: false, accent: 'blue' },
    { id: 'p2', name: 'Лев Орлов', handle: 'lev.orlov', avatar: 'ЛО', note: 'Любит честные вопросы', followers: 604, following: 18, followed: true, accent: 'mint' },
    { id: 'p3', name: 'Ника Белая', handle: 'nikawhite', avatar: 'НБ', note: 'Короткие ответы и сторис', followers: 1230, following: 71, followed: false, accent: 'pink' },
    { id: 'p4', name: 'Роман Савин', handle: 'rom.savin', avatar: 'РС', note: 'Музыка, учёба, друзья', followers: 342, following: 66, followed: false, accent: 'cyan' },
    { id: 'p5', name: 'Ева Миронова', handle: 'evamira', avatar: 'ЕМ', note: 'Тёплый профиль', followers: 788, following: 40, followed: true, accent: 'violet' },
    { id: 'p6', name: 'Илья Титов', handle: 'ilyatitov', avatar: 'ИТ', note: 'Очень активен вечером', followers: 421, following: 29, followed: false, accent: 'orange' }
  ];
  const senderProfiles = {
    q1: { id: 'p5', name: 'Ева Миронова', handle: 'evamira', avatar: 'ЕМ', relation: 'Подписка' },
    q2: { id: 'p3', name: 'Ника Белая', handle: 'nikawhite', avatar: 'НБ', relation: 'Из круга общения' },
    q3: { id: 'p2', name: 'Лев Орлов', handle: 'lev.orlov', avatar: 'ЛО', relation: 'Подписка' },
    q4: { id: 'p4', name: 'Роман Савин', handle: 'rom.savin', avatar: 'РС', relation: 'Недавно рядом' }
  };
  return {
    user: {
      id: 'u1',
      name: 'Твой профиль',
      handle: 'asko.me',
      bio: 'Здесь мне можно задать вопрос анонимно, а я отвечу красиво и по делу.',
      avatar: 'A',
      streakDays: 6,
      followers: 148,
      following: 37,
      profileLink: 'https://vk.com/appYOUR_APP_ID#profile/asko.me',
      tagline: 'Задай мне вопрос анонимно',
      avatarIcon: 'asko',
    },
    premium: {
      active: false,
      plan: 'monthly',
      expiresAt: null,
      priceMonth: '149 ₽/мес',
      priceYear: '990 ₽/год',
      features: [
        'Показывает, кто отправил анонимный вопрос',
        'Можно раскрывать автора прямо в карточке вопроса',
        'Дает расширенный доступ к деталям вопросов'
      ]
    },
    stories: [
      { id: 's1', title: 'Для тебя', avatar: 'A', color: 'violet', type: 'self', subtitle: 'Твоя страница' },
      { id: 's2', title: 'Огонёк', avatar: '🔥', color: 'orange', type: 'best', subtitle: 'Лучшие ответы' },
      { id: 's3', title: 'Мария', avatar: 'МА', color: 'blue', type: 'user', subtitle: 'Подписка', userId: 'p1' },
      { id: 's4', title: 'Лев', avatar: 'ЛЕ', color: 'mint', type: 'user', subtitle: 'Новый ответ', userId: 'p2' },
      { id: 's5', title: 'Ника', avatar: 'НИ', color: 'pink', type: 'user', subtitle: 'Популярно', userId: 'p3' },
      { id: 's6', title: 'Рома', avatar: 'РО', color: 'cyan', type: 'user', subtitle: 'Рядом', userId: 'p4' }
    ],
    discoverUsers,
    questions: [
      { id: 'q1', text: 'Что тебя сейчас правда радует каждый день?', mood: 'soft', createdAt: new Date(now - 2 * h).toISOString(), archived: false, answered: false, important: true, senderHint: 'Аноним', senderProfile: senderProfiles.q1, revealed: false },
      { id: 'q2', text: 'Какой совет ты дашь себе в начале года?', mood: 'thoughtful', createdAt: new Date(now - 7 * h).toISOString(), archived: false, answered: false, important: false, senderHint: 'Аноним', senderProfile: senderProfiles.q2, revealed: false },
      { id: 'q3', text: 'С кем тебе проще всего быть собой?', mood: 'warm', createdAt: new Date(now - 20 * h).toISOString(), archived: false, answered: false, important: false, senderHint: 'Подписчик', senderProfile: senderProfiles.q3, revealed: false },
      { id: 'q4', text: 'Какой фильм ты пересматриваешь без усталости?', mood: 'fun', createdAt: new Date(now - 2 * d).toISOString(), archived: false, answered: true, important: false, senderHint: 'Аноним', senderProfile: senderProfiles.q4, revealed: false }
    ],
    answers: [
      { id: 'a1', questionId: 'q4', text: 'Каждый раз возвращаюсь к фильмам, где после просмотра становится легче внутри.', createdAt: new Date(now - 34 * h).toISOString(), publishedAt: new Date(now - 34 * h).toISOString(), theme: 'sunset', likes: 46, comments: 8, views: 318, bookmarked: true, likedBy: [], viewedBy: ['seed-view'] },
      { id: 'a2', questionId: null, text: 'Мне нравится атмосфера, где можно отвечать честно и без напряжения.', createdAt: new Date(now - 4 * d).toISOString(), publishedAt: new Date(now - 4 * d).toISOString(), theme: 'violet', likes: 63, comments: 14, views: 511, bookmarked: false, likedBy: [], viewedBy: ['seed-view'] }
    ],
    drafts: [
      { id: 'd1', questionId: 'q2', text: 'Не пытаться успеть всё сразу. Лучше меньше, но по-настоящему.', updatedAt: new Date(now - 3 * h).toISOString(), theme: 'midnight' }
    ],
    notifications: [
      { id: 'n1', title: 'У тебя 3 вопроса без ответа', description: 'Лучше закрыть входящие сейчас, пока люди ждут.', cta: 'Открыть вопросы', target: { screen: 'inbox', filter: 'new' }, createdAt: new Date(now - 50 * 60 * 1000).toISOString(), read: false },
      { id: 'n2', title: 'Серия активности продолжается', description: 'Ответь ещё на один вопрос сегодня, чтобы не потерять серию.', cta: 'Ответить', target: { screen: 'answer' }, createdAt: new Date(now - 3 * h).toISOString(), read: false },
      { id: 'n3', title: 'Премиум откроет авторов вопросов', description: 'С Premium можно увидеть, кто именно писал тебе анонимно.', cta: 'Попробовать', target: { action: 'premium' }, createdAt: new Date(now - 5 * h).toISOString(), read: false }
    ],
    settings: { reminderHour: 19, remindersEnabled: true, theme: 'dark', vkReady: true },
    createdAt: nowIso(),
    updatedAt: nowIso(),
    lastCheckInAt: new Date(now - 18 * h).toISOString(),
  };
}

function ensureData() { if (!fs.existsSync(DATA_FILE)) writeJson(DATA_FILE, createSeedData()); }
function readJson(file) { return JSON.parse(fs.readFileSync(file, 'utf8')); }
function writeJson(file, data) { fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8'); }
function touchUpdate(data) { data.updatedAt = nowIso(); writeJson(DATA_FILE, data); }

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
      if (data.length > 1e6) { req.destroy(); reject(new Error('Payload too large')); }
    });
    req.on('end', () => { if (!data) return resolve({}); try { resolve(JSON.parse(data)); } catch { reject(new Error('Invalid JSON')); } });
    req.on('error', reject);
  });
}
function sendJson(res, status, payload, origin='*') {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  });
  res.end(JSON.stringify(payload));
}
function sendText(res, status, text) { res.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' }); res.end(text); }
function getAllowedOrigin(req) { const origin = req.headers.origin; if (ALLOWED_ORIGINS.includes('*')) return '*'; if (origin && ALLOWED_ORIGINS.includes(origin)) return origin; return ALLOWED_ORIGINS[0] || '*'; }
function notFound(res) { return sendJson(res, 404, { ok: false, error: 'Not found' }); }
function matchRoute(pathname, pattern) {
  const pathParts = pathname.split('/').filter(Boolean); const patternParts = pattern.split('/').filter(Boolean);
  if (pathParts.length !== patternParts.length) return null;
  const params = {};
  for (let i=0;i<patternParts.length;i++) {
    const part = patternParts[i];
    if (part.startsWith(':')) params[part.slice(1)] = pathParts[i];
    else if (part !== pathParts[i]) return null;
  }
  return params;
}

function calcStats(data) {
  return {
    newQuestions: data.questions.filter((q) => !q.archived && !q.answered).length,
    totalQuestions: data.questions.length,
    publishedAnswers: data.answers.length,
    totalViews: data.answers.reduce((s, a) => s + (a.views || 0), 0),
    totalLikes: data.answers.reduce((s, a) => s + (a.likes || 0), 0),
    followers: data.user.followers || 0,
    following: data.user.following || 0,
    streakDays: data.user.streakDays || 0,
  };
}

function serializeBootstrap(data) {
  return {
    user: data.user,
    settings: data.settings,
    premium: data.premium,
    stats: calcStats(data),
    stories: data.stories,
    discoverUsers: data.discoverUsers,
    reminders: data.notifications.filter((n) => !n.read),
    notifications: data.notifications.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)),
    inbox: data.questions.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)),
    answers: data.answers.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)),
    drafts: data.drafts.sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt)),
    share: { profileLink: data.user.profileLink, shareText: 'Задай мне анонимный вопрос в Asko' }
  };
}

async function handleApi(req, res, pathname, query) {
  ensureData();
  const origin = getAllowedOrigin(req);
  if (req.method === 'OPTIONS') return sendJson(res, 200, { ok: true }, origin);
  const data = readJson(DATA_FILE);

  if (req.method === 'GET' && pathname === `${API_PREFIX}/health`) return sendJson(res, 200, { ok: true, time: nowIso() }, origin);
  if (req.method === 'GET' && pathname === `${API_PREFIX}/bootstrap`) return sendJson(res, 200, { ok: true, data: serializeBootstrap(data) }, origin);

  if (req.method === 'POST' && pathname === `${API_PREFIX}/checkin`) {
    data.user.streakDays = Math.max(1, Number(data.user.streakDays || 0) + 1);
    data.lastCheckInAt = nowIso();
    data.notifications.unshift({ id: `n${Date.now()}`, title: 'Ты снова здесь', description: 'Хороший момент ответить на один из новых вопросов.', cta: 'Ответить', target: { screen: 'answer' }, createdAt: nowIso(), read: false });
    touchUpdate(data);
    return sendJson(res, 200, { ok: true, data: serializeBootstrap(data) }, origin);
  }

  if (req.method === 'POST' && pathname === `${API_PREFIX}/notifications/read`) {
    data.notifications = (data.notifications || []).map((n) => ({ ...n, read: true }));
    touchUpdate(data);
    return sendJson(res, 200, { ok: true, data: serializeBootstrap(data) }, origin);
  }

  if (req.method === 'GET' && pathname === `${API_PREFIX}/users`) {
    const q = String(query.q || '').trim().toLowerCase();
    const items = (data.discoverUsers || []).filter((u) => !q || u.name.toLowerCase().includes(q) || u.handle.toLowerCase().includes(q));
    return sendJson(res, 200, { ok: true, items }, origin);
  }

  const followMatch = matchRoute(pathname, `${API_PREFIX}/follow/:id`);
  if (req.method === 'POST' && followMatch) {
    const user = (data.discoverUsers || []).find((u) => u.id === followMatch.id);
    if (!user) return notFound(res);
    user.followed = !user.followed;
    user.followers += user.followed ? 1 : -1;
    data.user.following = Math.max(0, Number(data.user.following || 0) + (user.followed ? 1 : -1));
    touchUpdate(data);
    return sendJson(res, 200, { ok: true, data: serializeBootstrap(data), user }, origin);
  }

  if (req.method === 'POST' && pathname === `${API_PREFIX}/premium/toggle`) {
    const body = await readBody(req);
    data.premium.active = Boolean(body.active);
    data.premium.plan = body.plan === 'yearly' ? 'yearly' : 'monthly';
    data.premium.expiresAt = data.premium.active ? addDays(data.premium.plan === 'yearly' ? 365 : 30) : null;
    data.notifications.unshift({ id: `n${Date.now()}`, title: data.premium.active ? 'Premium включён' : 'Premium выключен', description: data.premium.active ? 'Теперь можно смотреть авторов вопросов.' : 'Премиум отключён.', cta: 'Открыть входящие', target: { screen: 'inbox', filter: 'revealed' }, createdAt: nowIso(), read: false });
    touchUpdate(data);
    return sendJson(res, 200, { ok: true, data: serializeBootstrap(data), premium: data.premium }, origin);
  }

  if (req.method === 'POST' && pathname === `${API_PREFIX}/premium/checkout`) {
    const body = await readBody(req);
    data.premium.active = true;
    data.premium.plan = body.plan === 'yearly' ? 'yearly' : 'monthly';
    data.premium.expiresAt = addDays(data.premium.plan === 'yearly' ? 365 : 30);
    data.notifications.unshift({ id: `n${Date.now()}`, title: 'Premium активирован', description: 'Теперь можно видеть авторов анонимных вопросов.', cta: 'Открыть входящие', target: { screen: 'inbox', filter: 'revealed' }, createdAt: nowIso(), read: false });
    touchUpdate(data);
    return sendJson(res, 200, { ok: true, data: serializeBootstrap(data), premium: data.premium }, origin);
  }

  const revealMatch = matchRoute(pathname, `${API_PREFIX}/questions/:id/reveal`);
  if (req.method === 'POST' && revealMatch) {
    const question = (data.questions || []).find((q) => q.id === revealMatch.id);
    if (!question) return notFound(res);
    if (!data.premium?.active) return sendJson(res, 403, { ok: false, error: 'Функция доступна только в Premium' }, origin);
    question.revealed = true;
    touchUpdate(data);
    return sendJson(res, 200, { ok: true, data: serializeBootstrap(data), senderProfile: question.senderProfile }, origin);
  }

  if (req.method === 'POST' && pathname === `${API_PREFIX}/questions`) {
    const body = await readBody(req);
    const text = String(body.text || '').trim();
    if (!text) return sendJson(res, 400, { ok: false, error: 'Напиши вопрос или сообщение' }, origin);
    const senderProfile = randomFrom(data.discoverUsers || []);
    const question = {
      id: `q${Date.now()}`,
      text,
      mood: body.mood || 'soft',
      createdAt: nowIso(),
      archived: false,
      answered: false,
      important: Boolean(body.important),
      senderHint: body.senderHint || 'Аноним',
      senderProfile: senderProfile ? { id: senderProfile.id, name: senderProfile.name, handle: senderProfile.handle, avatar: senderProfile.avatar, relation: senderProfile.followed ? 'Подписка' : 'Из круга общения' } : null,
      revealed: false
    };
    data.questions.unshift(question);
    data.notifications.unshift({ id: `n${Date.now()}`, title: 'Новый вопрос в профиле', description: text.slice(0, 80), cta: 'Открыть вопросы', target: { screen: 'inbox', questionId: question.id }, createdAt: nowIso(), read: false });
    touchUpdate(data);
    sendQuestionNotifications(data, question).catch(() => null);
    return sendJson(res, 200, { ok: true, data: serializeBootstrap(data), question }, origin);
  }

  const publicQuestionMatch = matchRoute(pathname, `${API_PREFIX}/users/:id/questions`);
  if (req.method === 'POST' && publicQuestionMatch) {
    const body = await readBody(req);
    const text = String(body.text || '').trim();
    if (!text) return sendJson(res, 400, { ok: false, error: 'Напиши вопрос' }, origin);
    const user = (data.discoverUsers || []).find((u) => u.id === publicQuestionMatch.id);
    if (!user) return notFound(res);
    return sendJson(res, 200, { ok: true, message: `Вопрос для ${user.name} отправлен` }, origin);
  }

  const archiveMatch = matchRoute(pathname, `${API_PREFIX}/questions/:id/archive`);
  if (req.method === 'POST' && archiveMatch) {
    const question = (data.questions || []).find((q) => q.id === archiveMatch.id);
    if (!question) return notFound(res);
    question.archived = true;
    touchUpdate(data);
    return sendJson(res, 200, { ok: true, data: serializeBootstrap(data) }, origin);
  }

  if (req.method === 'POST' && pathname === `${API_PREFIX}/answers`) {
    const body = await readBody(req);
    const text = String(body.text || '').trim();
    if (!text) return sendJson(res, 400, { ok: false, error: 'Напиши ответ' }, origin);
    const answer = {
      id: `a${Date.now()}`,
      questionId: body.questionId || null,
      text,
      createdAt: nowIso(),
      publishedAt: nowIso(),
      theme: body.theme || 'midnight',
      likes: 0,
      comments: 0,
      views: 0,
      bookmarked: false,
      likedBy: [],
      viewedBy: [],
    };
    data.answers.unshift(answer);
    if (body.questionId) {
      const question = (data.questions || []).find((q) => q.id === body.questionId);
      if (question) question.answered = true;
    }
    data.notifications.unshift({ id: `n${Date.now()}`, title: 'Ответ опубликован', description: 'Новая карточка уже появилась в профиле.', cta: 'Открыть профиль', target: { screen: 'profile' }, createdAt: nowIso(), read: false });
    touchUpdate(data);
    return sendJson(res, 200, { ok: true, data: serializeBootstrap(data), answer }, origin);
  }

  if (req.method === 'POST' && pathname === `${API_PREFIX}/drafts`) {
    const body = await readBody(req);
    const text = String(body.text || '').trim();
    if (!text) return sendJson(res, 400, { ok: false, error: 'Черновик пустой' }, origin);
    data.drafts.unshift({ id: `d${Date.now()}`, questionId: body.questionId || null, text, updatedAt: nowIso(), theme: body.theme || 'midnight' });
    touchUpdate(data);
    return sendJson(res, 200, { ok: true, data: serializeBootstrap(data) }, origin);
  }

  const reactMatch = matchRoute(pathname, `${API_PREFIX}/answers/:id/react`);
  if (req.method === 'POST' && reactMatch) {
    const answer = (data.answers || []).find((a) => a.id === reactMatch.id);
    if (!answer) return notFound(res);
    const body = await readBody(req);
    const viewerId = viewerIdFrom(req, body);
    answer.likedBy = Array.isArray(answer.likedBy) ? answer.likedBy : [];
    if (answer.likedBy.includes(viewerId)) {
      answer.likedBy = answer.likedBy.filter((id) => id !== viewerId);
      answer.likes = Math.max(0, Number(answer.likes || 0) - 1);
    } else {
      answer.likedBy.push(viewerId);
      answer.likes = Number(answer.likes || 0) + 1;
    }
    touchUpdate(data);
    return sendJson(res, 200, { ok: true, data: serializeBootstrap(data), liked: answer.likedBy.includes(viewerId) }, origin);
  }

  const viewMatch = matchRoute(pathname, `${API_PREFIX}/answers/:id/view`);
  if (req.method === 'POST' && viewMatch) {
    const answer = (data.answers || []).find((a) => a.id === viewMatch.id);
    if (!answer) return notFound(res);
    const body = await readBody(req);
    const viewerId = viewerIdFrom(req, body);
    answer.viewedBy = Array.isArray(answer.viewedBy) ? answer.viewedBy : [];
    if (!answer.viewedBy.includes(viewerId)) {
      answer.viewedBy.push(viewerId);
      answer.views = Number(answer.views || 0) + 1;
      touchUpdate(data);
    }
    return sendJson(res, 200, { ok: true, data: serializeBootstrap(data) }, origin);
  }

  const aiMatch = pathname === `${API_PREFIX}/questions/ideas`;
  if (req.method === 'POST' && aiMatch) {
    const ideas = [
      'Что тебе хочется изменить в своей жизни этой весной?',
      'Какой совет ты дашь себе год назад?',
      'Что в тебе ценят друзья больше всего?',
      'Когда ты чувствуешь себя по-настоящему спокойно?',
      'Какой момент ты хочешь пережить еще раз?'
    ];
    const senderProfile = randomFrom(data.discoverUsers || []);
    const question = {
      id: `q${Date.now()}`,
      text: randomFrom(ideas),
      mood: 'soft',
      createdAt: nowIso(),
      archived: false,
      answered: false,
      important: false,
      senderHint: 'Подсказка Asko',
      senderProfile: senderProfile ? { id: senderProfile.id, name: senderProfile.name, handle: senderProfile.handle, avatar: senderProfile.avatar, relation: 'Подсказка' } : null,
      revealed: false
    };
    data.questions.unshift(question);
    data.notifications.unshift({ id: `n${Date.now()}`, title: 'Новая идея для ответа', description: question.text, cta: 'Открыть редактор', target: { screen: 'answer', questionId: question.id }, createdAt: nowIso(), read: false });
    touchUpdate(data);
    return sendJson(res, 200, { ok: true, data: serializeBootstrap(data), question }, origin);
  }

  return notFound(res);
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
};
function serveStatic(req, res, pathname) {
  let filePath = path.join(CLIENT_DIST, pathname === '/' ? 'index.html' : pathname);
  if (!filePath.startsWith(CLIENT_DIST)) return sendText(res, 403, 'Forbidden');
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) filePath = path.join(filePath, 'index.html');
  if (!fs.existsSync(filePath)) filePath = path.join(CLIENT_DIST, 'index.html');
  try { const ext = path.extname(filePath).toLowerCase(); const type = MIME_TYPES[ext] || 'application/octet-stream'; res.writeHead(200, { 'Content-Type': type }); fs.createReadStream(filePath).pipe(res); }
  catch { sendText(res, 500, 'Server error'); }
}

const server = http.createServer(async (req, res) => {
  const parsed = url.parse(req.url, true); const pathname = decodeURIComponent(parsed.pathname || '/');
  try { if (pathname.startsWith(API_PREFIX)) return await handleApi(req, res, pathname, parsed.query || {}); return serveStatic(req, res, pathname); }
  catch (error) { console.error(error); return sendJson(res, 500, { ok: false, error: 'Internal server error' }); }
});

server.listen(PORT, () => { ensureData(); console.log(`Asko v14 running on http://localhost:${PORT}`); });
