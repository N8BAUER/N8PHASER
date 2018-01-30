var express = require('express')
var router = express.Router()

router.get('/:action', function(req, res, next) {

  var action = req.params.action

  if (action == 'send'){ //send an email
    res.json({
      confirmation: 'Success',
      action: action
    })

    return
  }
  res.json({
    confirmation: 'Success',
    message: 'Invalid Action'
  })
})

module.exports = router;
