import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupFrom from "./components/SignupForm";
import HomePage from "./components/HomePage";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import ProfilePage from "./components/ProfilePage";

function App() {

  
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/signup" element={<SignupFrom />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route path="/MyProfile" element={<ProfilePage/>} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
