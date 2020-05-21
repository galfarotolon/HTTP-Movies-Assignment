import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";




const initialMovie = {
    id: '',
    title: "",
    director: "",
    metascore: '',
    stars: []
};

export const UpdateForm = (props) => {

    const { push } = useHistory();
    const [movie, setMovie] = useState(initialMovie);
    const { id } = useParams();


    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                // res.data
                setMovie(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    const changeHandler = e => {

        let value = e.target.value;


        setMovie({
            ...movie,
            [e.target.name]: value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        // make a PUT request to edit the item
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => {
                // res.data
                console.log(res.data)
                setMovie(initialMovie);
                push(`/`);
            })
            .catch(err => console.log(err));
    };


    return (
        <div className='updateForm'>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>

                <label  >Movie Title: &nbsp;

                <input
                        type="text"
                        name="title"
                        onChange={changeHandler}
                        placeholder="Movie Title..."
                        value={movie.title}
                    />
                </label>

                <label >Directed By: &nbsp;
                <input
                        type="string"
                        name="director"
                        onChange={changeHandler}
                        placeholder="Directed by..."
                        value={movie.director}
                    />
                </label>

                <label >Stars: &nbsp;
                <input className='stars'
                        type="string"
                        name="stars"
                        onChange={changeHandler}
                        placeholder="Stars..."
                        value={movie.stars}
                    />
                </label>


                <button className='update-btn'>Update Movie</button>
            </form>
        </div>
    );
};

export default UpdateForm;
