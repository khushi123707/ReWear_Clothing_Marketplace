import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Linkedin, Youtube, Github, Mail, MapPin } from "lucide-react";
export default function Footer() {
 return <footer className="footer">
  <div className="footer-grid">
   <div className="footer-brand"><div className="brand footer-logo"><span className="hanger">♧</span><span>ReWear</span></div><small>Swap · Share · Wear</small><p>A sustainable fashion community<br/>for a greener tomorrow.</p><div className="socials"><a href="https://instagram.com" aria-label="Instagram"><Instagram/></a><a href="https://linkedin.com" aria-label="LinkedIn"><Linkedin/></a><a href="https://youtube.com" aria-label="YouTube"><Youtube/></a><a href="https://github.com" aria-label="GitHub"><Github/></a></div></div>
   <div><h4>Quick Links</h4><Link to="/">Home</Link><Link to="/shop">Shop</Link><Link to="/swaps">Swap Requests</Link><Link to="/about">About</Link></div>
   <div><h4>Categories</h4>{["Women's Wear","Men's Wear","Dresses","Accessories"].map(x=><Link key={x} to="/shop">{x}</Link>)}</div>
   <div><h4>Contact Us</h4><a href="mailto:support@rewear.com"><Mail size={15}/> support@rewear.com</a><span><MapPin size={15}/> India</span></div>
  </div>
  <div className="copyright">© 2026 ReWear. All rights reserved.　|　Reduce. Reuse. ReWear ♡</div>
 </footer>
}
