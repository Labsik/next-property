"use client";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
	display: "block",
	margin: "100px auto",
};

type Props = {
	loading: boolean;
};

const Spinner = ({ loading }: Props) => {
	return (
		<ClipLoader
			color="#3b82f6"
			loading={loading}
			cssOverride={override}
			size={150}
			aria-label="Loading Spinner"
		/>
	);
};
export default Spinner;
