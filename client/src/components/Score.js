import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";


const Score =  () => {
    const { movieId } = useParams()
    const [score, setScore] = useState({
        score:""
    })
    const [succesMessage, setSuccesMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    const onChangeInput = event => {
        const { name, value } = event.target
        setScore({ ...score, [name]: value })
    }

    const scoreSubmit = async e => {
        e.preventDefault()
        try {
            const response = await axios.post(`/api/newScore/${movieId}`, { ...score }, {
                headers: {
                    "Authorization": token
                }
            })
            console.log(response)
            setSuccesMessage(response.data.message)
            // setTimeout(() => {
            //     navigate("/movies")
            // }, 3000)
        } catch (error) {
            setErrorMessage(error.response.data.message)
        }
    }
    return (
        <div className="lista">
         <Form className='form1' onSubmit={scoreSubmit} >
             <h2 className="headline text">Puntua de 0 a 10</h2>
             <Form.Group className="mb-3" controlId="formBasicName">
                 <Form.Label className="text"></Form.Label>
                 <Form.Control type="text" name="score" value={score.score} placeholder="" onChange={onChangeInput} />
             </Form.Group>
             <div className="lista">
             <button type="submit" onClick={scoreSubmit} className="buttonCom">Añadir puntuación</button>
             </div>
             <div>
                 <div className="message_ok text" style={{ display: succesMessage ? "block" : "none" }}>
                     {succesMessage}
                 </div>
                 <div className="message_ok text" style={{ display: errorMessage ? "block" : "none" }}>
                     {errorMessage}
                 </div>
             </div>
         </Form>
        </div>
    )

}
export default Score;




                // <div className="text puntuar">
            //     <h2>Puntuar de 0 a 10</h2>
            //     <input></input>
            //     <div className="lista">
            //         <button  className="buttonCom">Puntuar</button>
            //     </div>
            //     <div>
            //         <div className="message_ok text" style={{ display: succesMessage ? "block" : "none" }}>
            //             {succesMessage}
            //         </div>
            //         <div className="message_ok text" style={{ display: errorMessage ? "block" : "none" }}>
            //             {errorMessage}
            //         </div>
            //     </div>
            // </div>

        //     <Form className='form1' onSubmit={scoreSubmit} >
        //     <h2 className="headline text">Puntua de 0 a 10</h2>
        //     <Form.Group className="mb-3" controlId="formBasicName">
        //         <Form.Label className="text"></Form.Label>
        //         <Form.Control type="text" name="score" value={score.score} placeholder="" onChange={onChangeInput} />
        //     </Form.Group>
        //     <div>
        //         <div className="message_ok text" style={{ display: succesMessage ? "block" : "none" }}>
        //             {succesMessage}
        //         </div>
        //         <div className="message_ok text" style={{ display: errorMessage ? "block" : "none" }}>
        //             {errorMessage}
        //         </div>
        //     </div>
        // </Form>