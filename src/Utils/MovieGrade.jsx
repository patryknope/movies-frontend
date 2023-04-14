import React, { useState } from "react";
import "../Styles/MovieGrade.css";

const MovieGrade = () => {
  const [grade, setGrade] = useState(0);

  const handleClick = (value) => {
    setGrade(value);
  };

  const renderStar = (value) => {
    if (value <= grade) {
      return <i className="fa fa-star fa-2x" onClick={() => handleClick(value)}></i>;
    } else {
      return <i className="far fa-star fa-2x" onClick={() => handleClick(value)}></i>;
    }
  };

  return (
    <div className="movie-grade">
      <div className="grade-stars">
        {renderStar(1)}
        {renderStar(2)}
        {renderStar(3)}
        {renderStar(4)}
        {renderStar(5)}
      </div>
      <div className="grade-label">{grade ? `You rated this movie ${grade} stars!` : "Please rate this movie"}</div>
    </div>
  );
};

export default MovieGrade;
