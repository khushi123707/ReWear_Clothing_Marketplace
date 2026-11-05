import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Repeat2, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import api from "../api";
import ClothingCard from "../components/ClothingCard";
import Newsletter from "../components/Newsletter";

const categories = [
 ["Women's Wear","https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=500"],
 ["Men's Wear","https://images.unsplash.com/photo-1740711152088-88a009e877bb?auto=format&fit=crop&w=900&q=85"],
 ["Dresses","https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500"],
 ["Tops","https://images.unsplash.com/photo-1566740013467-764247e207ab?auto=format&fit=crop&w=900&q=85"],
 ["Jeans","https://images.unsplash.com/photo-1542272604-787c3835535d?w=500"],
 ["Accessories","https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500"],
 ["Footwear","https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"],
 ["Others","https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500"]
];
const reviews = [
 ["Priya Sharma","Loved using ReWear! It’s easy, useful and eco-friendly.","https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160"],
 ["Anjali Verma","A great platform to swap clothes and reduce waste.","https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160"],
 ["Sneha Gupta","Stylish, sustainable and simple!","https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160"]
];
export default function Home() {
 const [items,setItems]=useState([]); const [review,setReview]=useState(0);
 useEffect(()=>{api.get("/clothes").then(r=>setItems(r.data.slice(0,4))).catch(()=>{});},[]);
 return <main>
  <section className="hero">
   <div className="hero-copy"><span className="spark">〰</span><h1>ReWear <span>♡</span></h1><h2>Swap · Share · Wear</h2><p>Give your clothes a new home and<br/>find something you love!</p><Link className="btn btn-dark" to="/shop">Start Swapping <ArrowRight size={17}/></Link></div>
   <div className="hero-photo"><img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1500" alt="Beautiful clothing collection on a rack"/></div>
  </section>

  <section className="section category-section">
   <div className="section-heading"><span></span><h2>Shop by Category</h2><span></span></div>
   <div className="category-grid">{categories.map(([name,img],i)=><Link to={`/shop?category=${encodeURIComponent(name)}`} className={`category-tile tint-${i%6}`} key={name}><img src={img} alt={name}/><strong>{name}</strong></Link>)}</div>
  </section>

  <section className="about-preview section">
   <div className="about-copy"><p className="eyebrow">A kinder way to dress</p><h2>About ReWear</h2><p>ReWear is a sustainable clothing exchange platform where you can swap, share, and give clothes a second life. Together, let's build a more eco-friendly and stylish community!</p><Link to="/about" className="btn btn-dark">Learn More <ArrowRight size={17}/></Link></div>
   <div className="about-photo"><img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200" alt="Calm sustainable home interior"/></div>
  </section>

  <section className="values-strip"><div><Leaf/><span><b>Go Green</b><small>Reduce textile waste</small></span></div><div><Repeat2/><span><b>Easy Swap</b><small>Exchange in clicks</small></span></div><div><ShieldCheck/><span><b>Trusted Community</b><small>Safe & Secure</small></span></div></section>

  <section className="section featured"><div className="section-heading"><span></span><h2>Fresh Finds for You</h2><span></span></div><p className="center muted">Pre-loved pieces, ready for a new story.</p><div className="product-grid">{items.map(item=><ClothingCard key={item._id} item={item}/>)}</div><div className="center"><Link className="text-link" to="/shop">Explore all clothes <ArrowRight size={16}/></Link></div></section>

  <section className="section testimonials"><div className="section-heading"><span></span><h2>What Our Community Says</h2><span></span></div><div className="review-grid">{[0,1,2].map((offset)=><article className="review-card" key={offset}><img src={reviews[(review+offset)%3][2]} alt="Community member"/><div><p>“{reviews[(review+offset)%3][1]}”</p><b>— {reviews[(review+offset)%3][0]}</b><div className="stars">★★★★★</div></div></article>)}</div><div className="review-controls"><button onClick={()=>setReview((review+2)%3)} aria-label="Previous review"><ChevronLeft/></button><span>{[0,1,2].map(n=><i className={review===n?"dot selected":"dot"} key={n}/>)}</span><button onClick={()=>setReview((review+1)%3)} aria-label="Next review"><ChevronRight/></button></div></section>
  <Newsletter/>
 </main>
}
