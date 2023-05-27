import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieList from "./Components/MovieList";
import AddMovie from "./Components/AddMovieForm";
import Header from "./Components/Header";
import { searchMovies, addMovie } from "./service/Api";
import Modal from 'react-modal';


const customStyles = {
	content: {
	  top: '50%',
	  left: '50%',
	  right: 'auto',
	  bottom: 'auto',
	  marginRight: '-50%',
	  transform: 'translate(-50%, -50%)',
	},
  };



Modal.setAppElement('#root');

function App() {
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState({
		content: [],
		totalPages: 0,
	});

	const [modalIsOpen, setIsOpen] = React.useState(false);
	let subtitle;

	function openModal() {
	  setIsOpen(true);
	}
  
	function afterOpenModal() {
	  // references are now sync'd and can be accessed.
	  subtitle.style.color = '#f00';
	}
  
	function closeModal() {
	  setIsOpen(false);
	}


	function handleSearch(query) {
		setSearchQuery(query);
		if (query) {
			searchMovies(query).then(data => {
				setSearchResults(data);
			});
		} else {
			setSearchResults({ content: [], totalPages: 0 });
		}
	}

	async function handleAddMovie(data) {
		console.log(data);
		try {
			const addedMovie = await addMovie(data);
			console.log("Added movie:", addedMovie);
		} catch (error) {
			console.error("Failed to add movie:", error);
		}
	}

	return (
		<Router>
			<div>
			<Modal
				isOpen={modalIsOpen}
				onAfterOpen={afterOpenModal}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Example Modal"
			>
				<h2 ref={(_subtitle) => (subtitle = _subtitle)}>Login</h2>
				<button onClick={closeModal}>close</button>
				<form>
				<input placeholder="login"/>
				<input placeholder="password"/>
				<button>tab navigation</button>
				</form>
			</Modal>
				<Header onSearch={handleSearch} onLoginClick={openModal} />
				<Routes>
					<Route
						path='/'
						element={
							<MovieList
								searchResults={searchResults}
								setSearchResults={setSearchResults}
							/>
						}
					/>
					<Route
						path='/addmovie'
						element={<AddMovie onSubmit={handleAddMovie} />}
					/>
					<Route
						path='/movies'
						element={
							<MovieList
								searchResults={searchResults}
								setSearchResults={setSearchResults}
							/>
						}
					/>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
