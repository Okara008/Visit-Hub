import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App(){
	return(
		<Router>
			<Header/>

			<Routes>
				<Route path="/" element={<Login/>}/>
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
			</Routes>
		</Router>
	)
}

export default App;