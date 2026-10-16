# Firebase Authentication & Security Setup Guide

## Overview

This guide explains how to set up Firebase Authentication and deploy security rules for the madrasa website admin dashboard.

**Security Model:**
- Public visitors can read only published content
- Only authenticated administrators can manage content
- Admin role is verified via Firestore document
- No public registration - admins created via Firebase Console
- Security enforced by Firestore/Storage rules, not frontend checks

---

## Prerequisites

- Firebase project: `kbsjafm`
- Firebase CLI installed (`npm install -g firebase-tools`)
- Firebase project initialized (`firebase init`)

---

## Step 1: Deploy Firestore Security Rules

### Option A: Using Firebase CLI (Recommended)

```bash
# Login to Firebase
firebase login

# Deploy Firestore rules
firebase deploy --only firestore:rules
```

### Option B: Using Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select project: `kbsjafm`
3. Navigate to **Firestore Database** → **Rules**
4. Copy the contents of `firestore.rules`
5. Paste into the rules editor
6. Click **Publish**

### Rules Summary

**Public Access (Read Only):**
- ✅ Published notices, teachers, gallery, resources, academic content, results
- ✅ Site settings
- ❌ Drafts and unpublished content
- ❌ Admin records
- ❌ Form submissions (contact messages, admission inquiries)

**Admin Access (Authenticated + Admin Role):**
- ✅ Full CRUD on all content collections
- ✅ Read/manage form submissions
- ✅ Read admin records

**No Access:**
- ❌ Creating/updating/deleting admin records (must be done via Console)
- ❌ Unauthenticated write operations
- ❌ Non-admin authenticated users

---

## Step 2: Deploy Storage Security Rules

### Option A: Using Firebase CLI

```bash
firebase deploy --only storage:rules
```

### Option B: Using Firebase Console

1. Go to Firebase Console → **Storage** → **Rules**
2. Copy the contents of `storage.rules`
3. Paste into the rules editor
4. Click **Publish**

### Rules Summary

**Public Documents (`/public/`):**
- ✅ Anyone can read
- ✅ Admins can upload (max 10MB, PDF/DOC/XLS only)

**Admin Documents (`/admin/`):**
- ✅ Admins only (read/write)

**Temporary Uploads (`/temp/{userId}/`):**
- ✅ Authenticated users can upload their own files

**Website Images:**
- ❌ NOT stored in Firebase Storage
- ✅ Stored in Cloudinary (separate service)

---

## Step 3: Enable Firebase Authentication

1. Go to Firebase Console → **Authentication** → **Sign-in method**
2. Enable **Email/Password** provider
3. Disable all other providers (not needed)
4. Optional: Configure email templates for password reset

---

## Step 4: Create First Administrator

**IMPORTANT:** The first admin must be created manually via Firebase Console. Never create admins through the application.

### Step 4.1: Create Authentication User

1. Go to Firebase Console → **Authentication** → **Users**
2. Click **Add user**
3. Enter:
   - Email: `admin@yourdomain.com` (use a real, verified email)
   - Password: [Strong password - minimum 6 characters]
4. Click **Add user**
5. **Copy the User UID** (you'll need this in the next step)

### Step 4.2: Create Admin Document in Firestore

1. Go to Firebase Console → **Firestore Database**
2. Navigate to the `admins` collection (create it if it doesn't exist)
3. Click **Add document**
4. **Document ID:** Paste the User UID from Step 4.1
5. Add the following fields:

```
Field: role
Type: string
Value: admin

Field: active
Type: boolean
Value: true

Field: email
Type: string
Value: admin@yourdomain.com (same email as Step 4.1)

Field: displayName
Type: string
Value: Administrator Name

Field: createdAt
Type: timestamp
Value: [Current timestamp]

Field: createdBy
Type: string
Value: manual-setup
```

6. Click **Save**

### Step 4.3: Verify Admin Access

1. Go to your website: `https://yourdomain.com/admin/login`
2. Login with the email and password from Step 4.1
3. You should be redirected to the admin dashboard
4. If you see "Access Denied", verify:
   - The admin document exists in Firestore
   - The document ID matches the User UID
   - The `active` field is `true`
   - The email matches exactly

---

## Step 5: Test Security Rules

### Test 1: Public Read Access

```javascript
// In browser console (on public page):
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { app } from './src/lib/firebase';

const db = getFirestore(app);
const noticesRef = collection(db, 'notices');
const q = query(noticesRef, where('status', '==', 'published'));
const snapshot = await getDocs(q);
console.log('Published notices:', snapshot.docs.length);
// Should work ✅
```

### Test 2: Public Cannot Read Drafts

```javascript
const draftsQuery = query(noticesRef, where('status', '==', 'draft'));
const draftsSnapshot = await getDocs(draftsQuery);
// Should fail with "permission-denied" ❌
```

### Test 3: Unauthenticated Cannot Write

```javascript
import { addDoc } from 'firebase/firestore';

await addDoc(noticesRef, {
  title: 'Test',
  status: 'published',
  // ... other fields
});
// Should fail with "permission-denied" ❌
```

### Test 4: Admin Can Write

```javascript
// After logging in as admin:
import { getAuth } from 'firebase/auth';
const auth = getAuth(app);
console.log('Current user:', auth.currentUser?.uid);

await addDoc(noticesRef, {
  title: 'Test Notice',
  status: 'draft',
  // ... other fields
});
// Should succeed ✅
```

---

## Step 6: Security Checklist

Before going live, verify:

- [ ] Firestore rules deployed successfully
- [ ] Storage rules deployed successfully
- [ ] Email/Password authentication enabled
- [ ] First admin user created in Authentication
- [ ] Admin document created in Firestore `admins` collection
- [ ] Admin can login successfully
- [ ] Admin can create/edit/delete content
- [ ] Public users can read published content
- [ ] Public users cannot read drafts
- [ ] Public users cannot write to any collection
- [ ] Public form submissions work (contact, admission)
- [ ] Public form submissions are not readable by public
- [ ] Admin records are not readable by non-admins
- [ ] No privilege escalation possible

---

## Troubleshooting

### Issue: "Missing or insufficient permissions"

**Cause:** Security rules are blocking the operation

**Solution:**
1. Verify the user is authenticated
2. Check if admin document exists in Firestore
3. Verify admin document ID matches User UID
4. Check if `active` field is `true`
5. Review Firestore rules for the specific collection

### Issue: Admin login shows "Access Denied"

**Cause:** Admin document missing or inactive

**Solution:**
1. Check Firestore `admins` collection
2. Verify document ID matches User UID from Authentication
3. Ensure `active` field is `true`
4. Ensure `role` field is set to `admin`

### Issue: Cannot deploy rules

**Cause:** Firebase CLI not configured

**Solution:**
```bash
firebase login
firebase use kbsjafm
firebase deploy --only firestore:rules
firebase deploy --only storage:rules
```

### Issue: Public form submission fails

**Cause:** Validation rules too strict

**Solution:**
1. Check field names match exactly
2. Verify field types (string, timestamp, etc.)
3. Check string lengths are within limits
4. Verify email/phone format validation

---

## Admin Role Hierarchy

The system supports three admin roles:

1. **super-admin** (Level 3)
   - Full access to all features
   - Can manage other admins (future feature)
   - Can access sensitive settings

2. **admin** (Level 2)
   - Full content management
   - Can manage form submissions
   - Cannot manage other admins

3. **editor** (Level 1)
   - Can create/edit content
   - Cannot delete content
   - Cannot manage settings

**Current Implementation:** All admins have `admin` role. Super-admin and editor roles are prepared for future expansion.

---

## Security Best Practices

### ✅ DO:
- Use strong passwords for admin accounts
- Enable 2FA on admin email accounts
- Regularly review admin access logs
- Keep admin email addresses verified
- Monitor Firestore usage and quotas
- Test security rules thoroughly before deployment

### ❌ DON'T:
- Share admin credentials
- Create admin accounts through the application
- Store admin passwords in code
- Disable security rules for testing in production
- Allow public registration
- Trust frontend-only security checks

---

## Monitoring & Logs

### View Authentication Logs

1. Firebase Console → **Authentication** → **Users**
2. View sign-in activity
3. Monitor failed login attempts

### View Firestore Access Logs

1. Firebase Console → **Firestore Database** → **Usage**
2. Monitor read/write operations
3. Check for unusual patterns

### Set Up Alerts

1. Firebase Console → **Project Settings** → **Notifications**
2. Configure email alerts for:
   - High usage
   - Failed operations
   - Security violations

---

## Next Steps

After completing this setup:

1. **Test all admin operations** (create, edit, delete, publish)
2. **Test public form submissions** (contact, admission)
3. **Verify security rules** with the test cases above
4. **Create additional admin accounts** if needed (via Firebase Console)
5. **Monitor usage** for the first few weeks
6. **Review and update** security rules as needed

---

## Support

For issues or questions:
- Firebase Documentation: https://firebase.google.com/docs
- Firestore Security Rules: https://firebase.google.com/docs/firestore/security/rules-structure
- Firebase Authentication: https://firebase.google.com/docs/auth

---

**Last Updated:** 2026-03-07  
**Firebase Project:** kbsjafm  
**Status:** Ready for Deployment
