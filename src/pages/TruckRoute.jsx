import { useEffect,useState } from "react";
import api from "../services/api";
import { Truck } from "lucide-react";

export default function TruckRoute(){

const [route,setRoute] = useState([]);

useEffect(()=>{

const fetchRoute = async()=>{

try{

const res = await api.get("/routes/optimize");

setRoute(res.data);

}catch(err){

console.error(err)

}

};

fetchRoute();

},[]);


return(

<div className="p-8">

<h1 className="text-2xl font-bold text-gray-700 mb-6">
Garbage Truck Route Optimization
</h1>


<div className="bg-white rounded-xl shadow p-6">

{route.length === 0 ? (

<div className="text-center text-gray-500">

No priority bins right now 🚮

</div>

) : (

<div className="space-y-4">

{route.map((bin,index)=>(

<div
key={bin._id}
className="flex justify-between items-center bg-gray-50 p-4 rounded-lg"
>

<div className="flex items-center gap-3">

<Truck size={18}/>

<span className="font-medium">

Stop {index+1} → Bin {bin.binId}

</span>

</div>

<div className="text-red-600 font-semibold">

{bin.wasteLevel}%

</div>

</div>

))}

</div>

)}

</div>

</div>

)

}