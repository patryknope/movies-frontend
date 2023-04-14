import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StarRating from "../Utils/StarRating";
import FormInput from "../Utils/FormInput";
import FormSelect from "../Utils/FormSelect";
import FormTextarea from "../Utils/FormTextarea";
import "../Styles/AddMovieForm.css";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AddMovieForm(props) {
	const navigate = useNavigate();
	const [title, setTitle] = useState("");
	const [year, setYear] = useState("");
	const [category, setCategory] = useState("");
	const [description, setDescription] = useState("");
	const [grade, setGrade] = useState(0);

	const handleRatingChange = rating => {
		setGrade(rating);
	};

	const handleSubmit = event => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const data = Object.fromEntries(formData.entries());
		data.grade = grade; // Add the grade property to the data object
		props.onSubmit(data);
	};

	const handleTitleChange = event => {
		setTitle(event.target.value);
	};

	const handleYearChange = event => {
		setYear(event.target.value);
	};

	const handleCategoryChange = event => {
		setCategory(event.target.value);
	};

	const handleDescriptionChange = event => {
		setDescription(event.target.value);
	};

	const handleGoBack = () => {
		navigate("/");
	};

	return (
		<div className='add-movie-form-container'>
			<form onSubmit={handleSubmit} className='add-movie-form'>
				<div className='icon-container'>
					<FontAwesomeIcon icon={faFilm} size='2x' />
					<h2 className='form-heading'>New movie</h2>
					<FontAwesomeIcon icon={faFilm} size='2x' />
				</div>
				<div className='form-divider'></div>
				<div className='form-field'>
					<label htmlFor='title'>Title</label>
					<FormInput
						id='title'
						name='title'
						value={title}
						onChange={handleTitleChange}
						className='input-field'
					/>
				</div>
				<div className='form-field'>
					<label htmlFor='year'>Year</label>
					<FormInput
						id='year'
						name='year'
						value={year}
						onChange={handleYearChange}
						type='number'
						className='input-field'
					/>
				</div>
				<div className='form-field'>
					<label htmlFor='category'>Category</label>
					<FormSelect
						id='category'
						name='category'
						value={category}
						onChange={handleCategoryChange}
						options={[
							{ value: "", label: "-- Select category --" },
							{ value: "THRILLER", label: "Thriller" },
							{ value: "ACTION", label: "Action" },
							{ value: "DRAMA", label: "Drama" },
							{ value: "COMEDY", label: "Comedy" },
							{ value: "HORROR", label: "Horror" },
						]}
						className='input-field'
					/>
				</div>
				<div className='form-field'>
					<label htmlFor='description'>Description</label>
					<FormTextarea
						id='description'
						name='description'
						value={description}
						onChange={handleDescriptionChange}
						className='textarea-field'
					/>
				</div>
				<div className='form-field'>
					<label htmlFor='grade'>Grade</label>
					<StarRating
						name='grade'
						rating={grade}
						onRatingChange={handleRatingChange}
					/>
				</div>
				<div className='form-field'>
					<hr className='form-divider' />
					<div className='buttons'>
						<button type='submit' className='submit-button'>
							Add movie
						</button>
						<button className='go-back-button' onClick={handleGoBack}>
							Go back
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default AddMovieForm;
