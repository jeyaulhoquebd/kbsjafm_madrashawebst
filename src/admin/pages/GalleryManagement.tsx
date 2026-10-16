import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import AdminCard, { AdminCardHeader } from '../components/AdminCard';
import AdminModal from '../components/AdminModal';
import ConfirmDialog from '../components/ConfirmDialog';
import SuccessToast from '../components/SuccessToast';
import FormField, { TextInput, SelectInput } from '../components/FormField';
import { Plus, Edit2, Trash2, Image as ImageIcon, Upload } from 'lucide-react';
import { GalleryImage } from '../services/dataService';

export default function GalleryManagement() {
  const { gallery, addGalleryImage, updateGalleryImage, deleteGalleryImage } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    src: '',
    alt: '',
    altEn: '',
    category: 'building',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const openAddModal = () => {
    setEditingImage(null);
    setFormData({ src: '', alt: '', altEn: '', category: 'building' });
    setErrors({});
    setIsModalOpen(true);
  };

  const openEditModal = (image: GalleryImage) => {
    setEditingImage(image);
    setFormData({ src: image.src, alt: image.alt, altEn: image.altEn, category: image.category });
    setErrors({});
    setIsModalOpen(true);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.src.trim()) newErrors.src = 'Image URL is required';
    if (!formData.alt.trim()) newErrors.alt = 'Caption is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (editingImage) {
      updateGalleryImage(editingImage.id, formData);
      setSuccessMessage('Image updated successfully');
    } else {
      addGalleryImage(formData);
      setSuccessMessage('Image added successfully');
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (deleteId) {
      deleteGalleryImage(deleteId);
      setDeleteId(null);
      setSuccessMessage('Image deleted successfully');
    }
  };

  return (
    <div className="space-y-6">
      <AdminCard>
        <AdminCardHeader
          title="Gallery Management"
          description="Manage photo collection"
          action={
            <button onClick={openAddModal} className="flex items-center gap-2 px-4 py-2 bg-primary-700 text-white text-sm font-medium rounded-lg hover:bg-primary-800 transition-colors">
              <Plus className="w-4 h-4" />
              Add Image
            </button>
          }
        />

        {/* Upload Placeholder */}
        <div className="mb-4 p-4 border-2 border-dashed border-neutral-300 rounded-lg bg-neutral-50">
          <div className="flex items-center gap-3">
            <Upload className="w-5 h-5 text-neutral-400" />
            <div>
              <p className="text-sm font-medium text-neutral-700">Image Upload</p>
              <p className="text-xs text-neutral-500">Direct image upload will be available with Firebase Storage</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallery.length > 0 ? (
            gallery.map((image) => (
              <div key={image.id} className="border border-neutral-200 rounded-lg overflow-hidden group">
                <div className="aspect-square bg-neutral-100 relative">
                  {image.src ? (
                    <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-neutral-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button onClick={() => openEditModal(image)} className="p-2 bg-white rounded-lg hover:bg-neutral-100 transition-colors" aria-label="Edit">
                      <Edit2 className="w-4 h-4 text-neutral-700" />
                    </button>
                    <button onClick={() => setDeleteId(image.id)} className="p-2 bg-white rounded-lg hover:bg-red-50 transition-colors" aria-label="Delete">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
                <div className="p-2">
                  <p className="text-xs font-medium text-neutral-900 truncate">{image.alt}</p>
                  <p className="text-xs text-neutral-500 capitalize">{image.category}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <p className="text-sm text-neutral-500">No images in gallery</p>
            </div>
          )}
        </div>
      </AdminCard>

      <AdminModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingImage ? 'Edit Image' : 'Add New Image'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Image URL" error={errors.src} required>
            <TextInput value={formData.src} onChange={(e) => setFormData({ ...formData, src: e.target.value })} error={errors.src} placeholder="Enter image URL" />
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Caption (Bengali)" error={errors.alt} required>
              <TextInput value={formData.alt} onChange={(e) => setFormData({ ...formData, alt: e.target.value })} error={errors.alt} placeholder="Enter Bengali caption" />
            </FormField>
            <FormField label="Caption (English)">
              <TextInput value={formData.altEn} onChange={(e) => setFormData({ ...formData, altEn: e.target.value })} placeholder="Enter English caption" />
            </FormField>
          </div>

          <FormField label="Category">
            <SelectInput value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
              <option value="building">Building</option>
              <option value="event">Event</option>
              <option value="classroom">Classroom</option>
              <option value="library">Library</option>
            </SelectInput>
          </FormField>

          {formData.src && (
            <div className="aspect-video bg-neutral-100 rounded-lg overflow-hidden">
              <img src={formData.src} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium bg-primary-700 text-white rounded-lg hover:bg-primary-800 transition-colors">
              {editingImage ? 'Update Image' : 'Add Image'}
            </button>
          </div>
        </form>
      </AdminModal>

      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Image" message="Are you sure you want to delete this image?" confirmText="Delete" variant="danger" />

      <SuccessToast message={successMessage} isVisible={!!successMessage} onClose={() => setSuccessMessage('')} />
    </div>
  );
}
