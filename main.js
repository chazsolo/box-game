$(document).ready(function() {
  var $arena = $('.arena');
  var $player = $('.player');
  var $buttons = $('.button', '.buttons');

  var mx, my;
  
  setDimensionsOnElement($arena, {
    height: 400,
    width: 600
  });
  var arenaOffset = $arena.offset();

  $(document).on('mousemove', function( e ) {
    e.preventDefault();

    mx = e.pageX - Math.floor(arenaOffset.left);
    my = e.pageY - Math.floor(arenaOffset.top);

    movePlayerToPosition($player, mx, my);
  });

  $buttons.on('click', function( e ) {
    e.preventDefault();

    // where is the player, relative to the arena?
    var px = parseInt($player.css('left'), 10);
    var py = parseInt($player.css('top'), 10);
    var perc_x = px / $arena.width();
    var perc_y = py / $arena.height();

    console.log(perc_x);
    console.log(perc_y);

    var sizing = $(this).data('sizing');
    setDimensionsOnElement($arena, sizeMap[sizing]);
    arenaOffset = $arena.offset();

    // move player to relative spot
    var new_x = $arena.width() * perc_x;
    var new_y = $arena.height() * perc_y;
    movePlayerToPosition($player, new_x, new_y);
  });
});

var sizeMap = {
  small: {
    height: 200,
    width: 300
  },
  medium: {
    height: 400,
    width: 600
  },
  large: {
    height: 600,
    width: 800
  }
};

// why oh why
var clampX, clampY;

function movePlayerToPosition( $player, mx, my ) {
  var xPos = clampX(mx);
  var yPos = clampY(my);

  console.log(`moving player to (${xPos}, ${yPos}`);

  $player.css({
    left: xPos - 20,
    top: yPos - 20
  });
}

var setDimensionsOnElement = function( $el, dimensions ) {
  $el.css({
    height: dimensions.height,
    width: dimensions.width
  });

  clampX = clamp(20, dimensions.width - 20);
  clampY = clamp(20, dimensions.height - 20);
};

var clamp = function( min, max ) {
  return function( value ) {
    if ( !Number.isNaN(value) ) {
      return Math.min(Math.max(+value, min), max);
    }
  }
};