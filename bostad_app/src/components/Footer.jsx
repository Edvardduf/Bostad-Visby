import React from "react";
import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <footer className="py-8 bg-black text-white text-center font-semibold">
      © {new Date().getFullYear()} Bostad Visby. All rights reserved.
      <h1 className="py-4">Hemsida av Eddie Dove and Ray J</h1>
    </footer>
  );
}