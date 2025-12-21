import { BrowserRouter, Routes, Route } from "react-router-dom";

import Update from "./Components/Update";
import Create from "./Components/Create";
import Search from "./Components/Search";
import Admin from "./Components/admin";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import ResourceView from "./Components/ResourceView";
import ProtectedRoute from "./Components/ProtectedRoute";
import AdminRoute from "./Components/AdminRoute";
import Profile from "./Components/Profile";
import Contact from "./Components/Contact";
import AdminChat from "./Components/AdminChat";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/" element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }/>
                <Route path="/user" element={
                        <ProtectedRoute>
                            <Search />
                        </ProtectedRoute>
                    } />
                <Route path="/resource" element={
                        <ProtectedRoute>
                            <ResourceView />
                        </ProtectedRoute>
                    }/>
                <Route path="/contact" element={
                        <ProtectedRoute>
                            <Contact />
                        </ProtectedRoute>
                    }/>
                <Route path="/admin" element={
                        <AdminRoute>
                            <Admin />
                        </AdminRoute>
                    }/>
                <Route path="/chat" element={
                        <AdminRoute>
                            <AdminChat />
                        </AdminRoute>
                    }/>
                <Route
                    path="/update"
                    element={
                        <AdminRoute>
                            <Update />
                        </AdminRoute>
                    }/>
                <Route
                    path="/upload"
                    element={
                        <AdminRoute>
                            <Create />
                        </AdminRoute>
                    }/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
