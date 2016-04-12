//
var express = require('express');
var router = express.Router();

//Asiana Cargo
var asiana = require('./asiana');
router.get('/asiana/:postid/:i18n', function(req, res, next) { asiana(res, req.params.postid, req.params.i18n); });

//Korean Air Cargo
var koreanait = request('./koreanair');
router.get('/koreanair/:postid/:i18n', function(req, res, next) { koreanair(res, req.params.postid, req.params.i18n); });

module.exports = router;
