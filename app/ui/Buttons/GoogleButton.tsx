import { FaGoogle } from "react-icons/fa";

const GoogleButton = () => {
	return (
		<button
			type="button"
			className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 my-5" // no my-5 at laptop
		>
			<FaGoogle className="text-white mr-2" />
			<span>Login or Register</span>
		</button>
	);
};

export default GoogleButton;
