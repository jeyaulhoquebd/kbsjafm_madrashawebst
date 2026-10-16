import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Notices from './pages/Notices';
import NoticeDetail from './pages/NoticeDetail';
import Teachers from './pages/Teachers';
import TeacherProfile from './pages/TeacherProfile';
import Results from './pages/Results';
import Academics from './pages/Academics';
import Admission from './pages/Admission';
import Downloads from './pages/Downloads';
import Gallery from './pages/Gallery';
import NotFound from './pages/NotFound';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />

            {/* About */}
            <Route path="/about" element={<About />} />
            <Route path="/about/history" element={<About />} />
            <Route path="/about/administration" element={<About />} />
            <Route path="/about/principal" element={<About />} />

            {/* Academics */}
            <Route path="/academics" element={<Academics />} />
            <Route path="/academics/programs" element={<Academics />} />
            <Route path="/academics/routine" element={<Academics />} />
            <Route path="/academics/exam-routine" element={<Academics />} />
            <Route path="/academics/calendar" element={<Academics />} />
            <Route path="/academics/syllabus" element={<Academics />} />
            {/* Legacy routes */}
            <Route path="/academic" element={<Academics />} />
            <Route path="/academic/departments" element={<Academics />} />
            <Route path="/academic/programs" element={<Academics />} />
            <Route path="/academic/calendar" element={<Academics />} />
            <Route path="/academic/routine" element={<Academics />} />
            <Route path="/academic/exam-routine" element={<Academics />} />

            {/* Teachers */}
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/teachers/:id" element={<TeacherProfile />} />

            {/* Admission */}
            <Route path="/admission" element={<Admission />} />
            <Route path="/admission/apply" element={<Admission />} />

            {/* Notices */}
            <Route path="/notices" element={<Notices />} />
            <Route path="/notices/:id" element={<NoticeDetail />} />

            {/* Results */}
            <Route path="/results" element={<Results />} />

            {/* Downloads */}
            <Route path="/downloads" element={<Downloads />} />

            {/* Gallery */}
            <Route path="/gallery" element={<Gallery />} />

            {/* Contact */}
            <Route path="/contact" element={<Contact />} />

            {/* Catch-all */}
            <Route path="/library" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
