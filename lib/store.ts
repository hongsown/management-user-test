// store.ts
import { User, users } from '@/constants/data';
import create from 'zustand';

interface UserStore {
  users: User[];
  selectedUser: User | null;
  action: 'edit' | 'delete' | null;
  setAction: (action: 'edit' | 'delete' | null) => void;
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  deleteUser: (userId: number) => void;
  setSelectedUser: (user: User | null) => void;
  getSelectedUser: () => User | null;
}

export const useUserStore = create<UserStore>((set, get) => ({
  users: users,
  selectedUser: null,
  action: null,
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  updateUser: (user) =>
    set((state) => ({
      users: state.users.map((u) => (u.id === user.id ? user : u))
    })),
  deleteUser: (userId) =>
    set((state) => ({
      users: state.users.filter((u) => u.id !== userId)
    })),
  setSelectedUser: (user) => set(() => ({ selectedUser: user })),
  getSelectedUser: () => get().selectedUser,
  setAction: (action) => set(() => ({ action }))
}));
