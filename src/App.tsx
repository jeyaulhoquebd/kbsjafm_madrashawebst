import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Notices from './pages/Notices';
import Teachers from './pages/Teachers';
import Results from './pages/Results';
import Academic from './pages/Academic';
import NotFound from './pages/NotFound';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/history" element={<About />} />
            <Route path="/about/administration" element={<About />} />
            <Route path="/academic" element={<Academic />} />
            <Route path="/academic/departments" element={<Academic />} />
            <Route path="/academic/programs" element={<Academic />} />
            <Route path="/academic/calendar" element={<Academic />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/notices" element={<Notices />} />
            <Route path="/results" element={<Results />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
