let screen; // canvas context
let componentRegister = Array();

function init() {
    var canv = document.getElementById("screen");
    canv.width = 800;
    canv.height = 600;

    screen = canv.getContext("2d");
    
    setInterval(drawFrame, 1000/30);
    let ttr =  new component(150*1.7, 180*1.7, 1, 1, "img/choinka.png");
    let prezent1 = new component(100, 100, -1, 1, "img/prezent.png");
    let prezent2 = new component(100, 100, 1, 1, "img/prezent.png");
    let star = new component(100, 100, 1, 1, "img/star.png");
    
    star.direction = 1;
    star.speed = 5;
    star.update = function() {
        if(this.posX < 90) {
            this.direction = 1;
            this._scaleX = 1;
        }
        if(this.posX > 700) {
            this._scaleX = -1;
            this.direction = -1;
        }

        this.posX += this.direction * this.speed;
    };
    
    componentRegister[componentRegister.length] = ttr;
    componentRegister[componentRegister.length] = prezent1;
    componentRegister[componentRegister.length] = prezent2;
    componentRegister[componentRegister.length] = star;
    ttr.posX = 600;
    ttr.posY = 460;

    prezent1.posX = 400;
    prezent1.posY = 560;

    prezent2.posX = 750;
    prezent2.posY = 560;
    prezent2.scaleX = -1;
    
    star.posX = 100;
    star.posY = 100;

}

function clearScreen(clearColor) {
    screen.fillStyle = clearColor;
    screen.fillRect(0, 0, window.innerWidth, window.innerHeight);
}

var component = function(width, height, scaleX, scaleY, imgSrcName) {
    this.posX = 0;
    this.posY = 0;
    this.isEnabled = false;
    this.imgObj = new Image();
    this.imgObj['owner'] = this;
    this.imgObj.onload = function() {
        this['owner'].isEnabled = true;
    }
    this.imgObj.src = imgSrcName;

    this._width = width;
    this._height = height;
    this._scaleX = scaleX;
    this._scaleY = scaleY;
    this._rotation = 0;
    
    this.update = function() { };

    this.draw = function() {
        screen.save();
        screen.scale(this._scaleX, this._scaleY);
        
        screen.drawImage(this.imgObj, 
            this.posX * this._scaleX - .5 * this._width,
            this.posY * this._scaleY - .5 * this._height,
            this._width,
            this._height
        );
        
        screen.restore();
    };
}

function drawXmassMessage() {
    screen.font = "30px Arial";
    screen.fillStyle = "yellow";
    screen.textAlign = "center";
    screen.fillText("Wesołych Świąt",300, 240);
    screen.fillText("i Szczęśliwego Nowego Roku", 300, 280);
    screen.fillText("życzy Anna Anastazja", 300, 320);
    screen.fillText("z rodziną.", 300, 360);
}

function drawFrame() {
    clearScreen("#105");
    for(let i = 0; i < componentRegister.length; i++) {
        if(componentRegister[i].isEnabled === true) {
	    componentRegister[i].update();
            componentRegister[i].draw();
        }
    }
    drawXmassMessage();
}