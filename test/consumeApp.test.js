import supertest from "supertest";

const app = "http://localhost:3000";

let token = "";
beforeAll(async () => {
  const res = await supertest(app).post("/api/auth").accept("application/json").send({ password: "password" });
  token = res.body.access_token;
  return;
});

describe("Add new consume application", () => {
  test("should success create new consume application", async () => {
    const res = await supertest(app)
      .post("/api/applications")
      .accept("application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "testing", description: "testing", multiple_conversation: true });
    expect(res.status).toBe(201);
  });
  test("should return error when validation failed add data", async () => {
    const res = await supertest(app)
      .post("/api/applications")
      .accept("application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "", description: "", multiple_conversation: "foo" });
    expect(res.status).toBe(422);
  });
});

describe("Get all consume application data", () => {
  test("should has many new consume application data", async () => {
    const res = await supertest(app).get("/api/applications").accept("application/json").set("Authorization", `Bearer ${token}`);
    expect(res.ok).toBe(true);
  });
});

describe("Update some consume application data", () => {
  test("should success update data", async () => {
    const res = await supertest(app).get("/api/applications").accept("application/json").set("Authorization", `Bearer ${token}`);
    const [data] = res.body.data.filter((i) => i.name == "testing");
    const res2 = await supertest(app)
      .patch(`/api/applications/${data.id}`)
      .accept("application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "testing", description: "updated", multiple_conversation: false });
    expect(res2.ok).toBe(true);
  });
  test("should return error when validation failed update data", async () => {
    const res = await supertest(app).get("/api/applications").accept("application/json").set("Authorization", `Bearer ${token}`);
    const [data] = res.body.data.filter((i) => i.name == "testing");
    const res2 = await supertest(app)
      .patch(`/api/applications/${data.id}`)
      .accept("application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "", description: "", multiple_conversation: "bar" });
    expect(res2.statusCode).toBe(422);
  });
  test("should return error not found update data", async () => {
    const res = await supertest(app)
      .patch(`/api/applications/foobar`)
      .accept("application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "testing", description: "updated", multiple_conversation: false });
    expect(res.statusCode).toBe(404);
  });
});

describe("Get some applications data", () => {
  test("should return some application data", async () => {
    const res = await supertest(app).get("/api/applications").accept("application/json").set("Authorization", `Bearer ${token}`);
    const [data] = res.body.data.filter((i) => i.name == "testing");
    const res2 = await supertest(app).get(`/api/applications/${data.id}`).accept("application/json").set("Authorization", `Bearer ${token}`);
    expect(res2.ok).toBe(true);
  });
  test("should return error not found get data", async () => {
    const res = await supertest(app).get(`/api/applications/foobar`).accept("application/json").set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(404);
  });
});

describe("Delete some application data", () => {
  test("should success delete some application data", async () => {
    const res = await supertest(app).get("/api/applications").accept("application/json").set("Authorization", `Bearer ${token}`);
    const [data] = res.body.data.filter((i) => i.name == "testing");
    const res2 = await supertest(app).delete(`/api/applications/${data.id}`).accept("application/json").set("Authorization", `Bearer ${token}`);
    expect(res2.ok).toBe(true);
  });
  test("should return error not found delete data", async () => {
    const res = await supertest(app).delete(`/api/applications/foobar`).accept("application/json").set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(404);
  });
});
