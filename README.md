jpeg-extract
==================

A Node module to extract an image from any jpeg stream.

### Install

```bash
npm install jpeg-extract
```

----------------------
### Usage

```javascript
var fs = require('fs');
var extract = require('jpeg-extract');

var url = 'http://188.124.228.176:80/mjpg/video.mjpg';

extract(url, function(err, img) {
	if(!err)
		fs.writeFile('img.jpg', img);
});
```