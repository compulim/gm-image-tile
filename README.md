# gm-image-tile [![NPM Version](https://img.shields.io/npm/v/gm-image-tile.svg?style=flat)](https://www.npmjs.org/package/gm-image-tile)

Creates image tiles in Node.js using GraphicsMagick.

## Install

First, install [GraphicsMagick](https://graphicsmagick.org). This is part of requirement for [gm](https://npmjs.org/package/gm) package.

Then, install this package by `npm install gm-image-tile --save`.

## Usage

To create image tiles from file `otters.jpg` with tile size of 512 pixels. Call `imageTile` in a Promise-fashion. By default, the output is in PNG format of type [Buffer](https://nodejs.org/api/buffer.html).

```js
const imageBuffer = fs.readFileSync('otters.jpg');

imageTile(imageBuffer, 512).then(result => {
  // Further processing here
});
```

### Result from `imageTile` call

Assumes the input image is 1024x768 and tile size is set to 512 pixels. After calling `imageTile`, the result will be returned as [Buffer](https://nodejs.org/api/buffer.html), as follow. Notes the bottommost tiles are truncated and height is 256 pixels.

```js
[
  [
    { buffer: <Buffer>, x: 0,   y: 0, width: 512, height: 512 },
    { buffer: <Buffer>, x: 512, y: 0, width: 512, height: 512 }
  ], [
    { buffer: <Buffer>, x: 0,   y: 512, width: 512, height: 256 },
    { buffer: <Buffer>, x: 512, y: 512, width: 512, height: 256 }
  ]
]
```

### Options

By default, the output tiles are in PNG format. To output in JPEG format of quality level 80, you can call `imageTile` as below.

```js
const options = {
  "format": "JPG",
  "quality": 80
}

imageTile(imageBuffer, 512, options).then(result => {
  // Output buffers will be JPEG images of quality level 80
});
```

## Contribution

Like us? Please star us in [GitHub](https://github.com/compulim/gm-image-tile/stargazers) and [npm](https://npmjs.com/package/gm-image-tile).

Bugs or suggestions? Please [file us an issue](https://github.com/compulim/gm-image-tile/issues).
