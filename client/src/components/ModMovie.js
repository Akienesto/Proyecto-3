import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"

const ModMovie = () => {
  const { movieId } = useParams()
  const [movie, setMovie] = useState({
    title: "",
    year: "",
    argument: "",
    // cast:"",
    genre: "",
    image: "",
    // characters:""
  })
  const [succesMessage, setSuccesMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  useEffect(() => {
    const getMod = async () => {
        const response = await axios.get(`/api/getMovie/${movieId}`,)

        console.log(response)
        setMovie(response.data.movie)
    }
    getMod()

}, [])

  const onChangeInput = event => {
    const { name, value } = event.target
    setMovie({ ...movie, [name]: value })
  }

  const movieSubmit = async event => {
    event.preventDefault()
    try {
      const response = await axios.put(`/api/modifyMovie/${movieId}`, { ...movie }, {
        headers: {
          "Authorization": token
        }
      })
      console.log(response)
      setSuccesMessage(response.data.message)
      setTimeout(() => {
        navigate(`/movies/${movieId}`)
      }, 1000)
    } catch (error) {
      setErrorMessage(error.response.data.message)
    }
  }

  return (
    <Form className='form1' onSubmit={movieSubmit} >
      <div className="adds">
        <div className="add1">
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label className="text">Título</Form.Label>
            <Form.Control type="text" name="title" value={movie.title} placeholder="" onChange={onChangeInput} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text">Año</Form.Label>
            <Form.Control type="text" name="year" value={movie.year} placeholder="" onChange={onChangeInput} />
          </Form.Group>

          {/* <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="text">Argumento</Form.Label>
            <Form.Control type="text" name="argument" value={movie.argument} placeholder="" onChange={onChangeInput} />
          </Form.Group> */}
        </div>
        <div className="">
          <p className="text">Argumento</p>
          <textarea type="text" className="textArea1" rows="5" name="argument" value={movie.argument} onChange={onChangeInput}>{ }</textarea>
        </div>
        <div className="add2">
          {/* <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label className="text">Reparto</Form.Label>
              <Form.Control type="text" name="cast" value={movie.cast} placeholder="" onChange={onChangeInput} />
            </Form.Group> */}

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label className="text">Género</Form.Label>
            <Form.Control type="text" name="genre" value={movie.genre} placeholder="" onChange={onChangeInput} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label className="text">Imagen</Form.Label>
            <Form.Control type="text" name="image" value={movie.image} placeholder="" onChange={onChangeInput} />
          </Form.Group>

          {/* <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label className="text">Personajes</Form.Label>
              <Form.Control type="text" name="characters" value={movie.characters} placeholder="" onChange={onChangeInput} />
            </Form.Group> */}
        </div>

      </div>
      <div className="submit">
        <Button variant="primary" type="submit">
          Modificar película
        </Button>
      </div>
      <div className="message_ok text" style={{ display: succesMessage ? "block" : "none" }}>
        {succesMessage}
      </div>
      <div className="message_ok text" style={{ display: errorMessage ? "block" : "none" }}>
        {errorMessage}
      </div>
    </Form>
  )
}
export default ModMovie;