import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Dustbins from "./pages/Dustbins";
import AddDustbin from "./pages/AddDustbin";
import MapDashboard from "./pages/MapDashboard";
import Analytics from "./pages/Analytics";
import TruckRoute from "./pages/TruckRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import OAuthSuccess from "./pages/OAuthSuccess";

function App(){

return(

<BrowserRouter>

<Routes>

  <Route path="/truck-route" element={<TruckRoute/>}/>

<Route path="/login" element={<Login/>}/>
<Route path="/register" element={<Register/>}/>
<Route path="/oauth-success" element={<OAuthSuccess/>}/>

<Route element={<ProtectedRoute><MainLayout/></ProtectedRoute>}>

<Route path="/" element={<Navigate to="/dashboard"/>}/>
<Route path="/dashboard" element={<Dashboard/>}/>
<Route path="/dustbins" element={<Dustbins/>}/>
<Route path="/add-dustbin" element={<AddDustbin/>}/>
<Route path="/map" element={<MapDashboard/>}/>
<Route path="/analytics" element={<Analytics/>}/>

</Route>

</Routes>

</BrowserRouter>

)

}

export default App