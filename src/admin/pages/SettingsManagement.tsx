import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import AdminCard, { AdminCardHeader } from '../components/AdminCard';
import SuccessToast from '../components/SuccessToast';
import FormField, { TextInput } from '../components/FormField';
import { Save, Info } from 'lucide-react';

export default function SettingsManagement() {
  const { settings, updateSettings } = useAdmin();
  const [formData, setFormData] = useState(settings);
  const [successMessage, setSuccessMessage] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    setHasChanges(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setSuccessMessage('Settings updated successfully');
    setHasChanges(false);
  };

  return (
    <div className="space-y-6">
      {/* Info Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-semibold text-blue-900 mb-1">Institution Settings</h3>
          <p className="text-xs text-blue-800">
            Configure institutional information and website preferences. Changes will be saved locally.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Institution Information */}
        <AdminCard className="mb-6">
          <AdminCardHeader title="Institution Information" description="Basic details about the madrasa" />
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Institution Name (Bengali)">
                <TextInput value={formData.institutionName} onChange={(e) => handleChange('institutionName', e.target.value)} placeholder="Enter Bengali name" />
              </FormField>
              <FormField label="Institution Name (English)">
                <TextInput value={formData.institutionNameEn} onChange={(e) => handleChange('institutionNameEn', e.target.value)} placeholder="Enter English name" />
              </FormField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Short Name (Bengali)">
                <TextInput value={formData.shortName} onChange={(e) => handleChange('shortName', e.target.value)} placeholder="Enter Bengali short name" />
              </FormField>
              <FormField label="Short Name (English)">
                <TextInput value={formData.shortNameEn} onChange={(e) => handleChange('shortNameEn', e.target.value)} placeholder="Enter English short name" />
              </FormField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="EIIN Number">
                <TextInput value={formData.eiin} onChange={(e) => handleChange('eiin', e.target.value)} placeholder="Enter EIIN" />
              </FormField>
              <FormField label="Established Year">
                <TextInput value={formData.established} onChange={(e) => handleChange('established', e.target.value)} placeholder="Enter year" />
              </FormField>
            </div>
          </div>
        </AdminCard>

        {/* Contact Information */}
        <AdminCard className="mb-6">
          <AdminCardHeader title="Contact Information" description="How to reach the institution" />
          <div className="space-y-4">
            <FormField label="Address (Bengali)">
              <TextInput value={formData.address} onChange={(e) => handleChange('address', e.target.value)} placeholder="Enter Bengali address" />
            </FormField>

            <FormField label="Address (English)">
              <TextInput value={formData.addressEn} onChange={(e) => handleChange('addressEn', e.target.value)} placeholder="Enter English address" />
            </FormField>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Phone Number">
                <TextInput value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} placeholder="Enter phone" />
              </FormField>
              <FormField label="Email Address">
                <TextInput type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} placeholder="Enter email" />
              </FormField>
            </div>

            <FormField label="Website URL">
              <TextInput value={formData.website} onChange={(e) => handleChange('website', e.target.value)} placeholder="Enter website URL" />
            </FormField>
          </div>
        </AdminCard>

        {/* Motto */}
        <AdminCard className="mb-6">
          <AdminCardHeader title="Motto" description="Institutional motto" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Motto (Bengali)">
              <TextInput value={formData.motto} onChange={(e) => handleChange('motto', e.target.value)} placeholder="Enter Bengali motto" />
            </FormField>
            <FormField label="Motto (English)">
              <TextInput value={formData.mottoEn} onChange={(e) => handleChange('mottoEn', e.target.value)} placeholder="Enter English motto" />
            </FormField>
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
            Save Settings
          </button>
        </div>
      </form>

      <SuccessToast message={successMessage} isVisible={!!successMessage} onClose={() => setSuccessMessage('')} />
    </div>
  );
}
