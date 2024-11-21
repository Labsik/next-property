import type { Metadata } from "next";
import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import AuthProvider from "@/components/AuthProvider";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export const metadata: Metadata = {
	title: "Property Pulse",
	description: "Find the perfect rental property",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<AuthProvider>
			<html lang="en">
				<body>
					<Navbar />
					<main>{children}</main>
					<Footer />
				</body>
			</html>
		</AuthProvider>
	);
}
