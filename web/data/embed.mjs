// Discord component embed (Components V2 trong link preview), cùng kiểu với zyhost: dòng nguồn nhỏ, ảnh, tiêu đề ### + mô
// tả, trang nào cần thì thêm vạch ngăn và section có nút. Mỗi trang một embed riêng, ảnh tạm dùng chung widebucket.
// Docs: https://github.com/discord/discord-api-docs/blob/main/developers/link-previews/component-embeds.mdx
// Giới hạn 3.000 byte (tính cả escape <…) và 40 component; ảnh phải là URL tuyệt đối http(s).

export const SITE = 'https://bot.tudubucket.dev';
export const DASHBOARD = `${SITE}/dashboard`;
export const EMBED_IMAGE = `${SITE}/landing/embed-banner.png`;
const ACCENT = 0xc0cdff;
const SOURCE = `-# [bot.tudubucket.dev](${SITE}) · nemuri`;

export const link = (label, url) => ({ type: 2, style: 5, disabled: false, label, url });
export const section = (content, button) => ({ type: 9, components: [{ type: 10, content }], accessory: button });

/** Payload `{ component: Container }` cho thẻ <script id="discord:component-embed">. */
export function componentEmbed({ heading, description, image = EMBED_IMAGE, sections = [] }) {
    return {
        component: {
            type: 17,
            accent_color: ACCENT,
            spoiler: false,
            components: [
                { type: 10, content: SOURCE },
                { type: 12, items: [{ media: { url: image }, spoiler: false }] },
                { type: 10, content: description ? `### ${heading}\n${description}` : `### ${heading}` },
                ...(sections.length ? [{ type: 14, divider: true, spacing: 1 }, ...sections] : []),
            ],
        },
    };
}

export const homeEmbed = componentEmbed({
    heading: 'Quản lý server thông minh và hiệu quả.',
    description:
        'Discord Bot đa năng với các công cụ độc quyền về quản lý và tự động hóa, giúp bạn vận hành server chuyên nghiệp hơn.',
    sections: [
        section('**Thêm nemuri vào server**\n-# Hoàn toàn miễn phí để bắt đầu', link('Thêm bot', `${SITE}/invite`)),
    ],
});

export const premiumEmbed = componentEmbed({
    heading: 'Quản lí server ở một mức độ cao hơn',
    description: 'Nâng giới hạn Autoresponder, Embed, Ticket, Giveaway và nhiều tính năng khác cho server của bạn.',
    sections: [
        section('**Plus** · 36.000đ/tháng\n-# hoặc vĩnh viễn với 250.000đ', link('Mua Plus', DASHBOARD)),
        section('**Extended** · 59.000đ/tháng\n-# hoặc vĩnh viễn với 500.000đ', link('Mua Extended', DASHBOARD)),
    ],
});

export const premiumEmbedEn = componentEmbed({
    heading: 'Manage your server at a higher level',
    description: 'Raise the limits of Autoresponder, Embed, Ticket, Giveaway and more for your server.',
    sections: [
        section('**Plus** · €2.99/month\n-# or lifetime for €21.99', link('Get Plus', DASHBOARD)),
        section('**Extended** · €4.99/month\n-# or lifetime for €43.99', link('Get Extended', DASHBOARD)),
    ],
});
