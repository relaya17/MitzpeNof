// Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toggleNavbar, closeNavbar } from '../redux/slice/navbarSlice';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: any) => state.navbar.isOpen); // לקחת את מצב ה-navbar מה-state

  const handleToggleNavbar = () => {
    dispatch(toggleNavbar()); // לשלוח פעולה כדי לשנות את מצב ה-navbar
  };

  const handleCloseNavbar = () => {
    dispatch(closeNavbar()); // לשלוח פעולה לסגור את ה-navbar
  };

  return (
    <div>
      // {/* תפריט ניווט */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container">
          {/* שם האתר בצד שמאל */}
          <Link className="navbar-brand" to="/Management" onClick={handleCloseNavbar}>
          <img 
         className="rounded-circle" 
         alt="מצפה נוף" 
         style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
         src="/favicon.ico" 
/>
          </Link>

          {/* כפתור המבורגר */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={handleToggleNavbar}
            aria-controls="navbarNav"
            aria-expanded={isOpen ? 'true' : 'false'}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* תפריט ניווט */}
          <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {[
                { path: '/', label: 'Home' },
                { path: '/Gardening', label: 'Gardening' },
                { path: '/EmployeeManagement', label: 'Employee Management' },
                { path: '/NewResidentApproval', label: 'New Resident Approval' },
                { path: '/Residents', label: 'Residents' },
                { path: '/RepairTracking', label: 'Repair Tracking' },
                { path: '/PoolMaintenance', label: 'Pool Maintenance' },
              ].map(({ path, label }) => (
                <li className="nav-item" key={path}>
                  <Link className="nav-link" to={path} onClick={handleCloseNavbar}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

      
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
