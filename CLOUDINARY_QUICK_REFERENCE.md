# Cloudinary Integration - Quick Reference

## 🚀 Quick Start

### Upload an Image
```typescript
import { uploadImage, CLOUDINARY_FOLDERS } from '@/services/cloudinary';

const result = await uploadImage(
  file, 
  CLOUDINARY_FOLDERS.GALLERY,
  (progress) => console.log(`${progress.percentage}%`)
);

console.log(result.secureUrl);   // https://res.cloudinary.com/...
console.log(result.publicId);    // madrasa/gallery/123456-abc-photo
```

### Use Upload Component
```tsx
import ImageUpload from '@/components/admin/ImageUpload';
import { CLOUDINARY_FOLDERS } from '@/services/cloudinary';

<ImageUpload
  folder={CLOUDINARY_FOLDERS.GALLERY}
  onUploadComplete={(result) => {
    // Save result.secureUrl and result.publicId to Firestore
  }}
  label="ছবি আপলোড করুন"
/>
```

### Display Optimized Image
```typescript
import { getCloudinaryUrl, getThumbnailUrl } from '@/services/cloudinary';

// Thumbnail
<img src={getThumbnailUrl(publicId)} alt="..." />

// Optimized for web
<img src={getCloudinaryUrl(publicId, { 
  width: 800, 
  quality: 'auto', 
  format: 'auto' 
})} alt="..." />
```

---

## 📁 Folder Structure

```typescript
CLOUDINARY_FOLDERS.LOGO           // madrasa/logo
CLOUDINARY_FOLDERS.BUILDING       // madrasa/building
CLOUDINARY_FOLDERS.PRINCIPAL      // madrasa/principal
CLOUDINARY_FOLDERS.TEACHERS       // madrasa/teachers
CLOUDINARY_FOLDERS.GALLERY        // madrasa/gallery
CLOUDINARY_FOLDERS.GALLERY_EVENTS // madrasa/gallery/events
CLOUDINARY_FOLDERS.DOCUMENTS      // madrasa/documents
```

---

## ✅ Validation Rules

- **Allowed formats:** JPEG, JPG, PNG, WebP
- **Max file size:** 5 MB
- **Error messages:** Bengali

---

## 🔧 Configuration

**Cloud Name:** `dc80xvaid`  
**Upload Preset:** `kbsjafmadrasha` (unsigned)  
**Upload URL:** `https://api.cloudinary.com/v1_1/dc80xvaid/image/upload`

---

## 📊 Firestore Schema

### Gallery Image
```javascript
{
  imageUrl: "https://res.cloudinary.com/...",
  cloudinaryPublicId: "madrasa/gallery/...",
  title: "শিরোনাম",
  titleEn: "Title",
  category: "event",
  status: "published"
}
```

### Teacher
```javascript
{
  photoUrl: "https://res.cloudinary.com/...",
  photoPublicId: "madrasa/teachers/...",
  name: "নাম",
  designation: "পদবি"
}
```

---

## ⚠️ Important Notes

1. **Unsigned preset is public** - Configure restrictions in Cloudinary Console
2. **Cannot delete from Cloudinary** - Only unpublish from Firestore
3. **Client-side validation only** - Preset controls actual security
4. **No API secrets in frontend** - All uploads use unsigned preset

---

## 🎯 Integrated Pages

- ✅ Gallery Management (`/admin/gallery`)
- ✅ Teacher Management (`/admin/teachers`)
- 🔄 Homepage Management (ready to integrate)
- 🔄 Site Settings (ready to integrate)

---

## 📖 Full Documentation

See `CLOUDINARY_INTEGRATION_SUMMARY.md` for complete details.
