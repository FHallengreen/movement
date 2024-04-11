function start() {
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
    displayPlayerAnimation();
}

function displayPlayerAnimation() {
    const visualPlayer = document.querySelector("#player");
    if (player.moving) {
        visualPlayer.classList.add("animate");
        visualPlayer.classList.remove("up", "down", "left", "right");
        visualPlayer.classList.add(player.direction);
    } else {
        visualPlayer.classList.remove("animate")
    }
}

const player = {
    x: 0,
    y: 0,
    speed: 100,
    moving: false,
    direction: undefined,
}

function displayPlayerAtPosition() {
    const visualPlayer = document.querySelector("#player");
    visualPlayer.style.translate = `${player.x}px ${player.y}px`;
}



function movePlayer(deltaTime) {
    player.moving = false;

    // Vi starter med at oprette en vektor for bevægelse
    let moveX = 0;
    let moveY = 0;

    if (controls.left) {
        moveX -= 1;
        player.moving = true;
        player.direction = "left";
    }
    if (controls.right) {
        moveX += 1;
        player.moving = true;
        player.direction = "right";
    }
    if (controls.up) {
        moveY -= 1;
        player.moving = true;
        player.direction = "up";
    }
    if (controls.down) {
        moveY += 1;
        player.moving = true;
        player.direction = "down";
    }

    // Vi normaliserer bevægelsesvektoren, så dens samlede længde er 1 eller mindre
    const magnitude = Math.sqrt(moveX * moveX + moveY * moveY);
    if (magnitude > 0) {
        moveX /= magnitude;
        moveY /= magnitude;
    }

    // Vi anvender nu den normaliserede vektor til at opdatere positionen
    const newPos = {
        x: player.x + (moveX * player.speed * deltaTime),
        y: player.y + (moveY * player.speed * deltaTime),
    }

    if (canMoveTo(newPos)) {
        player.x = newPos.x;
        player.y = newPos.y;
    }
}


function canMoveTo(pos) {
    if (pos.x < 0 || pos.y < 0 || pos.x > 470 || pos.y > 325) {
        return false;
    }
    else {
        return true;
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