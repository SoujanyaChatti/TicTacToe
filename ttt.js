var button;
var g1_state = false;
var g2_state = false;
var blocks = [];
let buttonClicked = false;
let gamestate = false;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var engine, world;
let x;
let y,d1,d2;

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;

  // Create blocks in a 3x3 grid
  const blockSize = 100;
  const startX = 50;
  const startY = 50;
  const gap = 1;
  button = new Blocks(60,75,100,50);
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const x = 250 + col * (blockSize + gap);
      const y = 300+ row * (blockSize + gap);
      const block = new Blocks(x, y, blockSize, blockSize);
      blocks.push(block);
    }
  }
}
function showgamegrid(){
   
  var tie_state = 0;
 

   
  // Display all blocks
  for (let i = 0; i < blocks.length; i++) {
    blocks[i].display();
  }

  for (let i=0;i<blocks.length;i++){
    if(blocks[i].color === "red" || blocks[i].color === "blue"){
      tie_state++;
    }
  }
  if(tie_state===9 && !g1_state && !g2_state){
    game_over = true;
    tie_state = 0;
  }
  if (game_over) {
    textSize(50);
    fill("black")
    text("GAME OVER", width / 4, height / 6);
    if (g1_state) {
      
      text("Player 1 Wins!", width / 4, height / (5/4));
     
    } else if (g2_state) {
      text("Player 2 Wins!", width / 4, height / (5/4));
    }
    else{
      text("TIE",width/4,height/(5/4));
    }

    stroke(0);
    strokeWeight(5);
    line(150+(100*x),200,150+(100*x),600);
    
    line(150,200+(100*y),550,200+(100*y));
    if(d1){
    line(150,200 , 550,600 )
    }
    if(d2){
      line(550,200 , 150,600 )
    }
  
}
  }
function draw() {
  rectMode(CENTER);
  background("pink");
  Engine.update(engine);
if(!gamestate){  
  button.display();
  textSize(20);
  fill("red");
  text("START",30,80);
  
}
  if(mouseIsPressed && button.contains(mouseX,mouseY)){
    buttonClicked = true;
    gamestate = true;
  }
  if(buttonClicked){
   showgamegrid();
  
  }

  drawSprites();
  }

  

var currentPlayer = 1; // 1 for Player 1, 2 for Player 2
var game_over = false;

function mouseClicked() {
  if (game_over) {
    return; // Do nothing if the game is over
  }

  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].contains(mouseX, mouseY) && blocks[i].color === "skyblue") {
      if (currentPlayer === 1) {
        blocks[i].changeColor("red");

        currentPlayer = 2; // Switch to Player 2's turn
        checkWin("red"); // Check if player 1 has won
      } else if (currentPlayer === 2) {
        blocks[i].changeColor("blue");
        currentPlayer = 1; // Switch to Player 1's turn
        checkWin("blue"); // Check if player 2 has won
      }
      break; // Stop the loop after finding the clicked block
    }
  }
}
// Function to draw lines connecting the winning blocks



function checkWin(player) {
  // Check rows
  let winningBlocks=[];
  for (let i = 0; i < 3; i++) {
    if (
      blocks[i * 3].color === player &&
      blocks[i * 3 + 1].color === player &&
      blocks[i * 3 + 2].color === player
    ) {
     
      y=i+1;
      if (player === "red") {
        g1_state = true;
      } else if (player === "blue") {
        g2_state = true;
      }
      game_over = true;
    }
  }

  // Check columns
  for (let i = 0; i < 3; i++) {
    if (
      blocks[i].color === player &&
      blocks[i + 3].color === player &&
      blocks[i + 6].color === player
    ) {
   
      x=i+1;
      if (player === "red") {
        g1_state = true;
      } else if (player === "blue") {
        g2_state = true;
      }
      game_over = true;
    }
  }

  // Check diagonals
  if (
    blocks[0].color === player &&
    blocks[4].color === player &&
    blocks[8].color === player
  ) {
    d1 =  true;
    if (player === "red") {
      g1_state = true;
    } else if (player === "blue") {
      g2_state = true;
    }
    game_over = true;
  }
  
  if (
    blocks[2].color === player &&
    blocks[4].color === player &&
    blocks[6].color === player
  ) {
     d2 = true;
    if (player === "red") {
      g1_state = true;
    } else if (player === "blue") {
      g2_state = true;
    }
    game_over = true;
  }
}
