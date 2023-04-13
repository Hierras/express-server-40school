var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([
    {id: 0, login: "dodo"},
    {id: 1, login: "coco"}
]);
});

module.exports = router;
