import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"

const ModComment = () => {
  const { commentId } = useParams()
  const [comment, setComment] = useState({})
  const [user, setUser] = useState([])
  const [UserName, setUserName] = useState([])
  const [movie, setMovie] = useState([])
  const [succesMessage, setSuccesMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  useEffect(() => {
      const getUser = async () => {
          const response = await axios.get(`/api/getUser`, {
              headers: {
                  "Authorization": token
              }
          })

          console.log(response)
          setUser(response.data.user)
      }
      getUser()

  }, [])

  useEffect(() => {
    const getComentario = async () => {
      const response = await axios.get(`/api/getComment/${commentId}`,)

      console.log(response)
      setComment(response.data.comment)
      setUserName(response.data.comment.user)
      setMovie(response.data.comment.movie)
    }
    getComentario()

  }, [])

  const onChangeInput = event => {
    const { name, value } = event.target
    setComment({ ...comment, [name]: value })
  }
  const commentSubmit = async e => {
    e.preventDefault()
    
      try {
        if (user._id === UserName._id) {
        const response = await axios.put(`/api/modifyComment/${commentId}`, { ...comment }, {
          headers: {
            "Authorization": token
          }
        })
        console.log(response)
        setSuccesMessage(response.data.message)
        setTimeout(() => {
          navigate(`/movies/${movie}`)
        }, 1000)
        setComment(response.data.comment)
      }
      } catch (error) {
        setErrorMessage(error.response.data.message)
      }
  }

  return (
    <Form onSubmit={commentSubmit} >
      <div className="adds1">
        <div>
          <textarea type="text" className="textArea" rows="6" name="comment" value={comment.comment} onChange={onChangeInput}>{comment.comment}</textarea>
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