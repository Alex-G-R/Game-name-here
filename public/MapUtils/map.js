
const TileMap = require("../Class/TileMap")
const {mapData, mapHeight, mapWidth, tileSize} = require("../Constants/GameData");

// Game setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = mapWidth;
canvas.height = mapHeight;

const tileMap = new TileMap(tileSize, mapData);

module.exports = {canvas, ctx, tileMap, mapData}

