import {BrowserRouter, Route, Routes} from "react-router-dom";

import Login from "./pages/login";
import Home from "../src/pages/home/Home";
import Profile from "./pages/profile/Profile";



function App() {

  return (

      <BrowserRouter>
        <Routes>


          <>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home/>}/>
                <Route path="/profile/:userid" element={<Profile/>}/>



          </>



        </Routes>
      </BrowserRouter>
      // <div>huy</div>

  );
}

export default App;
