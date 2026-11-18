import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// tạo ô nền lặp lại cho hero landing: emoji Twemoji (bộ Discord dùng) xếp lưới chéo, hàng lẻ lệch nửa ô.
// vị trí, cỡ, góc nghiêng cố định theo seed nên chạy lại vẫn ra cùng một ảnh. chạy: node scripts/hero-emoji.mjs
const EMOJI = ['❤️', '😊', '✨', '🥰', '⭐', '😂', '💖', '🎉', '😎', '🌸', '🤩', '💬', '🥳', '🍀', '😴', '🔥', '🎮', '😳', '🎵', '💜', '😆', '👑', '🌙', '💕', '🙈', '🐒'];
const SIZE = 960;
const COLS = 6;
const ROWS = 12;

const file = (emoji) => {
    const chars = emoji.includes('‍') ? [...emoji] : [...emoji].filter((char) => char !== '️');
    return chars.map((char) => char.codePointAt(0).toString(16)).join('-');
};

const symbols = await Promise.all(
    EMOJI.map(async (emoji, i) => {
        const response = await fetch(`https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg/${file(emoji)}.svg`);
        if (!response.ok) throw new Error(`${emoji}: ${response.status}`);
        const inner = (await response.text()).replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
        return `<symbol id="e${i}" viewBox="0 0 36 36">${inner}</symbol>`;
    }),
);

let seed = 20261118;
const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const pool = Array.from({ length: COLS * ROWS }, (_, i) => i % EMOJI.length);
for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
}
const cell = SIZE / COLS;
const row = SIZE / ROWS;
const uses = pool.map((id, i) => {
    const r = Math.floor(i / COLS);
    const x = (i % COLS) * cell + (r % 2) * (cell / 2) + cell / 4;
    const y = r * row + row / 2;
    const size = 34 + Math.round(rand() * 8);
    const tilt = Math.round((rand() - 0.5) * 30);
    return `<use href="#e${id}" x="${x - size / 2}" y="${y - size / 2}" width="${size}" height="${size}" transform="rotate(${tilt} ${x} ${y})"/>`;
});

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
<!-- emoji: Twemoji (jdecked/twemoji 15.1.0), CC-BY 4.0. tạo bằng scripts/hero-emoji.mjs -->
<defs>${symbols.join('')}<filter id="soft" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="2.6"/><feColorMatrix type="saturate" values="0.6"/></filter></defs>
<g filter="url(#soft)">${uses.join('')}</g>
</svg>
`;
const out = fileURLToPath(new URL('../public/landing/hero-emoji.svg', import.meta.url));
writeFileSync(out, svg);
console.log(out, svg.length);
