var express = require("express");
var router = express.Router();
var utility = require('../utilities')

router.post("/:action", function(req, res, next) {
  var action = req.params.action;

  if (action == "send") {
    //send an email
    utilities.email
    .sendemail(req.body)
    .then(function(response){
        res.json({
          confirmation: 'Success',
          response: response
        })
    })
    .catch(function(err){
      res.json({
        confirmation: 'Fail',
        message: err
      })
    })


    return;
  }
  res.json({
    confirmation: "Success",
    message: "Invalid Action"
  });
});


module.exports = router;
