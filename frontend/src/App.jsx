// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// import Navbar from './components/Navbar/Navbar';
// import Login from './components/Login/Login';
// import SignUpForm from './components/SignUpForm/SignUpForm';
// import Home from './pages/Home/Home';
// import Profile from './pages/Profile/Profile';
// import './App.css';

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [showLogin, setShowLogin] = useState(false);
//   const [showSignup, setShowSignup] = useState(false);
//   const [username, setUsername] = useState(''); 

//   return (
//     <Router>
//       <div className='app'>
//         <Switch>
//           <Route path="/" exact>
//             {!isLoggedIn ? (
//               <>
//                 <Navbar setShowLogin={setShowLogin} setShowSignup={setShowSignup} />
//                 {showLogin && <Login onClose={() => setShowLogin(false)} setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} 
//                 {showSignup && <SignUpForm onClose={() => setShowSignup(false)} />}
//               </>
//             ) : (
//               <Redirect to="/home" />
//             )}
//           </Route>
//           <Route path="/home" exact>
//             {isLoggedIn ? (
//               <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} username={username} /> 
//             ) : (
//               <Redirect to="/" />
//             )}
//           </Route>
//           <Route path="/profile" exact>
//             {isLoggedIn ? (
//               <Profile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
//             ) : (
//               <Redirect to="/" />
//             )}
//           </Route>
//         </Switch>
//       </div>
//     </Router>
//   );
// };

// export default App;









import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import SignUpForm from './components/SignUpForm/SignUpForm';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import './App.css';
import axios from 'axios';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('/api/user/profile', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const { name } = response.data.user;
          setName(name);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Router>
      <div className='app'>
        <Switch>
          <Route path="/" exact>
            {!isLoggedIn ? (
              <>
                <Navbar setShowLogin={setShowLogin} setShowSignup={setShowSignup} />
                {showLogin && <Login onClose={() => setShowLogin(false)} setIsLoggedIn={setIsLoggedIn} setName={setName} />}
                {showSignup && <SignUpForm onClose={() => setShowSignup(false)} />}
              </>
            ) : (
              <Redirect to="/home" />
            )}
          </Route>
          <Route path="/home" exact>
            {isLoggedIn ? (
              <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} name={name} />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/profile" exact>
            {isLoggedIn ? (
              <Profile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} name={name} />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;


