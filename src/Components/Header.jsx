import React from 'react';
import { CustomButton } from '../Utils/CustomButton';
import { useNavigate } from "react-router-dom";

const Header = () => {
    const history = useNavigate();

    const handleAddMovie = () => {
        history.push('/add-movie');
    };

    return (
        <div className="header">
            <h1>Movie Rating App</h1>
            <div className="header-buttons">
                <CustomButton text="List of movies" />
                <CustomButton text="Add movie" onClick={handleAddMovie} />
                <CustomButton text="Rate a movie" />
            </div>
        </div>
    );
};

export default Header;