import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase, ref, set, get } from 'firebase/database';
import { auth } from './firebase';

const db = getDatabase();

const addUserToDatabase = async (user) => {
  const userRef = ref(db, `users/${user.uid}`);
  try {
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
      // New user, add to database
      const username = user.email.split('@')[0]; // Default username from email
      await set(userRef, {
        email: user.email,
        username: username,
        displayName: user.displayName || username,
        createdAt: Date.now()
      });
    }
  } catch (error) {
    console.error("Error adding user to database:", error);
    // Here you might want to implement some fallback behavior or user notification
  }
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    await addUserToDatabase(result.user);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

export const checkAuthState = (callback) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      await addUserToDatabase(user);
      callback(user);
    } else {
      callback(null);
    }
  });
};

export const updateUsername = async (userId, newUsername) => {
  const userRef = ref(db, `users/${userId}`);
  try {
    await set(userRef, { username: newUsername }, { merge: true });
  } catch (error) {
    console.error("Error updating username:", error);
    throw error;
  }
};

export const getUserData = async (userId) => {
  const userRef = ref(db, `users/${userId}`);
  try {
    const snapshot = await get(userRef);
    return snapshot.val();
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};