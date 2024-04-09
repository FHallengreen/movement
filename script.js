function start() {
    console.log("JS is running");
    document.addEventListener("keydown", keyPress)
    document.addEventListener("keyup", logKey)
    requestAnimationFrame(tick);
}
let lastTimestamp = 0;

function tick(timestamp) {
    requestAnimationFrame(tick);

    const deltaTime = (timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp;

    movePlayer(deltaTime);

    displayPlayerAtPosition();
}

const player = {
    x: 0,
    y: 0,
    speed: 300
}

function displayPlayerAtPosition() {
    const visualPlayer = document.querySelector("#player");
    visualPlayer.style.translate = `${player.x}px ${player.y}px`;
}



function movePlayer(deltaTime) {
    if (controls.left) {
        player.x -= player.speed * deltaTime;
    }
    else if (controls.right) {
        player.x += player.speed * deltaTime;
    }

    if (controls.up) {
        player.y -= player.speed * deltaTime
    }
    else if (controls.down) {
        player.y += player.speed * deltaTime
    }
}

function keyPress(event) {
    switch (event.key) {
        case "a":
        case "ArrowLeft":
            controls.left = true;
            break;
        case "d":
        case "ArrowRight":
            controls.right = true;
            break;
        case "w":
        case "ArrowUp":
            controls.up = true;
            break;
        case "s":
        case "ArrowDown":
            controls.down = true;
            break;
    }
}

function logKey(event) {
    switch (event.key) {
        case "a":
        case "ArrowLeft":
            controls.left = false;
            break;
        case "d":
        case "ArrowRight":
            controls.right = false;
            break;
        case "w":
        case "ArrowUp":
            controls.up = false;
            break;
        case "s":
        case "ArrowDown":
            controls.down = false;
            break;
    }
}

const controls = {
    left: false,
    right: false,
    up: false,
    down: false,
}



start();