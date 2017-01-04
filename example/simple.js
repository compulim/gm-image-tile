'use strict';

const fs = require('fs');
const imageTile = require('../');
const path = require('path');

const FILENAME = path.join(__dirname, 'otters.jpg');

fs.readFile(FILENAME, (err, buffer) => {
  if (err) {
    return console.error(err);
  }

  imageTile(buffer, 512).then(result => {
    result.forEach((row, y) => {
      row.forEach((tile, x) => {
        fs.writeFile(FILENAME.replace(/\.jpg$/, `.x${ tile.x }.y${ tile.y }.w${ tile.width }.h${ tile.height }.png`), tile.buffer);
      });
    });
  });
});
