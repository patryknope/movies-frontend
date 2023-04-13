import React from "react";
import MovieList from "./Components/MovieList";
import Header from "./Components/Header";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
      <Router>
      <div>
          <Header/>
        <MovieList />
      </div>
      </Router>
  );
}

export default App;