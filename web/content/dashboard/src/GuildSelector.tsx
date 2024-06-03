import {
	Card,
	Image,
	Text,
	Group,
	Badge,
	Container,
	Grid,
	Avatar,
	rem,
} from "@mantine/core";
import classes from "./GuildSelector.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

class PermissionsHelper {
	static admin = (
		<Badge
			ta="right"
			leftSection="⚙️"
			color="red"
			size="sm"
			fullWidth={true}
			radius={0}
		>
			Administrator
		</Badge>
	);
	static owner = (
		<Badge
			ta="right"
			leftSection="👑"
			color="gold"
			size="sm"
			fullWidth={true}
			radius={0}
		>
			Owner
		</Badge>
	);

	static checkValid(base: number, owner: boolean): boolean {
		return owner === true || (base & (1 << 3)) === 1 << 3;
	}
	static manageBadge(base: number, owner: boolean): any {
		if (owner === true) {
			return this.owner;
		}
		if ((base & (1 << 3)) === 1 << 3) {
			return this.admin;
		}
	}
}

class ImageHelper {
	static BASE = "https://cdn.discordapp.com";

	static guildBanner(guildId: number, image: string | null, name: string): any {
		if (!image) {
			return (
				<Image
					src="https://cdn.langdua.net/widebucket.png"
					alt={name}
					height={130}
				/>
			);
		}
		const animated = image.startsWith("a_");
		const format = animated ? "gif" : "png";
		const src = `${this.BASE}/banners/${guildId}/${image}.${format}?size=512`;
		return <Image src={src} alt={name} height={130} />;
	}
	static guildIcon(guildId: number, image: string | null, name: string): any {
		if (!image) {
			return <Avatar color="cyan">{name[0]}</Avatar>;
		}
		const animated = image.startsWith("a_");
		const format = animated ? "gif" : "png";
		const src = `${this.BASE}/icons/${guildId}/${image}.${format}?size=64`;
		return <Avatar src={src} alt="gavatar" />;
	}
}

function Example() {
	const { isPending, error, data } = useQuery({
		queryKey: [],
		queryFn: () =>
			axios.get("http://localhost:5000/rest/v1/guilds").then((res) => res.data),
	});

	if (isPending) return "Loading...";

	if (error) return "An error has occurred: " + error.message;

	return data
		.filter((item: any) =>
			PermissionsHelper.checkValid(item.permissions, item.owner)
		)
		.map((item: any, index: number) => (
			<Grid.Col span={{ base: 12, md: 2, lg: 2 }} key={index}>
				<Card withBorder radius="md" padding="xs" className={classes.card}>
					<Card.Section>
						{PermissionsHelper.manageBadge(item.permissions, item.owner)}
						{ImageHelper.guildBanner(item.id, item.banner, item.name)}
					</Card.Section>
					<Card.Section className={classes.information}>
						<Group justify="space-center">
							{ImageHelper.guildIcon(item.id, item.icon, item.name)}
							<Card.Section className={classes.section} mt="xs">
								<Group justify="apart">
									<Text fz="md" fw={500}>
										{item.name}
									</Text>
								</Group>
								<Text fz="sm" mt={rem(4)}>
									{item.name}
								</Text>
							</Card.Section>
						</Group>
					</Card.Section>
				</Card>
			</Grid.Col>
		));
}

export default function GuildSelector() {
	return (
		<Grid>
			<Example />
		</Grid>
	);
}
