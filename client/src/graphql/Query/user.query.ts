const loginQuery = `
    query($data: UserLoginInput!) { 
        login (data: $data) { 
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

const currentUser = `
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

export default {
  loginQuery,
  userQuery,
  getUserQuery: currentUser,
  logoutQuery
};
