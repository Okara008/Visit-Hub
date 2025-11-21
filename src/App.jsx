import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header.jsx'
import Login from './Login.jsx'
import SignUpProfile from './SignUpProfile.jsx'
import StudentEditProfile from './StudentEditProfile.jsx'
import StudentPrepareRequest from './StudentPrepareRequest.jsx'
import StudentFindCompany from './StudentFindCompany.jsx'
import StudentDashboard from './StudentDashboard.jsx'
import AdminReport from './AdminReport.jsx'
import AdminDashboard from './AdminDashboard.jsx'
import AdminUserList from './AdminUserList.jsx'
import CompanyDashboard from './CompanyDashboard.jsx'
import AdminCompanyList from './AdminCompanyList.jsx'
import CompanyProfile from './CompanyProfile.jsx'
import CompanyReport from './CompanyReport.jsx'
import CompanyInstitution from './CompanyInstitution.jsx'
import StudentFeedback from './StudentFeedback.jsx'
import StudentVisitsManagement from './StudentVisitsManagement.jsx'
import CompanyVisitManagement from './CompanyVisitManagement.jsx'
import AdminStudentRequest from './AdminStudentRequest.jsx'
import AdminProfile from './AdminProfile.jsx'
import AdminFeedback from './AdminFeedback.jsx'
import CompanyAdminFeedback from './CompanyAdminFeedback.jsx'
import './EditProfile.css'

// Component to handle 404.html redirect (query parameter routing)
function RedirectHandler() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if URL has the query parameter format from 404.html (?/path)
    const searchParams = new URLSearchParams(location.search);
    const pathFromQuery = searchParams.get('/');
    
    if (pathFromQuery) {
      // Convert query parameter path to normal route
      // Replace ~and~ back to & and ensure leading slash
      const decodedPath = pathFromQuery.replace(/~and~/g, '&');
      const normalizedPath = decodedPath.startsWith('/') ? decodedPath : '/' + decodedPath;
      navigate(normalizedPath, { replace: true });
    }
  }, [location.search, navigate]);

  return null;
}

function App(){
	// Normalize base URL - remove trailing slash for React Router basename
	const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';
	
	return(
		<Router basename={basename}>
			<RedirectHandler />
			<Header/>

			<Routes>
				<Route index element={<Login />} />
				<Route path="/" element={<Login />} />
				<Route path="/SignUpProfile" element={<SignUpProfile />} />
				<Route path="/StudentEditProfile" element={<StudentEditProfile/>}/>
				<Route path="/StudentPrepareRequest" element={<StudentPrepareRequest />} />
				<Route path="/StudentFindCompany" element={<StudentFindCompany />} />
				<Route path="/StudentDashboard" element={<StudentDashboard />} />
				<Route path="/AdminReport" element={<AdminReport />} />
				<Route path="/AdminDashboard" element={<AdminDashboard />} />
				<Route path="/AdminUserList" element={<AdminUserList />} />
				<Route path="/AdminCompanyList" element={<AdminCompanyList />} />
				<Route path="/CompanyDashboard" element={<CompanyDashboard />} />
				<Route path="/CompanyProfile" element={<CompanyProfile />} />
				<Route path="/CompanyReport" element={<CompanyReport />} />
				<Route path="/CompanyInstitution" element={<CompanyInstitution />} />
				<Route path="/StudentFeedback" element={<StudentFeedback />} />
				<Route path="/StudentVisitsManagement" element={<StudentVisitsManagement />} />
				<Route path="/CompanyVisitManagement" element={<CompanyVisitManagement />} />
				<Route path="/AdminStudentRequest" element={<AdminStudentRequest />} />
				<Route path="/AdminProfile" element={<AdminProfile />} />
				<Route path="/AdminFeedback" element={<AdminFeedback />} />
				<Route path="/CompanyAdminFeedback" element={<CompanyAdminFeedback />} />
			</Routes>
		</Router>
	)
}

export default App;