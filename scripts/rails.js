import {Obstacle} from '/scripts/class.js'

let waterRails = {
    railOne: Array.from({length: 3}, (_, index) =>{
        return new Obstacle(120, 30, index * 240, 60, 0.7, 'right', '#BA4A00');
    }),
    railTwo: Array.from({length: 4}, (_, index) =>{
        return new Obstacle(60, 30, index * 120, 90, 2, 'left', '#DC8086');
    }),
    railThree: Array.from({length: 2}, (_, index) =>{
        return new Obstacle(180, 30, index * 360, 120, 0.5, 'right', '#BA4A00');
    }),
    railFour: Array.from({length: 3}, (_, index) =>{
        return new Obstacle(90, 30, index * 180, 150, 1, 'left','#B4DC80');
    })
}

let carRails = {
    railOne: Array.from({length: 3}, (_, index) =>{
        return new Obstacle(90, 30, index * 180, 240, 0.5, 'right', '#273746');
    }),
    railTwo: Array.from({length: 3}, (_, index) =>{
        return new Obstacle(30, 30, index * 150, 270, 1.5, 'left', '#A93226');
    }),
    railThree: Array.from({length: 3}, (_, index) =>{
        return new Obstacle(60, 30, index * 150, 300, 0.7, 'right', '#21618C');
    }),
    railFour: Array.from({length: 3}, (_, index) =>{
        return new Obstacle(60, 30, index * 150, 330, 0.6, 'left','#B7950B');
    }),
    railFive: Array.from({length: 3}, (_, index) =>{
        return new Obstacle(50, 30, index * 150, 360, 1, 'right', '#BA4A00');
    })
};

export {waterRails, carRails};