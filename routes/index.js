var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';

var site = "https://3e5fb153e889.ngrok.io";  //-----------------------------------------//

/* GET home page. */
router.get('/', function(req, res, next) {
  MongoClient.connect(url,function(err,db){
    var dbo = db.db("jewelryShop");
    var allProductId = [];

    dbo.collection("products").find().toArray(function(err, result) {
      if (err) throw err;
      db.close();
      for (pro of result){
        allProductId.push(pro._id);
      }
      var data = {
        title: 'Jewelry Shop',
        jewelry : result,
        allProductId : allProductId,
        site: site
      }
      res.render('index', data);
    });
  });
  
});

module.exports = router;
