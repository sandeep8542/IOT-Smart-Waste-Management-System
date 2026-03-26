import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function MainLayout(){

return(

<div className="flex">

<Sidebar/>

<div className="ml-64 flex-1 bg-[#0f172a] min-h-screen">

<Navbar/>

<div className="p-8">

<Outlet/>

</div>

</div>

</div>

)

}