$(document).ready(function() { //waits intil the page fully load before running the javascript file
    //global variables
    var counter = 0;
    var wins = 0;
    var losses = 0;
    var audioWin = new Audio('assets/audio/fred.wav'); //plays the winning audio file in assests/audio
    var audioLose = new Audio('assets/audio/bamm.wav'); //plays the lossing audio file in assests/audio
    //Function allows the computer to select a main random number between 19-120, also used for the users clickImages random number
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    //function calls to create click images and start playGame
    createImages(); //creates the initial clickImages, this function will be reused in the else if statements below
    playGame(); //starts the initial game, this function will be reused in the else if statements below

    //function to create random numbers for the users clickable images, uses a for loop to generate 4 random numbers, each number is then
    //assigned to one of the for DOM manipulated clickImamges
    function createImages() {
        var numbers = []
        while (numbers.length < 4) {
            var randomnumber = getRandomInt(1, 12);
            var found = false;
            for (var i = 0; i < numbers.length; i++) {
                if (numbers[i] == randomnumber) {
                    found = true;
                    break
                }
            }
            if (!found) numbers[numbers.length] = randomnumber;
        }
        //4 clickImages are created using jquery and the random numbers above is applied to the user clickImages.
        clickImage0 = $('<img>');
        clickImage0.attr('data-num', numbers[0]);
        clickImage0.attr('src', 'assets/images/fred.png');
        clickImage0.addClass('userImage')
        $('#clickImages').append(clickImage0);
        console.log(numbers[0]);

        clickImage1 = $('<img>');
        clickImage1.attr('data-num', numbers[1]);
        clickImage1.attr('src', 'assets/images/wilma.png');
        clickImage1.addClass('userImage')
        $('#clickImages').append(clickImage1);
        console.log(numbers[1]);

        clickImage2 = $('<img>');
        clickImage2.attr('data-num', numbers[2]);
        clickImage2.attr('src', 'assets/images/barney.png');
        clickImage2.addClass('userImage')
        $('#clickImages').append(clickImage2);
        console.log(numbers[2]);

        clickImage3 = $('<img>');
        clickImage3.attr('data-num', numbers[3]);
        clickImage3.attr('src', 'assets/images/betty.png');
        clickImage3.addClass('userImage')
        $('#clickImages').append(clickImage3);
        console.log(numbers[3]);
    }
    //computer selects a main random number 19-120
    function playGame() {
        $('#win').html(wins);
        $('#loss').html(losses);
        counter = 0;
        computerNumber = getRandomInt(20, 120);
        $('#yourScore').html(counter);
        $('.value').html(computerNumber);

        //User clicks an image and..
        $('.userImage').on('click', function() {
            counter = counter + parseInt($(this).data('num')); //selects the random number info from 'data-num' on the clickableImage..
            //and stores it to the counter, it will keep combining numbers. the "this" statement pertains to the current clicked clickImage.

            $('#yourScore').html(counter); //takes the number above and writes it to the html id#yourScore
            //if statement determines if the users combined total is = to the random computer number
            if (counter == computerNumber) {
                $('#status').html('Yabba Dabba Doo!');
                wins++;
                audioWin.play();
                $('#win').html(wins);
                $('#clickImages').empty(); //clears the clickImages so they dont multiply after each game, learned this the hardway!
                createImages(); //function call to create new random numbers for the userImages
                playGame(); //function call to restart the playGame
                //if statement determines if the users cobined total is greater to the random computer number.
                //this must be greater and a single "else" cant be used because the number would wlways be lower and the user would always lose.
            } else if (counter > computerNumber) {
                $('#status').html('Poor Flintstone!')
                losses++;
                audioLose.play();
                $('#loss').html(losses);
                $('#clickImages').empty(); //clears the clickImages so they dont multiply after each game, learned this the hardway!
                createImages(); //function call to create new random numbers for the userImages
                playGame(); //function call to restart the playGame
            } //after 7 games, the round ends and the browser resets
            if (wins > 7 || losses > 7) {
                location.reload();

            }
        });
    }

});