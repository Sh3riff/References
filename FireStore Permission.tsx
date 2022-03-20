rules_version = '2';
service cloud.firestore {
match /databases/{database}/documents {
match /{document=**} {
  allow read, write: if false;
  }
 }
}


change to this


rules_version = '2';
service cloud.firestore {
match /databases/{database}/documents {
 match /{document=**} {
  allow read, write: if request.auth != null;
  }
 }
}
