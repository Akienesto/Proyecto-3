import Container from "react-bootstrap/Container";
import Navbar from 'react-bootstrap/Navbar';
import instagram from "..//imagenes/instagram.png"
import twitter from "..//imagenes/twitter-bird-white-on-blue.jpg"
import facebook from "..//imagenes/facebook.jpg"

const Footer = () => {
  
  return (
    // fixed="bottom"
 <Navbar expand="lg" variant="light" className="footer">
  <Container>
    <Navbar.Brand href="#"></Navbar.Brand>
  </Container> 
  <div className="redes">
      <div>
          <p className ="redes1 text">Siguenos en : </p>
      </div>
      <div>
        <a href="https://www.instagram.com">
          <img src={instagram} alt="" width="30" height="24" className="logosFooter" />
        </a>
        <a href="https://twitter.com">
          <img src={twitter} alt="" width="30" height="24" className="logosFooter" />
        </a>
        <a href="https://www.facebook.com">
           <img src={facebook} alt="" width="30" height="24" className="logosFooter" />
        </a>
      </div>
  </div>
  <div  className="dev">
      <p className="text">Developed by Burzuri &copy;</p>
  </div>
</Navbar>
  )
}
export default Footer;

