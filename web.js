var express = require('express');
var app = express();
var path = require('path');
console.log(process.env.PORT || 5000);
app.listen(process.env.PORT || 5000);