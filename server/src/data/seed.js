import Clothing from "../models/Clothing.js";

const demoItems = [
  ["Soft pink hoodie","Women's Wear","S","https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=900"],
  ["Classic forest green jacket","Men's Wear","M","https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=900"],
  ["Floral summer dress","Dresses","S","https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=900"],
  ["Cream everyday top","Tops","M","https://images.unsplash.com/photo-1759992878512-ec8f958b13e7?auto=format&fit=crop&w=900&q=85"],
  ["Blue denim jeans","Jeans","M","https://images.unsplash.com/photo-1542272604-787c3835535d?w=900"],
  ["Everyday tan handbag","Accessories","One Size","https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900"],
  ["White casual sneakers","Footwear","7","https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900"],
  ["Minimal black cap","Others","One Size","https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=900"]
];

export async function seedClothes() {
  if (await Clothing.countDocuments() > 0) return;
  await Clothing.insertMany(demoItems.map(([title, category, size, image]) => ({
    title, category, size, image,
    description: "A pre-loved piece looking for a new home. Clean, cared for and ready to be loved again.",
    condition: "Very Good",
    ownerName: "ReWear Community"
  })));
  console.log("Demo clothing catalogue added.");
}
