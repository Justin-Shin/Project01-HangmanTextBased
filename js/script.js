var activeCursor;
var hangman = {
  currentTerminalInput: [],
  currentTerminalInputString: "",
  playBegan: false,
  guessingMode: false,
  gameStarted: false,
  gameCompleted:false,
  deathCounter: -1,
  deathArray: ["Oh no. A head has appeared near the noose. Please use your imagination.","Egads, a body now is on the head. Seriously, use your imagination","An arm appears. It's on the right side. No, to YOUR right.","The other arm appears! Please guess correctly henceforth","Ah, a right leg appears. This time it's his right, not yours","Bing bong. The man has died. Great job. Not."],
  colors: ["purple"],
  condiments: ["mustard"],
  asia: ["asia"],
  potables: ['whisky','scotch','vodka','gin','vermouth','bourbon','brandy'],
  counterOfSomeSort: 0,
  wordIs: null,
  wordIsArray: [],
  wordIsArrayPrint: [],
  guessedLetters:[],
  correctArray: [],
  openingArray: [' reticulating splines',' solving for p=np',' help, I am trapped in a computer',' generatingAI',' ...',' ......',' digesting human brain tissue',' deleting System32'," Locating the required gigapixels to render..."," Spinning up the hamster..."," Shovelling coal into the server..."," Programming the flux capacitor"],
  openingCounter: 0

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
  //console.log(runString)
  //console.log(hangman.playBegan)
  //console.log(hangman.playBegan==false)
  if (runString=="hangman.exe" && hangman.playBegan==false){
    activeCursor.removeClass('active')
    hangmanProgram()
  } else if (hangman.playBegan){
    //console.log("====++++======++++=====")
    runItemHangman(runString,hangman.gameStarted,hangman.guessingMode,hangman.gameCompleted);
  } else {
    printMessage("'"+runString+"'"+" is an unrecognized command.");
  }
}
function printMessage(printString,programWrite) {
  var stringSplit = printString.split("")
  activeCursor = $('.active')
  //console.log(stringSplit)
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
  var timerThing = setTimeout(oneLoad,500);
  // printMessage("Would you like to play?")
}
function oneLoad(){
  activeCursor = $('.active')
  printMessage(hangman.openingArray[Math.floor(Math.random()*hangman.openingArray.length)],true);
  if(hangman.openingCounter < 6){
    hangman.openingCounter++
    var timerThing = setTimeout(twoLoad,Math.floor(Math.random()*5)*100);
  }
  else {
    hangman.openingCounter = 0
    var timerThing02 = setTimeout(function(){printMessage("Would you like to play?")},200)
  }
}
function twoLoad(){
  activeCursor = $('.active')
  // hangman.openingArray[Math.floor(Math.random()*hangman.openingArray.length)]
  printMessage(hangman.openingArray[Math.floor(Math.random()*hangman.openingArray.length)],true);
  if(hangman.openingCounter < 6){
    hangman.openingCounter++
    var timerThing = setTimeout(oneLoad,Math.floor(Math.random()*5)*100);
  } else {
    hangman.openingCounter = 0
    var timerThing02 = setTimeout(function(){printMessage("Would you like to play?")},200)
  }

}






function runItemHangman(textToRun,gameStarted,guessing,completedGame){
  activeCursor = $('active')
  activeCursor.removeClass('active')
  //console.log(textToRun)
  //console.log(hangman.gamesStarted)
  if(textToRun=='quit' ||textToRun=='bye'||textToRun=='goodbye' || textToRun =='no') {
    hangman.playBegan = false;
    hangman.gameStarted = false;
    hangman.guessingMode = false;
    hangman.gameCompleted = false;
    hangman.counterOfSomeSort= 0;
    hangman.wordIs= null;
    hangman.wordIsArray= [];
    hangman.wordIsArrayPrint= [];
    hangman.guessedLetters=[];
    hangman.correctArray= []
    // newLineAdd(activeCursor,true);
    printMessage('goodbye')
  } else if ((textToRun == 'yes' || textToRun =="y" || textToRun == "sure") && !guessing && !completedGame && !gameStarted){
    hangman.gameStarted = true;
    // newLineAdd(activeCursor,true);
    printMessage('Please choose a category from the following list: (type what is in brackets)',true)
    printMessage('[colors] that end in urple',true)
    printMessage('[condiments] made from mustard seeds',true)
    printMessage('the name of the continent [asia]',true)
    printMessage('potent [potables]')
  } else if (hangman.gameStarted && (textToRun == 'asia' || textToRun == 'colors' || textToRun == 'condiments' || textToRun == 'potables')) {
    hangman.gameStarted = false;
    hangman.guessingMode = true;
    generateGameLogic(textToRun);
    // newLineAdd(activeCursor,true);
    printMessage('You chose '+textToRun+'.',true);
    printMessage('Choose your letters carefully or the digital person I promise is there dies',true)
    printMessage('',true)
    printMessage(hangman.wordIsArrayPrint.join(''),true)
    printMessage('')
  } else if (hangman.guessingMode) {
    if (1 < textToRun.length || textToRun.match(/\d+/g)) {
      printMessage('please only input letters!');
    } else if (checkForMatch(textToRun.toLowerCase())) {
      printMessage('You got a match! Looks like the poor sucker has a life line!',true)
      printMessage('Keep guessing correctly to save the poor man!',true)
      printMessage('',true)
      printMessage(hangman.wordIsArrayPrint.join(''),true)
      printMessage('')
    } else if (hangman.wordIsArray.join('') == hangman.correctArray.join('')){
      printMessage('You did it! You guessed the word before the man died!',true)
      printMessage("You can't see him, but we promise you we didn't kill him, you can take our word for it",true)
      printMessage('',true)
      printMessage(hangman.wordIsArrayPrint.join(''),true)
      printMessage('',true)
      printMessage('play again?')
      hangman.guessingMode = false;
      hangman.deathCounter = -1;
    } else {
      hangman.deathCounter++
      if(hangman.deathCounter == 5) {
        printMessage('',true)
        printMessage(hangman.deathArray[hangman.deathCounter],true)
        printMessage("Better luck next time, but then again, I'm not holding my breath",true)
        printMessage('',true)
        printMessage(hangman.wordIsArrayPrint.join(''),true)
        hangman.guessingMode = false;
        hangman.deathCounter=-1;
        printMessage('',true)
        printMessage('Would you like to try again?')
      } else {
        printMessage('',true)
        printMessage(hangman.deathArray[hangman.deathCounter],true)
        // printMessage('Your incompetence will doom this man.  Please do better',true)
        printMessage('',true)
        printMessage(hangman.wordIsArrayPrint.join(''),true)
        printMessage('')
      }
    }
  } else {
    printMessage("'"+textToRun+"'"+" is an unrecognized command.");
  }
}
function generateGameLogic(categoryRequested) {
  var indexOfAnswer = Math.floor(Math.random() * hangman[categoryRequested].length)
  hangman.wordIs = hangman[categoryRequested][indexOfAnswer]
  hangman.wordIsArray = hangman[categoryRequested][indexOfAnswer].split('');
  hangman.wordIsArrayPrint = hangman[categoryRequested][indexOfAnswer].split('');
  var lengthofLoop = hangman.wordIsArray.length
  for (i=0; i < lengthofLoop; i++){
    hangman.wordIsArrayPrint[i*2] = '_'
    hangman.wordIsArrayPrint.splice(((i*2)+1),0,' ')
  }
}
function checkForMatch(letterToCheck) {
  var truthValue = false;
  for (i=0; i < hangman.wordIsArray.length; i++) {
    if (letterToCheck == hangman.wordIsArray[i]){
      hangman.correctArray[i] = letterToCheck
      hangman.wordIsArrayPrint[i*2] = letterToCheck
      truthValue = true;
    }
  }
  if (hangman.correctArray.join('') == hangman.wordIsArray.join('')) {
    truthValue = false
  }
  return truthValue;
}
