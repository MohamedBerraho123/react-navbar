import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentComponent from '../login/StudentComponent';
import './AuthFromStudent.css'; // Assurez-vous que le fichier CSS est bien importé

const AuthFromStudent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    if (token) {
      const { userId, codeUIR, firstName, lastName } = JSON.parse(localStorage.getItem('studentData')) || {};
      setStudentData({ userId, codeUIR, firstName, lastName });
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7253/api/Account/registerAutomaticallyAndLoginAutomatically', {
        email,
        password,
      });

      const { token, userId, codeUIR, firstName, lastName } = response.data;
      setToken(token);
      localStorage.setItem('token', token);
      localStorage.setItem('studentData', JSON.stringify({ userId, codeUIR, firstName, lastName }));

      setStudentData({
        userId,
        codeUIR,
        firstName,
        lastName,
      });

      console.log('Login successful, student data:', { userId, codeUIR, firstName, lastName });
    } catch (error) {
      setErrorMessage(error.response?.data?.Message || 'Registration/Login failed');
    }
  };

  const handleLogout = () => {
    setToken('');
    setStudentData(null);
    setEmail('');
    setPassword('');
    localStorage.removeItem('token');
    localStorage.removeItem('studentData');

  };

  return (
    <div className="container">
      {!token ? (
        <div>
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Sign In</button>
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      ) : (
        studentData && (
          <StudentComponent
            token={token}
            userId={studentData.userId}
            codeUIR={studentData.codeUIR}
            firstName={studentData.firstName}
            lastName={studentData.lastName}
            handleLogout={handleLogout}
          />
        )
      )}
    </div>
  );
};

export default AuthFromStudent;
