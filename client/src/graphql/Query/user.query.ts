const loginQuery = `
    query($email: String!, $password: String!) { 
        login (
            email: $email, 
            password: $password 
        ) { 
            id
            username
            email
        } 
    }
`;

const userQuery = `
    query { 
        users {
            id
            firstName
            lastName
            username
            email
            roles
        }
    }
`;

const getUserQuery = `
    query { 
        getUser { 
            id
            username
            email
        } 
    }
`;

const logoutQuery = `
    query { 
        logout
    }
`;

const checkIfValueExistsQuery = `
    query($field: String!, $value: String!) {
        checkIfValueExists(
                field: $field,
                value: $value
            ) 
    }
`;

export default {
  loginQuery,
  userQuery,
  getUserQuery,
  logoutQuery,
  checkIfValueExistsQuery
};
