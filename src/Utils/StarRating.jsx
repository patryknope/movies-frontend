import React from "react";
import "../Styles/StarRating.css";

const StarRating = ({ name, rating, onRatingChange }) => {
	const stars = [];

	const handleClick = value => {
		onRatingChange(value);
	};

	const handleMouseOver = value => {
		const stars = document.querySelectorAll(".star-rating__star");
		stars.forEach((star, index) => {
			if (index < value) {
				star.classList.add("star-rating__star--hover");
			} else {
				star.classList.remove("star-rating__star--hover");
			}
		});
	};

	const handleMouseLeave = () => {
		const stars = document.querySelectorAll(".star-rating__star");
		stars.forEach(star => star.classList.remove("star-rating__star--hover"));
	};

	for (let i = 1; i <= 5; i++) {
		const starClass =
			rating >= i ? "star-rating__star--active" : "star-rating__star--inactive";
		stars.push(
			<span
				key={i}
				className={`star-rating__star ${starClass}`}
				onClick={() => handleClick(i)}
				onMouseOver={() => handleMouseOver(i)}
				onMouseLeave={() => handleMouseLeave()}>
				&#9733;
			</span>
		);
	}

	return (
		<div className='star-rating' onMouseLeave={() => handleMouseLeave()}>
			{stars}
		</div>
	);
};

export default StarRating;
