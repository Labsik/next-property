import { FaGoogle } from "react-icons/fa";

type Props = {
	onClick: () => void;
};

const GoogleButton = ({ onClick }: Props) => {
	return (
		<button
			type="button"
			onClick={onClick}
			className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 my-5" // no my-5 at laptop
		>
			<FaGoogle className="text-white mr-2" />
			<span>Login or Register</span>
		</button>
	);
};

export default GoogleButton;
