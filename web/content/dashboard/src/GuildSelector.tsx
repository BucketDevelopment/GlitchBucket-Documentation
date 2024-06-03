import {
	Card,
	Image,
	Text,
	Group,
	Badge,
	Button,
	ActionIcon,
	Grid,
} from "@mantine/core";
import classes from "./GuildSelector.module.css";

const mockdata = {
	image:
		"https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
	title: "GlitchBucket Support",
	country: "Admin",
	description: "Description",
	badges: [
		{ emoji: "☀️", label: "Sunny weather" },
		{ emoji: "🦓", label: "Onsite zoo" },
		{ emoji: "🌊", label: "Sea" },
		{ emoji: "🌲", label: "Nature" },
		{ emoji: "🤽", label: "Water sports" },
	],
};

export default function GuildSelector() {
	const { image, title, description, country, badges } = mockdata;
	const features = badges.map((badge) => (
		<Badge variant="light" key={badge.label} leftSection={badge.emoji}>
			{badge.label}
		</Badge>
	));

	const cards = Array.from({ length: 6 }, (_, index) => (
		<Grid.Col span={{ base: 11, xs: 2}} key={index}>
			<Card withBorder radius="md" p="md" className={classes.card}>
				<Card.Section>
					<Image src={image} alt={title} height={130} />
				</Card.Section>

				<Card.Section className={classes.section} mt="md">
					<Group justify="apart">
						<Text fz="lg" fw={500} >
							{title}
						</Text>
						<Badge ta="right" leftSection="⚙️" color="red" size="sm">
							{country}
						</Badge>
					</Group>
					<Text fz="sm" mt="xs">
						{description}
					</Text>
				</Card.Section>
			</Card>
		</Grid.Col>
	));

	return <Grid gutter="xl">{cards}</Grid>;
}
