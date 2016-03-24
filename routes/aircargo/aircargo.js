//
var express = require('express');
var router = express.Router();

//Asiana Cargo
var asiana = require('./asiana');
router.get('/asiana/:postid/:i18n', function(req, res, next) { asiana(res, req.params.postid, req.params.i18n); });

module.exports = router;