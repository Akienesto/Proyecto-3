import React, { useEffect, useState } from "react";
import axios from "axios";

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
                        <div key={pelicula._id} className="movies">
                            <div>
                            <img src={pelicula.image} className="images"/>
                            </div>
                            <div className="titles">
                            <h5>{pelicula.title}</h5>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Movies