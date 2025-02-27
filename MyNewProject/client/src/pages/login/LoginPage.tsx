import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // קבלת רשימת המשתמשים מ-localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // חיפוש משתמש עם סיסמה תואמת
    const user = users.find((u: { password: string }) => u.password === password);

    if (user) {
      localStorage.setItem('isLoggedIn', 'true');
      setError(null);
      alert(`ברוך הבא, ${user.name}!`);
      navigate('/home'); // ניתוב לדף הבית
    } else {
      setError('הסיסמה שגויה');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow-lg p-5"
        style={{
          width: '100%',
          maxWidth: '500px',
          borderRadius: '15px',
          backgroundColor: 'rgba(249, 247, 247, 0.8)', // צבע רקע שקוף יותר
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)', // צל מרשים יותר
          transition: 'transform 0.3s ease', // הוספת מעבר לאפקט הזזה
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} // הזזה כלפי מעלה
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0px)'} // חזרה למצב רגיל
      >
        <h2 className="text-center mb-4" style={{ color: '#4CAF50' }}>התחברות</h2>
        
        {/* הצגת שגיאה במקרה של בעיה עם פרטי ההתחברות */}
        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="password" className="text-end" style={{ color: '#333' }}>סיסמה</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="הכנס את הסיסמה שלך"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                backgroundColor: '#f5f5f5', // צבע רקע בהיר מאוד
                borderColor: '#ccc', // צבע גבול בהיר
                color: '#333', // צבע טקסט כהה
              }}
            />
          </div>
          <button type="submit" className="btn btn-success w-100">התחבר</button>
        </form>

        <p className="mt-3 text-center">
          עדיין אין לך חשבון? <a href="/signup">רשום עכשיו</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
