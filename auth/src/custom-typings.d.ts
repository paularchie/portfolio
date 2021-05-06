declare namespace Express {
  interface Request {
    session: { jwt: string };
  }
}
