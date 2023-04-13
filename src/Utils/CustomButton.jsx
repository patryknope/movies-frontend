import React from 'react';
import { Button } from 'react-bootstrap';
import '../Styles/CustomButton.css';

export const CustomButton = ({ text }) => {
    return (
        <Button className="custom-btn">{text}</Button>
    );
};
