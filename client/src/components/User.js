import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Movies from "./Movies";

const User = () => {
    // const {userId} = useParams()
    const [user, setUser] = useState({})
    const [movies, setMovies] = useState([])
    const token = localStorage.getItem("token")
   

    useEffect(() => {
        const getUser = async () => {
            const response = await axios.get(`http://localhost:5000/api/getUser`,{
                headers:{
                    "Authorization": token
                  }
            })
        
            console.log(response)
            setUser(response.data.user)
            setMovies(response.data.user.list)
        }
        getUser()
    
},[])

return (
    <div className="users">
        <h3 className="argument text">Nombre : {user.name}</h3>
        <h3 className="argument text">Email : {user.email}</h3>
        {/* <img src={user.image} className="images1"/> */}
        <div>
            <h2 className="argument text">Mis películas</h2>
            {/* <h2 className="text argument">{user.list}</h2> */}
        <div>
        {
            movies.map(pelis => {
                return(
                    <Link key={pelis._id} to={`/movies/${pelis._id}`}>
                        <div className="wrap">
                          <img src={pelis.image} className="images"/>
                          <h6 className="nombres deco">{pelis.title}</h6>
                        </div>
                    </Link>
                )
            })
        }
        </div>
        </div>
    </div>
 
)
}



    export default User;