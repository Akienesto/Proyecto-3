import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ReadMore from "./ReadMore";

const Actor = () => {
    const { actorId } = useParams()
    const [prota, setActor] = useState({})
    const [films, setFilms] = useState([])
    const [bio, setBio] = useState([])
    const role = localStorage.getItem("role")
    const [succesMessage, setSuccesMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    useEffect(() => {
        const getActor = async () => {
            const response = await axios.get(`/api/getActor/${actorId}`)

            console.log(response)
            setActor(response.data.actor)
            setFilms(response.data.actor.films)
            setBio(response.data.actor.bio)
        }
        getActor()

    }, [])

    const deleteActor = async () => {
        try {
            const borrar = await axios.delete(`/api/deleteActor/${actorId}`, {
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
        <div className="actors">
            <h2 className="text">{prota.name}</h2>
            <div className="actorBio">
                <div>
                    <img src={prota.image} className="images1" />
                </div>
                <div className="actorBio1">
                    <p className="text"><ReadMore>{bio}</ReadMore></p>
                </div>
                {/* <p>{prota.characters}</p> */}
            </div>
            <div>
            <p className="text">Fecha de nacimiento : {prota.born}</p>
                <h2 className="filmografia text">Filmograf??a</h2>
                <div className="wrapActors">
                    {
                        films.map(pelis => {
                            return (
                                <Link key={pelis._id} to={`/movies/${pelis._id}`}>
                                    <div className="wrap1">
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
        <div className="actors">
            <h2 className="text">{prota.name}</h2>
            <div className="actorBio">
                <div>
                    <img src={prota.image} className="images1" />
                </div>
                <div className="actorBio1">
                    <p className="text"><ReadMore>{bio}</ReadMore></p>
                </div>
                {/* <p>{prota.characters}</p> */}
            </div>
            <div>
            <p className="text">Fecha de nacimiento : {prota.born}</p>
                <h2 className="filmografia text">Filmograf??a</h2>
                {
                    films.map(pelis => {
                        return (
                            <Link key={pelis._id} to={`/movies/${pelis._id}`}>
                                <div className="wrap1">
                                    <img src={pelis.image} className="images" />
                                    <h6 className="nombres">{pelis.title}</h6>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
            <div className="mods">
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
}



export default Actor;