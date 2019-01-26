var fs = require('fs');

module.exports = function(app, http) {

    /* reading all modules folders */
    fs.readdirSync('./modules').forEach(function(module) {
        var controllerDir = './modules/' + module + '/controllers/';

        /* checking if controller folder exist in defined module or not */
        if (fs.existsSync(controllerDir)) {
            var models = require(global.appDir + '/modules/' + module + '/factory');

            /* including all controllers of all modules */
            fs.readdirSync(controllerDir).forEach(function(file) {

                /* include only js files */
                if (file.substr(-3) === '.js') {
                    route = require(controllerDir + file);
                    (typeof route.http != 'undefined') ? route.http = http: '';
                    route.controller(app, models);
                }
            });
            console.log(module + ' loaded');
        }

        delete controllerDir; // removing unused variable
    });
};
