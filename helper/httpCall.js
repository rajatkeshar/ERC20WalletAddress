/*
 * @Description : Common library for AJAX Request
 * @Author : Rajat Kesharwani
 * @Version : 1.0
 */

'use strict';

var request = require('request');

const URL = process.env.TOKEN_URL;
module.exports = {
	call: function(method, url_path, payload, cb){
		return new Promise((resolve, reject) => {
			var options = {
				method: method,
				url: URL + '' + url_path,
				headers:{
					'Content-Type':'application/json',
      		        'version': ''
				},
				body: JSON.stringify(payload)
			};
			function callback(error, response, body) {
				if(error) return reject(error);
				try {
					// JSON.parse() can throw an exception if not valid JSON
                    resolve(JSON.parse(body));
                } catch(e) {
                    return reject(e);
                }
			}
			request(options, callback);
		});
	}
}
