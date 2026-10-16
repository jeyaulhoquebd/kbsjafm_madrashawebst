# Firebase Authentication - Quick Reference

## 🚀 Quick Start

### 1. Deploy Security Rules
```bash
firebase deploy --only firestore:rules
firebase deploy --only storage:rules
```

### 2. Enable Authentication
Firebase Console → Authentication → Sign-in method → Enable Email/Password

### 3. Create First Admin
```bash
# Step 1: Create user in Authentication
Firebase Console → Authentication → Users → Add user
Email: admin@yourdomain.com
Password: [strong password]
Copy: User UID

# Step 2: Create admin document in Firestore
Firebase Console → Firestore → admins collection → Add document
Document ID: [paste User UID]
Fields:
  - role: "admin" (string)
  - active: true (boolean)
  - email: "admin@yourdomain.com" (string)
  - displayName: "Administrator" (string)
  - createdAt: [timestamp]
  - createdBy: "manual-setup" (string)
```

### 4. Test Login
Go to: `https://yourdomain.com/admin/login`
Login with admin credentials

---

## 🔐 Security Model

### Public Access
- ✅ Read published content
- ❌ Read drafts
- ❌ Write anything
- ❌ Read admin records

### Admin Access
- ✅ Full CRUD on content
- ✅ Manage form submissions
- ✅ Read admin records
- ❌ Create/delete admin records

### No Access
- ❌ Unauthenticated writes
- ❌ Non-admin authenticated users
- ❌ Privilege escalation

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `src/contexts/AuthContext.tsx` | Auth state management |
| `src/pages/AdminLogin.tsx` | Login page |
| `src/components/ProtectedRoute.tsx` | Route protection |
| `firestore.rules` | Firestore security |
| `storage.rules` | Storage security |
| `FIREBASE_AUTH_SETUP.md` | Full setup guide |

---

## 🧪 Quick Tests

```javascript
// Test 1: Public can read published
const q = query(collection(db, 'notices'), where('status', '==', 'published'));
await getDocs(q); // ✅ Should work

// Test 2: Public cannot read drafts
const q = query(collection(db, 'notices'), where('status', '==', 'draft'));
await getDocs(q); // ❌ Should fail

// Test 3: Unauthenticated cannot write
await addDoc(collection(db, 'notices'), { title: 'Test' }); // ❌ Should fail

// Test 4: Admin can write (after login)
await addDoc(collection(db, 'notices'), { title: 'Test' }); // ✅ Should work
```

---

## ⚠️ Common Issues

| Issue | Solution |
|-------|----------|
| "Missing permissions" | Check rules deployed + admin role |
| "Access Denied" on login | Verify admin document in Firestore |
| Cannot deploy rules | Run `firebase login` first |
| Form submission fails | Check field validation rules |

---

## 📊 Admin Document Schema

```javascript
// Collection: admins
// Document ID: Firebase Auth UID

{
  role: "admin",              // Required
  active: true,               // Required - must be true
  email: "admin@example.com", // Required
  displayName: "Admin Name",  // Required
  createdAt: Timestamp,       // Required
  createdBy: "manual-setup"   // Required
}
```

---

## 🔗 Quick Links

- **Login Page:** `/admin/login`
- **Admin Dashboard:** `/admin`
- **Firebase Console:** https://console.firebase.google.com/project/kbsjafm
- **Full Guide:** `FIREBASE_AUTH_SETUP.md`
- **Implementation Details:** `AUTHENTICATION_IMPLEMENTATION_SUMMARY.md`

---

## ✅ Deployment Checklist

- [ ] Deploy Firestore rules
- [ ] Deploy Storage rules
- [ ] Enable Email/Password auth
- [ ] Create admin user in Authentication
- [ ] Create admin document in Firestore
- [ ] Test login
- [ ] Test admin operations
- [ ] Test public access
- [ ] Verify security rules

---

**Status:** ✅ Ready for Deployment  
**Last Updated:** 2026-03-07
