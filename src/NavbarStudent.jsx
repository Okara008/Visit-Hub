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
        <Link className="menuLists" to="/StudentDashboard" >
           <FontAwesomeIcon icon={faHouse} /> Dashboard
        </Link>
        <Link className="menuLists" to="/StudentPrepareRequest">
           <FontAwesomeIcon icon={faEnvelope} /> <span>Send Requests</span>
        </Link>
        <Link className="menuLists" to="/StudentFindCompany">
           <FontAwesomeIcon icon={faBuilding} /> <span>Find Companies</span>
        </Link>
        <Link className="menuLists" to="/StudentVisitsManagement">
           <FontAwesomeIcon icon={faMapLocationDot} /> <span>Visits History</span>
        </Link>
        <Link className="menuLists" to="/StudentEditProfile">
           <FontAwesomeIcon icon={faUser} /> <span>Profile</span>
        </Link>
        <Link className="menuLists" to="/StudentFeedback">
           <FontAwesomeIcon icon={faComment} /> <span>Feedback</span>
        </Link>

      </div>
    </div>
  );
}

export default Navbar;
