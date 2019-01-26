module.exports.controller = function(app, model) {

    app.route('/').get(function(request, response) {
        model.accounts.loadStaticFiles(request, response);
    });

    app.get('/new', function(request, response) {
    	model.accounts.createNewAccount(request, response);
    });

    app.post('/generateKeystore', function(request, response) {
    	model.accounts.generateKeystore(request, response);
    });

    app.post('/restorePrivateKey', function(request, response) {
    	model.accounts.restorePrivateKey(request, response);
    })
};
