import Link from "next/link";
import { links } from "./config";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import type { Session } from "next-auth";
import { useSession } from "next-auth/react";

export type Props = {
	session: Session | null;
};

const Menu = () => {
	const { data: session } = useSession();

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
							hidden: !session && link.href === "/properties/add",
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
