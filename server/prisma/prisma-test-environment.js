const NodeEnvironment = require("jest-environment-node");
const { TEST_DB_URL } = require("../tests/__helpers");
class PrismaTestEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    process.env.DATABASE_URL = TEST_DB_URL;
    this.global.process.env.DATABASE_URL = TEST_DB_URL;

    return super.setup();
  }
}

module.exports = PrismaTestEnvironment;
