import React, { useState } from "react";
import  {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom"

const AddActor = () => {
    const [actor, setActor] = useState({
        name:"",
        born:"",
        bio:"",
        films:"",
        image:"",
        characters:""
    })

    const [succesMessage, setSuccesMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    // const navigate = useNavigate()

    const onChangeInput = event => {
        const {name, value} = event.target
        setActor({...actor, [name]: value})
    }

    const registerSubmit = async e => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:5000/api/newActor", {...actor})
            console.log(response)
            setSuccesMessage(response.data.message)
            // setTimeout(()=>{
            //   navigate("/actors")
            // },3000)
        } catch (error) {
            setErrorMessage(response.data.message)
        }
    }

    return (
    <Form className='form1' onSubmit={registerSubmit} >
      <div className="adds">
        <div className="add1">
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" name="name" value={actor.name} placeholder="" onChange={onChangeInput} />
          </Form.Group>
        
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Fecha de nacimiento</Form.Label>
            <Form.Control type="text" name="born" value={actor.born} placeholder="" onChange={onChangeInput} />
          </Form.Group>
        
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Biografía</Form.Label>
            <Form.Control type="text" name="bio" value={actor.bio} placeholder="" onChange={onChangeInput} />
          </Form.Group>
        </div>
        <div className="add2">
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Filmografía</Form.Label>
            <Form.Control type="text" name="films" value={actor.films} placeholder="" onChange={onChangeInput} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Imagen</Form.Label>
            <Form.Control type="text" name="image" value={actor.image} placeholder="" onChange={onChangeInput} />
          </Form.Group>

          {/* <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Personajes</Form.Label>
            <Form.Control type="text" name="characters" value={actor.characters} placeholder="" onChange={onChangeInput} />
          </Form.Group> */}
        </div>

      </div>
      <div className="submit">
          <Button variant="primary" type="submit">
            Crear película
            </Button>
        </div>
          <div className="message_ok" style={{display: succesMessage ? "block" : "none"}}>
          {succesMessage}
          </div>
          <div className="message_ok" style={{display: errorMessage ? "block" : "none"}}>
          {errorMessage}
          </div>
     </Form>
          )
}
export default AddActor;