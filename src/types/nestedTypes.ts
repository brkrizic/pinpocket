// types/types.ts

// User
export interface UserType {
  id: string;
  username: string;
  email: string;
}

// Task
export interface TaskType {
  id: string;
  title: string;
  description?: string | null; // nullable in GraphQL
  assignedTo?: UserType | null;
  status: string;
  priority: string;
  dueDate?: string | null;
  createdBy: UserType;
}

// Project
export interface ProjectType {
  id: string;
  name: string;
  description?: string | null;
  tasks?: TaskType[] | null;
  createdBy: UserType;
  status: 'active' | 'archived' | 'completed';
}

// Group
export interface GroupType {
  id?: string;
  name: string;
  description?: string | null;
  members?: UserType[] | null;
  projects?: ProjectType[] | null;
  createdBy: UserType;
}

// Query return types
export interface QueryMe {
  me?: UserType | null;
}

export interface QueryGroups {
  groups?: GroupType[] | null;
}

export interface QueryGroup {
  group?: GroupType | null;
}

export interface QueryProject {
  project?: ProjectType | null;
}

// Mutation return types
export interface MutationCreateTask {
  createTask?: TaskType | null;
}

export interface MutationCreateProject {
  createProject?: ProjectType | null;
}

export interface MutationCreateGroup {
  createGroup?: GroupType | null;
}
