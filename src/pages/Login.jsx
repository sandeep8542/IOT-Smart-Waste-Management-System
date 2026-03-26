import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bg from "../assets/waste-bg.jpg";
import api from "../services/api";
import { Mail, Lock } from "lucide-react";

export default function Login() {

const navigate = useNavigate();

const [form,setForm] = useState({
email:"",
password:""
});

const handleChange = (e)=>{
setForm({...form,[e.target.name]:e.target.value});
};

const handleSubmit = async(e)=>{

e.preventDefault();

try{

const res = await api.post("/auth/login",form);

localStorage.setItem("token",res.data.token);

navigate("/dashboard");

}catch(err){

alert("Invalid credentials");

}

};

return(

<div
className="h-screen bg-cover bg-center flex items-center justify-end pr-32 relative"
style={{backgroundImage:`url(${bg})`}}
>

{/* DARK OVERLAY */}

<div className="absolute inset-0 bg-black/70"></div>


{/* HERO TEXT LEFT */}

<div className="absolute top-24 left-20 text-white max-w-lg">

<h1 className="text-6xl font-extrabold tracking-tight mb-6 leading-tight drop-shadow-lg">

<span className="text-green-400">Smart</span> Waste System

</h1>

<div className="w-16 h-1 bg-green-400 mb-6"></div>

<p className="text-xl text-gray-200 leading-relaxed">

“Clean cities begin with smart systems. Technology can transform waste
into sustainability and create greener urban environments.”

</p>

</div>


{/* LOGIN CARD */}

<div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-10 rounded-xl shadow-2xl w-[420px]">

<h2 className="text-3xl font-bold text-white mb-2 text-center">
Welcome
</h2>

<p className="text-gray-200 mb-6 text-center">
Login with Email
</p>


{/* EMAIL */}

<div className="flex items-center bg-white/20 rounded p-3 mb-4">

<Mail className="text-white mr-2" size={18}/>

<input
name="email"
placeholder="Email"
className="bg-transparent outline-none text-white w-full placeholder-white"
onChange={handleChange}
/>

</div>


{/* PASSWORD */}

<div className="flex items-center bg-white/20 rounded p-3 mb-2">

<Lock className="text-white mr-2" size={18}/>

<input
name="password"
type="password"
placeholder="Password"
className="bg-transparent outline-none text-white w-full placeholder-white"
onChange={handleChange}
/>

</div>

<div className="text-right text-sm text-gray-300 mb-4">
Forgot your password?
</div>


{/* LOGIN BUTTON */}

<button
onClick={handleSubmit}
className="w-full bg-green-600 hover:bg-green-700 py-3 rounded text-white font-semibold transition mb-6"
>

LOGIN

</button>


{/* OR DIVIDER */}

<div className="flex items-center mb-6">

<div className="flex-grow border-t border-gray-300"></div>

<span className="mx-4 text-gray-200">OR</span>

<div className="flex-grow border-t border-gray-300"></div>

</div>


{/* SOCIAL LOGIN */}

<div className="flex justify-between gap-4">

<button
onClick={()=>window.open("http://localhost:5000/api/auth/google","_self")}
className="flex-1 bg-white text-black py-2 rounded flex items-center justify-center gap-2"
>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" width="20"/>
Google
</button>

<button
onClick={()=>window.open("http://localhost:5000/api/auth/github","_self")}
className="flex-1 bg-white text-black py-2 rounded flex items-center justify-center gap-2"
>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" width="20"/>
GitHub
</button>

</div>


{/* REGISTER */}

<p className="text-center text-gray-200 mt-6">

Don't have account?

<Link to="/register" className="text-green-400 ml-2">
Register Now
</Link>

</p>

</div>

</div>

);

}