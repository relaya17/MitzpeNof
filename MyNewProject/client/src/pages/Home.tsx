import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div
      className="container-fluid d-flex flex-column justify-content-center align-items-center"
      style={{
        backgroundImage: 'url(/images/background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '20px',
        borderRadius: '10px',
        color: '#fff',
        fontSize: '1.25rem',
      }}
    >
      <h1 className="text-white justify-content-center align-items-center text-4xl font-bold bg-black bg-opacity-50 p-4 rounded-lg mb-4">
        ברוכים הבאים למתחם מצפה נוף
      </h1>

      <div className="d-flex justify-content-center gap-3">
        <Link
          to="/Rentals"
          className="btn btn-lg"
          style={{
            backgroundColor: 'rgba(29, 41, 107, 0.8)',
            color: '#fff',
            fontWeight: 'bold',
            border: '2px solid transparent',
            transition: 'all 0.3s ease',
            padding: '10px 20px',
            borderRadius: '50px',
          }}
          onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
            const target = e.target as HTMLElement;
            target.style.backgroundColor = 'transparent';
            target.style.color = 'rgba(29, 41, 107, 0.8)';
            target.style.border = '2px solid rgba(192, 178, 155, 0.8)';
          }}
          onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
            const target = e.target as HTMLElement;
            target.style.backgroundColor = 'rgba(29, 41, 107, 0.8)';
            target.style.color = '#fff';
            target.style.border = '2px solid rgba(192, 178, 155, 0.8)';
          }}
        >
          דירות להשכרה
        </Link>

        <Link
          to="/ForSale"
          className="btn btn-lg"
          style={{
            backgroundColor: 'rgba(29, 41, 107, 0.8)',
            color: '#fff',
            fontWeight: 'bold',
            border: '2px solid transparent',
            transition: 'all 0.3s ease',
            padding: '10px 20px',
            borderRadius: '50px',
          }}
          onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
            const target = e.target as HTMLElement;
            target.style.backgroundColor = 'transparent';
            target.style.color = 'rgba(29, 41, 107, 0.8)';
            target.style.border = '2px solid rgba(192, 178, 155, 0.8)';
          }}
          onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
            const target = e.target as HTMLElement;
            target.style.backgroundColor = 'rgba(29, 41, 107, 0.8)';
            target.style.color = '#fff';
            target.style.border = '2px solid rgba(192, 178, 155, 0.8)';
          }}
        >
          דירות למכירה
        </Link>
      </div>
    </div>
  );
};

export default Home;
