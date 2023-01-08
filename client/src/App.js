import {BrowserRouter, Route, Routes} from "react-router-dom";

import Login from "./pages/Login";
import HomePage from "./pages/HomePage/HomePage";


function App() {

  return (

      <BrowserRouter>
        <Routes>


              <>
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<HomePage/>}/>


              </>



        </Routes>
      </BrowserRouter>

  );
}

export default App;
