import { describe, it } from "mocha";
import { expect } from "chai";
import app from "../src/app";
import supertest from "supertest";
import RoleModel from "../src/2-models/role-model";


describe("testing auth routes", ()=>{

    it("should register test user", async ()=>{
        const response = await supertest(app.server).post("/api/register").send({ firstName: 'test', lastName: 'test', email: 'test@gmail.com', password: 'hardpass', roleId: RoleModel.User})
        const token = response.body;
        expect(token).to.be.not.empty;
    });

    it("should register existing admin", async ()=>{
        const response = await supertest(app.server).post("/api/register").send({ firstName: 'admin', lastName: 'main', email: 'admin@gmail.com', password: 'hardpass', roleId: RoleModel.Admin})
        expect(response).to.haveOwnProperty("status", 400);
    });

    it("should sign in", async ()=>{
        const response = await supertest(app.server).post("/api/login").send({ email: 'admin@gmail.com', password: 'hardpass' })
        const token = response.body;
        expect(token).to.be.not.empty;
    });
});

