import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Task {
    id: ID!
    title: String!
    description: String
    assignedTo: User
    status: String!
    priority: String!
    dueDate: String
    createdBy: User!
  }

  type Project {
    id: ID!
    name: String!
    description: String
    tasks(limit: Int, skip: Int): [Task!]
    createdBy: User!
    status: String!
  }

  type Group {
    id: ID!
    name: String!
    description: String
    members: [User!]
    projects(limit: Int, skip: Int): [Project!]
    createdBy: User!
  }

  type Query {
    me: User
    groups: [Group!]
    group(id: ID!): Group
    project(id: ID!): Project
  }

  type Mutation {
    createTask(projectId: ID!, title: String!): Task
    createProject(groupId: ID!, name: String!): Project
    createGroup(name: String!): Group
  }
`;
