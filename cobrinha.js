
class Cobrinha{
    constructor(x, y, size){
        this.x = x
        this.y = y
        this.size = size
        this.tail = [{x:this.x, y:this.y}]
        this.rotateX = 0
        this.rotateY = 1

    }

    move(){
        var newRect;;
        if(this.rotateX == 1){
            newRect = {
                x: this.tail[this.tail.length - 1].x + this.size,
                y: this.tail[this.tail.length - 1].y
            }
        } else if(this.rotateX == -1){
        newRect = {
            x: this.tail[this.tail.length - 1].x - this.size,
            y: this.tail[this.tail.length - 1].y
        }
    } else if(this.rotateY == 1){
        newRect = {
            x: this.tail[this.tail.length - 1].x,
            y: this.tail[this.tail.length - 1].y + this.size
        }
    } else if(this.rotateY == -1){
        newRect = {
            x: this.tail[this.tail.length - 1].x,
            y: this.tail[this.tail.length - 1].y - this.size
        }
    }

    this.tail.shift()
    this.tail.push(newRect)
}
}


class Maca{
    constructor(){
        console.log("maca")
        console.log(cobrinha.size)
        var isTouching;
        while(true){
            isTouching = false;
            this.x = Math.floor(Math.random() * canvas.width / cobrinha.size) * cobrinha.size
            this.y = Math.floor(Math.random() * canvas.height / cobrinha.size) * cobrinha.size
            for(var i = 0; i < cobrinha.tail.length;i++){
                if(this.x == cobrinha.tail[i].x && this.y == cobrinha.tail[i].y){
                    isTouching = true
                }
            }
            console.log(this.x , this.y)
            if(!isTouching){
                break;
            }
            this.color = "pink"
            this.size = cobrinha.size
            
        }
    }
}

var canvas = document.getElementById("canvas")

var cobrinha = new Cobrinha(20,20,20);

var maca = new Maca();

var canvasContext = canvas.getContext('2d');

window.onload = ()=>{
    gameLoop();
}

function gameLoop(){
    setInterval(show, 1000/15) 
}

function show(){
    update();
    draw();
}


function update(){
    canvasContext.clearRect(0,0, canvas.width, canvas.height)
    console.log("update")
    cobrinha.move()
    eatMaca()

}

function eatMaca(){
    if(cobrinha.tail[cobrinha.tail.length - 1].x == maca.x &&
        cobrinha.tail[cobrinha.tail.length - 1].y == maca.y){
            cobrinha.tail[cobrinha.tail.length] = {x:maca.x, y: maca.y}
            maca = new Maca();
        }
}

function draw(){
    createRect(0,0,canvas.width, canvas.height, "black")
    createRect(0,0, canvas.width, canvas.height)
    for(var i =0; i < cobrinha.tail.length; i++){
        createRect(cobrinha.tail[i].x + 2.5, cobrinha.tail[i].y + 2.5,
            cobrinha.size - 5, cobrinha.size- 5, 'white')
    }

    canvasContext.font = "20px Arial"
    canvasContext.fillStyle = "#00FF42"
    canvasContext.fillText("Score: ", (cobrinha.tail.length +1), 
    canvas.width -120, 18 );
    createRect(maca.x, maca.y, maca.size, maca.size, maca.color)
}

function createRect(x,y,width, height,color){
    canvasContext.fillStyle = color
    canvasContext.fillRect(x,y,width,height)
}

window.addEventListener("keydown", (event)=>{
    setTimeout(()=>{
        if(event.keyCode == 37 && cobrinha.rotateX != 1){
            cobrinha.rotateX = -1
            cobrinha.rotateY = 0;
        } else if(event.keyCode == 38 && cobrinha.rotateY != 1){
            cobrinha.rotateX = 0
            cobrinha.rotateY = -1;
        }else if(event.keyCode == 39 && cobrinha.rotateX != -1){
            cobrinha.rotateX = 1
            cobrinha.rotateY = 0;
        }
        else if(event.keyCode == 40 && cobrinha.rotateY != -1){
            cobrinha.rotateX = 0
            cobrinha.rotateY = 1;
        }
    }, 1)
})