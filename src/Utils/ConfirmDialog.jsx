import React, { useState } from "react";
import { CustomButton } from "../Utils/CustomButton";
import { Modal, Button } from "react-bootstrap";

const ConfirmDialog = ({ show, onConfirm, onCancel }) => {
	return (
		<Modal show={show} onHide={onCancel}>
			<Modal.Header closeButton>
				<Modal.Title>Confirmation</Modal.Title>
			</Modal.Header>
			<Modal.Body>Are you sure you want to populate movies?</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={onCancel}>
					Cancel
				</Button>
				<Button variant='primary' onClick={onConfirm}>
					Yes
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

const Header = () => {
	const [showDialog, setShowDialog] = useState(false);

	const handlePopulateMovies = async () => {
		setShowDialog(true);
	};

	const handleConfirm = async () => {
		await populateMovies();
		setShowDialog(false);
	};

	const handleCancel = () => {
		setShowDialog(false);
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
				<CustomButton text='Populate movies' onClick={handlePopulateMovies} />
			</div>
			<ConfirmDialog
				show={showDialog}
				onConfirm={handleConfirm}
				onCancel={handleCancel}
			/>
		</div>
	);
};

export default Header;
