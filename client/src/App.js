import { Route, Routes } from "react-router-dom";
import React from "react";
import Login from "./components/Login";
import User from "./components/User";
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
import ModComment from "./components/ModComment";
import Score from "./components/Score";
import Character from "./components/Character";
import Characters from "./components/Characters";
import AddCharacter from "./components/AddCharacter";
import ModCharacter from "./components/ModCharacter";

const App = () => {
  return (
        <div className="App">
           <Navigation />
            <Routes>

             <Route path="/register" element={<Register />} />
             <Route path="/login" element={<Login />} />
             <Route path="/user" element={<User />} />
             <Route path="/logout" element={<Logout />} />
             <Route path="/" element={<Movies />} />
             <Route path="/movies" element={<Movies />} />
             <Route path="/addMovie" element={<AddMovie />} />
             <Route path="/modMovie/:movieId" element={<ModMovie />} />
             <Route path="/movies/:movieId" element={<Movie />} />
             <Route path="/actors/:actorId" element={<Actor />} />
             <Route path="/actors" element={<Actors />} />
             <Route path="/addActor" element={<AddActor />} />
             <Route path="/modActor/:actorId" element={<ModActor />} />
             <Route path="/addComment/:movieId" element={<AddComment />} />
             <Route path="/getComment/:commentId" element={<Comments />} />
             <Route path="/modComment/:commentId" element={<ModComment />} />
             <Route path="/newScore/:movieId" element={<Score />} />
             <Route path="/characters" element={<Characters />} />
             <Route path="/characters/:characterId" element={<Character />} />
             <Route path="/addCharacter" element={<AddCharacter />} />
             <Route path="/modCharacter/:characterId" element={<ModCharacter />} />
         

            </Routes>
           <Footer />
        </div>
  )
}

export default App;
