import { useEffect, useState } from "react";
import api from "../services/api";
import { Trash2, AlertTriangle, Truck, RadioTower } from "lucide-react";

import {
Chart as ChartJS,
CategoryScale,
LinearScale,
LineElement,
PointElement,
Tooltip,
Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
CategoryScale,
LinearScale,
LineElement,
PointElement,
Tooltip,
Legend
);

export default function Dashboard(){

const [bins,setBins] = useState([]);

const [chartLevels,setChartLevels] = useState([20,40,60,30,70,50]);

/* FETCH BINS */

useEffect(()=>{

const fetchBins = async()=>{

const res = await api.get("/dustbins");
setBins(res.data);

};

fetchBins();

},[]);


/* SENSOR SIMULATION (for now) */

useEffect(()=>{

const interval = setInterval(()=>{

setBins(prev =>
prev.map(bin =>{

let newLevel = bin.wasteLevel + Math.floor(Math.random()*6);

if(newLevel>100) newLevel=100;

return{
...bin,
wasteLevel:newLevel
}

})
);

/* update chart */

setChartLevels(prev=>{

const newData=[...prev];

newData.shift();

newData.push(Math.floor(Math.random()*100));

return newData;

});

},5000)

return ()=>clearInterval(interval)

},[]);



/* STATUS COUNTS */

const total = bins.length;

const full = bins.filter(b=>b.wasteLevel>80).length;

const medium = bins.filter(b=>b.wasteLevel>40 && b.wasteLevel<=80).length;

const empty = bins.filter(b=>b.wasteLevel<=40).length;



/* PRIORITY BINS */

const priorityBins = bins
.filter(b=>b.wasteLevel>75)
.sort((a,b)=>b.wasteLevel-a.wasteLevel)
.slice(0,5);


/* CRITICAL ALERT */

const criticalBins = bins.filter(bin=>bin.wasteLevel>90);



/* CHART DATA */

const chartData = {

labels:["Mon","Tue","Wed","Thu","Fri","Sat"],

datasets:[{

label:"Average Waste Level",

data:chartLevels,

borderColor:"#22c55e",
backgroundColor:"rgba(34,197,94,0.2)",
tension:0.4

}]

};



return(

<div className="text-white">

<h1 className="text-3xl font-bold mb-8">
Smart Waste Control Center
</h1>



{/* CRITICAL ALERT */}

{criticalBins.length>0 && (

<div className="bg-red-600 p-4 rounded-xl mb-6 animate-pulse">

⚠ {criticalBins.length} bins need immediate collection

</div>

)}



{/* STAT CARDS */}

<div className="grid grid-cols-4 gap-6 mb-6">

<div className="bg-green-600 rounded-xl p-6 flex justify-between items-center">

<div>

<p>Total Bins</p>
<h2 className="text-3xl font-bold">{total}</h2>

</div>

<Trash2 size={40}/>

</div>



<div className="bg-red-500 rounded-xl p-6 flex justify-between items-center">

<div>

<p>Full Bins</p>
<h2 className="text-3xl font-bold">{full}</h2>

</div>

<AlertTriangle size={40}/>

</div>



<div className="bg-blue-600 rounded-xl p-6 flex justify-between items-center">

<div>

<p>Collection Trucks</p>
<h2 className="text-3xl font-bold">8</h2>

</div>

<Truck size={40}/>

</div>



<div className="bg-purple-600 rounded-xl p-6 flex justify-between items-center">

<div>

<p>Sensors Active</p>
<h2 className="text-3xl font-bold">{total}</h2>

</div>

<RadioTower size={40}/>

</div>

</div>



{/* CHART + PRIORITY */}

<div className="grid grid-cols-3 gap-6 mb-6">



{/* WASTE TREND */}

<div className="col-span-2 bg-slate-800 rounded-xl p-6">

<h2 className="mb-4 text-lg font-semibold">
Waste Level Trends
</h2>

<Line data={chartData}/>

</div>



{/* COLLECTION PRIORITY */}

<div className="bg-white text-black rounded-xl p-6">

<h2 className="font-semibold mb-4">
Collection Priority
</h2>

<div className="space-y-4">

{priorityBins.map(bin=>(

<div key={bin._id} className="flex justify-between">

<span>Bin #{bin.binId}</span>

<span className="bg-red-500 text-white px-3 py-1 rounded">
{bin.wasteLevel}%
</span>

</div>

))}

</div>

<div className="mt-6 border-t pt-4">

<h3 className="font-semibold mb-2">
System Status
</h3>

<p className="text-green-600 font-medium">
All sensors working normally
</p>

</div>

</div>

</div>



{/* MAP */}

<div className="bg-slate-800 rounded-xl p-6">

<h2 className="mb-4 text-lg font-semibold">
Smart Bin Map
</h2>

<div className="w-full h-[420px] rounded-lg overflow-hidden">

<iframe
title="map"
src="https://www.openstreetmap.org/export/embed.html"
className="w-full h-full"
/>

</div>

</div>

</div>

);

}