import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Characters = () => {
    const [characters, setCharacters] = useState([])
    const token = localStorage.getItem("token")

    useEffect(() => {
        const getCharacters = async () => {
            const response = await axios.get("/api/allCharacters",{
                headers :{
                    "Authorization" : token
                }
            })
            console.log(response)
            setCharacters(response.data.allCharacters)
        }
        getCharacters()
    },[])


    return(
        <div>
        {
            characters.map(personaje =>{
                return(
                    <Link key={personaje._id} to={`/characters/${personaje._id}`}>
                    <div className="wrap">
                        <div className="divs">
                          <img src={personaje.image} className="images"/>
                        </div>
                        <div>
                          <h6 className="nombres">{personaje.name}</h6>
                        </div>
                    </div>
                    </Link>
                )
            })
        }
        </div>
    )
}

export default Characters