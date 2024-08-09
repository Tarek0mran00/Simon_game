// Step 1: Create an array to store the button colors
var buttonColours = ["red", "blue", "green", "yellow"];

// Step 2: Create an empty array to store the game pattern
var gamePattern = [];

// Step 3: Create an empty array called userClickedPattern
var userClickedPattern = [];

// Step 4: Create a variable to track the level, starting at 0
var level = 0;

// Step 5: Create a variable to check if the game has started
var started = false;

// Function to update the h1 title
function updateTitle(text) {
    $("#level-title").text(text);
}

// Function to generate the next sequence
function nextSequence() {
    // Increase the level by 1
    level++;
    // Update the title with the new level
    updateTitle("Level " + level);
    
    // Generate a random number between 0 and 3
    var randomNumber = Math.floor(Math.random() * 4);
    
    // Use the randomNumber to select a random color from buttonColours
    var randomChosenColour = buttonColours[randomNumber];
    
    // Add the new randomChosenColour to the end of gamePattern
    gamePattern.push(randomChosenColour);
    
    // Use jQuery to select the button with the same id as randomChosenColour and animate a flash
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    
    // Play sound associated with the selected color
    playSound(randomChosenColour);
}

// Function to play sound based on color
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Detect when any of the buttons are clicked
$(".btn").click(function() {
    // Store the id of the clicked button in a variable
    var userChosenColour = $(this).attr("id");
    
    // Add the userChosenColour to userClickedPattern
    userClickedPattern.push(userChosenColour);
    
    // Play sound associated with the clicked button
    playSound(userChosenColour);
    
    // Animate the button that was clicked
    $("#" + userChosenColour).addClass("pressed");
    setTimeout(function() {
        $("#" + userChosenColour).removeClass("pressed");
    }, 100);
    
    // Call checkAnswer() passing in the index of the last answer in the user's sequence
    checkAnswer(userClickedPattern.length - 1);
});

// Detect when a keyboard key is pressed
$(document).keydown(function() {
    // Check if the game has started
    if (!started) {
        // Call nextSequence() on the first key press
        nextSequence();
        // Set the game as started
        started = true;
    }
});

// Function to check the user's answer
function checkAnswer(currentLevel) {
    // Compare the most recent user answer to the corresponding answer in gamePattern
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        
        // Check if the user has completed the sequence
        if (userClickedPattern.length === gamePattern.length) {
            // Wait 1000 milliseconds and then call nextSequence()
            setTimeout(function() {
                nextSequence();
            }, 1000);
            
            // Reset userClickedPattern for the next level
            userClickedPattern = [];
        }
    } else {
        console.log("wrong");
        // Play the wrong sound
        playSound("wrong");
        
        // Apply the game-over class to the body and then remove it after 200 milliseconds
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        
        // Change the h1 title to game over message
        updateTitle("Game Over, Press Any Key to Restart");
        
        // Reset the game
        startOver();
    }
}

// Function to reset the game
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
