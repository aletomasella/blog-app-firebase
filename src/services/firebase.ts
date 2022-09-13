import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBzrCpaGTDLappVaYvbN0O4jbrjlnfza0E",
  authDomain: "blog-app-at.firebaseapp.com",
  projectId: "blog-app-at",
  storageBucket: "blog-app-at.appspot.com",
  messagingSenderId: "922254448246",
  appId: "1:922254448246:web:deb36664a7c2c6ddb6b157",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
