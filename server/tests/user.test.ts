
import { createTestContext } from "./__helpers";

const ctx = createTestContext();



const usersQuery = `
  query {
    users {
      id
      email
      username
      role
    }
  }
`
const createUserMutation = `
  mutation {
    createUser(username:"admin", email:"admin@test.com", password:"admin") {
      id
    }
  }
`




// const client = ctx.client
it.only('ensures that a draft can be created and published', async () => {
  await ctx.loginAsAdmin();
  const newUser = await ctx.client.request(`
  mutation {
    createUser(
      username:"admin", 
      email:"admin@test.com",
      password:"admin"
      role: "ADMIN"
    ) {
      id
      username
      email
      role
    }
  }
  `)
  console.dir(newUser, { depth: null })

  // const users = await client.request(usersQuery)
  // console.dir(users, { depth: null })
  // const users = await client.user.findMany();


  //   expect(newUser).toMatchInlineSnapshot(`
  //     Object {
  //       "createUser": Object {
  //         "email": "admin@test.com",
  //         "id": 1,
  //         "username": "admi",
  //       },
  //     }
  // `)

  const loginQuery = `
  query {
    login(email: "admin@test.com", password: "admin") {
      username
    }
  }
`

  const getUserQuery = `
  query {
    getUser {
      id
      email
      username
    }
  }
`

  // const login = await ctx.client.request(loginQuery);
  // // console.log('!!!!', login.response)
  // // const user = await ctx.client.request(getUserQuery);
  // try {
  //   const users = await ctx.client.request(usersQuery);
  //   console.log(users)
  // } catch(e) {
  //   console.log(e.response)
  // }
  // Create a new draft
  // const draftResult = await ctx.client.request(`            # 1
  //   mutation {
  //     createDraft(title: "Nexus", body: "...") {            # 2
  //       id
  //       title
  //       body
  //       published
  //     }
  //   }
  // `)

  /*
  // Snapshot that draft and expect `published` to be false
  expect(draftResult).toMatchInlineSnapshot()              // 3
  // Publish the previously created draft
  const publishResult = await ctx.client.request(`
    mutation publishDraft($draftId: Int!) {
      publish(draftId: $draftId) {
        id
        title
        body
        published
      }
    }
  `,
    { draftId: draftResult.createDraft.id }
  )
  // Snapshot the published draft and expect `published` to be true
  expect(publishResult).toMatchInlineSnapshot()
  */
})


