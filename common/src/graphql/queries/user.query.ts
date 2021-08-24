import { USER_FIELDS } from "../../constants";

export const loginQuery = `
    query($data: UserLoginInput!) { 
        login (data: $data) { 
            ... on User {
                ${USER_FIELDS}
              }
            ... on AuthenticationErrorResponse {
                errors {
                  message
                }
            }
        } 
    }
`;

export const logoutQuery = `
  query {
    logout
  }`;

export const getUserQuery = `
  query {
    getUser {
      ${USER_FIELDS}
    }
  }`;

export const usersQuery = `
  query {
    users {
      ${USER_FIELDS}
    }
  }`;
