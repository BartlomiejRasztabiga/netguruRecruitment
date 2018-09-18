import request, { done } from "supertest"
import app from "../src/app.js"

describe("POST /movies", () => {
  it("should create new movie and return it in response", async () => {
    await request(app)
      .post("/movies")
      .send({ title: "Lord of the Rings" })
      .set("Accept", "application/json")
      .expect(201)
      .then(response => {
        console.log(response.body)
        // assert(response.body.email, 'foo@bar.com')
      })
  })
})

// describe("GET /list", () => {
//   it("should render properly with valid parameters", async () => {
//     await request(app)
//       .get("/list")
//       .query({ title: "List title" })
//       .expect(200)
//   })

//   it("should error without a valid parameter", async () => {
//     await request(app)
//       .get("/list")
//       .expect(500)
//   })
// })

// describe("GET /404", () => {
//   it("should return 404 for non-existent URLs", async () => {
//     await request(app)
//       .get("/404")
//       .expect(404)
//     await request(app)
//       .get("/notfound")
//       .expect(404)
//   })
// })
