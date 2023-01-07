import {BrowserRouter, Route, Routes} from "react-router-dom";

import Login from "./screen/Login";
import HomePage from "./screen/HomePage/HomePage";


function App() {

  return (

      <BrowserRouter>
        <Routes>


              <>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<HomePage/>}/>


              </>



        </Routes>
      </BrowserRouter>

  );
}

export default App;
