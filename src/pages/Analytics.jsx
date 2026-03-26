import { useEffect, useState } from "react";
import api from "../services/api";

import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
LineElement,
ArcElement,
PointElement,
Tooltip,
Legend
} from "chart.js";

import { Bar, Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
LineElement,
ArcElement,
PointElement,
Tooltip,
Legend
);

export default function Analytics(){

const [bins,setBins] = useState([]);

useEffect(()=>{

const fetchBins = async()=>{

const res = await api.get("/dustbins");
setBins(res.data);

};

fetchBins();

},[]);


const total = bins.length;

const full = bins.filter(b=>b.wasteLevel>75).length;
const medium = bins.filter(b=>b.wasteLevel>40 && b.wasteLevel<=75).length;
const empty = bins.filter(b=>b.wasteLevel<=40).length;


const statusData = {

labels:["Full","Medium","Empty"],

datasets:[{

data:[full,medium,empty],

backgroundColor:["#ef4444","#f59e0b","#22c55e"]

}]

};


const trendData = {

labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],

datasets:[{

label:"Waste Level Trend",

data:[12,19,15,22,30,28,35],

borderColor:"#22c55e",
backgroundColor:"rgba(34,197,94,0.2)",
tension:0.4

}]

};


const distributionData = {

labels:["Full","Medium","Empty"],

datasets:[{

label:"Waste Distribution",

data:[full,medium,empty],

backgroundColor:["#ef4444","#f59e0b","#22c55e"]

}]

};


return(

<div className="p-6">

<h1 className="text-2xl font-bold mb-6 text-gray-700">
Waste Analytics Dashboard
</h1>


{/* STAT CARDS */}

<div className="grid grid-cols-3 gap-6 mb-8">

<div className="bg-white p-5 rounded-xl shadow">

<p className="text-gray-500 text-sm">Total Bins</p>

<h2 className="text-2xl font-bold">{total}</h2>

</div>


<div className="bg-white p-5 rounded-xl shadow">

<p className="text-gray-500 text-sm">Full Bins</p>

<h2 className="text-2xl font-bold text-red-600">{full}</h2>

</div>


<div className="bg-white p-5 rounded-xl shadow">

<p className="text-gray-500 text-sm">Medium Bins</p>

<h2 className="text-2xl font-bold text-yellow-600">{medium}</h2>

</div>

</div>


{/* CHARTS */}

<div className="grid grid-cols-2 gap-6">


{/* TREND */}

<div className="bg-white p-6 rounded-xl shadow">

<h2 className="font-semibold mb-4">
Weekly Waste Trend
</h2>

<Line data={trendData}/>

</div>


{/* STATUS PIE */}

<div className="bg-white p-6 rounded-xl shadow">

<h2 className="font-semibold mb-4">
Bin Status Distribution
</h2>

<Doughnut data={statusData}/>

</div>


{/* BAR CHART */}

<div className="bg-white p-6 rounded-xl shadow col-span-2">

<h2 className="font-semibold mb-4">
Waste Distribution
</h2>

<Bar data={distributionData}/>

</div>


</div>

</div>

);

}