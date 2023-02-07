const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  it("Validar petición get que devuelva un 200 y que reciba un arreglo con al menos un objeto ", async () => {
    const resultado = await request(server).get("/cafes").send();
    expect(resultado.statusCode).toBe(200);
    expect(resultado.body.length).toBeGreaterThanOrEqual(1);
  });

  it("Validar que al intentar eliminar un cafe devuelva un 404", async () => {
    const token = "token";
    const id_cafe = 10;
    const resultado = await request(server)
      .delete(`/cafes/${id_cafe}`)
      .set("Authorization", token)
      .send();
    expect(resultado.statusCode).toBe(404);
  });
  it("Validar que al agregar un café devuelva un 201 ", async () => {
    const cafe = { id: 5, nombre: "Late" };
    const resultado = await request(server)
        .post("/cafes")
        .send(cafe);
    expect(resultado.statusCode).toBe(201)
    expect(resultado.body).toContainEqual(cafe);
});
it("Validar que al intentar actualizar un café con un id diferente devulva 400", async () => {
    const cafe = { id: 5, nombre: "Late"};
    const id_cafe = 5;
    const resultado = await request(server)
        .put(`/cafes/${id_cafe}`)
        .send(cafe);
    expect(resultado.statusCode).toBe(400);
});
});
