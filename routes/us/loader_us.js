var express = require('express');
var router = express.Router();

// EXMS Express (APEX)
var ecms = require('./ecms');
router.get('/ecms/:postid/:i18n', function(req, res, next) { ecms(res, req.params.postid, req.params.i18n); });

// UPS
var ups = require('./ups');
router.get('/ups/:postid/:i18n', function(req, res, next) { ups(res, req.params.postid, req.params.i18n); });

// IPARCEL
var iparcel = require('./iparcel');
router.get('/iparcel/:postid', function(req, res, next) { iparcel(res, req.params.postid); });

module.exports = router;
