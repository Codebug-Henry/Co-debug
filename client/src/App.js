import { Route, Routes } from "react-router-dom";

//importacion de páginas
import Landing from "./pages/Landing.js";
import MisPreguntas from "./pages/MisPreguntas.js";
import Preguntar from "./pages/Preguntar.js";
import MisRespuestas from "./pages/MisRespuestas.js";
import Favoritas from "./pages/Favoritas.js";
import Ranking from "./pages/Ranking.js";
import Admin from "./pages/Admin.js";
import Creadores from "./pages/Creadores.js";
import Ayuda from "./pages/Ayuda.js";
import Configuracion from "./pages/Configuracion.js";
import ProtectedRoute from "./components/ProtectedRoute.js";
import NotFound from "./pages/NotFound";
import Terminos from "./pages/Terminos.js";
import Headerlogin from "./components/Headerlogin.js";
import Contacto from "./pages/Contacto.js";
import ResponderPDF from "./pages/ResponderPDF";
import PaypalPage from "./pages/PaypalPage.js";
import PagoListo from "./pages/PagoListo.js";
import Easter from "./pages/Easter.js";
import Alertas from "./components/adminComponents/Alertas.js";
import ListaUsuarios from "./components/adminComponents/ListaUsuarios.js";
import AgregarAdmin from "./components/adminComponents/AgregarAdmin.js";
import PreguntasDirectas from "./components/adminComponents/PreguntasDirectas.js";
import UserPage from "./pages/UserPage"

function App() {
  return (
    <>
      <Headerlogin />
      <Routes>
        <Route path={"/"} element={<Landing />} />
        <Route path={"/mispreguntas"} element={<ProtectedRoute component={MisPreguntas}/>} />
        <Route path={"/preguntar"} element={<ProtectedRoute component={Preguntar}/>} />
        <Route path={"/misrespuestas"} element={<ProtectedRoute component={MisRespuestas}/>} />
        <Route path={"/responder/:questionId"} element={<ResponderPDF />} />
        <Route path={"/favoritas"} element={<ProtectedRoute component={Favoritas}/>} />
        <Route path={"/ranking"} element={<Ranking />} />
        <Route path={"/codenothere"} element={<ProtectedRoute component={Admin}/>} />
        <Route path={"/creadores"} element={<Creadores />} />
        <Route path={"/ayuda"} element={<Ayuda />} />
        <Route path={"/terminos"} element={<Terminos />} />
        <Route path={"/configuracion/:sub"} element={<ProtectedRoute component={Configuracion} />} />
        <Route path={"/contacto"} element={<Contacto />} />
        <Route path={"/donacion"} element={<PaypalPage />} />
        <Route path={"/pagolisto"} element={<PagoListo />} />
        <Route path={"*"} element={<NotFound />} />
        <Route path={"/easter"} element={<Easter />} />
        <Route path={"/codenothere/alertas"} element={<ProtectedRoute component={Alertas}/>} />
        <Route path={"/codenothere/usuarios"} element={<ProtectedRoute component={ListaUsuarios}/>} />
        <Route path={"/codenothere/admins"} element={<ProtectedRoute component={AgregarAdmin}/>} />
        <Route path={"/codenothere/mensajes"} element={<ProtectedRoute component={PreguntasDirectas}/>} />
        <Route path={"/user/:sub"} element={<ProtectedRoute component={UserPage}/>} />
      </Routes>
    </>
  );
}

export default App;
