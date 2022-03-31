import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const Movie = () => {
    const {movieId} = useParams()
    const [pelicula, setMovie] = useState({})
    const [cast, setCast] = useState([])
    const [score, setScore] = useState([])
    const [comment, setComment] = useState([])

    useEffect(() => {
        const getMovie = async()=>{
            const response = await axios.get(`http://localhost:5000/api/getMovie/${movieId}`)
        
            console.log(response)
            setMovie(response.data.movie)
            setCast(response.data.movie.cast)
            setScore(response.data.movie.score)
            setComment(response.data.movie.comment)
        }
        getMovie()
    
},[])

return(
    <div>
        <div className="header">
           <h2>{pelicula.title}</h2>
           <h2>{pelicula.year}</h2>
           {
                score.map(points =>{
                    return(
                        <div className="wrap">
                              <h6>{points.score}</h6>
                        </div>
                    )
                })
            }
        </div>
        <div className="poster">
            <div>
               <img src={pelicula.image} className="images1" alt="poster"/>
            </div>
            <div>
               <h4 className="argument">Argumento</h4> 
               <p className="argument">{pelicula.argument}</p>
            </div>
        </div>
        <div className="genre">
            <h4>{pelicula.genre}</h4>
        </div>
        <div className="">
            <h2 className="reparto">Reparto</h2>
        {
                cast.map(protas =>{
                    return(
                     <Link key={protas._id} to={`/actors/${protas._id}`}>
                        <div className="wrap">
                              <img src={protas.image} className="images"/>
                              <h6 className="nombres">{protas.name}</h6>
                        </div>
                     </Link>
                    )
                })
            }
        </div>
        <div className="addComment">
            <Link to={`/addComment/${pelicula._id}`}>
                <button>Añadir comentario</button>
            </Link>
        </div>
        <div>
        {
                comment.map(comentario =>{
                    return(
                        <div className="wrap">
                              <h6>{comentario.comment}</h6>
                        </div>
                    )
                })
            }
        </div>
    </div>
)
}



    export default Movie;