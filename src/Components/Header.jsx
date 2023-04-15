import React, { useState } from "react";
import { CustomButton } from "../Utils/CustomButton";
import { Link } from "react-router-dom";
import "../Styles/Header.css";
import { Modal, Button } from "react-bootstrap";
import { populateMovies, deleteAllMovies } from "../service/Api.js";
import SearchBar from "./SearchBar";

const Header = ({ onSearch }) => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handlePopulateMovies = async () => {
		await populateMovies();
		handleClose();
	};

	const handleDeleteAllMovies = async () => {
		await deleteAllMovies();
		handleClose();
	};

	return (
		<div className='header'>
			<h1>Movie Rating App</h1>
			<div className='header-buttons'>
				<Link to='/addmovie'>
					<CustomButton text='Add movie' />
				</Link>
				<Link to='/movies'>
					<CustomButton text='List of movies' />
				</Link>
				<CustomButton text='Populate movies' onClick={handleShow} />
				<CustomButton
					text='Delete all movies'
					onClick={handleDeleteAllMovies}
				/>
				<Modal show={show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Populate/Delete Movies</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						Are you sure you want to populate the list of movies? It will
						generate 20 movies defined in the back-edn
					</Modal.Body>
					<Modal.Footer>
						<Button variant='secondary' onClick={handleClose}>
							Cancel
						</Button>
						<Button variant='danger' onClick={handleDeleteAllMovies}>
							Delete All Movies
						</Button>
						<Button variant='primary' onClick={handlePopulateMovies}>
							Populate Movies
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
			<div className='header-search'>
				<SearchBar onSearch={onSearch} />
			</div>
		</div>
	);
};

export default Header;
