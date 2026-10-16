# Administrator Setup - Quick Reference

## 🔐 Administrator Account

**UID:** `8ALeLYl29me8iozWeTVFoe0FIJ63`  
**Project:** `kbsjafm`  
**Login URL:** `/admin/login`

---

## 📋 Setup Checklist

### Step 1: Verify Account (2 min)
```
Firebase Console → Authentication → Users
Find UID: 8ALeLYl29me8iozWeTVFoe0FIJ63
Note the email address
```

### Step 2: Create Admin Document (5 min)
```
Firebase Console → Firestore → admins collection
Add document with ID: 8ALeLYl29me8iozWeTVFoe0FIJ63

Fields:
  role: "admin" (string)
  active: true (boolean)
  email: "[email from Step 1]" (string)
  displayName: "Administrator" (string)
  createdAt: [timestamp]
  createdBy: "manual-setup" (string)
```

### Step 3: Deploy Rules (1 min)
```bash
firebase deploy --only firestore:rules
```

### Step 4: Test Login (2 min)
```
1. Go to /admin/login
2. Enter email from Step 1
3. Enter password
4. Click login
5. Should redirect to /admin
```

---

## 🎯 Expected Results

### ✅ Success
- Login redirects to `/admin`
- Dashboard loads
- Admin name/email displayed
- Can create/edit/delete content

### ❌ Common Issues

| Issue | Solution |
|-------|----------|
| "Invalid credentials" | Check email/password |
| "Access Denied" | Check admin document exists & active=true |
| "Permission denied" | Deploy Firestore rules |
| Loading forever | Check Firebase config |

---

## 📄 Admin Document Template

```javascript
// Collection: admins
// Document ID: 8ALeLYl29me8iozWeTVFoe0FIJ63

{
  role: "admin",
  active: true,
  email: "admin@example.com",
  displayName: "Site Administrator",
  createdAt: Timestamp,
  createdBy: "manual-setup"
}
```

---

## 🔗 Quick Links

- **Login:** `/admin/login`
- **Dashboard:** `/admin`
- **Firebase Console:** https://console.firebase.google.com/project/kbsjafm
- **Auth Users:** Firebase Console → Authentication → Users
- **Firestore:** Firebase Console → Firestore Database

---

## 🆘 Troubleshooting

**Can't login?**
- Verify email matches Firebase Auth
- Try password reset
- Check account is enabled

**Access denied after login?**
- Check admin document exists
- Verify `active: true`
- Verify document ID matches UID

**Permission errors?**
- Deploy Firestore rules
- Check admin document structure

---

## 📚 Full Documentation

- `ADMIN_SETUP_GUIDE.md` - Complete setup guide
- `AUTHENTICATION_CONNECTION_SUMMARY.md` - Implementation details
- `firestore.rules` - Security rules

---

**Status:** ✅ Ready for Configuration  
**Time Required:** 10-15 minutes
