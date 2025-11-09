import React, {useEffect, useState} from "react";
import "./Navbar.css";
import { Link } from 'react-router-dom';

function Navbar(props) {
	useEffect(getList, [])
	function getList() {
		const menuLists = Array.from(document.querySelectorAll(".menuLists"));
    const index = props.index || 0;
    menuLists[index].classList.add("activeMenu");
	}

	return (
    <div className="sidebar">
      <div className="menu">
        <a className="menuLists" href="/StudentDashboard" >
          <span className="icon">🏠</span> Dashboard
        </a>
        <a className="menuLists" href="/StudentPrepareRequest">
          <span className="icon">📨</span> <span>Manage Requests</span>
        </a>
        <a className="menuLists" href="/StudentFindCompany">
          <span className="icon">🏢</span>  <span>Find Companies</span>
        </a>
        <a className="menuLists" href="/StudentEditProfile">
          <span className="icon">👤</span> <span>Profile</span>
        </a>

      </div>
    </div>
  );
}

export default Navbar;
