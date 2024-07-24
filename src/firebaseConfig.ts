import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyARyXV_fsfxbZnUDI_hlV37qzUK-5Wtj0c",
  authDomain: "link-app-71ef9.firebaseapp.com",
  projectId: "link-app-71ef9",
  storageBucket: "link-app-71ef9.appspot.com",
  messagingSenderId: "4036439186",
  appId: "1:4036439186:web:ceff63a4d8765e02a04a4b"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { auth, db, storage };