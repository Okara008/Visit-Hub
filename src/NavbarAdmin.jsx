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
        <a className="menuLists" href="/AdminDashboard" >
          <FontAwesomeIcon icon={faHouse}>🏠</FontAwesomeIcon> Dashboard
        </a>
        <a className="menuLists" href="/AdminUserList">
          <FontAwesomeIcon icon={faList}></FontAwesomeIcon> <span>Student List</span>
        </a>
        <a className="menuLists" href="/AdminCompanyList">
          <FontAwesomeIcon icon={faBuilding}/> <span>Company List</span>
        </a>
        <a className="menuLists" href="/AdminReport">
          <FontAwesomeIcon icon={faBook}/>  <span>Report</span>  
        </a>
        <a className="menuLists" href="/AdminStudentRequest">
          <FontAwesomeIcon icon={faEnvelope}/>  <span>Visit Requests</span>  
        </a>
        <a className="menuLists" href="/AdminProfile">
          <FontAwesomeIcon icon={faUser}/>  <span>Profile</span>  
        </a>
        <a className="menuLists" href="/AdminFeedback">
           <FontAwesomeIcon icon={faComment} /> <span>Feedback</span>
        </a>
      </div>
    </div>
  );
}

export default Navbar;
