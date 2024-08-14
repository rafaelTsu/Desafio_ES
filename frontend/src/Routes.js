import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import UserManager from "./pages/UserManager/UserManager";
import CreateUser from "./pages/CreateUser/CreateUser";
import ErrorPage from "./pages/Error/Error";
import EditUser from "./pages/EditUser/EditUser";

const AppRoutes = () =>{
    return(
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={< Login/>}/>
                    <Route path="/home" element={< Home/>}/>
                    <Route path="/usermanager" element={< UserManager/>}/>
                    <Route path="/register" element={< CreateUser/>}/>
                    <Route path="/edituser" element={< EditUser/>}/>
                    <Route path="*" element={< ErrorPage/>}/>
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default AppRoutes