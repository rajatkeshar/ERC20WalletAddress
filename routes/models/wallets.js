const keythereum = require("keythereum");
const formidable = require('formidable');
const ethers = require('ethers');
const path = require('path');
const fs = require('fs');
const emailTemplates = require(global.appDir + '/helper/emailTemplates');
const httpCall = require(global.appDir + '/helper/httpCall');
const mailer = require(global.appDir + '/helper/mailer')();

const filePath = global.appDir + '/public/images/';

module.exports = function() {

    return {
        createNewAccount: async function(request, response) {
             let newWallet =  ethers.Wallet.createRandom();
        	   if(newWallet) {
                var params = {
                    "from": process.env.COINBASE_ADDRESS,
                    "to": newWallet.address,
                    "privateKey": process.env.COINBASE_PRIVATEKEY,
                    "amount": process.env.DEFAULT_AMOUNT
                };

                try {
                    //var res = await httpCall.call('POST', '/api/token/transferTokenByPrivateKey', params);
                    //if(!res.error) {
                        response.json({
                            error: false,
                            mnemonic: newWallet.mnemonic,
                            privateKey: newWallet.privateKey,
                            address: newWallet.address,
                            msg: "Wallet Created Successfully"
                        });
                    //} else {
                        //response.json({ error: true, data: e, msg: "Internal Server Error!" });
                    //}
                } catch(e) {
                    response.json({ error: true, data: e, msg: "Something went wrong!" });
                }
            } else {
                response.json({ error: true, msg: "Wallet Not Created!" });
            }
        },
        generateKeystore: async function(request, response) {
        	var privateKey = (request.body && request.body.privateKey)? request.body.privateKey: null;
        	var password = (request.body && request.body.password)? request.body.password: null;
            var email = (request.body && request.body.email)? request.body.email: null;
            var subject = 'New Wallet Created';

            if(privateKey && password) {
        		    let wallet = new ethers.Wallet(privateKey);
        		    let encryptedJSON = await wallet.encrypt(password);
                var address = JSON.parse(encryptedJSON).address;
                var messBody = emailTemplates.messBody('0x' + address);
                var data = { filename: `UTC--${new Date().toISOString().replace(/[:]/g, '-')}--${address}`, keystore: encryptedJSON };
                var attachments = [
                    {'filename': 'logo.png', 'path': filePath + 'logo.png', 'cid': 'logo'},
                    // {'filename': 'social-1.png', 'path': filePath + 'social-1.png', 'cid': 'social-1'},
                    {'filename': 'social-2.png', 'path': filePath + 'social-2.png', 'cid': 'social-2'},
                    {'filename': 'social-3.png', 'path': filePath + 'social-3.png', 'cid': 'social-3'},
                    {'filename': 'social-4.png', 'path': filePath + 'social-4.png', 'cid': 'social-4'},
                    {'filename': 'social-5.png', 'path': filePath + 'social-5.png', 'cid': 'social-5'},
                    {'filename': 'social-6.png', 'path': filePath + 'social-6.png', 'cid': 'social-6'}
                ];
                mailer.sendEmail(email, subject, messBody, attachments, function(info) {
                    console.log(info);
                });
    			      response.json({ error: false, data: data, msg: "Keystore Generated Successfully!" });
        	} else {
        		response.json({ error: true, msg: "required params #password & #privateKey" });
        	}
        },
        restorePrivateKey: function(request, response) {
            var form = new formidable.IncomingForm();
        	form.parse(request, (err, fields, files) => {
                if(err) {
                  response.json({ error: true, data: err, msg: "File Parsing Error!" });
                }
        		var fileData = fs.readFileSync(files.key.path);
        		var keystore = JSON.parse(fileData.toString());
        		var password = fields.password;

        		if(password && keystore) {
        			keythereum.recover(password, keystore, (privateKey) => {
                        privateKey = "0x" + privateKey.toString('hex');
                        if(!privateKey.match(/Error/)) {
                    		response.json({ error: false, privateKey: privateKey, msg: "Private Key Generated Successfully!" });
                        } else {
                            response.json({ error: true, data: null, msg: "Authentication Code Mismatch!" });
                        }
            		});
            	} else {
        			response.json({ error: true, msg: "Required Params #password & #keystore" });
        	    }
        	});
        }
    };
};
