var express = require('express');
var router = express.Router();

// EXMS Express 9APEX)
var ecms_express = require('./ecms_express');
router.get('/ecms_express/:postid/:langcode', function(req, res, next) { ecms_express(res, req.params.postid, req.params.langcode); });

module.exports = router;
