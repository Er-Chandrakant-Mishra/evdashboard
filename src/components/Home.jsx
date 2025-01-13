import React from "react";
import { Link } from "react-router-dom";
import { FaCar, FaBatteryFull, FaCloud } from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
     
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to EV Dashboard</h1>
        <p className="mt-4 text-xl text-gray-600">
          Track, analyze, and explore Electric Vehicles.
        </p>
      </header>

 
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
     
        <div className="feature-box bg-blue-200 p-6 rounded-lg shadow-lg hover:scale-105 transition-all">
          <FaCar className="text-4xl text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-center text-blue-800">Explore EVs</h3>
          <p className="text-lg text-center text-gray-700">
            Learn about different electric vehicles, their models, and specifications.
          </p>
          <Link
            to="/dashboard"
            className="mt-4 inline-block px-6 py-2 bg-blue-500 text-white rounded-full text-lg font-semibold"
          >
            View Dashboard
          </Link>
        </div>


        <div className="feature-box bg-green-200 p-6 rounded-lg shadow-lg hover:scale-105 transition-all">
          <FaBatteryFull className="text-4xl text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-center text-green-800">Battery Information</h3>
          <p className="text-lg text-center text-gray-700">
            Discover the battery technology behind electric vehicles and how it powers your journey.
          </p>
          <Link
            to="/dashboard"
            className="mt-4 inline-block px-6 py-2 bg-green-500 text-white rounded-full text-lg font-semibold"
          >
            Learn More
          </Link>
        </div>

        <div className="feature-box bg-yellow-200 p-6 rounded-lg shadow-lg hover:scale-105 transition-all">
          <FaCloud className="text-4xl text-yellow-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-center text-yellow-800">Charging Stations</h3>
          <p className="text-lg text-center text-gray-700">
            Find nearby EV charging stations to keep your electric vehicle powered.
          </p>
          <Link
            to="/dashboard"
            className="mt-4 inline-block px-6 py-2 bg-yellow-500 text-white rounded-full text-lg font-semibold"
          >
            Locate Stations
          </Link>
        </div>
      </section>


      <footer className="mt-12 text-center text-gray-600">
        <p>&copy; 2025 Electric Vehicle Dashboard | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Home;
