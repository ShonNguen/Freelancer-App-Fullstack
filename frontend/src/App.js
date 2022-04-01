import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';


//components
import UserSignUpForm from './components/UserSignUpForm';
import UserLoginForm from './components/UserLoginForm';
import WelcomePage from './pages/WelcomePage';
import UserSignUpSuccess from './pages/UserSignUpSuccess';
import UserLoginPage from './pages/UserLoginPage';

function App() {
    const [hasSignUp, setHasSignUp] = useState(false);
    const [hasLoggedIn, setHasLoggedIn] = useState(false);

    return (
        <Router>
            <Routes>
                {/* <Route path='/' element={<WelcomePage />} />
                <Route
                    path='/sign-up-form'
                    element={
                        hasSignUp
                            ? <UserSignUpSuccess setHasSignUp={setHasSignUp} />
                            : <UserSignUpForm setHasSignUp={setHasSignUp} />
                    }
                />

                <Route
                    path='/log-in-form'
                    element={
                        !hasLoggedIn
                        ? <UserLoginForm setHasLoggedIn={setHasLoggedIn}/>
                        : <Navigate to='/logged-in' />
                    }
                />
                {hasLoggedIn && <Route path='/logged-in' element={<UserLoginPage />} />} */}
                <Route path='/' element={<WelcomePage />} />
                <Route path='/register' element={<UserSignUpForm />} >
                    <Route path='success' element={<UserSignUpSuccess />} />
                </Route>
                <Route path='/login' element={<UserLoginForm />} />
                <Route path='/profile' element={<UserLoginPage />} />
            </Routes>
        </Router>
    );
}

export default App;
