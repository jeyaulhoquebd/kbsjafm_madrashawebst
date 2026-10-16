import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import AdminCard, { AdminCardHeader } from '../components/AdminCard';
import AdminModal from '../components/AdminModal';
import ConfirmDialog from '../components/ConfirmDialog';
import SuccessToast from '../components/SuccessToast';
import FormField, { TextInput, SelectInput } from '../components/FormField';
import StatusBadge from '../components/StatusBadge';
import { Plus, Edit2, Trash2, Search, BookOpen, Upload } from 'lucide-react';
import { AcademicResource } from '../services/dataService';

export default function ResourcesManagement() {
  const { resources, addResource, updateResource, deleteResource } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<AcademicResource | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    titleEn: '',
    type: 'routine' as AcademicResource['type'],
    category: '',
    date: new Date().toISOString().split('T')[0],
    fileSize: '',
    fileType: 'PDF',
    url: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const filteredResources = resources.filter(
    (r) =>
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.titleEn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openAddModal = () => {
    setEditingResource(null);
    setFormData({ title: '', titleEn: '', type: 'routine', category: '', date: new Date().toISOString().split('T')[0], fileSize: '', fileType: 'PDF', url: '' });
    setErrors({});
    setIsModalOpen(true);
  };

  const openEditModal = (resource: AcademicResource) => {
    setEditingResource(resource);
    setFormData({
      title: resource.title,
      titleEn: resource.titleEn,
      type: resource.type,
      category: resource.category,
      date: resource.date,
      fileSize: resource.fileSize || '',
      fileType: resource.fileType,
      url: resource.url || '',
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (formData.url && !formData.url.startsWith('http')) {
      newErrors.url = 'URL must start with http:// or https://';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (editingResource) {
      updateResource(editingResource.id, formData);
      setSuccessMessage('Resource updated successfully');
    } else {
      addResource(formData);
      setSuccessMessage('Resource added successfully');
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (deleteId) {
      deleteResource(deleteId);
      setDeleteId(null);
      setSuccessMessage('Resource deleted successfully');
    }
  };

  return (
    <div className="space-y-6">
      <AdminCard>
        <AdminCardHeader
          title="Academic Resources"
          description="Manage routines, syllabuses, and documents"
          action={
            <button onClick={openAddModal} className="flex items-center gap-2 px-4 py-2 bg-primary-700 text-white text-sm font-medium rounded-lg hover:bg-primary-800 transition-colors">
              <Plus className="w-4 h-4" />
              Add Resource
            </button>
          }
        />

        {/* Document Upload Notice */}
        <div className="mb-4 p-4 border-2 border-dashed border-primary-300 rounded-lg bg-primary-50">
          <div className="flex items-start gap-3">
            <Upload className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-primary-900 mb-1">Document Management</p>
              <p className="text-xs text-primary-700">
                Provide external URLs for documents (PDF, DOC, XLS, etc.). Upload documents to a trusted hosting service 
                (e.g., Cloudinary, Google Drive, institutional server) and paste the public URL below. 
                Firebase Storage is not used for document storage.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left py-3 px-2 text-xs font-semibold text-neutral-600 uppercase">Title</th>
                <th className="text-left py-3 px-2 text-xs font-semibold text-neutral-600 uppercase">Type</th>
                <th className="text-left py-3 px-2 text-xs font-semibold text-neutral-600 uppercase">Date</th>
                <th className="text-left py-3 px-2 text-xs font-semibold text-neutral-600 uppercase">File</th>
                <th className="text-right py-3 px-2 text-xs font-semibold text-neutral-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredResources.length > 0 ? (
                filteredResources.map((resource) => (
                  <tr key={resource.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-neutral-400" />
                        <p className="text-sm font-medium text-neutral-900 truncate max-w-xs">{resource.title}</p>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <StatusBadge status={resource.type} label={resource.type} />
                    </td>
                    <td className="py-3 px-2">
                      <p className="text-sm text-neutral-600">{resource.date}</p>
                    </td>
                    <td className="py-3 px-2">
                      <p className="text-sm text-neutral-600">{resource.fileType} {resource.fileSize && `• ${resource.fileSize}`}</p>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEditModal(resource)} className="p-1.5 rounded hover:bg-neutral-100 transition-colors" aria-label="Edit">
                          <Edit2 className="w-4 h-4 text-neutral-600" />
                        </button>
                        <button onClick={() => setDeleteId(resource.id)} className="p-1.5 rounded hover:bg-red-50 transition-colors" aria-label="Delete">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center">
                    <p className="text-sm text-neutral-500">No resources found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </AdminCard>

      <AdminModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingResource ? 'Edit Resource' : 'Add New Resource'} size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Title (Bengali)" error={errors.title} required>
              <TextInput value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} error={errors.title} placeholder="Enter Bengali title" />
            </FormField>
            <FormField label="Title (English)">
              <TextInput value={formData.titleEn} onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })} placeholder="Enter English title" />
            </FormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Type" required>
              <SelectInput value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value as AcademicResource['type'] })}>
                <option value="routine">Class Routine</option>
                <option value="exam-routine">Exam Routine</option>
                <option value="syllabus">Syllabus</option>
                <option value="calendar">Calendar</option>
                <option value="other">Other</option>
              </SelectInput>
            </FormField>
            <FormField label="Date" error={errors.date} required>
              <TextInput type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} error={errors.date} />
            </FormField>
            <FormField label="File Type">
              <SelectInput value={formData.fileType} onChange={(e) => setFormData({ ...formData, fileType: e.target.value })}>
                <option value="PDF">PDF</option>
                <option value="DOC">DOC</option>
                <option value="XLS">XLS</option>
                <option value="IMG">Image</option>
              </SelectInput>
            </FormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="File Size">
              <TextInput value={formData.fileSize} onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })} placeholder="e.g., 250 KB" />
            </FormField>
            <FormField label="Category">
              <TextInput value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} placeholder="Enter category" />
            </FormField>
          </div>

          <FormField label="Document URL" error={errors.url}>
            <TextInput 
              value={formData.url} 
              onChange={(e) => {
                setFormData({ ...formData, url: e.target.value });
                if (errors.url) {
                  const newErrors = { ...errors };
                  delete newErrors.url;
                  setErrors(newErrors);
                }
              }} 
              placeholder="https://example.com/document.pdf"
              type="url"
            />
            <p className="text-xs text-neutral-500 mt-1">
              Paste the public URL of your document (hosted on Cloudinary, Google Drive, or your server)
            </p>
          </FormField>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium bg-primary-700 text-white rounded-lg hover:bg-primary-800 transition-colors">
              {editingResource ? 'Update Resource' : 'Add Resource'}
            </button>
          </div>
        </form>
      </AdminModal>

      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Resource" message="Are you sure you want to delete this resource?" confirmText="Delete" variant="danger" />

      <SuccessToast message={successMessage} isVisible={!!successMessage} onClose={() => setSuccessMessage('')} />
    </div>
  );
}
