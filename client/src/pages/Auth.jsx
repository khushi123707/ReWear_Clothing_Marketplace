import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";
export default function Auth({mode="login"}){
 const isSignup=mode==="signup"; const [form,setForm]=useState({name:"",email:"",password:"",city:""}); const [error,setError]=useState(""); const [busy,setBusy]=useState(false); const {saveSession}=useAuth(); const navigate=useNavigate();
 const change=e=>setForm({...form,[e.target.name]:e.target.value});
 const submit=async e=>{e.preventDefault();setError("");setBusy(true);try{const {data}=await api.post(`/auth/${mode==="signup"?"register":"login"}`,form);saveSession(data);navigate("/profile");}catch(e){setError(e.response?.data?.message||"Something went wrong. Please try again.");}finally{setBusy(false);}};
 return <main className="auth-page"><div className="auth-art"><span className="eyebrow">SWAP · SHARE · WEAR</span><h1>Make room for<br/><em>something loved.</em></h1><p>Join a community that makes fashion feel good in every way.</p><img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900" alt="Clothes on a rack"/></div><form className="auth-card" onSubmit={submit}><p className="eyebrow">{isSignup?"JOIN THE COMMUNITY":"WELCOME BACK"}</p><h2>{isSignup?"Create your account":"Login to ReWear"}</h2><p className="muted">{isSignup?"Start your sustainable style journey.":"Your next favourite find is waiting."}</p>
 {isSignup&&<><label>Full name</label><input name="name" value={form.name} onChange={change} placeholder="Your name" required/><label>City (optional)</label><input name="city" value={form.city} onChange={change} placeholder="Your city"/></>}
 <label>Email address</label><input name="email" type="email" value={form.email} onChange={change} placeholder="you@example.com" required/><label>Password</label><input name="password" type="password" value={form.password} onChange={change} placeholder="At least 6 characters" minLength="6" required/>
 {error&&<p className="error-text">{error}</p>}<button className="btn btn-dark full-btn" disabled={busy}>{busy?"Please wait...":isSignup?"Create Account":"Login"}</button><p className="auth-switch">{isSignup?"Already have an account?":"New to ReWear?"} <Link to={isSignup?"/login":"/signup"}>{isSignup?"Login":"Sign Up"}</Link></p></form></main>
}
