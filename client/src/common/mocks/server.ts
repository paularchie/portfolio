import { Response, createServer } from "miragejs";

const mockServer = (): void => {
  createServer({
    routes() {
      this.post("/api/signin", (schema, { requestBody }) => {
        const { email, password } = JSON.parse(requestBody);

        if (email === "admin@test.com" && password === "admin") {
          return {
            id: "user-id",
            username: "mock-user"
          };
        } else {
          return new Response(
            401,
            {},
            {
              errors: [
                {
                  message: "Incorrect credentials"
                }
              ]
            }
          );
        }
      });
    }
  });
};

export default mockServer;
