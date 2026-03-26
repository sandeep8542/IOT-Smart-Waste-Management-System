import bg from "../assets/waste-bg.jpg";
import RecyclingAnimation from "./RecyclingAnimation";
import DashboardPreview from "./DashboardPreview";
export default function AuthLayout({ children }) {

return(

<div
className="h-screen w-full bg-cover bg-center flex items-center justify-center relative overflow-hidden"
style={{backgroundImage:`url(${bg})`}}
>

{/* Dark overlay */}

<div className="absolute inset-0 bg-black/70"></div>



{/* Recycling icon */}

<RecyclingAnimation/>


{/* Dashboard preview */}

<DashboardPreview/>


{/* Content */}

<div className="relative z-10 flex w-[1000px] items-center justify-between">

{children}

</div>

</div>

);

}