import './util/math';
import { Game, createGame } from './main';
const canvas = document.getElementById('canvas');
canvas.width = 640;
canvas.height = 480;

createGame(canvas);

// const ctx = canvas.getContext('2d');
// ctx.imageSmoothingEnabled = false;
// const game = new Game(canvas, ctx);
// game.init();