const chaiHttp = require("chai-http");
const chai = require("chai");
const { it } = require("mocha");
let assert = chai.assert;
const server = require("../server");
const { expect } = require("chai");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  it("should convert a valid input such as 10L: GET request to /api/convert", async function () {
    await chai.request(server).get("/api/convert?input=10L", (req, res) => {
      expect(res.body).to.be.deep.equal({
        initNum: 10,
        initUnit: "L",
        returnNum: 2.64172,
        returnUnit: "gal",
        string: "10 liters converts to 2.64172 gallons",
      });
    });
  });
});
