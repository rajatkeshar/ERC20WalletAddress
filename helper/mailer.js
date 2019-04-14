/*
 * @Description : Common library for sending emails
 * @Author : Rajat Kesharwani
 * @Version : 1.0
 */

'use strict';

var nodemailer = require('nodemailer');

// Create the transporter with the required configuration for Gmail

var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
});


module.exports = function() {

    return {
        sendEmail: function(email, subject, messBody, attachments, callback) {
            var mailOptions = {
                from: `"noreply" ${process.env.EMAIL}`,
                to: email,
                subject: subject,
                html: messBody,
                attachments: attachments,
            };
            transporter.sendMail(mailOptions, function(error, info)  {
                var output = {};
                if (error) {
                    output.error = true;
                    output.msg = "Unable to Send Email";
                    output.data = error;
                    return callback(output);
                }
                output.error = false;
                output.msg = "Email Send Successfully";
                output.data = info;
                return callback(output);
            });
        }
    };
};
