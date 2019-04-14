module.exports.controller = function(app, model) {

    app.get('/api/wallets/new', (request, response) => {
    	model.accounts.createNewAccount(request, response);
    });

    app.post('/api/wallets/generateKeystore', (request, response) => {
    	model.accounts.generateKeystore(request, response);
    });

    app.post('/api/wallets/restorePrivateKey', (request, response) => {
    	model.accounts.restorePrivateKey(request, response);
    })
};
