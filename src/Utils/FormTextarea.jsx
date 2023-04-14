import React from "react";
import "../Styles/AddMovieForm.css";

const FormTextarea = ({ id, name, label, value, onChange, className }) => {
	return (
		<div className={`form-field ${className}`}>
			<label htmlFor={id}>{label}</label>
			<textarea
				id={id}
				name={name}
				value={value}
				onChange={onChange}
				className='input-field'
				style={{ resize: "none" }} // prevent textarea from being resized
			/>
		</div>
	);
};

export default FormTextarea;
