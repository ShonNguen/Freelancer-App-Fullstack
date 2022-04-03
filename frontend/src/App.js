import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


//components
import UserSignUpForm from './components/UserSignUpForm';
import UserLoginForm from './components/UserLoginForm';
import WelcomePage from './pages/WelcomePage';
import UserSignUpSuccess from './pages/UserSignUpSuccess';
import UserLoginPage from './pages/UserLoginPage';
import { Box } from '@mui/material';

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
                </Routes>
            </Router>
        </Box>
    );
}

export default App;
