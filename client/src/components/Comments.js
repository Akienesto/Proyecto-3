import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AddComment from "./AddComment";

const Comment = () => {
    const {commentId} = useParams()
    const [comentario, setComment] = useState({})

    useEffect(() => {
        const getcomment = async()=>{
            const response = await axios.get(`http://localhost:5000/api/getComment/${commentId}`)
        
            console.log(response)
            setComment(response.data.comment)
        }
        getcomment()
    
},[])

return(
    <div>
                {
                comentario.map(coms =>{
                    return(
                        <Link key={coms._id} to={`/comments/${coms._id}`}>
                        <div className="wrap">
                            <div className="">
                              <h6>{coms.comment}</h6>
                            </div>
                        </div>
                        </Link>
                    )
                })
            }      
    </div>
)
}



    export default Comment;