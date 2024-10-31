import Link from "next/link";
import { dropdownLinks } from "./config";
import { signOut } from "next-auth/react";
type Props = {
	setIsProfileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Dropdown = ({ setIsProfileMenuOpen }: Props) => {
	return (
		<div
			id="user-menu"
			className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
			role="menu"
			aria-orientation="vertical"
			aria-labelledby="user-menu-button"
			tabIndex={-1}
		>
			{dropdownLinks.map((link) => (
				<Link
					key={link.href}
					href={link.href}
					className="block px-4 py-2 text-sm text-gray-700"
					role="menuitem"
					tabIndex={-1}
					id="user-menu-item-0"
				>
					{link.name}
				</Link>
			))}

			<button
				type="button"
				className="block px-4 py-2 text-sm text-gray-700"
				role="menuitem"
				tabIndex={-1}
				id="user-menu-item-2"
				onClick={() => {
					signOut();
					setIsProfileMenuOpen(false);
				}}
			>
				Sign Out
			</button>
		</div>
	);
};

export default Dropdown;
