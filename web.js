var express = require('express');
var app = express();
var path = require('path');

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

console.log(process.env.PORT || 5000);
app.listen(process.env.PORT || 5000);