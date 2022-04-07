import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Actor = () => {
    const { actorId } = useParams()
    const [prota, setActor] = useState({})
    const [films, setFilms] = useState([])
    const role = localStorage.getItem("role")
    const [succesMessage, setSuccesMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    useEffect(() => {
        const getActor = async () => {
            const response = await axios.get(`http://localhost:5000/api/getActor/${actorId}`)

            console.log(response)
            setActor(response.data.actor)
            setFilms(response.data.actor.films)
        }
        getActor()

    }, [])

    const deleteActor = async () => {
        try {
            const borrar = await axios.delete(`http://localhost:5000/api/deleteActor/${actorId}`, {
                headers:
                {
                    "Authorization": token
                }
            })
            setSuccesMessage(borrar.data.message)
            setTimeout(() => {
                navigate("/actors")
            }, 3000)
        } catch (error) {
            setErrorMessage(error.borrar.data.message)
        }
    }

    if (role == 1) return (
        <div>
            <div className="actors">
                <h2 className="text">{prota.name}</h2>
                <img src={prota.image} className="images1" />
                <p className="text">{prota.bio}</p>
                {/* <p>{prota.characters}</p> */}
                <p className="text">Fecha de nacimiento : {prota.born}</p>
                {/* <p>{prota.films}</p> */}
                <h2 className="filmografia text">Filmografía</h2>
                <div className="wrapActors">
                    {
                        films.map(pelis => {
                            return (
                                <Link key={pelis._id} to={`/movies/${pelis._id}`}>
                                    <div className="wrap">
                                        <div className="divs">
                                            <img src={pelis.image} className="images" />
                                            <h6 className="nombres">{pelis.title}</h6>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
            <div className="mods">
                <button onClick={deleteActor} className="buttonDel">Borrar</button>
                <Link key={prota._id} to={`/modActor/${prota._id}`}><button className="buttonMod">Modificar</button></Link>
            </div>
            <div className="message_ok text" style={{ display: succesMessage ? "block" : "none" }}>
                {succesMessage}
            </div>
            <div className="message_ok text" style={{ display: errorMessage ? "block" : "none" }}>
                {errorMessage}
            </div>
        </div>
    )

    else return (
        <div>
            <div className="actors">
            <h2 className="text">{prota.name}</h2>
            <img src={prota.image} className="images1" />
            <p className="text">{prota.bio}</p>
            {/* <p>{prota.characters}</p> */}
            <p className="text">Fecha de nacimiento : {prota.born}</p>
            {/* <p>{prota.films}</p> */}
            </div>
            <div>
                <h2 className="filmografia text">Filmografía</h2>
                {
                    films.map(pelis => {
                        return (
                            <Link key={pelis._id} to={`/movies/${pelis._id}`}>
                                    <div className="wrap">
                                        <img src={pelis.image} className="images" />
                                        <h6 className="nombres">{pelis.title}</h6>
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