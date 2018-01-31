var express = require("express");
var router = express.Router();
var helper = require("sendgrid").mail;

router.post("/:action", function(req, res, next) {
  var action = req.params.action;

  if (action == "send") {
    //send an email
    var from_email = new helper.Email(req.body.sender);
    var to_email = new helper.Email("n8bdoesemailvia@gmail.com");
    var subject = req.body.subject;
    var content = new helper.Content("text/html", req.body.message);
    var mail = new helper.Mail(from_email, subject, to_email, content);

    var sg = require("sendgrid")(process.env.SENDGRID_API_KEY);
    var request = sg.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: mail.toJSON()
    });

    sg.API(request, function(error, response) {
      if (error){
        res.json({
          confirmation: 'fail',
          message: error
        })
        return
      }

      res.json({
        confirmation: 'Success',
        response: response
      })
      return
    });

    return;
  }
  res.json({
    confirmation: "Success",
    message: "Invalid Action"
  });
});


module.exports = router;
