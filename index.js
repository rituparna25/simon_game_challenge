var buttonColours = ["red","blue","green","yellow"];
var gameArray=[];
var userClickedPattern=[];
var level = 0;
var started= false;

$(document).on("keydown",function() {
    if(!started)
    {
        $("h1").text("Level "+level);
        nextSequence();
        started= true;
    }
});

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    console.log("User clicked pattern: "+userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length -1);
});  

function nextSequence()
{
    level++;
    userClickedPattern=[];
    $("h1").text("Level "+level);
    var randomNum = (Math.floor(Math.random()*4));
    var randomChosenColor = buttonColours[randomNum];
    gameArray.push(randomChosenColor);
    console.log("Game pattern: "+gameArray);
    var str="#"+randomChosenColor;
    $(str).fadeTo(50, 0.3, function() { $(this).fadeTo(50, 1.0); });

    playSound(randomChosenColor);
    
}

function playSound(name)
{
    $(document).ready(function(){
        var audio = new Audio("sounds/" + name + ".mp3");
        
        setTimeout(function() {audio.play();},0);
    });
}

function animatePress(currentColor)
{
        $("#"+currentColor).addClass("pressed");

    setTimeout(function() {
        $("#"+currentColor).removeClass("pressed");},100);
}

function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gameArray[currentLevel] === userClickedPattern[currentLevel]) 
    {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gameArray.length)
      {

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } 
    else 
    {

      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");

    setTimeout(function() {
        $("body").removeClass("game-over");},200);
    
    $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}

function startOver()
{
    level=0;
    gameArray=[];
    started=false;
}