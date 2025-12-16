import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../src/Components/dashboard";
import Update from "../src/Components/Update";
import Create from "./Components/Create";
import Search from "./Components/Search";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user" element={<Search />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/update" element={<Update />} />
        <Route path="/upload" element={<Create />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;