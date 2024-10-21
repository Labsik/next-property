import Link from "next/link";
import { links } from "./config";
import type { MenuType } from "./Navbar.types";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const Menu = ({ isLoggedIn }: MenuType) => {
	const pathname = usePathname();

	return (
		<div className="hidden md:ml-6 md:block">
			<div className="flex space-x-2">
				{links.map((link) => (
					<Link
						key={link.href}
						href={link.href}
						className={clsx("text-white block rounded-md px-3 py-2", {
							"bg-black": pathname === link.href,
							hidden: !isLoggedIn && link.href === "/properties/add",
						})}
					>
						{link.name}
					</Link>
				))}
			</div>
		</div>
	);
};

export default Menu;
