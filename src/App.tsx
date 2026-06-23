import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Result } from './pages/Result';
import { Verify } from './pages/Verify';
import { Header } from './components/Header';

function App() {
  return (
    <Router>
      <div className="app-viewport-wrapper">
        <Header />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/result" element={<Result />} />
            <Route path="/verify/:id" element={<Verify />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
