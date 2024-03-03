import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/home/Home";
import NavBar from "./component/NavBar/NavBar";
function App() {

  return (
<>
    <BrowserRouter>
        <Routes>
          {/* root */}
          <Route path="/" element={<Home/>} />
          {/* <Route path="/about" element={<About/>} /> */}
        </Routes>
    </BrowserRouter>
  </>
  )
}

export default App
