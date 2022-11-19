// import PropTypes from 'prop-types'
import React, { Component } from 'react'
//We change "class" to "className".
//we change "for" to "htmlFor"
import {Link} from "react-router-dom";
// Jab bhi react-router-dom use krenge toh 'a,href' ki jagh 'Link,to' use krte hai 

export default class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">NewsApp</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/">General</Link>
        </li>   
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to="/technology">Technology</Link>
        </li> 
        <li className="nav-item">
          <Link className="nav-link" to="/entertainment">Entertainment</Link>
        </li>   
        <li className="nav-item">
          <Link className="nav-link" to="/health">Health</Link>
        </li>   
        <li className="nav-item">
          <Link className="nav-link" to="/science">Science</Link>
        </li>   
        <li className="nav-item">
          <Link className="nav-link" to="/sports">Sports</Link>
        </li>   
      </ul>
    </div>
  </div>
</nav>
      </div>
    )
  }
}
