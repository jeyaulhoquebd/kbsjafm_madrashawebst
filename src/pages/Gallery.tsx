import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import PageHeader from '../components/ui/PageHeader';
import Breadcrumb from '../components/ui/Breadcrumb';
import Section from '../components/ui/Section';
import { galleryImages, galleryCategories } from '../data/mockData';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Gallery() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Combine real images with placeholders
  const allImages = [
    ...galleryImages,
    // Add placeholder images
    ...Array.from({ length: 7 }, (_, i) => ({
      id: `placeholder-${i + 1}`,
      src: '',
      alt: `[ছবি ${i + 1} - সম্পাদনাযোগ্য]`,
      altEn: `[Photo ${i + 1} - Editable]`,
      category: ['event', 'classroom', 'library', 'building', 'event', 'classroom', 'library'][i],
    })),
  ];

  const filteredImages = selectedCategory === 'all'
    ? allImages
    : allImages.filter((img) => img.category === selectedCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goToPrevious = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex > 0 ? lightboxIndex - 1 : filteredImages.length - 1);
    }
  };

  const goToNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex < filteredImages.length - 1 ? lightboxIndex + 1 : 0);
    }
  };

  return (
    <>
      <PageHeader
        title={t('ফটো গ্যালারি', 'Photo Gallery')}
        subtitle={t('আমাদের প্রতিষ্ঠানের ছবির সংগ্রহ', 'Collection of photos from our institution')}
        breadcrumb={<Breadcrumb items={[{ label: t('গ্যালারি', 'Gallery') }]} />}
      />

      <Section background="white">
        <div className="max-w-6xl mx-auto">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {galleryCategories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                  selectedCategory === cat.value
                    ? 'bg-primary-700 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {t(cat.label, cat.labelEn)}
              </button>
            ))}
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((img, index) => (
              <div
                key={img.id}
                className="relative aspect-square rounded-xl overflow-hidden shadow-md group cursor-pointer bg-gradient-to-br from-primary-100 to-primary-200"
                onClick={() => openLightbox(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
                aria-label={t(img.alt, img.altEn)}
              >
                {img.src ? (
                  <img
                    src={img.src}
                    alt={t(img.alt, img.altEn)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center p-3">
                      <ImageIcon className="w-8 h-8 text-primary-300 mx-auto mb-2" />
                      <p className="text-xs text-primary-400">{t('[ছবি - সম্পাদনাযোগ্য]', '[Photo - Editable]')}</p>
                    </div>
                  </div>
                )}
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <p className="text-white text-xs font-medium truncate">{t(img.alt, img.altEn)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Info Notice */}
          <div className="mt-8 bg-primary-50 border border-primary-100 rounded-lg p-4">
            <p className="text-xs text-primary-700">
              {t(
                '※ গ্যালারিতে প্রকৃত ছবি শীঘ্রই যুক্ত করা হবে।',
                '※ Actual photos will be added to the gallery soon.'
              )}
            </p>
          </div>
        </div>
      </Section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-neutral-300 transition-colors z-10"
            aria-label={t('বন্ধ করুন', 'Close')}
          >
            <X className="w-8 h-8" />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-neutral-300 transition-colors z-10 bg-black/30 rounded-full p-2"
            aria-label={t('পূর্ববর্তী', 'Previous')}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Image */}
          <div className="max-w-4xl max-h-[80vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {filteredImages[lightboxIndex].src ? (
              <img
                src={filteredImages[lightboxIndex].src}
                alt={t(filteredImages[lightboxIndex].alt, filteredImages[lightboxIndex].altEn)}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
            ) : (
              <div className="bg-primary-900 rounded-lg p-12 text-center">
                <ImageIcon className="w-16 h-16 text-primary-400 mx-auto mb-4" />
                <p className="text-primary-200 text-sm">{t('[ছবি - সম্পাদনাযোগ্য]', '[Photo - Editable]')}</p>
              </div>
            )}
          </div>

          {/* Next Button */}
          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-neutral-300 transition-colors z-10 bg-black/30 rounded-full p-2"
            aria-label={t('পরবর্তী', 'Next')}
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Caption */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-lg">
            {t(filteredImages[lightboxIndex].alt, filteredImages[lightboxIndex].altEn)}
            <span className="ml-2 text-neutral-400">({lightboxIndex + 1}/{filteredImages.length})</span>
          </div>
        </div>
      )}
    </>
  );
}
