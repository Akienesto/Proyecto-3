import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Form } from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar';
import Button from "react-bootstrap/Button";
import { FormControl } from "react-bootstrap";
import { DropdownButton } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "..//imagenes/logo.png"
import lupa from "..//imagenes/lupa.png"


function Navigation() {

  const role = localStorage.getItem("role")

  const navbarUser = () => {
    return (
      <Navbar expand="lg" className="Navbar">
        <Container className="links">
          <div>
            <Navbar.Brand href="/"><img src={logo} className="logo" /></Navbar.Brand>
          </div>
          <div>
            <Nav.Link href="/Movies"><p className="text font">Peliculas</p></Nav.Link>
          </div>
          <div>
            <Nav.Link href="/Actors"><p className="text font">Actores</p></Nav.Link>
          </div>
          <div>
            <Nav.Link href="/characters"><p className="text font">Personajes</p></Nav.Link>
          </div>
          </Container>
          <div className="searchBar">
          <div>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success" className="text"><img src={lupa} className="lupa" /></Button>
          </Form>
        </div>
          <div>
            <DropdownButton align="end" title="Usuario" id="dropdown-menu-align-end" className="drop">
              {/* <Link to="/login" className="reg">Login</Link>
              <Link to="/register" className="reg">Registrarse</Link> */}
              <Link to="/user" className="reg">Mi perfil</Link>
              <Link to="/addMovie" className="reg">Añadir película</Link>
              <Link to="/addActor" className="reg">Añadir actor</Link>
              <Link to="/addCharacter" className="reg">Añadir personaje</Link>
              <Dropdown.Divider />
              <Link to="/logout" className="reg">Logout</Link>
            </DropdownButton>
          </div>
        </div>
      </Navbar>
    )
  }

  const navbarAdmin = () => {
    return (
      <Navbar expand="lg" className="Navbar">
        <Container className="links">
          <Navbar.Brand href="/"><img src={logo} className="logo" /></Navbar.Brand>
          <Nav.Link href="/Movies"><p className="text font">Peliculas</p></Nav.Link>
          <Nav.Link href="/Actors"><p className="text font">Actores</p></Nav.Link>
          <Nav.Link href="/characters"><p className="text font">Personajes</p></Nav.Link>
        </Container>
        <div className="searchBar">
          <div>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success"><img src={lupa} className="lupa" /></Button>
            </Form>
          </div>
          <div>
            <DropdownButton align="end" title="Admin" id="dropdown-menu-align-end" className="drop">
              <Link to="/addMovie" className="reg">Añadir película</Link>
              <Link to="/addActor" className="reg">Añadir actor</Link>
              <Link to="/addCharacter" className="reg">Añadir personaje</Link>
              <Dropdown.Divider />
              <Link to="/logout" className="reg">Logout</Link>
            </DropdownButton>
          </div>
        </div>
      </Navbar>
    )
  }

  const navbarLogin = () => {
    return (
      <Navbar expand="lg" className="Navbar">
      <Container className="links">
        <Navbar.Brand href="/"><img src={logo} className="logo" /></Navbar.Brand>
        <Nav.Link href="/Movies"><p className="text font">Peliculas</p></Nav.Link>
        <Nav.Link href="/Actors"><p className="text font">Actores</p></Nav.Link>
        <Nav.Link href="/characters"><p className="text font">Personajes</p></Nav.Link>
      </Container>
      <div className="searchBar">
        <div>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success"><img src={lupa} className="lupa" /></Button>
          </Form>
        </div>
        <div>
          <DropdownButton align="end" title="Registrate" id="dropdown-menu-align-end" className="drop">
          <Link to="/login" className="reg">Login</Link>
          <Dropdown.Divider />
          <Link to="/register" className="reg">Registrarse</Link>
          </DropdownButton>
        </div>
      </div>
    </Navbar>
  )
}
  // if (!role) return navbarLogin()
  return (
    <div>
      {
        // role == 0 ? navbarUser() : navbarAdmin()
        role == 0 ? navbarUser() : role == 1 ? navbarAdmin() : navbarLogin()
        // !role ? navbarLogin() : navbarUser()
        // !role ? navbarLogin()
      }
    </div>

  )

}
export default Navigation;