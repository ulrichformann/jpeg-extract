var fs = require('fs')
var extract = require('./')

var url = 'http://131.118.227.132:80/mjpg/video.mjpg'

extract(url, (err, img) => {
	if(!err)
		fs.writeFileSync('img.jpg', img)
	else
		console.error(err)
})

extract(url).then(img => {
	fs.writeFileSync('img-promise.jpg', img)
}).catch(err => {
	console.error(err)
})
