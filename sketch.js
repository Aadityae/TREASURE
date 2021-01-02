var FruitGroup,EnemyGroup;
var Fruits,Aliens
var Fruit_Image1,Fruit_Image2,Fruit_Image3,Fruit_Image4;
var Alien_Image1,Alien_Image1;

var Sword,Sword_Image;

var PLAY=1;
var END=0;
var Gamestate=PLAY;

var Score;
var Gameover,Gameover_image;

function preload()
{
 Fruit_Image1=loadImage("fruit1.png");
 Fruit_Image2=loadImage("fruit2.png");
 Fruit_Image3=loadImage("fruit3.png");
 Fruit_Image4=loadImage("fruit4.png");
 
 Alien_Image1=loadAnimation("alien1.png");
 
  Sword_Image=loadImage("sword.png");
  
  Gameover_image=loadImage("gameover.png");
}

function setup()
{
  createCanvas(600,600);
  
  Sword = createSprite(40,200,20,20);
  Sword.addImage(Sword_Image);
  Sword.scale = 0.7;
  
  FruitGroup = createGroup();
  EnemyGroup = createGroup();
  
  Score=0;
   // Sword.debug = true;
  Sword.setCollider("rectangle",0,0,40,60);
  
}




function draw()
{
  background("lightblue");
  
  text("Score:"+ Score,500,50);
  
  if(Gamestate===PLAY)
    {
      fruits();
      Enemy();
      
      Sword.y=World.mouseY;
      Sword.x=World.mouseX;
      
      if(FruitGroup.isTouching(Sword))
        {
          FruitGroup.destroyEach();
          Score=Score+2;
        }
      
      if(EnemyGroup.isTouching(Sword))
        {
          Gamestate=END;
        }

    } else if(Gamestate===END)
      {
     FruitGroup.destroyEach();
     EnemyGroup.destroyEach();
     FruitGroup.setVelocityEach(0)
     EnemyGroup.setVelocityEach(0)

     Sword.addImage(Gameover_image);
     Sword.x =300;
     Sword.y =300;
      }

  drawSprites();
}

function fruits()
{
  if(frameCount % 80===0)
    {
     Fruits = createSprite(400,200,20,20);
     Fruits.scale = 0.2;
  
     r=Math.round(random(1,4))
     if(r===1)
        {
          Fruits.addImage(Fruit_Image1)
        } else if (r===2) {
          Fruits.addImage(Fruit_Image2)
        } else if (r===3) {
          Fruits.addImage(Fruit_Image3)
        } else if (r===4) {
          Fruits.addImage(Fruit_Image4)
        }
      
      Fruits.y = Math.round(random(50,340));
      Fruits.velocityX = -7
      Fruits.setLifetime = 100;
      FruitGroup.add(Fruits);
    }
}

function Enemy()
{
  if(frameCount % 100===0)
    {
      Aliens = createSprite(400,200,20,20);
      Aliens.addAnimation("Image1",Alien_Image1);
      Aliens.y=Math.round(random(100,300));
      Aliens.velocityX = -8;
      Aliens.setlifetime = 50;
      EnemyGroup.add(Aliens);
    }
}

