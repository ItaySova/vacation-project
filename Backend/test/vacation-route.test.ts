import { describe, it } from "mocha";
import { expect } from "chai";
import app from "../src/app";
import supertest from "supertest";
import CredentialsModel from "../src/2-models/credentials-model";
import authService from "../src/5-services/auth-service";


describe("testing vacations routes", ()=>{
    let token = null

    before(async () => {
        const response = await supertest(app.server).post("/api/login").send({ email: 'admin@gmail.com', password: 'hardpass' })
        token = response.body;
      });

    it("should return array of vacations", async () => {
        const response = await supertest(app.server).get("/api/vacations").set('Authorization', 'Bearer ' + token)
        const vacations = JSON.parse(response.text);
        expect(vacations.vacations.length).to.be.greaterThanOrEqual(1);
        expect(vacations.numOfPages).to.be.greaterThanOrEqual(1);
    });
});