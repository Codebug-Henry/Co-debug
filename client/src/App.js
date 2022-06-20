import { BrowserRouter, Route, Routes } from "react-router-dom"

//importacion de páginas
import Landing from "./pages/Landing.js"
import MisPreguntas from "./pages/MisPreguntas.js"
import Preguntar from "./pages/Preguntar.js"
import MisRespuestas from "./pages/MisRespuestas.js"
import Responder from "./pages/Responder.js"
import Favoritas from "./pages/Favoritas.js"
import Ranking from "./pages/Ranking.js"
import Admin from "./pages/Admin.js"
import Creadores from "./pages/Creadores.js"
import Ayuda from "./pages/Ayuda.js"
import Configuracion from "./pages/Configuracion.js"
import Delete from "./pages/Delete.js"
import NotFound from "./pages/NotFound"
import Footer from "./components/Footer.js"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Landing/>}/>
        <Route path={"/mispreguntas"} element={<MisPreguntas/>}/>
        <Route path={"/preguntar"} element={<Preguntar/>}/>
        <Route path={"/misrespuestas"} element={<MisRespuestas/>}/>
        <Route path={"/responder"} element={<Responder/>}/>
        <Route path={"/favoritas"} element={<Favoritas/>}/>
        <Route path={"/ranking"} element={<Ranking/>}/>
        <Route path={"/admin"} element={<Admin/>}/>
        <Route path={"/creadores"} element={<Creadores/>}/>
        <Route path={"/ayuda"} element={<Ayuda/>}/>
        <Route path={"/configuracion"} element={<Configuracion/>}/>
        <Route path={"/delete"} element={<Delete/>}/>
        <Route path={"*"} element={<NotFound/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
