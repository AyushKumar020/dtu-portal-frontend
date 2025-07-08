import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import './ResultCard.css';
import logo from '../images/dtu_logo.png'; // Import the DTU logo image
import HamburgerMenu from './HamBurgerMenu'; // Import the HamburgerMenu component

function ResultCard() {
  const [rollNo, setRollNo] = useState('');
  const [student, setStudent] = useState(null);
  const [sgpaData, setSgpaData] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('resultCardDarkMode') === 'true';
  });

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('resultCardDarkMode', darkMode);
  }, [darkMode]);

  const fetchResultCard = async () => {
    try {
      const res = await fetch(`https://dtu-portal-backend-production.up.railway.app/api/students/roll/${encodeURIComponent(rollNo)}`);
      const data = await res.json();
      setStudent(data);

      // Fetch SGPA data for the student
      const sgpaRes = await fetch(`https://dtu-portal-backend-production.up.railway.app/api/sgpa/${data.id}`);
      const sgpaJson = await sgpaRes.json();
      setSgpaData(sgpaJson);
    } catch (err) {
      console.error(err);
    }
  };

  const calculateAggregateCGPA = () => {
    if (sgpaData.length === 0) return 'N/A';
    let totalWeighted = 0;
    let totalCredits = 0;

    sgpaData.forEach(s => {
      totalWeighted += s.sgpa * s.total_credits;
      totalCredits += s.total_credits;
    });

    return (totalWeighted / totalCredits).toFixed(2);
  };

  const calculateBestSGPA = () => {
    if (sgpaData.length === 0) return 'N/A';
    return Math.max(...sgpaData.map(s => s.sgpa)).toFixed(2);
  };

  const downloadCard = () => {
    const card = document.getElementById('result-card');
    html2canvas(card).then(canvas => {
      const link = document.createElement('a');
      link.download = 'result_card.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div className={`result-card-page ${darkMode ? 'dark-mode' : ''}`}>
      <HamburgerMenu color="white" linkColor="white" />
      <h1>Get Your Personalised Result Card</h1>
      <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <input
        type="text"
        placeholder="Enter Roll Number (e.g., 23/CS/007)"
        value={rollNo}
        onChange={(e) => setRollNo(e.target.value)}
      />
      <button onClick={fetchResultCard}>Fetch Result Card</button>

      {student && (
        <div className="card-container">
          <div className="result-card" id="result-card">
            <img src={logo} alt="DTU Logo" className="dtu-logo" />
            <h2>DELHI TECHNOLOGICAL UNIVERSITY</h2>
            <div className="student-info">
              <h3>{student.name}</h3>
              <p><strong>Roll No:</strong> {student.roll_no}</p>
              <div className="batch-branch">
                <p><strong>Branch:</strong> {student.branch}</p>
                <p><strong>Batch:</strong> {student.batch}</p>
              </div>
            </div>
            <div className="cgpa-info">
              <div className="cgpa-box">
                <div className="label">Best SGPA</div>
                <div className="value">{calculateBestSGPA()}</div>
              </div>
              <div className="cgpa-box">
                <div className="label">Aggregate CGPA</div>
                <div className="value">{calculateAggregateCGPA()}</div>
              </div>
            </div>
          </div>
          <button className="btn-download" onClick={downloadCard}>Download Card</button>
        </div>
      )}
    </div>
  );
}

export default ResultCard;
