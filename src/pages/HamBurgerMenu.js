import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HamburgerMenu.css';

function HamburgerMenu({ color = "white" ,linkColor = "white" }) {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  return (
    <div className="menu-container">
      <div
        className={`hamburger ${open ? 'open' : ''}`}
        onClick={toggleMenu}
        style={{ color: color }}
      >
        <span style={{ background: color }}></span>
        <span style={{ background: color }}></span>
        <span style={{ background: color }}></span>
      </div>

      {open && (
        <div className="menu-dropdown">
          <Link className="dropdown-item" to="/" onClick={toggleMenu}  style={{ color: linkColor }}>Home</Link>
          <Link className="dropdown-item" to="/calculator" onClick={toggleMenu}  style={{ color: linkColor }}>CGPA Calculator</Link>
          <Link className="dropdown-item" to="/ResultCard" onClick={toggleMenu}  style={{ color: linkColor }}>Result Card</Link>
        </div>
      )}
    </div>
  );
}

export default HamburgerMenu;
