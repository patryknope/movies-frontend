import React from "react";
import MovieRow from "../Components/MovieRow";

function ListTable({ columns, data, upd }) {
	return (
		<table>
			<thead>
				<tr>
					{columns.map(column => (
						<th key={column}>{column}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.map(movie => (
					<MovieRow key={movie.id} movie={movie} upd={upd} />
				))}
			</tbody>
		</table>
	);
}

export default ListTable;
