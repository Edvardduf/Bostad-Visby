import React from "react";
import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <footer className="py-4 bg-gray-900 text-white text-center">
      © {new Date().getFullYear()} Your Company. All rights reserved.
    </footer>
  );
}