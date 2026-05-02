import React from "react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

  return (
    <footer className="footer text-sm flex items-center justify-center">
      © {new Date().getFullYear()} Greatsume
    </footer>
  );
};

export default Footer;
