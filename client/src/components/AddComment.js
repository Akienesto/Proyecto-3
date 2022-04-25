import React, { useState } from "react";
import  {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom"

const AddComment = () => {
    const {movieId} = useParams()
    // const [header, setHeader] = useState("")
    const [comment, setComment] = useState({})
    const [succesMessage, setSuccesMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    // const navigate = useNavigate()
    const token = localStorage.getItem("token")

    const onChangeInput = event => {
        const {name, value} = event.target
        setComment({...comment, [name]: value})
        // setHeader({...header, [name]: value})
    }

    const commentSubmit = async e => {
        e.preventDefault()
        try {
            const response = await axios.post(`/api/newComment/${movieId}`, {...comment},{
            headers:{
              "Authorization": token
            }
          })
            console.log(response)
            setSuccesMessage(response.data.message)
            // setTimeout(()=>{
            //   navigate("/movies")
            // },3000)
        } catch (error) {
            setErrorMessage(error.response.data.message)
        }
    }

    return (
    <Form className="comment" onSubmit={commentSubmit} >
      <div className="adds1">
      {/* <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label></Form.Label>
            <Form.Control type="text" name="header" value={header} placeholder="Añade un titular para el comentario" onChange={onChangeInput} />
          </Form.Group> */}
         <div className="form-group">
           <textarea className="textArea" rows="6" name="comment" value={comment.comment} placeholder="Añade tu comentario" onChange={onChangeInput}></textarea>
         </div>
        <div className="submit">
          <Button variant="primary" type="submit">
            Comentar
            </Button>
        </div>
          <div className="message_ok text" style={{display: succesMessage ? "block" : "none"}}>
          {succesMessage}
          </div>
          <div className="message_ok text" style={{display: errorMessage ? "block" : "none"}}>
          {errorMessage}
          </div>
       </div>      
     </Form>
          )
}
export default AddComment;