import React, { useState } from "react";
import  {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom"

const Register = () => {
    const [user, setUser] = useState({
        name:"",
        email:"",
        password:""
    })

    const [succesMessage, setSuccesMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const navigate = useNavigate()

    const onChangeInput = event => {
        const {name, value} = event.target
        setUser({...user, [name]: value})
    }

    const registerSubmit = async e => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:5000/api/newUser", {...user})
            console.log(response)
            setSuccesMessage(response.data.message)
            setTimeout(()=>{
              navigate("/login")
            },3000)
        } catch (error) {
            setErrorMessage(error.response.data.message)
        }
    }

    return (
    <Form className='form' onSubmit={registerSubmit} >
      <div className="register">
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" name="name" value={user.name} placeholder="Introduce tu nombre" onChange={onChangeInput} />
          </Form.Group>
        
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={user.email} placeholder="Introduce tu email" onChange={onChangeInput} />
            <Form.Text className="text-muted">No compartiremos tu email.</Form.Text>
          </Form.Group>
        
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" name="password" value={user.password} placeholder="Contraseña" onChange={onChangeInput} />
          </Form.Group>

          <Button variant="primary" type="submit" className="submit">
            Registrarse
            </Button>
          <div className="message_ok" style={{display: succesMessage ? "block" : "none"}}>
          {succesMessage}
          </div>
          <div className="message_ok" style={{display: errorMessage ? "block" : "none"}}>
          {errorMessage}
          </div>
      </div>
     </Form>
          )
}
export default Register;