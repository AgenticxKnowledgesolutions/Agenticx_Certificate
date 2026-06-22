import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Result } from './pages/Result';
import { Verify } from './pages/Verify';

function App() {
  return (
    <Router>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/result" element={<Result />} />
          <Route path="/verify/:id" element={<Verify />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
