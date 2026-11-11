import { Injectable, signal } from '@angular/core';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: 'student' | 'admin';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly user = signal<AppUser | null>(null);
  readonly isLoading = signal<boolean>(true);

  constructor() {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Sync user to Firestore
        const userRef = doc(db, 'users', firebaseUser.uid);
        const userSnap = await getDoc(userRef);
        
        let role: 'student' | 'admin' = 'student';
        if (userSnap.exists()) {
          role = userSnap.data()['role'] || 'student';
        } else {
          await setDoc(userRef, {
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            role: 'student',
            createdAt: new Date()
          });
        }

        this.user.set({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          role
        });
      } else {
        this.user.set(null);
      }
      this.isLoading.set(false);
    });
  }

  async loginWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }

  async logout(): Promise<void> {
    await signOut(auth);
  }
}
