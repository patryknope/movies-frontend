import React, { useState } from "react";

const Page = ({ totalPages, currentPage, onPageChange }) => {
	const [pageInput, setPageInput] = useState(currentPage);

	const handlePageInput = event => {
		const value = event.target.value;
		if (!isNaN(value) && value >= 1 && value <= totalPages) {
			setPageInput(value);
		}
	};

	const handlePageSubmit = event => {
		event.preventDefault();
		onPageChange(parseInt(pageInput));
	};

	return (
		<div>
			<form onSubmit={handlePageSubmit}>
				<input type='number' value={pageInput} onChange={handlePageInput} />
				<button type='submit'>Go</button>
			</form>
		</div>
	);
};

export default Page;
