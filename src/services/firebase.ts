import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const {
  VITE_API_KEY,
  VITE_AUTH_DOMAIN,
  VITE_PROYECT_ID,
  VITE_STORAGE_BUCKET,
  VITE_SENDER,
  VITE_APP_ID,
} = import.meta.env;

const firebaseConfig = {
  apiKey: VITE_API_KEY,
  authDomain: VITE_AUTH_DOMAIN,
  projectId: VITE_PROYECT_ID,
  storageBucket: VITE_STORAGE_BUCKET,
  messagingSenderId: VITE_SENDER,
  appId: VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
