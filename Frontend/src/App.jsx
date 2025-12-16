import { BrowserRouter, Routes, Route } from "react-router-dom";
import Update from "../src/Components/Update";
import Create from "./Components/Create";
import Search from "./Components/Search";
import Admin from "./Components/admin";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user" element={<Search />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/update" element={<Update />} />
        <Route path="/upload" element={<Create />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;