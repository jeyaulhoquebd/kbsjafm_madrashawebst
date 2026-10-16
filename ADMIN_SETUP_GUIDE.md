# Administrator Account Setup Guide

## Overview

This guide explains how to connect the existing Firebase Authentication account (UID: `8ALeLYl29me8iozWeTVFoe0FIJ63`) to the Admin Dashboard.

**Administrator UID:** `8ALeLYl29me8iozWeTVFoe0FIJ63`  
**Firebase Project:** `kbsjafm`  
**Status:** ✅ Authentication system implemented and ready

---

## 🔐 Security Architecture

### How Authentication Works

```
1. User enters email/password at /admin/login
   ↓
2. Firebase Authentication validates credentials
   ↓
3. AuthContext listens for auth state change
   ↓
4. System checks Firestore for admin document at:
   admins/8ALeLYl29me8iozWeTVFoe0FIJ63
   ↓
5. Verifies document has:
   - role: "admin" (or "super-admin" or "editor")
   - active: true
   ↓
6. If valid → Grant access to admin dashboard
   If invalid → Show "Access Denied" page
```

### Security Layers

1. **Firebase Authentication** - Validates email/password
2. **Firestore Admin Document** - Verifies admin role
3. **Firestore Security Rules** - Enforces access control at database level
4. **Frontend Route Protection** - Improves UX (not security boundary)

---

## 📋 Prerequisites

Before proceeding, ensure:

- [ ] Firebase project `kbsjafm` is created
- [ ] Firebase Authentication is enabled (Email/Password provider)
- [ ] Firestore database is created
- [ ] Firestore security rules are deployed
- [ ] The administrator account exists in Firebase Authentication

---

## Step 1: Verify Administrator Account Exists

### Check Firebase Authentication

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select project: **kbsjafm**
3. Navigate to **Authentication** → **Users**
4. Look for the user with UID: `8ALeLYl29me8iozWeTVFoe0FIJ63`

**Expected:**
- ✅ User exists with UID `8ALeLYl29me8iozWeTVFoe0FIJ63`
- ✅ Email address is visible (note this email - you'll need it to login)
- ✅ Account is enabled (not disabled)

**If user doesn't exist:**
- The account must be created by someone with Firebase Console access
- Do NOT create it through the application
- Use the "Add user" button in Firebase Console

---

## Step 2: Create Administrator Role Document

### Create Document in Firestore

1. Go to Firebase Console → **Firestore Database**
2. Navigate to the `admins` collection
   - If it doesn't exist, click "Start collection"
   - Collection ID: `admins`
3. Click "Add document"
4. **Document ID:** Enter exactly: `8ALeLYl29me8iozWeTVFoe0FIJ63`
   - This MUST match the UID from Step 1
5. Add the following fields:

| Field Name | Type | Value | Notes |
|------------|------|-------|-------|
| `role` | string | `admin` | Can be "admin", "super-admin", or "editor" |
| `active` | boolean | `true` | Must be true for access |
| `email` | string | `[email from Step 1]` | Must match Authentication email |
| `displayName` | string | `Administrator Name` | Display name in dashboard |
| `createdAt` | timestamp | [current time] | Creation timestamp |
| `createdBy` | string | `manual-setup` | Who created this admin |

**Example Document:**
```javascript
{
  role: "admin",
  active: true,
  email: "admin@example.com",  // Replace with actual email
  displayName: "Site Administrator",
  createdAt: Timestamp,
  createdBy: "manual-setup"
}
```

6. Click "Save"

### Verify Document Structure

After saving, verify the document looks like this:

```
Collection: admins
Document ID: 8ALeLYl29me8iozWeTVFoe0FIJ63
Fields:
  - role: "admin"
  - active: true
  - email: "admin@example.com"
  - displayName: "Administrator Name"
  - createdAt: [timestamp]
  - createdBy: "manual-setup"
```

---

## Step 3: Verify Firestore Security Rules

### Check Rules Are Deployed

1. Go to Firebase Console → **Firestore Database** → **Rules**
2. Verify the rules include this function:

```javascript
function isAdmin() {
  return request.auth != null &&
    exists(/databases/$(database)/documents/admins/$(request.auth.uid)) &&
    get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.active == true;
}
```

3. Verify the admins collection has this rule:

```javascript
match /admins/{adminId} {
  allow read: if isAdmin();
  allow create, update, delete: if false;
}
```

**If rules are not deployed:**

```bash
# Deploy Firestore rules
firebase deploy --only firestore:rules
```

---

## Step 4: Test the Login

### Test Login Flow

1. Open your website: `http://localhost:5173` (or your deployed URL)
2. Navigate to: `/admin/login`
3. Enter the **email address** from Step 1
4. Enter the **password** for that account
5. Click "লগইন করুন" (Login)

**Expected Results:**

✅ **Success:**
- Loading spinner appears
- Redirects to `/admin` dashboard
- Admin name and email displayed in top-right
- Can access all admin pages

❌ **Failure - Invalid Credentials:**
- Error message: "Invalid credentials" or similar
- Stays on login page
- Check email and password are correct

❌ **Failure - Access Denied:**
- Login succeeds but shows "Access Denied" page
- Message: "এই অ্যাকাউন্টটি অ্যাডমিনিস্ট্রেটর হিসেবে নিবন্ধিত নয়"
- Check Step 2 - admin document may be missing or inactive

❌ **Failure - Permission Denied:**
- Console shows "Missing or insufficient permissions"
- Firestore rules may not be deployed
- Check Step 3

---

## Step 5: Test Admin Functions

### Verify Admin Access

After successful login, test these operations:

1. **View Dashboard**
   - Navigate to `/admin`
   - Should see overview with statistics

2. **Create a Notice**
   - Go to `/admin/notices`
   - Click "Add Notice"
   - Fill in details
   - Click "Add Notice"
   - Should succeed without permission errors

3. **Create a Teacher**
   - Go to `/admin/teachers`
   - Click "Add Teacher"
   - Fill in details
   - Should succeed

4. **Upload Gallery Image**
   - Go to `/admin/gallery`
   - Upload an image
   - Should upload to Cloudinary and save to Firestore

5. **Sign Out**
   - Click "Sign Out" button
   - Should redirect to login page
   - Try accessing `/admin` directly
   - Should redirect to login

---

## 🔍 Troubleshooting

### Issue: "Invalid credentials"

**Cause:** Wrong email or password

**Solution:**
1. Verify email matches the one in Firebase Authentication
2. Try password reset:
   - Click "পাসওয়ার্ড ভুলে গেছেন?" (Forgot password?)
   - Enter email
   - Check email for reset link
   - Set new password
   - Try login again

### Issue: "Access Denied" after login

**Cause:** Admin document missing or inactive

**Solution:**
1. Check Firestore → admins collection
2. Verify document ID is exactly: `8ALeLYl29me8iozWeTVFoe0FIJ63`
3. Verify `active` field is `true` (boolean, not string)
4. Verify `role` field exists

### Issue: "Missing or insufficient permissions"

**Cause:** Firestore security rules not deployed

**Solution:**
```bash
firebase deploy --only firestore:rules
```

Or manually deploy via Firebase Console:
1. Firestore → Rules
2. Copy rules from `firestore.rules` file
3. Paste and publish

### Issue: Login page shows loading forever

**Cause:** Firebase not initialized or network error

**Solution:**
1. Check browser console for errors
2. Verify Firebase configuration in `src/lib/firebase.ts`
3. Check internet connection
4. Verify Firebase project is active

### Issue: Can login but can't perform admin actions

**Cause:** Firestore rules blocking writes

**Solution:**
1. Verify admin document has `active: true`
2. Check Firestore rules allow admin writes
3. Verify the `isAdmin()` function in rules

---

## 🛡️ Security Best Practices

### ✅ DO:

- Use strong passwords (12+ characters, mixed case, numbers, symbols)
- Enable 2FA on the admin email account
- Regularly review admin access in Firebase Console
- Keep admin email verified
- Monitor Firebase Authentication logs
- Use different passwords for different services

### ❌ DON'T:

- Share admin credentials
- Store passwords in code or localStorage
- Create admin accounts through the application
- Disable security rules for testing in production
- Use the same password as other services
- Leave admin accounts inactive

---

## 📊 Administrator Role Hierarchy

The system supports three admin roles:

| Role | Level | Permissions |
|------|-------|-------------|
| **super-admin** | 3 | Full access, can manage other admins (future) |
| **admin** | 2 | Full content management, form submissions |
| **editor** | 1 | Create/edit content, no delete/settings |

**Current Setup:** The administrator has `role: "admin"` (Level 2)

---

## 🔄 Password Reset Flow

### For Administrator

1. Go to `/admin/login`
2. Click "পাসওয়ার্ড ভুলে গেছেন?" (Forgot password?)
3. Enter admin email address
4. Click "রিসেট লিঙ্ক পাঠান" (Send reset link)
5. Check email for reset link
6. Click link and set new password
7. Login with new password

### Technical Details

- Uses Firebase `sendPasswordResetEmail()`
- Email sent from Firebase (customizable in Console)
- Reset link expires after 1 hour
- One-time use token

---

## 📝 Administrator Document Schema

### Required Fields

```typescript
interface AdminDocument {
  role: 'admin' | 'super-admin' | 'editor';
  active: boolean;
  email: string;
  displayName?: string;
  createdAt: Timestamp;
  createdBy: string;
  lastLoginAt?: Timestamp;
}
```

### Example Document

```javascript
// Collection: admins
// Document ID: 8ALeLYl29me8iozWeTVFoe0FIJ63

{
  role: "admin",
  active: true,
  email: "admin@example.com",
  displayName: "Site Administrator",
  createdAt: Timestamp(2026-03-07T10:00:00Z),
  createdBy: "manual-setup",
  lastLoginAt: Timestamp(2026-03-07T14:30:00Z)
}
```

---

## 🧪 Testing Checklist

### Authentication Tests

- [ ] Can login with correct credentials
- [ ] Cannot login with wrong password
- [ ] Cannot login with wrong email
- [ ] Password reset email sends successfully
- [ ] Password reset link works
- [ ] Can sign out successfully
- [ ] Auth state persists after page refresh
- [ ] Auth state clears after sign out

### Authorization Tests

- [ ] Admin can access `/admin`
- [ ] Admin can access all admin pages
- [ ] Admin can create content
- [ ] Admin can edit content
- [ ] Admin can delete content
- [ ] Admin can publish/unpublish content
- [ ] Non-admin user sees "Access Denied"
- [ ] Unauthenticated user redirected to login
- [ ] Inactive admin sees "Access Denied"

### Security Tests

- [ ] Cannot access admin pages without login
- [ ] Cannot create admin document via client
- [ ] Cannot modify admin document via client
- [ ] Cannot delete admin document via client
- [ ] Firestore rules block unauthorized access
- [ ] No passwords in browser localStorage
- [ ] No passwords in browser sessionStorage
- [ ] No passwords in frontend code

---

## 📚 Related Documentation

- **Authentication Implementation:** `src/contexts/AuthContext.tsx`
- **Login Page:** `src/pages/AdminLogin.tsx`
- **Route Protection:** `src/components/ProtectedRoute.tsx`
- **Firestore Rules:** `firestore.rules`
- **Firebase Config:** `src/lib/firebase.ts`
- **Error Handling:** `src/lib/firebase-errors.ts`

---

## 🎯 Quick Reference

### Administrator Credentials

- **UID:** `8ALeLYl29me8iozWeTVFoe0FIJ63`
- **Email:** [Check Firebase Console → Authentication]
- **Password:** [Known only to administrator]
- **Admin Document:** `admins/8ALeLYl29me8iozWeTVFoe0FIJ63`

### Important URLs

- **Login Page:** `/admin/login`
- **Admin Dashboard:** `/admin`
- **Firebase Console:** https://console.firebase.google.com/project/kbsjafm
- **Authentication:** Firebase Console → Authentication
- **Firestore:** Firebase Console → Firestore Database

### Common Commands

```bash
# Deploy Firestore rules
firebase deploy --only firestore:rules

# Deploy Storage rules
firebase deploy --only storage:rules

# Local development
npm run dev

# Production build
npm run build
```

---

## ✅ Success Criteria

The administrator account is properly configured when:

1. ✅ User can login at `/admin/login` with email/password
2. ✅ User is redirected to `/admin` after login
3. ✅ User can access all admin pages
4. ✅ User can create, edit, delete content
5. ✅ User can sign out successfully
6. ✅ Auth state persists after page refresh
7. ✅ Non-admin users cannot access admin pages
8. ✅ Firestore rules enforce access control

---

## 🆘 Support

If you encounter issues:

1. **Check Firebase Console** for authentication and Firestore status
2. **Review browser console** for JavaScript errors
3. **Verify Firestore rules** are deployed
4. **Check admin document** exists with correct structure
5. **Review this guide** for troubleshooting steps

---

**Document Version:** 1.0  
**Last Updated:** 2026-03-07  
**Administrator UID:** 8ALeLYl29me8iozWeTVFoe0FIJ63  
**Status:** ✅ Ready for Configuration
