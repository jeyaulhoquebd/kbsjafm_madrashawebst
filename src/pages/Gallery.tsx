import { useLanguage } from '../context/LanguageContext';
import Section, { SectionHeader } from '../components/ui/Section';
import { galleryImages } from '../data/mockData';
import { Image as ImageIcon } from 'lucide-react';

export default function Gallery() {
  const { t } = useLanguage();

  return (
    <>
      <section className="gradient-emerald py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl lg:text-4xl font-bold text-white font-bengali">
            {t('ফটো গ্যালারি', 'Photo Gallery')}
          </h1>
          <p className="mt-3 text-primary-200 text-base lg:text-lg">
            {t(
              'আমাদের প্রতিষ্ঠানের ছবির সংগ্রহ',
              'Collection of photos from our institution'
            )}
          </p>
        </div>
      </section>

      <Section background="white">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title={t('আমাদের ছবিসমূহ', 'Our Photos')}
            centered={false}
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Main building photo */}
            {galleryImages.map((img) => (
              <div key={img.id} className="col-span-2 md:col-span-2 lg:col-span-2 rounded-xl overflow-hidden shadow-md group cursor-pointer">
                <div className="relative aspect-video">
                  <img
                    src={img.src}
                    alt={t(img.alt, img.altEn)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-white text-sm font-medium">
                      {t(img.alt, img.altEn)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Placeholder images */}
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="rounded-xl overflow-hidden shadow-md group cursor-pointer">
                <div className="relative aspect-square bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                  <div className="text-center p-3">
                    <ImageIcon className="w-8 h-8 text-primary-300 mx-auto mb-2" />
                    <p className="text-xs text-primary-400">
                      {t('[ছবি - সম্পাদনাযোগ্য]', '[Photo - Editable]')}
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <p className="text-white text-xs font-medium">
                      {t('[ছবির ক্যাপশন]', '[Photo Caption]')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
