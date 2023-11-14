import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Search } from "./screens/Search";
import { Details } from "./screens/Details";
export function App() {
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/detalhes/:id" element={<Details />} />
            <Route path="/" element={<Search />} />
            <Route path="*">Página não encontrada. </Route>
        </Routes>
    </BrowserRouter>
    );
  }