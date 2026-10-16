import { Link, useLocation, Outlet } from 'react-router-dom';
import { useState } from 'react';
import {
  LayoutDashboard,
  Bell,
  Users,
  BookOpen,
  Image as ImageIcon,
  Home,
  Settings,
  Menu,
  X,
  LogOut,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const navItems = [
  { path: '/admin', label: 'Overview', labelBn: 'ওভারভিউ', icon: LayoutDashboard, exact: true },
  { path: '/admin/notices', label: 'Notices', labelBn: 'নোটিশ', icon: Bell },
  { path: '/admin/teachers', label: 'Teachers', labelBn: 'শিক্ষক', icon: Users },
  { path: '/admin/resources', label: 'Resources', labelBn: 'রিসোর্স', icon: BookOpen },
  { path: '/admin/gallery', label: 'Gallery', labelBn: 'গ্যালারি', icon: ImageIcon },
  { path: '/admin/homepage', label: 'Homepage', labelBn: 'হোমপেজ', icon: Home },
  { path: '/admin/settings', label: 'Settings', labelBn: 'সেটিংস', icon: Settings },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { settings } = useAdmin();

  const isActive = (path: string, exact?: boolean) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Development Notice Banner */}
      <div className="bg-amber-500 text-white text-xs sm:text-sm py-1.5 px-4 flex items-center justify-center gap-2">
        <ShieldAlert className="w-4 h-4 shrink-0" />
        <span>
          <strong>Development Mode:</strong> This dashboard is not protected by real authentication.
          All data is stored locally in memory and will reset on refresh.
        </span>
      </div>

      <div className="flex">
        {/* Sidebar Overlay (mobile) */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed lg:sticky top-0 left-0 z-50
            w-64 h-screen bg-white border-r border-neutral-200
            transform transition-transform duration-200
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            flex flex-col
          `}
          style={{ marginTop: '28px' }}
        >
          {/* Logo Area */}
          <div className="p-4 border-b border-neutral-200">
            <div className="flex items-center gap-3">
              <img
                src="https://res.cloudinary.com/dc80xvaid/image/upload/v1792165465/madrashalogo.jpg"
                alt="Logo"
                className="w-10 h-10 rounded-full object-cover border-2 border-primary-200"
              />
              <div className="min-w-0 flex-1">
                <h2 className="text-sm font-bold text-primary-900 truncate">Admin Panel</h2>
                <p className="text-xs text-neutral-500 truncate">{settings.shortName}</p>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 rounded hover:bg-neutral-100"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-3">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path, item.exact);
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`
                        flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                        transition-colors
                        ${active
                          ? 'bg-primary-700 text-white'
                          : 'text-neutral-700 hover:bg-primary-50 hover:text-primary-700'
                        }
                      `}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-3 border-t border-neutral-200 space-y-1">
            <Link
              to="/"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View Public Site</span>
            </Link>
            <Link
              to="/"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Exit Dashboard</span>
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Top Bar */}
          <header className="sticky top-[28px] z-30 bg-white border-b border-neutral-200 h-14 flex items-center px-4 lg:px-6 gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-neutral-100"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex-1">
              <h1 className="text-sm font-semibold text-neutral-800">
                {navItems.find((item) => isActive(item.path, item.exact))?.label || 'Dashboard'}
              </h1>
            </div>

            {/* User Profile Placeholder */}
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-medium text-neutral-800">Administrator</p>
                <p className="text-xs text-neutral-500">Demo User</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-primary-700 text-white flex items-center justify-center text-sm font-semibold">
                A
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-4 lg:p-6 overflow-x-hidden">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
