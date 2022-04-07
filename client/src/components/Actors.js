import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Actors = () => {
    const [actors, setActors] = useState([])
    const token = localStorage.getItem("token")

    useEffect(() => {
        const getActors = async () => {
            const response = await axios.get("http://localhost:5000/api/allActors",{
                headers :{
                    "Authorization" : token
                }
            })
            console.log(response)
            setActors(response.data.allActors)
        }
        getActors()
    },[])


    return(
        <div>
        {
            actors.map(Actor =>{
                return(
                    <Link key={Actor._id} to={`/actors/${Actor._id}`}>
                    <div className="wrap">
                        <div className="divs">
                          <img src={Actor.image} className="images"/>
                        </div>
                        <div>
                          <h6 className="nombres">{Actor.name}</h6>
                        </div>
                    </div>
                    </Link>
                )
            })
        }
        </div>
    )
}

export default Actors