import { describe, it } from "mocha";
import { expect } from "chai";
import app from "../src/app";
import supertest from "supertest";


describe("testing followers routes", ()=>{
    let token = null

    before(async () => {
        const response = await supertest(app.server).post("/api/login").send({ email: 'admin@gmail.com', password: 'hardpass' });
        token = response.body;
      });

      it("should add a follow to a vacation", async ()=>{
        const response = await supertest(app.server).post("/api/follower/1").set('Authorization', 'Bearer ' + token);
        const follow = JSON.parse(response.text);
        expect(response).to.haveOwnProperty("status", 201);
        expect(follow).to.haveOwnProperty("userId");
        expect(follow).to.haveOwnProperty("vacationId");
    });

    it("should remove the added follow from last test", async ()=>{
        // add later
    });

    it("should add follows of non-existing vacations and users and delete them with the clear function ", async ()=>{
        // add later
    });

});