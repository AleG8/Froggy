import {Frog} from '/scripts/class.js';
import {waterRails, carRails} from '/scripts/rails.js';

const $reloadBtn = document.querySelector('.reloadBtn');
const $canvas = document.querySelector('#canvas');
const ctx = $canvas.getContext('2d');

let frogger = new Frog(30, 30, $canvas.width / 2 - 15, $canvas.height - 30);
let keypress = false;
let gameOn = true;
let raf;

//Grid
function drawGrid(){
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    for(let i = 30; i < 450; i+= 30){
        //Columns
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, $canvas.height);
        ctx.stroke();
        //Rows
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo($canvas.width, i);
        ctx.stroke();
    };
    //Water area
    ctx.fillStyle = '#0093BA';
    ctx.fillRect(
        0, 
        60, 
        $canvas.width, 
        120
    );
};

function background(){
    //Win area
    ctx.fillStyle = '#BABA00';
    ctx.fillRect(
        0, 
        0, 
        $canvas.width, 
        60
    );
    //sidewalks
    ctx.fillStyle = '#4F4F4F';
    ctx.fillRect(
        0, 
        180, 
        $canvas.width, 
        60
    );
    ctx.fillRect(
        0, 
        $canvas.height - 60, 
        $canvas.width, 
        60
    );
    //steet
    ctx.fillStyle = '#757575';
    ctx.fillRect(
        0, 
        240, 
        $canvas.width, 
        150
    );
}

function gameLoop(){
    ctx.clearRect(0, 0, $canvas.width, $canvas.height);
    background();
    drawGrid();

    //rails
    [waterRails, carRails].forEach((rails, indexRails) =>{
        for(let rail in rails){
            rails[rail].forEach(obstacle =>{
                // make obstacle wrap the screen
                if (obstacle.x + obstacle.width < 0) {
                    obstacle.x = $canvas.width;
                }
                else if (obstacle.x > $canvas.width) {
                    obstacle.x = -obstacle.width;
                }
                //draw obstacle
                ctx.fillStyle = obstacle.color;
                ctx.fillRect(
                    obstacle.x,
                    obstacle.y,
                    obstacle.width,
                    obstacle.height
                );
                //Car features
                if(indexRails === 1){
                    //Wheels
                    ctx.fillStyle = '#000';
                    ctx.fillRect(
                        obstacle.x + obstacle.width / 7,
                        obstacle.y + 25,
                        8,
                        8
                    );
                    ctx.fillRect(
                        obstacle.x + obstacle.width - 15,
                        obstacle.y + 25,
                        8,
                        8
                    );
                    // Glass
                    ctx.fillStyle = '#fff';
                    ctx.fillRect(
                        obstacle.x + obstacle.width / 6,
                        obstacle.y + 5,
                        obstacle.width / 1.5,
                        8
                    );
                }
                obstacle.move(obstacle.dir);

                //Collision of car and logs
                if(
                    frogger.y === obstacle.y &&
                    frogger.x < obstacle.x + obstacle.width &&
                    frogger.x + frogger.width > obstacle.x
                ){
                    //water area
                    if(frogger.y < 180 && frogger.y + frogger.height > 60){
                        frogger.x += obstacle.dir === 'left'
                        ? -obstacle.speed
                        : obstacle.speed;
                    };
                    //cars area
                    if(frogger.y > 240){
                        Object.assign(frogger, {
                            x: $canvas.width / 2 - 15,
                            y: $canvas.height - 30
                        });
                    }
                }
                //If the frogger falls into the water
                //'0,147,186' = water frame color
                if(
                    frogger.nextColorFrame === '0,147,186' ||
                    frogger.x > $canvas.width ||
                    frogger.x + frogger.width < 0
                ){
                    Object.assign(frogger, {
                        x: $canvas.width / 2 - 15,
                        y: 180
                    }); 
                }
                //Win area 
                if(frogger.y < 60){
                    $reloadBtn.classList.add('active');
                    gameOn = false;
                }
            });
        };
    });
    
    //frogger
    frogger.draw(ctx)

    if(gameOn){
        raf = window.requestAnimationFrame(gameLoop);
    }
};
//Controls
document.addEventListener('keyup', (e)=>{
    let directions = {
        ArrowRight: frogger.jumpingPower,
        ArrowLeft: -frogger.jumpingPower,
        ArrowUp: -frogger.jumpingPower,
        ArrowDown: frogger.jumpingPower 
    };

    function moveOnAxis(axis, nextFrameInX = frogger.x, nextFrameInY = frogger.y){
        //Detecting frame color    
        let colorCurrentFrame = ctx.getImageData(
            nextFrameInX, 
            nextFrameInY, 
            frogger.width, 
            frogger.height
        );
        frogger.detectingNextFrameColor(colorCurrentFrame.data);
        frogger.jumpAnimation();
        frogger[axis] += directions[e.key];
        keypress = true;
    }

    if(e.key === 'ArrowRight' || e.key === 'ArrowLeft'){
        moveOnAxis('x', frogger.x + directions[e.key], undefined)
    }

    if(e.key === 'ArrowUp' || e.key === 'ArrowDown'){
        moveOnAxis('y', undefined, frogger.y + directions[e.key])
    }

    
});

document.addEventListener('DOMContentLoaded', ()=>{
    //Start game
    raf = window.requestAnimationFrame(gameLoop);

    //Reset button
    $reloadBtn.addEventListener('click', ()=>{
        window.location.reload();
    })
});
