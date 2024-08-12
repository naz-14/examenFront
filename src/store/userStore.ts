import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserLogin, UserLoginStore, UserStore } from "../types/User";
import { decrypt, encrypt } from "../utils/storage";

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      user: null,
      loginUser: (user: UserStore["user"]) => set({ user }),
      logoutUser: () => set({ user: null }),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => ({
        getItem: (key) => {
          const encryptedData = localStorage.getItem(key);
          if (!encryptedData) return null;
          const decryptedData = decrypt(encryptedData);
          return JSON.parse(decryptedData);
        },
        setItem: (key, value) => {
          const encryptedData = encrypt(JSON.stringify(value));
          localStorage.setItem(key, encryptedData);
        },
        removeItem: (key) => localStorage.removeItem(key),
      })),
    }
  )
);

//TODO: Extraer a un nuevo store

export const useUserData = create(
  persist<UserLoginStore>(
    (set) => ({
      userData: null,
      setUserData: (user: UserLogin) => {
        if (useUserStore.getState().user) {
          useUserStore.getState().loginUser({
            id: 1,
            email: user.email,
          });
        }
        return set({ userData: user });
      },
    }),
    {
      name: "userData",
      storage: createJSONStorage(() => ({
        getItem: (key) => {
          const encryptedData = localStorage.getItem(key);
          if (!encryptedData) return null;
          const decryptedData = decrypt(encryptedData);
          return JSON.parse(decryptedData);
        },
        setItem: (key, value) => {
          const encryptedData = encrypt(JSON.stringify(value));
          localStorage.setItem(key, encryptedData);
        },
        removeItem: (key) => localStorage.removeItem(key),
      })),
    }
  )
);
