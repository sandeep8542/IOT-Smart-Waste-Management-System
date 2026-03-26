import { useEffect, useState, useRef } from "react";
import api from "../services/api";
import { Search, Trash2 } from "lucide-react";
import { useNotifications } from "../context/NotificationContext";

export default function Dustbins(){

const { addNotification } = useNotifications();

const [bins,setBins] = useState([]);
const [search,setSearch] = useState("");

const alertedBins = useRef(new Set());


/* FETCH BINS */

const fetchBins = async()=>{

const res = await api.get("/dustbins");
setBins(res.data);

};

useEffect(()=>{

fetchBins();

},[]);


/* SENSOR SIMULATION */

useEffect(()=>{

const interval = setInterval(()=>{

setBins(prev =>
prev.map(bin=>{

let waste = bin.wasteLevel + Math.floor(Math.random()*6);
if(waste>100) waste = 10;

let gas = Math.floor(Math.random()*120);
let temp = Math.floor(Math.random()*50);

return{
...bin,
wasteLevel:waste,
gasLevel:gas,
temperature:temp
}

})
)

},5000)

return ()=>clearInterval(interval)

},[]);


/* ALERT LOGIC */

useEffect(()=>{

bins.forEach(bin=>{

if(bin.gasLevel>90 && !alertedBins.current.has(bin._id)){

addNotification(
`Dangerous gas detected near Bin ${bin.binId}`,
"danger"
);

alertedBins.current.add(bin._id);

}

if(
bin.gasLevel>70 &&
bin.gasLevel<=90 &&
!alertedBins.current.has("warn"+bin._id)
){

addNotification(
`Gas level rising near Bin ${bin.binId}`,
"warning"
);

alertedBins.current.add("warn"+bin._id);

}

})

},[bins]);


/* STATUS */

const getStatus=(level)=>{

if(level>80) return "FULL";
if(level>40) return "MEDIUM";

return "EMPTY";

};


/* SEARCH FILTER */

const filteredBins = bins.filter(bin=>(

bin.binId.toLowerCase().includes(search.toLowerCase()) ||
bin.location.toLowerCase().includes(search.toLowerCase())

));


return(

<div className="p-6 text-gray-800">

<h1 className="text-2xl font-bold mb-6">
Smart Dustbin Monitoring
</h1>


{/* SEARCH */}

<div className="flex items-center bg-white shadow rounded-lg px-3 py-2 w-72 mb-6">

<Search size={18} className="text-gray-400 mr-2"/>

<input
placeholder="Search bins..."
className="outline-none w-full"
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

</div>


{/* TABLE */}

<div className="bg-white rounded-xl shadow overflow-hidden">

<table className="w-full">

<thead className="bg-gray-50 text-gray-600 text-sm">

<tr>

<th className="p-4 text-left">Bin ID</th>
<th className="p-4 text-left">Location</th>
<th className="p-4 text-left">Waste Level</th>
<th className="p-4 text-left">Type</th>
<th className="p-4 text-left">Status</th>
<th className="p-4 text-left">Gas</th>
<th className="p-4 text-left">Temp</th>
<th className="p-4 text-left">Action</th>

</tr>

</thead>


<tbody>

{filteredBins.map(bin=>(

<tr key={bin._id} className="border-t hover:bg-gray-50">

<td className="p-4 font-medium">
{bin.binId}
</td>

<td className="p-4">
{bin.location}
</td>


<td className="p-4 w-64">

<div className="w-full bg-gray-200 rounded-full h-3">

<div
className={`h-3 rounded-full transition-all duration-700
${bin.wasteLevel>80 ? "bg-red-500"
: bin.wasteLevel>40 ? "bg-yellow-500"
: "bg-green-500"}`}
style={{width:`${bin.wasteLevel}%`}}
></div>

</div>

<span className="text-sm text-gray-500">
{bin.wasteLevel}%
</span>

</td>


<td className="p-4">
{bin.wasteType}
</td>


<td className="p-4">

<span className={`px-3 py-1 rounded-full text-sm

${bin.wasteLevel>80 ? "bg-red-100 text-red-600"
: bin.wasteLevel>40 ? "bg-yellow-100 text-yellow-600"
: "bg-green-100 text-green-600"}

`}>

{getStatus(bin.wasteLevel)}

</span>

</td>


<td className="p-4">

<span className={`${bin.gasLevel>90 ? "text-red-600 font-bold" : ""}`}>

{bin.gasLevel}

</span>

</td>


<td className="p-4">

{bin.temperature}°C

</td>


<td className="p-4">

<button className="text-red-500 hover:text-red-700 flex items-center gap-1">

<Trash2 size={16}/>
Delete

</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

)

}