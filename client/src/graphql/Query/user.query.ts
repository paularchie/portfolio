const loginQuery = `
    query($data: UserLoginInput!) { 
        login (data: $data) { 
            ... on User {
                id
                email
                role
              }
            ... on AuthenticationError {
                message
            }
        } 
    }
`;

const signUpMutation = `
    mutation($data: UserSignUpInput!) { 
        signUp (data: $data) { 
            ... on User {
                    id
                }
            ...on ValidationErrorsPayload {
                errors {
                    message
                    field
                }   
            }
        } 
    }
`;

const userQuery = `
    query { 
        users {
            id
            firstName
            lastName
            email
            roles
        }
    }
`;

const currentUser = `
    query { 
        getUser { 
            id
            email
        } 
    }
`;

const logoutQuery = `
    query { 
        logout
    }
`;

export default {
  loginQuery,
  signUpMutation,
  userQuery,
  getUserQuery: currentUser,
  logoutQuery
};
