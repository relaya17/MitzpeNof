import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-3" style={{ position: 'relative', bottom: 0, width: '100%' }}>
      <div className="container-fluid d-flex flex-column align-items-center justify-content-center">
        <div className="row text-center mb-2 w-100">
          <div className="col-12 col-md-4 mb-2">
            <ul className="list-unstyled">
              <li><Link to="/" className="text-light">דף הבית</Link></li>
              <li><Link to="/privacypolicy" className="text-light">מדיניות פרטיות</Link></li>
              <li><Link to="/TermsAndConditions" className="text-light">תנאי שימוש</Link></li>
            </ul>
          </div>
        </div>
       
        <div className="mb-3">
        </div>
        
        <div className="text-center">
          <small>© {new Date().getFullYear()}  כל הזכויות שמורות טלי לופטנהוס  <a href="/" className="text-light">AAA</a></small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
