
let lastTimestamp = 0;

function tick(timestamp) {
    requestAnimationFrame(tick);

    const deltaTime = (timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp;

    movePlayer(deltaTime);
    displayPlayerAtPosition();
    displayPlayerAnimation();
    showDebugging();
}

const player = {
    x: 226,
    y: 0,
    speed: 100,
    moving: false,
    direction: undefined,
}

const tiles = [
    [0, 0, 0, 0, 0, 0, 0, 1, 5, 2, 2, 2, 2, 2, 2, 2, 5],
    [0, 0, 0, 3, 3, 0, 0, 1, 5, 2, 7, 9, 7, 7, 7, 2, 5],
    [0, 3, 3, 0, 0, 3, 0, 1, 5, 2, 7, 7, 7, 7, 7, 2, 5],
    [0, 0, 3, 3, 0, 0, 0, 1, 5, 2, 2, 2, 6, 2, 2, 2, 5],
    [0, 0, 0, 0, 0, 0, 0, 1, 5, 5, 5, 5, 1, 5, 5, 5, 5],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    [0, 0, 1, 1, 1, 3, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2],
    [0, 0, 1, 3, 1, 1, 1, 3, 1, 2, 7, 7, 7, 7, 7, 7, 2],
    [2, 2, 2, 2, 2, 6, 2, 2, 2, 2, 7, 7, 7, 7, 7, 7, 2],
    [2, 7, 7, 7, 7, 7, 2, 7, 7, 2, 7, 7, 7, 7, 7, 7, 2],
    [2, 7, 7, 7, 7, 7, 2, 7, 7, 2, 7, 7, 7, 7, 7, 7, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
]

const GRID_WIDTH = tiles[0].length;
const GRID_HEIGHT = tiles.length;
const TILE_SIZE = 32;

function getTileAtCoord({ row, col }) {
    return tiles[row][col];
}

function coordFromPos({ x, y }) {
    const row = Math.round(y / TILE_SIZE);
    const col = Math.round(x / TILE_SIZE);
    return { row, col };
}

start();

function start() {
    document.addEventListener("keydown", keyPress)
    document.addEventListener("keyup", logKey)
    requestAnimationFrame(tick);
    createTiles();
    displayTiles();
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

    const magnitude = Math.sqrt(moveX * moveX + moveY * moveY);
    if (magnitude > 0) {
        moveX /= magnitude;
        moveY /= magnitude;
    }

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

    const { row, col } = coordFromPos(pos);

    if (row < 0 || col < 0 || row >= GRID_HEIGHT || col >= GRID_WIDTH) {

        return false;
    }
    const tileType = getTileAtCoord({ row, col });

    switch (tileType) {
        case 0:
        case 1:
        case 7:
        case 8:
            return true;
        case 2:
        case 3:
        case 4:
        case 5:
            return false;

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


// VIEW

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

function displayPlayerAtPosition() {
    const visualPlayer = document.querySelector("#player");
    visualPlayer.style.translate = `${player.x}px ${player.y}px`;
}


function createTiles() {
    const background = document.querySelector("#background");

    for (let i = 0; i < GRID_HEIGHT; i++) {
        for (let j = 0; j < GRID_WIDTH; j++) {
            const tile = document.createElement('div');
            tile.classList.add("tile");
            background.append(tile);
        }
    }
    background.style.setProperty("--GRID_WIDTH", GRID_WIDTH);
    background.style.setProperty("--GRID_HEIGHT", GRID_HEIGHT);
    background.style.setProperty("--TILE_SIZE", TILE_SIZE + "px");
}



function displayTiles() {
    const visualTiles = document.querySelectorAll("#background .tile")

    for (let row = 0; row < GRID_HEIGHT; row++) {
        for (let col = 0; col < GRID_WIDTH; col++) {
            const modelTile = getTileAtCoord({ row, col });
            const visualTile = visualTiles[row * GRID_WIDTH + col];

            visualTile.classList.add(getClassForTileType(modelTile));

        }
    }
}

function getClassForTileType(tileType) {
    switch (tileType) {
        case 0:
            return "grass";
        case 1:
            return "path";
        case 2:
            return "wall";
        case 3:
            return "tree";
        case 4:
            return "water";
        case 5:
            return "lava";
        case 6:
            return "door";
        case 7:
            return "floor_wood";
        case 8:
            return "floor_stone";
        case 9:
            return "chest_closed";
    }
}

function showDebugging() {
    showDebugTileUnderPlayer();
}

let lastPlayerCord = { row: 0, col: 0 };

function showDebugTileUnderPlayer() {
    const coord = coordFromPos(player);
    if (coord.row != lastPlayerCord.row || coord.col != lastPlayerCord.col) {
        unhighlight(lastPlayerCord);
        highlightTile(coord);
    }
    lastPlayerCord = coord;
}

function highlightTile({ row, col }) {
    const visualTiles = document.querySelectorAll("#background .tile")
    const visualTile = visualTiles[row * GRID_WIDTH + col];
    visualTile.classList.add("highlight");

}

function unhighlight({ row, col }) {
    const visualTiles = document.querySelectorAll("#background .tile")
    const visualTile = visualTiles[row * GRID_WIDTH + col];
    visualTile.classList.remove("highlight");

}