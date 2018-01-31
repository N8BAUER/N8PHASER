$(document).ready(function() {
  console.log("jQuery working!")

  $('body').on('submit', function(e){
  alert("Thanks for emailing! I'll follow up at my earliest convienence.")
  return false;
  })
});
