$(document).ready(function() {

  $("#onclick").click(function() {
    $("#addpics").css("display", "block");
 });

 $("#addpics #cancel").click(function() {
    $(this).parent().parent().hide();
  });

});
