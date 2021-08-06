const loginQuery = `
    query($data: UserLoginInput!) { 
        login (data: $data) { 
            id
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
  userQuery,
  getUserQuery: currentUser,
  logoutQuery
};
