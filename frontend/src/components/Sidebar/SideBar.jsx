import { NavLink, useNavigate } from 'react-router-dom'; // Add useNavigate
import { FaHome, FaLock, FaMoneyBill, FaUser } from 'react-icons/fa';
import { MdMessage } from 'react-icons/md';
import { BiAnalyse, BiCog } from 'react-icons/bi';
import { AiFillHeart } from 'react-icons/ai';
import { BsCartCheck } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.css';

const routes = [
  { path: '/dashboard', name: 'Dashboard', icon: <FaHome /> },
  { path: '/myDigitalCards', name: 'My Digital Cards', icon: <FaUser /> },
  { path: '/solution', name: 'Solution', icon: <MdMessage /> },
  { path: '/analytics', name: 'Analytics', icon: <BiAnalyse /> },
  { path: '/notification', name: 'Notification', icon: <BsCartCheck /> },
  {
    path: '/settings',
    name: 'Settings',
    icon: <BiCog />,
    subRoutes: [
      { path: '/settings/profile', name: 'Profile', icon: <FaUser /> },
      { path: '/settings/2fa', name: '2FA', icon: <FaLock /> },
      { path: '/settings/billing', name: 'Billing', icon: <FaMoneyBill /> },
    ],
  },
  { path: '/support', name: 'Support', icon: <AiFillHeart /> },
];

const SideBar = ({ children, onLogout }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo'); // Clear user info from local storage
    if (onLogout) onLogout(); // Call onLogout if provided
    navigate('/'); // Redirect to the main page
  };

  return (
    <div className="d-flex" style={{ zoom: '0.85' }}>
      <div className={`sidebar ${isOpen ? 'open' : 'collapsed'} bg-custom-gradient sidebar-animation`}>
        <div className="logo-section mb-4">
          <img src="/logo.png" alt="Logo" className="img-fluid logo-animation" />
        </div>

        <ul className="nav flex-column">
          {routes.map((route, index) => (
            <li key={index} className="nav-item">
              <NavLink
                to={route.path}
                className="nav-link d-flex align-items-center"
                activeClassName="active"
                onClick={route.path === '/settings' ? toggleSettings : undefined}
              >
                <div className="icon icon-animation">{route.icon}</div>
                <span className="link-text link-animation">{route.name}</span>
              </NavLink>

              {route.subRoutes && isSettingsOpen && (
                <ul className={`submenu collapse ${isSettingsOpen ? 'show' : ''}`}>
                  {route.subRoutes.map((subRoute, subIndex) => (
                    <li key={subIndex} className="nav-item">
                      <NavLink to={subRoute.path} className="nav-link">
                        <div className="icon icon-animation">{subRoute.icon}</div>
                        <span>{subRoute.name}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <div className="user-profile mt-auto p-3">
          <img src="/user.jpg" alt="User" className="rounded-circle me-2 user-image-animation" />
          <div className="user-info">
            <span className="username d-block user-info-animation">{userInfo.name}</span>
            <span className="user-email text-muted user-info-animation">{userInfo.email}</span>
          </div>
        </div>
        <br />
        <div className="user-profile mt-auto p-3">
          <div className="user-info">
            <button className="btn btn-danger w-100 d-flex align-items-center button-animation" onClick={handleLogout}>
              <span className="me-2">&#x1F8E4;</span> Signout
            </button>
          </div>
        </div>
      </div>

      <main className="content content-animation">{children}</main>
    </div>
  );
};

export default SideBar;
