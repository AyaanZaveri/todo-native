import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCiA6R-3xO9jotZyS6Af8PaejrpQ7yv160",
  authDomain: "todo-4c7c9.firebaseapp.com",
  projectId: "todo-4c7c9",
  storageBucket: "todo-4c7c9.appspot.com",
  messagingSenderId: "54364548096",
  appId: "1:54364548096:web:e5a4b302f0dbfd1b96fce5",
};

const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApps()[0];
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const db = getFirestore(firebaseApp);

export { auth, provider, db };
