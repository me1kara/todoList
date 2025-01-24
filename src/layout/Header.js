import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1 className="main-tit">Todo List</h1>
      <Nav />
    </header>
  );
}

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {/* <Link className='navbar-brand' to="/todo">투두리스트</Link> */}
        <div className="collapse navbar-collapse">
          <div className="navbar-nav">
              <Link className='nav-link' to="/">Login</Link>
              <Link className='nav-link' to="/todo">Todo</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Header;
