import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ItemDetail from "./pages/ItemDetail";
import Swaps from "./pages/Swaps";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import AddClothes from "./pages/AddClothes";

export default function App(){
 const location=useLocation();
 return <><Navbar/><Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/shop" element={<Shop/>}/>
  <Route path="/shop/:id" element={<ItemDetail/>}/>
  <Route path="/swaps" element={<Swaps/>}/>
  <Route path="/about" element={<About/>}/>
  <Route path="/login" element={<Auth mode="login"/>}/>
  <Route path="/signup" element={<Auth mode="signup"/>}/>
  <Route path="/profile" element={<Profile/>}/>
  <Route path="/add-clothes" element={<AddClothes/>}/>
  <Route path="*" element={<main className="page-shell empty-state"><h1>Page not found</h1><a href="/">Go Home</a></main>}/>
 </Routes><Footer/></>
}
