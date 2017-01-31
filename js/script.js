var activeCursor;
var hangman = {
  currentTerminalInput: [],
  currentTerminalInputString: ""

}
$( function() {
    $( "#draggable" ).draggable({
      containment:"body"
    });
  } );
$(document).keyup(function(event){
  console.log(event.which)
  activeCursor = $('.active')
  if(event.which == 8 && !activeCursor.prev().is('.permanent')) {
    activeCursor.prev().remove();
    updateCurrentInput(null,false);
  } else if (event.which == 37 && !activeCursor.prev().is('.permanent')) {
    activeCursor.prev().addClass('active')
    activeCursor.removeClass('active');
  } else if (event.which == 39 && activeCursor.next()[0] !=null) {
    activeCursor.next().addClass('active')
    activeCursor.removeClass('active');
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
    updateCurrentInput(String.fromCharCode(event.which),true);
  }
})
function newLineAdd(cursorLocation){
  cursorLocation.parent().after('<div class="newLine"><div class="text permanent">$</div><div class="text permanent">&nbsp;</div><div class="text active"></div></div>')
}
function updateCurrentInput(whichChar,add) {
  if (add) {
    hangman.currentTerminalInput.splice($('.active').index()-3,0,whichChar)
  } else {
    hangman.currentTerminalInput.splice($('.active').index()-3,1)
  }
}
