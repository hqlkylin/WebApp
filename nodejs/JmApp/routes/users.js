var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '集美' });
});
router.get('/add', function(req, res, next) {
  res.render('index', { title: '集美' });
});
module.exports = router;
