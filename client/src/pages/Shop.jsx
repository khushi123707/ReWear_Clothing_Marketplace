import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import api from "../api";
import ClothingCard from "../components/ClothingCard";
const categories=["All","Women's Wear","Men's Wear","Dresses","Tops","Jeans","Accessories","Footwear","Others"];
export default function Shop(){
 const [params,setParams]=useSearchParams(); const [items,setItems]=useState([]); const [search,setSearch]=useState(""); const [category,setCategory]=useState(params.get("category")||"All"); const [loading,setLoading]=useState(true);
 useEffect(()=>{setLoading(true);api.get("/clothes",{params:{category,search}}).then(r=>setItems(r.data)).catch(()=>setItems([])).finally(()=>setLoading(false));},[category,search]);
 return <main className="page-shell"><div className="page-heading"><p className="eyebrow">Find your next favourite</p><h1>Shop pre-loved style</h1><p>Every piece deserves another chance to be loved.</p></div>
 <div className="shop-toolbar"><div className="search-box"><Search size={18}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search clothes..."/></div><div className="filter-box"><SlidersHorizontal size={17}/><select value={category} onChange={e=>{setCategory(e.target.value);setParams(e.target.value==="All"?{}:{category:e.target.value});}}>{categories.map(c=><option key={c}>{c}</option>)}</select></div></div>
 {loading?<p className="center muted">Loading clothes...</p>:items.length?<div className="product-grid shop-grid">{items.map(item=><ClothingCard key={item._id} item={item}/>)}</div>:<div className="empty-state"><h3>No clothes found yet</h3><p>Try another category or search term.</p></div>}
 </main>
}
