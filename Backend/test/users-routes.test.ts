import { describe, it } from "mocha";
import { expect, use } from "chai";
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

    it("test for edit user", async ()=>{ // todo - update the test
        const user = { firstName: 'Marge', lastName: 'Simpson', email: 'Marge@gmail.com', password:'hardpass', roleId: 2};
        const response = await supertest(app.server).put("/api/users/4").send(user);
        const updatedUser = response.body;
        expect(updatedUser).to.haveOwnProperty("userId");
        expect(updatedUser).to.haveOwnProperty("roleId");
        expect(updatedUser).to.contain(user);
    });

    // add the delete test after the register test 
    it("should delete test user", async ()=>{
        // add test to remove user
        const response = await supertest(app.server).get("/api/users/test@gmail.com");
        const user = response.body;
        const delResponse = await supertest(app.server).delete("/users/" + user.userId)
        expect(delResponse).to.haveOwnProperty("status", 204);

    });
});

