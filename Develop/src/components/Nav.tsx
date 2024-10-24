import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => (isActive ? 'active' : undefined)} 
            aria-label="Candidate Search"
          >
            Candidate Search
          </NavLink> 
        </li>
        <li>
          <NavLink 
            to="/saved-candidates" 
            className={({ isActive }) => (isActive ? 'active' : undefined)} 
            aria-label="Saved Candidates"
          >
            Saved Candidates
          </NavLink> 
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
