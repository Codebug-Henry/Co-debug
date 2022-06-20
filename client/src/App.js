import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing.js";
import NotFound from "./pages/NotFound";
import Creadores from "./pages/Creadores.js";

// comentario

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Landing />} />
        <Route path={"*"} element={<NotFound />} />
        <Route path={"/creadores"} element={<Creadores />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
