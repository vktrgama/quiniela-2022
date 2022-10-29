import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './Components/Home';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import Rules from './features/rules'
import Matches from './features/matches'
import Participants from './features/participants'
import UserMatches from './features/user'
import './App.css';


function App() {

  return (
    <div className="App">
          <BrowserRouter>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/rules" element={<Rules />} />
                <Route path="/matches" element={<Matches/>} />
                <Route path="/participants" element={<Participants/>}/>
                <Route path="/user" element={<UserMatches/>}/>
                <Route exact path="/signin" element={<div>this are the login</div>} />
                <Route path="*" element={<div>nopage</div>} />
          </Routes>
          <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
