import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} >
          {/* {user ? <Home /> : <Register />} */}
          {/* <Home /> */}
        </Route>
        <Route path="/login" element={<Login />}>
          {/* {user ? <Navigate to="/" /> : <Login />} */}
          {/* <Login /> */}
        </Route>
        <Route path="/register" element={<Register />}>
          {/* {user ? <Navigate to="/" /> : <Register />} */}
          {/* <Register /> */}
        </Route>
        <Route path="/profile/:userId" element={<Profile />}>
          {/* <Profile /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
