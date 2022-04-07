import { Link } from "react-router-dom";


const Logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")

    return(
        <div className="logout text">
            <div>
                <h3>Sesión cerrada con éxito</h3>
            </div>
            <Link to = "/login">
                <button className="logoutButton">Ir a login</button>
            </Link>
        </div>
    )
}

export default Logout