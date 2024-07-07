import { Icons } from '@/components/icons';
import { NavItem, SidebarNavItem } from '@/types';

export type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
  image?: string;
};
export const roles = ['Admin', 'User', 'Editor', 'Role'];
export const rows = [5, 10, 15, 20];
export const users: User[] = [
  {
    id: 1,
    username: 'candices',
    firstName: 'Candice',
    lastName: 'Schiner',
    email: 'candice.schiner@example.com',
    phoneNumber: '123-456-7890',
    role: 'Admin'
  },
  {
    id: 2,
    username: 'johnd',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: '234-567-8901',
    role: 'User'
  },
  {
    id: 3,
    username: 'alicej',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@example.com',
    phoneNumber: '345-678-9012',
    role: 'User'
  },
  {
    id: 4,
    username: 'bobs',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@example.com',
    phoneNumber: '345-678-9012',
    role: 'User'
  },
  {
    id: 5,
    username: 'carolt',
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'bob.smith@example.com',
    phoneNumber: '456-789-0123',
    role: 'User'
  },
  {
    id: 6,
    username: 'davidb',
    firstName: 'Carol',
    lastName: 'Taylor',
    email: 'carol.taylor@example.com',
    phoneNumber: '567-890-1234',
    role: 'Editor'
  },
  {
    id: 7,
    username: 'evam',
    firstName: 'David',
    lastName: 'Brown',
    email: 'david.brown@example.com',
    phoneNumber: '678-901-2345',
    role: 'Editor'
  },
  {
    id: 8,
    username: 'frankw',
    firstName: 'Eva',
    lastName: 'Martinez',
    email: 'eva.martinez@example.com',
    phoneNumber: '789-012-3456',
    role: 'Admin'
  },
  {
    id: 9,
    username: 'gracea',
    firstName: 'Frank',
    lastName: 'Wilson',
    email: 'frank.wilson@example.com',
    phoneNumber: '890-123-4567',
    role: 'Editor'
  },
  {
    id: 10,
    username: 'henryt',
    firstName: 'Grace',
    lastName: 'Anderson',
    email: 'grace.anderson@example.com',
    phoneNumber: '901-234-5678',
    role: 'User'
  },
  {
    id: 11,
    username: 'ivyj',
    firstName: 'Henry',
    lastName: 'Thomas',
    email: 'henry.thomas@example.com',
    phoneNumber: '012-345-6789',
    role: 'User'
  },
  {
    id: 12,
    username: 'jackw',
    firstName: 'Ivy',
    lastName: 'Jackson',
    email: 'ivy.jackson@example.com',
    phoneNumber: '123-456-7890',
    role: 'Admin'
  },
  {
    id: 13,
    username: 'katew',
    firstName: 'Jack',
    lastName: 'White',
    email: 'jack.white@example.com',
    phoneNumber: '234-567-8901',
    role: 'Editor'
  }
];

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'User',
    href: '/dashboard/user',
    icon: 'user',
    label: 'user'
  },

  {
    title: 'Profile',
    href: '/dashboard/profile',
    icon: 'profile',
    label: 'profile'
  }
];
