import { links } from "./config";
import type { LinkType } from "./Navbar.types";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import GoogleButton from "@/ui/Buttons/GoogleButton";
import {
	useSession,
	signIn,
	type LiteralUnion,
	type ClientSafeProvider,
} from "next-auth/react";

import type { BuiltInProviderType } from "next-auth/providers/index";

type Props = {
	providers: Record<
		LiteralUnion<BuiltInProviderType, string>,
		ClientSafeProvider
	> | null;
};

const MobileMenu = ({ providers }: Props) => {
	const pathname = usePathname();
	const { data: session } = useSession();

	return (
		<div id="mobile-menu">
			<div className="space-y-1 px-2 pb-3 pt-2">
				{links.map((link: LinkType) => (
					<Link
						key={link.href}
						href={link.href}
						className={clsx(
							"text-white block rounded-md px-3 py-2 text-base font-medium",
							{ "bg-black": pathname === link.href },
							{ hidden: !session && link.href === "/properties/add" },
						)}
					>
						{link.name}
					</Link>
				))}

				{!session &&
					providers &&
					Object.values(providers).map((provider) => (
						<GoogleButton
							onClick={() => signIn(provider.id)}
							key={provider.id}
						/>
					))}
			</div>
		</div>
	);
};

export default MobileMenu;
