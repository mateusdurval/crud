var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('users/index', { title: 'Express' });
});



/* GET crud users. */
router.get('/users', function(req, res, next) {
  res.render('users/index', { title: 'Express' });
});
router.get('/users/create', function(req, res, next) {
  res.render('users/create', { title: 'Express' });
});
router.get('/users/edit', function(req, res, next) {
  res.render('users/edit', { title: 'Express' });
});



/* GET crud products. */
router.get('/products', function(req, res, next) {
  res.render('products/index', { title: 'Express' });
});
router.get('/products/create', function(req, res, next) {
  res.render('products/create', { title: 'Express' });
});
router.get('/products/edit', function(req, res, next) {
  res.render('products/edit', { title: 'Express' });
});


/* GET crud products. */
router.get('/class', function(req, res, next) {
  res.render('class/index', { title: 'Express' });
});




module.exports = router;
