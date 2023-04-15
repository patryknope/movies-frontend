import React from "react";
import { Link } from "react-router-dom";
import StarDisplay from "../Utils/StarDisplay";
import "../Styles/Movies.css";

function MovieRow({ movie }) {
	return (
		<tr key={movie.id}>
			<td className='movie-title'>
				<Link to={`/movies/${movie.id}`}>{movie.title}</Link>
			</td>
			<td>{movie.year}</td>
			<td>{movie.category.toUpperCase()}</td>
			<td>
				<StarDisplay rating={movie.grade} />
			</td>
		</tr>
	);
}
export default MovieRow;
