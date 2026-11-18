const docs = (name) => `/docs/commands/group/${name}/`;
const single = (name) => `/docs/commands/single/${name}/`;
const shot = (name) => ({ light: `/landing/previews/${name}-light.png`, dark: `/landing/previews/${name}-dark.png` });

const both = (src) => ({ light: src, dark: src });

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
    { shot: shot('wordconnect'), text: 'Nối từ', place: { x: 2, y: 0, w: 44, tilt: -2 }, label: { x: 5, y: 66, arrow: 'right', flow: 'up', aim: -62, tilt: -6 } },
    { shot: shot('tempvoice'), text: 'Temp voice', place: { x: 40, y: 50, w: 58, tilt: 1.5 }, label: { x: 66, y: 39, arrow: 'left', tilt: -4 } },
    { shot: shot('customrole'), text: 'Custom role', place: { x: 60, y: 9, w: 37, tilt: 2.5 }, label: { x: 49, y: 0, arrow: 'right', tilt: -6 } },
  ],
];

const LAYOUT_SERVERS = ["𝗭𝗬𝗡𝗙𝗘𝗜’𝗦 𝗟𝗜𝗧𝗧𝗟𝗘 𝗪𝗢𝗥𝗟𝗗", "Sprinkle & Sparkle", "DriftLight", "Sprinkle & Sparkle", "☘️┊「 𝒋𝒖𝒔𝒕𝒂𝒔𝒆𝒆𝒅.ᐟ」", "WarmCorner", "☘️┊「 𝒋𝒖𝒔𝒕𝒂𝒔𝒆𝒆𝒅.ᐟ」", "𝗭𝗬𝗡𝗙𝗘𝗜’𝗦 𝗟𝗜𝗧𝗧𝗟𝗘 𝗪𝗢𝗥𝗟𝗗"];
export const LAYOUTS = LAYOUT_SERVERS.map((server, i) => ({ shot: shot(`layout-${i + 1}`), text: `Layout của ${server}` }));

export const DASHBOARD_SHOTS = [
  [3, 'Dashboard: sửa autoresponder, xem trước layout'],
  [2, 'Dashboard: cài đặt panel ticket'],
  [4, 'Dashboard: Profile và Whitelabel của bot'],
  [1, 'Dashboard: tổng quan server và lịch sử thay đổi'],
].map(([n, text]) => ({ shot: both(`/landing/dashboard-${n}.webp`), text }));

export const MAIN_FEATURES = [
  {
    id: 'autoresponder',
    label: 'Autoresponder',
    head: 'Autoresponder\nở mọi tư thế.',
    body: 'Khi giới hạn của bot nằm ở sự sáng tạo của bạn. Tin nhắn, embed, nút bấm, form, layout Components V2, ... Muốn message theo cách nào, cách đó có ở Autoresponder & BucketScript, placeholder với function đầy đủ.',
    facts: ['Embed, nút bấm, form và layout Components V2', 'BucketScript: placeholder, function, button, select', 'Gửi reply sang kênh khác, thêm hoặc gỡ role'],
    shots: [shot('autoresponder')],
    cycle: LAYOUTS,
    links: [['Autoresponder', docs('autoresponder')], ['BucketScript', '/docs/bucketscript/functions/']],
  },
  {
    id: 'ticket',
    label: 'Ticket',
    head: 'Hoặc cần cả ticket?',
    body: 'Nhớ cái lúc bọn member mở ticket xong im mẹ nó luôn không? Tại nemuri, support giữa Member và Server Admin hiện đã trở nên dễ dàng hơn rất nhiều: Câu hỏi mở đầu ticket, chia ticket category, transcript, ...\nTiếp nhận và xử lí ticket chưa bao giờ tiện lợi đến vậy.',
    facts: ['Multi-panel dạng dropdown hoặc nút bấm', 'Form hỏi member trước khi mở ticket', 'Staff bấm Nhận ticket, khỏi rep trùng nhau', 'Transcript và đánh giá 1–5 sao khi đóng'],
    shots: [shot('ticket'), shot('ticket-form'), shot('ticket-open')],
    sequence: true,
    links: [['Ticket', docs('ticket')]],
  },
  {
    id: 'service',
    label: 'Giveaway · Voting · Donation · Temp voice',
    head: 'Phục vụ cả server.',
    body: 'Giveaway đòi role mới join được á? Cả đòi thời gian join, tặng lượt bonus cho Vip, chặn blacklist?? Tưởng chừng viển vông mà lại làm được.\nEvent Vote ảnh đếm vote từ reaction và soi luôn acc mới, người đã thoát.\nDonation tự ghi từng lượt donate, đủ mốc là trao role, khỏi ai phải ngồi cộng tay.\nTemp voice thì chia cho mỗi người một phòng riêng, đổi tên, khóa cửa, kick đứa phá đều bằng nút bấm.',
    facts: ['Giveaway có template, reroll và tự chọn người thắng', 'Thống kê vote theo thời gian thực', 'Ghi donate qua tiền của bot khác, role thưởng theo mốc', 'Temp voice điều khiển bằng nút bấm, hết người là tự dọn'],
    cycle: [['voting', 'Voting'], ['giveaway', 'Giveaway'], ['donation', 'Donation'], ['tempvoice', 'Temp voice']].map(([name, text]) => ({ shot: shot(name), text })),
    slots: 3,
    captions: false,
    links: [['Giveaway', docs('giveaway')], ['Voting', docs('voting')], ['Donation', docs('donation')], ['Temp voice', docs('tempvoice')]],
  },
  {
    id: 'play',
    label: 'Nối từ · Lệnh vui',
    head: 'Và bạn cũng cần một chút giải trí.',
    body: 'Nối từ tiếng Việt chuẩn từ điển, bí từ thì bot mở lượt mới cho chơi tiếp, cán mốc streak còn được bot khen. Hết trò thì lôi nhau ra gayrate, psize, kiss ...',
    facts: ['Từ điển tiếng Việt, tự mở lượt mới khi bí từ', 'Mốc streak và bảng xếp hạng nối từ', 'Lệnh giải trí: gayrate, psize, 8ball, pick...', 'Ảnh anime cho kiss, hug, slap, pat, bite'],
    shots: [shot('wordconnect')],
    pile: [shot('psize'), shot('quote'), shot('gayrate'), shot('kiss')],
    links: [['Nối từ', docs('wordconnect')], ['Lệnh vui', single('fun')], ['Lemme', single('lemme')]],
  },
];

export const ALL_FEATURES = [
  { emoji: '💬', name: 'Autoresponder', line: 'Bot tự trả lời theo trigger', href: docs('autoresponder'), featured: true },
  { emoji: '🎫', name: 'Ticket', line: 'Hệ thống ticket hỗ trợ member', href: docs('ticket'), featured: true },
  { emoji: '🎁', name: 'Giveaway', line: 'Giveaway với requirement đầy đủ', href: docs('giveaway'), featured: true },
  { emoji: '🥇', name: 'Voting', line: 'Thống kê vote từ reaction', href: docs('voting'), featured: true },
  { emoji: '💶', name: 'Donation', line: 'Tự động ghi & nhận donate', href: docs('donation'), featured: true },
  { emoji: '🔊', name: 'Tempvoice', line: 'Voice tạm, tự xóa khi không còn ai', href: docs('tempvoice'), featured: true },
  { emoji: '🔠', name: 'Nối từ', line: 'Chơi nối từ ngay trong kênh', href: docs('wordconnect'), featured: true },
  { emoji: '🎲', name: 'Lệnh giải trí', line: '8ball, pick, quote, ...', href: single('fun'), featured: true },
  { emoji: '🤜', name: 'Actions', line: 'Đấm, đá, ôm, hôn member khác', href: single('lemme'), featured: true },
  { emoji: '📌', name: 'Sticky Message', line: 'Giữ tin nhắn ghim cuối kênh', href: docs('stickie') },
  { emoji: '🏷️', name: 'Custom Role', line: 'Trình quản lí role cho member', href: docs('customrole') },
  { emoji: '👋', name: 'Greeting/Farewell', line: 'Chào & tạm biệt member', href: docs('greeting') },
  { emoji: '🛡️', name: 'AutoMod', line: 'Quản lý Discord AutoMod', href: docs('automod') },
  { emoji: '📚', name: 'Logging', line: 'Ghi lại các hành động của bot', href: docs('logging') },
  { emoji: '⚒️', name: 'Moderation', line: 'Ban, kick, timeout member', href: docs('moderation') },
  { emoji: '🧹', name: 'Purge', line: 'Xóa hàng loạt tin nhắn trong kênh', href: docs('purge') },
  { emoji: '🎭', name: 'Role', line: 'Quản lí role cho member', href: docs('role') },
  { emoji: '🔖', name: 'Tag', line: 'Tin nhắn soạn sẵn, gửi ở mọi nơi', href: docs('tag') },
  { emoji: '😀', name: 'Emoji', line: 'Quản lý emoji của server', href: docs('emoji') },
  { emoji: '💰', name: 'Item', line: 'Economy và tiền ảo riêng của server', href: docs('item') },
  { emoji: '👀', name: 'Snipe', line: 'Xem lại tin nhắn vừa bị xóa', href: single('snipe') },
  { emoji: '💤', name: 'AFK', line: 'Reply khi có người ping & lưu lại', href: single('afk') },
  { emoji: '🤖', name: 'AI chat', line: 'Chat với AI ngay trong server', href: single('chat') },
  { emoji: '🎨', name: 'Artwork', line: 'Tìm art trên pixiv', href: single('artwork') },
  { emoji: '⛏️', name: 'Minecraft', line: 'Lệnh cho người chơi Minecraft', href: docs('minecraft') },
  { emoji: '🌐', name: 'Locale', line: 'Đổi ngôn ngữ cho bot', href: docs('locale') },
  { emoji: '🎯', name: 'Quests', line: 'Giao nhiệm vụ cho member', removed: true },
  { emoji: '⚡', name: 'Outage', line: 'Tra lịch cắt điện tại Việt Nam', removed: true },
  { emoji: '🚩', name: 'Quick Report', line: 'Báo tin nhắn vi phạm tới mod', removed: true },
  { emoji: '🔒', name: 'Security', line: 'Tự sửa nickname, khóa invite, ...', removed: true },
  { emoji: '⏰', name: 'Autolock', line: 'Tự khóa kênh theo giờ', removed: true },
  { emoji: '🧱', name: 'BlocksMC', line: 'Tra thông tin người chơi BlocksMC', removed: true },
  { emoji: '🔞', name: 'NSFW Prediction', line: 'Kiểm tra ảnh NSFW bằng AI', removed: true },
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
