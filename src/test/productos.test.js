import supertest from 'supertest'
import { expect } from "chai";
import { app } from "../server.js";

const request = supertest(app);

describe("api productos test", () => {

    it("get productos", async () => {
        const response = await request.get("/productos");
        expect(response.status).equal(200);
        expect(response.body).to.have.length.above(0);
    });

    it("post productos", async () => {
        const response = await request.post("/productos").send(
            {
                nombre: "Escuadra",
                precio: 251291.32,
                timestamp: Date.now,
                descripcion: "elemento de officina",
                codigo: "5666565",
                stock: true,
                foto: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Squadra_45.jpg"
            })

        expect(response.status).equal(200);
        expect(response.body).to.have.length.above(0);
    });


    it("put productos", async () => {
        const data = await request.get("/productos");
        let actualizar = {
            id: data.body[0].id,
            title: "testUPD",
            price: 56465,
            thumbnail: "urlTest"
        }
        const response = await request.put("/productos").send(actualizar);
        expect(response.status).equal(200);
    });


    it("get id productos", async () => {
        const data = await request.get("/productos");
        console.log(JSON.stringify(data.body[0]))
        const response = await request.get(`/productos?id=${data.body[0].id}`);
        expect(response.status).equal(200);
    });

    it("delete productos", async () => {
        const data = await request.get("/productos");
        const response = await request.delete(`/productos?id=${data.body[0].id}`);
        expect(response.status).equal(200);
    });
});