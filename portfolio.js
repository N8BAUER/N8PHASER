$(document).ready(function() {
  console.log("jQuery working!")

  $('form').on('submit', function(e){
  e.preventDefault();
  alert("Thanks for emailing! I'll follow up at my earliest convienence.")
  $('.btn').button('toggle')
  })
});
