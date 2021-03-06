import React, { useState } from "react";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import "../../NavBar.css";
import  { Redirect } from 'react-router-dom'

function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  async function handleClickLogout(){

    sessionStorage.clear();

    await axios.put('/logout').catch(error => error);

    setClick(!click);
  }

  return (
    <>
        {(sessionStorage.getItem("userID") === null) ?(
          <Redirect to = {"/"}/>
        ):(
          <></>
        )}

      {((sessionStorage.getItem("userType") !== 'teacher') && (sessionStorage.getItem("userType") !== null))?(
          <Redirect to = {"/" + sessionStorage.getItem("userType")}/>
        ):(
          <></>
      )}

      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <NavLink
                exact
                to="/teacher"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                E-dziennik
            </NavLink>
          </div>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/teacher"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Start
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/teacher/subjects"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Klasy
              </NavLink>
            </li>
            
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClickLogout}
              >
                Wyloguj
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
