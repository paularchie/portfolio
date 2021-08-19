const loginQuery = `
    query($data: UserLoginInput!) { 
        login (data: $data) { 
            id
        } 
    }
`;

const signUpMutation = `
    mutation($data: UserSignUpInput!) { 
        signUp (data: $data) { 
            ...on ValidationErrors {
                errors {
                    message
                    field
                }   
            }
            ... on User {
                    id
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
