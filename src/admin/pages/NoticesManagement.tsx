import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import AdminCard, { AdminCardHeader } from '../components/AdminCard';
import AdminModal from '../components/AdminModal';
import ConfirmDialog from '../components/ConfirmDialog';
import SuccessToast from '../components/SuccessToast';
import FormField, { TextInput, TextAreaInput, SelectInput } from '../components/FormField';
import StatusBadge from '../components/StatusBadge';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import { NoticeFull } from '../../data/mockData';

export default function NoticesManagement() {
  const { notices, addNotice, updateNotice, deleteNotice } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<NoticeFull | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    titleEn: '',
    date: new Date().toISOString().split('T')[0],
    category: 'notice' as NoticeFull['category'],
    content: '',
    contentEn: '',
    isUrgent: false,
    author: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const filteredNotices = notices.filter(
    (n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.titleEn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openAddModal = () => {
    setEditingNotice(null);
    setFormData({
      title: '',
      titleEn: '',
      date: new Date().toISOString().split('T')[0],
      category: 'notice',
      content: '',
      contentEn: '',
      isUrgent: false,
      author: '',
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const openEditModal = (notice: NoticeFull) => {
    setEditingNotice(notice);
    setFormData({
      title: notice.title,
      titleEn: notice.titleEn,
      date: notice.date,
      category: notice.category,
      content: notice.content,
      contentEn: notice.contentEn,
      isUrgent: notice.isUrgent || false,
      author: notice.author || '',
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.titleEn.trim()) newErrors.titleEn = 'English title is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (editingNotice) {
      updateNotice(editingNotice.id, formData);
      setSuccessMessage('Notice updated successfully');
    } else {
      addNotice(formData);
      setSuccessMessage('Notice added successfully');
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (deleteId) {
      deleteNotice(deleteId);
      setDeleteId(null);
      setSuccessMessage('Notice deleted successfully');
    }
  };

  return (
    <div className="space-y-6">
      <AdminCard>
        <AdminCardHeader
          title="Notices Management"
          description="Manage announcements and notices"
          action={
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 px-4 py-2 bg-primary-700 text-white text-sm font-medium rounded-lg hover:bg-primary-800 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Notice
            </button>
          }
        />

        {/* Search */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search notices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left py-3 px-2 text-xs font-semibold text-neutral-600 uppercase">Title</th>
                <th className="text-left py-3 px-2 text-xs font-semibold text-neutral-600 uppercase">Category</th>
                <th className="text-left py-3 px-2 text-xs font-semibold text-neutral-600 uppercase">Date</th>
                <th className="text-left py-3 px-2 text-xs font-semibold text-neutral-600 uppercase">Status</th>
                <th className="text-right py-3 px-2 text-xs font-semibold text-neutral-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredNotices.length > 0 ? (
                filteredNotices.map((notice) => (
                  <tr key={notice.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="py-3 px-2">
                      <p className="text-sm font-medium text-neutral-900 truncate max-w-xs">{notice.title}</p>
                    </td>
                    <td className="py-3 px-2">
                      <StatusBadge status={notice.category} />
                    </td>
                    <td className="py-3 px-2">
                      <p className="text-sm text-neutral-600">{notice.date}</p>
                    </td>
                    <td className="py-3 px-2">
                      {notice.isUrgent && <StatusBadge status="urgent" label="Urgent" />}
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(notice)}
                          className="p-1.5 rounded hover:bg-neutral-100 transition-colors"
                          aria-label="Edit"
                        >
                          <Edit2 className="w-4 h-4 text-neutral-600" />
                        </button>
                        <button
                          onClick={() => setDeleteId(notice.id)}
                          className="p-1.5 rounded hover:bg-red-50 transition-colors"
                          aria-label="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center">
                    <p className="text-sm text-neutral-500">No notices found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </AdminCard>

      {/* Add/Edit Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingNotice ? 'Edit Notice' : 'Add New Notice'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Title (Bengali)" error={errors.title} required>
              <TextInput
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                error={errors.title}
                placeholder="Enter Bengali title"
              />
            </FormField>
            <FormField label="Title (English)" error={errors.titleEn} required>
              <TextInput
                value={formData.titleEn}
                onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                error={errors.titleEn}
                placeholder="Enter English title"
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Date" error={errors.date} required>
              <TextInput
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                error={errors.date}
              />
            </FormField>
            <FormField label="Category" required>
              <SelectInput
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as NoticeFull['category'] })}
              >
                <option value="notice">Notice</option>
                <option value="event">Event</option>
                <option value="result">Result</option>
                <option value="admission">Admission</option>
              </SelectInput>
            </FormField>
          </div>

          <FormField label="Author">
            <TextInput
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              placeholder="Enter author name"
            />
          </FormField>

          <FormField label="Content (Bengali)" error={errors.content} required>
            <TextAreaInput
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              error={errors.content}
              rows={4}
              placeholder="Enter Bengali content"
            />
          </FormField>

          <FormField label="Content (English)">
            <TextAreaInput
              value={formData.contentEn}
              onChange={(e) => setFormData({ ...formData, contentEn: e.target.value })}
              rows={4}
              placeholder="Enter English content"
            />
          </FormField>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isUrgent"
              checked={formData.isUrgent}
              onChange={(e) => setFormData({ ...formData, isUrgent: e.target.checked })}
              className="w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="isUrgent" className="text-sm text-neutral-700">
              Mark as urgent
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium bg-primary-700 text-white rounded-lg hover:bg-primary-800 transition-colors"
            >
              {editingNotice ? 'Update Notice' : 'Add Notice'}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Notice"
        message="Are you sure you want to delete this notice? This action cannot be undone."
        confirmText="Delete"
        variant="danger"
      />

      {/* Success Toast */}
      <SuccessToast
        message={successMessage}
        isVisible={!!successMessage}
        onClose={() => setSuccessMessage('')}
      />
    </div>
  );
}
