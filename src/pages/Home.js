import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import your custom CSS for additional styling
import dtu_logo from "../images/dtu_logo.png"; // Import the DTU logo image
import { Link } from 'react-router-dom';
import HamburgerMenu from './HamBurgerMenu'; // Import the HamburgerMenu component

function Home() {
  const [rollNo, setRollNo] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const encodedRollNo = encodeURIComponent(rollNo);
    navigate(`/results/${encodedRollNo}`);
  };

  return (

    <div className="home-container">
      <HamburgerMenu color="white" linkColor="white"/>
      <div className="overlay">
        <div className="content">
          <img src={dtu_logo} alt="DTU Logo" className="logo mb-4 dtu-logo-home" />

          <h1 className="mb-3">DTU Results Portal</h1>
          <p className="mb-4">Check your semester-wise results and CGPA easily.</p>
          <form onSubmit={handleSubmit} className="form-inline">
            <input
              type="text"
              className="form-control mb-2 mr-sm-2"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              placeholder="Enter your Roll Number (e.g., 23/CS/007)"
              required
            />
            {/* <button type="submit" className="btn btn-primary mb-2">View Results</button>
            <button >CGPA Calculator</button> */}
            <div className="text-center mt-4">
              <div className="d-inline-flex gap-3">
                <button type="submit" className="btn btn-primary btn-lg px-4">View Results</button>
                {/* <Link to="/calculator" className="btn btn-secondary btn-lg px-4">CGPA Calculator</Link> */}
              </div>
            </div>
          </form>

        </div>
      </div>
      <footer className="footer text-center">
        <p>© 2025 DTU Results Portal | Built by Ayush Kumar</p>
      </footer>
      {/* <HamburgerMenu /> */}

    </div>

  );
}

export default Home;
