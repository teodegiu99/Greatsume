import React from "react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      Copyright © <span className=""> &nbsp; Matteo De Giuseppe &nbsp;</span>
      {currentYear}
    </footer>
  );
};

export default Footer;
