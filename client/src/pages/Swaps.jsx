import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";
export default function Swaps(){
 const {user}=useAuth(); const [swaps,setSwaps]=useState([]); const [notice,setNotice]=useState("");
 const load=()=>api.get("/swaps/my").then(r=>setSwaps(r.data)).catch(e=>setNotice(e.response?.data?.message||"Please login to view swap requests."));
 useEffect(()=>{if(user)load();},[user]);
 const update=async(id,status)=>{try{await api.patch(`/swaps/${id}`,{status});load();}catch(e){setNotice(e.response?.data?.message||"Could not update request.");}};
 if(!user)return <main className="page-shell empty-state"><h1>Your swap space</h1><p>Please login to see your sent and received swap requests.</p><Link className="btn btn-dark" to="/login">Login</Link></main>;
 return <main className="page-shell"><div className="page-heading"><p className="eyebrow">Community exchange</p><h1>Swap Requests</h1><p>Keep track of the pieces you want and the requests you receive.</p></div>{notice&&<p className="form-message">{notice}</p>}
 <div className="swap-list">{swaps.map(s=><article className="swap-row" key={s._id}><img src={s.clothing?.image} alt="Requested clothing"/><div className="swap-main"><h3>{s.clothing?.title||"Clothing item"}</h3><p>{s.message||"I'd love to swap for this item."}</p><small>Requested by {s.requester?.name||"Community member"}</small></div><span className={`status ${s.status}`}>{s.status}</span>{s.listingOwner===user.id&&s.status==="pending"&&<div className="swap-actions"><button onClick={()=>update(s._id,"accepted")}>Accept</button><button onClick={()=>update(s._id,"rejected")}>Decline</button></div>}</article>)}{!swaps.length&&<div className="empty-state"><h3>No swap requests yet</h3><p>Explore the shop and send a request to start swapping.</p><Link className="text-link" to="/shop">Browse clothes →</Link></div>}</div></main>
}
