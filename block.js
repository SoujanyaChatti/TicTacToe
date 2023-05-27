class Blocks {
    constructor(x, y, width, height) {
      var options = {
        isStatic: true
      };

      this.body = Bodies.rectangle(x, y, width, height, options);
      World.add(world, this.body);
      this.width = width;
      this.height = height;
      this.isWinner=false;
      this.color = "skyblue"; // Initial color of the block
    }
  
    display() {
      var pos = this.body.position;
      rectMode(CENTER);
      fill(this.color); // Use the current color
      rect(pos.x, pos.y, this.width, this.height);
      if (this.isWinner) {
        // If the block is part of the winning combination, draw a line through it
        stroke(0);
        strokeWeight(5);
        line(this.x - this.width / 2, this.y, this.x + this.width / 2, this.y);
      }
    }
  
    contains(x, y) {
      // Check if the given coordinates are inside the block
      var pos = this.body.position;
      return x > pos.x - this.width / 2 && x < pos.x + this.width / 2 && y > pos.y - this.height / 2 && y < pos.y + this.height / 2;
    }
  
    changeColor(newColor) {
      // Change the color of the block
      this.color = newColor;
    }
  }
  