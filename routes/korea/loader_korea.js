var express = require('express');
var router = express.Router();

// Korea Post - Domestic
var koreapost_domestic = require('./koreapost_domestic');
router.get('/koreapost_domestic/:postid', function(req, res, next) { koreapost_domestic(res, req.params.postid); });

// Korea Post - International
var koreapost_international = require('./koreapost_international');
router.get('/koreapost_international/:postid', function(req, res, next) { koreapost_international(res, req.params.postid); });

// Logen
var logen = require('./logen');
router.get('/logen/:postid', function(req, res, next) { logen(res, req.params.postid); });

// CJ Korea Express
var cj_korea_express = require('./cj_korea_express');
router.get('/cj_korea_express/:postid', function(req, res, next) { cj_korea_express(res, req.params.postid); });

module.exports = router;
