'use strict';

const gm = require('gm');

function identifySize(imageBuffer) {
  return new Promise((resolve, reject) => {
    gm(imageBuffer).size((err, size) => err ? reject(err) : resolve(size));
  });
}

function crop(imageBuffer, width, height, x, y, options) {
  return new Promise((resolve, reject) => {
    let instance = gm(imageBuffer).crop(width, height, x, y);

    if (typeof options.quality === 'number') {
      instance = instance.quality(options.quality);
    }

    instance.toBuffer(options.format, (err, buffer) => {
      err ? reject(err) : resolve(buffer);
    });
  });
}

function sequence(start, end, step) {
  return new Array(Math.ceil((end - start) / step)).fill().map((_, index) => index * step + start);
}

async function imageTile(imageBuffer, tileSize = 512, options = { format: 'PNG', quality: undefined }) {
  const size = await identifySize(imageBuffer);
  const { width, height } = size;

  return await Promise.all(sequence(0, height, tileSize).map(async y => {
    return await Promise.all(sequence(0, width, tileSize).map(async x => ({
      buffer: await crop(imageBuffer, tileSize, tileSize, x, y, options),
      x,
      y,
      width: Math.min(width, x + tileSize) - x,
      height: Math.min(height, y + tileSize) - y
    })));
  }));
}

module.exports = imageTile;
