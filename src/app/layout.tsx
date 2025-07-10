import type { Metadata } from "next";
import { Proza_Libre } from "next/font/google";
import "./globals.css";
import Provider from "@/provider/Provider";

const inter = Proza_Libre({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
	title: "Minecraft Skin Viewer",
	description:
		"An interactive site to preview 3D Minecraft skins by searching a username or uploading your own.",
	keywords: [
		"minecraft",
		"skin",
		"viewer",
		"minecraft skin",
		"minecraft skin viewer",
		"minecraft skin preview 3d",
		"minecraft skin preview",
		"minecraft skin previewer",
		"minecraft skin previewer 3d",
		"mojang",
	],
	authors: [
		{
			name: "Minecraft Skin Viewer",
			url: "https://minecraft-skin-viewer.vercel.app/",
		},
	],
	creator: "Minecraft Skin Viewer",
	publisher: "Minecraft Skin Viewer",
	metadataBase: new URL("https://minecraft-skin-viewer.vercel.app"),
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${inter.className} h-screen bg-background tracking-tight antialiased`}>
				<Provider>{children}</Provider>
			</body>
		</html>
	);
}
