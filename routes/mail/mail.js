//
var express = require('express');
var router = express.Router();

//=====
// SOUTH KOREA
//=====

// Korea Post - Domestic
var koreapost_d = require('./ko/koreapost_d');
router.get('/koreapost_d/:postid', function(req, res, next) { koreapost_d(res, req.params.postid); });

// Korea Post - International
var koreapost_i = require('./ko/koreapost_i');
router.get('/koreapost_i/:postid', function(req, res, next) { koreapost_i(res, req.params.postid); });

// Logen
var logen = require('./ko/logen');
router.get('/logen/:postid', function(req, res, next) { logen(res, req.params.postid); });

// CJ Korea Express
var korex_d = require('./ko/korex_d');
router.get('/korex_d/:postid', function(req, res, next) { korex_d(res, req.params.postid); });

//=====
// UNITED STATES
//=====

// EXMS Express (APEX)
var ecms = require('./us/ecms');
router.get('/ecms/:postid/:i18n', function(req, res, next) { ecms(res, req.params.postid, req.params.i18n); });

// UPS
var ups = require('./us/ups');
router.get('/ups/:postid/:i18n', function(req, res, next) { ups(res, req.params.postid, req.params.i18n); });

// IPARCEL
var iparcel = require('./us/iparcel');
router.get('/iparcel/:postid', function(req, res, next) { iparcel(res, req.params.postid); });

module.exports = router;
