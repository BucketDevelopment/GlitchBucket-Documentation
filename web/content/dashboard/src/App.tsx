import { MantineProvider, rem } from "@mantine/core";
import Header from "./components/Header";
import GuildSelector from "./GuildSelector";

export default function App() {
	return (
		<MantineProvider
			defaultColorScheme="dark"
			theme={{
				// fontSizes: {
				// 	xs: rem(10),
				// 	sm: rem(11),
				// 	md: rem(14),
				// 	lg: rem(16),
				// 	xl: rem(20),
				// },
				lineHeights: {
					xs: "1",
					sm: "1.3",
					md: "1.4",
					lg: "1.5",
					xl: "1.6",
				},
			}}
		>
			<Header />
			<GuildSelector />
		</MantineProvider>
	);
}
