import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { AdminProvider } from './admin/context/AdminContext';
import Layout from './components/Layout';
import AdminLayout from './admin/components/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

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
import History from './pages/History';
import VisionMission from './pages/VisionMission';
import Orphanage from './pages/Orphanage';
import Hifzkhana from './pages/Hifzkhana';
import StudentCorner from './pages/StudentCorner';
import NewsEvents from './pages/NewsEvents';
import VideoGallery from './pages/VideoGallery';

// Admin Pages
import AdminLogin from './pages/AdminLogin';
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
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
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
              
              {/* New Pages */}
              <Route path="/about/history" element={<History />} />
              <Route path="/about/vision-mission" element={<VisionMission />} />
              <Route path="/about/values" element={<VisionMission />} />
              <Route path="/about/founder" element={<History />} />
              <Route path="/about/governing-body" element={<About />} />
              <Route path="/academics/departments" element={<Academics />} />
              <Route path="/student-corner" element={<StudentCorner />} />
              <Route path="/orphanage" element={<Orphanage />} />
              <Route path="/hifzkhana" element={<Hifzkhana />} />
              <Route path="/news-events" element={<NewsEvents />} />
              <Route path="/video-gallery" element={<VideoGallery />} />
              
              {/* Admission Sub-pages */}
              <Route path="/admission/notice" element={<Admission />} />
              <Route path="/admission/eligibility" element={<Admission />} />
              <Route path="/admission/process" element={<Admission />} />
              <Route path="/admission/documents" element={<Admission />} />
              <Route path="/admission/faq" element={<Admission />} />
            </Route>

            {/* Admin Login Route (Public) */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Admin Routes (Protected) */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminProvider>
                    <AdminLayout />
                  </AdminProvider>
                </ProtectedRoute>
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
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
