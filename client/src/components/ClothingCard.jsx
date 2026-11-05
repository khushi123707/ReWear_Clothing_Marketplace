import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
export default function ClothingCard({ item }) {
 const image = item.title === "Cream everyday top"
  ? "https://images.unsplash.com/photo-1759992878512-ec8f958b13e7?auto=format&fit=crop&w=900&q=85"
  : item.image;
 return <article className="clothing-card">
  <Link to={`/shop/${item._id}`} className="clothing-image"><img src={image} alt={item.title} loading="lazy"/><span className="condition">{item.condition || "Pre-loved"}</span></Link>
  <div className="clothing-info"><div><p className="eyebrow">{item.category}</p><h3>{item.title}</h3><small>Size {item.size || "M"} · {item.ownerName || item.owner?.name || "Community"}</small></div><Link className="round-arrow" to={`/shop/${item._id}`} aria-label="View item"><ArrowUpRight size={18}/></Link></div>
 </article>
}
