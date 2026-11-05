import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";
export default function ItemDetail(){
 const {id}=useParams(); const {user}=useAuth(); const [item,setItem]=useState(null); const [message,setMessage]=useState(""); const [notice,setNotice]=useState("");
 useEffect(()=>{api.get(`/clothes/${id}`).then(r=>setItem(r.data)).catch(()=>setNotice("This item could not be found."));},[id]);
 const send=async()=>{if(!user){setNotice("Please login before sending a swap request.");return;}try{const {data}=await api.post("/swaps",{clothingId:id,message});setNotice("Swap request sent successfully!");}catch(e){setNotice(e.response?.data?.message||"Could not send request.");}};
 if(!item)return <main className="page-shell center">{notice||"Loading item..."}</main>;
 return <main className="page-shell"><div className="detail-layout"><img className="detail-image" src={item.image} alt={item.title}/><div className="detail-copy"><p className="eyebrow">{item.category}</p><h1>{item.title}</h1><p>{item.description}</p><div className="detail-facts"><span>Size <b>{item.size}</b></span><span>Condition <b>{item.condition}</b></span><span>Listed by <b>{item.ownerName||item.owner?.name||"Community"}</b></span></div><label className="field-label">Add a message with your request</label><textarea rows="4" value={message} onChange={e=>setMessage(e.target.value)} placeholder="Hi! I'd love to swap for this piece..."/><button className="btn btn-dark" onClick={send}>Send Swap Request →</button>{notice&&<p className="form-message">{notice}</p>}<Link className="text-link" to="/shop">← Back to Shop</Link></div></div></main>
}
