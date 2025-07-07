import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Results.css';
import HamburgerMenu from './HamBurgerMenu';

function Results() {
  const { roll_no } = useParams();
  const decodedRollNo = decodeURIComponent(roll_no);

  const [student, setStudent] = useState(null);
  const [results, setResults] = useState([]);
  const [sgpa, setSgpa] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true';
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentRes = await axios.get(`https://dtu-portal-backend-production.up.railway.app/api/students/roll/${encodeURIComponent(decodedRollNo)}`);
        setStudent(studentRes.data);

        const resultsRes = await axios.get(`https://dtu-portal-backend-production.up.railway.app/api/results/${studentRes.data.id}`);
        setResults(resultsRes.data);

        const sgpaRes = await axios.get(`https://dtu-portal-backend-production.up.railway.app/api/sgpa/${studentRes.data.id}`);
        setSgpa(sgpaRes.data);

        setSgpa(sgpaRes.data);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, [decodedRollNo]);

  useEffect(() => {
    document.body.classList.toggle('results-dark-mode', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const calculateCGPA = () => {
    if (sgpa.length === 0) return 0;
    let totalWeighted = 0;
    let totalCredits = 0;

    sgpa.forEach(s => {
      totalWeighted += s.sgpa * s.total_credits;
      totalCredits += s.total_credits;
    });

    return (totalWeighted / totalCredits).toFixed(2);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={`results-page ${darkMode ? 'results-dark-mode' : ''}`}>
      <HamburgerMenu color={darkMode ? "white" : "black"} linkColor={darkMode ? "white" : "black"} />

      <div className="results-header">
        <h2>DTU Results Portal</h2>
        <h5>Results for Roll No: {decodedRollNo}</h5>
      </div>

      <div className="toggle-container">
        <label className="switch">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <span className="slider round"></span>
        </label>
      </div>

      {student && (
        <div className="student-card">
          <h5>Student Information</h5>
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Branch:</strong> {student.branch}</p>
          <p><strong>Batch:</strong> {student.batch}</p>
        </div>
      )}

      {sgpa.map((sem) => (
        <div key={sem.semester} className="semester-card">
          <div className="semester-header">
            Semester {sem.semester}
          </div>
          <div className="semester-body">
            <table className="results-table">
              <thead>
                <tr>
                  <th>Subject Code</th>
                  <th>Subject Name</th>
                  <th>Credits</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {results
                  .filter(r => r.semester === sem.semester)
                  .map((r, index) => (
                    <tr key={index}>
                      <td>{r.subject_code}</td>
                      <td>{r.subject_name}</td>
                      <td>{r.credits}</td>
                      <td>{r.grade}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="semester-summary">
              <p><strong>SGPA:</strong> {sem.sgpa}</p>
              <p><strong>Total Credits:</strong> {sem.total_credits}</p>
            </div>
          </div>
        </div>
      ))}

      <div className="cgpa-card">
        <h4>Overall CGPA: {calculateCGPA()}</h4>
        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${(calculateCGPA() / 10) * 100}%` }}
          >
            {calculateCGPA()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Results;
