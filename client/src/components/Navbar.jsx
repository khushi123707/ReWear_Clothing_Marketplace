import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, LogIn, UserRound } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const links = [["Home","/"],["Shop","/shop"],["Swap Requests","/swaps"],["About","/about"]];
  const close = () => setOpen(false);
  return <header className="navbar">
    <Link to="/" className="brand" onClick={close}><span className="hanger">♧</span><span>ReWear</span></Link>
    <button className="mobile-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X/> : <Menu/>}</button>
    <nav className={open ? "nav-links open" : "nav-links"}>
      {links.map(([label,path]) => <NavLink key={path} to={path} onClick={close} className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>{label}</NavLink>)}
    </nav>
    <div className="nav-actions">
      {user ? <><Link className="login-btn" to="/profile"><UserRound size={16}/> {user.name.split(" ")[0]}</Link><button className="signup-btn" onClick={() => {logout(); navigate("/");}}>Logout</button></>
      : <><Link className="login-btn" to="/login"><LogIn size={16}/> Login</Link><Link className="signup-btn" to="/signup">Sign Up</Link></>}
    </div>
  </header>;
}
