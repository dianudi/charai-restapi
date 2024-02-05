import supertest from "supertest";

const app = "http://localhost:3000";

let token = "";
beforeAll(async () => {
  const res = await supertest(app).post("/api/auth").accept("application/json").send({ password: "password" });
  token = res.body.access_token;
  return;
});

describe("Test to update session token", () => {
  test("should return success", async () => {
    const res = await supertest(app)
      .patch("/api/credential")
      .accept("application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({ session_token: "test" });
    expect(res.ok).toBe(true);
  });
  test("should return error when validation failed", async () => {
    const res = await supertest(app).patch("/api/credential").accept("application/json").set("Authorization", `Bearer ${token}`).send({ session_token: "" });
    expect(res.statusCode).toBe(422);
  });
});
