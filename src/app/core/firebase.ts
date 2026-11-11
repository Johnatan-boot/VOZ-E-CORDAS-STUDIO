import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "geometric-deck-n9brs",
  appId: "1:27886120219:web:58ea5448f6d563aa5b77be",
  apiKey: "AIzaSyC8qzjCXzbPudxWZe4yf8lEPYis_fPIego",
  authDomain: "geometric-deck-n9brs.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-vozcordasstudio-7f8003e2-7209-41bc-b12b-03d0134ce0b0",
  storageBucket: "geometric-deck-n9brs.firebasestorage.app",
  messagingSenderId: "27886120219",
  measurementId: "",
  oAuthClientId: "27886120219-9fvgpqt4qcb820b1ud3ic3jm684gfih6.apps.googleusercontent.com",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);
