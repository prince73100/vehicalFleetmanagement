import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Optional icon library (or use any)
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Vehicles', path: '/addVehical' },
    { name: 'Bookings', path: '/booking-details' },
    { name: 'Fleet', path: '/availableVehical' },
    { name: 'Contact', path: '#' }
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">FleetManage</Link>

        
        <div className="hidden md:flex space-x-6">
          {navLinks.map(link => (
            <Link
              key={link.name}
              to={link.path}
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
              {link.name}
            </Link>
          ))}
        </div>

       
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

     
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-2">
          {navLinks.map(link => (
            <Link
              key={link.name}
              to={link.path}
              className="block text-gray-700 hover:text-blue-600 transition font-medium"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
