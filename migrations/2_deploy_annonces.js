const Annonces = artifacts.require("Annonces");

module.exports = function(deployer) {
  deployer.deploy(Annonces);
};