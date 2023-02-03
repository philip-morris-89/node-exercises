import supertest from "supertest";

import app from "./app";

const request = supertest(app);

test("GET /planets", async () => {
  const response = await request
    .get("/planets")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(response.body).toEqual([{ name: "Jupiter" }, { name: "Mars" }]);
});

describe("POST /planets/:id/photo", () => {
  test("Valid request with PNG file upload", async () => {
    await request
      .post("/planets/23/photo")
      .attach("photo", "test-fixtures/photos/file.png")
      .expect(201)
      .expect("Access-Control-Allow-Origin", "http://localhost:8080");
  });

  test("Invalid planet ID", async () => {
    const response = await request
      .post("/planets/asdf/photo")
      .expect(404)
      .expect("Content-Type", /text\/html/);

    expect(response.text).toContain("Cannot POST /planets/asdf/photo");
  });

  test("Invalid request with no file upload", async () => {
    const response = await request
      .post("/planets/23/photo")
      .expect(400)
      .expect("Content-Type", /text\/html/);

    expect(response.text).toContain("No photo file uploaded.");
  });
});
