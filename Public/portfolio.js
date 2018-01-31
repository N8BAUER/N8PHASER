

$(document).ready(function() {
  const emailAPI= "/api/send"
  console.log("jQuery working!")

  $('body').on('submit', '#emailForm', function(e){
  e.preventDefault();
  $.post(emailAPI, $('#emailForm').serialize())
  .done(function(response) {
    alert("Thanks for emailing! I'll follow up at my earliest convienence.")
  })
})
});
