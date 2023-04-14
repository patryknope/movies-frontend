import React from "react";
import PropTypes from "prop-types";
import "../Styles/StarDisplay.css";

const StarDisplay = ({ rating }) => {
	const getStarSize = () => {
		if (window.innerWidth < 1800) {
			return 9;
		} else {
			return 20;
		}
	};

	const starSize = getStarSize();

	return (
		<div className='star-display'>
			{[...Array(rating)].map((e, i) => (
				<i key={i} className='fa fa-star' style={{ fontSize: starSize }}></i>
			))}
			{[...Array(5 - rating)].map((e, i) => (
				<i
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
