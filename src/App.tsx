import React from 'react';
import { BrowserRouter, Route, Routes, Navigate  } from "react-router-dom";
import FormularioCadastro from "./components/FormularioCadastro/FormularioCadastro";
import DisplayCarros from "./components/DisplayCarros/DiplasyCarros";
import Header from "./components/Header/Header";

function App() {
    return (
      <BrowserRouter>
          <Header/>
          <Routes>
              <Route path="/" element={<Navigate replace to="consulta"/>}/>
              <Route path="cadastro" element={<FormularioCadastro />}/>
              <Route path="consulta" element={<DisplayCarros/>}/>
          </Routes>
      </BrowserRouter>
    )
}
export default App;
