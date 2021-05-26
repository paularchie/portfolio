import { createServer } from "miragejs";
import { login_201_res, login_401_res } from "./mockResponses";

const mockServer = (): void => {
  createServer({
    routes() {
      this.post("/api/signin", (schema, { requestBody }) => {
        const { email, password } = JSON.parse(requestBody);

        if (email === "admin@test.com" && password === "admin") {
          return login_201_res;
        }
        return login_401_res;
      });
    }
  });
};

export default mockServer;
