// import PropTypes from 'prop-types'
import React from 'react'
//We change "class" to "className".
//we change "for" to "htmlFor"
import { Link } from "react-router-dom";
// Jab bhi react-router-dom use krenge toh 'a,href' ki jagh 'Link,to' use krte hai 

export default function Navbar() {
  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">NewsApp</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" to="/">General</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active " aria-current="page" to="/technology">Technology</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/entertainment">Entertainment</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/health">Health</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/science">Science</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/sports">Sports</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
