import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { JournalProvider } from './contexts/JournalContext';
import { ThemeProvider } from './contexts/ThemeContext';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <ThemeProvider>
      <JournalProvider>
        <Router>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </JournalProvider>
    </ThemeProvider>
  );
}

export default App;