import React from "react";

const Pagination = ({
	currentPage,
	totalPages,
	onPageChange,
	count,
	color,
	size,
	showFirstButton,
	showLastButton,
	className,
}) => {
	const handleChangePage = newPage => {
		if (newPage >= 1 && newPage <= totalPages) {
			onPageChange(newPage);
		}
	};

	const handlePreviousClick = () => {
		if (currentPage > 1) {
			handleChangePage(currentPage - 1);
		}
	};

	const handleNextClick = () => {
		if (currentPage < totalPages) {
			handleChangePage(currentPage + 1);
		}
	};

	return (
		<nav>
			{showFirstButton && currentPage > 1 && (
				<button className='page-link' onClick={handlePreviousClick}>
					Previous
				</button>
			)}

			{showLastButton && currentPage < totalPages && (
				<button className='page-link' onClick={handleNextClick}>
					Next
				</button>
			)}
		</nav>
	);
};

export default Pagination;
