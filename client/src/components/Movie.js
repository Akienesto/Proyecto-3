import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import estrella from "..//imagenes/estrella.png"
import Card from 'react-bootstrap/Card'
import ReadMore from "./ReadMore";
import ReadMoreCom from "./ReadMoreCom";

const Movie = () => {
    const { movieId } = useParams()
    const [movie, setMovie] = useState([])
    const [cast, setCast] = useState([])
    const [score, setScore] = useState([])
    const [points, setPoints] = useState([])
    const [comment, setComment] = useState([])
    const [arg, setArg] = useState([])
    const [likes, setLikes] = useState([])
    const role = localStorage.getItem("role")
    const [succesMessage, setSuccesMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    useEffect(() => {
        const getMovie = async () => {
            const response = await axios.get(`/api/getMovie/${movieId}`,)

            console.log(response)
            setMovie(response.data.movie)
            setCast(response.data.movie.cast)
            setScore(response.data.movie.score)
            setComment(response.data.movie.comment)
            setLikes(response.data.movie.likes)
            setPoints(response.data.movie.score.score)
            setArg(response.data.movie.argument)
        }
        getMovie()

    }, [])

    const deleteMovie = async () => {
        try {
            const borrar = await axios.delete(`/api/deleteMovie/${movieId}`, {
                headers:
                {
                    "Authorization": token
                }
            })
            setSuccesMessage(borrar.data.message)
            setTimeout(() => {
                navigate("/movies")
            }, 3000)
        } catch (error) {
            setErrorMessage(error.borrar.data.message)
        }
    }

    const addList = async () => {
        try {
            const res2 = await axios.post(`/api/list/${movieId}`, { ...movieId }, {
                headers: {
                    "Authorization": token
                }
            })
            setSuccesMessage(res2.data.message)
        } catch (error) {
            setErrorMessage(error.message)
        }

    }

    function ArrayAvg(myArray) {
        let i = 0, summ = 0, ArrayLen = myArray.length;
        while (i < ArrayLen) {
            summ = summ + myArray[i++];
        }
        return summ / ArrayLen;
    }
    let myArray = [points];
    let media = ArrayAvg(myArray);
    console.log(media)

    // let sumatoriaObjeto = points.reduce(function(acumulador, siguienteValor){
    //     return {
    //       points: acumulador.points + siguienteValor.points
    //     };
    //   }, {points: 0});

    //   let promedioEdad = sumatoriaObjeto.points / points.length;
    //   console.log(promedioEdad)

    // function mediaCalc(list){
    //     const sumList = list.reduce(function(valuesAc = 0, newElement){
    //         return valuesAc + newElement;
    //     });

    //     const media = sumList / list.length;

    //     return media;
    // }

    // console.log(mediaCalc([points]))

    if (role == 1) return (
        <div>
            <div className="header">
                <h2 className="text">{movie.title}</h2>
                <h2 className="text">{movie.year}</h2>
            </div>
            <div className="score">
                <div className="lista">
                    <button onClick={addList} className="buttonCom">Favoritos</button>
                </div>
                <div>
                    {
                        score.map(points => {
                            return (
                                <div className="stars">
                                    <img src={estrella} alt="estrella" className="estrella" />
                                    <h5 className="text points">{points.score}/10</h5>
                                </div>
                            )
                        })
                    }
                </div>
                <Link to={`/newScore/${movie._id}`}>
                    <button className="buttonScore">Puntuar</button>
                </Link>
            </div>
            <div className="messages">
                <div className="message_ok text" style={{ display: succesMessage ? "block" : "none" }}>
                    {succesMessage}
                </div>
                <div className="message_ok text" style={{ display: errorMessage ? "block" : "none" }}>
                    {errorMessage}
                </div>
            </div>
            <div className="poster">
                <div>
                    <img src={movie.image} className="images1" alt="poster" />
                </div>
                <div className="">
                    <h4 className="argument text">Argumento</h4>
                    <p className="argument text"><ReadMore>{arg}</ReadMore></p>
                </div>
            </div>
            <div className="genre">
                <h4 className="text">{movie.genre}</h4>
            </div>
            <div>
                <h2 className="reparto text">Reparto</h2>
                {
                    cast.map(protas => {
                        return (
                            <Link to={`/actors/${protas._id}`}>
                                <div className="wrap">
                                    <img src={protas.image} className="images" />
                                    <h6 className="nombres">{protas.name}</h6>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
            <div className="addComment">
                <Link to={`/addComment/${movie._id}`}>
                    <button className="buttonCom comentario"> + Añade tu comentario</button>
                </Link>
                {/* <AddComment /> */}
            </div>
            <h2 className="argument text">Comentarios</h2>
            <div>
            {
                    comment.map(comentario => {
                        return (
                            <div className="cards">
                                <Link to={`/getComment/${comentario._id}`} className="deco">
                                    <Card border="warning" style={{ width: '18rem' }} bg={`dark`}>
                                        <Card.Header className="text">{comentario.name}</Card.Header>
                                        <Card.Body className="cardBody">
                                            {/* <Card.Title></Card.Title> */}
                                            <Card.Text className="text"><ReadMoreCom>{comentario.comment}</ReadMoreCom></Card.Text>
                                        </Card.Body>
                                    </Card>
                                    <br />
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
            <div className="mods">
                <button onClick={deleteMovie} className="buttonDel">Borrar</button>
                <Link key={movie._id} to={`/modMovie/${movie._id}`}><button className="buttonMod">Modificar</button></Link>
            </div>
            <div className="message_ok text" style={{ display: succesMessage ? "block" : "none" }}>
                {succesMessage}
            </div>
            <div className="message_ok text" style={{ display: errorMessage ? "block" : "none" }}>
                {errorMessage}
            </div>
        </div>
    )

    if (role == 0) return (
        <div>
            <div className="header">
                <h2 className="text">{movie.title}</h2>
                <h2 className="text">{movie.year}</h2>
            </div>
            <div className="score">
                <div className="lista">
                    <button onClick={addList} className="buttonCom">Favoritos</button>
                </div>
                <div>
                    {/* {
                        score.map(points => {
                            return (
                                <div className="stars">
                                    <img src={estrella} alt="estrella" className="estrella" />
                                    <h5 className="text points">{points.score}/10</h5>
                                </div>
                            )
                        })
                    } */}
                    <div className="stars">
                        <img src={estrella} alt="estrella" className="estrella" />
                        <h5 className="text points">{media}/10</h5>
                    </div>
                </div>
                <Link to={`/newScore/${movie._id}`}>
                    <button className="buttonScore">Puntuar</button>
                </Link>
            </div>
            <div className="messages">
                <div className="message_ok text" style={{ display: succesMessage ? "block" : "none" }}>
                    {succesMessage}
                </div>
                <div className="message_ok text" style={{ display: errorMessage ? "block" : "none" }}>
                    {errorMessage}
                </div>
            </div>
            <div className="poster">
                <div>
                    <img src={movie.image} className="images1" alt="poster" />
                </div>
                <div className="">
                    <h4 className="argument text">Argumento</h4>
                    <p className="argument text"><ReadMore>{arg}</ReadMore></p>
                </div>
            </div>
            <div className="genre">
                <h4 className="text">{movie.genre}</h4>
            </div>
            <div className="">
                <h2 className="reparto text">Reparto</h2>
                {
                    cast.map(protas => {
                        return (
                            <Link to={`/actors/${protas._id}`}>
                                <div className="wrap">
                                    <img src={protas.image} className="images" />
                                    <h6 className="nombres">{protas.name}</h6>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
            <div className="addComment">
                <Link to={`/addComment/${movie._id}`}>
                    <button className="buttonCom comentario"> + Añade tu comentario</button>
                </Link>
            </div>
            <h2 className="argument text">Comentarios</h2>
            <div>
                {
                    comment.map(comentario => {
                        return (
                            <div className="cards">
                                <Link to={`/getComment/${comentario._id}`} className="deco">
                                    <Card border="warning" style={{ width: '18rem' }} bg={`dark`}>
                                        <Card.Header className="text">{comentario.name}</Card.Header>
                                        <Card.Body className="cardBody">
                                            {/* <Card.Title></Card.Title> */}
                                            <Card.Text className="text"><ReadMoreCom>{comentario.comment}</ReadMoreCom></Card.Text>
                                        </Card.Body>
                                    </Card>
                                    <br />
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
            <div className="mods">
                <Link key={movie._id} to={`/modMovie/${movie._id}`}><button className="buttonMod">Modificar película</button></Link>
            </div>
            <div className="message_ok text" style={{ display: succesMessage ? "block" : "none" }}>
                {succesMessage}
            </div>
            <div className="message_ok text" style={{ display: errorMessage ? "block" : "none" }}>
                {errorMessage}
            </div>
        </div>

    )

    if (!role) return (
        <div>
            <div className="header">
                <h2 className="text">{movie.title}</h2>
                <h2 className="text">{movie.year}</h2>
            </div>
            <div className="score">
                <div className="lista">
                    <Link to={`/register`}><button className="buttonCom">Favoritos</button>  </Link>
                </div>
                <div>
                    {
                        score.map(points => {
                            return (
                                <div className="stars">
                                    <img src={estrella} alt="estrella" className="estrella" />
                                    <h5 className="text points">{points.score}/10</h5>
                                </div>
                            )
                        })
                    }
                </div>
                <Link to={`/register`}>
                    <button className="buttonScore">Puntuar</button>
                </Link>
            </div>
            <div className="messages">
                <div className="message_ok text" style={{ display: succesMessage ? "block" : "none" }}>
                    {succesMessage}
                </div>
                <div className="message_ok text" style={{ display: errorMessage ? "block" : "none" }}>
                    {errorMessage}
                </div>
            </div>
            <div className="poster">
                <div>
                    <img src={movie.image} className="images1" alt="poster" />
                </div>
                <div>
                    <h4 className="argument text">Argumento</h4>
                    <p className="argument text">{movie.argument}</p>
                </div>
            </div>
            <div className="genre">
                <h4 className="text">{movie.genre}</h4>
            </div>
            <div className="">
                <h2 className="reparto text">Reparto</h2>
                {
                    cast.map(protas => {
                        return (
                            <Link to={`/actors/${protas._id}`}>
                                <div className="wrap">
                                    <img src={protas.image} className="images" />
                                    <h6 className="nombres">{protas.name}</h6>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
            <div className="addComment">
                <Link to={`/register`}>
                    <button className="buttonCom comentario"> + Añade tu comentario</button>
                </Link>
            </div>
            <h2 className="argument text">Comentarios</h2>
            <div>
                {
                    comment.map(comentario => {
                        return (
                            <div className="cards">
                                <Link to={`/getComment/${comentario._id}`} className="deco">
                                    <Card border="warning" style={{ width: '18rem' }} bg={`dark`}>
                                        <Card.Header className="text">{comentario.name}</Card.Header>
                                        <Card.Body className="cardBody">
                                            {/* <Card.Title></Card.Title> */}
                                            <Card.Text className="text">{comentario.comment}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                    <br />
                                </Link>
                                {/* <Link to={`/getComment/${comentario._id}`} className="deco">
                                <p className="text">{comentario.name}</p>
                                <p className="text">{comentario.comment}</p>
                            </Link> */}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}



export default Movie;