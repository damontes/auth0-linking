import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import { AuthProvider } from './auth/AuthProvider';
import EmailVerification from './pages/EmailVerification';
import LinkAccount from './pages/LinkAccount';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-sky-100 to-blue-600">
          <main className="mx-auto min-w-lg">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/email-verification" element={<EmailVerification />} />
              <Route path="/link-account" element={<LinkAccount />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
