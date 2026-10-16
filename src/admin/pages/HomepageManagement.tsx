import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import AdminCard, { AdminCardHeader } from '../components/AdminCard';
import SuccessToast from '../components/SuccessToast';
import FormField, { TextInput, TextAreaInput } from '../components/FormField';
import { Save, Info } from 'lucide-react';

export default function HomepageManagement() {
  const { homepage, updateHomepage } = useAdmin();
  const [formData, setFormData] = useState(homepage);
  const [successMessage, setSuccessMessage] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    setHasChanges(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateHomepage(formData);
    setSuccessMessage('Homepage content updated successfully');
    setHasChanges(false);
  };

  return (
    <div className="space-y-6">
      {/* Info Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-semibold text-blue-900 mb-1">Content Management</h3>
          <p className="text-xs text-blue-800">
            Changes to homepage content will be saved locally. In a future update, these changes will automatically reflect on the public website.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Hero Section */}
        <AdminCard className="mb-6">
          <AdminCardHeader title="Hero Section" description="Main banner content" />
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Hero Title (Bengali)">
                <TextInput value={formData.heroTitle} onChange={(e) => handleChange('heroTitle', e.target.value)} placeholder="Enter Bengali title" />
              </FormField>
              <FormField label="Hero Title (English)">
                <TextInput value={formData.heroTitleEn} onChange={(e) => handleChange('heroTitleEn', e.target.value)} placeholder="Enter English title" />
              </FormField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Hero Subtitle (Bengali)">
                <TextInput value={formData.heroSubtitle} onChange={(e) => handleChange('heroSubtitle', e.target.value)} placeholder="Enter Bengali subtitle" />
              </FormField>
              <FormField label="Hero Subtitle (English)">
                <TextInput value={formData.heroSubtitleEn} onChange={(e) => handleChange('heroSubtitleEn', e.target.value)} placeholder="Enter English subtitle" />
              </FormField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Hero Description (Bengali)">
                <TextAreaInput value={formData.heroDescription} onChange={(e) => handleChange('heroDescription', e.target.value)} rows={3} placeholder="Enter Bengali description" />
              </FormField>
              <FormField label="Hero Description (English)">
                <TextAreaInput value={formData.heroDescriptionEn} onChange={(e) => handleChange('heroDescriptionEn', e.target.value)} rows={3} placeholder="Enter English description" />
              </FormField>
            </div>
          </div>
        </AdminCard>

        {/* Announcement */}
        <AdminCard className="mb-6">
          <AdminCardHeader title="Announcement" description="Top announcement bar" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Announcement (Bengali)">
              <TextInput value={formData.announcement} onChange={(e) => handleChange('announcement', e.target.value)} placeholder="Enter Bengali announcement" />
            </FormField>
            <FormField label="Announcement (English)">
              <TextInput value={formData.announcementEn} onChange={(e) => handleChange('announcementEn', e.target.value)} placeholder="Enter English announcement" />
            </FormField>
          </div>
        </AdminCard>

        {/* Principal Section */}
        <AdminCard className="mb-6">
          <AdminCardHeader title="Principal Introduction" description="Principal's message section" />
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Principal Name (Bengali)">
                <TextInput value={formData.principalName} onChange={(e) => handleChange('principalName', e.target.value)} placeholder="Enter Bengali name" />
              </FormField>
              <FormField label="Principal Name (English)">
                <TextInput value={formData.principalNameEn} onChange={(e) => handleChange('principalNameEn', e.target.value)} placeholder="Enter English name" />
              </FormField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Designation (Bengali)">
                <TextInput value={formData.principalDesignation} onChange={(e) => handleChange('principalDesignation', e.target.value)} placeholder="Enter Bengali designation" />
              </FormField>
              <FormField label="Designation (English)">
                <TextInput value={formData.principalDesignationEn} onChange={(e) => handleChange('principalDesignationEn', e.target.value)} placeholder="Enter English designation" />
              </FormField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Message (Bengali)">
                <TextAreaInput value={formData.principalMessage} onChange={(e) => handleChange('principalMessage', e.target.value)} rows={4} placeholder="Enter Bengali message" />
              </FormField>
              <FormField label="Message (English)">
                <TextAreaInput value={formData.principalMessageEn} onChange={(e) => handleChange('principalMessageEn', e.target.value)} rows={4} placeholder="Enter English message" />
              </FormField>
            </div>
          </div>
        </AdminCard>

        {/* Save Button */}
        <div className="flex items-center justify-end gap-3">
          {hasChanges && (
            <p className="text-xs text-amber-600">You have unsaved changes</p>
          )}
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 bg-primary-700 text-white text-sm font-medium rounded-lg hover:bg-primary-800 transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </form>

      <SuccessToast message={successMessage} isVisible={!!successMessage} onClose={() => setSuccessMessage('')} />
    </div>
  );
}
