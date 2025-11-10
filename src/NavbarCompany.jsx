import React, {useEffect, useState} from "react";
import "./Navbar.css";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faEnvelope , faBook, faBuilding, faUser } from '@fortawesome/free-solid-svg-icons';


function Navbar(props) {
	useEffect(getList, [])
	function getList() {
		const menuLists = Array.from(document.querySelectorAll(".menuLists"));
    const index = props.index || 0;
    if(index >= 0){
      menuLists[index].classList.add("activeMenu");

    }
	}

	return (
    <div className="sidebar">
      <div className="menu">
        <a className="menuLists" href="/CompanyDashboard" >
          <FontAwesomeIcon icon={faHouse}/><span>Dashboard</span>
        </a>
        <a className="menuLists" href="/CompanyProfile">
          <FontAwesomeIcon icon={faUser}/> <span>Profile</span> 
        </a>
        <a className="menuLists" href="/CompanyReport">
          <FontAwesomeIcon icon={faBook}/> <span>Report</span> 
        </a>

      </div>
    </div>
  );
}

export default Navbar;
