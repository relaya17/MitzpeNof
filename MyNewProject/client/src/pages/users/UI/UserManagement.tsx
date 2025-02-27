import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserManagement: React.FC = () => {
  const [adminPassword, setAdminPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // הוספנו את הניווט

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdminPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === '12345') { // לדוגמה סיסמת מנהל
      setIsAuthenticated(true);
    } else {
      alert('סיסמה שגויה');
    }
  };

  const goToChangePassword = () => {
    navigate('/change-admin-password'); // ניווט לדף שינוי סיסמה
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 className="text-center mb-4">ניהול משתמשים</h2>
        {!isAuthenticated ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="adminPassword">סיסמת מנהל</label>
              <input
                type="password"
                className="form-control"
                id="adminPassword"
                value={adminPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">התחבר</button>
          </form>
        ) : (
          <>
            <button className="btn btn-primary w-100 mt-4" onClick={goToChangePassword}>
              שנה סיסמת מנהל
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
