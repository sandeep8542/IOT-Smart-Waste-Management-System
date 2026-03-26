import { NavLink } from "react-router-dom";
import { Home, Trash2, PlusCircle, Map, BarChart3,Truck } from "lucide-react";

export default function Sidebar(){

const menuItems = [
{
name: "Dashboard",
icon: <Home size={18} />,
path: "/dashboard"
},
{
name: "Smart Dustbins",
icon: <Trash2 size={18} />,
path: "/dustbins"
},
{
name: "Add Dustbin",
icon: <PlusCircle size={18} />,
path: "/add-dustbin"
},
{
name: "Map Dashboard",
icon: <Map size={18} />,
path: "/map"
},
{
name: "Analytics",
icon: <BarChart3 size={18} />,
path: "/analytics"
},
{
name:"Truck Route",
icon:<Truck size={18}/>,
path:"/truck-route"
}
];
return(

<div className="h-screen w-64 bg-slate-900 text-gray-200 fixed flex flex-col border-r border-slate-700">

{/* LOGO */}

<div className="p-6 text-xl font-bold border-b border-slate-700 tracking-wide">

🗑 Smart Waste

</div>


{/* MENU */}

<nav className="flex flex-col gap-2 p-4">

{menuItems.map((item)=>(

<NavLink

key={item.name}

to={item.path}

className={({isActive})=>

`flex items-center gap-3 p-3 rounded-lg transition

${isActive

? "bg-green-600 text-white"

: "hover:bg-slate-800 text-gray-300"

}`

}

>

{item.icon}

{item.name}

</NavLink>

))}

</nav>

</div>

);

}