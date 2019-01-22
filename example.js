var fs = require('fs')
var extract = require('./')

var url = 'MJPG_URL'

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
