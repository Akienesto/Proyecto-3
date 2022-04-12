import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Comment = () => {
    const {commentId} = useParams()
    const [comentario, setComment] = useState({})
    const [succesMessage, setSuccesMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")
    const navigate = useNavigate()
    const [user, setUser] = useState({})

    useEffect(() => {
        const getcomment = async()=>{
            const response = await axios.get(`/api/getComment/${commentId}`)
        
            console.log(response)
            setComment(response.data.comment)
            setUser(response.data.comment.user)
        }
        getcomment()
    
},[])

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
        <Link key={comentario._id} to={`/getComment/${comentario._id}`}>
            <div className="wrap">
                <div>
                <h6 className="text">{user.name}</h6>
                     <h6 className="text">{comentario.comment}</h6>
                </div>
            </div>
         </Link>
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
    <Link key={comentario._id} to={`/getComment/${comentario._id}`}>
        <div className="wrap">
            <div>
            <h6 className="text">{user.name}</h6>
                 <h6 className="text">{comentario.comment}</h6>
            </div>
        </div>
     </Link>
     <div className="mods">
            <Link key={comentario._id} to={`/modComment/${comentario._id}`}><button className="buttonMod">Modificar</button></Link>
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