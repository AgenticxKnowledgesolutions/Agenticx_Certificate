import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
        </Routes>
      </main>
    </Router>
  );
}

export default App;
