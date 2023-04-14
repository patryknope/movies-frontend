import React from "react";
import "../Styles/CustomButton.css";

export const CustomButton = ({ text, onClick }) => {
	return (
		<button className='custom-btn' onClick={onClick}>
			{text}
		</button>
	);
};
