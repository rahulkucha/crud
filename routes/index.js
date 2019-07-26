var express = require('express');
var router = express.Router();
var mysql = require('mysql');



var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "mydb"
});


/* GET home page. */
router.get('/', function(req, res) {
  // res.send("hello");
  res.render('index', { title: 'Express' });
  con.query("SELECT * FROM category", function (err, result, fields) {
    if (err)
    {
        throw err;
    } 
    else 
    {
    obj = {print: result};
    res.render('add1', obj);   
    res.render('add1');             
    }
  });

});



module.exports = router;