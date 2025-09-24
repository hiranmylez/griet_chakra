import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // ✅ Added this for Firebase Storage

const firebaseConfig = {
  apiKey: "AIzaSyBzrqBkHgC8rfgeIypJn-zg_4E5XDyadAI",
  authDomain: "niramaya-9cacb.firebaseapp.com",
  projectId: "niramaya-9cacb",
  storageBucket: "niramaya-9cacb.appspot.com", // ✅ Corrected storage bucket URL
  messagingSenderId: "588945455824",
  appId: "1:588945455824:web:8205da6a18d97110e3fcd5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // ✅ Create a storage instance

export { app, auth, RecaptchaVerifier, signInWithPhoneNumber, db, storage }; // ✅ Export storage
