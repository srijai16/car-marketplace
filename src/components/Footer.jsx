import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">

      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white">
              Car<span className="text-blue-500">Space</span>
            </h2>
            <p className="mt-4 text-sm text-gray-400">
              Find the best cars to buy or rent with verified listings,
              transparent pricing and secure payments.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition">Browse Cars</a></li>
              <li><a href="#" className="hover:text-white transition">Rent a Car</a></li>
              <li><a href="#" className="hover:text-white transition">Sell Your Car</a></li>
              <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Careers</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to get latest car deals and offers.
            </p>

            <div className="flex bg-white">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 rounded-l-md text-black focus:outline-none"
              />
              <button className="bg-blue-600 px-4 py-2 rounded-r-md text-white hover:bg-blue-700 transition">
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">

          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} CarSpace. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex gap-5 mt-4 md:mt-0 text-gray-400">
            <FaFacebookF className="hover:text-white cursor-pointer transition" />
            <FaInstagram className="hover:text-white cursor-pointer transition" />
            <FaTwitter className="hover:text-white cursor-pointer transition" />
            <FaGithub className="hover:text-white cursor-pointer transition" />
          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;