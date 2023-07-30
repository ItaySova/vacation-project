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

    it("should sign in", async ()=>{
        // todo -add test for get one user
    });

    it("should sign in", async ()=>{
        // todo - add test for edit user
    });

    it("should sign in", async ()=>{
        // add test to remove user
    });
});

