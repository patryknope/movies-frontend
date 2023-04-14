import React from "react";
import "../Styles/AddMovieForm.css";

const SelectInput = ({ id, name, label, value, onChange, options }) => {
	return (
		<div className='select-field'>
			<label htmlFor={id}>{label}</label>
			<select id={id} name={name} value={value} onChange={onChange}>
				{options.map(option => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};

export default SelectInput;
