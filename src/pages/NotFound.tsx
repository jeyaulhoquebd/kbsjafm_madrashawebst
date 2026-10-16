import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import Button from '../components/ui/Button';

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <section className="min-h-[60vh] flex items-center justify-center bg-neutral-50">
      <div className="text-center px-4">
        <div className="text-6xl lg:text-8xl font-bold text-primary-200 mb-4">
          404
        </div>
        <h1 className="text-2xl lg:text-3xl font-bold text-primary-900 mb-2 font-bengali">
          {t('পৃষ্ঠা পাওয়া যায়নি', 'Page Not Found')}
        </h1>
        <p className="text-neutral-600 mb-6">
          {t(
            'আপনি যে পৃষ্ঠাটি খুঁজছেন তা পাওয়া যায়নি।',
            'The page you are looking for could not be found.'
          )}
        </p>
        <Link to="/">
          <Button variant="primary" icon={<Home className="w-4 h-4" />}>
            {t('হোম পেজে ফিরে যান', 'Go Back Home')}
          </Button>
        </Link>
      </div>
    </section>
  );
}
