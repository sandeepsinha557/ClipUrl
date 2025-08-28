const { expect } = require("chai");
const sinon = require("sinon");
const URL = require("../models/url");
const nanoidModule = require("nanoid");

describe("handleGenerateNewShortURL", () => {
  let req, res, nanoidStub, urlCreateStub, handleGenerateNewShortURL;

  beforeEach(() => {
    req = {
      body: {},
      user: { _id: "someUserId" },
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
      render: sinon.stub(),
    };
    nanoidStub = sinon.stub(nanoidModule, "nanoid").returns("shortID123");
    urlCreateStub = sinon.stub(URL, "create");
    // Require the module *after* stubbing its dependencies
    handleGenerateNewShortURL =
      require("../controllers/url").handleGenerateNewShortURL;
  });

  afterEach(() => {
    nanoidStub.restore();
    urlCreateStub.restore();
  });

  it("should return 400 if URL is not provided", async () => {
    req.body.url = undefined;
    await handleGenerateNewShortURL(req, res);
    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWith({ error: "url is required" })).to.be.true;
  });

  it("should create a new short URL and render the home page with the short ID", async () => {
    req.body.url = "https://example.com";
    urlCreateStub.resolves({}); // Mock successful creation

    await handleGenerateNewShortURL(req, res);

    expect(
      urlCreateStub.calledOnceWith({
        shortId: "shortID123",
        redirectURL: "https://example.com",
        visitHistory: [],
        createdBy: "someUserId",
      })
    ).to.be.true;
    expect(res.render.calledOnce).to.be.true;
    expect(
      res.render.calledWith("home", {
        id: "shortID123",
        baseUrl: process.env.BASE_URL || `http://localhost:3000`,
      })
    ).to.be.true;
  });
});
