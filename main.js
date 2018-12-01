
$(document).ready(function () {
    
    var $body = $('body');
    var $pikachou;
    var $pokeball;
    var $enemy ;
    var $position = 0;
    var $score = $('<div/>').addClass('score');
    $body.append($score);
    var pokeballCounter = 0;
    $score.hide()
    var $enemyScore= $('<div/>').addClass('enemyScore');
    var enemyCounter = 0;
    $body.append($enemyScore);
    $enemyScore.hide();
    var createInterval ; 
    var enemyPhysicalBody ;
    var pokeballPhysicBody ;

    var picaPhysicBody = $('<div/>').css({
        'width':'167px',
        'height':'98px',
        // 'border':'4px solid black',
        'position':'absolute',
        'left':'51px',
        'bottom':'33px'
        
    })

    //Using localstorage to display current player name 
    var playerInput;
    var player;
    var playerTag

    $('button').on('click', function(){
        playerInput = $('.player-input').val();
        setPlayer(playerInput);
      })
    
      function setPlayer(name) {
        window.localStorage.setItem('currentPlayer', name);
        renderPlayer();
      }

      function renderPlayer() {
          player = window.localStorage.getItem('currentPlayer');
          playerTag = $('<p/>').addClass('player-info').text(player);
          $('.player-info').empty();
          $('.player-info').append(playerTag);
        }

        //the purpose of collision function is to check if an object is touching another object
    
    function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2; 
        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    } 

    //winnerOrLoser function is to check if the player win or lose
    
    var winerOrLoser = function(){
        if (pokeballCounter  == 10 && enemyCounter < 10 ){
            alert('Great Job !! '+ "\n" +' You Win');
            $body.empty()
            clearInterval(createInterval)
            var restart = $('<input/>').attr({ type: 'button', name:'restart', value:'Restart'}).addClass('restartButton');
            $body.append(restart);
            $body.append('<img class="winerImg" src="SnappyHopefulHorseshoebat-size_restricted.gif"/>')
            restart.click(function() {
                location.reload();
            });
   
        } else if (pokeballCounter < 10 && enemyCounter == 10){
            alert('Game Over!! ');
            $body.empty()
            clearInterval(createInterval)
            var restart = $('<input/>').attr({ type: 'button', name:'restart', value:'Restart'}).addClass('restartButton');
            $body.append(restart);
            $body.append('<img class="loserImg" src="MPMGengarS6.gif"/>')
            restart.click(function() {
                location.reload();
            });
        }
        // else if (pokeballCounter == 10 && enemyCounter == 10){

        //     alert('No one win ');
        //     $body.empty()
        //     clearInterval(createInterval)
        //     var restart = $('<input/>').attr({ type: 'button', name:'restart', value:'Restart'}).addClass('restartButton');
        //     $body.append(restart);
        //     $body.append('<img class="winerImg" src="MPMGengarS1_2.gif"/>')
        //     restart.click(function() {
        //         location.reload();
        //     });
        // } 
    }

   
    /*checkPosition function is to check if the Physical body of Pikachou touching 
    Physical body of Pokeballs or the enemies*/
   var checkPosition = function() {
        if (collision(picaPhysicBody,pokeballPhysicBody)) {
            $pokeball.remove();
            pokeballCounter ++;
            $score.text(pokeballCounter );
            winerOrLoser();  
        }
        else if (collision(picaPhysicBody,enemyPhysicalBody)){
            $enemy.remove();
            enemyCounter ++;
            $enemyScore.text(enemyCounter);
            winerOrLoser();
        }
    }
            
        
        
        
    //move function is to moving the Pokeballs and enemies to random location
    var move = function() {
        var $newPosition = $position + 100;
        $position = $newPosition;
        $pokeball.animate({
            'right': 2000 + 'px'
        },2000)
        $enemy.animate({
            'right': 2000 + 'px'
        },2000)

        checkPosition(pokeballPhysicBody);
        checkPosition(enemyPhysicalBody);
    }
   
    //porpuse of create function is to create random Pokeballs and enemies
    var create = function() {
        $pokeball = $('<div/>').addClass('pokeball');
        pokeballPhysicBody = $('<div/>').css({
            'width':'55px',
            'height':'60px',
            // 'border':'4px solid black',
            'position':'absolute',
            'left':'8px',
            'bottom':'6px'
        })
        $pokeball.append(pokeballPhysicBody);
        $body.append($pokeball)
        $pokeball.css({
            'bottom': Math.random() * window.innerHeight + 'px',
        })
        $enemy = $('<div/>').addClass('enemy');
        enemyPhysicalBody = $('<div/>').css({
            'width':'55px',
            'height':'55px',
            // 'border':'4px solid black',
            'position':'absolute',
            'left':'8px',
            'bottom':'3px'
        })
        $enemy.append(enemyPhysicalBody);
        $body.append($enemy);
        $enemy.css({
            'bottom': Math.random() * window.innerHeight + 'px',
        })
        setInterval(move, 500);
    }
        
    //start game 
    $('.start-game-button').on('click', function(){
    
        $body.append('<img class="pikaImg" src="Pikachu_.png" />')
        $enemyScore.show()
        $score.show()
        $pikachou = $('<div/>').addClass('pikachou');
        $body.append($pikachou);
        $('.startGame').hide();
        $('.startGame').hide();
        $pikachou.append(picaPhysicBody);
        
        var  $clicks = 0, $timer = null;
            $(function () {
                $pikachou.on("click", function ($e) {
                    $clicks++;  //count clicks
                    
                    if ($clicks === 1) {
                        $timer = setTimeout(function () {
                            //perform single-click action    
                            $clicks = 0;             //after action performed, reset counter
                            $pikachou.animate({
                                'bottom': "220px" //moves up
                                
                            }, function () {
                                $pikachou.animate({
                                    'bottom': '20px'
                                });
                                
                            });
                            
                        }, 200);
                        
                    } else {
                        
                        clearTimeout($timer);    //prevent single-click action
                        //perform double-click action
                        $clicks = 0;             //after action performed, reset counter
                        
                        $pikachou.animate({
                            'bottom': "470px" //moves up
                        }, function () {
                            $pikachou.animate({
                                'bottom': "20px"
                            }, 500);
                        })                
                    }
                })
                
                $pikachou.on("dblclick", function ($e) {
                    $e.preventDefault();  //cancel system double-click event
                });
                
            });
 
            createInterval= setInterval(create, 2000);
            
        })
        
    })