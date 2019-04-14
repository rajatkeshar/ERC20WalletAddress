require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

let app = express();

global.appDir = path.dirname(require.main.filename);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer : true }));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());
app.use(cors());

let PORT = (process.env.PORT)? process.env.PORT: 6001;

if(process.env.NODE_ENV == 'dev') {
    http.createServer(app).listen(PORT, (req, res) => { console.log(`server is running at : ${PORT}`) });
} else if (process.env.NODE_ENV == 'prod') {
    // Create an HTTPS service identical to the HTTP service.
    var options = { key: fs.readFileSync(process.env.KEY), cert: fs.readFileSync(process.env.CERT), ca: fs.readFileSync(process.env.CA) };
    https.createServer(options, app).listen(PORT, (req, res) => { console.log(`server is running at : ${PORT}`) });
} else {
    console.log("Configure NODE_ENV");
    process.exit(0)
}

/* loading all routes */

app.get('/', (request, response) => {
    response.json({ error: false, data: null, msg: "ERC20WalletAddress Server Is Running" });
});

try {
    require('./routesLoder')(app);
} catch (error) {
    console.log('error', error);
}
