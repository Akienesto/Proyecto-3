import { Route, Routes } from "react-router-dom";
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


const App = () => {
  return (
        <div className="App">
           <Navigation />
            <Routes>
             <Route path="/register" element={<Register />} />
             <Route path="/login" element={<Login />} />
             <Route path="/home" element={<Home />} />
             <Route path="/movies" element={<Movies />} />
             <Route path="/actors" element={<Actors />} />
             <Route path="/addMovie" element={<AddMovie />} />
             <Route path="/addActor" element={<AddActor />} />
             <Route path="/modActor" element={<ModActor />} />
             <Route path="/modMovie" element={<ModMovie />} />
            </Routes>
           <Footer />
        </div>
  )
}

export default App;
