import { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import PageHeader from '../components/ui/PageHeader';
import Breadcrumb from '../components/ui/Breadcrumb';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import EmptyState from '../components/ui/EmptyState';
import { departments, demoTeachers } from '../data/mockData';
import { usePublishedTeachers } from '../hooks/useFirestore';
import { Link } from 'react-router-dom';
import { Search, User, Filter, Loader2 } from 'lucide-react';

export default function Teachers() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  // Load teachers from Firestore
  const { teachers: firestoreTeachers, loading, error } = usePublishedTeachers();

  const effectiveTeachers = useMemo(() => {
    if (firestoreTeachers.length > 0) return firestoreTeachers;
    return demoTeachers.map(t => ({
      id: t.id,
      name: t.name,
      nameEn: t.nameEn,
      designation: t.designation,
      designationEn: t.designationEn,
      department: t.department,
      departmentEn: t.departmentEn,
      photoUrl: t.image,
      displayOrder: 1,
      status: 'published' as const,
      createdAt: '',
      updatedAt: '',
    }));
  }, [firestoreTeachers]);

  const filteredTeachers = useMemo(() => {
    return effectiveTeachers.filter((teacher) => {
      const matchesSearch =
        searchQuery === '' ||
        teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.designationEn.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDepartment =
        selectedDepartment === '' || teacher.department === selectedDepartment;

      return matchesSearch && matchesDepartment;
    });
  }, [effectiveTeachers, searchQuery, selectedDepartment]);

  return (
    <>
      <PageHeader
        title={t('শিক্ষকবৃন্দ', 'Teachers')}
        subtitle={t('আমাদের সম্মানিত শিক্ষকমণ্ডলী', 'Our respected teaching faculty')}
        breadcrumb={<Breadcrumb items={[{ label: t('শিক্ষকবৃন্দ', 'Teachers') }]} />}
      />

      <Section background="white">
        <div className="max-w-6xl mx-auto">
          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
            </div>
          )}

          {/* Error State only if no fallback */}
          {error && !loading && effectiveTeachers.length === 0 && (
            <EmptyState
              icon={<User className="w-8 h-8" />}
              title={t('শিক্ষক তথ্য লোড করতে সমস্যা হয়েছে', 'Failed to load teachers')}
              description={error}
            />
          )}

          {/* Teachers Content */}
          {!loading && (effectiveTeachers.length > 0 || !error) && (
            <>
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder={t('শিক্ষকের নাম বা পদবি দিয়ে অনুসন্ধান করুন...', 'Search by name or designation...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="pl-10 pr-8 py-2.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 appearance-none bg-white min-w-[200px]"
              >
                <option value="">{t('সকল বিভাগ', 'All Departments')}</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {t(dept.name, dept.nameEn)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-sm text-neutral-500 mb-4">
            {t(`${filteredTeachers.length} জন শিক্ষক পাওয়া গেছে`, `${filteredTeachers.length} teacher(s) found`)}
          </p>

          {/* Teachers Grid */}
          {filteredTeachers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTeachers.map((teacher) => (
                <Link key={teacher.id} to={`/teachers/${teacher.id}`}>
                  <Card hover padding="none" className="overflow-hidden h-full group">
                    {/* Photo */}
                    <div className="aspect-square bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center relative overflow-hidden">
                      {teacher.photoUrl ? (
                        <img
                          src={teacher.photoUrl}
                          alt={t(teacher.name, teacher.nameEn)}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : (
                        <div className="text-center">
                          <User className="w-12 h-12 text-primary-400 mx-auto mb-2" />
                          <p className="text-xs text-primary-500 px-2">
                            {t('[ছবি - সম্পাদনাযোগ্য]', '[Photo - Editable]')}
                          </p>
                        </div>
                      )}
                    </div>
                    {/* Info */}
                    <div className="p-4 text-center">
                      <h3 className="text-sm font-semibold text-primary-900 truncate font-bengali group-hover:text-primary-700 transition-colors">
                        {t(teacher.name, teacher.nameEn)}
                      </h3>
                      <p className="text-xs text-neutral-600 mt-1 truncate">{t(teacher.designation, teacher.designationEn)}</p>
                      <p className="text-xs text-primary-600 mt-0.5">{t(teacher.department, teacher.departmentEn)}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<User className="w-8 h-8" />}
              title={t('কোনো শিক্ষক পাওয়া যায়নি', 'No teachers found')}
              description={t('অনুসন্ধানের শর্ত পরিবর্তন করে আবার চেষ্টা করুন', 'Try changing your search criteria')}
            />
          )}
            </>
          )}
        </div>
      </Section>
    </>
  );
}
