let canvas = document.getElementById("snake");
let contex = canvas.getContext("2d");
let score = document.querySelector("span#pontos");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function CriaBG(){
    contex.fillStyle = "lightgreen";
    contex.fillRect(0 ,0, 16 * box, 16 * box);
}
function CriarCobrinha(){
    for(i=0;i<snake.length;i++){
        contex.fillStyle = "green";
        contex.fillRect(snake[i].x,snake[i].y,box,box);
    }
}
function DrawFood(){
    contex.fillStyle = "red";
    contex.fillRect(food.x, food.y, box, box)
}
document.addEventListener('keydown',update);//Chama a função update ao disparar o KeyDown do Teclado

function update(event){
    if(event.keyCode == 37 && direction != "right")direction = "left"
    if(event.keyCode == 38 && direction != "down") direction = "up"
    if(event.keyCode == 39 && direction != "left") direction = "right"
    if(event.keyCode == 40 && direction != "up"  ) direction = "down"
}

function IniciarJogo(){
    if(snake[0].x > 15 * box && direction == "right")snake[0].x = 0;
    if(snake[0].x < 0  * box && direction =="left")snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction =="down")snake[0].y = 0;
    if(snake[0].y < 0  * box && direction =="up")snake[0].y = 16 * box;

    for(i=1; i<snake.length;i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            score.textContent = "0";            
            alert("Game Over!");            
        }
    }
    CriaBG();
    CriarCobrinha();
    DrawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction=="right"){
        snakeX += box;
    }else if(direction == "left"){
        snakeX -= box;
    }else if(direction =="up"){
        snakeY -= box;
    }else if(direction == "down"){
        snakeY += box;
    }

    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }else{
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box; 
        score.textContent = parseInt(parseInt(score.textContent)  + 1);
    }

    let newHead = {
        x:snakeX,
        y:snakeY
    }
    snake.unshift(newHead);
}

let jogo = setInterval(IniciarJogo, 100);
