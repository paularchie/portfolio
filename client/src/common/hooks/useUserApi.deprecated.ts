// import React from "react";
// import { useClient } from "./useGraphQlClient";
// import queries from "../../graphql/Query";
// // import mutations from "../graphql/mutations/index";

// const {
//   getUserQuery,
//   checkIfValueExistsQuery,
//   logoutQuery,
//   loginQuery,
//   userQuery
// } = queries;
// // const { createUserMutation } = mutations;

// const useUserApi = () => {
//   const client = useClient();

//   // const createAccount = async (formData) => {
//   //   const res = await client.request(createUserMutation, formData);
//   //   return res.createUser;
//   // };

//   const getCurrentUser = async () => {
//     const res = await client.request(getUserQuery);
//     return res.getUser;
//   };

//   const getUsers = async () => {
//     const res = await client.request(userQuery);
//     return res.users;
//   };

//   const checkIfValueExists = async (field: string, value: string) => {
//     const res = await client.request(checkIfValueExistsQuery, { field, value });
//     return res.checkIfValueExists;
//   };

//   const login = async (formData) => {
//     const res = await client.request(loginQuery, formData);
//     return res.login;
//   };

//   const logout = () => client.request(logoutQuery);

//   return {
//     // createAccount,
//     getCurrentUser,
//     getUsers,
//     checkIfValueExists,
//     login,
//     logout
//   };
// };

// export default useUserApi;
