import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveMenu } from '../redux/slice/SecondNavbar';
import { AppDispatch, RootState } from '../redux/store';
import { NavItem } from '../types/NavItem';

const NavigationBar: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const activeMenu = useSelector((state: RootState) => state.navbar.activeMenu);

  const receiptsMenu: NavItem[] = [
    { label: 'קבלות נכנסות', path: '/receipts/incoming' },
    { label: 'תשלומים יוצאים', path: '/receipts/outgoing' },
    { label: 'חובות', path: '/receipts/debts' }
  ];

  const residentsMenu: NavItem[] = [
    { label: 'רשימת דיירים', path: '/residents/list' },
    { label: 'חובות דיירים', path: '/residents/debts' },
    { label: 'שאלות נפוצות', path: '/residents/faq' }
  ];

  const financesMenu: NavItem[] = [
    { label: 'קופה קטנה', path: '/finances/petty-cash' },
    { label: 'דו"חות כספיים', path: '/finances/reports' }
  ];

  const handleToggle = (menu: string) => {
    dispatch(setActiveMenu(activeMenu === menu ? null : menu));
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" dir="rtl">
      <Container>
        <Navbar.Brand href="/">ניהול אחזקות</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">דף הבית</NavLink>

            <NavDropdown title="קבלות ותשלומים" id="receipts-dropdown" show={activeMenu === 'receipts'} onClick={() => handleToggle('receipts')}>
              {receiptsMenu.map((item) => (
                <NavDropdown.Item as={NavLink} to={item.path} key={item.path}>
                  {item.label}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            <NavDropdown title="ניהול דיירים" id="residents-dropdown" show={activeMenu === 'residents'} onClick={() => handleToggle('residents')}>
              {residentsMenu.map((item) => (
                <NavDropdown.Item as={NavLink} to={item.path} key={item.path}>
                  {item.label}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            <NavDropdown title="ניהול כספים" id="finances-dropdown" show={activeMenu === 'finances'} onClick={() => handleToggle('finances')}>
              {financesMenu.map((item) => (
                <NavDropdown.Item as={NavLink} to={item.path} key={item.path}>
                  {item.label}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            <NavLink to="/board" className="nav-link">לוח מודעות</NavLink>
            <NavLink to="/admin" className="nav-link">הגדרות מנהל</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
