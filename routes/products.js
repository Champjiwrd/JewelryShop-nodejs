var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log("test-----------")
  res.render('product', { title: 'Express' });
  //res.send('Display All Product');
});

router.get('/:jid', function (req, res, next) {
  jid = ObjectID(req.params.jid)
  MongoClient.connect(url, function (err, db) {
    var dbo = db.db("jewelryShop");
    console.log("test------------" + jid)
    dbo.collection("products").findOne({ _id: jid }, function (err, result) {
      if (err) throw err;
      db.close();
      var data = {
        title: 'Jewelry Shop',
        data: result
      }
      res.render('product', data);
    });
  });
  //res.send('Display All Product');
});


module.exports = router;