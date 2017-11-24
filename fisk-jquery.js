//jQuery based easier hackery to play with how Fisk could work.

$(document).ready(function(){
    Spawn();
    console.log('Spawned');

    (function fiskAbout(){
        //Select random fisk
        var numberOfSleepingFisks = $('.sleeping-fisk').length;
        var randomFisk = Math.floor(Math.random() * numberOfSleepingFisks);
        console.log(randomFisk);
        WakeUp($('.sleeping-fisk').eq(randomFisk));

        $('.fisk.awake').each(function(){

            var fisk = this;

            setTimeout(
              function()
              {
                  var randomFiskBehaviour = Math.floor(Math.random() * 3);

                  switch (randomFiskBehaviour) {
                      case 0:
                          Poop(fisk);
                          break;
                      case 1:
                          Gnaw(fisk);
                          break;
                      case 2:
                          Widdle(fisk);
                      };

              }, Math.floor(Math.random() * 5000));

        });

        setTimeout(fiskAbout, 10000);
    })()

});

function Poop(fisk){
    console.log('Poop!');

    var position = $(fisk).offset();
    for (var poops = 0; poops < Math.floor(Math.random() * 6) ; poops++){
        var poop = $('<div>');
        $('body').append(poop);
        $(poop).css('border-radius', '50%');
        $(poop).css('width', '5px');
        $(poop).css('height', '5px');
        $(poop).css('background-color', 'brown');
        $(poop).css('z-index', '9996');
        $(poop).css('position', 'absolute');
        $(poop).css(position);

        var poopVertical = position.top + Math.floor(Math.random() * 30) - 15;
        var poopHorizontal = position.left + Math.floor(Math.random() * 30) - 15;

        $(poop).animate({
            top: poopVertical+'px',
            left: poopHorizontal+'px',
        },1000)
    }
}

function Gnaw(fisk){
    console.log('Gnaw!');
    $(fisk).stop();
    var position = $(fisk).offset();

    var gnawRandomID = Math.floor(Math.random() * 9999999999999);

    for (var gnaws = 0; gnaws < Math.floor(Math.random() * 4) + 2 ; gnaws++){
        var gnawHole = $('<div>');
        $('body').append(gnawHole);
        $(gnawHole).css('border-radius', '50%');
        $(gnawHole).css('width', '1px');
        $(gnawHole).css('height', '1px');
        $(gnawHole).css('background-color', '#fff');
        $(gnawHole).css('z-index', '9990');
        $(gnawHole).css('position', 'absolute');

        var gnawHoleVertical = $(fisk).height() + position.top + Math.floor(Math.random() * 8) - 4;
        var gnawHoleHorizontal = $(fisk).width() + position.left + Math.floor(Math.random() * 8) - 4;

        $(gnawHole).css('top', gnawHoleVertical);
        $(gnawHole).css('left', gnawHoleHorizontal);

        $(gnawHole).addClass('gnaw'+gnawRandomID);

    }

    $('.gnaw'+gnawRandomID).animate({
        height: '16px',
        width: '16px',
        top: '-=8px',
        left: '-=8px',
    },2000, function(){Scamper(fisk)})

}

function Widdle(fisk){
    console.log('Widdle!');
    $(fisk).stop();
    var position = $(fisk).offset();
    var widdle = $('<div>');
    $('body').append(widdle);
    $(widdle).css('border-radius', '50%');
    $(widdle).css('width', '1px');
    $(widdle).css('height', '1px');
    $(widdle).css('background-color', '#ff0');
    $(widdle).css('opacity', 0.5);
    $(widdle).css('z-index', '9995');
    $(widdle).css('position', 'absolute');
    $(widdle).css(position);

    $(widdle).animate({
        height: '60px',
        width: '60px',
        top: '-=30px',
        left: '-=30px',
    },3000, function(){Scamper(fisk)})
}

function Scamper(fisk){
    console.log('Scamper!');
    var newq = makeNewPosition();
    var oldq = $(fisk).offset();
    var speed = calcSpeed([oldq.top, oldq.left], newq);

    $(fisk).animate({ top: newq[0], left: newq[1] }, speed, function(){
      Scamper(fisk);
    });
}

function WakeUp(word){
    var position = $(word).offset();
    $(word).removeClass('sleeping-fisk');
    var fisk = $(word).clone();
    $('body').append(fisk);
    $(fisk).css('border', '#D93E14 1px solid');
    $(fisk).css('border-radius', '10px');
    $(fisk).css('background-color', '#D93E14');
    $(fisk).css('color', 'white');
    $(fisk).css('position', 'absolute');
    $(fisk).css(position);
    $(fisk).css('z-index', '9999');
    $(fisk).addClass('awake');
    $(fisk).addClass('fisk');

    $(word).css('opacity', 0);
    Scamper(fisk);
}

function Spawn(){
    $('p').each(function(){
        var paragraph = this;
        var words = $(paragraph).text().split(' ');
        $(paragraph).empty();
        $.each(words, function(i, v) {
            if(v.length == 4){
                $(paragraph).append($('<span class="sleeping-fisk">').text(v));
            } else {
                $(paragraph).append(v);
            }

            $(paragraph).append(' ');
        });
    });
}

function makeNewPosition(){

    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height() - 50;
    var w = $(window).width() - 50;

    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);

    return [nh,nw];

}


function calcSpeed(prev, next) {

    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);

    var greatest = x > y ? x : y;

    var speedModifier = 0.05;

    var speed = Math.ceil(greatest/speedModifier);

    return speed;

}
