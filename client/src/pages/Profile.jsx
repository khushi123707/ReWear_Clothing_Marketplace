import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api";
export default function Profile(){
 const {user}=useAuth(); const [items,setItems]=useState([]);
 useEffect(()=>{api.get("/clothes").then(r=>setItems(r.data.filter(x=>x.owner?._id===user?.id))).catch(()=>{});},[user]);
 if(!user)return <main className="page-shell empty-state"><h1>Profile</h1><p>Please login first.</p><Link to="/login" className="btn btn-dark">Login</Link></main>;
 return <main className="page-shell"><div className="profile-header"><div className="avatar">{user.name?.[0]?.toUpperCase()}</div><div><p className="eyebrow">YOUR REWEAR SPACE</p><h1>{user.name}</h1><p>{user.email} {user.city&&`· ${user.city}`}</p></div><Link className="btn btn-dark" to="/add-clothes">+ Add Clothes</Link></div><h2 className="subheading">Your active listings</h2><div className="product-grid">{items.map(item=><div className="clothing-card" key={item._id}><img className="profile-item-img" src={item.image} alt={item.title}/><div className="clothing-info"><div><h3>{item.title}</h3><small>{item.category}</small></div></div></div>)}</div>{!items.length&&<div className="empty-state"><p>You haven't listed any clothes yet.</p><Link className="text-link" to="/add-clothes">List your first piece →</Link></div>}</main>
}
