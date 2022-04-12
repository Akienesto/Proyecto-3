import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import  {Form} from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar';
import Button from "react-bootstrap/Button";
import { FormControl } from "react-bootstrap";
import { DropdownButton } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "..//imagenes/logo.png"


function Navigation() {

  const role = localStorage.getItem("role")

const navbarUser = () => {
  return (
    <Navbar expand="lg" className="Navbar">
  <Container className="links">
      <div>
        <Navbar.Brand href="/"><img src={logo} className="logo"/></Navbar.Brand>
      </div>
      <div>
        <Nav.Link href="/Movies"><p className="text">Peliculas</p></Nav.Link>
      </div>
      <div>
        <Nav.Link href="/Actors"><p className="text">Actores</p></Nav.Link>
      </div>
      <div>
        <Nav.Link href="/characters"><p className="text">Personajes</p></Nav.Link>
      </div>
      <div>
        <DropdownButton align="end" title="Usuario" id="dropdown-menu-align-end" className="drop">
        <Link to = "/login" className="reg">Login</Link>
        <Link to = "/register" className="reg">Registrarse</Link>
        <Link to = "/user" className="reg">Perfil</Link>
        <Link to = "/addMovie" className="reg">Añadir película</Link>
        <Link to = "/addActor" className="reg">Añadir actor</Link>
        <Link to = "/addCharacter" className="reg">Añadir personaje</Link>
        <Dropdown.Divider />
        <Link to = "/logout" className="reg">Logout</Link>
        </DropdownButton>
      </div>
  </Container>
  <div >
   <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-success" className="text">Search</Button>
      </Form>
  </div>
</Navbar>
  )
}

const navbarAdmin = () => {
  return (
    <Navbar expand="lg" className="Navbar">
  <Container className="links">
      <div>
        <Navbar.Brand href="/"><img src={logo} className="logo"/></Navbar.Brand>
      </div>
      <div>
        <Nav.Link href="/Movies"><p className="text">Peliculas</p></Nav.Link>
      </div>
      <div>
        <Nav.Link href="/Actors"><p className="text">Actores</p></Nav.Link>
      </div>
      <div>
        <Nav.Link href="/characters"><p className="text">Personajes</p></Nav.Link>
      </div>
      <div>
        <DropdownButton align="end" title="Admin" id="dropdown-menu-align-end" className="drop">
        <Link to = "/addMovie" className="reg">Añadir película</Link>
        <Link to = "/addActor" className="reg">Añadir actor</Link>
        <Link to = "/addCharacter" className="reg">Añadir personaje</Link>
        <Dropdown.Divider />
        <Link to = "/logout" className="reg">Logout</Link>
        </DropdownButton>
        </div>
  </Container>
  <div >
   <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-success">Search</Button>
      </Form>
  </div>
</Navbar>
  )
}

const navbarLogin = () => {
  return (
    <Navbar expand="lg" className="Navbar">
    <Container className="links">
        <div>
          <Navbar.Brand href="/"><img src={logo} className="logo"/></Navbar.Brand>
        </div>
        <div>
          <Nav.Link href="/Movies"><p className="text">Peliculas</p></Nav.Link>
        </div>
        <div>
          <Nav.Link href="/Actors"><p className="text">Actores</p></Nav.Link>
        </div>
        <div>
        <Nav.Link href="/characters"><p className="text">Personajes</p></Nav.Link>
      </div>
        <div>
        <DropdownButton align="end" title="Iniciar sesión" id="dropdown-menu-align-end">
        <Link to = "/login" className="reg">Login</Link>
        <Link to = "/register" className="reg">Registrarse</Link>
        <Dropdown.Divider />
        <Link to = "/logout" className="reg">Logout</Link>
        </DropdownButton>
        </div>
  </Container>
  <div >
   <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-success">Search</Button>
      </Form>
  </div>
</Navbar>
  )
}
if (!role) return navbarLogin()
     else return (
      <div>
        {
          role == 0  ? navbarUser() : navbarAdmin()
          // !role ? navbarLogin() : navbarUser()
          // !role ? navbarLogin()
          }
      </div>
     
    )
  
}
export default Navigation;