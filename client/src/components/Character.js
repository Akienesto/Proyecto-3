import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ReadMore from "./ReadMore";

const Character = () => {
    const { characterId } = useParams()
    const [prota, setCharacter] = useState({})
    const [bio, setBio] = useState([])
    const [films, setFilms] = useState([])
    const [actores, setActores] = useState([])
    const role = localStorage.getItem("role")
    const [succesMessage, setSuccesMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    useEffect(() => {
        const getCharacter = async () => {
            const response = await axios.get(`/api/getCharacter/${characterId}`)

            console.log(response)
            setCharacter(response.data.character)
            setBio(response.data.character.bio)
            setFilms(response.data.character.films)
            setActores(response.data.character.actors)
        }
        getCharacter()

    }, [])

    const deleteCharacter = async () => {
        try {
            const borrar = await axios.delete(`/api/deleteCharacter/${characterId}`, {
                headers:
                {
                    "Authorization": token
                }
            })
            setSuccesMessage(borrar.data.message)
            setTimeout(() => {
                navigate("/characters")
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
                <p className="text">Fecha de creación : {prota.year}</p>
                <h2 className="filmografia text">Biografía</h2>
                <p className="text"><ReadMore>{bio}</ReadMore></p>
                <h2 className="filmografia text">Filmografía</h2>
                <div className="wrapFilms">
                    {
                        films.map(pelis => {
                            return (
                                <Link key={pelis._id} to={`/movies/${pelis._id}`}>
                                    <div className="wrapOne">
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
            <div>
                <h2 className="filmografia text">Actores</h2>
                {
                    actores.map(protas => {
                        return (
                            <Link key={protas._id} to={`/actors/${protas._id}`}>
                                <div className="wrap">
                                    <img src={protas.image} className="images" />
                                    <h6 className="nombres">{protas.name}</h6>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
            <div className="mods">
                <button onClick={deleteCharacter} className="buttonDel">Borrar</button>
                <Link key={prota._id} to={`/modCharacter/${prota._id}`}><button className="buttonMod">Modificar</button></Link>
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
                <p className="text"><ReadMore>{bio}</ReadMore></p>
                <p className="text">Fecha de creación : {prota.year}</p>
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
            <div>
                <h2 className="filmografia text">Actores</h2>
                {
                    actores.map(protas => {
                        return (
                            <Link key={protas._id} to={`/actors/${protas._id}`}>
                                <div className="wrap">
                                    <img src={protas.image} className="images" />
                                    <h6 className="nombres">{protas.name}</h6>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
            <div className="mods">
                <Link key={prota._id} to={`/modCharacter/${prota._id}`}><button className="buttonMod">Modificar</button></Link>
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



export default Character;