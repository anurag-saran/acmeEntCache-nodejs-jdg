'use strict';
var infinispan = require('infinispan');
var util = require('util');
//var app = require('express')();
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var jdgHost = process.env.DATAGRID_HOTROD_SERVICE_HOST || "127.0.0.1";
var jdgPort = process.env.DATAGRID_HOTROD_SERVICE_PORT || 11222;
var PORT = process.env.PORT || 8080;
app.use(bodyParser.json);

var connected = infinispan.client({port: jdgPort, host: jdgHost}, {version: '2.2'});

// GET /customer/:id
app.get('/customer/:id', function(req, res) {
    var custID = req.params.id;
	connected.then(function (client) {
        client.get(custID).then(
            function(value) {
                if(value == undefined)  {
                    //res.json(util.format('Customer Not Found %s!', custID));
                    res.status(404).send();
                } else {
                    res.json(value);
                    
                }
            })
        })
})

// POST /customer
app.post('/customer', function(req, res) {
    var body = reg.body;
    var custID = body.custID;
    console.log("body:"+body);
    
	connected.then(function (client) {
        client.get(custID).then(
            function(value) {
                if(value == undefined)  {
                    client.put(custID, body)
                    res.json(util.format('Customer Not Found %s! but inserted into cache now', custID));
                }
            })
        })
})




app.get('/', function(req, res) {
	res.send('Webpage API Root');
});

app.listen(PORT, function() {
		console.log('Express listening on port ' + PORT + '!');
	});


