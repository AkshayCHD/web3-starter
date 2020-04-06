const EVMContract = artifacts.require("EVMContract");

module.exports = function(deployer) {
  deployer.deploy(EVMContract);
};
