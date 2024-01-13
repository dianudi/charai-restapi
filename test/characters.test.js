import supertest from "supertest";

const app = "http://localhost:3000";

let token = "";
beforeAll(async () => {
  const res = await supertest(app).post("/api/auth").accept("application/json").send({ password: "password" });
  token = res.body.access_token;
  return;
});

describe("Add new AI Character", () => {
  test("should success create new ai character", async () => {
    const res = await supertest(app)
      .post("/api/characters")
      .accept("application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "testing", short_description: "testing", description: "testing", char_id: "123abcd", gender: "male" });
    expect(res.status).toBe(201);
  });
  test("should return error when validation failed add data", async () => {
    const res = await supertest(app)
      .post("/api/applications")
      .accept("application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "", short_description: "", description: "", char_id: "", gender: "" });

    expect(res.status).toBe(422);
  });
});

describe("Get all AI Characters", () => {
  test("should has many new consume application data", async () => {
    const res = await supertest(app).get("/api/characters").accept("application/json").set("Authorization", `Bearer ${token}`);
    expect(res.ok).toBe(true);
  });
});

describe("Update some AI Character", () => {
  test("should success update data", async () => {
    const res = await supertest(app).get("/api/characters").accept("application/json").set("Authorization", `Bearer ${token}`);
    const [data] = res.body.data.filter((i) => i.name == "testing");
    const res2 = await supertest(app)
      .patch(`/api/characters/${data.id}`)
      .accept("application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "testing", short_description: "testing updated", description: "updated testing", char_id: "123abcd", gender: "female" });
    expect(res2.ok).toBe(true);
  });
  test("should return error when validation failed update data", async () => {
    const res = await supertest(app).get("/api/characters").accept("application/json").set("Authorization", `Bearer ${token}`);
    const [data] = res.body.data.filter((i) => i.name == "testing");
    const res2 = await supertest(app)
      .patch(`/api/characters/${data.id}`)
      .accept("application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "", short_description: "", description: "", char_id: "", gender: "" });
    expect(res2.statusCode).toBe(422);
  });
  test("should return error not found update data", async () => {
    const res = await supertest(app)
      .patch(`/api/characters/foobar`)
      .accept("application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "testing", short_description: "testing update", description: "update testing", char_id: "123123", gender: "female" });
    expect(res.statusCode).toBe(404);
  });
});

describe("Get some applications data", () => {
  test("should return some application data", async () => {
    const res = await supertest(app).get("/api/characters").accept("application/json").set("Authorization", `Bearer ${token}`);
    const [data] = res.body.data.filter((i) => i.name == "testing");
    const res2 = await supertest(app).get(`/api/characters/${data.id}`).accept("application/json").set("Authorization", `Bearer ${token}`);
    expect(res2.ok).toBe(true);
  });
  test("should return error not found get data", async () => {
    const res = await supertest(app).get(`/api/characters/foobar`).accept("application/json").set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(404);
  });
});

describe("Delete some application data", () => {
  test("should success delete some application data", async () => {
    const res = await supertest(app).get("/api/characters").accept("application/json").set("Authorization", `Bearer ${token}`);
    const [data] = res.body.data.filter((i) => i.name == "testing");
    const res2 = await supertest(app).delete(`/api/characters/${data.id}`).accept("application/json").set("Authorization", `Bearer ${token}`);
    expect(res2.ok).toBe(true);
  });
  test("should return error not found delete data", async () => {
    const res = await supertest(app).delete(`/api/characters/foobar`).accept("application/json").set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(404);
  });
});
