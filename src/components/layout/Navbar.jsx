import { Bell, LogOut } from "lucide-react";
import { useState } from "react";
import { useNotifications } from "../../context/NotificationContext";
import socket from "../../services/socket";
import { useEffect } from "react";

export default function Navbar(){

const {
notifications,
markAsRead,
clearNotifications
} = useNotifications();

const [open,setOpen] = useState(false);

const unreadCount = notifications.filter(n=>!n.read).length;

const handleLogout = () => {

localStorage.removeItem("token");
window.location.href="/login";

};
useEffect(()=>{

socket.on("gas-alert",(data)=>{

addNotification(data.message,"danger");

});

return ()=>{

socket.off("gas-alert");

};

},[]);

return(

<div className="h-16 bg-slate-900 border-b border-slate-700 flex items-center justify-between px-8 text-white">

{/* TITLE */}

<h1 className="text-lg font-semibold">
Smart Waste Monitoring
</h1>


{/* RIGHT SIDE */}

<div className="flex items-center gap-6 relative">

{/* NOTIFICATION BELL */}

<div className="relative">

<Bell
size={20}
className="cursor-pointer"
onClick={()=>setOpen(!open)}
/>

{/* BADGE */}

{unreadCount>0 &&(

<span className="absolute -top-2 -right-2 bg-red-500 text-xs px-1 rounded">

{unreadCount}

</span>

)}

{/* POPUP PANEL */}

{open &&(

<div className="absolute right-0 mt-4 w-96 bg-white text-black rounded-lg shadow-lg p-4 z-50">

<div className="flex justify-between items-center mb-3">

<h3 className="font-semibold">
Notifications
</h3>

<button
onClick={clearNotifications}
className="text-sm text-red-500"
>

Clear All

</button>

</div>


{notifications.length === 0 &&(

<p className="text-sm text-gray-500">
No alerts
</p>

)}


{notifications.map(n=>{

let color="text-blue-500";

if(n.severity==="danger") color="text-red-500";
if(n.severity==="warning") color="text-yellow-600";

return(

<div
key={n.id}
onClick={()=>markAsRead(n.id)}
className={`border-b py-2 text-sm cursor-pointer ${n.read ? "opacity-50" : ""}`}
>

<div className={color}>
{n.message}
</div>

<div className="text-xs text-gray-400">
{n.time}
</div>

</div>

)

})}

</div>

)}

</div>


{/* PROFILE */}

<div className="flex items-center gap-2">

<div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">

A

</div>

Admin

</div>


{/* LOGOUT */}

<button
onClick={handleLogout}
className="flex items-center gap-1 bg-red-500 px-3 py-1 rounded text-sm"
>

<LogOut size={16}/>
Logout

</button>

</div>

</div>

)

}