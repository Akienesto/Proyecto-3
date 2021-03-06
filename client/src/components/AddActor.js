import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom"

const AddActor = () => {
  const [actor, setActor] = useState({
    name: "",
    born: "",
    bio: "",
    // films:"",
    image: "",
    // characters:""
  })

  const [succesMessage, setSuccesMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const onChangeInput = event => {
    const { name, value } = event.target
    setActor({ ...actor, [name]: value })
  }

  const actorSubmit = async e => {
    e.preventDefault()
    try {
      const response = await axios.post("/api/newActor", { ...actor }, {
        headers: {
          "Authorization": token
        }
      })
      console.log(response)
      setSuccesMessage(response.data.message)
      setTimeout(() => {
        navigate("/actors")
      }, 3000)
    } catch (error) {
      setErrorMessage(error.response.data.message)
    }
  }

  return (
    <Form className='form1' onSubmit={actorSubmit} >
      <h2 className="headline">Añadir actor</h2>
      <div className="adds">
        <div className="add1">
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label className="text">Nombre</Form.Label>
            <Form.Control type="text" name="name" value={actor.name} placeholder="" onChange={onChangeInput} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text">Fecha de nacimiento</Form.Label>
            <Form.Control type="date" name="born" value={actor.born} placeholder="" onChange={onChangeInput} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="text">Biografía</Form.Label>
            <Form.Control type="text" name="bio" value={actor.bio} placeholder="" onChange={onChangeInput} />
          </Form.Group>
        </div>
        <div className="add2">
          {/* <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label className="text">Filmografía</Form.Label>
            <Form.Control type="text" name="films" value={actor.films} placeholder="" onChange={onChangeInput} />
          </Form.Group> */}

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label className="text">Imagen</Form.Label>
            <Form.Control type="text" name="image" value={actor.image} placeholder="" onChange={onChangeInput} />
          </Form.Group>

          {/* <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label className="text">Personajes</Form.Label>
            <Form.Control type="text" name="characters" value={actor.characters} placeholder="" onChange={onChangeInput} />
          </Form.Group> */}
        </div>

      </div>
      <div className="submit">
        <Button variant="primary" type="submit">
          Crear actor
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
export default AddActor;