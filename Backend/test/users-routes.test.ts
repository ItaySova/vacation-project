import { describe, it } from "mocha";
import { expect } from "chai";
import app from "../src/app";
import supertest from "supertest";


describe("testing users routes", ()=>{
    it("should register existing admin", async ()=>{
        const response = await supertest(app.server).get("/api/users");
        const users = response.body;
        expect(users.length).to.be.greaterThanOrEqual(2);
    });

    it("should get only 1 user", async ()=>{
        const response = await supertest(app.server).get("/api/users/1");
        const user = response.body;
        expect(user).to.not.be.empty;
    });

    it("should sign in", async ()=>{
        // todo - add test for edit user
    });

    it("should sign in", async ()=>{
        // add test to remove user
    });
});

