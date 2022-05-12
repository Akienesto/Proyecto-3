import { Link } from "react-router-dom";

const Logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    // window.location.href=`/logout`
    return (
        <div className="logout text">
            <div>
                <h3 className="logoutText">Sesión cerrada con éxito</h3>
            </div>
            <div className="logoutBut">
                <div className="goLogin">
                    <Link to="/login">
                        <button className="buttonCom">Ir a login</button>
                    </Link>
                </div>
                <div className="goLogin">
                    <Link to="/">
                        <button className="buttonCom">Ir a Home</button>
                    </Link>
                </div>
            </div>
            <div>
                <h3 className="logoutText">¡Esperamos verte pronto!</h3>
            </div>
        </div>
    )
}

export default Logout