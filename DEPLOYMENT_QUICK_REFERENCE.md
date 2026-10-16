# Production Deployment Quick Reference

## 🚀 Critical Steps (Must Complete Before Production)

### Step 1: Deploy Firestore Security Rules (2 minutes)

```bash
# Install Firebase CLI if not already installed
npm install -g firebase-tools

# Login to Firebase
firebase login

# Deploy Firestore rules
firebase deploy --only firestore:rules
```

**Verification:**
- Go to Firebase Console → Firestore → Rules
- Verify rules match `firestore.rules` file
- Test with Rules Playground

---

### Step 2: Create Admin User (5 minutes)

1. Go to [Firebase Console](https://console.firebase.google.com/project/kbsjafm/authentication/users)
2. Click "Add user"
3. Enter:
   - Email: `[admin email]`
   - Password: `[strong password]`
4. Click "Add user"
5. **Copy the User UID** (you'll need it next)

---

### Step 3: Create Admin Document (5 minutes)

1. Go to Firebase Console → Firestore Database
2. Click "Start collection" (if first time)
3. Collection ID: `admins`
4. Click "Add document"
5. **Document ID:** Paste the User UID from Step 2
6. Add fields:

| Field | Type | Value |
|-------|------|-------|
| `role` | string | `admin` |
| `active` | boolean | `true` |
| `email` | string | `[same email as Step 2]` |
| `displayName` | string | `Administrator Name` |
| `createdAt` | timestamp | `[current time]` |
| `createdBy` | string | `manual-setup` |

7. Click "Save"

---

### Step 4: Verify Cloudinary Preset (5 minutes)

1. Go to [Cloudinary Console](https://cloudinary.com/console)
2. Go to Settings → Upload
3. Find preset: `kbsjafmadrasha`
4. Verify settings:
   - ✅ Signing Mode: Unsigned
   - ✅ Allowed formats: JPEG, PNG, WebP
   - ✅ Max file size: 5 MB
   - ✅ Max pixels: 2000x2000 (recommended)

---

### Step 5: Test Login (5 minutes)

1. Go to `http://localhost:5173/admin/login` (or your deployed URL)
2. Login with admin credentials from Step 2
3. **Expected:** Redirect to admin dashboard
4. **Verify:** Can see all admin pages
5. **Test:** Create a test notice
6. **Test:** Sign out and login again

---

## 📋 Complete Deployment Checklist

### Pre-Deployment

- [ ] Deploy Firestore security rules
- [ ] Create admin user in Firebase Authentication
- [ ] Create admin document in Firestore
- [ ] Verify Cloudinary preset configuration
- [ ] Test admin login
- [ ] Test CRUD operations
- [ ] Test form submissions
- [ ] Test image uploads

### Content Migration

- [ ] Add institutional content via admin dashboard
- [ ] Upload official images to Cloudinary
- [ ] Add teacher profiles
- [ ] Add notices
- [ ] Add gallery images
- [ ] Add academic content
- [ ] Publish verified content
- [ ] Mark unverified content as drafts

### Testing

- [ ] Test all public pages
- [ ] Test all admin operations
- [ ] Test form submissions
- [ ] Test image uploads
- [ ] Test access control
- [ ] Test responsive design
- [ ] Test on mobile devices
- [ ] Test on tablets
- [ ] Test on desktop

### Deployment

- [ ] Build production bundle: `npm run build`
- [ ] Test production build: `npm run preview`
- [ ] Deploy to Firebase Hosting (optional): `firebase deploy --only hosting`
- [ ] Configure custom domain (optional)
- [ ] Enable HTTPS

### Post-Deployment

- [ ] Monitor Firebase usage
- [ ] Monitor Cloudinary usage
- [ ] Review admin access logs
- [ ] Backup Firestore data
- [ ] Set up error tracking
- [ ] Set up performance monitoring

---

## 🔧 Common Issues & Solutions

### Issue: "Missing or insufficient permissions"

**Cause:** Firestore rules not deployed

**Solution:**
```bash
firebase deploy --only firestore:rules
```

---

### Issue: Admin login shows "Access Denied"

**Cause:** Admin document missing or incorrect

**Solution:**
1. Check Firestore → admins collection
2. Verify document ID matches User UID
3. Verify `active: true`
4. Verify `role: "admin"`

---

### Issue: Cannot upload images

**Cause:** Cloudinary preset not configured

**Solution:**
1. Check Cloudinary Console → Settings → Upload
2. Verify preset `kbsjafmadrasha` exists
3. Verify allowed formats include JPEG, PNG, WebP
4. Verify max file size is 5 MB or more

---

### Issue: Forms show success but no data in Firestore

**Cause:** Forms not connected to Firestore

**Solution:**
1. Check browser console for errors
2. Verify Firestore rules allow create operations
3. Check form submission code
4. Verify collection names match

---

### Issue: Images not displaying

**Cause:** Incorrect image URLs

**Solution:**
1. Check Firestore for correct image URLs
2. Verify URLs are accessible in browser
3. Check Cloudinary for uploaded images
4. Verify public IDs match

---

## 📊 Verification Commands

### Check Build
```bash
npm run build
```
**Expected:** Build successful, no errors

### Check Development Server
```bash
npm run dev
```
**Expected:** Server starts at http://localhost:5173

### Check Production Preview
```bash
npm run preview
```
**Expected:** Production build served at http://localhost:4173

### Check Firebase Deployment
```bash
firebase deploy
```
**Expected:** All services deployed successfully

---

## 🔐 Security Verification

### Test 1: Public Cannot Read Drafts
```javascript
// In browser console (on public page)
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const db = getFirestore();
const q = query(collection(db, 'notices'), where('status', '==', 'draft'));
const snapshot = await getDocs(q);
// Expected: Permission denied error
```

### Test 2: Public Cannot Write
```javascript
import { addDoc } from 'firebase/firestore';

await addDoc(collection(db, 'notices'), {
  title: 'Test',
  status: 'published',
  // ... other fields
});
// Expected: Permission denied error
```

### Test 3: Admin Can Write
```javascript
// After logging in as admin
await addDoc(collection(db, 'notices'), {
  title: 'Test Notice',
  status: 'draft',
  // ... other fields
});
// Expected: Success
```

---

## 📞 Support Resources

### Documentation
- `COMPLETE_AUDIT_REPORT.md` - Full audit report
- `CLOUDINARY_COMPLETE_GUIDE.md` - Cloudinary integration guide
- `FIRESTORE_INTEGRATION_SUMMARY.md` - Firestore integration guide
- `FIREBASE_AUTH_SETUP.md` - Authentication setup guide
- `ADMIN_SETUP_GUIDE.md` - Admin setup guide

### Firebase Documentation
- [Firebase Console](https://console.firebase.google.com)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Authentication Documentation](https://firebase.google.com/docs/auth)
- [Security Rules](https://firebase.google.com/docs/firestore/security/rules-structure)

### Cloudinary Documentation
- [Cloudinary Console](https://cloudinary.com/console)
- [Upload Documentation](https://cloudinary.com/documentation/upload_images)
- [Transformation Documentation](https://cloudinary.com/documentation/image_transformations)

---

## 🎯 Quick Start for New Administrators

### First Login
1. Go to `/admin/login`
2. Enter admin email and password
3. Click "লগইন করুন" (Login)
4. You'll be redirected to admin dashboard

### Adding a Notice
1. Go to "Notices" in sidebar
2. Click "Add Notice" button
3. Fill in title, content, category
4. Click "Add Notice"
5. Notice appears on public website immediately

### Adding a Teacher
1. Go to "Teachers" in sidebar
2. Click "Add Teacher" button
3. Fill in name, designation, department
4. Upload photo (optional)
5. Click "Add Teacher"
6. Teacher appears on public website

### Uploading Gallery Images
1. Go to "Gallery" in sidebar
2. Click upload area or "Add Image" button
3. Select image file (JPEG, PNG, or WebP, max 5 MB)
4. Wait for upload to complete
5. Add caption and category
6. Click "Save"
7. Image appears in public gallery

### Managing Contact Messages
1. Go to "Contact Messages" in sidebar (if implemented)
2. View all submitted messages
3. Mark as read/responded/archived
4. Add admin notes
5. Messages are private (not visible to public)

---

## 📈 Monitoring & Maintenance

### Daily Tasks
- [ ] Check for new contact messages
- [ ] Check for new admission inquiries
- [ ] Review admin access logs

### Weekly Tasks
- [ ] Monitor Firebase usage
- [ ] Monitor Cloudinary usage
- [ ] Review error logs
- [ ] Backup Firestore data

### Monthly Tasks
- [ ] Clean up orphaned images in Cloudinary
- [ ] Review and optimize image sizes
- [ ] Update documentation
- [ ] Review security logs
- [ ] Test all features

---

## ✅ Final Checklist

Before going live, verify:

- [ ] All security rules deployed
- [ ] Admin user created and tested
- [ ] All content migrated to Firestore
- [ ] All images uploaded to Cloudinary
- [ ] All forms working correctly
- [ ] All pages responsive
- [ ] All links working
- [ ] No broken images
- [ ] No console errors
- [ ] Build successful
- [ ] Production deployment tested
- [ ] Monitoring set up
- [ ] Backup strategy in place
- [ ] Documentation complete
- [ ] Training completed for administrators

---

**Last Updated:** 2026-03-07  
**Status:** ✅ Ready for Production Deployment  
**Estimated Setup Time:** 30-60 minutes
