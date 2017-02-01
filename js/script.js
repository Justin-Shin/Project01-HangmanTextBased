var activeCursor;
var hangman = {
  currentTerminalInput: [],
  currentTerminalInputString: "",
  playBegan: false,
  guessingMode: false,
  gameStarted: false,
  gameCompleted:false,
  deathCounter: 0,
  deathArray: ["Oh no. A head has appeared near the noose. Please use your imagination.","Egads, a body now is on the head. Seriously, use your imagination","An arm appears. It's on the right side. No, to your right.","The other arm appears! Please guess correctly henceforth","Ah, a right leg appears. This time it's his right, not yours","Bing bong. The man has died. Great job. Not."],
  colors: ["purple"],
  condiments: ["mustard"],
  asia: ["asia"],
  potentPotables: [],
  counterOfSomeSort: 0,
  wordIs: null,
  wordIsArray: [],
  wordIsArrayPrint: []

}
$( function() { //this part makes the console screen draggable
    $( "#draggable" ).draggable({
      containment:"body"
    });
  } );
$(document).keyup(function(event){ //some keyboard events (such as backspace and arrow keys) are not captured by keypress, this is for those functions
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
$(document).keypress(function(event){ //this is for keyboard events, whenever I type it should type into the console
  activeCursor = $('.active')
  if(event.which == 13) { //this handles when a user pushes "enter" or "return"
    activeCursor.removeClass('active');
    hangman.currentTerminalInputString = hangman.currentTerminalInput.join("");
    runItem(hangman.currentTerminalInputString);
  } else {
    activeCursor.before('<div class ="text">'+String.fromCharCode(event.which)+'</div>')
    updateCurrentInput(String.fromCharCode(event.which),true);
  }
})
function newLineAdd(cursorLocation,consoleLine){
  if(consoleLine) {
    cursorLocation.parent().after('<div class="newLine"><div class = "text active"></div></div>')
    // $('.active').scrollTop = $('.active').scrollHeight;
    $('.textWindow').scrollTop($('.textWindow')[0].scrollHeight)
  } else {
    cursorLocation.parent().after('<div class="newLine"><div class="text permanent">$</div><div class="text permanent">&nbsp;</div><div class="text active"></div></div>')
    // $('.active').scrollTop = $('.active').scrollHeight;
    $('.textWindow').scrollTop($('.textWindow')[0].scrollHeight)
  }
}
function updateCurrentInput(whichChar,add) {
  if (add) {
    hangman.currentTerminalInput.splice($('.active').index()-3,0,whichChar)
  } else {
    hangman.currentTerminalInput.splice($('.active').index()-2,1)
  }
}
function runItem(runString){
  newLineAdd(activeCursor,true);
  console.log(runString)
  console.log(hangman.playBegan)
  console.log(hangman.playBegan==false)
  if (runString=="hangman.exe" && hangman.playBegan==false){
    activeCursor.removeClass('active')
    hangmanProgram()
  } else if (hangman.playBegan){
    console.log("====++++======++++=====")
    runItemHangman(runString,hangman.gameStarted,hangman.guessingMode,hangman.gameCompleted);
  } else {
    printMessage("'"+runString+"'"+" is an unrecognized command.");
  }
}
function printMessage(printString,programWrite) {
  var stringSplit = printString.split("")
  activeCursor = $('.active')
  console.log(stringSplit)
  for(i=0;i< stringSplit.length;i++) {
    activeCursor.before('<div class ="text">'+stringSplit[i]+'</div>')
  }
  activeCursor.removeClass('active')
  hangman.currentTerminalInput = [];
  hangman.currentTerminalInputString = "";
  if(programWrite){
    newLineAdd(activeCursor,true);
  } else {
    newLineAdd(activeCursor);
  }
}
function hangmanProgram(){
  activeCursor = $('.active')
  hangman.playBegan = true;
  printMessage("loading hangman.exe",true);
  printMessage("Generating digital human in shell",true)
  printMessage("Reticulating Splines",true)
  printMessage("...",true)
  printMessage("......",true)
  printMessage("...",true)
  printMessage("Would you like to play?")
}
function runItemHangman(textToRun,gameStarted,guessing,completedGame){
  activeCursor = $('active')
  activeCursor.removeClass('active')
  console.log(textToRun)
  console.log(hangman.gamesStarted)
  if(textToRun=='quit' ||textToRun=='bye'||textToRun=='goodbye') {
    hangman.playBegan = false;
    hangman.gameStarted = false;
    hangman.guessingMode = false;
    hangman.gameCompleted = false;
    newLineAdd(activeCursor,true);
    printMessage('goodbye')
  } else if ((textToRun == 'yes' || textToRun =="y" || textToRun == "sure") && !guessing && !completedGame && !gameStarted){
    hangman.gameStarted = true;
    newLineAdd(activeCursor,true);
    printMessage('Please choose a category from the following list: (type what is in brackets)',true)
    printMessage('[colors] that end in urple, [condiments] made from mustard seeds,',true)
    printMessage('the name of the continent [asia], potent [potables]')
  } else if (hangman.gameStarted && (textToRun == 'asia' || textToRun == 'colors' || textToRun == 'condiments' || textToRun == 'potables')) {
    hangman.gameStarted = false;
    hangman.guessingMode = true;
    generateGameLogic(textToRun);
    newLineAdd(activeCursor,true);
    printMessage('You chose '+textToRun+'.',true);
    printMessage('Choose your letters carefully or the digital person I promise is there dies',true)
    printMessage('',true)

    //message that prints out the blank spaces of the word
  } else {
    printMessage("'"+textToRun+"'"+" is an unrecognized command.");
  }
}
function generateGameLogic(categoryRequested) {
  var indexOfAnswer = Math.floor(Math.random() * hangman[categoryRequested].length)
  hangman.wordIs = hangman[categoryRequested][indexOfAnswer]
  hangman.wordIsArray = hangman[categoryRequested][indexOfAnswer].split('');
  for (i=0; i < hangman.wordIsArray.length; i++){
    hangman.wordIsArray.splice()
  }
}
