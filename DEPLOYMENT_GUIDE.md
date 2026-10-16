# Production Deployment Guide

## ⚠️ IMPORTANT: Complete These Steps Before Going Live

This guide walks you through the critical steps needed to make the madrasa website production-ready.

---

## Phase 1: Deploy Security Rules (CRITICAL - 30 minutes)

### Step 1.1: Install Firebase CLI

```bash
npm install -g firebase-tools
```

### Step 1.2: Login to Firebase

```bash
firebase login
```

Follow the browser prompts to authenticate.

### Step 1.3: Initialize Firebase (if not already done)

```bash
firebase init
```

Select:
- ✅ Firestore
- ✅ Storage
- ✅ Hosting (optional)
- Project: `kbsjafm`

### Step 1.4: Deploy Firestore Rules

```bash
firebase deploy --only firestore:rules
```

**Expected Output:**
```
✔ Deploy complete!
```

### Step 1.5: Deploy Storage Rules

```bash
firebase deploy --only storage:rules
```

**Expected Output:**
```
✔ Deploy complete!
```

### Step 1.6: Verify Rules Deployment

1. Go to https://console.firebase.google.com/project/kbsjafm/firestore/rules
2. Verify rules match `firestore.rules` file
3. Go to https://console.firebase.google.com/project/kbsjafm/storage/rules
4. Verify rules match `storage.rules` file

---

## Phase 2: Create Admin User (15 minutes)

### Step 2.1: Create Firebase Auth User

1. Go to https://console.firebase.google.com/project/kbsjafm/authentication/users
2. Click "Add user"
3. Enter:
   - Email: `admin@yourdomain.com` (use real email)
   - Password: [strong password - 12+ characters]
4. Click "Add user"
5. **Copy the User UID** (you'll need it next)

### Step 2.2: Create Admin Document in Firestore

1. Go to https://console.firebase.google.com/project/kbsjafm/firestore
2. Click "Start collection" (if first time) or select `admins` collection
3. Click "Add document"
4. **Document ID:** Paste the User UID from Step 2.1
5. Add fields:

| Field | Type | Value |
|-------|------|-------|
| `role` | string | `admin` |
| `active` | boolean | `true` |
| `email` | string | `admin@yourdomain.com` |
| `displayName` | string | `Administrator Name` |
| `createdAt` | timestamp | [current time] |
| `createdBy` | string | `manual-setup` |

6. Click "Save"

### Step 2.3: Test Admin Login

1. Go to `http://localhost:5173/admin/login`
2. Login with admin credentials
3. **Expected:** Redirect to admin dashboard
4. **Verify:** Can see all admin pages

---

## Phase 3: Connect Pages to Firestore (4-6 hours)

### Step 3.1: Update Public Pages

**Files to Update:**
- `src/pages/Home.tsx`
- `src/pages/Notices.tsx`
- `src/pages/Teachers.tsx`
- `src/pages/Gallery.tsx`
- `src/pages/Academics.tsx`
- `src/pages/Results.tsx`

**Pattern:**
```typescript
// BEFORE (mock data)
import { sampleNotices } from '../data/mockData';
const [notices] = useState(sampleNotices);

// AFTER (Firestore)
import { usePublishedNotices } from '../hooks/useFirestore';
const { notices, loading, error } = usePublishedNotices();

if (loading) return <LoadingSpinner />;
if (error) return <ErrorMessage message={error} />;
```

### Step 3.2: Update Admin Dashboard

**Files to Update:**
- `src/admin/pages/NoticesManagement.tsx`
- `src/admin/pages/TeachersManagement.tsx`
- `src/admin/pages/GalleryManagement.tsx`
- `src/admin/pages/ResourcesManagement.tsx`
- `src/admin/pages/HomepageManagement.tsx`
- `src/admin/pages/SettingsManagement.tsx`

**Pattern:**
```typescript
// BEFORE (mock data)
const { notices, addNotice } = useAdmin();

// AFTER (Firestore)
import { noticesService } from '../../services/firestore';
import { useAuth } from '../../contexts/AuthContext';

const { admin } = useAuth();
const [notices, setNotices] = useState([]);

useEffect(() => {
  const fetchNotices = async () => {
    const data = await noticesService.getAllNoticesAdmin();
    setNotices(data);
  };
  fetchNotices();
}, []);

const handleAdd = async (noticeData) => {
  await noticesService.createNotice(noticeData, admin.uid);
};
```

### Step 3.3: Connect Forms to Firestore

**Files to Update:**
- `src/pages/Contact.tsx`
- `src/pages/Admission.tsx`

**Pattern:**
```typescript
// BEFORE (mock submission)
setTimeout(() => {
  setIsSubmitted(true);
}, 1500);

// AFTER (Firestore)
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validate()) return;

  setIsLoading(true);
  try {
    await addDoc(collection(db, 'contactMessages'), {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
      status: 'new',
      adminNotes: '',
      submittedAt: serverTimestamp(),
    });
    setIsSubmitted(true);
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to submit. Please try again.');
  } finally {
    setIsLoading(false);
  }
};
```

---

## Phase 4: Test Everything (2-3 hours)

### Test 1: Authentication
- [ ] Unauthenticated user cannot access /admin
- [ ] Non-admin user sees "Access Denied"
- [ ] Admin user can login and access dashboard
- [ ] Sign out works correctly
- [ ] Password reset works

### Test 2: Public Pages
- [ ] Home page loads notices from Firestore
- [ ] Notices page shows only published notices
- [ ] Teachers page loads from Firestore
- [ ] Gallery page loads from Firestore
- [ ] Draft content is NOT visible

### Test 3: Admin Dashboard
- [ ] Can create notices
- [ ] Can edit notices
- [ ] Can delete notices
- [ ] Can publish/unpublish notices
- [ ] Changes persist after refresh
- [ ] Same for teachers, gallery, resources

### Test 4: Forms
- [ ] Contact form submits to Firestore
- [ ] Admission form submits to Firestore
- [ ] Validation works correctly
- [ ] Success message shows only after success
- [ ] Error handling works

### Test 5: File Uploads
- [ ] Can upload images to Cloudinary
- [ ] Image URLs saved to Firestore
- [ ] File validation works (format, size)
- [ ] Can upload PDFs to Storage
- [ ] Download links work

### Test 6: Security
- [ ] Public cannot read drafts
- [ ] Public cannot write anything
- [ ] Public cannot read admin records
- [ ] Public cannot read form submissions
- [ ] Admin can do everything

---

## Phase 5: Verify Cloudinary (15 minutes)

### Step 5.1: Check Upload Preset

1. Go to https://cloudinary.com/console
2. Go to Settings → Upload
3. Find preset: `kbsjafmadrasha`
4. Verify settings:
   - ✅ Signing Mode: Unsigned
   - ✅ Allowed formats: JPEG, PNG, WebP
   - ✅ Max file size: 5MB
   - ✅ Max pixels: 2000x2000 (recommended)
   - ✅ Folder: madrasa (recommended)

### Step 5.2: Test Upload

1. Login as admin
2. Go to Gallery Management
3. Upload a test image
4. Verify:
   - [ ] Upload succeeds
   - [ ] Image appears in Cloudinary
   - [ ] Firestore document created
   - [ ] Image displays on public site

---

## Phase 6: Final Checks (30 minutes)

### Step 6.1: Build for Production

```bash
npm run build
```

**Expected:**
- ✅ Build successful
- ✅ No errors
- ⚠️ Bundle size warning (acceptable)

### Step 6.2: Test Production Build

```bash
npm run preview
```

Visit `http://localhost:4173` and verify everything works.

### Step 6.3: Deploy to Hosting (Optional)

```bash
firebase deploy --only hosting
```

**Expected Output:**
```
✔ Deploy complete!
Hosting URL: https://kbsjafm.web.app
```

---

## Troubleshooting

### Issue: "Missing or insufficient permissions"

**Cause:** Security rules not deployed or incorrect

**Solution:**
1. Verify rules deployed: `firebase deploy --only firestore:rules`
2. Check Firestore Console → Rules
3. Verify admin document exists with correct UID

### Issue: Admin login shows "Access Denied"

**Cause:** Admin document missing or incorrect

**Solution:**
1. Check Firestore → admins collection
2. Verify document ID matches User UID
3. Verify `active: true`
4. Verify `role: "admin"`

### Issue: Forms show success but no data in Firestore

**Cause:** Forms still using mock submission

**Solution:**
1. Update forms to use Firestore (Phase 3.3)
2. Check browser console for errors
3. Verify Firestore rules allow create

### Issue: Images not uploading

**Cause:** Cloudinary preset not configured

**Solution:**
1. Check Cloudinary Console → Settings → Upload
2. Verify preset `kbsjafmadrasha` exists
3. Verify allowed formats include JPEG, PNG, WebP
4. Verify max file size is 5MB or more

---

## Post-Launch Checklist

After successful deployment:

- [ ] Monitor Firebase usage (Console → Usage)
- [ ] Check Cloudinary usage (Dashboard → Usage)
- [ ] Set up Firebase Alerts (Console → Project Settings → Notifications)
- [ ] Review admin access logs
- [ ] Backup Firestore data regularly
- [ ] Monitor error logs
- [ ] Update documentation

---

## Support Resources

- **Firebase Documentation:** https://firebase.google.com/docs
- **Firestore Security Rules:** https://firebase.google.com/docs/firestore/security/rules-structure
- **Cloudinary Documentation:** https://cloudinary.com/documentation
- **Project Documentation:** See `COMPREHENSIVE_AUDIT_REPORT.md`

---

## Quick Command Reference

```bash
# Deploy Firestore rules
firebase deploy --only firestore:rules

# Deploy Storage rules
firebase deploy --only storage:rules

# Deploy Hosting
firebase deploy --only hosting

# Deploy everything
firebase deploy

# Local development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

---

**Last Updated:** 2026-03-07  
**Status:** Ready for Implementation  
**Estimated Time:** 7-10 hours
