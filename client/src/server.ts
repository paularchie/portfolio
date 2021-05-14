import { createServer } from "miragejs";

const Server = (): void => {
  createServer({
    routes() {
      this.get("/api/submit", () => ({
        status: 'ok'
      }));
    }
  });
};

export default Server;
