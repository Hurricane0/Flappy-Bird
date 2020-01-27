let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeUp = new Image();
const pipeBottom = new Image();

const fly = new Audio();
let score_sound = new Audio();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeUp.src = "images/pipeUp.png";
pipeBottom.src = "images/pipeBottom.png";

fly.src = "sounds/fly.mp3";
score_sound.src = "sounds/score.mp3";

//gap between blocks
const gap = 90;

//Blocks
let pipes = [];
pipes[0] = {
    x: cvs.width,
    y: 0
};

//score
let score = 0;

//Bird position
let xPos = 10;
let yPos = 150;
let grav = 1.5;

//On button pressed
const moveUp = () => {
    yPos -= 25;
    fly.play();
};
document.addEventListener("keydown", moveUp);

const draw = () => {
    ctx.drawImage(bg, 0, 0);

    for (let i = 0; i < pipes.length; i++) {
        ctx.drawImage(pipeUp, pipes[i].x, pipes[i].y);
        ctx.drawImage(pipeBottom, pipes[i].x, pipes[i].y + pipeUp.height + gap);

        pipes[i].x--;
        if (pipes[i].x === 120) {
            pipes.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        //Touch tracing
        if (
            (xPos + bird.width >= pipes[i].x &&
                xPos <= pipes[i].x + pipeUp.width &&
                (yPos <= pipes[i].y + pipeUp.height ||
                    yPos + bird.height >= pipes[i].y + pipeUp.height + gap)) ||
            yPos + bird.height >= cvs.height - fg.height
        ) {
            location.reload();
        }

        if (pipes[i].x === 5) {
            score++;
            score_sound.play();
        }
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);

    yPos += grav;

    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Score: " + score, 10, cvs.height - 20);

    requestAnimationFrame(draw);
};
bg.fg = draw();
