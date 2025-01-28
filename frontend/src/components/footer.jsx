import React from 'react';

const Footer = () => (
  <footer className="bg-gray-800 text-white p-4 text-center mt-8">
    <div className="mb-2">
      © {new Date().getFullYear()} Instagram Downloader
    </div>
    <div className="text-sm text-gray-400">
      Disclaimer: Respect copyright laws. Use downloaded content responsibly.
    </div>
  </footer>
);

export default Footer;
