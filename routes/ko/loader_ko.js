var express = require('express');
var router = express.Router();

// Korea Post - Domestic
var koreapost_d = require('./koreapost_d');
router.get('/koreapost_d/:postid', function(req, res, next) { koreapost_d(res, req.params.postid); });

// Korea Post - International
var koreapost_i = require('./koreapost_i');
router.get('/koreapost_i/:postid', function(req, res, next) { koreapost_i(res, req.params.postid); });

// Logen
var logen = require('./logen');
router.get('/logen/:postid', function(req, res, next) { logen(res, req.params.postid); });

// CJ Korea Express
var korex_d = require('./korex_d');
router.get('/korex_d/:postid', function(req, res, next) { korex_d(res, req.params.postid); });

module.exports = router;
