import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import  {Form} from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar';
import Button from "react-bootstrap/Button";
import { FormControl } from "react-bootstrap";
import { DropdownButton } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";


function Navigation() {

  const role = localStorage.getItem("role")

const navbarUser = () => {
  return (
    <Navbar bg="light" expand="lg" className="Navbar">
  <Container>
        <Navbar.Brand href="#action1">Logo</Navbar.Brand>
        <Nav.Link href="/Movies">Peliculas</Nav.Link>
        <Nav.Link href="/Actors">Actores</Nav.Link>
        {/* <Navbar.Brand href="#action4">Registrarse</Navbar.Brand> */}
        <DropdownButton align="end" title="Usuario" id="dropdown-menu-align-end">
        <Link to = "/login" className="reg">Login</Link>
        <Link to = "/register" className="reg">Registrarse</Link>
        <Link to = "/" className="reg">Perfil</Link>
        <Link to = "/addMovie" className="reg">Añadir película</Link>
        <Link to = "/addActor" className="reg">Añadir actor</Link>
        <Dropdown.Divider />
        <Link to = "/" className="reg">Logout</Link>
         {/* <Dropdown.Item eventKey="2">Perfil</Dropdown.Item>
         <Dropdown.Item eventKey="3">Añadir película</Dropdown.Item>
         <Dropdown.Item eventKey="4">Añadir actor</Dropdown.Item>
         <Dropdown.Divider />
         <Dropdown.Item eventKey="5">Logout</Dropdown.Item> */}
        </DropdownButton>
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

const navbarAdmin = () => {
  return (
    <Navbar bg="light" expand="lg" className="Navbar">
  <Container>
        <Navbar.Brand href="#action1">Logo</Navbar.Brand>
        <Nav.Link href="/Movies">Peliculas</Nav.Link>
        <Nav.Link href="/Actors">Actores</Nav.Link>
        {/* <Navbar.Brand href="#action4">Registrarse</Navbar.Brand> */}
        <DropdownButton align="end" title="Usuario" id="dropdown-menu-align-end">
        {/* <Link to = "/register" className="reg">Personaje</Link> */}
        <Link to = "/register" className="reg">Comentario</Link>
        <Link to = "/modMovie" className="reg">Película</Link>
        <Link to = "/modActor" className="reg">Actor</Link>
        <Dropdown.Divider />
        <Link to = "/register" className="reg">Logout</Link>
         {/* <Dropdown.Item eventKey="2">Perfil</Dropdown.Item>
         <Dropdown.Item eventKey="3">Añadir película</Dropdown.Item>
         <Dropdown.Item eventKey="4">Añadir actor</Dropdown.Item>
         <Dropdown.Divider />
         <Dropdown.Item eventKey="5">Logout</Dropdown.Item> */}
        </DropdownButton>
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

    return (
      <div>
        {
          role == 0 || !role ? navbarUser() : navbarAdmin()
        }
      </div>
    )
}
export default Navigation;