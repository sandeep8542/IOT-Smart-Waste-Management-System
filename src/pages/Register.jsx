import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bg from "../assets/waste-bg.jpg";
import api from "../services/api";

export default function Register(){

const navigate = useNavigate();

const [form,setForm] = useState({
name:"",
email:"",
password:""
});

const handleChange = (e)=>{
setForm({...form,[e.target.name]:e.target.value});
};

const handleSubmit = async(e)=>{

e.preventDefault();

try{

await api.post("/auth/register",form);

alert("Account created successfully");

navigate("/login");

}catch(err){

alert("Registration failed");

}

};

return(

<div
className="h-screen bg-cover bg-center flex items-center justify-end pr-32 relative"
style={{backgroundImage:`url(${bg})`}}
>

{/* DARK OVERLAY */}

<div className="absolute inset-0 bg-black/70"></div>


{/* HERO TEXT */}

<div className="absolute top-24 left-20 text-white max-w-lg">

<h1 className="text-6xl font-extrabold tracking-tight mb-6 leading-tight drop-shadow-lg">

<span className="text-green-400">Join</span> Smart Waste

</h1>

<div className="w-16 h-1 bg-green-400 mb-6"></div>

<p className="text-xl text-gray-200 leading-relaxed">

“Together we can build cleaner, smarter, and more
sustainable cities.”

</p>

</div>


{/* REGISTER CARD */}

<div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-10 rounded-xl shadow-2xl w-[420px]">

<h2 className="text-3xl font-bold text-white mb-6"> <center>Create Account</center></h2>

<input
name="name"
placeholder="Name"
className="w-full p-3 mb-4 rounded bg-white/20 text-white placeholder-white outline-none focus:ring-2 focus:ring-green-400"
onChange={handleChange}
/>

<input
name="email"
placeholder="Email"
className="w-full p-3 mb-4 rounded bg-white/20 text-white placeholder-white outline-none focus:ring-2 focus:ring-green-400"
onChange={handleChange}
/>

<input
name="password"
type="password"
placeholder="Password"
className="w-full p-3 mb-6 rounded bg-white/20 text-white placeholder-white outline-none focus:ring-2 focus:ring-green-400"
onChange={handleChange}
/>

<button
onClick={handleSubmit}
className="w-full bg-green-600 hover:bg-green-700 py-3 rounded text-white font-semibold transition mb-4"
>

Register

</button>

<p className="text-center text-gray-200">

Already have an account?

<Link to="/login" className="text-green-400 ml-2">

Login

</Link>

</p>

</div>

</div>

);

}