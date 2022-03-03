export class Frog{
    constructor(width, height, x, y){
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.jumpingPower = 30;
        this.nextColorFrame = '';
    };

    draw(ctx){
        //Body
        ctx.fillStyle = 'rgb(0, 102, 0)';
        ctx.fillRect(
            this.x, 
            this.y, 
            this.width, 
            this.height
        );
    };

    jumpAnimation(){
        Object.assign(this, {
            width : this.width + 4,
            height : this.height + 4,
            x : this.x - 2
        });
    
        setTimeout(()=>{
            Object.assign(this, {
                width : this.width - 4,
                height : this.height - 4,
                x : this.x + 2
            });
        }, 50);
    };
    detectingNextFrameColor([r, g, b]){
        this.nextColorFrame = [r, g, b].join(',');
    };
};

export class Obstacle{
    constructor(width, height, x, y, speed, dir, color){
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.color = color;
        this.dir = dir;
    };
    move(dir){
        let moveTo = {
            left: -this.speed,
            right: this.speed
        }
        this.x += moveTo[dir];
    }
};
