import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AdminProvider } from './admin/context/AdminContext';
import Layout from './components/Layout';
import AdminLayout from './admin/components/AdminLayout';

// Public Pages
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

// Admin Pages
import AdminOverview from './admin/pages/Overview';
import NoticesManagement from './admin/pages/NoticesManagement';
import TeachersManagement from './admin/pages/TeachersManagement';
import ResourcesManagement from './admin/pages/ResourcesManagement';
import GalleryManagement from './admin/pages/GalleryManagement';
import HomepageManagement from './admin/pages/HomepageManagement';
import SettingsManagement from './admin/pages/SettingsManagement';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/history" element={<About />} />
            <Route path="/about/administration" element={<About />} />
            <Route path="/about/principal" element={<About />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/academics/programs" element={<Academics />} />
            <Route path="/academics/routine" element={<Academics />} />
            <Route path="/academics/exam-routine" element={<Academics />} />
            <Route path="/academics/calendar" element={<Academics />} />
            <Route path="/academics/syllabus" element={<Academics />} />
            <Route path="/academic" element={<Academics />} />
            <Route path="/academic/departments" element={<Academics />} />
            <Route path="/academic/programs" element={<Academics />} />
            <Route path="/academic/calendar" element={<Academics />} />
            <Route path="/academic/routine" element={<Academics />} />
            <Route path="/academic/exam-routine" element={<Academics />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/teachers/:id" element={<TeacherProfile />} />
            <Route path="/admission" element={<Admission />} />
            <Route path="/admission/apply" element={<Admission />} />
            <Route path="/notices" element={<Notices />} />
            <Route path="/notices/:id" element={<NoticeDetail />} />
            <Route path="/results" element={<Results />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/library" element={<NotFound />} />
          </Route>

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminProvider>
                <AdminLayout />
              </AdminProvider>
            }
          >
            <Route index element={<AdminOverview />} />
            <Route path="notices" element={<NoticesManagement />} />
            <Route path="teachers" element={<TeachersManagement />} />
            <Route path="resources" element={<ResourcesManagement />} />
            <Route path="gallery" element={<GalleryManagement />} />
            <Route path="homepage" element={<HomepageManagement />} />
            <Route path="settings" element={<SettingsManagement />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
