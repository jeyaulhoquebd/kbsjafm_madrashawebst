import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import AdminCard, { AdminCardHeader } from '../components/AdminCard';
import AdminModal from '../components/AdminModal';
import ConfirmDialog from '../components/ConfirmDialog';
import SuccessToast from '../components/SuccessToast';
import FormField, { TextInput, TextAreaInput, SelectInput } from '../components/FormField';
import ImageUpload from '../../components/admin/ImageUpload';
import { Plus, Edit2, Trash2, Search, User } from 'lucide-react';
import type { Teacher } from '../../types';
import { CLOUDINARY_FOLDERS, type UploadResult } from '../../services/cloudinary';

export default function TeachersManagement() {
  const { teachers, addTeacher, updateTeacher, deleteTeacher } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    nameEn: '',
    designation: '',
    designationEn: '',
    department: '',
    departmentEn: '',
    image: '',
    imagePublicId: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const filteredTeachers = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.designation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openAddModal = () => {
    setEditingTeacher(null);
    setFormData({ name: '', nameEn: '', designation: '', designationEn: '', department: '', departmentEn: '', image: '', imagePublicId: '' });
    setErrors({});
    setIsModalOpen(true);
  };

  const openEditModal = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setFormData({
      name: teacher.name,
      nameEn: teacher.nameEn,
      designation: teacher.designation,
      designationEn: teacher.designationEn,
      department: teacher.department,
      departmentEn: teacher.departmentEn,
      image: teacher.image || '',
      imagePublicId: '', // Will be populated when image is uploaded
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.designation.trim()) newErrors.designation = 'Designation is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (editingTeacher) {
      updateTeacher(editingTeacher.id, formData);
      setSuccessMessage('Teacher updated successfully');
    } else {
      addTeacher(formData);
      setSuccessMessage('Teacher added successfully');
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (deleteId) {
      deleteTeacher(deleteId);
      setDeleteId(null);
      setSuccessMessage('Teacher deleted successfully');
    }
  };

  return (
    <div className="space-y-6">
      <AdminCard>
        <AdminCardHeader
          title="Teachers Management"
          description="Manage faculty profiles"
          action={
            <button onClick={openAddModal} className="flex items-center gap-2 px-4 py-2 bg-primary-700 text-white text-sm font-medium rounded-lg hover:bg-primary-800 transition-colors">
              <Plus className="w-4 h-4" />
              Add Teacher
            </button>
          }
        />

        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search teachers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTeachers.length > 0 ? (
            filteredTeachers.map((teacher) => (
              <div key={teacher.id} className="border border-neutral-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-16 h-16 rounded-lg bg-neutral-100 flex items-center justify-center overflow-hidden shrink-0">
                    {teacher.image ? (
                      <img src={teacher.image} alt={teacher.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-8 h-8 text-neutral-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-neutral-900 truncate">{teacher.name}</p>
                    <p className="text-xs text-neutral-600 truncate">{teacher.designation}</p>
                    <p className="text-xs text-neutral-500 truncate mt-0.5">{teacher.department}</p>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-100">
                  <button onClick={() => openEditModal(teacher)} className="p-1.5 rounded hover:bg-neutral-100 transition-colors" aria-label="Edit">
                    <Edit2 className="w-4 h-4 text-neutral-600" />
                  </button>
                  <button onClick={() => setDeleteId(teacher.id)} className="p-1.5 rounded hover:bg-red-50 transition-colors" aria-label="Delete">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <p className="text-sm text-neutral-500">No teachers found</p>
            </div>
          )}
        </div>
      </AdminCard>

      <AdminModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingTeacher ? 'Edit Teacher' : 'Add New Teacher'} size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Name (Bengali)" error={errors.name} required>
              <TextInput value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} error={errors.name} placeholder="Enter Bengali name" />
            </FormField>
            <FormField label="Name (English)" required>
              <TextInput value={formData.nameEn} onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })} placeholder="Enter English name" />
            </FormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Designation (Bengali)" error={errors.designation} required>
              <TextInput value={formData.designation} onChange={(e) => setFormData({ ...formData, designation: e.target.value })} error={errors.designation} placeholder="Enter Bengali designation" />
            </FormField>
            <FormField label="Designation (English)">
              <TextInput value={formData.designationEn} onChange={(e) => setFormData({ ...formData, designationEn: e.target.value })} placeholder="Enter English designation" />
            </FormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Department (Bengali)">
              <TextInput value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} placeholder="Enter Bengali department" />
            </FormField>
            <FormField label="Department (English)">
              <TextInput value={formData.departmentEn} onChange={(e) => setFormData({ ...formData, departmentEn: e.target.value })} placeholder="Enter English department" />
            </FormField>
          </div>

          <ImageUpload
            folder={CLOUDINARY_FOLDERS.TEACHERS}
            onUploadComplete={(result: UploadResult) => {
              setFormData({
                ...formData,
                image: result.secureUrl,
                imagePublicId: result.publicId,
              });
            }}
            currentImage={formData.image}
            label="শিক্ষকের ছবি (ঐচ্ছিক)"
          />

          {formData.image && (
            <div className="p-3 bg-primary-50 border border-primary-200 rounded-lg">
              <p className="text-xs text-primary-700 font-medium mb-1">আপলোড করা ছবির URL</p>
              <p className="text-xs text-primary-600 break-all">{formData.image}</p>
              {formData.imagePublicId && (
                <p className="text-xs text-primary-500 mt-1">Public ID: {formData.imagePublicId}</p>
              )}
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium bg-primary-700 text-white rounded-lg hover:bg-primary-800 transition-colors">
              {editingTeacher ? 'Update Teacher' : 'Add Teacher'}
            </button>
          </div>
        </form>
      </AdminModal>

      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Teacher" message="Are you sure you want to delete this teacher profile?" confirmText="Delete" variant="danger" />

      <SuccessToast message={successMessage} isVisible={!!successMessage} onClose={() => setSuccessMessage('')} />
    </div>
  );
}
