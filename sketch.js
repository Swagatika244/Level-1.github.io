const {World, Engine, Bodies, Body, Constraint} = Matter;

var engine, world, canvas;
var backgroundImg1, backgroundImg2, backgroundImg3, backgroundImg4;
var thor ;
var stepsOn = [];

const BEGINNING = 0;
const PLAY_LEVEL1 = 1;
const PLAY_LEVEL2 = 2;
const GAME_END2 = 4 ;

var gameState = PLAY_LEVEL2;
var ground, stand, standImg, left_Wall, right_wall;
var steps = [];
var deaths = [];
var randX, randVelocity; 
// gameState when 1
const LEFT = -5;
const RIGHT = 5;
var right_change  = [RIGHT, RIGHT, RIGHT, RIGHT];
var left_change  = [LEFT, LEFT, LEFT];
var deathImg, deathImg2, death;
var death_V_change = [0, 0, 0, 0, 0, 0, 0];

var left_ellipses = [];
var right_ellipses = [];

var weaponImg = [];
var weapons = [];
var swordOfDeathImg;
var ellipse_swords = [];
var weapon_visible = [ 1, 0, 0, 0, 0, 0, 0];
var death_feedback = [0, 0, 0, 0, 0, 0, 0];
var deathFeedbacks = [];

//gameState when 2
var startPoint, ground2, ground3;
var thor2, thorRight, thorLeft, thorShield;
var thorShieldImg;
var steps1 = [];
var stepsOn1 = []
var steps2 = [];
var stepsOn2 = [];
var array0 = [0, 0, 0, 0, 0, 0, 0];
var array1 = [1, 1, 1, 1, 1, 1, 1];
var keyWeaponImg, keyWeapon, rectangle, square, fireRingImg, fireMove, fireStepsImg ;
var fireSteps1 = [] ;
var fireSteps2 = [] ;
var shootFireGroup, fireShootImg1, fireShootImg2;
var shoot;
var lifeImg, noLifeImg;
var lifes=[];
var lifesV = [];
var lifeTime = 1;
var lifeEnd = 1;
var left_wall, right_wall;
var signature1;
var shoot2;

// gameEnd 
var gameOver;
var retryBtn, restartBtn;
var signature;
var share;
var copyInput;
var copyshare;

//sound
var music, lifeTouch;
var music1 = true;
var hitSound, music2, music3;


function preload(){
  backgroundImg1 = loadImage("assets/backgroundImg1.jpg");
  backgroundImg2 = loadImage("assets/backgroundImg2.jpg");
  backgroundImg3 = loadImage("assets/backgroundImg3.jpg");
  backgroundImg4 = loadImage("assets/gameEnd.jpg");

  deathImg = loadImage("assets/death2.png");
  deathImg2 = loadImage("assets/fireDeath1.png")
  death_feedback_Img = loadImage("assets/death_feedback.png");

  standImg = loadImage("assets/ground.png");
  stepFireImage = loadImage("assets/fireStep.png");

  weaponImg[0] = loadImage("assets/weapons/weapon1.png");
  weaponImg[1] = loadImage("assets/weapons/weapon2.png");
  weaponImg[2] = loadImage("assets/weapons/weapon3.png");
  weaponImg[3] = loadImage("assets/weapons/weapon4.png");
  weaponImg[4] = loadImage("assets/weapons/weapon5.png");
  weaponImg[5] = loadImage("assets/weapons/weapon6.png");
  weaponImg[6] = loadImage("assets/weapons/weapon7.png");

  //swordOfDeathImg = loadImage("assets/weapons/swordOfDeath.png");

  music = loadSound("assets/music.mp3");
  lifeTouch = loadSound("assets/lifeTouch.wav");
  music2 = loadSound("assets/music2.mp3");
  music3  = loadSound("assets/music3.mp3");
  dragonFire = loadSound("assets/dragonFire.mp3");
  hitSound =  loadSound("assets/hitSound.wav");

  // gamestate 2 
  fireImg = loadImage("assets/gameState2/fire2png.png");
  keyWeaponImg = loadImage("assets/gameState2/keySword.png");
  fireRingImg = loadImage("assets/gameState2/dragonFire.png");
  fireMoveImg = loadImage("assets/gameState2/fire2png.png");
  fireStepsImg = loadImage("assets/gameState2/fireSteps.png");

  thorRight = loadImage("assets/warriorImage/thorRight.png");
  thorLeft= loadImage("assets/warriorImage/thorLeft.png");

  thorShieldImg = loadImage("assets/gameState2/light.png");
  fireShootImg1 = loadImage("assets/gameState2/R1.png");
  fireShootImg2 = loadImage("assets/gameState2/R2.png");
  lifeImg = loadImage("assets/gameState2/Green.png");
  noLifeImg = loadImage("assets/gameState2/fireIceOrb.png")




}

function setup() {
  engine = Engine.create();
  world = engine.world;
  canvas = createCanvas(windowWidth,windowHeight);
  console.log(noLifeImg);

  // ground create 
  ground = createSprite(width/2, height+10 , width, 20);
  ground3 = createSprite(ground.x, ground.y-0.1 , width, 20);
  ground3.visible = false;

  // create walls 
    left_wall = createSprite(0, height/2, 20, height);
    left_wall.visible = false;
    right_wall = createSprite(width, height/2, 20, height);
    right_wall.visible = false;

  signature1 = createElement('h2', 'by Swagatika');
  signature1.position(20,height - 35);
  signature1.class('signature1');
  signature1.hide();


  //gameEnd 
  gameEnd2()
  

if(gameState === 2){

  musicPlay();

    // beginning start point 
    startPoint = createSprite(100, height -10, 200, 20);
    startPoint.addImage(standImg);
    startPoint.scale = 0.1;
    startPoint.setCollider("rectangle", 0, -90, startPoint.width, 20);
    
   // key weapon 
   keyWeapon = createSprite(width - 50, 50);
   keyWeapon.addImage(keyWeaponImg);
   keyWeapon.debug = false;
   keyWeapon.setCollider("obb", 0, 0)
   keyWeapon.scale = 0.1;
   keyWeapon.rotation = -45;
   rectangle = createSprite(keyWeapon.x, keyWeapon.y+6, 10, 110);
   rectangle.visible = false;
   square = createSprite(keyWeapon.x, keyWeapon.y-30, 50, 30);
   square.visible = false;

  // fire Ring
   fireRing = createSprite(keyWeapon.x-2, keyWeapon.y+20);
   fireRing.addImage(fireRingImg);
   fireRing.scale = 0.1;
   fireRing.debug = false ;
   fireRing.setCollider("circle", 0, 0, 220);
   keyWeapon.depth = fireRing.depth + 1;

   fireMove = createSprite(startPoint.x-110, startPoint.y-5);
   fireMove.addImage(fireMoveImg);
   fireMove.scale = 0.33;
   startPoint.depth = fireMove.depth + 1;

   // steps create 
  for (var j = 0; j < 7; j ++){
    randX = random(200, width - 200);
    var step = createSprite(randX, j*90+70, 200, 15);
    steps1.push(step);
    //randVelocity = random(-3, 3);
  }
  for (var i = 0; i< steps1.length ; i++){
    var stepOn1 = createSprite(steps1[i].x, steps1[i].y + 0.5, 200, 15-1);
    stepOn1.shapeColor = "red";
    stepsOn1.push(stepOn1);
  }
  for(var i = 0; i< steps1.length ; i++){
    var fireStep = createSprite(steps1[i].x, steps1[i].y-6.5);
    fireSteps1.push(fireStep);
    fireStep.addImage(fireStepsImg);
    fireStep.scale = 0.0565
  }

  // steps2 create 
  for (var j = 0; j < 7; j++){
    randX = random(200, width - 200);
    var step = createSprite(randX, j*90+115, 150, 15);
    steps2.push(step);
    //randVelocity = random(-3, 3);

  }
  for (var i = 0; i< steps2.length ; i++){
    var stepOn2 = createSprite(steps2[i].x, steps2[i].y+0.5 , 150, 15-1);
    stepOn2.shapeColor = "blue";
    stepsOn2.push(stepOn2);
  }
  for(var i = 0; i< steps2.length ; i++){
    var fireStep2 = createSprite(steps2[i].x, steps2[i].y-3);
    fireSteps2.push(fireStep2);
    fireStep2.addImage(fireStepsImg);
    fireStep2.scale = 0.0427
  }
  // create Thorgrin 
thor2 = createSprite(startPoint.x + 100, startPoint.y-50, 10, 30);
thor2.debug = false;
thor2.addImage('thorRight',thorRight);
thor2.addImage('thorLeft',thorLeft);

thor2.scale = 0.012;

thorShield = createSprite(thor2.x, thor2.y);
thor2.depth = thorShield.depth + 1;
thorShield.addImage(thorShieldImg);
thorShield.scale = 0.09;


//fire group 
  shootFireGroup = new Group();
  
// life display create 
for (var i = 0; i < 5; i++){
  let positionArray =[
    [300, 24],
    [width/2+100, 184],
    [width-300, 300],
    [172, 400],
    [width /2- 100, height/2+180],
    //[229, 240],
    //[1302, height/2+100]
  ]
  var life = createSprite(positionArray[4-i][0], positionArray[4-i][1], 20, 20);
  life.addImage(lifeImg);
  life.scale = 0.04;
  lifes.push(life);


  var lifeV = createSprite(width - 30*i-35, height-30, 20, 20);
  lifeV.addImage('lifeImg',lifeImg);
  lifeV.addImage('noLifeImg',noLifeImg);
  lifeV.changeImage('lifeImg')
  lifeV.scale = 0.04;
  lifeV.visible = false;
  lifesV.push(lifeV);

    }



}

if(gameState === 1){

// beginning stand point 
stand = createSprite(100, height -10, 200, 20);
stand.addImage(standImg);
stand.scale = 0.1;
stand.setCollider("rectangle", 0, -90, stand.width, 20);





// steps create 
  for (var j = 0; j < 7; j++){
    randX = random(200, width - 200);
    var step = createSprite(randX, j*90+70, 200, 15);
    steps.push(step);
    randVelocity = random(-3, 3);
  }

// create death 
  for (var i = 0; i < steps.length; i++){
    // create invisible steps to collide
    stepOn = createSprite(steps[i].x, steps[i].y+0.5, steps[i].width , steps[i].height -1);
    stepsOn.push(stepOn);
    stepOn.visible = false;

    death = createSprite(steps[i].x, steps[i].y -33);
    deaths.push(death);
    death.addImage(deathImg);
    death.scale = 0.05;

      var deathFeedback_y = [ (height-100) - 0*100,
        (height-100) - 1*100,
        (height-100) - 2*100,
        (height-100) - 3*100,
        (height-100) - 4*100,
        (height-100) - 5*100,
        (height-100) - 6*100
      ]
      var x = 45;
      var y = deathFeedback_y[i];
      var deathFeedback = createSprite(x , y);
      deathFeedbacks.push (deathFeedback);
      deathFeedback.addImage(death_feedback_Img);
      deathFeedback.scale = 0.035
      deathFeedback.visible = false;
  }
  deaths[deaths.length-1].addImage(deathImg2);
  deaths[deaths.length-1].scale = 0.1;
  deaths[deaths.length-1].y = steps[steps.length - 1].y-5;

  deaths[3].addImage(deathImg2);
  deaths[3].scale = 0.1;
  deaths[3].y = steps[3].y-7;

  deaths[1].addImage(deathImg2);
  deaths[1].scale = 0.1;
  deaths[1].y = steps[1].y-5;

// create feedback_ellipses
  for(var i =0; i<7; i++){
    var left_ellipse = new Feedback_ellipse(50, (height-100) - i*100, 30);
    left_ellipses.push(left_ellipse);

    var right_ellipse = new Feedback_ellipse(width - 60, (height-100) - i*100, 30);
    right_ellipses.push(right_ellipse);
  }

// create Thorgrin 
   thor = createSprite(stand.x, stand.y-50, 10, 40);
   thor.shapeColor = "red";
   //thor.addImage("weapon1", swordOfDeathImg);
   //thor.scale = 0.2;

// create weapons
for(var i = 0; i<7; i++){
  var weaponPosition = [
    [400, 300],
    [width-400, 600],
    [width-400, 200],
    [width/2 , 100],
    [width-width/2, 400],
    [width/2-500, 50],
    [200, 500]
  ]

  var x = weaponPosition[i][0];
  var y = weaponPosition[i][1];
  var weapon = createSprite(x, y);
  weapon.addImage(weaponImg[i]);
  weapon.scale = 0.2
  weapons.push(weapon);
  
}


}




}


function draw() {
  Engine.update(engine);

  if(gameState === BEGINNING){
    beginning();
  }
  if(gameState === PLAY_LEVEL1){
    play_level_1();
  }
  if(gameState === PLAY_LEVEL2){
    play_level_2();
  }
  if(gameState === GAME_END2){
    game_end_2();
    
  }

  // draw sprites
   push ();
   fill(200,192, 203, 70);
   drawSprites();
   pop ();

  /*fill (255);
  textFont("jokerman");
  textSize(60);
  stroke (255);
  text("hello", 200, 200);*/
}

function beginning(){
  background(backgroundImg1);  

  
}
function play_level_1(){
  // background set
  background(backgroundImg2);  
  imageMode (CENTER);
  
  //image(stepFireImage, width/2, stand.y, width, stand.height);
  image(stepFireImage, stand.x, stand.y-30, 265, 60);
  // add gravity 
  //thor.velocityY = thor.velocityY + 0.5;

  for(var step of steps){
    step.shapeColor = rgb(255, 255);
      image(stepFireImage, step.x, step.y-18, 200, 50)

  }
  for(var ellipse of left_ellipses){
    ellipse.display(255,192, 203, 200);
  }
  for(var ellipse of right_ellipses){
    ellipse.display(255,192, 203, 200);
  }
   /*for(var ellipse of ellipse_swords){
    ellipse.display(57,255, 20, 70);
   }*/


if(steps !== undefined){


  // steps[0] velocity set
  if(right_change[0] === RIGHT){
      steps[0].velocityX = 1.5;
  }
  if(steps[0].x > width-150){
      right_change[0] = LEFT;
      steps[0].velocityX = -1.5;
  }
  if(steps[0].x < 150){
      steps[0].velocityX = 1.5;
  }

  // steps[2] velocity set
  if(right_change[1] === RIGHT){
    steps[2].velocityX = 3;
  }
  if(steps[2].x > width-150){
      right_change[1] = LEFT;
      steps[2].velocityX = -3;
  }
  if(steps[2].x < 150){
      steps[2].velocityX = 3;
  }
  
  // steps[4] velocity set
  if(right_change[2] === RIGHT){
    steps[4].velocityX = 2;
  }
  if(steps[4].x > width-150){
    right_change[2] = LEFT;
    steps[4].velocityX = -2;
  }
  if(steps[4].x < 150){
    steps[4].velocityX = 2;
  }
  
  // steps[6] velocity set
  if(right_change[3] === RIGHT){
    steps[steps.length-1].velocityX = 5;
  }
  if(steps[steps.length-1].x > width-150){
    right_change[3] = LEFT;
    steps[steps.length-1].velocityX = -5;
  }
  if(steps[steps.length-1].x < 150){
    steps[steps.length-1].velocityX = 5;
  }
  
  // steps[1] velociy set 
  if(left_change[0]=== LEFT){
    steps[1].velocityX = -3;
  }
  if(steps[1].x < 150){
    left_change[0] = RIGHT;
    steps[1].velocityX = 3;
  }
  if(steps[1].x > width-150){
    steps[1].velocityX = -3;
  }

  // steps[3] velociy set 
  if(left_change[1]=== LEFT){
    steps[3].velocityX = -2;
  }
  if(steps[3].x < 150){
    left_change[1] = RIGHT;
    steps[3].velocityX = 2;
  }
  if(steps[3].x > width-150){
    steps[3].velocityX = -2;
  }

  // steps[5] velociy set 
  if(left_change[2]=== LEFT){
    steps[5].velocityX = -3;
  }
  if(steps[5].x < 150){
    left_change[2] = RIGHT;
    steps[5].velocityX = 3;
  }
  if(steps[5].x > width-150){
    steps[5].velocityX = -3;
  }
}
if(deaths !== undefined){

    for(var i = 0; i < steps.length; i++){

      let right = steps[i].velocityX;
      let left = -steps[i].velocityX

      if(steps[i].velocityX === right){
        if(death_V_change[i]===0){
          deaths[i].velocityX = -3.5
        }
        if(deaths[i].x <= steps[i].x -80){
          death_V_change[i]= 1 ;

          deaths[i].velocityX = 3.5;
        }
        if(deaths[i].x >= steps[i].x +80){
          deaths[i].velocityX = -3.5;
        }
        
    
      }
      if(steps[i].velocityX === left){
        if(death_V_change[i+1]===0){
          deaths[i].velocityX = -3.5;
        }
        if(deaths[i].x <= steps[i].x -80){
          death_V_change[i+1] = 1;
          deaths[i].velocityX = 3.5;
        }
        if(deaths[i].x >= steps[i].x +80){
          deaths[i].velocityX = -3.5;
        }
    } 
    deaths[deaths.length-1].velocityX = steps[steps.length-1].velocityX;

    setTimeout(() => {
      if(deaths[1].y > 140){
      deaths[1].velocityY = -1;}
      if(deaths[1].y < 100){
        deaths[1].velocityY = 1;
      }    
    }, 1000);

    setTimeout(() => {
      if(deaths[deaths.length-1].y > height-130){
      deaths[deaths.length-1].velocityY = -1;}

      if(deaths[deaths.length-1].y < height-140){
        deaths[deaths.length-1].velocityY = 1;
      }    
    }, 1000);
    
    }
}
    for(var i = 0; i< 7; i++){

      if(weapon_visible[i] === 0){
        weapons[i].visible = false;
    
      }
      if(weapon_visible[i] === 1){
        weapons[i].visible = true;
      }
    if(weapon_visible[i] === 2){

      var weapons_feedback_y =
      [ (height-100) - 0*100,
        (height-100) - 1*100,
        (height-100) - 2*100,
        (height-100) - 3*100,
        (height-100) - 4*100,
        (height-100) - 5*100,
        (height-100) - 6*100
      ];
      weapons[i].position.x = width - 60;
      weapons[i].position.y = weapons_feedback_y[i];
      weapons[i].scale = 0.15;
  
      }
    }
if(weapons !== undefined){
// [0]
    if(weapon_visible[0]=== 1 && thor.isTouching(weapons[0])){
        weapon_visible[0] = 2
    }
    if(weapon_visible[0] === 2 && thor.isTouching(steps[0])){
      deaths[0].visible = false;
      if(death_feedback[0] === 0){
        death_feedback[0] = 1;
      }
    }if(death_feedback[0]===1){
      deathFeedbacks[0].visible = true;
      weapon_visible[1] = 1;
    }
// [1]  
  if(weapon_visible[1]=== 1 && thor.isTouching(weapons[1])){
      weapon_visible[1] = 2
  }
if(weapons[1].x === width - 60){
  if(thor.isTouching(steps[1])){
    deaths[1].visible = false;
    if(death_feedback[1] === 0){
      death_feedback[1] = 1;
    } }
  }if(death_feedback[1]===1){
    deathFeedbacks[1].visible = true;
    weapon_visible[2] = 1;
  }

// [2]  
if(weapon_visible[2]=== 1 && thor.isTouching(weapons[2])){
  weapon_visible[2] = 2
}
if(weapons[2].x === width - 60){
if(thor.isTouching(steps[2])){
  deaths[2].visible = false;
    if(death_feedback[2] === 0){
      death_feedback[2] = 1;
    } }
}if(death_feedback[2]===1){
    deathFeedbacks[2].visible = true;
    weapon_visible[2+1] = 1;
}

// [3]  
if(weapon_visible[3]=== 1 && thor.isTouching(weapons[3])){
  weapon_visible[3] = 2
}
if(weapons[3].x === width - 60){
if(thor.isTouching(steps[3])){
  deaths[3].visible = false;
    if(death_feedback[3] === 0){
      death_feedback[3] = 1;
    } }
}if(death_feedback[3]===1){
    deathFeedbacks[3].visible = true;
    weapon_visible[3+1] = 1;
}

// [4]  
if(weapon_visible[4]=== 1 && thor.isTouching(weapons[4])){
  weapon_visible[4] = 2
}
if(weapons[4].x === width - 60){
if(thor.isTouching(steps[4])){
  deaths[4].visible = false;
    if(death_feedback[4] === 0){
      death_feedback[4] = 1;
    } }
}if(death_feedback[4]===1){
    deathFeedbacks[4].visible = true;
    weapon_visible[4+1] = 1;
}

// [5]  
if(weapon_visible[5]=== 1 && thor.isTouching(weapons[5])){
  weapon_visible[5] = 2
}
if(weapons[5].x === width - 60){
if(thor.isTouching(steps[5])){
  deaths[5].visible = false;
    if(death_feedback[5] === 0){
      death_feedback[5] = 1;
    } }
}if(death_feedback[5]===1){
    deathFeedbacks[5].visible = true;
    weapon_visible[5+1] = 1;
}

// [6]  
if(weapon_visible[6]=== 1 && thor.isTouching(weapons[6])){
  weapon_visible[6] = 2
}
if(weapons[6].x === width - 60){
  if(thor.isTouching(steps[6])){
    deaths[6].visible = false;
    if(death_feedback[6] === 0){
      death_feedback[6] = 1;
    } }
}if(death_feedback[6]===1){
    deathFeedbacks[6].visible = true;
    weapon_visible[6+1] = 1;
}

}



  // move thor 
  if(keyDown(LEFT_ARROW)){
    //thor.y -=10;
    thor.x -=10;
  }
  if(keyDown(RIGHT_ARROW)){
    //thor.y -=10;
    thor.x +=10;
  }
  if(keyDown(DOWN_ARROW)){
    thor.y +=10;
  }
  if(keyDown(UP_ARROW)){
    thor.y -=10;
  }

  // collide
  thor.collide(stand);
  thor.collide(ground);
  thor.collide(stepOn)
  for (var i = 0; i< steps.length; i++){
    stepsOn[i].x = steps[i].x;
    thor.collide(stepsOn[i]); 

    for(var step of steps){

      if(thor.isTouching(steps[i])){
        thor.velocityX = steps[i].velocityX
      }
      if(!thor.isTouching(steps)){
        thor.velocityX = 0;    }
    }

    
  }
  
  
  
  
  
               
}
function play_level_2(){
  background(backgroundImg3);  
  // fire image
  imageMode(CENTER);
  image(fireImg, startPoint.x+5, startPoint.y-20, 270, 50);

  thor2.collide(right_wall);
  thor2.collide(left_wall);

//life time increase 
  let numArray = [0 ,0 ,0 ,0 ,0];
  for(var i=0; i<lifesV.length; i++){

    if( i % 2===0){
      lifes[i].rotation -= 5;
      lifesV[i].rotation += 5;
    }
    if( i % 2!==0){
      lifes[i].rotation += 7;
      lifesV[i].rotation -= 7;
    }
   if(thor2.isTouching(lifes[i])){
     lifeTouch.play();
    lifes[i].destroy();
    lifeTime +=1;
    //lifesV[i].visible = true;
    numArray[i]=1;
  }

  // trial 
  if(lifeTime === 2){
    lifesV[0].visible = true;
  }if(lifeTime === 3){
    lifesV[1].visible = true;
  }if(lifeTime === 4){
    lifesV[2].visible = true;
  }if(lifeTime === 5){
    lifesV[3].visible = true;
  }if(lifeTime === 6){
    lifesV[4].visible = true;
  }

  if(lifeEnd === 2){
    lifesV[0].changeImage('noLifeImg');
  }if(lifeEnd === 3){
    lifesV[1].changeImage('noLifeImg');
  }if(lifeEnd === 4){
    lifesV[2].changeImage('noLifeImg');
  }if(lifeEnd === 5){
    lifesV[3].changeImage('noLifeImg');
  }if(lifeEnd === 6){
    lifesV[4].changeImage('noLifeImg');
  }


      if(numArray[i] === 1){
        if(i===0){
          thor2.x = steps1[3].x;
          thor2.y = steps1[3].y - 30;
        }
        if(i===1){
          thor2.x = steps1[0].x;
          thor2.y = steps1[0].y - 30;
        }
        if(i===2){
          thor2.x = steps2[2].x;
          thor2.y = steps2[2].y - 30;
        }
        if(i===3){
          thor2.x = steps1[0].x;
          thor2.y = steps1[0].y - 30;
        }
        if(i===4){
          thor2.x = steps2[0].x;
          thor2.y = steps2[0].y - 30;
        }
        
      } 
      setTimeout(() => {
        numArray[i]=0;
      }, 2000);

     
  
  }
  
// animation for sword
  fireRing.rotation -=10;
  thorShield.rotation +=10;
  if(shoot !== undefined){
    shoot.rotation -=25
  }
// thorShield
  thorShield.display(140, 225, 220, 255);
  thorShield.x = thor2.x ;
  thorShield.y = thor2.y - 5 ;

// move steps
  for(i = 0; i< steps1.length; i++){
    var randSpeed = [6, 1, 3, 6, 4, 7, 5];

    if(steps1[i].x > width-150){
      array0[i]=1;
    }
    if(steps1[i].x <150){
      array0[i]=0;
    }
    if(array0[i]===0){
      steps1[i].velocityX = randSpeed[i];

    }else if(array0[i]===1){
      steps1[i].velocityX = -randSpeed[i];
    }
    fireSteps1[i].velocityX = steps1[i].velocityX;
    stepsOn1[i].x = steps1[i].x;
    thor2.collide(stepsOn1);
  }

  for(i = 0; i< steps2.length; i++){
    var randSpeed = [3, 7, 5, 6, 7, 4, 3];

    if(steps2[i].x > width-150){
      array1[i]=1;
    }
    if(steps2[i].x <150){
      array1[i]=0;
    }
    if(array1[i]===0){
      steps2[i].velocityX = randSpeed[6-i];

    }else if(array1[i]===1){
      steps2[i].velocityX = -randSpeed[6-i];
    }
    fireSteps2[i].velocityX = steps2[i].velocityX;
    stepsOn2[i].x = steps2[i].x;
    thor2.collide(stepsOn2);
// thor2 velocity is eqaul to step valocity when touch steps 
// shoot fire when thor2 is touching steps
      if(thor2.isTouching(steps2[i])){
        thor2.velocityX = steps2[i].velocityX;
        shoot_fire(-100, steps2[i].y - 23, fireShootImg1, 0.07, 10);

      }
      if(thor2.isTouching(steps1[i])){
        thor2.velocityX = steps1[i].velocityX;
        shoot_fire(width+100, steps1[i].y - 23, fireShootImg2, 0.09, -10);
      }

       if(!thor2.isTouching(steps1) && !thor2.isTouching(steps2)){
          thor2.velocityX = 0;    }
      
    

  }

  // lifeTime decrease 
  if(thor2.isTouching(shootFireGroup)){
      shootFireGroup.destroyEach();
      lifeEnd += 1 ;
      hitSound.play();
      
      //bring thor to initial position when touch fire 
      let change = true;
      if(change){
      thor2.x = steps2[6].x;
      thor2.y = steps2[6].y - 30;
      }
      setTimeout(() => {
        change = false;
      }, 3000);
      
    }
  
// fire animation 
  if(fireMove.x >= startPoint.x -10){
    fireMove.velocityX = -5 }
  
  if(fireMove.x < startPoint.x - 100){
    fireMove.velocityX = 5 }

  // move thor 
     //gravity to thor
  thor2.velocityY += 0.5;
  
    // thor collide
  thor2.collide(startPoint);
  thor2.collide(ground);

  if(keyDown(LEFT_ARROW)){
    thor2.x -=5;
    thor2.changeImage('thorLeft');
    }
  if(keyDown(RIGHT_ARROW)){
    thor2.x +=5;
    thor2.changeImage('thorRight');
  }
  if(keyDown(32)){
    thor2.y -=6.578;
  }
  // if(keyDown(DOWN_ARROW)){
  //   thor2.y +=6.578
  // }

  // game over 
  if(thor2.isTouching(ground3)){
    gameState = GAME_END2;
    if(music1){
      music3.play();
      music3.setVolume(2);
      music2.play();
      music2.setVolume(0.3)
      music.stop();
    }music1 = false;
  }
  if(thor2.isTouching(fireRing)){
      gameState = GAME_END2;
      if(music1){
        dragonFire.play();
        dragonFire.setVolume(2);
        music2.play();
        music2.setVolume(0.3)
        music.stop();
      }music1 = false;
  }
  if(thor2.isTouching(steps1[0]) && steps1[0].isTouching(fireRing)){
      setTimeout(() => {
        gameState = GAME_END2;
        if(music1){
          music3.play();
          music3.setVolume(2);
          music2.play();
          music2.setVolume(0.3)
          music.stop();
        }music1 = false;
      }, 100);
    }
  let x = lifeEnd - lifeTime 
    if(x >=1){
      gameState = GAME_END2;
      if(music1){
        music3.play();
        music3.setVolume(2);
        music2.play();
        music2.setVolume(0.3)
        music.stop();
      }music1 = false;
    }

// win state 
if(thor2.isTouching(rectangle)||thor2.isTouching(square)){
  window.open("https://swagatika244.github.io/Initial-2.github.io/");
  close();
}

    
  
}
    function shoot_fire(x, y, image, scale, velocity){
      if(frameCount %180 === 0){
      shoot = createSprite (x , y) ;
      shoot.addImage(image) ;
      shoot.scale = scale ;
      shoot.debug = false;
      shoot.setCollider("circle", 0, 0, 30)
      
      shoot.velocityX = velocity ;
      shoot.lifetime = 350 ;
      shootFireGroup.add(shoot) ;
      }
    }
    
function gameEnd2(){ 

  shootFireGroup2 = new Group();

  gameOver = createElement('h1', 'GAME OVER');
  gameOver.position(100, height/2-350);
  gameOver.class('resetText'); 
  gameOver.hide();
  
  signature = createElement('h2', 'by Swagatika');
  signature.position(15,height - 80);
  signature.class('signature');
  signature.hide();

  // button for end gameState 
  retryBtn = createButton("Retry");
  retryBtn.position(215, height/2-60);
  retryBtn.class('button');
  retryBtn.hide();
  retryBtn.mouseClicked(()=>{
    window.location.reload();
  });   

  restartBtn = createButton("Restart");
  restartBtn.position(500, height/2-60);
  restartBtn.class('button');
  restartBtn.hide();
  restartBtn.mouseClicked(()=>{
    window.open("https://swagatika244.github.io/Initial.github.io/");
    close();
  });   

  share = createElement('h2','Would you like to challenge this game to someone?');
  share.position(105, height/2+90);
  share.class('share');
  share.hide();

  copyInput = createInput("https://swagatika244.github.io/Initial.github.io/");
  copyInput.position(390, height/2+150+70);
  copyInput.size(300, 40);
  copyInput.class('inputBox');
  copyInput.hide();

  copyshare = createElement('h1','Copy & Share');
  copyshare.position(210, height/2+142+70);
  copyshare.class('copyShare');
  copyshare.hide();

  const val = copyInput.value();
  console.log(val)

}
  function design_shoot(){
    if(frameCount %120 === 0){
      shoot2 = createSprite (-10 , 152) ;
      shoot2.addImage(fireShootImg1) ;
      shoot2.scale = 0.1 ;
      shoot2.debug = false;
      shoot2.setCollider("circle", 0, 0, 30);
      
      shoot2.velocityX = 10 ;
      shoot2.lifetime = 90 ;
      shootFireGroup2.add(shoot2) ;
      }
    }
  
function game_end_2(){
  background(backgroundImg4);  
  design_shoot();
  if(shoot2 !== undefined){
    shoot2.rotation +=25
  }

  for(var i=0; i< steps1.length; i++){
    steps1[i].destroy();
    stepsOn1[i].destroy();
    fireSteps1[i].destroy();

    steps2[i].destroy();
    stepsOn2[i].destroy();
    fireSteps2[i].destroy();
  }
  for(var i=0; i< lifesV.length; i++){
    lifesV[i].destroy();
    lifes[i].destroy();
  }
  startPoint.destroy();
  keyWeapon.destroy();
  fireRing.destroy();
  fireMove.destroy();
  thor2.destroy();
  thorShield.destroy();
  shootFireGroup.destroyEach();

  gameOver.show();
  //signature.show();
  retryBtn.show();
  restartBtn.show();
  share.show();
  copyInput.show();
  copyshare.show();
  signature1.show();

}
function musicPlay(){
  swal(
    {
      title: `Music`,
      text: "Do you want background-music?",
      imageUrl:
        "assets/m.png",
      imageSize: "230x150",
      confirmButtonText: "Yes",
      confirmButtonColor: "black",
      showCancelButton: true,
      cancelButtonText: "No", 
      cancelButtonColor: "black",
    },
    function(isConfirm) {
        if (isConfirm) {
          music.loop();
          music.setVolume(0.3);
      }
    }
  );
  
}


