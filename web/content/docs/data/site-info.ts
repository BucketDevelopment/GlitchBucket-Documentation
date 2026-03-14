import type { ComponentProps } from 'astro/types';
import { Icon } from '@astrojs/starlight/components';

export type SocialLink = {
	me?: string;
	text: string;
	icon: ComponentProps<typeof Icon>['name'];
	href: string;
	platform: string;
	footerOnly?: boolean;
};

export type SiteInfo = {
	socialLinks: SocialLink[];
};

const siteInfo: SiteInfo = {
	socialLinks: [
		{
			platform: 'discord',
			href: 'https://bot.tudubucket.dev/support',
			icon: 'discord',
			text: 'Tham gia cộng đồng Discord',
		},
		// {
		// 	platform: 'twitter',
		// 	icon: 'social/twitter',
		// 	me: 'https://x.com/astrodotbuild',
		// 	href: 'https://x.com/astrodotbuild',
		// 	text: 'Follow Astro on x.com (formerly Twitter)',
		// },
		{
			platform: 'github',
			icon: 'github',
			text: "Đến Github của Author",
			me: 'https://github.com/tudubucket/',
			href: 'https://github.com/tudubucket',
		},
		// {
		// 	platform: 'bluesky',
		// 	footerOnly: true,
		// 	icon: 'social/bluesky',
		// 	me: 'https://bsky.app/profile/astro.build',
		// 	text: 'Follow Astro on Bluesky',
		// 	href: 'https://bsky.app/profile/astro.build',
		// },
		// {
		// 	platform: 'mastodon',
		// 	footerOnly: true,
		// 	icon: 'social/mastodon',
		// 	me: 'https://m.webtoo.ls/@astro',
		// 	text: 'Follow Astro on Mastodon',
		// 	href: 'https://m.webtoo.ls/@astro',
		// },
		// {
		// 	platform: 'reddit',
		// 	footerOnly: true,
		// 	icon: 'social/reddit',
		// 	me: 'https://www.reddit.com/r/withastro/',
		// 	text: 'Join the official Astro community on Reddit',
		// 	href: 'https://www.reddit.com/r/withastro/',
		// },
	],
};

export default siteInfo;