import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCJO0hWlNQ-LbEN4vj53ZlS3Q9YLY1bLzw",
  authDomain: "voting-system-e7313.firebaseapp.com",
  projectId: "voting-system-e7313",
  storageBucket: "voting-system-e7313.appspot.com",
  messagingSenderId: "824054926506",
  appId: "1:824054926506:web:c976c03a129a5027c654d3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app; 