import { create } from "zustand";
import { auth, db } from "@/lib/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { addDoc, collection, query, where, onSnapshot } from "firebase/firestore";

interface UserData {
  uid: string;
  name: string;
  email: string;
  image?: string;
  bio?: string;
  backgroundImage?: string;
  authProvider?: string;
}

interface AuthStore {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  registerUser: (name: string, email: string, password: string) => Promise<void>;
  loginUser: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchUserData: () => void;
  setLoading:(bool:boolean) => void;
}



export const useAuthStore = create<AuthStore>((set) => {
  const usersCollection = collection(db, "users");

  const fetchUserData = async () => {
    set({ loading: true });

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(usersCollection, where("uid", "==", user.uid));
        onSnapshot(q, (doc) => {
          const docData = doc.docs[0]?.data();
          if (docData) {
            const userData: UserData = {
              uid: docData.uid,
              name: docData.name,
              email: docData.email,
              image: docData.image || "",
              bio: docData.bio || "",
              backgroundImage: docData.backgroundImage || "",
              authProvider: docData.authProvider,
            };
            set({ userData, user, loading: false });
          }
        });

      } else {
        set({ user: null, userData: null, loading: false });
      }
    });
    set({ loading: false });
  };


  return {
    user: null,
    userData: null,
    loading: true,
    registerUser: async (name, email, password) => {
      set({ loading: true });
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await addDoc(usersCollection, {
          uid: res.user.uid,
          name,
          providerId: "email/password",
          email: res.user.email,
          backgroundImage: "",
          bio: "",
        });
        set({ user: res.user });
      } catch (error) {
        console.error("Signup error:", error);
      } finally {
        set({ loading: false });
      }
    },
    loginUser: async (email, password) => {
      set({ loading: true });
      try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        set({ user: res.user });
      } catch (error) {
        console.error("Login error:", error);
      } finally {
        set({ loading: false });
      }
    },
    logout: async () => {
      try {
        await signOut(auth);
        set({ user: null, userData: null });
      } catch (error) {
        console.error("Logout error:", error);
      }
    },
    fetchUserData,
    setLoading:(bool: boolean) => {
      set({ loading: bool });
    }
  };
});

useAuthStore.getState().fetchUserData();