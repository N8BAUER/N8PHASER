  const emailAPI= "https://n8-email.herokuapp.com/api/send"

$(document).ready(function() {
  $(".display-6").hide()

  $('body').on('submit', '#emailForm', function(e){
  e.preventDefault();
  $.post("/api/send", $('#emailForm').serialize())
  .then(function(response) {
  $(".btn").fadeOut(1000)
  $(".display-6").fadeIn(2500)
  })
})
});
