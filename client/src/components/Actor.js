import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const Actor = () => {
    const {actorId} = useParams()
    const [prota, setActor] = useState({})
    const [films, setFilms] = useState([])

    useEffect(() => {
        const getActor = async()=>{
            const response = await axios.get(`http://localhost:5000/api/getActor/${actorId}`)
        
            console.log(response)
            setActor(response.data.actor)
            setFilms(response.data.actor.films)
        }
        getActor()
    
},[])

return(
    <div className="actors">
        <h2>{prota.name}</h2>
        <img src={prota.image} className="images1"/>
        <p>{prota.bio}</p>
        {/* <p>{prota.characters}</p> */}
        <p>Birth day : {prota.born}</p>
        {/* <p>{prota.films}</p> */}
        <div>
            <h2 className="filmografia">Filmografía</h2>
        {
            films.map(pelis =>{
                return(
                    <Link key={pelis._id} to={`/movies/${pelis._id}`}>
                    <div className="wrapActors">
                        <div className="divs">
                          <img src={pelis.image} className="images"/>
                          <h6 className="nombres">{pelis.title}</h6>
                        </div>
                    </div>
                    </Link>
                )
            })
        }
        </div>
    </div>
 
)
}



    export default Actor;