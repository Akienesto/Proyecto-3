import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

const Movies = () => {
    const [movies, setMovies] = useState([])
    const token = localStorage.getItem("token")

    useEffect(() => {
        const getMovies = async () => {
            const response = await axios.get("http://localhost:5000/api/allMovies",{
                headers :{
                    "Authorization" : token
                }
            })
         
            console.log(response)
            setMovies(response.data.allMovies)
        }
        getMovies()
    },[])


    return(
        <div>
        {
            movies.map(pelicula =>{
                return(
                    <Link key={pelicula._id} to={`/movies/${pelicula._id}`}>
                    <div className="wrap">
                        <div className="divs">
                          <img src={pelicula.image} className="images"/>
                        </div>
                        <div>
                          <h6 className="nombres">{pelicula.title}</h6>
                        </div>
                    </div>
                    </Link>
                )
            })
        }
        </div>
    )
                    //        <Card style={{ width: '9rem' }} className="card">
                    //        <Card.Img variant="top" src={pelicula.image} className="images" />
                    //    <Card.Body className="cardBody">
                    //        <Card.Title className="titles">
                    //        <h6>{pelicula.title}</h6>
                    //        </Card.Title>
                    //          <Button variant="primary">List</Button>
                    //    </Card.Body>
                    //  </Card>
}

export default Movies