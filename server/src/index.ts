import { server, app } from "./app";

// app.listen({ port: 4000 }, () => {
//   console.log(`\
//   🚀 Server ready at port 4000
//     `);p
// });

const PORT = process.env.PORT || 4000

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
)