import { gql } from "@apollo/client";

export const GET_USER_GROUPS = gql`
query GetUserGroups {
  groups {
    id
    name
    description
    members {
      id
      username
      email
    }
    projects {
      id
      name
      description
      status
      createdBy {
        id
        username
        email
      }
      tasks {
        id
        title
        description
        status
        priority
        dueDate
        createdBy {
          id
          username
          email
        }
      }
    }
  }
}

`;
