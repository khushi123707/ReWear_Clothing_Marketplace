import React, { useState } from "react";
import { Mail } from "lucide-react";
import api from "../api";
export default function Newsletter() {
 const [email,setEmail]=useState(""); const [message,setMessage]=useState("");
 const submit=async(e)=>{e.preventDefault();try{const {data}=await api.post("/newsletter",{email});setMessage(data.message);setEmail("");}catch{setMessage("Please try again in a moment.");}};
 return <section className="newsletter"><Mail className="newsletter-icon" size={54}/><div><h2>Stay Connected</h2><p>Get updates, style tips and more!</p></div><form onSubmit={submit}><input type="email" placeholder="Enter your email address" value={email} onChange={e=>setEmail(e.target.value)} required/><button className="btn btn-dark">Subscribe</button></form>{message && <small className="newsletter-message">{message}</small>}</section>
}
