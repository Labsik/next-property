import { links } from "./config";
import type { LinkType, MenuType } from "./Navbar.types";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import GoogleButton from "app/ui/Buttons/GoogleButton";

const MobileMenu = ({ isLoggedIn }: MenuType) => {
	const pathname = usePathname();
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
							{ hidden: !isLoggedIn && link.href === "/properties/add" },
						)}
					>
						{link.name}
					</Link>
				))}

				{!isLoggedIn && <GoogleButton />}
			</div>
		</div>
	);
};

export default MobileMenu;
