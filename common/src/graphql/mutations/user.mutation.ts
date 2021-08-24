import { USER_FIELDS } from "../../constants";

export const signUpMutation = `
    mutation($data: UserSignUpInput!) { 
        signUp (data: $data) { 
            ... on User {
                  ${USER_FIELDS}
                }
            ...on ValidationErrorResponse {
                  errors {
                      message
                      field
                  }   
            }
        } 
    }
`;

export const deleteUserMutation = `
  mutation deleteUser($data: UserDeleteInput!) {
    deleteUser(data: $data) {
      ${USER_FIELDS}
    }
}`