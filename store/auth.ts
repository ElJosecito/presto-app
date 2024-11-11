import { create } from "zustand";

//async function to get the token from the local storage
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuthStore = create(
    (set) => ({
        token: null,
        user: {},
        isAuth: false,
        setToken: async (token: string) => {
            set({ token, isAuth: true });
            await AsyncStorage.setItem('token', token);
        },
        setUser: async (user: Object) => {
            set({ user });
            await AsyncStorage.setItem('user', JSON.stringify(user));
        },
        logout: async () => {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('user');
            set({ token: null, user: null, isAuth: false });
        },
    })
);

