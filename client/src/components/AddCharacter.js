import React, { useState } from "react";
import  {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom"

const AddCharacter = () => {
    const [character, setCharacter] = useState({
        name:"",
        actors:"",
        bio:"",
        films:"",
        image:"",
        year:""
      })

    const [succesMessage, setSuccesMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    const onChangeInput = event => {
        const {name, value} = event.target
        setCharacter({...character, [name]: value})
    }

    const CharacterSubmit = async e => {
        e.preventDefault()
        try {
            const response = await axios.post("/api/newCharacter", {...character},{
            headers:{
              "Authorization": token
            }
          })
            console.log(response)
            setSuccesMessage(response.data.message)
            setTimeout(()=>{
              navigate("/characters")
            },3000)
        } catch (error) {
            setErrorMessage(error.response.data.message)
        }
    }

    return (
    <Form className='form1' onSubmit={CharacterSubmit} >
      <h2 className="headline">Añadir personaje</h2>
      <div className="adds">
        <div className="add1">
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label className="text">Nombre</Form.Label>
            <Form.Control type="text" name="name" value={character.name} placeholder="" onChange={onChangeInput} />
          </Form.Group>
        
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text">Fecha de creación</Form.Label>
            <Form.Control type="date" name="year" value={character.year} placeholder="" onChange={onChangeInput} />
          </Form.Group>
        
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="text">Biografía</Form.Label>
            <Form.Control type="text" name="bio" value={character.bio} placeholder="" onChange={onChangeInput} />
          </Form.Group>
        </div>
        <div className="add2">
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label className="text">Filmografía</Form.Label>
            <Form.Control type="text" name="films" value={character.films} placeholder="" onChange={onChangeInput} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label className="text">Imagen</Form.Label>
            <Form.Control type="text" name="image" value={character.image} placeholder="" onChange={onChangeInput} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label className="text">Actores</Form.Label>
            <Form.Control type="text" name="actors" value={character.actors} placeholder="" onChange={onChangeInput} />
          </Form.Group>
        </div>

      </div>
      <div className="submit">
          <Button variant="primary" type="submit">
            Crear personaje
            </Button>
        </div>
          <div className="message_ok text" style={{display: succesMessage ? "block" : "none"}}>
          {succesMessage}
          </div>
          <div className="message_ok text" style={{display: errorMessage ? "block" : "none"}}>
          {errorMessage}
          </div>
     </Form>
          )
}
export default AddCharacter;