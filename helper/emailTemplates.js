'use strict'

module.exports = {
        messBody: function(address) {
            return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <title>Email Wallet Address</title>
             <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
            <link href="https://fonts.googleapis.com/css?family=Hind+Guntur:300,400,500,600,700" rel="stylesheet">

            </head>

            <body style="border: 0px; margin: 0px; padding:0px;">

                <div style="padding:150px 20px 0px;" >

                	<p style="font-family: 'Hind Guntur', sans-serif; font-size: 17px">
                		<img src="cid:logo" alt="" style="display: block; margin-bottom: 30px; max-width: 160px;">
                		Welcome to The Wallets Worlds!, <br>
            You have successfully created your Wallet.

                	</p>


            <p style="text-align: left;">
            <div style="color: #fff;  background: #00cc99; text-decoration: none;display: block; border-radius:25px;
                     width: 580px;text-align: center;   font-weight: 500;
                     font-family: 'Hind Guntur', sans-serif;font-size: 18px;
                  line-height: 44px;height: 40px;"><b>Wallet Address: ${address}</b>
            </div>
             </p>



            	<p style="font-family: 'Hind Guntur', sans-serif; font-size: 17px; margin-top: 30px">For more information, follow us on</p>


            		 <div style="padding:5px; margin-top: 30px">
                        <a href="" style="border: 0px; text-decoration: none;"><img src="cid:social-1" alt="" border="0" ></a>
				                <a href="" style="border: 0px; text-decoration: none;"><img src="cid:social-2" alt="" border="0"></a>
                        <a href="" style="border: 0px; text-decoration: none;"><img src="cid:social-3" alt="" border="0"></a>
                        <a href="" style="border: 0px; text-decoration: none;"><img src="cid:social-4" alt="" border="0"></a>
                        <a href="" style="border: 0px; text-decoration: none;"><img src="cid:social-5" alt="" border="0"></a>
                        <a href="" style="border: 0px; text-decoration: none;"><img src="cid:social-6" alt="" border="0"></a>
            		 </div>

             </div>

               <div style="width:100%; text-align: right;">
               <img  src="cid:bottom-circle" width="auto" />
            </div>

            </div>
            </body>
            </html>`;
        }
};
