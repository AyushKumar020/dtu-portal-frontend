import React, { useState, useEffect } from 'react';
import './Calculator.css';
import HamburgerMenu from './HamBurgerMenu';

function Calculator() {
  const [subjects, setSubjects] = useState([
    { name: '', credits: '4', grade: 'O' }
  ]);
  const [cgpa, setCgpa] = useState(null);

  const handleChange = (index, field, value) => {
    const updated = [...subjects];
    updated[index][field] = value;
    setSubjects(updated);
    calculateCGPA(updated);
  };

  const addSubject = () => {
    const updated = [...subjects, { name: '', credits: '4', grade: 'O' }];
    setSubjects(updated);
    calculateCGPA(updated);
  };

  const deleteSubject = (index) => {
    const updated = subjects.filter((_, i) => i !== index);
    setSubjects(updated);
    calculateCGPA(updated);
  };

  const calculateCGPA = (data) => {
    let totalCredits = 0;
    let totalPoints = 0;

    data.forEach(sub => {
      const credits = parseFloat(sub.credits);
      const gradePoint = gradeToPoint(sub.grade);
      if (!isNaN(credits) && gradePoint !== null) {
        totalCredits += credits;
        totalPoints += credits * gradePoint;
      }
    });

    if (totalCredits === 0) {
      setCgpa(null);
      return;
    }

    const result = (totalPoints / totalCredits).toFixed(2);
    setCgpa(result);
  };

  const gradeToPoint = (grade) => {
    switch (grade.toUpperCase()) {
      case 'O': return 10;
      case 'A+': return 9;
      case 'A': return 8;
      case 'B+': return 7;
      case 'B': return 6;
      case 'C': return 5;
      case 'P': return 4;
      case 'F': return 0;
      default: return null;
    }
  };

  useEffect(() => {
    calculateCGPA(subjects);
  }, []); // calculates once on initial render

  return (
    <div className="calculator-container py-5">
        <HamburgerMenu color="white" linkColor="white" />
      <div className="container">
        <div className="text-center mb-4">
          <h2 className="fw-bold text-light">DTU CGPA Calculator</h2>
          <p className="text-light">Enter your subjects, credits, and grades to calculate CGPA</p>
        </div>

        {subjects.map((sub, index) => (
          <div key={index} className="row mb-3 align-items-center">
            <div className="col-md-4 mb-2 mb-md-0">
              <input
                type="text"
                className="form-control"
                placeholder="Subject Name"
                value={sub.name}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
              />
            </div>
            <div className="col-md-2 mb-2 mb-md-0">
              <input
                type="number"
                className="form-control"
                placeholder="Credits"
                value={sub.credits}
                onChange={(e) => handleChange(index, 'credits', e.target.value)}
              />
            </div>
            <div className="col-md-3 mb-2 mb-md-0">
              <select
                className="form-select"
                value={sub.grade}
                onChange={(e) => handleChange(index, 'grade', e.target.value)}
              >
                <option value="">Select Grade</option>
                <option value="O">O</option>
                <option value="A+">A+</option>
                <option value="A">A</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="P">P</option>
                <option value="F">F</option>
              </select>
            </div>
            <div className="col-md-2 text-center">
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteSubject(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        <div className="text-center mt-4">
          <button className="btn btn-primary me-2" onClick={addSubject}>Add Subject</button>
          <button className="btn btn-secondary" onClick={() => {
            setSubjects([{ name: '', credits: '4', grade: 'O' }]);
            setCgpa(null);
          }}>Reset</button>
        </div>

        {cgpa && (
          <div className="mt-5 text-center">
            <h4 className="text-light">Your CGPA is:</h4>
            <div className="display-4 fw-bold text-success">{cgpa}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Calculator;
