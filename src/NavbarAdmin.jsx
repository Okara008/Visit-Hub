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
        <a className="menuLists" href="/AdminDashboard" >
          <span className="icon">🏠</span> Dashboard
        </a>
        <a className="menuLists" href="/AdminUserList">
          <span className="icon">📨</span> <span>User List</span>
        </a>
        <a className="menuLists" href="/AdminCompanyList">
          <span className="icon">🏢</span> <span>Company List</span>
        </a>
        <a className="menuLists" href="/AdminReport">
          <span className="icon">📖</span>  <span>Report</span>  
        </a>

      </div>
    </div>
  );
}

export default Navbar;
