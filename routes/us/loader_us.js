var express = require('express');
var router = express.Router();

// EXMS Express (APEX)
var ecms_express = require('./ecms_express');
router.get('/ecms_express/:postid/:i18n', function(req, res, next) { ecms_express(res, req.params.postid, req.params.i18n); });

// UPS
var ups = require('./ups');
router.get('/ups/:postid/:i18n', function(req, res, next) { ups(res, req.params.postid, req.params.i18n); });

module.exports = router;
