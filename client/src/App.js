import Home from "./pages/home/Home";
// import Login from "./pages/login/Login";
import Login from "./pages/login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext, useEffect } from "react";
import Context from "./store/context";
import { io } from "socket.io-client";
import Messenger from "./pages/messenger/Messenger";


function App() {
  const [state , dispatch] = useContext(Context)
  const user = state.infoUser
  
  useEffect(() => {
    const socket = io(process.env.REACT_APP_WS);
    // socket.on("connection", (data) => {
    //   setArrivalMessage({
    //     sender: data.senderId,
    //     text: data.text,
    //     createdAt: Date.now(),
    //   });
    // });
    dispatch({
      type: 'CONNECT_SOCKET',
      payload: socket
    })
    return () =>  socket.close()
  }, []);


  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home/> : <Login />} />
        <Route exact path="/" element={<Home />}>

          
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

        <Route path="/messenger/:category/:conversationId" element={<Messenger />} />
        <Route path="/messenger/:category" element={<Messenger />} />
      </Routes>
    </Router>
  );
}

export default App;
