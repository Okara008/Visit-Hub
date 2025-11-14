import React, {useEffect, useState} from "react";
import "./Navbar.css";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faEnvelope , faBook, faBuilding, faUser, faList, faComment } from '@fortawesome/free-solid-svg-icons';


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
        <Link className="menuLists" to="/AdminDashboard" >
          <FontAwesomeIcon icon={faHouse}>🏠</FontAwesomeIcon> Dashboard
        </Link>
        <Link className="menuLists" to="/AdminUserList">
          <FontAwesomeIcon icon={faList}></FontAwesomeIcon> <span>Student List</span>
        </Link>
        <Link className="menuLists" to="/AdminCompanyList">
          <FontAwesomeIcon icon={faBuilding}/> <span>Company List</span>
        </Link>
        <Link className="menuLists" to="/AdminReport">
          <FontAwesomeIcon icon={faBook}/>  <span>Report</span>  
        </Link>
        <Link className="menuLists" to="/AdminStudentRequest">
          <FontAwesomeIcon icon={faEnvelope}/>  <span>Visit Requests</span>  
        </Link>
        <Link className="menuLists" to="/AdminProfile">
          <FontAwesomeIcon icon={faUser}/>  <span>Profile</span>  
        </Link>
        <Link className="menuLists" to="/AdminFeedback">
           <FontAwesomeIcon icon={faComment} /> <span>Feedback</span>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
