import './css/style.css';
import './css/header.css';
import './css/turn-message.css';
import './css/grids-section.css';

import gameLoopFactory from './gameLoopFactory';

const playAgainButton = document.querySelector('.play-again-button');

const gameLoop = gameLoopFactory();

gameLoop.startGame();
playAgainButton.addEventListener('click', gameLoop.resetGame);
