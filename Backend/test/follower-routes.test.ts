import { describe, it } from "mocha";
import { expect } from "chai";
import app from "../src/app";
import supertest from "supertest";


describe("testing followers routes", ()=>{
    let token = null

    before(async () => {
        const response = await supertest(app.server).post("/api/login").send({ email: 'admin@gmail.com', password: 'hardpass' })
        token = response.body;
      });
});