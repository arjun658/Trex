var trex;
var trexrun; 
var trexcollide;
var edges;
var ground,groundImage;
var invisibleGround;
var cloud,cloudImage;
var obstacle;
var o1,o2,o3,o4,o5,o6;
var score = 0;
var obstacleGroup,cloudgroup;
var PLAY = 0;
var END = 1;
var gamestate = PLAY;
var gameover,gameoverimage;
var restart,restartimage;
var jump,checkPoint,die;


function preload(){
  trexrun = loadAnimation("trex1.png","trex3.png","trex4.png");
  trexcollide = loadAnimation("trex_collided.png");
groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  o1 = loadImage("obstacle1.png");
  o2 = loadImage("obstacle2.png");
  o3 = loadImage("obstacle3.png");
  o4 = loadImage("obstacle4.png");
  o5 = loadImage("obstacle5.png");
  o6 = loadImage("obstacle6.png");
  gameoverimage = loadImage("gameOver.png");
  restartimage = loadImage("restart.png");
  jump = loadSound("jump.mp3");
  die = loadSound("die.mp3");
  checkPoint = loadSound("checkPoint.mp3");
}

function setup(){
  createCanvas(600,200);
  
  edges = createEdgeSprites();

  trex = createSprite(50,160,10,50);
  trex.addAnimation("run",trexrun);
  trex.addAnimation("collide",trexcollide);
  trex.scale = 0.5;
  //trex.debug = true;
  trex.setCollider("circle",0,0,45);
  
  ground = createSprite(300,180,600,5);
  ground.addImage(groundImage);

 
 invisibleGround = createSprite(300,190,600,5);
 invisibleGround.visible = false;
  
  gameover = createSprite(300,100,100,100);
  gameover.addImage(gameoverimage);
  gameover.scale = 0.5;
  gameover.visible = false;
  
  restart = createSprite(300,140,100,100);
  restart.addImage(restartimage)
  restart.scale = 0.5;
  restart.visible = false;
  
  obstacleGroup = new Group();
  cloudGroup = new Group();
}


function draw(){
  background('white'); 
  text ("Score:"+ score,500,50);
  console.log(trex.y);
  if (gamestate === PLAY ){
     
  score = score + Math.round(frameRate()/60);
    
    if(score % 100 === 0 && score>0){
       checkPoint.play();
        }
   ground.velocityX = -(4 + score/200);
    
  //make trex jump
  if(keyDown("SPACE")&& trex.y>=165){
    trex.velocityY = -10;
    jump.play();
  }
  //trex gravity
  trex.velocityY = trex.velocityY + 0.5;
      
    if (ground.x<0){
  ground.x = ground.width/2;
  }
    
    
    
    if (trex.isTouching(obstacleGroup)){
      gamestate = END;
      die.play();
      //trex.velocityY = -10;
      //jump.play();
        }
    spawnObstacle();
     spawncloud();
    
   }
  
      else if(gamestate === END){
         gameover.visible = true;
        restart.visible = true;
        trex.velocityY = 0;
        ground.velocityX = 0;     
        obstacleGroup.setVelocityXEach(0);
        cloudGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        cloudGroup.setLifetimeEach(-1);
        trex.changeAnimation("collide");
        
        if(mousePressedOver(restart)){
           reset();
           }
  }
      
  
  
  //console.log(trex.y);
  
  
  //trex collide
   trex.collide (invisibleGround);  
  
 drawSprites();
  
}
function spawncloud(){
  if(frameCount % 60 === 0){
  cloud =createSprite(600,100,10,10);
  cloud.velocityX = -4;
  cloud.addImage("cloud.png",cloudImage); 
  cloud.y = Math.round(random(40,100));
  trex.depth = cloud.depth +1
    cloud.lifetime = 150;
    cloudGroup.add(cloud);
  }
  
  
}
function spawnObstacle(){
  if (frameCount % 80 === 0){
    obstacle = createSprite(600,170,10,10);
    obstacle.velocityX = -(6 + score/150);
    var r = Math.round(random(1,6));
    switch(r){
      case 1:obstacle.addImage(o1);
        break;
        case 2:obstacle.addImage(o2);
      break;
      case 3:obstacle.addImage(o3);
        break;
        case 4:obstacle.addImage(o4);
        break;
        case 5:obstacle.addImage(o5);
        break;
        case 6:obstacle.addImage(o6);
        break;
        default:break;
        
    }
    obstacle.scale = 0.6;
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);

  }
  
  
  
}
  function reset(){
    gamestate = PLAY;
    cloudGroup.destroyEach();
    obstacleGroup.destroyEach();
    trex.changeAnimation("run")
    score = 0;
    gameover.visible = false;
    restart.visible = false;
  
  }
  
