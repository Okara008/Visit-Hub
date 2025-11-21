import React, {useEffect, useState} from "react";
import "./Navbar.css";
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faComment , faBook, faBuilding, faUser, faList, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';


function Navbar(props) {
	  const navigate = useNavigate();
	useEffect(getList, [])
	function getList() {
		const menuLists = Array.from(document.querySelectorAll(".menuLists"));
    	const index = props.index || 0;
		if(index >= 0){
			menuLists[index].classList.add("activeMenu");
		}
	}

	const handleSignOut = () => {
		// Clear session storage
		sessionStorage.removeItem("currentUser");
		alert("Sign out successful")
		// Navigate to login page
		navigate("/");
	};
	return (
    <div className="sidebar">
      <div className="menu">
        <Link className="menuLists" to="/CompanyDashboard" >
          <FontAwesomeIcon icon={faHouse}/><span>Dashboard</span>
        </Link>
        <Link className="menuLists" to="/CompanyVisitManagement">
    			<FontAwesomeIcon icon={faList}/> <span>Visit Requests</span>
        </Link>
        <Link className="menuLists" to="/CompanyInstitution">
		    	<FontAwesomeIcon icon={faBuilding}/> <span>Institution List</span>
        </Link>
        <Link className="menuLists" to="/CompanyReport">
			    <FontAwesomeIcon icon={faBook}/> <span>Report</span> 
        </Link>
        <Link className="menuLists" to="/CompanyProfile">
          <FontAwesomeIcon icon={faUser}/> <span>Profile</span> 
        </Link>
        <Link className="menuLists" to="/CompanyAdminFeedback">
			<FontAwesomeIcon icon={faComment} /> <span>Feedback</span>
		</Link>
		<button className="signout-btn" onClick={handleSignOut}>
			<FontAwesomeIcon icon={faRightFromBracket} />Sign Out
		</button>
      </div>
    </div>
  );
}

export default Navbar;
