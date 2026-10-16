import { useAdmin } from '../context/AdminContext';
import AdminCard, { AdminCardHeader } from '../components/AdminCard';
import { Bell, Users, BookOpen, Image as ImageIcon, TrendingUp, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminOverview() {
  const { notices, teachers, resources, gallery } = useAdmin();

  const stats = [
    {
      title: 'Total Notices',
      value: notices.length,
      icon: Bell,
      color: 'bg-blue-500',
      link: '/admin/notices',
      description: 'Published announcements',
    },
    {
      title: 'Teacher Profiles',
      value: teachers.length,
      icon: Users,
      color: 'bg-green-500',
      link: '/admin/teachers',
      description: 'Faculty members',
    },
    {
      title: 'Resources',
      value: resources.length,
      icon: BookOpen,
      color: 'bg-purple-500',
      link: '/admin/resources',
      description: 'Academic documents',
    },
    {
      title: 'Gallery Images',
      value: gallery.length,
      icon: ImageIcon,
      color: 'bg-amber-500',
      link: '/admin/gallery',
      description: 'Photo collection',
    },
  ];

  const recentNotices = notices.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Development Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-semibold text-amber-900 mb-1">Development Environment</h3>
          <p className="text-xs text-amber-800">
            This dashboard uses demonstration data stored in browser memory. All changes will be lost on page refresh.
            Real authentication and database integration will be added in a future update.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.title} to={stat.link}>
              <AdminCard padding="md" className="hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <TrendingUp className="w-4 h-4 text-neutral-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
                  <p className="text-sm font-medium text-neutral-700 mt-1">{stat.title}</p>
                  <p className="text-xs text-neutral-500 mt-0.5">{stat.description}</p>
                </div>
              </AdminCard>
            </Link>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Notices */}
        <AdminCard>
          <AdminCardHeader
            title="Recent Notices"
            description="Latest announcements"
            action={
              <Link to="/admin/notices" className="text-xs text-primary-600 hover:text-primary-700 font-medium">
                View All →
              </Link>
            }
          />
          {recentNotices.length > 0 ? (
            <div className="space-y-3">
              {recentNotices.map((notice) => (
                <div key={notice.id} className="flex items-start gap-3 pb-3 border-b border-neutral-100 last:border-0 last:pb-0">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                    <Bell className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-900 truncate">{notice.title}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">{notice.date}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-neutral-500 text-center py-8">No notices yet</p>
          )}
        </AdminCard>

        {/* Quick Actions */}
        <AdminCard>
          <AdminCardHeader title="Quick Actions" description="Common tasks" />
          <div className="space-y-2">
            <Link
              to="/admin/notices"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
                <Bell className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-neutral-900">Add New Notice</p>
                <p className="text-xs text-neutral-500">Create announcement</p>
              </div>
            </Link>
            <Link
              to="/admin/teachers"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center">
                <Users className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-neutral-900">Manage Teachers</p>
                <p className="text-xs text-neutral-500">Update faculty profiles</p>
              </div>
            </Link>
            <Link
              to="/admin/resources"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-neutral-900">Upload Resources</p>
                <p className="text-xs text-neutral-500">Add academic documents</p>
              </div>
            </Link>
            <Link
              to="/admin/gallery"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center">
                <ImageIcon className="w-4 h-4 text-amber-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-neutral-900">Manage Gallery</p>
                <p className="text-xs text-neutral-500">Update photo collection</p>
              </div>
            </Link>
          </div>
        </AdminCard>
      </div>
    </div>
  );
}
