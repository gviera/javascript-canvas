var io = require('socket.io').listen(8080);

//var myCanvas = fabric.createCanvasForNode(200, 200);

var Fabric = require('fabric').fabric;
var Canvas = require('canvas');

/*
* Create an image of a pink rectangle.
*/

function setPixel(imageData, x, y, r, g, b, a) {
	index = (x + y * imageData.width) * 4;
	imageData.data[index+0] = r;
	imageData.data[index+1] = g;
	imageData.data[index+2] = b;
	imageData.data[index+3] = a;
}

var element = new Canvas(10, 10);
c = element.getContext("2d");

// read the width and height of the canvas
width = element.width;
height = element.height;

// create a new pixel array
imageData = c.createImageData(width, height);

// draw the rectangle
for (i = 0; i < width; i++) {
  for (j = 0; j < height; j++ ) {
      setPixel(imageData, i, j, 255, 0, 255, 255); // 255 opaque
  }
}

io.sockets.on('connection', function (socket) {
  socket.emit('getImage', { data : imageData.data});
});

