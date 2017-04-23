
var infinispan = require('infinispan');
var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

var util = require('util');
var bodyParser = require('body-parser');
var jdgHost = process.env.DATAGRID_HOTROD_SERVICE_HOST || "127.0.0.1";
var jdgPort = process.env.DATAGRID_HOTROD_SERVICE_PORT || 11222;

app.use(bodyParser.json);

app.get('/', function(req, res) {
    console.log("****/:");
	res.send('Webpage API Root /');
});

app.get('/test', function(req, res) {
    console.log("****/test:");
	res.send('Webpage API Root /test');
});

// GET /customer/:id
app.get('/customer/:id', function(req, res) {
    console.log("*****// GET /customer/:id.");
    var custID = req.params.id;
    var connected = infinispan.client({port: jdgPort, host: jdgHost}, {version: '2.2'});
    console.log("#### connected"+JSON.stringify(connected))
    
//	connected.then(function (client) {
//        client.get(custID).then(
//            function(value) {
//                if(value == undefined)  {
//                    console.log("*****Record Not Found.");
//                    client.put(custID, "abc");
//                    //res.json(util.format('Customer Not Found %s!', custID));
//                    res.status(404).send();
//                } else {
//                    console.log("*****Record Found.");
//                    res.json(value);
//                    
//                }
//            });
//        });
});

// POST /customer
//app.post('/customer', function(req, res) {
//    var body = reg.body;
//    var custID = body.custID;
//    console.log("****body:"+body);
//    var connected = infinispan.client({port: jdgPort, host: jdgHost}, {version: '2.2'});
//	connected.then(function (client) {
//        client.get(custID).then(
//            function(value) {
//                if(value == undefined)  {
//                    client.put(custID, body)
//                    res.json(util.format('Customer Not Found %s! but inserted into cache now', custID));
//                }
//            })
//        })
//})

app.listen(PORT, function() {
		console.log('AcmeCache :Express listening on port :' + PORT + '!');
	});


