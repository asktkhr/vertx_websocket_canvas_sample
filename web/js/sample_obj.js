(function(window){
  var SampleObj = function(ctx, options){
    this.ctx = ctx;
    this.position = options.position || {x:0, y:0};
    this.width = options.size.width || 50;
    this.height = options.size.height || 50;
    this.a = options.acceleration || { x: 0, y: 1};
    this.speed = options.speed || { x: 0, y: 0};
    this.color = options.color || "#cecebb";
    this.isMove = true;
  }

  SampleObj.prototype.detectCollision = function(other){
    var diff = (this.position.y + this.height) - other.position.y;
    if(Math.abs(other.position.x - this.position.x) > this.width) return;
    if(diff >= 0){
      this.position.y = other.position.y - this.height;
      this.isMove = false;
    }
  }

  SampleObj.prototype.draw = function(){
    this.ctx.save();
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    this.ctx.restore();
    if(!this.isMove) return;

    var border = this.ctx.canvas.height - this.width;
    if(this.position.y >= border){
      this.isMove = false;
    } else {
      this.speed.x = this.speed.x + this.a.x;
      this.speed.y = this.speed.y + this.a.y;
      this.position.x = this.position.x + this.speed.x;
      this.position.y = this.position.y + this.speed.y;
      if(this.position.y > border){
        this.position.y = border;
      }
    }
  }

  window.SampleObj = SampleObj;
})(window);
