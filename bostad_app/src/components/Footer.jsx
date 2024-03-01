import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 bottom-0">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-center md:text-left">
          <p className="text-lg font-semibold">Contact Us</p>
          <p className="mt-2">Nackademigatan 13, Stockholm, Sweden</p>
          <p><a href="https://rapidapi.com/vijaysairamv/api/sais-stock-analyzer/">API: rapidapi.com</a></p>
          <p>Phone: 112</p>
        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-lg font-semibold">Follow Us</p>
          <div className="flex mt-2">
            <a href="https://facebook.com/" className="mr-4" target="_blank" rel='noopener noreferrer'>
            <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="https://twitter.com/" className="mr-4" target="_blank" rel='noopener noreferrer'>
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com/" target="_blank" rel='noopener noreferrer'>
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
