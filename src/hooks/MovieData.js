import { useState } from "react";

export const useMovieData = () => {
  const [movieData, setMovieData] = useState({
    title: "",
    director: "",
    category: "",
    releaseYear: "",
    description: "",
  });

  return [movieData, setMovieData];
};