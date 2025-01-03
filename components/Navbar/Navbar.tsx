"use client";
import { useEffect, useState } from "react";

import profileDefault from "@/assets/images/profile.png";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import Logo from "./Logo";
import Menu from "./Menu";
import GoogleButton from "@/ui/Buttons/GoogleButton";
import Dropdown from "./Dropdown";
import useWindowDimensions from "@/hooks/useWindowDimension";
import {
	signIn,
	useSession,
	getProviders,
	type LiteralUnion,
	type ClientSafeProvider,
} from "next-auth/react";
import type { BuiltInProviderType } from "next-auth/providers/index";

const Navbar = () => {
	const { data: session } = useSession();

	const profileImage = session?.user?.image;

	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
	const [providers, setProviders] = useState<Record<
		LiteralUnion<BuiltInProviderType, string>,
		ClientSafeProvider
	> | null>(null);

	const { width } = useWindowDimensions();

	const handleOpenMobileMenu = () => {
		setIsMobileMenuOpen((prev) => !prev);
	};

	const handleOpenProfileMenu = () => {
		setIsProfileMenuOpen((prev) => !prev);
	};

	useEffect(() => {
		const setAuthProviders = async () => {
			const res = await getProviders();
			setProviders(res);
		};

		setAuthProviders();
	}, []);

	useEffect(() => {
		// NOTE: close mobile menu if the viewport size is changed
		if (width !== undefined && width > 766) {
			setIsMobileMenuOpen(false);
		}
	}, [width]);

	return (
		<nav className="bg-blue-700 border-b border-blue-500">
			<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
				<div className="relative flex h-20 items-center justify-between">
					<div className="absolute inset-y-0 left-0 flex items-center md:hidden">
						{/* <!-- Mobile menu button--> */}
						<button
							type="button"
							id="mobile-dropdown-button"
							className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
							aria-controls="mobile-menu"
							aria-expanded="false"
							onClick={handleOpenMobileMenu}
						>
							<span className="absolute -inset-0.5" />
							<span className="sr-only">Open main menu</span>
							<svg
								className="block h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
								/>
							</svg>
						</button>
					</div>

					<div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
						{/* <!-- Logo --> */}
						<Logo />
						{/* <!-- Desktop Menu Hidden below md screens --> */}
						<Menu />
					</div>

					{/* <!-- Right Side Menu (Logged Out) --> */}
					{!session && (
						<div className="hidden md:block md:ml-6">
							<div className="flex items-center">
								{providers &&
									Object.values(providers).map((provider) => (
										<GoogleButton
											onClick={() => signIn(provider.id)}
											key={provider.id}
										/>
									))}
							</div>
						</div>
					)}

					{/* <!-- Right Side Menu (Logged In) --> */}
					{session && (
						<div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
							<a href="messages" className="relative group">
								<button
									type="button"
									className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
								>
									{/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
									<span className="absolute -inset-1.5"></span>
									<span className="sr-only">View notifications</span>
									<svg
										className="h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
										/>
									</svg>
								</button>
								<span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
									2
									{/* <!-- Replace with the actual number of notifications --> */}
								</span>
							</a>
							{/* <!-- Profile dropdown button --> */}
							<div className="relative ml-3">
								<div>
									<button
										type="button"
										className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
										id="user-menu-button"
										aria-expanded="false"
										aria-haspopup="true"
										onClick={handleOpenProfileMenu}
									>
										{/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
										<span className="absolute -inset-1.5"></span>
										<span className="sr-only">Open user menu</span>
										<Image
											className="h-8 w-8 rounded-full"
											src={profileImage ?? profileDefault}
											width={40}
											height={40}
											alt="Profile Logo"
										/>
									</button>
								</div>

								{/* <!-- Profile dropdown --> */}

								{isProfileMenuOpen && (
									<Dropdown setIsProfileMenuOpen={setIsProfileMenuOpen} />
								)}
							</div>
						</div>
					)}
				</div>
			</div>

			{/* <!-- Mobile menu, show/hide based on menu state. --> */}
			{isMobileMenuOpen && <MobileMenu providers={providers} />}
		</nav>
	);
};

export default Navbar;
