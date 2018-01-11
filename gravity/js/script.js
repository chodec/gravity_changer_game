var game = new Phaser.Game(800,600, Phaser.AUTO,'',{
    preload: preload,
    create: create,
    update: update,
    render: render
});

function preload(){
   game.load.tilemap('map', 'map/map.json', null, Phaser.Tilemap.TILED_JSON);
   game.load.image("player","graphics/player.png");
   game.load.image("background", "graphics/background.jpg");
   game.load.image('brick',"graphics/brick.png");
   game.load.image('star',"graphics/star.png");
   game.load.image('cil',"graphics/cil.png");
   //game.load.video('tutorial',"video/tutorial.MP4");
}

var brick;
var collision;
var map;
var layer;
var keyboard;
var level = 1;
var playerKill = false;
var deadPlayer = false;

var move = 0;
var width = 800;
var height = 600;

var gameStarts = 0;
var timer;
var seconds = 200;

var ready;
var video;

function create(){

    //game.add.sprite(0,0,);
    game.physics.startSystem(game.physics.ARCADE);
    this.spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    platforms=game.add.group();
    platforms.enableBody = true;

    createPlayer();

    map = game.add.tilemap('map');

    map.addTilesetImage('brick');
    map.addTilesetImage('star');
    map.addTilesetImage('cil');

    layer = map.createLayer(0);

    layer.resizeWorld();

    map.setCollisionBetween(1, 1);

    game.stage.backgroundColor = '#000';

    timer = game.time.create(false);

    timer.start();
}

function update(){

   collision = game.physics.arcade.collide(player, layer);
   keyboard = game.input.keyboard.createCursorKeys();

   seconds--;

   if(gameStarts < 200)
   {
      game.debug.text('Your game will start in ' + seconds/50,width/3, height/2-30);
      game.debug.text('Press  ARROW UP to change gravity',width/3, height/2);
   }

   gameStarts++;

   if(gameStarts > 200)
   {
     move=180;
   }
   player.body.velocity.x = move;
   console.log(move);

   changeGravity();

    if (this.spacebar.isDown && deadPlayer === true){
        deadPlayer = false;
        createPlayer();
        move = 100;
    }

     if(player.x >= 2510.33 && player.y ===286.25){
        player.x = 2510.33;
        player.y = 286.25;
        level=2;
        move = 0;

    }


   if(player.y <= 0 + player.body.height/2 || player.y>=600 - player.body.height/2){
     deadPlayer = true;
      player.kill();
      playerKill = true;
      move = 0;

   }

}
function render(){
    game.debug.text('Level: ' + level, 10, height - 5);
    if(player.y <= 0 + player.body.height/2 || player.y>=600 - player.body.height/2){
        game.debug.text('Press  SPACEBAR for restart',width/3, height/2-30);
    }
    if(player.x >= 2510.33 && player.y ===286.25){
        game.debug.text('Level ' + level + ' is incoming!',width/2, height/2-70);

    }
 }

  function createPlayer(){
      player = game.add.sprite(0, 250, "player");
      player.scale.setTo(0.5);

      game.physics.arcade.enable(player);
      player.body.gravity.y=450;

      player.body.collideWorldBounds = true;
      player.anchor.setTo(.5,.5);

      game.camera.follow(player);
    }

  function changeGravity(){
    if(keyboard.up.isDown && collision){

        if(player.body.gravity.y === -450){

          player.body.gravity.y= 450;
          player.scale.setTo(0.5,0.5);

        }else{

         player.body.gravity.y = -450;
         player.scale.setTo(0.5,-0.5);

        }
     }
  }
