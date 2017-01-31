var activeCursor;
$( function() {
    $( "#draggable" ).draggable({
      containment:"body"
    });
  } );
$(document).keyup(function(event){
  activeCursor = $('.active')
  if(event.which == 8) {
    activeCursor.prev().remove();
  }
})
$(document).keypress(function(event){
  activeCursor = $('.active')
  // activeCursor.removeClass('active');
  if(event.which == 13) {
    activeCursor.removeClass('active');
    newLineAdd(activeCursor);
  } else {
    activeCursor.before('<div class ="text">'+String.fromCharCode(event.which)+'</div>')
  }





  //
  // else if ( activeCursor.parent().children().length < 10) {
  //   // activeCursor.text(String.fromCharCode(event.which));
  //   activeCursor.before('<div class ="text active">'+String.fromCharCode(event.which)+'</div>');
  // } else {
  // activeCursor.after('<div class ="text active">'+String.fromCharCode(event.which)+'</div>');
  // }
})

function newLineAdd(cursorLocation){
  cursorLocation.parent().after('<div class="newLine"><div class="text">$</div><div class="text">&nbsp;</div><div class="text active"></div></div>')
}
