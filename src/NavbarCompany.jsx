import React, {useEffect, useState} from "react";
import "./Navbar.css";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faEnvelope , faBook, faBuilding, faUser, faList } from '@fortawesome/free-solid-svg-icons';


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
        <a className="menuLists" href="/CompanyVisitManagement">
    			<FontAwesomeIcon icon={faList}/> <span>Visit Requests</span>
        </a>
        <a className="menuLists" href="/CompanyInstitution">
		    	<FontAwesomeIcon icon={faBuilding}/> <span>Institution List</span>
        </a>
        <a className="menuLists" href="/CompanyReport">
			    <FontAwesomeIcon icon={faBook}/> <span>Report</span> 
        </a>
        <a className="menuLists" href="/CompanyProfile">
          <FontAwesomeIcon icon={faUser}/> <span>Profile</span> 
        </a>
        

      </div>
    </div>
  );
}

export default Navbar;
