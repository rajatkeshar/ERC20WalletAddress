var fs = require('fs');

module.exports = function(app) {

    /* reading all controllers folders */
    var controllerDir = global.appDir + '/routes/controllers/';

    /* checking if controller folder exist in defined module or not */
    if (fs.existsSync(controllerDir)) {
        var models = require(global.appDir + '/routes/factory');

        /* including all controllers of all modules */
        fs.readdirSync(controllerDir).forEach( (file) => {

            /* include only js files */
            if (file.substr(-3) === '.js') {
                route = require(controllerDir + file);
                route.controller(app, models);
            }
        });
        console.log('controllers loaded');
    }
    delete controllerDir; // removing unused variable
};
