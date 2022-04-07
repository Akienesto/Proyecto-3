import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

const Login = () => {
    const [user, setUser] = useState({
        email:"",
        password:""
    })

    const [succesMessage, setSuccesMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    // const navigate = useNavigate()

    const onChangeInput = event => {
        const {name, value} = event.target
        setUser({...user, [name]: value})
    }

    const loginSubmit = async e => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:5000/api/login", {...user})
            console.log(response)
            setSuccesMessage(response.data.message)
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("role", response.data.user.role)
            // localStorage.setItem("_id", response.data._id)
            // setTimeout(()=>{
              // navigate("/home")
              window.location.href=`/`
            // },3000)
        } catch (error) {
            setErrorMessage(error.response.data.message)
        }
    }
  return (
<Form className='login' onSubmit={loginSubmit}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label className="text">Email</Form.Label>
    <Form.Control type="email" name="email" value={user.email} placeholder="Introduce tu email" onChange={onChangeInput} />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label className="text">Contraseña</Form.Label>
    <Form.Control type="password" name="password" value={user.password} placeholder="Contraseña" onChange={onChangeInput} />
  </Form.Group>
  <Button variant="primary" type="submit" className='submit'>
    Login
  </Button>
  <div className="message_ok text" style={{display: succesMessage ? "block" : "none"}}>
          {succesMessage}
          </div>
          <div className="message_ok text" style={{display: errorMessage ? "block" : "none"}}>
          {errorMessage}
          </div>
</Form>
  )
}

export default Login;