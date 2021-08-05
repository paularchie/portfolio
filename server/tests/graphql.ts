import { USER_FIELDS } from "../src/utils/constants";

export const createUserMutation = `
  mutation createUser($data: UserCreateInput!) {
    createUser(data: $data) {
      ${USER_FIELDS}
    }
}`;

export const deleteUserMutation = `
  mutation deleteUser($data: UserDeleteInput!) {
    deleteUser(data: $data) {
      ${USER_FIELDS}
    }
}`

export const loginQuery = `
  query login($data: UserLoginInput!) {
    login(data: $data) {
      ${USER_FIELDS}
    }
}`

export const logoutQuery = `
  query {
    logout
  }`

export const getUserQuery = `
  query {
    getUser {
      ${USER_FIELDS}
    }
  }`

export const usersQuery = `
  query {
    users {
      ${USER_FIELDS}
    }
  }`