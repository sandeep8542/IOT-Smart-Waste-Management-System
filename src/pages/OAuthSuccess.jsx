import { useEffect } from "react";

export default function OAuthSuccess(){

useEffect(()=>{

const params = new URLSearchParams(window.location.search);
const token = params.get("token");

if(token){

localStorage.setItem("token", token);

// redirect to dashboard
window.location.replace("/dashboard");

}else{

window.location.replace("/login");

}

},[]);

return (
<div className="h-screen flex items-center justify-center bg-slate-900 text-white">
Logging you in...
</div>
);

}