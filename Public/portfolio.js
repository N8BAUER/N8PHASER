

$(document).ready(function() {
  const emailAPI= "https://n8-email.herokuapp.com/api/send"
  console.log("jQuery working!")

  $(".display-6").hide()

  $('body').on('submit', '#emailForm', function(e){
  e.preventDefault();
  $.post(emailAPI, $('#emailForm').serialize())
  .then(function(response) {
  $(".btn").fadeOut(1000)
  $(".display-6").fadeIn(2500)
  })
})
});
