var keythereum = require("keythereum");
var formidable = require('formidable');
var ethers = require('ethers');
var path = require('path');
var fs = require('fs');

//let url = "http://127.0.0.1:8543";
//let customHttpProvider = new ethers.providers.JsonRpcProvider(url);

module.exports = function() {

    return {
        loadStaticFiles: function(request, response) {
          response.sendFile(path.join(global.appDir+'/public/views/index.html'));
        },
        createNewAccount: function(request, response) {
          let newWallet =  ethers.Wallet.createRandom();

        	if(newWallet) {
          	response.json({
              error: false,
          		privateKey: newWallet.privateKey,
          		address: newWallet.address,
              msg: "Wallet Created Successfully"
          	});
          } else {
            response.json({
          		error: true,
          		msg: "Wallet Not Created!"
          	});
          }
        },
        generateKeystore: function(request, response) {
        		var privateKey = (request.body && request.body.privateKey)? request.body.privateKey: null;
        		var password = (request.body && request.body.password)? request.body.password: null;

          if(privateKey && password) {
        		let wallet = new ethers.Wallet(privateKey/*, customHttpProvider*/);
        		let encryptPromise = wallet.encrypt(password);

        		encryptPromise.then(function(keystore) {
        			response.json({
                error: false,
                keystore: keystore,
                msg: "Keystore Generated Successfully!"
              });
        		});
        	} else {
        		response.json({
        			error: true,
        			msg: "required params #password & #privateKey"
        		});
        	}
        },
        restorePrivateKey: function(request, response) {
          var form = new formidable.IncomingForm();
        	form.parse(request, function(err, fields, files) {
            if(err) {
              response.json({
                error: true,
                data: err,
                msg: "File Parsing Error!"
              });
            }
        		var fileData = fs.readFileSync(files.key.path);
        		var keystore = JSON.parse(fileData.toString());
        		var password = fields.password;

        		if(password && keystore) {
        			keythereum.recover(password, keystore, function (privateKey) {
                privateKey = "0x" + privateKey.toString('hex');
                console.log("privateKey: ", privateKey);
        				response.json({
                  error: false,
                  privateKey: privateKey,
                  msg: "Private Key Generated Successfully!"
                });
        			});
        		} else {
        			response.json({
        				error: true,
        				mag: "Required Params #password & #keystore"
        			});
        		}
        	});
        }
    };
};
