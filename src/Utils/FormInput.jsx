import React from "react";
import "../Styles/AddMovieForm.css";

const FormInput = ({
	id,
	name,
	type,
	value,
	onChange,
	className,
	hint,
	inputMode,
}) => {
	return (
		<div className='form-input-container'>
			<input
				id={id}
				name={name}
				type={type}
				value={value}
				onChange={onChange}
				className={`form-input ${className}`}
				inputMode={inputMode}
			/>
			{hint && <span className='form-input-hint'>{hint}</span>}
		</div>
	);
};

export default FormInput;
