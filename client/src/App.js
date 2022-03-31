import { Route, Routes } from "react-router-dom";
import React from "react";
import Login from "./components/Login";
import Navigation from "./components/Navigation";
import Register from "./components/Register";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Movies from "./components/Movies";
import Actors from "./components/Actors";
import AddMovie from "./components/AddMovie";
import AddActor from "./components/AddActor";
import ModActor from "./components/ModActor";
import ModMovie from "./components/ModMovie";
import Movie from "./components/Movie";
import Actor from "./components/Actor";
import Logout from "./components/Logout";
import AddComment from "./components/AddComment";
import Comments from "./components/Comments";

const App = () => {
  return (
        <div className="App">
           <Navigation />
            <Routes>

             <Route path="/register" element={<Register />} />
             <Route path="/login" element={<Login />} />
             <Route path="/logout" element={<Logout />} />
             <Route path="/home" element={<Home />} />
             <Route path="/movies" element={<Movies />} />
             <Route path="/addMovie" element={<AddMovie />} />
             <Route path="/modMovie" element={<ModMovie />} />
             <Route path="/movies/:movieId" element={<Movie />} />
             <Route path="/actors/:actorId" element={<Actor />} />
             <Route path="/actors" element={<Actors />} />
             <Route path="/addActor" element={<AddActor />} />
             <Route path="/modActor" element={<ModActor />} />
             <Route path="/addComment/:movieId" element={<AddComment />} />
             <Route path="/comments" element={<Comments />} />

            </Routes>
           <Footer />
        </div>
  )
}

export default App;
