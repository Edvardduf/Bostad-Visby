import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function ContactUsPage() {
  return (
    <div className="flex flex-col min-h-screen "
    style={{
      background:
        "linear-gradient(to bottom, #FFFFFF, #EBF5FB, #E8F8F5, #E8F6F3, #D0ECE7, #D1F2EB, #EAFAF1 )",
    }}>
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8"  >
        <div className="bg-white shadow-md rounded-lg overflow-hidden"     style={{
      background:
        "linear-gradient(to bottom, #FFFFFF, #EBF5FB, #E8F8F5, #EBF5FB, #FFFFFF )",
    }}>
          <div className="p-4 md:p-8">
            <div className="mb-6">
              <img src="https://bostadvisby.se/images/johan.jpeg" alt="Johan Dufvenmark" className=" w-52 min-h-52 object-cover mx-auto rounded-lg shadow-lg" />
              <h2 className="text-2xl font-semibold text-center mt-4">Johan Dufvenmark - VD</h2>
              <p className="text-center mt-2">0498-264079 | SMS: 0732444045</p>
              <p className="text-center mt-1">Måndag - Fredag, 08:30 - 16:00</p>
              <p className="text-center mt-1">Epost: <a href="mailto:info@bostadvisby.se" className="text-blue-500">info@bostadvisby.se</a></p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">KUNDTJÄNST UTHYRARE:</h3>
              <p>Theodor Dufvenmark- Marknadsföring & Databas</p>
              <p>Epost: <a href="mailto:theodor@bostadvisby.se" className="text-blue-500">theodor@bostadvisby.se</a></p>
              <p className="mt-4">Jag vill hyra ut - <a href="/rent-out" className="text-blue-500">Klicka här!</a></p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Snigel-post:</h3>
              <p>Bostad Visby</p>
              <p>BrickMotion AB</p>
              <p>Vibble Kornettgatan 1</p>
              <p>62259 Visby</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ContactUsPage;
