jpeg-extract
==================

A Node module for extracting images out of jpeg/mjpeg streams

### Install

```bash
npm install jpeg-extract
yarn add jpeg-extract
```

----------------------
### Usage

```javascript
const fs = require('fs')
const extract = require('jpeg-extract')

const url = 'MJPG_URL'

extract(url, (err, img) => {
	if(!err)
		fs.writeFileSync('img.jpg', img)
	else
		console.error(err)
})
```

#### Or with promises

```javascript
const fs = require('fs')
const extract = require('jpeg-extract')

const url = 'MJPG_URL'

extract(url).then(img => {
	fs.writeFileSync('img.jpg', img)
}).catch(err => {
	console.error(err)
})
```
