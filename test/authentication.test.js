import supertest from "supertest";

const app = "http://localhost:3000";

describe("Authentication to get access token", () => {
  test("should return json containing access token", async () => {
    const res = await supertest(app).post("/api/auth").accept("application/json").send({ password: "password" });
    expect(res.ok).toBe(true);
    expect(Object.keys(res.body).includes("access_token")).toBe(true);
  });
  test("should return error when password wrong", async () => {
    const res = await supertest(app).post("/api/auth").accept("application/json").send({ password: "12345678" });
    expect(res.statusCode).toBe(422);
    expect(Object.keys(res.body).includes("msg")).toBe(true);
  });
});
