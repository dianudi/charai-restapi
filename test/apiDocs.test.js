import supertest from "supertest";

const app = "http://localhost:3000";

describe("Test to access API Docs", () => {
  test("should return redirect", async () => {
    const res = await supertest(app).get("/");
    expect(res.redirect).toBe(true);
  });
  test("should respons ok when access API docs", async () => {
    const res = await supertest(app).get("/docs/");
    expect(res.ok).toBe(true);
  });
});
