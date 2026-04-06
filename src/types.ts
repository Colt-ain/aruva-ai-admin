export type View = 
  | 'dashboard' 
  | 'users' 
  | 'registrations' 
  | 'roles' 
  | 'details' 
  | 'apikeys' 
  | 'email' 
  | 'departments' 
  | 'groups' 
  | 'courses' 
  | 'syllabus' 
  | 'syllabus-detail'
  | 'library' 
  | 'assignments'
  | 'login'
  | 'signup';

export interface User {
  id: string;
  name: string;
  email: string;
  roles: string;
  departments: string;
  status: 'ACTIVE' | 'INACTIVE';
  avatar?: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  head: string;
  members: number;
  status: 'Active' | 'Inactive';
}

export interface Group {
  id: string;
  name: string;
  department: string;
  description: string;
  members: number;
  type: 'STUDENT' | 'MIXED';
  status: 'Active' | 'Inactive';
}

export interface Course {
  id: string;
  name: string;
  department: string;
  groups: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  users: number;
  color: string;
}

export interface APIKey {
  id: string;
  name: string;
  prefix: string;
  created: string;
  expires: string;
  lastUsed: string;
  permissions: string[];
}
