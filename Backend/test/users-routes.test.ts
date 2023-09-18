import { describe, it } from "mocha";
import { expect } from "chai";
import app from "../src/app";
import supertest from "supertest";


describe("testing users routes", ()=>{
    let token = null

    before(async () => {
        const response = await supertest(app.sslServer).post("/api/login").send({ email: 'admin@gmail.com', password: 'hardpass' })
        token = response.body;
      });

    it("should get all users", async ()=>{
        const response = await supertest(app.sslServer).get("/api/users").set('Authorization', 'Bearer ' + token);
        const users = response.body;
        expect(users.length).to.be.greaterThanOrEqual(2);
    });

    it("should get only 1 user", async ()=>{
        const response = await supertest(app.sslServer).get("/api/users/1");
        const user = response.body;
        expect(user).to.not.be.empty;
    });

    it("test for edit user", async ()=>{ // todo - update the test
        const user = { firstName: 'Marge', lastName: 'Simpson', email: 'Marge@gmail.com', password:'hardpass', roleId: 2};
        const response = await supertest(app.sslServer).put("/api/users/4").send(user);
        const updatedUser = response.body;
        expect(updatedUser).to.haveOwnProperty("userId");
        expect(updatedUser).to.haveOwnProperty("roleId");
        expect(updatedUser).to.contain(user);
    });

    it("should get only 1 user by email", async ()=>{
        const response = await supertest(app.sslServer).get("/api/users/email/test@gmail.com");
        const user = response.body[0];
        expect(user).to.not.be.empty;
        expect(user).to.haveOwnProperty("userId");
    });

    it("should delete test user", async ()=>{
        // add test to remove user
        const response = await supertest(app.sslServer).get("/api/users/email/test@gmail.com");
        const user = response.body[0];
        const delResponse = await supertest(app.sslServer).delete(`/api/users/${user.userId}`)
        expect(delResponse).to.haveOwnProperty("status", 204);

    });
});

