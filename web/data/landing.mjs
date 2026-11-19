const docs = (name) => `/docs/commands/group/${name}/`;
const single = (name) => `/docs/commands/single/${name}/`;
const file = (name) => ({ light: `/landing/previews/${name}-light.png`, dark: `/landing/previews/${name}-dark.png` });

const both = (src) => ({ light: src, dark: src });
// chữ hai ngôn ngữ: L(tiếng Việt, tiếng Anh), localize() đổi cả cây dữ liệu sang một ngôn ngữ
const L = (vi, en) => ({ vi, en });
// ảnh preview có bản tiếng Anh (-en) trừ nối từ và quote (scripts/previews/render.mjs)
const shot = (name) => (/^(wordconnect|quote)$/.test(name) ? file(name) : L(file(name), file(`${name}-en`)));
export const localize = (value, locale) => {
  if (Array.isArray(value)) return value.map((item) => localize(item, locale));
  if (value && typeof value === 'object') {
    const keys = Object.keys(value);
    if (keys.length === 2 && 'vi' in value && 'en' in value) return value[locale];
    return Object.fromEntries(keys.map((key) => [key, localize(value[key], locale)]));
  }
  return value;
};

// mỗi cảnh 2 hoặc 3 tính năng, bố cục riêng trong khung hero (tỉ lệ 100:92): x, w theo % bề rộng, y theo % chiều cao,
// ảnh giữ nguyên không cắt. label.flow 'up' đặt mũi tên phía trên chữ, aim xoay riêng mũi tên
export const HERO_SCENES = [
  [
    { shot: shot('autoresponder'), text: 'Autoresponder', place: { x: 0, y: 8, w: 60, tilt: -1.5 }, label: { x: 7, y: 54, arrow: 'right', flow: 'up', aim: -62, tilt: -6 } },
    { shot: shot('ticket'), text: 'Ticket', place: { x: 37, y: 51, w: 58, tilt: 2 }, label: { x: 24, y: 76, arrow: 'right', tilt: -5 } },
    { shot: shot('ticket-form'), text: 'Form ticket', place: { x: 67, y: 0, w: 31, tilt: 3 }, label: { x: 71, y: 38, arrow: 'left', flow: 'up', aim: 62, tilt: 5 } },
  ],
  [
    { shot: shot('giveaway'), text: 'Giveaway', place: { x: 0, y: 1, w: 58, tilt: -1.5 }, label: { x: 6, y: 50, arrow: 'right', flow: 'up', aim: -62, tilt: -6 } },
    { shot: shot('voting'), text: 'Voting', place: { x: 38, y: 47, w: 60, tilt: 2 }, label: { x: 22, y: 71, arrow: 'right', tilt: -4 } },
    { shot: shot('donation'), text: 'Donation', place: { x: 61, y: 5, w: 37, tilt: 2.5 }, label: { x: 70, y: 29, arrow: 'left', flow: 'up', aim: 62, tilt: 6 } },
  ],
  [
    { shot: shot('wordconnect'), text: L('Nối từ', 'Word chain'), place: { x: 2, y: 0, w: 44, tilt: -2 }, label: { x: 5, y: 66, arrow: 'right', flow: 'up', aim: -62, tilt: -6 } },
    { shot: shot('tempvoice'), text: 'Temp voice', place: { x: 40, y: 50, w: 58, tilt: 1.5 }, label: { x: 66, y: 39, arrow: 'left', tilt: -4 } },
    { shot: shot('customrole'), text: 'Custom role', place: { x: 60, y: 9, w: 37, tilt: 2.5 }, label: { x: 49, y: 0, arrow: 'right', tilt: -6 } },
  ],
];

const LAYOUT_SERVERS = ["𝗭𝗬𝗡𝗙𝗘𝗜’𝗦 𝗟𝗜𝗧𝗧𝗟𝗘 𝗪𝗢𝗥𝗟𝗗", "Sprinkle & Sparkle", "DriftLight", "Sprinkle & Sparkle", "☘️┊「 𝒋𝒖𝒔𝒕𝒂𝒔𝒆𝒆𝒅.ᐟ」", "WarmCorner", "☘️┊「 𝒋𝒖𝒔𝒕𝒂𝒔𝒆𝒆𝒅.ᐟ」", "𝗭𝗬𝗡𝗙𝗘𝗜’𝗦 𝗟𝗜𝗧𝗧𝗟𝗘 𝗪𝗢𝗥𝗟𝗗"];
export const LAYOUTS = LAYOUT_SERVERS.map((server, i) => ({ shot: shot(`layout-${i + 1}`), text: L(`Layout của ${server}`, `${server}'s layout`) }));

export const DASHBOARD_SHOTS = [
  [3, L('Dashboard: sửa autoresponder, xem trước layout', 'Dashboard: editing an autoresponder with a layout preview')],
  [2, L('Dashboard: cài đặt panel ticket', 'Dashboard: ticket panel settings')],
  [4, L('Dashboard: Profile và Whitelabel của bot', "Dashboard: the bot's Profile and Whitelabel")],
  [1, L('Dashboard: tổng quan server và lịch sử thay đổi', 'Dashboard: server overview and change history')],
].map(([n, text]) => ({ shot: both(`/landing/dashboard-${n}.webp`), text }));

export const MAIN_FEATURES = [
  {
    id: 'autoresponder',
    label: 'Autoresponder',
    head: L('Autoresponder\nở mọi tư thế.', 'Message construction,\nreimagined.'),
    body: L(
      'Khi giới hạn của bot nằm ở sự sáng tạo của bạn. Tin nhắn, embed, nút bấm, form, layout Components V2, ... Muốn message theo cách nào, cách đó có ở Autoresponder & BucketScript, placeholder với function đầy đủ.',
      "When the only limit is your creativity. Messages, embeds, buttons, forms, Components V2 layouts... however you want the bot to reply, Autoresponder & BucketScript can do it, with a full set of placeholders and functions.",
    ),
    facts: [L('Embed, nút bấm, form và layout Components V2', "Embeds, buttons, forms and Components V2 layouts"), L('BucketScript: placeholder, function, button, select', "BucketScript: placeholders, functions, buttons, selects"), L('Gửi reply sang kênh khác, thêm hoặc gỡ role', "Reply in another channel, add or remove roles")],
    shots: [shot('autoresponder')],
    cycle: LAYOUTS,
    links: [['Autoresponder', docs('autoresponder')], ['BucketScript', '/docs/bucketscript/functions/']],
  },
  {
    id: 'ticket',
    label: 'Ticket',
    head: L('Hoặc cần cả ticket?', 'Need tickets too?'),
    body: L(
      'Nhớ cái lúc bọn member mở ticket xong im mẹ nó luôn không? Tại nemuri, support giữa Member và Server Admin hiện đã trở nên dễ dàng hơn rất nhiều: Câu hỏi mở đầu ticket, chia ticket category, transcript, ...\nTiếp nhận và xử lí ticket chưa bao giờ tiện lợi đến vậy.',
      "You know that one member who opens a ticket and then doesn't give a shit about anyone? With nemuri, support between members and server admins gets a whole lot easier: opening questions, ticket categories, transcripts, ...\nHandling tickets has never been this convenient.",
    ),
    facts: [L('Multi-panel dạng dropdown hoặc nút bấm', "Multi-panel with dropdowns or buttons"), L('Form hỏi member trước khi mở ticket', "Forms that ask members before a ticket opens"), L('Staff bấm Nhận ticket, khỏi rep trùng nhau', "Staff claim tickets, no more stepping on each other's toes"), L('Transcript và đánh giá 1–5 sao khi đóng', "Transcripts and 1–5 star ratings on close")],
    shots: [shot('ticket'), shot('ticket-form'), shot('ticket-open')],
    sequence: true,
    links: [['Ticket', docs('ticket')]],
  },
  {
    id: 'service',
    label: 'Giveaway · Voting · Donation · Temp voice',
    head: L('Phục vụ cả server.', 'Serving the whole server.'),
    body: L(
      'Giveaway đòi role mới join được á? Cả đòi thời gian join, tặng lượt bonus cho Vip, chặn blacklist?? Tưởng chừng viển vông mà lại làm được.\nEvent Vote ảnh đếm vote từ reaction và soi luôn acc mới, người đã thoát.\nDonation tự ghi từng lượt donate, đủ mốc là trao role, khỏi ai phải ngồi cộng tay.\nTemp voice thì chia cho mỗi người một phòng riêng, đổi tên, khóa cửa, kick đứa phá đều bằng nút bấm.',
      "Giveaways only a certain role can join? A minimum join time, bonus entries for VIPs, a blacklist?? Sounds made up, but it actually works.\nImage vote events count votes from reactions and catch fresh alts and people who already left.\nDonations log every contribution and hand out roles at milestones, no more adding things up by hand.\nTemp voice gives everyone their own room: rename it, lock it, kick whoever's trolling, all with buttons.",
    ),
    facts: [L('Giveaway có template, reroll và tự chọn người thắng', "Giveaway templates, rerolls and automatic winners"), L('Thống kê vote theo thời gian thực', "Real-time vote stats"), L('Ghi donate qua tiền của bot khác, role thưởng theo mốc', "Donations paid with other bots' currency, milestone roles"), L('Temp voice điều khiển bằng nút bấm, hết người là tự dọn', "Button-controlled temp voice that cleans itself up")],
    cycle: [['voting', 'Voting'], ['giveaway', 'Giveaway'], ['donation', 'Donation'], ['tempvoice', 'Temp voice']].map(([name, text]) => ({ shot: shot(name), text })),
    slots: 3,
    captions: false,
    links: [['Giveaway', docs('giveaway')], ['Voting', docs('voting')], ['Donation', docs('donation')], ['Temp voice', docs('tempvoice')]],
  },
  {
    id: 'play',
    label: L('Nối từ · Lệnh vui', 'Word chain · Fun commands'),
    head: L('Và bạn cũng cần một chút giải trí.', 'And you need a little fun, too.'),
    body: L(
      'Nối từ tiếng Việt chuẩn từ điển, bí từ thì bot mở lượt mới cho chơi tiếp, cán mốc streak còn được bot khen. Hết trò thì lôi nhau ra gayrate, psize, kiss ...',
      "Vietnamese word chain backed by a real dictionary: everyone stuck? the bot starts a new round, and streak milestones get a shout-out. Done with words? Hit each other with gayrate, psize, kiss ...",
    ),
    facts: [L('Từ điển tiếng Việt, tự mở lượt mới khi bí từ', "Vietnamese dictionary, new round when the chain gets stuck"), L('Mốc streak và bảng xếp hạng nối từ', "Streak milestones and a word chain leaderboard"), L('Lệnh giải trí: gayrate, psize, 8ball, pick...', "Fun commands: gayrate, psize, 8ball, pick..."), L('Ảnh anime cho kiss, hug, slap, pat, bite', "Anime GIFs for kiss, hug, slap, pat, bite")],
    shots: [shot('wordconnect')],
    pile: [shot('psize'), shot('quote'), shot('gayrate'), shot('kiss')],
    links: [[L('Nối từ', 'Word chain'), docs('wordconnect')], [L('Lệnh vui', 'Fun commands'), single('fun')], ['Lemme', single('lemme')]],
  },
];

export const ALL_FEATURES = [
  { emoji: '💬', name: 'Autoresponder', line: L('Bot tự trả lời theo trigger', "Bot replies on your triggers"), href: docs('autoresponder'), featured: true },
  { emoji: '🎫', name: 'Ticket', line: L('Hệ thống ticket hỗ trợ member', "Support tickets for members"), href: docs('ticket'), featured: true },
  { emoji: '🎁', name: 'Giveaway', line: L('Giveaway với requirement đầy đủ', "Giveaways with every requirement"), href: docs('giveaway'), featured: true },
  { emoji: '🥇', name: 'Voting', line: L('Thống kê vote từ reaction', "Vote stats from reactions"), href: docs('voting'), featured: true },
  { emoji: '💶', name: 'Donation', line: L('Tự động ghi & nhận donate', "Log and reward donations"), href: docs('donation'), featured: true },
  { emoji: '🔊', name: 'Tempvoice', line: L('Voice tạm, tự xóa khi không còn ai', "Temp voice, gone when empty"), href: docs('tempvoice'), featured: true },
  { emoji: '🔠', name: L('Nối từ', 'Word chain'), line: L('Chơi nối từ ngay trong kênh', "Word chain right in a channel"), href: docs('wordconnect'), featured: true },
  { emoji: '🎲', name: L('Lệnh giải trí', 'Fun commands'), line: '8ball, pick, quote, ...', href: single('fun'), featured: true },
  { emoji: '🤜', name: 'Actions', line: L('Đấm, đá, ôm, hôn member khác', "Punch, kick, hug, kiss other members"), href: single('lemme'), featured: true },
  { emoji: '📌', name: 'Sticky Message', line: L('Giữ tin nhắn ghim cuối kênh', "Keep a message pinned at the bottom"), href: docs('stickie') },
  { emoji: '🏷️', name: 'Custom Role', line: L('Trình quản lí role cho member', "Role manager for members"), href: docs('customrole') },
  { emoji: '👋', name: 'Greeting/Farewell', line: L('Chào & tạm biệt member', "Welcome and farewell members"), href: docs('greeting') },
  { emoji: '🛡️', name: 'AutoMod', line: L('Quản lý Discord AutoMod', "Manage Discord AutoMod"), href: docs('automod') },
  { emoji: '📚', name: 'Logging', line: L('Ghi lại các hành động của bot', "Log what the bot does"), href: docs('logging') },
  { emoji: '⚒️', name: 'Moderation', line: 'Ban, kick, timeout member', href: docs('moderation') },
  { emoji: '🧹', name: 'Purge', line: L('Xóa hàng loạt tin nhắn trong kênh', "Bulk delete messages in a channel"), href: docs('purge') },
  { emoji: '🎭', name: 'Role', line: L('Quản lí role cho member', "Manage member roles"), href: docs('role') },
  { emoji: '🔖', name: 'Tag', line: L('Tin nhắn soạn sẵn, gửi ở mọi nơi', "Saved messages, send them anywhere"), href: docs('tag') },
  { emoji: '😀', name: 'Emoji', line: L('Quản lý emoji của server', "Manage server emoji"), href: docs('emoji') },
  { emoji: '💰', name: 'Item', line: L('Economy và tiền ảo riêng của server', "Your server's own economy and currency"), href: docs('item') },
  { emoji: '👀', name: 'Snipe', line: L('Xem lại tin nhắn vừa bị xóa', "See recently deleted messages"), href: single('snipe') },
  { emoji: '💤', name: 'AFK', line: L('Reply khi có người ping & lưu lại', "Auto-reply on pings and keep them"), href: single('afk') },
  { emoji: '🤖', name: 'AI chat', line: L('Chat với AI ngay trong server', "Chat with AI in your server"), href: single('chat') },
  { emoji: '🎨', name: 'Artwork', line: L('Tìm art trên pixiv', "Find art on pixiv"), href: single('artwork') },
  { emoji: '⛏️', name: 'Minecraft', line: L('Lệnh cho người chơi Minecraft', "Commands for Minecraft players"), href: docs('minecraft') },
  { emoji: '🌐', name: 'Locale', line: L('Đổi ngôn ngữ cho bot', "Change the bot's language"), href: docs('locale') },
  { emoji: '🎯', name: 'Quests', line: L('Giao nhiệm vụ cho member', "Give members quests"), removed: true },
  { emoji: '⚡', name: 'Outage', line: L('Tra lịch cắt điện tại Việt Nam', "Power outage schedules in Vietnam"), removed: true },
  { emoji: '🚩', name: 'Quick Report', line: L('Báo tin nhắn vi phạm tới mod', "Report messages to mods"), removed: true },
  { emoji: '🔒', name: 'Security', line: L('Tự sửa nickname, khóa invite, ...', "Auto-fix nicknames, lock invites, ..."), removed: true },
  { emoji: '⏰', name: 'Autolock', line: L('Tự khóa kênh theo giờ', "Lock channels on a schedule"), removed: true },
  { emoji: '🧱', name: 'BlocksMC', line: L('Tra thông tin người chơi BlocksMC', "Look up BlocksMC players"), removed: true },
  { emoji: '🔞', name: 'NSFW Prediction', line: L('Kiểm tra ảnh NSFW bằng AI', "Check images for NSFW with AI"), removed: true },
];

export const TESTIMONIALS = [
  {
    avatar: 'duyandy',
    name: 'Duy Andy',
    role: 'Server Owner',
    quote: 'GlitchBucket là một người bạn hỗ trợ tuyệt vời cho cộng đồng của tôi, có rất nhiều chức năng hay, phục vụ rất nhiều cho cộng đồng mà các bạn không nên bỏ lỡ. Chức năng quản lý donation, chức năng tạo roles có thời hạn, đây là 2 chức năng tôi rất đánh giá cao.',
  },
  { avatar: 'hoanglong921', name: 'Hoang Long', role: 'Network Administrator', quote: 'Cảm ơn vì network paping' },
  { avatar: 'ptcd', name: 'ptcd', role: 'Server Owner', quote: 'cảm ơn vì tính năng độc cmn lạ - love from asakacloud.vn ❤' },
  { avatar: 'fakecattos', name: 'fakecattos', role: 'Community Member', quote: 'bot nhu cai lol' },
  { avatar: 'meimeizzz', name: 'Mei', role: 'Server Owner', quote: 'Bot quá là xịn, mình rất thích các tính năng của bot. Mong bot càng ngày càng phát triển và có thể update nhìu tính năng pro vjp hơn trong tương lai ạ :3' },
  { avatar: 'bachhummus', name: 'Bach Hummus', role: 'Server Owner · Vietnam', flag: '1f1fb-1f1f3', quote: 'great non moderation, utility bot as always. pls crack me uwu.' },
  { avatar: 'butsimptachyon', name: 'BTM-Tachyon', role: 'Server Owner', quote: 'Bot peak vl nhung khong co tien dnt' },
  { avatar: 'apdz', name: 'Nauht', role: 'Server Owner', quote: 'Tôi muốn đẻ con cho bot' },
  { avatar: 'ksh_st', name: 'ksh_st', role: 'Server Owner', quote: 'Toi yeu glitchbucket' },
];
