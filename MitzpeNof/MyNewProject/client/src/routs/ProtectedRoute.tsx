// import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// סוג הסטור שלך
interface RootState {
  user: {
    isLoggedIn: boolean;
  };
}

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // שימוש ב-useSelector כדי לבדוק אם המשתמש מחובר
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  if (!isLoggedIn) {
    // אם המשתמש לא מחובר, מפנים אותו לדף ההתחברות
    return <Navigate to="/LoginPage" />;
  }

  // אם המשתמש מחובר, מציגים את הדף המוגן
  return <>{children}</>;
};

export default ProtectedRoute;
