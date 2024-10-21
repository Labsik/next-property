import React from "react";
import type { InfoBoxType } from "./InfoBoxes.types";

const InfoBox = ({
	children,
	heading,
	backgroundColor = "bg-gray-100",
	textColor = "text-gray-800",
	buttonInfo,
}: InfoBoxType) => {
	return (
		<div className={`${backgroundColor} p-6 rounded-lg shadow-md`}>
			<h2 className="text-2xl font-bold">{heading}</h2>
			<p className={`${textColor} mt-2 mb-4`}>{children}</p>
			<a
				href={buttonInfo.link}
				className={`${buttonInfo.backgroundColor} inline-block text-white rounded-lg px-4 py-2 hover:bg-blue-600`}
			>
				{buttonInfo.text}
			</a>
		</div>
	);
};

export default InfoBox;
