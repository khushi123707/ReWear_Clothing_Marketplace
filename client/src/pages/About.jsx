import React from "react";
import { Leaf, HeartHandshake, Recycle, Users } from "lucide-react";
import { Link } from "react-router-dom";
export default function About(){
 return <main className="page-shell"><section className="about-hero"><div><p className="eyebrow">Our little green idea</p><h1>Good style.<br/><em>Better impact.</em></h1><p>ReWear brings people together to give pre-loved clothes a second life. We believe the most sustainable outfit is often the one that already exists.</p><Link to="/shop" className="btn btn-dark">Explore the community →</Link></div><img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200" alt="Friends enjoying fashion shopping"/></section>
 <section className="mission-grid"><article><Leaf/><h3>Our Mission</h3><p>Make clothing exchange simple, joyful and accessible to everyone.</p></article><article><Recycle/><h3>Less Waste</h3><p>Keep wearable clothing in use and help reduce unnecessary textile waste.</p></article><article><HeartHandshake/><h3>Share More</h3><p>Build a kind community where great pieces find new owners.</p></article><article><Users/><h3>Community First</h3><p>Connect people through thoughtful, affordable and conscious fashion.</p></article></section>
 <section className="about-quote"><h2>“A new outfit doesn't always need to be a new purchase.”</h2><p>Swap · Share · Wear</p></section></main>
}
