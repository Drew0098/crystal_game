$(document).ready(function () {

  // The number we will manipulate by clicking crystals. Our "current guess" number.
  let totalNumber = 0;

  // Generates the random "target number" we will try to reach.
  const goalNumGen = () => Math.floor(Math.random() * 102) + 19;

  let goalNum = goalNumGen();

  // Setting up our starting variables.
  let wins = 0;
  let losses = 0;
  let crystals;

  // Function that generates random values for our crystals and returns our crystals object.
  const crystalNum = () => {
    // Crystals object.
    return {
      one: {
        points: Math.floor(Math.random() * 12) + 1,
        imageUrl: "assets/images/crystal1.png"
      },
      two: {
        points: Math.floor(Math.random() * 12) + 1,
        imageUrl: "assets/images/crystal2.png"
      },
      three: {
        points: Math.floor(Math.random() * 12) + 1,
        imageUrl: "assets/images/crystal3.jpg"
      },
      four: {
        points: Math.floor(Math.random() * 12) + 1,
        imageUrl: "assets/images/crystal4.jpg"
      }
    };
  }

  // Function to create a random number between 19 and 120.


  // Function that resets the game.
  const newGame = () => {
    // Make our current total number 0.
    totalNumber = 0;
    // Generate random crystal values.
    crystals = crystalNum();
    // Generate a random target number and render it to the page.
    goalNum = goalNumGen();
    $("#goalNumDiv").text("Random Number: " + goalNum);
  }

  // Function that handles updating the page.
  const updateWins = win => {
    $("#winLossDiv").empty();

    // If the user won...
    if (win === true) {
      // Show victory message, restart the game, and render the new "current guess" number.
      $("#win-area").append($("<p>").text("Congratulations! You won!"));
      newGame();
      renderTotalNumber();
    }
    // If the user lost...
    else if (win === false) {
      // Show defeat message, restart the game, and render the new "current guess" number.
      $("#win-area").append($("<p>").text("You lost! Better luck next time."));
      newGame();
      renderTotalNumber();
    }

    // Building our win/loss display and appending it to the page.
    let winSpan = $("<span>").text(wins);
    let lossSpan = $("<span>").text(losses);

    let pWins = $("<p>").text("Wins: ");
    let pLosses = $("<p>").text("Losses: ");

    pWins.append(winSpan);
    pLosses.append(lossSpan);

    $("#winLossDiv").append(pWins);
    $("#winLossDiv").append(pLosses);
  }

  // Function to render our crystals to the page.
  const renderCrystals = () => {
    for (var key in crystals) {
      var crystalDiv = $("<div class='crystals-button' data-name='" + key + "'>");
      var crystalImg = $("<img alt='image' class='crystals'>").attr("src", crystals[key].imageUrl);
      crystalDiv.append(crystalImg);
      $("#crystalImages").append(crystalDiv);
    }
  }

  // Function to update our "current guess" number. We are passing in the crystal that was clicked as an argument.
  const updateTotalNumber = crystal => {
    // Update our "current guess" number based on which crystal was clicked.
    totalNumber += crystals[crystal.attr("data-name")].points;
  }

  // Function that will render your "current guess" number to the page.
  const renderTotalNumber = () => {
    $("#totalNumber").html();
    $("#totalNumber").text("Total Number: " + totalNumber);
  }

  // Call our functions to start the game!
  newGame();
  updateWins();
  renderCrystals();
  renderTotalNumber();

  // Here we create an on.click event for the crystals.
  $(".crystals-button").on("click", function (event) {
    // Update our "current guess" number and re-render it.
    updateTotalNumber($(this));
    renderTotalNumber();

    // Check to see if we have won or lost.
    // If our current guess number equals the target number..
    if (totalNumber === goalNum) {
      // Increment wins, restart the game, and update the page.
      wins++;
      newGame();
      updateWins(true);
    }
    // If our guess number exceeded our target number...
    else if (totalNumber > goalNum) {
      // Increment losses, restart the game, and update the page.
      losses++;
      newGame();
      updateWins(false);
    }
  });

});
