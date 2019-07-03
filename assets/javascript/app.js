$(document).ready(function(){
  
    
    $("#remaining-time").hide();
    $("#start").on('click', game.startGame);
    $(document).on('click' , '.option', game.guessChecker);
    
  })
  
  var game = {
   
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',
    questions: {
      q1: "What super villain once broke Batman's back, leaving him crippled and wheelchair-bound?",
      q2: "What were the names of Bruce Wayne's parents?",
      q3: "What Batman villain formerly worked as a zoologist?",
      q4: "What year was the character of Robin first introduced?",
      q5: "The original Batgirl was related to what familiar Batman character?",
      
    },
    options: {
      q1: ["Superman", "Joker", "Bane", "Your Mom"],
      q2: ["Thomas and Martha", "Wayne and Alice", "Wren and Stempy", "Bonnie and Clyde"],
      q3: ["Cat Woman", "Killer Croc", "The Penguin", "Posion Ivy"],
      q4: ["1940", "1950", "1960", "1970"],
      q5: ["The Joker", "Alfred", "Commisioner Gordon", "Batwoman"],
     
    },
    answers: {
      q1: "Bane",
      q2: "Thomas and Martha",
      q3: "The Penguin",
      q4: "1940",
      q5: "Commisioner Gordon",
      
    },
   
    startgame: function(){
     
      game.currentSet = 0;
      game.correct = 0;
      game.incorrect = 0;
      game.unanswered = 0;
      clearInterval(game.timerId);
      
     
      $('#game').show();
      
      
      $('#results').html('');
      
      
      $('#timer').text(game.timer);
      
      
      $('#start').hide();
  
      $('#remaining-time').show();
      
     
      game.nextQuestion();
      
    },
    
    nextQuestion : function(){
      
      
      game.timer = 10;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(game.timer);
      
      if(!game.timerOn){
        game.timerId = setInterval(game.timerRunning, 1000);
      }
      
      var questionContent = Object.values(game.questions)[game.currentSet];
      $('#question').text(questionContent);
      
      var questionOptions = Object.values(game.options)[game.currentSet];
      
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    },
    
    timerRunning : function(){
      if(game.timer > -1 && game.currentSet < Object.keys(game.questions).length){
        $('#timer').text(game.timer);
        game.timer--;
          if(game.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }
      else if(game.timer === -1){
        game.unanswered++;
        game.result = false;
        clearInterval(game.timerId);
        resultId = setTimeout(game.guessResult, 1000);
        $('#results').html('<h3>NO MORE TIME! The answer was '+ Object.values(game.answers)[game.currentSet] +'</h3>');
      }
      else if(game.currentSet === Object.keys(game.questions).length){
        $('#results')
          .html('<h3>Thanks for visting Gotham!</h3>'+
          '<p>Correct: '+ game.correct +'</p>'+
          '<p>Incorrect: '+ game.incorrect +'</p>'+
          '<p>Unaswered: '+ game.unanswered +'</p>'+
          '<p>Please play again!</p>');
        
        $('#game').hide();
        
        $('#start').show();
      }
      
    },
    
    guessChecker : function() {
      
     
      var resultId;
      
      
      var currentAnswer = Object.values(game.answers)[game.currentSet];
      
      if($(this).text() === currentAnswer){
        $(this).addClass('btn-success').removeClass('btn-info');
        
        game.correct++;
        clearInterval(game.timerId);
        resultId = setTimeout(game.guessResult, 1000);
        $('#results').html('<h3>Correct Answer!</h3>');
      }
      else{
        $(this).addClass('btn-danger').removeClass('btn-info');
        
        game.incorrect++;
        clearInterval(game.timerId);
        resultId = setTimeout(game.guessResult, 1000);
        $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
      }
      
    },
    guessResult : function(){
      
      game.currentSet++;
      
      $('.option').remove();
      $('#results h3').remove();
      
      game.nextQuestion();
       
    }
  
  }
  