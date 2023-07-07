document.getElementById("submit").addEventListener("click", addHighscore);
  function addHighscore() {
    let initials = document.getElementById("initials").value;    
      var score = document.getElementById("final-score").textContent;

    let highscores = window.localStorage.getItem("saveHighscore") ? JSON.parse(window.localStorage.getItem("saveHighscore")) : [];
    highscores.push({initials, score});
    window.localStorage.setItem("saveHighscore", JSON.stringify(highscores));
    window.location.href = "highscores.html";
  };
  