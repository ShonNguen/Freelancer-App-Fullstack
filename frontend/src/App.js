import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


//components
import UserSignUpForm from './components/UserSignUpForm';
import UserLoginForm from './components/UserLoginForm';
import WelcomePage from './pages/WelcomePage';
import UserSignUpSuccess from './pages/UserSignUpSuccess';
import UserLoginPage from './pages/UserLoginPage';
import AllJobs from './pages/AllJobs';
import { Box } from '@mui/material';
import AllProjects from './pages/AllProjects';


function App() {

    return (
        <Box>
            <Router>
                <Routes>
                    <Route path='/' element={<WelcomePage />} />
                    <Route path='/register' element={<UserSignUpForm />} >
                        <Route path='success' element={<UserSignUpSuccess />} />
                    </Route>
                    <Route path='/login' element={<UserLoginForm />} />
                    <Route path='/profile' element={<UserLoginPage />} />
                    <Route path='/all-jobs' element={<AllJobs />} />
                    <Route path='/all-projects' element={<AllProjects />} />
                </Routes>
            </Router>
        </Box>
    );
}

export default App;
