import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card'

const Comment = () => {
    const { commentId } = useParams()
    const [comentario, setComment] = useState({})
    const [succesMessage, setSuccesMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")
    const navigate = useNavigate()
    const [user, setUser] = useState({})

    useEffect(() => {
        const getcomment = async () => {
            const response = await axios.get(`/api/getComment/${commentId}`)

            console.log(response)
            setComment(response.data.comment)
            setUser(response.data.comment.user)
        }
        getcomment()

    }, [])

    const deleteComment = async () => {
        try {
            const borrar = await axios.delete(`/api/deleteComment/${commentId}`, {
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

    if (role == 1) return (
        <div>
            <div className="cards">
                <Link to={`/getComment/${comentario._id}`} className="deco">
                    <Card border="warning" className="card1" bg={`dark`}>
                        <Card.Header className="text">{comentario.name}</Card.Header>
                        <Card.Body className="">
                            {/* <Card.Title></Card.Title> */}
                            <Card.Text className="text">{comentario.comment}</Card.Text>
                        </Card.Body>
                    </Card>
                    <br />
                </Link>
            </div>
            <div className="mods">
                <button onClick={deleteComment} className="buttonDel">Borrar</button>
                {/* <Link key={comment._id} to={`/modComment/${comment._id}`}><button className="buttonMod">Modificar</button></Link> */}
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
            <div className="cards">
                <Link to={`/getComment/${comentario._id}`} className="deco">
                    <Card border="warning" className="card1" bg={`dark`}>
                        <Card.Header className="text">{comentario.name}</Card.Header>
                        <Card.Body>
                            {/* <Card.Title></Card.Title> */}
                            <Card.Text className="text">{comentario.comment}</Card.Text>
                        </Card.Body>
                    </Card>
                    <br />
                </Link>
            </div>
            <div className="mods">
                <Link  to={`/modComment/${comentario._id}`}><button className="buttonMod">Modificar</button></Link>
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
        <div className="wrap">
            <p className="text">{comentario.comment}</p>
        </div>
    )
}



export default Comment;