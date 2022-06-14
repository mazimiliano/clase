var path,boy, leftBoundary,rightBoundary;
var pathImg,boyImg;
var i;
var obstacle1,obstacle2,obstacle3;
var obstacle1G,obstacle2G,obstacle3G;
var oso, cabaña, pino;
var score = 0;
var gameOver;

var PLAY = 1;
var END = 0;
var gameState = 1;

function preload(){
  endImg = loadImage("gameOver.png");
  pathImg = loadImage("fondo2.webp");
  boyImg = loadImage("personaje1.webp");
  obstacle1 = loadImage("pino.png");
  obstacle2 = loadImage("oso.png");
  obstacle3 = loadImage("cabaña.png");

}

function setup(){
  
  createCanvas(400,400);
  
// Fondo en movimiento
path = createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;
path.scale=1.2;

//Creando el niño corriendo
boy = createSprite(180,340,30,30);
boy.scale = 0.08;
boy.addImage("JakeRunning",boyImg);

gameOver = createSprite(200,200,100,100);
gameOver.addImage("endImg");
gameOver.visible = false;
  
//Crear límite izquierdo
leftBoundary=createSprite(0,0,1,800);
leftBoundary.visible = false;

//Crear límite derecho
rightBoundary=createSprite(410,0,10,800);
rightBoundary.visible = false;

obstacle1G = new Group();
obstacle2G = new Group();
obstacle3G = new Group();

}

function draw() {
  background(0);
  path.velocityY = 8;



  createObstacle1();
  createObstacle2();
  createObstacle3();
  
  if(obstacle1G.isTouching(boy)){
  score = score - 10;
  obstacle1G.destroyEach();
  }
  else if(obstacle3G.isTouching(boy)){
  score = score + 10;
  obstacle3G.destroyEach();

  }
  
   else{
   if(obstacle2G.isTouching(boy)) {
  gameState = END;
    obstacle2G.velocityY = 0;
    obstacle2G.destroyEach();
    obstacle1G.velocityY = 0;
    obstacle2G.velocityY = 0;
    obstacle3G.velocityY = 0;

    obstacle1.destroyEach;
    obstacle2.destroyEach;
    obstacle3.destroyEach;
  }

  }
  

  
  // Niño moviéndose en el eje X con el mouse
  boy.x = World.mouseX;
  boy.y = World.mouseY;
  
  edges= createEdgeSprites();
  boy.collide(edges[3]);
  boy.collide(leftBoundary);
  boy.collide(rightBoundary);
  
  //El código para restablecer el fondo
  if(path.y > 400 ){
    path.y = height/4;
  }
  
  //if(obstacle2G.isTouching(boy)) {
   // gameState=END;

  drawSprites();



  textSize(10);
  fill("red");
  text("puntuacion:" + score ,150 ,30);

//}
}
function createObstacle1() {
  if (World.frameCount % 40 == 0) {
  var pino = createSprite(Math.round(random(50, 350),40, 40, 60));
  pino.addImage(obstacle1);
  pino.scale=1;
  pino.velocityY = 8;
  pino.lifetime = 150;
  obstacle1G.add(pino);
  }
}


function createObstacle2() {
  if (World.frameCount % 100 == 0) {
  var oso = createSprite(Math.round(random(50, 350),40, 50, 50));
  oso.addImage(obstacle2);
  oso.scale=1;
  oso.velocityY = 8;
  oso.lifetime = 150;
  obstacle2G.add(oso);
}
}

function createObstacle3() {
  if (World.frameCount % 400 == 0) {
  var cabaña = createSprite(Math.round(random(50, 350),40, 60, 60));
  cabaña.addImage(obstacle3);
  cabaña.scale=1;
  cabaña.velocityY = 8;
  cabaña.lifetime = 150;
  obstacle3G.add(cabaña);
  }
}