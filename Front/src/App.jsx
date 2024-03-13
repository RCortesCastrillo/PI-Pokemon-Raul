import LandingPage from "./components/LandingPage/LandingPage"
import HomePage from "./components/HomePage/HomePage"
import Detail from "./components/Detail/Detail"
 import CreatePokemon from  "./components/CreatePokemon/CreatePokemon"
 import NavBar from "./components/NavBar/NavBar"
import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  const { pathname } = useLocation();

  return (
   
      
     <div className="App">
       {pathname !== "/" && <NavBar/>}
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/home" element={<HomePage />}/>
        <Route path="/pokemon/:id" element={<Detail/>} />
        <Route path="/create" element={<CreatePokemon/>}/>
        
        {/* <Route path="/home" element={<HomePage />}/>
         */}
      </Routes>
    

      </div>
      
   
  )
}

export default App
