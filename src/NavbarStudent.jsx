import React, {useEffect, useState} from "react";
import "./Navbar.css";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faEnvelope, faMapLocationDot , faBook, faBuilding, faUser, faComment } from '@fortawesome/free-solid-svg-icons';

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
           <FontAwesomeIcon icon={faHouse} /> Dashboard
        </a>
        <a className="menuLists" href="/StudentPrepareRequest">
           <FontAwesomeIcon icon={faEnvelope} /> <span>Manage Requests</span>
        </a>
        <a className="menuLists" href="/StudentFindCompany">
           <FontAwesomeIcon icon={faBuilding} /> <span>Find Companies</span>
        </a>
        <a className="menuLists" href="/StudentVisitsManagement">
           <FontAwesomeIcon icon={faMapLocationDot} /> <span>Visits History</span>
        </a>
        <a className="menuLists" href="/StudentEditProfile">
           <FontAwesomeIcon icon={faUser} /> <span>Profile</span>
        </a>
        <a className="menuLists" href="/StudentFeedback">
           <FontAwesomeIcon icon={faComment} /> <span>Feedback</span>
        </a>

      </div>
    </div>
  );
}

export default Navbar;
