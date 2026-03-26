import { useEffect, useState } from "react";
import api from "../services/api";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";


export default function MapDashboard(){

const [bins,setBins] = useState([]);


/* FETCH BINS */

useEffect(()=>{

const fetchBins = async()=>{

const res = await api.get("/dustbins");
setBins(res.data);

};

fetchBins();

},[]);


/* SENSOR SIMULATION */

useEffect(()=>{

const interval = setInterval(()=>{

setBins(prev =>
prev.map(bin=>{

let level = bin.wasteLevel + Math.floor(Math.random()*5);

if(level>100) level = 20;

return{
...bin,
wasteLevel:level
}

})

)

},5000)

return ()=>clearInterval(interval)

},[]);



/* MARKER ICON */

const getIcon = (level)=>{

let color="green";

if(level>80) color="red";
else if(level>40) color="orange";

return new L.Icon({

iconUrl:`https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,

iconSize:[25,41],
iconAnchor:[12,41]

})

};



return(

<div className="p-6">

<h1 className="text-2xl font-bold text-gray-700 mb-6">
Smart Waste Map
</h1>


<div className="bg-white rounded-xl shadow p-4">

<MapContainer

center={[28.6139,77.2090]}
zoom={13}

style={{height:"500px",width:"100%"}}

>

<TileLayer
url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>


{bins.map(bin=>(

<Marker
key={bin._id}
position={[bin.latitude,bin.longitude]}
icon={getIcon(bin.wasteLevel)}
>

<Popup>

<strong>{bin.binId}</strong>

<br/>

Location: {bin.location}

<br/>

Waste Level: {bin.wasteLevel}%

<br/>

Status:

{bin.wasteLevel>80 && " 🔴 FULL"}
{bin.wasteLevel>40 && bin.wasteLevel<=80 && " 🟡 MEDIUM"}
{bin.wasteLevel<=40 && " 🟢 EMPTY"}

</Popup>

</Marker>

))}

</MapContainer>

</div>

</div>

)

}