import { BrowserRouter, Routes, Route } from "react-router-dom";

import Update from "./Components/Update";
import Create from "./Components/Create";
import Search from "./Components/Search";
import Admin from "./Components/Admin";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

import ProtectedRoute from "./Components/ProtectedRoute";
import AdminRoute from "./Components/AdminRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected User Routes */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/user"
                    element={
                        <ProtectedRoute>
                            <Search />
                        </ProtectedRoute>
                    }
                />

                {/* Admin Routes */}
                <Route
                    path="/admin"
                    element={
                        <AdminRoute>
                            <Admin />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/update"
                    element={
                        <AdminRoute>
                            <Update />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/upload"
                    element={
                        <AdminRoute>
                            <Create />
                        </AdminRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
