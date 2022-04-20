import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { Tooltip } from "react-bootstrap";

const Movies = () => {
    const [movies, setMovies] = useState([])
    const token = localStorage.getItem("token")

    useEffect(() => {
        const getMovies = async () => {
            const response = await axios.get("/api/allMovies", {
                headers: {
                    "Authorization": token
                }
            })

            console.log(response)
            setMovies(response.data.allMovies)
        }
        getMovies()
    }, [])
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {
                movies.map(peli => {
                    return (
                        <h6 className="text">{peli.title}</h6>
                    )
                })
            }
        </Tooltip>
    );

    return (
        <div>
            {
                movies.map(pelicula => {
                    return (
                        <Link key={pelicula._id} to={`/movies/${pelicula._id}`}>
                            <div className="wrap">
                                <div className="divs">
                                    <img src={pelicula.image} className="images" />
                                </div>
                                {/* <div>
                                    <h6 className="nombres">{pelicula.title}</h6>
                                </div> */}
                                <OverlayTrigger
                                    placement="bottom"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltip}
                                >
                                    <h6 variant="success" className="nombres">{pelicula.title}</h6>
                                </OverlayTrigger>
                                {/* <Card style={{ width: '9rem' }} className="card">
                            <Card.Img variant="top" src={pelicula.image} className="images" />
                        <Card.Body className="cardBody">
                            <Card.Title className="titles">
                            <h6>{pelicula.title}</h6>
                            </Card.Title>
                              <Button variant="primary">List</Button>
                        </Card.Body>
                      </Card> */}

                            </div>
                        </Link>
                    )
                })
            }

        </div>
    )

}

export default Movies