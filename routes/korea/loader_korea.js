var express = require('express');
var router = express.Router();

// Korea Post - Domestic
var koreapost_domestic = require('./koreapost_domestic');
router.get('/koreapost_domestic/:postid', function(req, res, next) { koreapost_domestic(res, req.params.postid); });

module.exports = router;
