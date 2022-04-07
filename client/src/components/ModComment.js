import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom"

const ModComment = () => {
  const { commentId } = useParams()
  const [comment, setComment] = useState({})
  const [succesMessage, setSuccesMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const token = localStorage.getItem("token")
  // const navigate = useNavigate()

  const onChangeInput = event => {
    const { name, value } = event.target
    setComment({ ...comment, [name]: value })
  }

  const commentSubmit = async e => {
    e.preventDefault()
    try {
      const response = await axios.put(`http://localhost:5000/api/modifyComment/${commentId}`, { ...comment }, {
        headers: {
          "Authorization": token
        }
      })
      console.log(response)
      setSuccesMessage(response.data.message)
      // setTimeout(()=>{
      //   navigate("/${commentId}")
      // },3000)
    } catch (error) {
      setErrorMessage(error.response.data.message)
    }
  }

  return (
    <Form onSubmit={commentSubmit} >
      <div className="adds">
        <div>
          <textarea type="text" className="textArea" rows="6" name="comment" value={comment.comment} onChange={onChangeInput}></textarea>
        </div>
        <div className="submit">
          <Button variant="primary" type="submit">
            Modificar comentario
          </Button>
        </div>
        <div>
          <div className="message_ok text" style={{ display: succesMessage ? "block" : "none" }}>
            {succesMessage}
          </div>
          <div className="message_ok text" style={{ display: errorMessage ? "block" : "none" }}>
            {errorMessage}
          </div>
        </div>
      </div>
    </Form>
  )
}
export default ModComment;