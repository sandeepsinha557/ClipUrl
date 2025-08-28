const { expect } = require("chai");
const jwt = require("jsonwebtoken");
const { setUser, getUser } = require("../service/auth");

describe("Auth Service", () => {
  const secret = "Sandeep#123";
  const testUser = {
    _id: "testId",
    email: "test@example.com",
    role: "normal",
    name: "Test User",
  };

  describe("setUser", () => {
    it("should generate a valid JWT token for a given user", () => {
      const token = setUser(testUser);
      expect(token).to.be.a("string");

      const decoded = jwt.verify(token, secret);
      expect(decoded._id).to.equal(testUser._id);
      expect(decoded.email).to.equal(testUser.email);
      expect(decoded.role).to.equal(testUser.role);
      expect(decoded.name).to.equal(testUser.name);
    });
  });

  describe("getUser", () => {
    it("should return the user object from a valid token", () => {
      const token = jwt.sign(testUser, secret);
      const user = getUser(token);
      expect(user).to.deep.include({
        _id: testUser._id,
        email: testUser.email,
        role: testUser.role,
        name: testUser.name,
      });
    });

    it("should return null for an invalid token", () => {
      const invalidToken = "invalid.token.string";
      const user = getUser(invalidToken);
      expect(user).to.be.null;
    });

    it("should return null for a token with a different secret", () => {
      const wrongSecret = "wrongSecret";
      const token = jwt.sign(testUser, wrongSecret);
      const user = getUser(token);
      expect(user).to.be.null;
    });
  });
});
