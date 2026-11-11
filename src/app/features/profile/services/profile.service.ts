import { Injectable, inject, signal, effect } from '@angular/core';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../core/firebase';
import { AuthService } from '../../../core/services/auth.service';
import { DEMO_PROFILE } from '../data/profile.data';
import { StudentProfile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private authService = inject(AuthService);
  
  readonly profile = signal<StudentProfile>(DEMO_PROFILE);

  constructor() {
    effect(() => {
      const user = this.authService.user();
      if (user) {
        this.loadProfile(user.uid);
      } else {
        this.profile.set(DEMO_PROFILE);
      }
    });
  }

  private async loadProfile(userId: string) {
    try {
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        const data = userSnap.data();
        this.profile.set({
          ...this.profile(),
          id: userId,
          name: data['displayName'] || data['name'] || this.profile().name,
          email: data['email'] || this.profile().email,
          avatar: data['photoURL'] || data['avatar'] || this.profile().avatar,
          joinDate: data['createdAt']?.toDate() || this.profile().joinDate,
          role: data['role'] === 'admin' ? 'Instrutor' : 'Aluno',
          city: data['city'] || this.profile().city,
          phone: data['phone'] || this.profile().phone,
          bio: data['bio'] || this.profile().bio,
          stageName: data['stageName'] || this.profile().stageName,
          musicalProfile: data['musicalProfile'] || this.profile().musicalProfile,
          preferences: data['preferences'] || this.profile().preferences,
          goals: data['goals'] || this.profile().goals,
        });
      }
    } catch (e) {
      console.error('Error loading profile', e);
    }
  }

  async saveProfile(updatedProfile: StudentProfile) {
    const user = this.authService.user();
    if (!user) return;

    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        displayName: updatedProfile.name,
        email: updatedProfile.email || null,
        avatar: updatedProfile.avatar || null,
        city: updatedProfile.city || null,
        phone: updatedProfile.phone || null,
        bio: updatedProfile.bio || null,
        stageName: updatedProfile.stageName || null,
        musicalProfile: updatedProfile.musicalProfile || null,
        preferences: updatedProfile.preferences || null,
        goals: updatedProfile.goals || null,
      }, { merge: true });
      
      this.profile.set(updatedProfile);
    } catch (e) {
      console.error('Error saving profile', e);
      throw e;
    }
  }
}
