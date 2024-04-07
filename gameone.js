var clickCount = 0;
var maxClicks = 10; // Maximum number of clicks
var initialButtonSize = 100; // Initial button size in pixels
var moveSpeed = 5; // Initial movement speed in pixels

document.getElementById('moving-button').addEventListener('click', function() {
    clickCount++;
    var remainingClicks = maxClicks - clickCount;
    document.getElementById('counter').textContent = 'Clicks Remaining: ' + remainingClicks;

    if (clickCount >= maxClicks) {
        window.location.href = 'game.html';
        return; // Exit function to prevent further execution
    }

    // Hide text inside the button after the first click
    if (clickCount === 1) {
        this.textContent = ''; // Set text content to empty string
        initialButtonSize /= 2; // Decrease button size
    }

    // Calculate new button size based on click count
    var newButtonSize = initialButtonSize - (clickCount * 5); // Decrease size by 5 pixels each click
    
    // Set button size
    this.style.width = newButtonSize + 'px';
    this.style.height = newButtonSize + 'px';

    // Update font size based on button size
    var fontSize = newButtonSize / 4; // Calculate font size based on new button size
    this.style.fontSize = fontSize + 'px'; // Set font size to match button size

    // Increase movement speed with each click
    moveSpeed += clickCount;

    // Set button movement
    var interval = setInterval(moveButton.bind(this), 50); // Move button every 50 milliseconds

    // Function to move the button
    function moveButton() {
        var currentX = parseFloat(getComputedStyle(this).left);
        var currentY = parseFloat(getComputedStyle(this).top);

        // Calculate new position based on move speed
        var newX = currentX + (Math.random() - 0.5) * moveSpeed;
        var newY = currentY + (Math.random() - 0.5) * moveSpeed;

        // Check if the button has reached or exceeded the edges of the window
        if (newX <= 0 || newX + newButtonSize >= window.innerWidth) {
            moveSpeed *= -1; // Reverse the movement direction
        }

        if (newY <= 0 || newY + newButtonSize >= window.innerHeight) {
            moveSpeed *= -1; // Reverse the movement direction
        }

        // Ensure the button stays within the window boundaries
        newX = Math.max(Math.min(newX, window.innerWidth - newButtonSize), 0);
        newY = Math.max(Math.min(newY, window.innerHeight - newButtonSize), 0);

        // Set new position
        this.style.left = newX + 'px';
        this.style.top = newY + 'px';
    }
});

// Event listener for the start button
document.getElementById('moving-button').addEventListener('click', function() {
    // Reset remainingClicks and enable the button
    var remainingClicks = maxClicks;
    document.getElementById('moving-button').disabled = false;

    // Start the timer
    startTimer();
});

/*********/

let timerInterval;
let startTime;

function startTimer() {
    // Check if the timer is already running
    if (timerInterval) {
        return; // If running, do nothing
    }

    startTime = new Date().getTime(); // Record the start time

    // Update the timer every second
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    let currentTime = new Date().getTime(); // Get the current time
    let elapsedTime = currentTime - startTime; // Calculate elapsed time

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

    // Add leading zeros if needed
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    // Update the timer display
    document.getElementById('timerDisplay').textContent = hours + ':' + minutes + ':' + seconds;
}

document.getElementById('moving-button').addEventListener('click', function() {
    startTimer();
});
