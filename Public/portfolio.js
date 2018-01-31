  const emailAPI= "https://n8-email.herokuapp.com"

$(document).ready(function() {
  console.log("jQuery working!")

  $(".display-6").hide()

  $('body').on('submit', '#emailForm', function(e){
  e.preventDefault();
  $.post("http://localhost:8080/api/send", $('#emailForm').serialize())
  .then(function(response) {
  $(".btn").fadeOut(1000)
  $(".display-6").fadeIn(2500)
  })
})
});
