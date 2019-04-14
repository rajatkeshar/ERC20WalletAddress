var modelsPath = global.appDir + "/routes/models/";

module.exports = {
    accounts: require(modelsPath + 'wallets')()
};
