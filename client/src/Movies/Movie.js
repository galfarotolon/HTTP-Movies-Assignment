import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";
import { UpdateForm } from './UpdateForm'

import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

function Movie({ addToSavedList, setMovieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const deleteMovie = () => {

    axios
      .delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then((res) => {
        console.log(res.data)
        push('/')


      })

      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div className='updateDeleteBtn'>
        <NavLink to={`/update-movie/${params.id}`}> <button className='update-btn'>Update</button></NavLink>
        <button className='delete-btn' onClick={deleteMovie}>Delete From List</button>

        <Route path="/update-movie/:id">

          <UpdateForm setMovieList={setMovieList} />
        </Route>

      </div>
    </div>
  );
}

export default Movie;
