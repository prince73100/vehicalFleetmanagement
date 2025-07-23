import React from "react";
import { Facebook, Twitter, Linkedin } from "lucide-react";
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-2">FleetManage</h2>
          <p className="text-sm text-gray-400">
            Your trusted vehicle management partner. Simplify your logistics and
            fleet tracking.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-blue-400">
                Home
              </a>
            </li>
            <li>
              <a href="/vehicles" className="hover:text-blue-400">
                Vehicles
              </a>
            </li>
            <li>
              <a href="/bookings" className="hover:text-blue-400">
                Bookings
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-blue-400">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook">
              <Facebook className="w-5 h-5 hover:text-blue-500" />
            </a>
            <a href="#" aria-label="Twitter">
              <Twitter className="w-5 h-5 hover:text-blue-400" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5 hover:text-blue-600" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} FleetManage. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
