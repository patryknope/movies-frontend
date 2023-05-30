import React from "react";
import PropTypes from "prop-types";
import "../Styles/StarDisplay.css";
import {gradeSet} from "../service/Api"

const StarDisplay = ({ rating, movieid, upd }) => {
	const getStarSize = () => {
		if (window.innerWidth < 1800) {
			return 9;
		} else {
			return 20;
		}
	};

	const starSize = getStarSize();


	const updateGrade = (movied, grade) => {
		gradeSet(movied, grade)
	}

	return (
		<div className='star-display' data-movieid={movieid}>
			{[...Array(rating)].map((e, i) => (
				<i key={i} className='fa fa-star' style={{ fontSize: starSize }} onClick={() => updateGrade(movieid, (i+1))
				}></i>
			))}
			{[...Array(5 - rating)].map((e, i) => (
				<i
				onClick={() => updateGrade(movieid, i+rating+1)}
					key={i + rating}
					className='fa fa-star-o'
					style={{ fontSize: starSize }}></i>
			))}
		</div>
	);
};

StarDisplay.propTypes = {
	rating: PropTypes.number.isRequired,
};

export default StarDisplay;
